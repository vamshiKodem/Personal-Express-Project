import { Request, Response } from "express";

import adminFirebase from "../firebase/index";
import { SendPushNotification } from "../interface/pushNotification";

export const sendPushNotificationController = async (
  req: Request,
  res: Response
) => {
  const body: SendPushNotification = req.body;

  if (!body.body || !body.navigationId || !body.title || !body.token) {
    return res.status(400).send(`missing the requred request items ${body}`);
  }

  try {
    await adminFirebase.messaging().send({
      token: body.token,
      notification: {
        body: body.body,
        title: body.title,
      },
      data: {
        navigationId: body.navigationId,
      },
    });
    return res.status(200).send("Push Notification is Send Successfully");
  } catch (err) {
    return res.status(404).send(`${err} `);
  }
};
