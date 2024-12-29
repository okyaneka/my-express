import mongoose from "mongoose";
import ENV from "./env";

const mongodb = async () => {
  try {
    const uri = ENV.MONGO_URI;
    await mongoose.connect(uri, { dbName: ENV.MONGO_DB_NAME });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default mongodb;
