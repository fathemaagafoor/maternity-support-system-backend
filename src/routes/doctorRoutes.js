import { Router } from "express";
import { createDoctor } from "../controllers/doctorController.js";

const doctorRoutes = Router();

doctorRoutes.post("/create", createDoctor);

export default doctorRoutes;
