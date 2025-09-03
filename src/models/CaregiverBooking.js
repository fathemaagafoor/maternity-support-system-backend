import mongoose from "mongoose";

const CaregiverBookingSchema = new mongoose.Schema({
	mother: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "Mother",
	},
	caregiver: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "Caregiver",
	},
	request_date: {
		type: Date,
		required: true,
	},
	start_date: {
		type: Date,
		requried: true,
	},
	end_date: {
		type: Date,
		required: true,
	},
	shift: {
		type: String,
		required: true,
		enum: ["whole day", "day", "night"],
	},
	accommodation: {
		type: String,
		required: true,
		enum: ["withfood", "withoutfood"],
	},
	requested_amount: {
		type: Number,
		required: true,
	},
});
export default mongoose.model("caregiverBooking", CaregiverBookingSchema);
