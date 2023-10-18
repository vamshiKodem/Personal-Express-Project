import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import config from "config";

import { LoginData, User } from "../interface/auth";
import { UserModel, validateUser } from "../model/authModel";
import { generateSalt } from "../utils";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select({ email: 1 });
    return res.status(200).send(users);
  } catch (err) {
    return res.status(400).send(`Users not found`);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  const body: User = req.body;
  if (error) {
    return res.status(400).send(error.message);
  }

  const sameEmailUser = await UserModel.findOne({ email: body.email });

  if (sameEmailUser) {
    return res.status(400).send("Email is already taken");
  } else {
    const salt = await generateSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user: User = new UserModel({
      email: body.email,
      password: hashedPassword,
    });

    try {
      const response = await user.save();
      // TODO: Need to find the solution to not to send the password in response
      return res.status(200).send(response);
    } catch (err) {
      return res.status(400).send(`${err} Unable to create user`);
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  const body: LoginData = req.body;

  if (!error) {
    try {
      const user = await UserModel.findOne({ email: body.email });
      if (user) {
        const isValidPassword = await bcrypt.compare(
          body.password,
          user.password
        );
        if (isValidPassword) {
          const token = jwt.sign({ id: body._id }, config.get("jwtPrivateKey"));
          return res.header("x-auth-token", token).status(200).send(token);
        } else {
          console.log("Its not correct password");
          return res.status(400).send("email or password is invalid");
        }
      } else {
        return res.status(400).send("email or password is invalid");
      }
    } catch (err) {
      return res.status(400).send("Some generic error");
    }
  } else {
    return res.status(400).send(error.message);
  }
};
