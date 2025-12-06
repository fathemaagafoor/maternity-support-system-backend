import { Router } from "express";
import { 
	createBooking, 
	getMyBookings, 
	cancelBooking,
	addReview,
	getBookingsForMe,
	acceptBooking,
	rejectBooking,
	completeBooking,
	getAllBookings,
	getOneBooking
} from "../controllers/caregiverBookingController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const caregiverBookingRoutes = Router();

// All routes need authentication
caregiverBookingRoutes.use(authenticateToken);

// Static routes first
caregiverBookingRoutes.get("/all", getAllBookings); // Admin route
caregiverBookingRoutes.post("/create", createBooking);
caregiverBookingRoutes.get("/my-bookings", getMyBookings);
caregiverBookingRoutes.get("/for-me", getBookingsForMe);

// Dynamic :id routes
caregiverBookingRoutes.get("/:id", getOneBooking);
caregiverBookingRoutes.put("/:id/cancel", cancelBooking);
caregiverBookingRoutes.post("/:id/review", addReview);
caregiverBookingRoutes.put("/:id/accept", acceptBooking);
caregiverBookingRoutes.put("/:id/reject", rejectBooking);
caregiverBookingRoutes.put("/:id/complete", completeBooking);

export default caregiverBookingRoutes;

export default caregiverBookingRoutes;
