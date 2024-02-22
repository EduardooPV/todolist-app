import express from "express";

import createUser from "../controllers/user/create";
import updateUser from "../controllers/user/update";
import deleteUser from "../controllers/user/delete";

const router = express.Router();

router.route("/users").post(createUser);

router.route("/users/:userId")
  .put(updateUser)
  .delete(deleteUser)

export default router;
