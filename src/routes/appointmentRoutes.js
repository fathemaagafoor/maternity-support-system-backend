import { Router } from "express";

import {
	createAppointment,
	getAllAppointment,
	getOneAppointment,
} from "../controllers/appointmentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const appointmentRoutes = Router();
appointmentRoutes.post("/create", authenticateToken, createAppointment);
appointmentRoutes.get("/", getAllAppointment),
	appointmentRoutes.get("/:id", getOneAppointment);
export default appointmentRoutes;
