import { Router } from "express";
import { createUser, getUsers, login } from "../controller/authController";
import { tokenValidation } from "../utils/tokenValidation";

export const authRouter = Router();

authRouter.get("/get/users", tokenValidation, getUsers);
authRouter.post("/create", createUser);
authRouter.post("/login", login);
