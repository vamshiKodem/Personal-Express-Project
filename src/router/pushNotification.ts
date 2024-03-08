import { Router } from "express";
import { sendPushNotificationController } from "../controller/pushNotificationController";

export const pushNotificationRouter = Router();

pushNotificationRouter.post("/send", sendPushNotificationController);
