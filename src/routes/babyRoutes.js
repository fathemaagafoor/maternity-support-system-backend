import { Router } from "express";
import {
  createBaby,
  getAllBaby,
  getOneBaby,
  getMyBabies,
  updateBaby,
  addFeedingLog,
  getFeedingLogs,
  addSleepLog,
  getSleepLogs,
  addDiaperLog,
  getDiaperLogs,
  addVaccination,
  getVaccinations,
} from "../controllers/babyController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const babyRoutes = Router();

// All baby routes need authentication
babyRoutes.use(authenticateToken);

// Static routes first (before :id routes)
babyRoutes.get("/all", getAllBaby); // Admin route
babyRoutes.post("/create", createBaby);
babyRoutes.get("/my-babies", getMyBabies);

// Dynamic :id routes
babyRoutes.get("/:id", getOneBaby);
babyRoutes.put("/:id", updateBaby);

// Feeding tracking
babyRoutes.post("/:id/feeding", addFeedingLog);
babyRoutes.get("/:id/feeding", getFeedingLogs);

// Sleep tracking
babyRoutes.post("/:id/sleep", addSleepLog);
babyRoutes.get("/:id/sleep", getSleepLogs);

// Diaper tracking
babyRoutes.post("/:id/diaper", addDiaperLog);
babyRoutes.get("/:id/diaper", getDiaperLogs);

// Vaccination tracking
babyRoutes.post("/:id/vaccination", addVaccination);
babyRoutes.get("/:id/vaccination", getVaccinations);

export default babyRoutes;
