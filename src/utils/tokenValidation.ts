import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied as no token provided");
  } else {
    try {
      console.log(token);
      jwt.verify(token, config.get("jwtPrivateKey"), (err, decoded) => {
        if (err) {
          console.log(err);
        } else {
          res.locals.jwt = decoded;
          next();
        }
      });
    } catch (ex) {
      return res.status(400).send("Invalid token");
    }
  }
};
