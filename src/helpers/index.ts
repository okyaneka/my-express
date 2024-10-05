import { NextFunction, Request, Response, Router } from "express";
import { CustomError } from "./error-handler";
import { ValidationError } from "yup";

export interface ResponseApi {
  status: "failed" | "success";
  code: number;
  message: string;
  data: any;
}

export const responseApi = (
  data: any = "",
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
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res).catch(next);
  };
};

export const useController = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handler(req, res, next)).catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json(responseApi(error.errors, 400, "failed"));
      }

      console.error("Error during request handling:", error);
      const message = error.message ?? "Internal Server Error";
      res.status(500).json(responseApi(null, 500, "failed", message));
    });
  };
};
