import { Router } from "express";
import { createMother, getAllMother, getOneMother } from "../controllers/motherController.js";

const motherRoutes = Router();

motherRoutes.post("/create", createMother);
motherRoutes.get("/",getAllMother);
motherRoutes.get("/:id",getOneMother);

export default motherRoutes;
