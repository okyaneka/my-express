import express, { NextFunction, Request, Response } from "express";
import { ENV, mongodb } from "~/configs";
import middleware from "~/middlewares";
import routes from "./routes";
import response from "~/helpers/response";

const app = express();
const port = ENV.PORT;

mongodb();

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json(response.success("QHunt API"));
});

routes(app);
middleware(app);

app.use((req, res, next) => {
  res.status(404).send(response.error(null, "Route not found", 404));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
