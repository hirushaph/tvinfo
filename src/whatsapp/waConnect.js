import makeWASocket, {
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
} from "baileys";
import NodeCache from "node-cache";
import pino from "pino";
import { Boom } from "@hapi/boom";
import messageHandler from "../handlers/messageHandler.js";
import { initializeCustomMessage } from "./message.js";
import QRCode from "qrcode";
import dotenv from "dotenv";

dotenv.config();

//setup logger
const logger = pino();
logger.level = "fatal";

//node cache
const msgRetryCounterCache = new NodeCache();
const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false });

export default async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_tvinfo");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`v${version.join(".")}, isLatest: ${isLatest}`);
  const WHATSAPP_VERSION = [2, 3000, 1027934701];
  const sock = makeWASocket({
    // can provide additional config here
    version: WHATSAPP_VERSION,
    auth: {
      creds: state.creds,
      /** caching makes the store faster to send/recv messages */
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    logger,
    msgRetryCounterCache,
    cachedGroupMetadata: async (jid) => groupCache.get(jid),
    browser: Browsers.macOS("Desktop"),
  });

  sock.ev.process(async (events) => {
    if (events["connection.update"]) {
      const update = events["connection.update"];
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        // as an example, this prints the qr code to the terminal
        console.log(
          await QRCode.toString(qr, { type: "terminal", small: true })
        );
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
