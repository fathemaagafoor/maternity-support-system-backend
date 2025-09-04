import { Router } from "express";

import {
	createAppointment,
	getAllAppointment,
	getOneAppointment,
} from "../controllers/appointmentController.js";

const appointmentRoutes = Router();
appointmentRoutes.post("/create", createAppointment);
appointmentRoutes.get("/", getAllAppointment),
	appointmentRoutes.get("/:id", getOneAppointment);
export default appointmentRoutes;
