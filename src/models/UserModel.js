const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  username: {
    type: String,
  },
  roles: {
    type: [String],
    default: ["user"],
  },
  options: {
    type: [String],
  },
});

// Define a static method on the schema to add a new item
userSchema.statics.addItem = async function (itemObj) {
  try {
    const newItem = new this(itemObj);
    const savedItem = await newItem.save();
    return savedItem;
  } catch (error) {
    throw new Error("Error adding new item: " + error.message);
  }
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
