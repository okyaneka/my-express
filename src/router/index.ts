import { Router } from "express";
import {
  LoginController,
  ProfileController,
  RegisterController,
} from "@/modules/auth";

const router = Router();

console.log(LoginController);

router
  .get("/profile", ProfileController)
  .post("/login", LoginController)
  .post("/register", RegisterController);

export default router;
