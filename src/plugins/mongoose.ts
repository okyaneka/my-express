import db from "mongoose";
import { env } from "~/configs";

const mongoose = async () => {
  try {
    const uri = env.MONGO_URI;
    const connection = await db.connect(uri, { dbName: env.MONGO_DB_NAME });
    console.log("MongoDB connected successfully!");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default mongoose;
