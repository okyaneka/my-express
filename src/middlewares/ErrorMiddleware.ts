import fs from "fs";
import path from "path";
import { NextFunction, ErrorRequestHandler, Response, Request } from "express";
import response from "~/helpers/response";

const logPath = path.join(__dirname, "../../../logs/error.log");

const logsDir = path.dirname(logPath);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const ErrorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;

  const logMessage = `[${timestamp}] ${method}: ${path} . ${err.stack?.toString()}\n`;
  console.log(logMessage);
  fs.appendFile(logPath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log to file", err);
    }
  });

  const code = Number(res.locals.status || 400);
  console.error(err.stack);
  res.status(code).json(response.error(err.message, code));
};

export default ErrorMiddleware;
