const SearchModel = require("../../../models/SearchModel");
const { searchResultGen } = require("../../../utils/messageGenerate");
const { sendReply } = require("../../../whatsapp/message");

const handleMultiSearchResults = async function (type, searchResults, msg) {
  // generate search result message
  const { msg: searchMsg, ids } = searchResultGen(searchResults);

  const reply = await sendReply(searchMsg, msg);

  const newSearch = new SearchModel({
    userId: msg.key.remoteJid,
    replyId: reply.key.id,
    type,
    searchCount: ids.length,
    searchResults: ids,
  });

  await newSearch.save();
};

module.exports = handleMultiSearchResults;
