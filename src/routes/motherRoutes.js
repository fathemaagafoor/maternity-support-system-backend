import { Router } from "express";
import { createMother } from "../controllers/motherController.js";

const motherRoutes = Router();

motherRoutes.post("/create", createMother);

export default motherRoutes;
