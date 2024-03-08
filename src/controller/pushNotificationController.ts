import { Request, Response } from "express";

import adminFirebase from "../firebase/index";
import { SendPushNotification } from "../interface/pushNotification";

export const sendPushNotificationController = async (
  req: Request,
  res: Response
) => {
  const {
    token,
    notification: { body, title },
  }: SendPushNotification = req.body;

  try {
    await adminFirebase
      .messaging()
      .send({ token, notification: { title, body } });
    return res.status(200).send("Push Notification is Send Successfully");
  } catch (err) {
    return res.status(404).send(`${err} `);
  }
};
