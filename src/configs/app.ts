import dotenv from "dotenv";

dotenv.config();

const config = {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: parseInt(process.env.DB_PORT || "3306"),
  MONGODB_URL: process.env.MONGODB_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
};
export default config;
