import { Router } from "express";
import { createCaregiver, getAllCaregiver, getOneCaregiver } from "../controllers/caregiverController.js";
import Caregiver from "../models/Caregiver.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const caregiverRoutes = Router();
caregiverRoutes.use(authenticateToken)
caregiverRoutes.post("/create", createCaregiver);
caregiverRoutes.get("/", getAllCaregiver);
caregiverRoutes.get("/:id", getOneCaregiver);

export default caregiverRoutes;
