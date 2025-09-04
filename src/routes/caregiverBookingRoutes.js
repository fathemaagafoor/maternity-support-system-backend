import { Router } from "express";
import { createCaregiverBooking, getAllcaregiverBooking, getOnecaregiverBooking } from "../controllers/caregiverBookingController.js";

const caregiverBookingRoutes = Router();

caregiverBookingRoutes.post("/create", createCaregiverBooking);
caregiverBookingRoutes.get("/",getAllcaregiverBooking);
caregiverBookingRoutes.get("/:id",getOnecaregiverBooking);
export default caregiverBookingRoutes;
