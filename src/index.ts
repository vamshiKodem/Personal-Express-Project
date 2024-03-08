import express from "express";
// import config from "config";
import { productsRouter } from "./router/product";
import { authRouter } from "./router/auth";
import { pushNotificationRouter } from "./router/pushNotification";

import { connectDataBase } from "./utils";

// if (!config.get("jwtPrivateKey")) {
//   console.log("Fatal error");
//   process.exit(1);
// }
const app = express();
app.use(express.json());

app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/pushNotification", pushNotificationRouter);

connectDataBase();

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`server running in port ${port}`));
