import express from "express";

import userController from "../controllers/userController";

const router = express.Router();

router.route("/users").post(userController.createUser);

router.route("/users/:userId").put(userController.editUser).delete(userController.deleteUser)

export default router;
