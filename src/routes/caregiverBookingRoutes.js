import { Router } from "express";
import { createCaregiverBooking, getAllcaregiverBooking, getOnecaregiverBooking } from "../controllers/caregiverBookingController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const caregiverBookingRoutes = Router();
caregiverBookingRoutes.use(authenticateToken)
caregiverBookingRoutes.post("/create", createCaregiverBooking);
caregiverBookingRoutes.get("/", getAllcaregiverBooking);
caregiverBookingRoutes.get("/:id", getOnecaregiverBooking);
export default caregiverBookingRoutes;
