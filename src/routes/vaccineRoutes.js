import { Router } from "express";
import {
	createVaccine,
	getAllVaccine,
	getOneVaccine,
} from "../controllers/vaccineController.js";

const vaccineRoutes = Router();

vaccineRoutes.post("/create", createVaccine);
vaccineRoutes.get("/", getAllVaccine);
vaccineRoutes.get("/:id", getOneVaccine);
export default vaccineRoutes;
