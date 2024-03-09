import express from "express";

import createTask from "../controllers/task/create";
import getAll from "../controllers/task/getAll";

const router = express.Router();

router.route("/task").post(createTask);
router.route("/task/:userId").get(getAll)

export default router;
