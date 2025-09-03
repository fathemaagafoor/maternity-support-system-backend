import { Router } from "express";
import { createCaregiverBooking } from "../controllers/caregiverBookingController.js";

const caregiverBookingRoutes = Router();

caregiverBookingRoutes.post("/create", createCaregiverBooking);

export default caregiverBookingRoutes;
