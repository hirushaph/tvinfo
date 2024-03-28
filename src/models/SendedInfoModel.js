const mongoose = require("mongoose");

const sendedInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  infoId: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  shortLanguage: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

// Define a static method on the schema to add a new item
sendedInfoSchema.statics.addItem = async function (itemObj) {
  try {
    const newItem = new this(itemObj);
    const savedItem = await newItem.save();
    return savedItem;
  } catch (error) {
    throw new Error("Error adding new item: " + error.message);
  }
};

const SendedInfoModel = mongoose.model("SendedInfo", sendedInfoSchema);

module.exports = SendedInfoModel;
