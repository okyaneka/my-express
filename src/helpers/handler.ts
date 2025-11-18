import { NextFunction, Request, RequestHandler, Response } from "express";
import response from "./response";

type OpsHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

const handler = <T>(ops: OpsHandler<T>): RequestHandler => {
  return (req, res, next) => {
    ops(req, res, next)
      .then((data) => {
        res.json(response.success(data));
      })
      .catch((err) => next(err));
  };
};

export default handler;
