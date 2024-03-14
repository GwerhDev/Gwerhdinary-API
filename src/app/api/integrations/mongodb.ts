import mongoose from "mongoose";
import { mongodbString } from "../config";

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbString || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;