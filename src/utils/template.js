const singleMovie = function (item) {
  // prettier-ignore
  const msg = `*${item.title} (${item.year})* \n\n` +
              (item.isAdultRated ? `🔞 *18+* ${item.rated} Rated\n` : "") +
              "⭐ ɪᴍᴅʙ : " + item.imdb + "\n" + 
              (item.rottenTomatoes !== "n/a" ? `🍅 ʀᴏᴛᴛᴇɴ ᴛᴏᴍᴀᴛᴏᴇꜱ : ${item.rottenTomatoes}\n` : "") +
              ((item.rottenTomatoes === "n/a" && item.imdb === "n/a") ? ` 🌟 Rating : ${item.tmdbRating}\n` : "") +
              "\n🔤 ʟᴀɴɢᴜᴀɢᴇ  : " + item.language + "\n" +
              item.countryEmoji+" ᴄᴏᴜɴᴛʀʏ    : " + item.country + "\n" +
              "🕔 ʀᴜɴᴛɪᴍᴇ    : " + item.runtime + "\n" +
              "🎭 ɢᴇɴʀᴇꜱ      : *" + item.genres + "*\n" +
              "🙋‍♀️ ᴄᴀꜱᴛ          : _" + item.cast + "_\n" +
              (item.plot !=="n/a" ? `✍ ᴘʟᴏᴛ        : ${item.plot}\n` : '') +
              (item.tagline !=="n/a" ? `\n> ${item.tagline}` : '')

  return msg;
};

const singleTv = function (tv) {
  // prettier-ignore
  const msg = `*${tv.title} (${tv.year})* \n\n` +
              (tv.isAdultRated ? `🔞 *18+* ${tv.rated} Rated\n` : "") +
              "⭐ ɪᴍᴅʙ : " + tv.imdb + "\n" + 
              (tv.rottenTomatoes !== "n/a" ? `🍅 ʀᴏᴛᴛᴇɴ ᴛᴏᴍᴀᴛᴏᴇꜱ : ${tv.rottenTomatoes}\n` : "") +
              ((tv.rottenTomatoes === "n/a" && tv.imdb === "n/a") ? ` 🌟 Rating : ${tv.tmdbRating}\n` : "") + 
              "\n📂 ꜱᴇᴀꜱᴏɴꜱ    :  " + tv.seasons + "\n" +
              "🔤 ʟᴀɴɢᴜᴀɢᴇ  :  " + tv.language + "\n" +
              "🌎 ᴄᴏᴜɴᴛʀʏ    :  " + tv.country + "\n" +
              "🎭 ɢᴇɴʀᴇꜱ      :  *" + tv.genres + "*\n" +
              "⌛ ꜱᴛᴀᴛᴜꜱ     :  " + tv.status + "\n" +
              (tv.plot !=="n/a" ? `📄 ᴘʟᴏᴛ        : ${tv.plot}\n` : '') +
              (tv.tagline !=="n/a" ? `\n> ${tv.tagline}` : '')

  return msg;
};

const sysInfoMsg = function (info) {
  // prettier-ignore
  let msg = 
`✤ *𝚃𝚅𝙸𝙽𝙵𝙾 𝚂𝚢𝚜𝚝𝚎𝚖 𝚂𝚝𝚊𝚝𝚞𝚜* ✤

👾 Bot Uptime :  ${info.appUptime}

📥 Bot Ram Usage :  ${info.used} MB

📦 Total Ram :  ${info.total} MB

🆓 Free Ram :  ${info.free} MB

⚙ Hosted on : ${info.platform}

═══════ TᐯIᑎᖴO ═══════
`;

  return msg;
};
module.exports = { singleMovie, singleTv, sysInfoMsg };
