// src/config/admin.js
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import AdminJS from "adminjs";
import MongoStore from "connect-mongo";
import { configDotenv } from "dotenv";
import { componentLoader, Components } from "./admin-components.js";
import {
  articleOptions,
  babyOptions,
  caregiverBookingOptions,
  caregiverOptions,
  doctorOptions,
  hospitalOptions,
  motherOptions,
  userOptions,
  vaccineOptions,
} from "./resources.js";

// Load environment variables first
configDotenv();

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [
    userOptions,
    doctorOptions,
    caregiverOptions,
    motherOptions,
    babyOptions,
    caregiverBookingOptions,
    hospitalOptions,
    vaccineOptions,
    articleOptions,
  ],
  rootPath: "/admin",
  componentLoader,
  dashboard: {
    component: Components.Dashboard,
  },
  branding: {
    companyName: "Motherly Admin",
    logo: "/admin-assets/motherly-logo.png",
    favicon: "/admin-assets/favicon.ico",
    withMadeWithLove: false,
  },
  assets: {
    styles: ["/admin-assets/admin-overrides.css"],
  },
});

// Admin credentials from environment variables (see .env.example)
const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@gmail.com",
  password: process.env.ADMIN_PASSWORD || "admin123",
};

const sessionStore = MongoStore.create({
  mongoUrl:
    process.env.MONGO_URL || "mongodb://localhost:27017/maternity-support",
  collectionName: "sessions",
});

// Session settings
const sessionOptions = {
  secret: process.env.JWT_SECRET || "secretStems",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: false, // set true if using https
    maxAge: 1000 * 60 * 60 * 24 * 365 * 100, // ~100 years (effectively unlimited)
  },
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
    cookieName: "adminjs",
    cookiePassword: process.env.JWT_SECRET || "secretStems",
  },
  null,
  sessionOptions
);

export { adminJs, adminRouter };
