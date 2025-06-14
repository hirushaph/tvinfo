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

import QRCode from "qrcode";

//setup logger
const logger = pino();
logger.level = "fatal";

//node cache
const msgRetryCounterCache = new NodeCache();
const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false });

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_tvinfo");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`v${version.join(".")}, isLatest: ${isLatest}`);
  const sock = makeWASocket({
    // can provide additional config here
    auth: {
      creds: state.creds,
      /** caching makes the store faster to send/recv messages */
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    logger,
    msgRetryCounterCache,
    cachedGroupMetadata: async (jid) => groupCache.get(jid),
  });

  sock.ev.process(async (events) => {
    if (events["connection.update"]) {
      const update = events["connection.update"];
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        // as an example, this prints the qr code to the terminal
        console.log(await QRCode.toString(qr, { type: "terminal" }));
      }

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

  sock.ev.on("groups.update", async ([event]) => {
    const metadata = await sock.groupMetadata(event.id);
    groupCache.set(event.id, metadata);
  });

  sock.ev.on("group-participants.update", async (event) => {
    const metadata = await sock.groupMetadata(event.id);
    groupCache.set(event.id, metadata);
  });
  // Handle Messages
  messageHandler(sock);

  // Initialize Custom Messages
  initializeCustomMessage(sock);
}

module.exports = connectToWhatsApp;
