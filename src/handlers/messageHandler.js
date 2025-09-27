import { isJidGroup } from "baileys";
import { SEARCH_RESULT_LIMIT, INBOX_DISABLED } from "../config/config.js";
import { getText, isQuoted } from "../utils/helpers.js";
import { markAsRead, sendReply } from "../whatsapp/message.js";
import { processCommands } from "./commands/commandsHandler.js";
import { handleSelectedItem, handleImgRequest } from "./text/textMessage.js";

const messageHandler = async function (sock) {
  sock.ev.on("messages.upsert", async (m) => {
    // console.log(JSON.stringify(m, undefined, 2));
    const msg = m.messages[0];

    console.log(JSON.stringify(msg, null, 2));

    if (!isJidGroup(msg.key.remoteJid) && INBOX_DISABLED) {
      return;
    }

    try {
      let msgText = getText(msg);

      // process commands
      if (msgText?.substring(0, 1) === ".") {
        processCommands(sock, msg);
      }

      // process seleced items
      if (
        isQuoted(msg) &&
        msgText.length === 1 &&
        !isNaN(msgText) &&
        msgText >= 1 &&
        msgText <= SEARCH_RESULT_LIMIT
      ) {
        await markAsRead(msg);
        handleSelectedItem(msgText, msg);
      }

      // Process Image Request

      if (isQuoted(msg) && msgText.toLowerCase() === "img") {
        await markAsRead(msg);
        await handleImgRequest(msg);
      }

      // other text handling
    } catch (error) {
      sendReply(error.message, msg);
    }
  });
};

export default messageHandler;
