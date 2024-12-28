import { NextFunction, Request, RequestHandler, Response } from "express";
import response from "~/helpers/response";
import jwt from "jsonwebtoken";
import { ENV } from "~/configs";
import { User } from "~/models";

const AuthMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    res.status(401).json(response.error({}, "Unauthorized", 401));
    return;
  }

  const token = bearer?.split(" ")[1];

  jwt.verify(token, ENV.JWT_SECRET, (err) => {
    if (err) {
      res.status(401).json(response.error({}, err.message, 401));
      return;
    }
  });

  const decoded = jwt.decode(token) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(401).json(response.error({}, "Invalid auth", 401));
    return;
  }

  next();
};

export default AuthMiddleware;
