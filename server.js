import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import apiRoutes from "./src/routes/apiRoutes.js";
import { adminJs, adminRouter } from "./src/config/admin.js";
// import router from './src/routes/userRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", apiRoutes);

app.use(adminJs.options.rootPath, adminRouter);


export const db = await mongoose
	.connect(process.env.MONGO_URL)
	.then((d) => {
		console.log("DB connected")
	});

app.listen(3000, () => console.log("Server running on port 3000"));
