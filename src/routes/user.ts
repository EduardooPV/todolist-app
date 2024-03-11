import express from "express";

import authenticate from "../middlewares/auth";

import {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user";

const router = express.Router();

router.route("/users").post(createUser);
router.put("/users/:userId", authenticate, updateUser);
router.delete("/users/:userId", authenticate, deleteUser);
router.post("/users/login", loginUser);

export default router;
