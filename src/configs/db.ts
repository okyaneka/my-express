import config from "./app";
import mysql from "mysql2/promise";
import mongoose from "mongoose";

export const useMysqlDB = async () =>
  await mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: config.DB_PORT,
  });

export const useMongoDB = async () => {
  mongoose
    .connect(config.MONGODB_URL, { dbName: "my-express" })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};
