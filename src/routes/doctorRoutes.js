import { Router } from "express";
import { createDoctor, getAllDoctor, getOneDoctor } from "../controllers/doctorController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const doctorRoutes = Router();
doctorRoutes.use(authenticateToken)
doctorRoutes.post("/create", createDoctor);
doctorRoutes.get("/", getAllDoctor);
doctorRoutes.get("/:id", getOneDoctor);

export default doctorRoutes;
