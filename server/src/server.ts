import express from "express";
import database from "./config/database";

import userRouter from "./routes/user";
import taskRouter from "./routes/task";

const app = express();
app.use(express.json());

database();

app.use(userRouter);
app.use(taskRouter);

app.listen(3333, () => {
  console.log("Server is running in locally...");
});
