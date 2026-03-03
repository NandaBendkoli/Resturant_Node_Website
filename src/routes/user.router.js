import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  getAllUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../MIddleware/auth.middleware.js";

const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.get("/getUser", verifyToken, getUser); //get single user
router.get("/getAllUser", getAllUser); //get single user

export default router;
