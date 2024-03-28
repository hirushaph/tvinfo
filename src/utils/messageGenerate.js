const searchResultGen = function (data) {
  let ids = [];

  // prettier-ignore
  let msg =
`╔
║  ꜱᴇᴀʀᴄʜ ʀᴇꜱᴜʟᴛꜱ 
╚═════════════\n\n`;

  data.forEach((element, i) => {
    msg += `*${i + 1}*.  ${element.title} (${element.year}),  _${
      element.language
    }_ \n\n`;
    ids.push(element.id);
  });

  // prettier-ignore
  msg += 
`☆ ᴄʜᴏᴏꜱᴇ ᴏɴᴇ ɪᴛᴇᴍ ʙʏ ɴᴜᴍʙᴇʀ ☆
╰────`

  return { msg, ids };
};

module.exports = { searchResultGen };
