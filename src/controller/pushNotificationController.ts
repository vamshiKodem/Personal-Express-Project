import { Request, Response } from "express";

import adminFirebase from "../firebase/index";
import { SendPushNotification } from "../interface/pushNotification";

export const sendPushNotificationController = async (
  req: Request,
  res: Response
) => {
  const body: SendPushNotification = req.body;

  try {
    await adminFirebase.messaging().send({
      token: body.token,
      notification: {
        body: body.body,
        title: body.title,
      },
    });
    return res.status(200).send("Push Notification is Send Successfully");
  } catch (err) {
    return res.status(404).send(`${err} `);
  }
};
