import SearchModel from "../../../models/SearchModel.js";
import { searchResultGen } from "../../../utils/messageGenerate.js";
import { sendReply } from "../../../whatsapp/message.js";

export const handleMultiSearchResults = async function (
  type,
  searchResults,
  msg
) {
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
