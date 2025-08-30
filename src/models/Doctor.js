import mongoose from "mongoose";
import Hospital from "./Hospital";

const DoctorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	degree: {
		type: String,
		required: true,
	},
	hospital_id: {
		type: String,
		required: true,
		ref: "Hospital",
	},
	clinic: {
		type: Boolean,
		required,
	},
	hospital: {
		type: Boolean,
		required,
	},
	specialised: {
		type: String,
		required,
	},
});
export default mongoose.model("Doctors", DoctorSchema);
