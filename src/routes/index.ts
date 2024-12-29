import { Express } from "express";
import AuthRoute from "./AuthRoute";
import StageRoute from "./StageRoute";

const routes = (app: Express) => {
  app.use(AuthRoute);
  app.use("/stage", StageRoute);
};

export default routes;
