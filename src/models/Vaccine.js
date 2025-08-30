import mongoose from "mongoose";



const VaccineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    intake_type: {
        type: String,
        enum: ['injection', 'oral']
    }


})
export default mongoose.model("Vaccine", VaccineSchema)