import mongoose from "mongoose";
import Caregiver from "./Caregiver";

const BookingSchema = new mongoose.Schema({
    mother: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Mother"
    },
    caregiver: {
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Caregiver"
    },
    request_date:{
    type:Date,
    required:true,
    },
    start_date:{
        type:Date,
        requried:true,
    },
    end_date:{
        type:Date,
        required:true,
    },
    shift:{
        type:String,
        required:true,
        enum:["whole day","day","night"]
    },
accommadation:{
    type:String,
    required:true,
    enum:["withfood","withoutfood"]
},
requested_amount:{
    type:number,
    required:true,
},



})
export default mongoose.model("Booking", BookingSchema)