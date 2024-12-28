import { Express } from "express";
import LogMiddleware from "./LogMiddleware";
import ErrorMiddleware from "./ErrorMiddleware";

const middleware = (app: Express) => {
  app.use(ErrorMiddleware);
  app.use(LogMiddleware);
};

export default middleware;
