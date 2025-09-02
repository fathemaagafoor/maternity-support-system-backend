import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import apiRoutes from "./src/routes/apiRoutes.js";
// import router from './src/routes/userRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", apiRoutes);

const db = mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB connected"));

app.listen(3000, () => console.log("Server running on port 3000"));
