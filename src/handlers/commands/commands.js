const UserModel = require("../../models/UserModel");
const { searchMovie, searchTv } = require("../../services/tmdb");
const {
  getQuery,
  getTextParam,
  getUserId,
  sysInfo,
} = require("../../utils/helpers");
const { updateState } = require("../../utils/state");
const { sendReply, sendMediaMessage } = require("../../whatsapp/message");
const { fetchDetails } = require("./helpers/fetchDetails");
const formatAndSendDetails = require("./helpers/formatAndSendDetails");
const handleMultiSearchResults = require("./helpers/handleMultiResult");
const options = require("../../config/options.json");
const { sysInfoMsg } = require("../../utils/template");
const { BOT_COVER_IMAGE } = require("../../config/config");

const handleMovies = async function (msgText, msg) {
  const queryData = getQuery(msgText);
  const type = "movie";
  if (!queryData.query) throw new Error("Invalid Query");

  const results = await searchMovie({ ...queryData });

  if (results.length === 1) {
    const [result] = results;

    const { tmdbItem: tmdbMovie, omdbItem: omdbMovie } = await fetchDetails(
      result.id,
      type
    );
    await formatAndSendDetails(type, tmdbMovie, omdbMovie, msg);
  }

  if (results.length > 1) {
    await handleMultiSearchResults(type, results, msg);
  }
};

const handleTvseries = async function (msgText, msg) {
  const queryData = getQuery(msgText);
  const type = "tv";
  if (!queryData.query) throw new Error("Invalid Query");

  const tvResults = await searchTv({ ...queryData });

  if (tvResults.length === 1) {
    const [result] = tvResults;

    const { tmdbItem: tmdbTv, omdbItem: omdbTv } = await fetchDetails(
      result.id,
      type
    );
    await formatAndSendDetails(type, tmdbTv, omdbTv, msg);
  }

  if (tvResults.length > 1) {
    await handleMultiSearchResults(type, tvResults, msg);
  }
};

const handleAddOptions = async function (msgText, msg) {
  try {
    const query = getTextParam(msgText);
    const userId = getUserId(msg);

    if (!options.extraTemplateOptions.includes(query))
      throw new Error("⭕ Unavailable Option : `" + query + "` ");

    const user = await UserModel.findOne({ userId });
    const isValueInOptions = user.options.includes(query);

    if (isValueInOptions) throw new Error("🟢 Already Enabled " + query);

    user.options.push(query);
    const updatedUser = await user.save();

    if (!updatedUser) throw new Error("⭕ Can't Enable " + query);

    sendReply(
      `✅ Enabled INFO Option \n\n🎬 *Option* : ${query}\n👤 *User* : ${msg.pushName}`,
      msg
    );
    updateState({ user: updatedUser });
  } catch (error) {
    // console.log(error);
    throw new Error(error.message);
  }
};

const handleRemoveOptions = async function (msgText, msg) {
  try {
    const query = getTextParam(msgText);
    const userId = getUserId(msg);
    if (!options.extraTemplateOptions.includes(query))
      throw new Error("⭕ Unavailable Option : `" + query + "` ");

    const user = await UserModel.findOne({ userId });
    const isValueInOptions = user.options.includes(query);

    if (!isValueInOptions) throw new Error("⭕ Not Enabled " + query);

    const updatedUser = await UserModel.findOneAndUpdate(
      { userId },
      { $pull: { options: query } },
      { new: true }
    );

    if (!updatedUser) throw new Error("⭕ Can't Disable Option");
    sendReply(
      `❎ Disabled INFO Option \n\n🎬 *Option* : ${query}\n👤 *User* : ${msg.pushName}`,
      msg
    );
    updateState({ user: updatedUser });
  } catch (error) {
    throw new Error(error.message);
  }
};

const handleSystemInfo = async function (msg) {
  const info = sysInfo();

  const infoMsg = sysInfoMsg(info);

  await sendMediaMessage(infoMsg, BOT_COVER_IMAGE, msg);
};

module.exports = {
  handleMovies,
  handleTvseries,
  handleAddOptions,
  handleRemoveOptions,
  handleSystemInfo,
};
