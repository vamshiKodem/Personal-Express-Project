export interface SendPushNotification {
  token: string;
  notification: {
    title: string;
    body: string;
  };
}
