const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  replyId: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  searchCount: {
    type: Number,
    require: true,
  },
  searchResults: [String],
});

const SearchModel = new mongoose.model("Search", searchSchema);

module.exports = SearchModel;
