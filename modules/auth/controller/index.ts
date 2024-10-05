import { useController as controller, responseApi } from "@/helpers";
import { LoginPayloadSchema, RegisterPayloadSchema } from "../schema";
import { UserSchema } from "@/modules/user/schema";
import bcrypt from "bcryptjs";
import { useUserModel } from "@/modules/user/models";
import { models } from "mongoose";
import jwt from "jsonwebtoken";
import config from "@/configs/app";

export const LoginController = controller(async (req, res) => {
  const User = models.User ?? useUserModel();
  const payload = await LoginPayloadSchema.validate(req.body);

  const user = await User.findOne({ email: payload.email });
  if (!user) throw new Error("User is not exists");

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "1y",
  });
  res.json(responseApi({ user, token }));
});

export const RegisterController = controller(async (req, res) => {
  const User = models.User ?? useUserModel();
  const payload = await RegisterPayloadSchema.validate(req.body);

  const isExist = await User.findOne({ email: payload.email });
  if (isExist) throw new Error("User already registered");

  const data = await UserSchema.validate(payload);
  data.password = await bcrypt.hash(data.password, 10);
  const user = new User(data);
  await user.save();

  res.json(responseApi(null, 201));
});

export const ProfileController = controller(async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json(responseApi("", 401, "failed", "Invalid token"));

  const User = models.User ?? useUserModel();
  const decoded = jwt.verify(token, config.JWT_SECRET) as any;

  const user = await User.findById(decoded.id).select("-password");
  if (!user)
    return res
      .status(401)
      .json(responseApi("", 401, "failed", "Invalid token"));

  res.json(responseApi(user));
});
