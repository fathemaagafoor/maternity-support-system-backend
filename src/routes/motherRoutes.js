import { Router } from "express";
import {
  addCheckupLog,
  addEmergencyContact,
  addKickCount,
  addMoodLog,
  // Postnatal tracking
  addRecoveryLog,
  addSymptomLog,
  // Pregnancy tracking
  addWeightLog,
  createMother,
  getAllMother,
  getCheckupLogs,
  getEmergencyContacts,
  getKickCounts,
  getMoodLogs,
  getMyProfile,
  getOneMother,
  getRecoveryLogs,
  getSymptomLogs,
  getWeightLogs,
  markAsDelivered,
  removeCheckupLog,
  removeEmergencyContact,
  removeKickCount,
  removeMoodLog,
  removeRecoveryLog,
  removeSymptomLog,
  removeWeightLog,
  updateMyProfile,
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
// motherRoutes.get("/me/pregnancy-progress", getPregnancyProgress);
motherRoutes.post("/me/mark-delivery", markAsDelivered);

// Weight logs
motherRoutes.get("/me/weight-logs", getWeightLogs);
motherRoutes.post("/me/weight-logs", addWeightLog);
motherRoutes.delete("/me/weight-logs/:log_id", removeWeightLog);

// Symptom logs
motherRoutes.get("/me/symptom-logs", getSymptomLogs);
motherRoutes.post("/me/symptom-logs", addSymptomLog);
motherRoutes.delete("/me/symptom-logs/:log_id", removeSymptomLog);

// Kick counts (baby movement tracking)
motherRoutes.get("/me/kick-counts", getKickCounts);
motherRoutes.post("/me/kick-counts", addKickCount);
motherRoutes.delete("/me/kick-counts/:log_id", removeKickCount);

// Mood logs
motherRoutes.get("/me/mood-logs", getMoodLogs);
motherRoutes.post("/me/mood-logs", addMoodLog);
motherRoutes.delete("/me/mood-logs/:log_id", removeMoodLog);

// Checkup logs
motherRoutes.get("/me/checkups", getCheckupLogs);
motherRoutes.post("/me/checkups", addCheckupLog);
motherRoutes.delete("/me/checkups/:log_id", removeCheckupLog);

// Recovery logs (postnatal)
motherRoutes.get("/me/recovery-logs", getRecoveryLogs);
motherRoutes.post("/me/recovery-logs", addRecoveryLog);
motherRoutes.delete("/me/recovery-logs/:log_id", removeRecoveryLog);

// Dynamic :id route last
motherRoutes.get("/:id", getOneMother);

export default motherRoutes;
