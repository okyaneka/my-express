import express, { NextFunction, Request, Response } from "express";
import { ENV, mongodb } from "~/configs";
import middleware from "~/middlewares";
import routes from "./routes";

const app = express();
const port = ENV.PORT;

mongodb();

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  throw new Error("Something went wrong");
});

routes(app);
middleware(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
