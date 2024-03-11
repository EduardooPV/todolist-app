import express from "express";

import authenticate from "../middlewares/auth";

import createTask from "../controllers/task/create";
import getAll from "../controllers/task/getAll";
import complete from "../controllers/task/complete";
import update from "../controllers/task/update";
import deleteTask from "../controllers/task/delete";

const router = express.Router();

router.route("/task").post(authenticate, createTask);
router.route("/task/:userId").get(authenticate, getAll);
router.route("/task/toggle/:taskId").patch(authenticate, complete);
router
  .route("/task/:taskId")
  .put(authenticate, update)
  .delete(authenticate, deleteTask);

export default router;
