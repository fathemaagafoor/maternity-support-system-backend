import mongoose, { Types } from "mongoose";

const CaregiverSchema = new mongoose.Schema({
  // Link to Auth model (same user who signed up)
  user_id: {
    type: Types.ObjectId,
    required: true,
    ref: "Auth",
  },
  name: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  experience_years: {
    type: Number,
    default: 0,
  },
  about: {
    type: String,
    default: "",
  },
  availability: {
    type: Boolean,
    default: true,
  },
  shift: {
    type: String,
    required: true,
    enum: ["wholeday", "day", "night"],
  },
  amount: {
    type: Number,
    required: true,
  },
  // Admin must approve before caregiver can accept bookings
  isApproved: {
    type: Boolean,
    default: false,
  },
  // Average rating from mothers
  rating: {
    type: Number,
    default: 0,
  },
  total_reviews: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("Caregiver", CaregiverSchema);
