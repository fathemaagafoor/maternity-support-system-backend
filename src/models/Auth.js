import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ["admin", "mother", "caregiver", "doctor"],
	},
});
export default mongoose.model("Auth", AuthSchema);
