import mongoose, { Types } from "mongoose";

// Feeding log schema
const FeedingLogSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["breast", "bottle", "formula", "solid"],
		required: true
	},
	start_time: {
		type: Date,
		required: true
	},
	duration_minutes: {
		type: Number // for breastfeeding
	},
	amount_ml: {
		type: Number // for bottle/formula
	},
	notes: {
		type: String
	}
}, { timestamps: true });

// Sleep log schema
const SleepLogSchema = new mongoose.Schema({
	start_time: {
		type: Date,
		required: true
	},
	end_time: {
		type: Date
	},
	quality: {
		type: String,
		enum: ["good", "okay", "poor"]
	},
	notes: {
		type: String
	}
}, { timestamps: true });

// Diaper log schema
const DiaperLogSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["wet", "dirty", "both"],
		required: true
	},
	time: {
		type: Date,
		required: true
	},
	notes: {
		type: String
	}
}, { timestamps: true });

// Vaccination record schema
const VaccinationSchema = new mongoose.Schema({
	vaccine_name: {
		type: String,
		required: true
	},
	date_given: {
		type: Date,
		required: true
	},
	next_due_date: {
		type: Date
	},
	weight_at_vaccine: {
		type: Number
	},
	location: {
		type: String // hospital/clinic name
	},
	notes: {
		type: String
	}
}, { timestamps: true });

const BabySchema = new mongoose.Schema({
	mother_id: {
		type: Types.ObjectId,
		required: true,
		ref: 'Mother'
	},
	name: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
		enum: ["male", "female"]
	},
	birth_weight: {
		type: Number, // in grams
		required: true,
	},
	current_weight: {
		type: Number, // in grams
	},
	birth_date: {
		type: Date,
		required: true,
	},
	// Tracking logs
	feeding_logs: [FeedingLogSchema],
	sleep_logs: [SleepLogSchema],
	diaper_logs: [DiaperLogSchema],
	vaccinations: [VaccinationSchema],
}, { timestamps: true });

export default mongoose.model("Baby", BabySchema);

export default mongoose.model("Baby", BabySchema);
