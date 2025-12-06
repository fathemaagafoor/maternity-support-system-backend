import { Router } from "express";
import {
  createAppointment,
  getAllAppointment,
  getOneAppointment,
  getMyAppointments,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const appointmentRoutes = Router();

// All routes need authentication
appointmentRoutes.use(authenticateToken);

// Static routes first
appointmentRoutes.get("/all", getAllAppointment); // Admin route
appointmentRoutes.post("/create", createAppointment);
appointmentRoutes.get("/my-appointments", getMyAppointments);

// Dynamic :id routes
appointmentRoutes.get("/:id", getOneAppointment);
appointmentRoutes.put("/:id", updateAppointment);
appointmentRoutes.delete("/:id", deleteAppointment);

export default appointmentRoutes;
