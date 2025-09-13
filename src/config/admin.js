// src/config/admin.js
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import MongoStore from 'connect-mongo';
import { configDotenv } from 'dotenv';
import { appointmentOptions, babyOptions, caregiverBookingOptions, caregiverOptions, doctorOptions, hospitalOptions, motherOptions, userOptions, vaccineOptions } from './resources.js';

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
    resources: [
        userOptions,
        doctorOptions,
        caregiverOptions,
        motherOptions,
        appointmentOptions,
        babyOptions,
        caregiverBookingOptions,
        hospitalOptions,
        vaccineOptions,
    ],
    rootPath: '/admin',
});

const ADMIN = {
    email: 'admin@gmail.com',
    password: 'password',
};

configDotenv()
console.log(process.env.MONGO_URL)
const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/maternity-support',
    collectionName: 'sessions',
    // client: mongoose.connection.getClient()
});



// ✅ Proper session middleware
const sessionOptions = {
    secret: 'secretStems',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        secure: false, // ❗ set true if using https
        maxAge: 1000 * 60 * 60, // 1 hour
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
        cookieName: 'adminjs',
        cookiePassword: 'secretStems',
        // cookieMaxAge: 1000 * 60 * 24 * 6,
    },
    null,
    sessionOptions
);

export { adminJs, adminRouter };
