import express from "express";
import {
  loginUser,
  registerUser,
  getUserData,
  searchAccommodations,
  getAnnexs,
  getAnnexById 
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

// Register route
userRouter.post("/register", registerUser);

// Login route
userRouter.post("/login", loginUser);

// Get logged-in user data
userRouter.get("/data", protect, getUserData);

// Get Accommodation data
userRouter.get("/accommodations", getAnnexs);

// Search accommodations
userRouter.get("/search", searchAccommodations);

userRouter.get("/accommodation/:id", getAnnexById);
export default userRouter;
