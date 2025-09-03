import mongoose from "mongoose";

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
	
	specialised: {
		type: String,
		required: true,
	},
});
export default mongoose.model("Doctors", DoctorSchema);
