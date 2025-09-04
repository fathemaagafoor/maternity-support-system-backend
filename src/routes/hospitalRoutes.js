import { Router } from "express";
import { createHospital, getAllHospital, getOneHospital } from "../controllers/hospitalController.js";

const hospitalRoutes = Router();

hospitalRoutes.post("/create", createHospital);
hospitalRoutes.get("/",getAllHospital);
hospitalRoutes.get("/:id",getOneHospital);

export default hospitalRoutes;