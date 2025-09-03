import { Router } from "express";
import { createCaregiver } from "../controllers/caregiverController.js";

const caregiverRoutes = Router();

caregiverRoutes.post("/create", createCaregiver);

export default caregiverRoutes;
