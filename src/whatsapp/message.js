let sock;

/**
 * Initialize the sock object to custom messages.
 *
 * @param {object} socket - The socket object to be initialized.
 */
function initializeCustomMessage(socket) {
  sock = socket;
}

/**
 * Sends a reply message using the provided socket and message content.
 *
 * @param {string} text - The message content to be sent as a reply.
 * @param {Object} msg - current message context
 * @returns {Promise<void>} - A promise that resolves when the message is sent successfully.
 *
 */
async function sendReply(text, msg) {
  // await randomDelay();
  // await sendMessageWTyping(msg.key.remoteJid);
  return await sock.sendMessage(
    msg.key.remoteJid,
    { text: text },
    { quoted: msg }
  );
}

async function sendMediaMessage(text, url, msg) {
  // await randomDelay();
  // await sendMessageWTyping(msg.key.remoteJid);
  return await sock.sendMessage(
    msg.key.remoteJid,
    {
      image: {
        url: url,
      },
      caption: text,
    },
    { quoted: msg }
  );
}

// async function sendTextMessage(userId, text) {
//   return await sock.sendMessage(userId, { text: text });
// }

async function sendImage(url, msg) {
  // await randomDelay();
  return await sock.sendMessage(
    msg.key.remoteJid,
    {
      image: {
        url: url,
      },
    },
    { quoted: msg }
  );
}
// async function sendMessage(text, msg) {
//   return await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
// }

async function markAsRead(msg) {
  return await sock.readMessages([msg.key]);
}

async function sendMessageWTyping(jid) {
  await sock.presenceSubscribe(jid);
  await delay(200);

  await sock.sendPresenceUpdate("composing", jid);
  await delay(1700);

  await sock.sendPresenceUpdate("paused", jid);
}

module.exports = {
  sendReply,
  initializeCustomMessage,
  sendMediaMessage,
  sendImage,
  markAsRead,
};
