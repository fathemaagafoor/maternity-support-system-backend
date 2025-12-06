import { Router } from "express";
import {
  signIn,
  signup,
  getMe,
  changePassword,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const authRoutes = Router();

// Public routes
authRoutes.post("/signup", signup);
authRoutes.post("/signin", signIn);

// Protected routes (need to be logged in)
authRoutes.get("/me", authenticateToken, getMe);
authRoutes.put("/change-password", authenticateToken, changePassword);

export default authRoutes;
