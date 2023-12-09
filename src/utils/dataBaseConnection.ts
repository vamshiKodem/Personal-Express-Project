import mongoose from "mongoose";

export const connectDataBase = () => {
  mongoose
    .connect("mongodb://localhost/playground")
    .then(() => {
      console.log("*********Connected to database*********");
    })
    .catch((error) => {
      console.log("error connecting data base", error);
    });
};
