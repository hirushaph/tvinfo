require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/conn");
const connectToWhatsApp = require("./whatsapp/waConnect");
const { setupOwner } = require("./utils/helpers");
const { default: mongoose } = require("mongoose");
const { EXPRESS_PORT } = require("./config/config");

const app = express();
const port = EXPRESS_PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server Running in Port ${port}`);
});

const startBot = async function () {
  await dbConnect();
  await connectToWhatsApp();
  await setupOwner();
};

startBot();

process.on("SIGINT", function () {
  mongoose.disconnect();
  console.log("db disconnected");
  process.exit();
});
