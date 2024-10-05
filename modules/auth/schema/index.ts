import * as yup from "yup";
import { AuthRegisterPayload } from "../interface";

export const LoginPayloadSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const RegisterPayloadSchema = yup.object<AuthRegisterPayload>().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Password doesnt match")
    .min(8)
    .required(),
});
