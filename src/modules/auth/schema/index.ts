import * as yup from "yup";

export const LoginScheme = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
