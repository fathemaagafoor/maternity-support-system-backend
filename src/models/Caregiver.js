import mongoose from "mongoose";

const CaregiverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
    },
    shift: {
        type: String,
        required: true,
        enum: ["wholeday", "day", 'night']

    },
    amount: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: true
    }
})
export default mongoose.model("Caregiver", CaregiverSchema)