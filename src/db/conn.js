const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected");
    return false;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = dbConnect;
