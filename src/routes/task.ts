import express from "express";

import createTask from "../controllers/task/create";
import getAll from "../controllers/task/getAll";
import complete from "../controllers/task/complete";

const router = express.Router();

router.route("/task").post(createTask);
router.route("/task/:userId").get(getAll)
router.route("/task/toggle/:taskId").patch(complete)

export default router;
