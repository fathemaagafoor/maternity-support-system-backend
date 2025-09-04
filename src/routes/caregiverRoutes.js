import { Router } from "express";
import { createCaregiver, getAllCaregiver, getOneCaregiver } from "../controllers/caregiverController.js";
import Caregiver from "../models/Caregiver.js";

const caregiverRoutes = Router();

caregiverRoutes.post("/create", createCaregiver);
caregiverRoutes.get("/",getAllCaregiver);
caregiverRoutes.get("/:id",getOneCaregiver);

export default caregiverRoutes;
