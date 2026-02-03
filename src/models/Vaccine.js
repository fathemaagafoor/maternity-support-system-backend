import mongoose from "mongoose";

const VaccineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	intake_type: {
		type: String,
		enum: ["injection", "oral"],
	},
	recommended_age: {
		type: String, // e.g., "Birth", "6 weeks", "3 months", "6 months"
	},
	number_of_doses: {
		type: Number,
		default: 1,
	},
	disease_protection: [{
		type: String, // e.g., ["Hepatitis B", "Polio", "Diphtheria"]
	}],
	order: {
		type: Number, // For sorting vaccines in schedule order
		default: 0,
	},
});
export default mongoose.model("Vaccine", VaccineSchema);
