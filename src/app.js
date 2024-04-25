require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/conn");
const connectToWhatsApp = require("./whatsapp/waConnect");
const { setupOwner } = require("./utils/helpers");
const { default: mongoose } = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen("3002", () => {
  console.log("Server Running in Port 3000");
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
