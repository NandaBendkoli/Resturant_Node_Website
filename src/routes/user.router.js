import express from "express";
import { createUser,loginUser,getAllUser } from "../controllers/user.controller.js";
import { verifyToken } from "../MIddleware/auth.middleware.js";

const router = express.Router();

router.post("/createUser",createUser);
router.post("/loginUser",loginUser);
router.post("/getAllUser",verifyToken,getAllUser);


export default router;








