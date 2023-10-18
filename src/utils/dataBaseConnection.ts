import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb://localhost/playground")
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log("error connecting data base", error);
    });
};
