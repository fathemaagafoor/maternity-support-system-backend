import mongoose, { Types } from "mongoose";

const BabySchema = new mongoose.Schema({
	mother_id: {
		type: Types.ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	weeks: {
		type: Number,
		required: true,
	},
	delivery_date: {
		type: Date,
		required: true,
	},
	vaccinations: [
		{
			type: {
				vaccine: {
					type: mongoose.Types.ObjectId,
					ref: "Vaccine",
					required: true,
				},
				date_given: {
					type: Date,
					required: true,
				},
				next_date: {
					type: Date,
					required: true,
				},
				weight: {
					type: Number,
					required: true,
				},
				booth: {
					type: String,
					required: true,
				},
				milestones: {},
			},
		},
	],
});

export default mongoose.model("Baby", BabySchema);
