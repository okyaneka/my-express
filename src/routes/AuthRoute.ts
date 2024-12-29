import { Router } from "express";
import { User } from "~/models";
import joi from "joi";
import response from "~/helpers/response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "~/configs";
import AuthMiddleware from "~/middlewares/AuthMiddleware";

const AuthRoute = Router();

const registerSchema = joi.object({
  username: joi.string().default(""),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

AuthRoute.get("/profile", AuthMiddleware, async (req, res) => {
  const bearer = req.headers.authorization;
  const token = bearer?.split(" ")[1];

  const { id } = jwt.decode(token || "") as { id: string };
  const user = await User.findById(id);
  res.json(response.success(user?.toObject()));
});

AuthRoute.post("/login", async (req, res) => {
  const result = registerSchema.validate(req.body, { abortEarly: false });
  const validation = result.error?.details.reduce((car, cur) => {
    return { ...car, [cur.context?.key as string]: cur.message };
  }, {});
  if (validation) {
    res.status(400).json(response.error({ validation }, "Validation error"));
    return;
  }

  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json(response.error({}, "User not exists"));
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user?.password
  );

  if (!isPasswordValid) {
    res.status(400).json(response.error({}, "Password is invalid"));
    return;
  }

  const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  res.json(response.success({ ...user.toObject(), token }, "Login success"));
});

AuthRoute.post("/register", async (req, res) => {
  const result = registerSchema.validate(req.body, { abortEarly: false });
  const validation = result.error?.details.reduce((car, cur) => {
    return { ...car, [cur.context?.key as string]: cur.message };
  }, {});
  if (validation) {
    res.status(400).json(response.error({ validation }, "Validation error"));
    return;
  }

  const email = req.body.email;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json(response.error({}, "User already exists"));
    return;
  }

  const password = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...result.value, password });
  await user.save();

  res.json(response.success({}, "Register success"));
});

export default AuthRoute;
