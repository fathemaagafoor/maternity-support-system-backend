import { Router } from "express";
import { signIn, signup } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signIn);

export default authRoutes;
