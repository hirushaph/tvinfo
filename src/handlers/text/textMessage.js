const { TMDB_IMAGE_URL, POSTER_SENDING_LIMIT } = require("../../config/config");
const SearchModel = require("../../models/SearchModel");
const SendedInfoModel = require("../../models/SendedInfoModel");
const { getImages } = require("../../services/tmdb");
const { sendImage } = require("../../whatsapp/message");
const { fetchDetails } = require("../commands/helpers/fetchDetails");
const formatAndSendDetails = require("../commands/helpers/formatAndSendDetails");

const handleSelectedItem = async function (selectedMovie, msg) {
  const repliedMsgId = msg.message.extendedTextMessage.contextInfo.stanzaId;

  const sendedResult = await SearchModel.findOne({ replyId: repliedMsgId });

  if (!sendedResult) return;

  const itemId = sendedResult.searchResults[selectedMovie - 1];

  if (!itemId) return;

  if (sendedResult.type === "movie") {
    const type = "movie";
    const { tmdbItem: tmdbMovie, omdbItem: omdbMovie } = await fetchDetails(
      itemId,
      type
    );
    await formatAndSendDetails(type, tmdbMovie, omdbMovie, msg);
  }

  if (sendedResult.type === "tv") {
    const type = "tv";
    const { tmdbItem: tmdbTv, omdbItem: omdbTv } = await fetchDetails(
      itemId,
      type
    );
    await formatAndSendDetails(type, tmdbTv, omdbTv, msg);
  }
};

const handleImgRequest = async function (msg) {
  const sendedinfoId = msg.message.extendedTextMessage.contextInfo.stanzaId;

  try {
    const sendedInfo = await SendedInfoModel.findOne({ infoId: sendedinfoId });

    if (!sendedInfo)
      throw new Error("⭕ Can't Get Images \n\n Please try search again");
    const { itemId, shortLanguage, type } = sendedInfo;

    const images = await getImages(itemId, type);

    if (!images) throw new Error("Posters Not Found");

    let filteredPosters = images.posters.filter(
      (poster) =>
        poster.iso_639_1 === "en" || poster.iso_639_1 === shortLanguage
    );

    if (!filteredPosters || filteredPosters.length < 5) {
      images.posters.forEach((item) => {
        if (item.iso_639_1 === null) {
          filteredPosters.push(item);
        }
      });
    }

    const limitedPosters =
      filteredPosters.length > POSTER_SENDING_LIMIT
        ? filteredPosters.slice(0, POSTER_SENDING_LIMIT)
        : filteredPosters;

    // get image full links
    const posterUrls = limitedPosters.map(
      (poster) => `${TMDB_IMAGE_URL}${poster.file_path}`
    );

    for (let i = 0; i < posterUrls.length; i++) {
      sendImage(posterUrls[i], msg);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { handleSelectedItem, handleImgRequest };
