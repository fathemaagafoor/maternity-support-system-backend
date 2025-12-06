import { Router } from "express";
import {
  createMother,
  getAllMother,
  getOneMother,
  getMyProfile,
  updateMyProfile,
  addEmergencyContact,
  removeEmergencyContact,
  getEmergencyContacts,
  // Pregnancy tracking
  addWeightLog,
  getWeightLogs,
  addSymptomLog,
  getSymptomLogs,
  addKickCount,
  getKickCounts,
  addMoodLog,
  getMoodLogs,
  addCheckupLog,
  getCheckupLogs,
  markDelivery,
  getPregnancyProgress,
} from "../controllers/motherController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const motherRoutes = Router();

// All mother routes need authentication
motherRoutes.use(authenticateToken);

// Static routes first
motherRoutes.get("/all", getAllMother); // Admin route
motherRoutes.post("/create", createMother);
motherRoutes.get("/me/profile", getMyProfile);
motherRoutes.put("/me/profile", updateMyProfile);

// Emergency contacts for SOS
motherRoutes.get("/me/emergency-contacts", getEmergencyContacts);
motherRoutes.post("/me/emergency-contacts", addEmergencyContact);
motherRoutes.delete(
  "/me/emergency-contacts/:contact_id",
  removeEmergencyContact
);

// Pregnancy tracking routes
motherRoutes.get("/me/pregnancy-progress", getPregnancyProgress);
motherRoutes.post("/me/mark-delivery", markDelivery);

// Weight logs
motherRoutes.get("/me/weight-logs", getWeightLogs);
motherRoutes.post("/me/weight-logs", addWeightLog);

// Symptom logs
motherRoutes.get("/me/symptom-logs", getSymptomLogs);
motherRoutes.post("/me/symptom-logs", addSymptomLog);

// Kick counts (baby movement tracking)
motherRoutes.get("/me/kick-counts", getKickCounts);
motherRoutes.post("/me/kick-counts", addKickCount);

// Mood logs
motherRoutes.get("/me/mood-logs", getMoodLogs);
motherRoutes.post("/me/mood-logs", addMoodLog);

// Checkup logs
motherRoutes.get("/me/checkups", getCheckupLogs);
motherRoutes.post("/me/checkups", addCheckupLog);

// Dynamic :id route last
motherRoutes.get("/:id", getOneMother);

export default motherRoutes;
