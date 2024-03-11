import express from "express";

import authenticate from "../middlewares/auth";

import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../controllers/task";

const router = express.Router();

router.post("/tasks", authenticate, createTask);
router.get("/tasks/:userId", authenticate, getAllTasks);
router.put("/tasks/:taskId", authenticate, updateTask);
router.delete("/tasks/:taskId", authenticate, deleteTask);
router.patch("/tasks/:taskId/toggle", authenticate, toggleTaskCompletion);

export default router;
