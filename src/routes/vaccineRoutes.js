import { Router } from "express";
import {
	createVaccine,
	getAllVaccine,
	getOneVaccine,
} from "../controllers/vaccineController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const vaccineRoutes = Router();
vaccineRoutes.use(authenticateToken)
vaccineRoutes.post("/create", createVaccine);
vaccineRoutes.get("/", getAllVaccine);
vaccineRoutes.get("/:id", getOneVaccine);
export default vaccineRoutes;
