import { Router } from "express";
import { createHospital, getAllHospital, getOneHospital } from "../controllers/hospitalController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const hospitalRoutes = Router();
hospitalRoutes.use(authenticateToken)
hospitalRoutes.post("/create", createHospital);
hospitalRoutes.get("/", getAllHospital);
hospitalRoutes.get("/:id", getOneHospital);

export default hospitalRoutes;