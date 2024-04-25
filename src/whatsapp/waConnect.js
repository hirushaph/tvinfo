const {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const pino = require("pino");
const NodeCache = require("node-cache");
const { initializeCustomMessage } = require("./message");
const messageHandler = require("../handlers/messageHandler");
require("dotenv").config();

//setup logger
const logger = pino();
logger.level = "fatal";

//node cache
// const msgRetryCounterCache = new NodeCache();

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
    // msgRetryCounterCache,
  });

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
}

module.exports = connectToWhatsApp;
