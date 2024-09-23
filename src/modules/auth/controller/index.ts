import useDB from "@/configs/db";
import { controller, ResponseJson } from "@/helpers";

export const LoginController = controller(async (req, res) => {
  const db = await useDB();
  const g = db.query("SELECT * FROM user");
  console.log(g);
  res.json(ResponseJson("login"));
});

export const RegisterController = controller(async (req, res) => {
  res.json(ResponseJson("register"));
});

export const ProfileController = controller(async (req, res) => {
  res.json(ResponseJson("profile"));
});
