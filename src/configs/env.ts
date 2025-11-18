import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,

  MONGO_URI: process.env.MONGO_URI || "",
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",

  REDIS_HOST: process.env.REDIS_HOST || "",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",

  AWS_REGION: process.env.AWS_REGION || "ap-southeast-1",
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || "",
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || "",
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",

  THROTTLE_TIME: Number(process.env.THROTTLE_TIME) || 1,
  THROTTLE_COUNT: Number(process.env.THROTTLE_COUNT) || 5,

  JWT_SECRET: process.env.JWT_SECRET || "",

  APP_URL: process.env.APP_URL || "",

  DOMAIN: process.env.DOMAIN || "",
} as const;

export default env;
