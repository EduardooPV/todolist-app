import express from "express";

import createTask from "../controllers/task/create";

const router = express.Router();

router.route("/task").post(createTask);

export default router;
