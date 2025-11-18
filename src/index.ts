import express from "express";
import routes from "~/routes";
import plugins from "./plugins";
import { env } from "./configs";
import response from "./helpers/response";
import LogMiddleware from "./middlewares/LogMiddleware";
import ErrorMiddleware from "./middlewares/ErrorMiddleware";

const app = express();
const port = env.PORT;

plugins(app);

app.use(LogMiddleware);

routes(app);

app.get("/", (req, res) => {
  res.json(response.success("My Express"));
});

app.use((req, res) => {
  res.status(404).send(response.error("route not found", 404));
});

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
