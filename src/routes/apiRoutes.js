import { Router } from "express";
import authRoutes from "./authRoutes.js";
import babyRoutes from "./babyRoutes.js";
import caregiverBookingRoutes from "./caregiverBookingRoutes.js";
import motherRoutes from "./motherRoutes.js";
import caregiverRoutes from "./caregiverRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";
import doctorRoutes from "./doctorRoutes.js";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/baby", babyRoutes);
apiRoutes.use("/caregiver-booking", caregiverBookingRoutes);
apiRoutes.use("/mother", motherRoutes);
apiRoutes.use("/caregiver", caregiverRoutes);
apiRoutes.use("/appointment", appointmentRoutes);
apiRoutes.use("/doctor", doctorRoutes);

export default apiRoutes;
