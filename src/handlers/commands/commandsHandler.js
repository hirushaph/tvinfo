const {
  getText,
  matchCommand,
  restart,
  getUserId,
  getQuery,
  singleCommand,
} = require("../../utils/helpers");
const { updateState } = require("../../utils/state");
const { BOT_NAME } = require("../../config/config");
const UserModel = require("../../models/UserModel");

const {
  sendReply,
  markAsRead,
  sendTextMessage,
} = require("../../whatsapp/message");
const {
  handleTvseries,
  handleMovies,
  handleAddOptions,
  handleRemoveOptions,
  handleSystemInfo,
} = require("./commands");

const processCommands = async function (sock, msg) {
  // Mark as read
  await markAsRead(msg);
  // get text message
  let msgText = getText(msg);
  const userId = getUserId(msg);

  try {
    // save user to db
    const exitingUser = await UserModel.findOne({ userId });

    if (!exitingUser) {
      const newUser = {
        userId,
        username: msg.pushName,
      };

      const addedUser = await UserModel.addItem(newUser);

      updateState({ user: addedUser });
    }

    if (exitingUser) {
      updateState({ user: exitingUser });
    }

    // Handle Movies
    if (matchCommand(".mv", msgText)) {
      await handleMovies(msgText, msg);
    }

    // Handle Tv Series
    if (matchCommand(".tv", msgText)) {
      await handleTvseries(msgText, msg);
    }

    if (msgText === ".about") {
      await sendReply("Helllo", msg);
    }

    // User Options

    if (matchCommand(".add", msgText)) {
      await handleAddOptions(msgText, msg);
    }

    if (matchCommand(".remove", msgText)) {
      await handleRemoveOptions(msgText, msg);
    }

    // Information commands
    if (singleCommand(".status", msgText)) {
      await handleSystemInfo(msg);
    }

    // Admin Commands

    if (singleCommand(".restart", msgText)) {
      restart();
    }

    /**
     * Under development
     * Setup owner in config.js insted of this
     *
     */
    if (msgText === ".setowner") {
      if (!msg.key.fromMe) sendReply("🚫 Not Allowed", msg);
      const queryData = getQuery(msgText);

      const owner = await UserModel.find({ roles: { $in: ["owner"] } });

      if (!owner) {
        const userId = queryData + "@s.whatsapp.net";
        const text =
          "*Hello!*\n\nYou have been added as an owner for the" +
          BOT_NAME +
          " bot.\n\nPlease reply to this message choosing number below to confirm or cancel:\n\n1. Confirm\n2. Cancel`";
        sendTextMessage(text, userId);
        // under development
        // Did not handled confirm by user
      }

      if (!owner) sendReply("Owner is already added");
    }
  } catch (error) {
    sendReply(error.message, msg);
  }
};

module.exports = processCommands;
