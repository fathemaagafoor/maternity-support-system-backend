import { Router } from "express";

import { createAppointment } from "../controllers/appointmentController.js";

const appointmentRoutes = Router();
appointmentRoutes.post("/create", createAppointment);
export default appointmentRoutes;
