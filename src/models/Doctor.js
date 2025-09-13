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
		required: true,
	},
});
export default mongoose.model("Doctors", DoctorSchema);
