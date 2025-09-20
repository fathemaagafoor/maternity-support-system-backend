import mongoose, { Types } from "mongoose";

const MotherSchema = new mongoose.Schema({
    user_id: {
        type: Types.ObjectId,
        required: true,
        ref: "Auth"
    },

    name: {
        type: String,
        required: true,

    },

    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },

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