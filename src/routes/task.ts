import express from "express";

import createTask from "../controllers/task/create";
import getAll from "../controllers/task/getAll";
import complete from "../controllers/task/complete";
import update from "../controllers/task/update";
import deleteTask from "../controllers/task/delete";

const router = express.Router();

router.route("/task").post(createTask);
router.route("/task/:userId").get(getAll);
router.route("/task/toggle/:taskId").patch(complete);
router.route("/task/:taskId").put(update).delete(deleteTask);

export default router;
