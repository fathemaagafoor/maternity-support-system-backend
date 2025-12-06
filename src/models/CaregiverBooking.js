import mongoose from "mongoose";

const CaregiverBookingSchema = new mongoose.Schema(
  {
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
    // Booking dates
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    shift: {
      type: String,
      required: true,
      enum: ["wholeday", "day", "night"],
    },
    accommodation: {
      type: String,
      required: true,
      enum: ["with_food", "without_food"],
    },
    total_amount: {
      type: Number,
      required: true,
    },
    // Booking status
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    // Mother's address for the booking
    address: {
      type: String,
    },
    notes: {
      type: String,
    },
    // Review after completion
    review: {
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      review_date: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.model("CaregiverBooking", CaregiverBookingSchema);
