import { Express } from "express";
import AuthRoute from "./AuthRoute";

const routes = (app: Express) => {
  app.use(AuthRoute);
};

export default routes;
