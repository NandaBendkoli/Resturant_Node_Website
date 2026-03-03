import express from "express";
const router = express.Router();
import userRouter from "../routes/user.router.js";

// all default routes

router.use("/user", userRouter);//user router

export default router;