import { Router } from "express";
import { createMother, getAllMother, getOneMother } from "../controllers/motherController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const motherRoutes = Router();
motherRoutes.use(authenticateToken)
motherRoutes.post("/create", createMother);
motherRoutes.get("/", getAllMother);
motherRoutes.get("/:id", getOneMother);

export default motherRoutes;
