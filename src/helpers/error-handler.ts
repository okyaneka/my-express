import { Request, Response, NextFunction } from "express";
import { responseApi } from ".";

// Define an interface for the error object to include a status property
export interface CustomError extends Error {
  status?: number;
}

// Error handler middleware
function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack); // Log the error stack trace (optional)
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.json(responseApi({}, statusCode, "failed", message));
}

export default errorHandler;
