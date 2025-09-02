import { Router } from "express";
import { createBaby, getAllBaby } from "../controllers/babyController.js";

const babyRoutes = Router();

babyRoutes.post("/create", createBaby);
babyRoutes.get("/", getAllBaby);

export default babyRoutes;
