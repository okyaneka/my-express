import { NextFunction, Request, RequestHandler, Response } from "express";

const SampleMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("SampleMiddleware executed");

  next();
};

export default SampleMiddleware;
