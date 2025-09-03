import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
	venue: {
		type: String,
		required: true,
		enum: ["hospital", "clinic"],
	},
	doctor_name: {
		type: String,
		required: true,
	},
	mother_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "Mother",
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: Number,
		required: true,
	},
	phone_no: {
		type: Number,
		required: true,
	},
});
export default mongoose.model("Appointment", AppointmentSchema);
