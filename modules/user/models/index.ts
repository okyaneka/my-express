import { model, Schema } from "mongoose";

export const useUserModel = () => {
  const schema = new Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { versionKey: false, timestamps: true }
  );

  const user = model("User", schema);
  return user;
};
