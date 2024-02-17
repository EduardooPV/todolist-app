import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export default function connectDB() {
  const url = process.env.URL_MONGODB;

  try {
    mongoose.connect(url || "");
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected`);
  });

  dbConnection.on("error", (err) => {
    console.error(`Database connection error: ${err}`);
  });

  return;
}
