import * as yup from "yup";
import { User } from "../interface";

export const UserSchema = yup.object<User>().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
