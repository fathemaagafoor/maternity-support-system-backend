import { Router } from "express";
import {
	createBaby,
	getAllBaby,
	getOneBaby,
} from "../controllers/babyController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const babyRoutes = Router();
babyRoutes.use(authenticateToken)
babyRoutes.post("/create", createBaby);
babyRoutes.get("/", getAllBaby);
babyRoutes.get("/:id", getOneBaby);

export default babyRoutes;
