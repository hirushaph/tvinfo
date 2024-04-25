const {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const pino = require("pino");
const NodeCache = require("node-cache");
const { initializeCustomMessage } = require("./message");
const messageHandler = require("../handlers/messageHandler");
require("dotenv").config();

//setup logger
const logger = pino();
logger.level = "debug";

/**
 * Store Messages In Memory
 * This cause high memeory usage on server
 */

// const store = makeInMemoryStore({ logger });
// store?.readFromFile("./tvinfo_store.json");

// setInterval(() => {
//   store?.writeToFile("./tvinfo_store.json");
// }, 10000);

//node cache
const msgRetryCounterCache = new NodeCache();

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_tvinfo");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`v${version.join(".")}, isLatest: ${isLatest}`);
  const sock = makeWASocket({
    // can provide additional config here
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      /** caching makes the store faster to send/recv messages */
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    logger,
    msgRetryCounterCache,
    // getMessage,
  });

  // store?.bind(sock.ev);

  sock.ev.process(async (events) => {
    if (events["connection.update"]) {
      const update = events["connection.update"];
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        // reconnect if not logged out
        if (
          lastDisconnect?.error instanceof Boom &&
          lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
        ) {
          connectToWhatsApp();
        } else {
          console.log(`Connection closed. You are logged out.`);
        }
      } else if (connection === "open") {
        console.log("Connected 🙃");
      }
    }
    if (events["creds.update"]) {
      await saveCreds();
    }
  });

  // Handle Messages
  messageHandler(sock);

  // Initialize Custom Messages
  initializeCustomMessage(sock);

  /**
   * Load Stored Messages
   *
   */

  // async function getMessage(key) {
  //   if (store) {
  //     const msg = await store.loadMessage(key.remoteJid, key.id);

  //     return msg?.message || undefined;
  //   }

  //   // Return a default message if the store is not present
  //   return {};
  // }
}

module.exports = connectToWhatsApp;
