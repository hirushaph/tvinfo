const { SEARCH_RESULT_LIMIT } = require("../config/config");
const { getText, isQuoted } = require("../utils/helpers");
const { markAsRead, sendReply } = require("../whatsapp/message");
const processCommands = require("./commands/commandsHandler");
const { handleSelectedItem, handleImgRequest } = require("./text/textMessage");

const messageHandler = async function (sock) {
  sock.ev.on("messages.upsert", async (m) => {
    // console.log(JSON.stringify(m, undefined, 2));
    const msg = m.messages[0];

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

module.exports = messageHandler;
