import { Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
}

export interface LoginData extends Document {
  email: string;
  password: string;
}
