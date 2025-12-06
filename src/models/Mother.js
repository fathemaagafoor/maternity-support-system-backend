import mongoose, { Types } from "mongoose";

// ========== PREGNANCY TRACKING LOGS ==========

// Weight tracking during pregnancy
const WeightLogSchema = new mongoose.Schema(
  {
    weight_kg: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

// Symptoms/feelings tracking
const SymptomLogSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    symptoms: [
      {
        type: String,
        enum: [
          "nausea",
          "fatigue",
          "headache",
          "back_pain",
          "swelling",
          "cramps",
          "mood_swings",
          "insomnia",
          "heartburn",
          "dizziness",
          "constipation",
          "other",
        ],
      },
    ],
    mood: {
      type: String,
      enum: ["great", "good", "okay", "tired", "stressed", "sad"],
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

// Kick counter / Baby movements
const KickCountSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    kick_count: {
      type: Number,
      required: true,
    },
    duration_minutes: {
      type: Number,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

// Doctor checkup records during pregnancy
const CheckupLogSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    week_number: {
      type: Number, // pregnancy week at checkup
    },
    doctor_name: {
      type: String,
    },
    hospital_name: {
      type: String,
    },
    weight_kg: {
      type: Number,
    },
    blood_pressure: {
      type: String, // e.g., "120/80"
    },
    baby_heart_rate: {
      type: Number, // bpm
    },
    notes: {
      type: String,
    },
    next_checkup_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ========== POSTNATAL MOTHER TRACKING ==========

// Mother's recovery after delivery
const RecoveryLogSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    pain_level: {
      type: Number, // 1-10 scale
      min: 1,
      max: 10,
    },
    bleeding: {
      type: String,
      enum: ["heavy", "moderate", "light", "spotting", "none"],
    },
    mood: {
      type: String,
      enum: ["great", "good", "okay", "tired", "overwhelmed", "sad", "anxious"],
    },
    sleep_hours: {
      type: Number,
    },
    breastfeeding_issues: {
      type: String, // e.g., "sore nipples", "low supply", "none"
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

// ========== MAIN MOTHER SCHEMA ==========

const MotherSchema = new mongoose.Schema(
  {
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
      required: true,
    },

    // ========== PREGNANCY STATUS ==========
    // Current status: pregnant, delivered
    status: {
      type: String,
      enum: ["pregnant", "delivered"],
      default: "pregnant",
    },

    // Pregnancy info (when status is "pregnant")
    expected_delivery_date: {
      type: Date,
    },
    last_period_date: {
      type: Date,
    },

    // Delivery info (when status is "delivered")
    actual_delivery_date: {
      type: Date,
    },
    delivery_type: {
      type: String,
      enum: ["normal", "cesarean", "assisted"],
    },

    // ========== PREGNANCY TRACKING LOGS ==========
    weight_logs: [WeightLogSchema],
    symptom_logs: [SymptomLogSchema],
    kick_counts: [KickCountSchema],
    checkup_logs: [CheckupLogSchema],

    // ========== POSTNATAL TRACKING ==========
    recovery_logs: [RecoveryLogSchema],

    // ========== OTHER INFO ==========
    // Emergency contacts for SOS feature
    emergency_contacts: [
      {
        name: { type: String },
        phone: { type: String },
        relation: { type: String }, // husband, mother, sister, etc.
      },
    ],

    // Address for caregiver booking
    address: {
      type: String,
      default: "",
    },

    // Profile picture (optional, just store URL)
    profile_picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mother", MotherSchema);
