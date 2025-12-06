import { Router } from "express";
import {
  createCaregiver,
  getAllCaregiver,
  getOneCaregiver,
  getMyProfile,
  updateMyProfile,
} from "../controllers/caregiverController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const caregiverRoutes = Router();

// Public routes - anyone can see approved caregivers
caregiverRoutes.get("/all", getAllCaregiver);

// Protected routes - need to be logged in
caregiverRoutes.use(authenticateToken);
caregiverRoutes.post("/create", createCaregiver);
caregiverRoutes.get("/me/profile", getMyProfile);
caregiverRoutes.put("/me/profile", updateMyProfile);

// Get one caregiver by ID (after static routes)
caregiverRoutes.get("/:id", getOneCaregiver);

export default caregiverRoutes;
