import { Router } from "express";
import {
	createBaby,
	getAllBaby,
	getOneBaby,
} from "../controllers/babyController.js";

const babyRoutes = Router();

babyRoutes.post("/create", createBaby);
babyRoutes.get("/", getAllBaby);
babyRoutes.get("/:id", getOneBaby);

export default babyRoutes;
