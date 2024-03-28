const SendedInfoModel = require("../../../models/SendedInfoModel");
const { formatSingleMovie, formatSingleTv } = require("../../../utils/format");
const template = require("../../../utils/template");
const { sendMediaMessage } = require("../../../whatsapp/message");

const formatAndSendDetails = async function (type, tmdbItem, omdbItem, msg) {
  // Format and Combine Both api results
  const formattedItem =
    type === "movie"
      ? formatSingleMovie(tmdbItem, omdbItem)
      : formatSingleTv(tmdbItem, omdbItem);

  // Generate Msg Template
  const msgTemplate =
    type === "movie"
      ? template.singleMovie(formattedItem)
      : template.singleTv(formattedItem);

  // send message to user
  const reply = await sendMediaMessage(
    msgTemplate,
    formattedItem.posterPath,
    msg
  );

  // Save sended info to user
  const newInfo = {
    userId: msg.key.remoteJid,
    infoId: reply.key.id,
    itemId: tmdbItem.id,
    shortLanguage: tmdbItem.original_language,
    type: type,
  };

  SendedInfoModel.addItem(newInfo);
};

module.exports = formatAndSendDetails;
