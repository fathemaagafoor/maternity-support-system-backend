import { Router } from "express";
import authRoutes from "./authRoutes.js";
import babyRoutes from "./babyRoutes.js";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/baby", babyRoutes);

export default apiRoutes;
