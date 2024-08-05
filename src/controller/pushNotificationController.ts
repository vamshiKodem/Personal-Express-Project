import { Request, Response } from "express";

import adminFirebase from "../firebase/index";
import { SendPushNotification } from "../interface/pushNotification";

export const sendPushNotificationController = async (
  req: Request,
  res: Response
) => {
  const requestBody: SendPushNotification = req.body;

  if (
    !requestBody.body ||
    !requestBody.navigationId ||
    !requestBody.title ||
    !requestBody.token
  ) {
    return res
      .status(400)
      .send(`missing the required request items ${requestBody}`);
  }

  try {
    await adminFirebase.messaging().send({
      token: requestBody.token,
      notification: {
        body: requestBody.body,
        title: requestBody.title,
      },
      data: {
        navigationId: requestBody.navigationId,
      },
    });
    return res.status(200).send("Push Notification is Send Successfully");
  } catch (err) {
    return res.status(404).send(`${err}`);
  }
};
