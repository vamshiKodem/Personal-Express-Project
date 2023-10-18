import { Schema, model } from "mongoose";
import { User } from "../interface/auth";
import Joi from "joi";

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 250,
  },
});

export const UserModel = model<User>("User", userSchema);

export const validateUser = (user: User) => {
  const schema = Joi.object({
    email: Joi.string().required().email().min(5).max(50),
    password: Joi.string().required().min(5).max(250),
  });

  return schema.validate(user);
};
