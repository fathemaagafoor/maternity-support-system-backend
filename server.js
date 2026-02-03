import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import os from "os";
import apiRoutes from "./src/routes/apiRoutes.js";
import { adminJs, adminRouter } from "./src/config/admin.js";

// Load environment variables
dotenv.config();

const app = express();

// Get server IP address
const getServerIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
};

// Allow requests from Flutter app (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Parse JSON body
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// Admin panel
app.use(adminJs.options.rootPath, adminRouter);

// Simple home route
app.get("/", (req, res) => {
  res.json({ message: "Motherly API is running!" });
});

// Connect to database
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌐 Server IP: ${getServerIP()}`);
      console.log(`📋 Admin panel: http://localhost:${PORT}/admin`);
    });
  })
  .catch((error) => {
    console.log("❌ Database connection failed:", error.message);
  });
