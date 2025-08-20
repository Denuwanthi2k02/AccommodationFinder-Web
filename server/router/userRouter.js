import express from "express";
import {
  loginUser,
  registerUser,
  getUserData,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

// Register route
userRouter.post("/register", registerUser);

// Login route
userRouter.post("/login", loginUser);

userRouter.get("/data", protect, getUserData);

export default userRouter;
