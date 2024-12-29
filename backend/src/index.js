// require('dotenv').config({path: "./env"})
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});
import connectDb from "./db/index.js";
import { app } from "./app.js";

connectDb()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed", error);
  });

// First approach to connect DB
/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.listen("error", (error) => {
        console.log("ERROR", error);
        throw error
    })
    app.listen(process.env.PORT, ()=> {
        console.log(`App is listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log("ERROR", error);
    throw error
  }
})();*/
