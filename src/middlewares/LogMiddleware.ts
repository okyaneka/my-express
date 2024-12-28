import { NextFunction, Request, RequestHandler, Response } from "express";
import path from "path";
import fs from "fs";

const logPath = path.join(__dirname, "../../logs/access.log");

const logsDir = path.dirname(logPath);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const LogMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;

  const logMessage = `[${timestamp}] ${method}: ${path}\n`;
  console.log(logMessage);
  fs.appendFile(logPath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log to file", err);
    }
  });

  next();
};

export default LogMiddleware;
