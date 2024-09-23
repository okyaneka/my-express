import { NextFunction, Request, Response, Router } from "express";

export interface ResponseApi {
  status: "failed" | "success";
  code: number;
  message: string;
  data: any;
}

export const ResponseJson = (
  data: any,
  code: number = 200,
  status: "failed" | "success" = "success",
  message: string = "OK"
): ResponseApi => {
  return {
    status,
    code,
    message,
    data,
  };
};

export const controller = (
  callback: (req: Request, res: Response) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) =>
    callback(req, res).catch(next);
};
