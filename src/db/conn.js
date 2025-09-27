import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected");
    return false;
  } catch (error) {
    throw new Error(error);
  }
}
