export const singleMovie = function (item) {
  // prettier-ignore
  const msg = `*${item.title} (${item.year})* ${item.language !== "English" ? "| `"+item.originalName+"`":""} \n\n` +
              (item.isAdultRated ? `🔞 *18+* ${item.rated} Rated\n` : "") +
              (item.imdb !== "n/a" ? `⭐ ɪᴍᴅʙ : ${item.imdb}\n` : "") +
              (item.rottenTomatoes !== "n/a" ? `🍅 ʀᴏᴛᴛᴇɴ ᴛᴏᴍᴀᴛᴏᴇꜱ : ${item.rottenTomatoes}\n` : "") +
              ((item.rottenTomatoes === "n/a" && item.imdb === "n/a") ? `🌟 Rating : ${item.tmdbRating}\n` : "") +
              "\n🔤 ʟᴀɴɢᴜᴀɢᴇ  : " + item.language + "\n" +
              item.countryEmoji+" ᴄᴏᴜɴᴛʀʏ    : " + item.country + "\n" +
              "🕔 ʀᴜɴᴛɪᴍᴇ    : " + item.runtime + "\n" +
              (item.released == true ? "📆 ʀᴇʟᴇᴀꜱᴇᴅ   : " : "📆 ʀᴇʟᴇᴀꜱᴇ    : ") + item.releaseDate + "\n" +
              "🎭 ɢᴇɴʀᴇꜱ      : " + item.genres + "\n" +
              "🙋‍♀️ ᴄᴀꜱᴛ          : _" + item.cast + "_\n\n" +
              (item.plot !=="n/a" ? `> ${item.plot}\n` : '')
  return msg;
};

// (item.tagline !=="n/a" ? `\n> ${item.tagline}` : ''

export const singleTv = function (tv) {
  // prettier-ignore
  const msg = `*${tv.title} (${tv.year})* \n\n` +
              (tv.isAdultRated ? `🔞 *18+* ${tv.rated} Rated\n` : "") +
              "⭐ ɪᴍᴅʙ : " + tv.imdb + "\n" + 
              (tv.rottenTomatoes !== "n/a" ? `🍅 ʀᴏᴛᴛᴇɴ ᴛᴏᴍᴀᴛᴏᴇꜱ : ${tv.rottenTomatoes}\n` : "") +
              ((tv.rottenTomatoes === "n/a" && tv.imdb === "n/a") ? `🌟 Rating : ${tv.tmdbRating}\n` : "") + 
              "\n📂 ꜱᴇᴀꜱᴏɴꜱ    :  " + tv.seasons + "\n" +
              "📁 ᴇᴘɪꜱᴏᴅᴇꜱ  :  " + tv.episodes + "\n" +
              "🔖 ʟᴀꜱᴛ ᴀɪʀ   :  " + tv.last + "\n" +
              (tv.released == true ? "📆 ʀᴇʟᴇᴀꜱᴇᴅ   : " : "📆 ʀᴇʟᴇᴀꜱᴇ    : ") + tv.releaseDate + "\n" +
              "🔤 ʟᴀɴɢᴜᴀɢᴇ  :  " + tv.language + "\n" +
              "🌎 ᴄᴏᴜɴᴛʀʏ    :  " + tv.country + "\n" +
              "🎭 ɢᴇɴʀᴇꜱ      :  *" + tv.genres + "*\n" +
              "⌛ ꜱᴛᴀᴛᴜꜱ      :  " + tv.status + "\n\n" +
              (tv.plot !=="n/a" ? `> ${tv.plot}\n` : '')

  return msg;
};

export const sysInfoMsg = function (info) {
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
