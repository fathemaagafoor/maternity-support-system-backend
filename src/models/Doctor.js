import mongoose, { Types } from "mongoose";

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
		type: Types.ObjectId,
		required: true,
		ref: "Hospital",
	},
	specialised: {
		type: String,
		required: false, // Not required
	},
	experience_years: {
		type: Number,
		required: false,
	},
	age: {
		type: Number,
		required: false,
	},
	shift: {
		type: String,
		enum: ["morning", "evening", "night"],
		required: false,
	},
	about: {
		type: String,
		required: false,
	},
});
export default mongoose.model("Doctors", DoctorSchema);
