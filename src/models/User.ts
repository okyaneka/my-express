import mongoose, { ToObjectOptions } from "mongoose";

export interface User {
  email: string;
  username: string;
  password: string;
}

const options: ToObjectOptions = {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret._id;
    return { id: ret.id, ...ret };
  },
};

const userSchema = new mongoose.Schema<User>(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    virtuals: true,
    versionKey: false,
  }
);

userSchema.virtual("id").get(function () {
  return this._id.toString();
});

userSchema.set("toJSON", options);
userSchema.set("toObject", options);

const User = mongoose.model<User>("User", userSchema);

export default User;
