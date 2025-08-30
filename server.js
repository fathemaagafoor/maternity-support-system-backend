import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import router from './src/routes/userRoutes.js';
dotenv.config()

const app = express();

app.use(express.json());

app.use('/fathima', async (req, res) => {
    res.status(201).json({ message: "I am fathima thoniyan gafoor" });
});


app.use(router)

const db = mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connected"))

app.listen(3000, () => console.log("Server running on port 3000"));