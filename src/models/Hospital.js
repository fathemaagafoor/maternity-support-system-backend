import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
	hospital_name: {
		type: String,
		required: true,
	},
	place: {
		type: String,
		required: true,
	},
	phone_number: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
});
export default mongoose.model("Hospital", HospitalSchema);
