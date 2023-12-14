import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/stories.js";

dotenv.config();

const app = express();

// app.use((req, res, next) => {
//   let rawData = "";

//   req.on("data", (chunk) => {
//     rawData += chunk;
//   });

//   req.on("end", () => {
//     console.log("Raw Request Body:", rawData);
//     next();
//   });
// });

app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));
app.use(bodyParser.json({ limit: "32mb", extended: true }));

app.use(cors());

app.use("/stories", router);

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log(`server running on localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to mongodb", err.message);
  }
};
ConnectDB();

mongoose.connection.on("open", () =>
  console.log("connection to database has been established")
);
