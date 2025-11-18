import { Express } from "express";
import SampleRoute from "./SampleRoute";

const routes = (app: Express) => {
  app.use("/sample", SampleRoute);
};

export default routes;
