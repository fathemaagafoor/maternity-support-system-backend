import { Router } from "express";
import { createDoctor, getAllDoctor, getOneDoctor } from "../controllers/doctorController.js";

const doctorRoutes = Router();

doctorRoutes.post("/create", createDoctor);
doctorRoutes.get("/",getAllDoctor);
doctorRoutes.get("/:id",getOneDoctor);

export default doctorRoutes;
