import express from "express";
import database from "./config/database";

const app = express();
const port: number = 3333;

database();

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
