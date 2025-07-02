const { isJidGroup } = require("@whiskeysockets/baileys/lib");
const { default: mongoose } = require("mongoose");
const pm2 = require("pm2");
const os = require("os");
const { OWNER_PHONE, OWNER_NAME } = require("../config/config");
const UserModel = require("../models/UserModel");
const roles = require("../config/roles.json");
const { getState } = require("./state");

// delay function
function randomDelay() {
  const ms = generateRandomNumber(500, 100);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Checks if a message is quoted.
 * @param {object} msg - The message object to be checked.
 * @returns {boolean} - True if the message is quoted, false otherwise.
 */
function isQuoted(msg) {
  if (msg.hasOwnProperty("message")) {
    const main = msg.message;
    if (main.hasOwnProperty("extendedTextMessage")) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

/**
 * Check commands with parameters
 * Ex : .mv moviename
 * @param {String} command - command need to check
 * @param {String} msg - message received from the user
 * @returns {boolean} - return true if matched and validated otherwise throw an error
 */
const matchCommand = function (command, msg) {
  const cmd = msg.split(" ")[0];

  if (cmd === command) {
    if (!checkRoles(command, msg)) return;
    validateCommand(command, msg);
    return true;
  }
  return false;
};

/**
 * Check Single Command
 *
 * @param {string} command - Command need to check
 * @param {object} msg - Message Recived From User
 * @returns {boolean} - return true if successfull
 */

const singleCommand = function (command, msg) {
  if (command === msg) {
    if (!checkRoles(command, msg)) return;
    return true;
  }
};

/**
 * Check command permissions
 *
 * @param {string} command - Command
 * @param {object} msg - Current message
 * @returns
 */
const checkRoles = function (command, msg) {
  const state = getState();

  if (!state) return;
  const userRoles = state.user.roles;
  const commands = roles.commands;

  const currentCommand = commands.find((cmd) => cmd.command === command);
  if (!currentCommand) throw new Error("Command Permissions are Not setup");

  const isAllowed = userRoles.some((role) =>
    currentCommand.allowedRoles.includes(role)
  );

  if (!isAllowed) throw new Error("🚫 Not Allowed");
  return isAllowed;
};

/**
 * Only for movie or tv search
 * Extracts the moviename and year
 *
 * @param {String} msg - The text message received from the user.
 * @returns {Object | undefined} - The extracted query and year if found, otherwise undefined.
 */
// function getQuery(msg) {
//   let query = undefined;
//   let year = undefined;

//   if (msg.includes(".y")) {
//     const movieInfo = msg.split(".y")[0];
//     query = movieInfo.split(" ").slice(1).join(" ") || undefined;
//     const match = msg.match(/\.y\s(\d+)/);
//     if (match) {
//       year = match[1];
//     }
//     const updatedQuery = query.replace(/\s+$/, ""); // remove last space
//     return { query: updatedQuery, year };
//   }
//   query = msg.split(" ").slice(1).join(" ") || undefined;
//   return { query, year };
// }

function getTextParam(msg) {
  query = msg.split(" ")[1];

  return query;
}

function getQuery(msg) {
  let query = undefined;
  let year = undefined;
  let region = undefined;

  // Extract year
  const yearMatch = msg.match(/\.y\s*(\d{4})/);
  if (yearMatch) {
    year = yearMatch[1];
  }

  // Extract region
  const regionMatch = msg.match(/\.r\s*([A-Z]{2})/i);
  if (regionMatch) {
    region = regionMatch[1].toUpperCase();
  }

  // Remove .y and .r parts from the message to extract just the query
  let cleanMsg = msg.replace(/\.y\s*\d{4}/, "").replace(/\.r\s*[A-Z]{2}/i, "");

  // Extract the actual search query (everything after first space)
  query = cleanMsg.trim().split(" ").slice(1).join(" ") || undefined;

  return { query, year, region };
}


/**
 * Get Message Text From Current Message Object
 *
 * @param {object} msg - Current Message Object
 * @returns {string | undefined} - Message text or undefined
 */
function getText(msg) {
  if (isQuoted(msg)) {
    // return quoted text
    return msg.message.extendedTextMessage.text;
  } else if (msg?.message?.hasOwnProperty("conversation")) {
    // return text message if it is normal message
    return msg.message.conversation;
  } else {
    return;
  }
}

// private helpers
function generateRandomNumber(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
function validateCommand(command, msgText) {
  if (msgText === command) {
    throw new Error("Incomplete Command");
  }
  if (msgText[command.length] !== " ") {
    throw new Error("Invalid Command");
  }
}

function restart() {
  if (!process.env.pm_id) {
    throw new Error(
      "⭕ Can't Restart Your Bot \n\n Restart only works with `pm2`"
    );
  }
  pm2.connect((err) => {
    if (err) {
      process.exit(1);
    }

    mongoose.disconnect();

    pm2.restart(process.env.pm_id, (restartErr) => {
      if (restartErr) {
        process.exit(1);
      }
      pm2.disconnect();
    });
  });
}

function status() {
  si.cpu()
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

function getUserId(msg) {
  if (isJidGroup(msg.key.remoteJid)) return msg.key.participant;
  return msg.key.remoteJid;
}

async function setupOwner() {
  const phone = OWNER_PHONE;
  const name = OWNER_NAME;

  if (!phone || !name)
    return console.error("\x1b[33m%s\x1b[0m", "Owner is not setup");

  const formattedNumber = phone.replace(/\+/g, "");
  const number = `${formattedNumber}@s.whatsapp.net`;

  const owner = await UserModel.find({
    $or: [{ userId: number }, { roles: { $in: ["owner"] } }],
  });

  if (owner.length === 0) {
    const newOwner = {
      userId: number,
      username: name,
      roles: ["owner", "admin"],
    };

    await UserModel.addItem(newOwner);
  }

  if (owner.length !== 0) {
    const exitingOwner = owner[0];

    if (exitingOwner.userId === number) {
      await UserModel.findOneAndUpdate(
        { userId: exitingOwner.userId },
        {
          roles: ["owner", "admin"],
          username: name,
        }
      );
    }

    if (exitingOwner.userId !== number) {
      await UserModel.findOneAndUpdate(
        { userId: exitingOwner.userId },
        { roles: ["user"] }
      );

      const newOwner = {
        userId: number,
        username: name,
        roles: ["owner", "admin"],
      };

      await UserModel.addItem(newOwner);
    }

    if (exitingOwner.username !== name) {
      await UserModel.findOneAndUpdate(
        { userId: exitingOwner.userId },
        { username: name }
      );
    }
  }
}

function sysInfo() {
  const appUptime = process.uptime();

  const totalRam = os.totalmem();
  const freeRam = os.freemem();

  const platform = os.platform();
  const ram = process.memoryUsage();
  const used = ram.rss;
  const sysInfo = {
    appUptime: formatTime(appUptime),
    total: Math.round(totalRam / (1024 * 1024)),
    used: Math.round(used / 1024 / 1024),
    free: Math.round(freeRam / (1024 * 1024)),
    platform,
  };

  return sysInfo;
}

function formatTime(durationInSeconds) {
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;

  const days = Math.floor(durationInSeconds / secondsInDay);
  const hours = Math.floor((durationInSeconds % secondsInDay) / secondsInHour);
  const minutes = Math.floor(
    (durationInSeconds % secondsInHour) / secondsInMinute
  );
  const seconds = Math.floor(durationInSeconds % secondsInMinute);

  let formattedTime = "";

  if (days > 0) {
    formattedTime += `${days}d `;
  }
  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }
  if (seconds > 0 || formattedTime === "") {
    formattedTime += `${seconds}s`;
  }

  return formattedTime.trim();
}

module.exports = {
  randomDelay,
  delay,
  isQuoted,
  matchCommand,
  getText,
  getQuery,
  restart,
  status,
  getUserId,
  setupOwner,
  singleCommand,
  getTextParam,
  sysInfo,
};
