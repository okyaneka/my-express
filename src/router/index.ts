import { Router } from "express";
import * as Auth from "@/modules/auth";

const router = Router();

router
  .get("/profile", Auth.ProfileController)
  .post("/login", Auth.LoginController)
  .post("/register", Auth.RegisterController);

export default router;
