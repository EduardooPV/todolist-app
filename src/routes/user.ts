import express, { Request, Response } from "express";

import createUser from "../controllers/user/create";
import updateUser from "../controllers/user/update";
import deleteUser from "../controllers/user/delete";
import loginUser from "../controllers/user/login";
import authenticate from "../middlewares/auth";

const router = express.Router();

router.route("/users").post(createUser);
router
  .route("/users/:userId")
  .put(authenticate, updateUser)
  .delete(authenticate, deleteUser);
router.route("/users/login").post(loginUser);

export default router;
