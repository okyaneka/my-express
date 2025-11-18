import cookieParser from "cookie-parser";
import { urlencoded, Express, json } from "express";
import limiter from "./limiter";
import mongoose from "./mongoose";
import cors from "~/configs/cors";
// import "./redis";

const plugins = (app: Express) => {
  mongoose();
  app.use(urlencoded({ extended: true }));
  app.use(limiter());
  app.use(json());
  app.use(cookieParser());
  app.use(cors());
};

export default plugins;
