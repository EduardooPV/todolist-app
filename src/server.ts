import express from "express";
import database from "./config/database";

import userRouter from "./routes/user";

const app = express();
app.use(express.json());

database();

app.use(userRouter);

app.listen(3333, () => {
  console.log("Server is running in locally...");
});
