import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    mother_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Mother",
    },
    title: {
      type: String,
      required: true, // e.g., "Monthly Checkup", "Ultrasound"
    },
    venue_type: {
      type: String,
      required: true,
      enum: ["hospital", "clinic"],
    },
    venue_name: {
      type: String, // Hospital or clinic name
    },
    doctor_name: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // e.g., "10:30 AM"
      required: true,
    },
    notes: {
      type: String,
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
