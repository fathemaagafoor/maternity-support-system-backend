import { Router } from "express";
import articleRoutes from "./articleRoutes.js";
import authRoutes from "./authRoutes.js";
import babyRoutes from "./babyRoutes.js";
import caregiverBookingRoutes from "./caregiverBookingRoutes.js";
import caregiverRoutes from "./caregiverRoutes.js";
import doctorRoutes from "./doctorRoutes.js";
import hospitalRoutes from "./hospitalRoutes.js";
import motherRoutes from "./motherRoutes.js";
import vaccineRoutes from "./vaccineRoutes.js";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/baby", babyRoutes);
apiRoutes.use("/caregiver-booking", caregiverBookingRoutes);
apiRoutes.use("/mother", motherRoutes);
apiRoutes.use("/caregiver", caregiverRoutes);
apiRoutes.use("/doctor", doctorRoutes);
apiRoutes.use("/hospital", hospitalRoutes);
apiRoutes.use("/vaccine", vaccineRoutes);
apiRoutes.use("/article", articleRoutes);

export default apiRoutes;
