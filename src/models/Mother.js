import mongoose from "mongoose";

const MotherSchema = new mongoose.Schema({
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

    expected_delivery_date: {
        type: Date
    },
    is_pregnant: {
        type: Boolean
    },
    phone_no: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },


})
export default mongoose.model("Mother", MotherSchema)