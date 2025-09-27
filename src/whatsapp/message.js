let sock;

/**
 * Initialize the sock object to custom messages.
 *
 * @param {object} socket - The socket object to be initialized.
 */
export function initializeCustomMessage(socket) {
  sock = socket;
}

/**
 * Sends a reply message with quoted parent message
 *
 * @param {string} text - The message content to be sent as a reply.
 * @param {Object} msg - current message context
 * @returns {Promise} - A promise that resolves when the message is sent successfully.
 *
 */
export async function sendReply(text, msg) {
  // await randomDelay();
  // await sendMessageWTyping(msg.key.remoteJid);
  return await sock.sendMessage(
    msg.key.remoteJid,
    { text: text },
    { quoted: msg }
  );
}

/**
 *
 * Send Image With Caption
 *
 * @param {string} text - Caption Text
 * @param {string} url - Media Path or URL
 * @param {string} msg - Message Context
 * @returns {Promise<object>} - Return a pormise that reslove sended info
 */
export async function sendMediaMessage(text, url, msg) {
  // await randomDelay();
  // await sendMessageWTyping(msg.key.remoteJid);
  const reply = await sock.sendMessage(
    msg.key.remoteJid,
    {
      image: {
        url: url,
      },
      caption: text,
    },
    { quoted: msg }
  );
  return reply;
}

/**
 * Send Image without Caption
 *
 * @param {string} url - Image URL or Path
 * @param {object} msg - Message Context
 * @returns {Promise<object>} - Return a pormise that reslove sended info
 */
export async function sendImage(url, msg) {
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

/**
 * Mark Message As Seen
 *
 * @param {object} msg - Message Object
 * @returns {Promise}
 */
export async function markAsRead(msg) {
  return await sock.readMessages([msg.key]);
}

/**
 *
 * Send Typing Status
 *
 * @param {string} jid - User RemoteJID
 */
export async function sendMessageWTyping(jid) {
  await sock.presenceSubscribe(jid);
  await delay(200);

  await sock.sendPresenceUpdate("composing", jid);
  await delay(1700);

  await sock.sendPresenceUpdate("paused", jid);
}
