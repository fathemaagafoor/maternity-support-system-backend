import Mother from "../models/Mother.js";

// Create mother profile (after signup)
export const createMother = async (req, res) => {
  const {
    name,
    phone_no,
    age,
    status, // pregnant, delivered, planning
    expected_delivery_date,
    last_period_date,
    address,
  } = req.body;

  // user_id comes from the logged in user (set by auth middleware)
  const user_id = req.user.id;

  try {
    // Check if mother profile already exists
    const existing = await Mother.findOne({ user_id: user_id });
    if (existing) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const mother = await Mother.create({
      user_id,
      name,
      phone_no,
      age,
      status: status || "pregnant",
      expected_delivery_date,
      last_period_date,
      address,
    });
    return res.status(201).json({ message: "Profile created", data: mother });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all mothers (for admin)
export const getAllMother = async (req, res) => {
  try {
    const mothers = await Mother.find({});
    res.status(200).json({ message: "Success", data: mothers });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get one mother by ID
export const getOneMother = async (req, res) => {
  const { id } = req.params;

  try {
    const mother = await Mother.findOne({ _id: id });
    if (!mother) {
      return res.status(404).json({ message: "Mother not found" });
    }
    res.status(200).json({ message: "Success", data: mother });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get my profile (for logged in mother)
export const getMyProfile = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res
        .status(404)
        .json({ message: "Profile not found. Please create your profile." });
    }

    // Calculate pregnancy week if pregnant
    let pregnancy_week = null;
    if (mother.status === "pregnant" && mother.last_period_date) {
      const today = new Date();
      const lmp = new Date(mother.last_period_date);
      const diffTime = Math.abs(today - lmp);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      pregnancy_week = Math.floor(diffDays / 7);
    }

    res.status(200).json({
      message: "Success",
      data: mother,
      pregnancy_week: pregnancy_week,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Update my profile
export const updateMyProfile = async (req, res) => {
  const user_id = req.user.id;
  const {
    name,
    phone_no,
    age,
    status,
    expected_delivery_date,
    last_period_date,
    actual_delivery_date,
    delivery_type,
    address,
    profile_picture,
  } = req.body;

  try {
    const mother = await Mother.findOneAndUpdate(
      { user_id: user_id },
      {
        name,
        phone_no,
        age,
        status,
        expected_delivery_date,
        last_period_date,
        actual_delivery_date,
        delivery_type,
        address,
        profile_picture,
      },
      { new: true }
    );
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile updated", data: mother });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Mark as delivered (transition from pregnant to delivered)
export const markAsDelivered = async (req, res) => {
  const user_id = req.user.id;
  const { actual_delivery_date, delivery_type } = req.body;

  try {
    const mother = await Mother.findOneAndUpdate(
      { user_id: user_id },
      {
        status: "delivered",
        actual_delivery_date: actual_delivery_date || new Date(),
        delivery_type,
      },
      { new: true }
    );
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(200)
      .json({
        message: "Congratulations! Status updated to delivered",
        data: mother,
      });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== PREGNANCY TRACKING - WEIGHT ==========

export const addWeightLog = async (req, res) => {
  const user_id = req.user.id;
  const { weight_kg, date, notes } = req.body;

  try {
    const mother = await Mother.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: { weight_logs: { weight_kg, date: date || new Date(), notes } },
      },
      { new: true }
    );
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(201)
      .json({ message: "Weight logged", data: mother.weight_logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getWeightLogs = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // Return sorted by date, newest first
    const logs = mother.weight_logs.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    res.status(200).json({ message: "Success", data: logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== PREGNANCY TRACKING - SYMPTOMS ==========

export const addSymptomLog = async (req, res) => {
  const user_id = req.user.id;
  const { date, symptoms, mood, notes } = req.body;

  try {
    const mother = await Mother.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: {
          symptom_logs: { date: date || new Date(), symptoms, mood, notes },
        },
      },
      { new: true }
    );
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(201)
      .json({ message: "Symptoms logged", data: mother.symptom_logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSymptomLogs = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const logs = mother.symptom_logs.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    res.status(200).json({ message: "Success", data: logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== PREGNANCY TRACKING - KICK COUNT ==========

export const addKickCount = async (req, res) => {
  const user_id = req.user.id;
  const { date, start_time, kick_count, duration_minutes, notes } = req.body;

  try {
    const mother = await Mother.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: {
          kick_counts: {
            date: date || new Date(),
            start_time: start_time || new Date(),
            kick_count,
            duration_minutes,
            notes,
          },
        },
      },
      { new: true }
    );
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(201)
      .json({ message: "Kick count logged", data: mother.kick_counts });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getKickCounts = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const logs = mother.kick_counts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    res.status(200).json({ message: "Success", data: logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== PREGNANCY TRACKING - CHECKUPS ==========

export const addCheckupLog = async (req, res) => {
  const user_id = req.user.id;
  const {
    date,
    week_number,
    doctor_name,
    hospital_name,
    weight_kg,
    blood_pressure,
    baby_heart_rate,
    notes,
    next_checkup_date,
  } = req.body;

  try {
    const mother = await Mother.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: {
          checkup_logs: {
            date: date || new Date(),
            week_number,
            doctor_name,
            hospital_name,
            weight_kg,
            blood_pressure,
            baby_heart_rate,
            notes,
            next_checkup_date,
          },
        },
      },
      { new: true }
    );
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(201)
      .json({ message: "Checkup logged", data: mother.checkup_logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCheckupLogs = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const logs = mother.checkup_logs.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    res.status(200).json({ message: "Success", data: logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== POSTNATAL - RECOVERY TRACKING ==========

export const addRecoveryLog = async (req, res) => {
  const user_id = req.user.id;
  const {
    date,
    pain_level,
    bleeding,
    mood,
    sleep_hours,
    breastfeeding_issues,
    notes,
  } = req.body;

  try {
    const mother = await Mother.findOneAndUpdate(
      { user_id: user_id },
      {
        $push: {
          recovery_logs: {
            date: date || new Date(),
            pain_level,
            bleeding,
            mood,
            sleep_hours,
            breastfeeding_issues,
            notes,
          },
        },
      },
      { new: true }
    );
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(201)
      .json({ message: "Recovery logged", data: mother.recovery_logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getRecoveryLogs = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const logs = mother.recovery_logs.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    res.status(200).json({ message: "Success", data: logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== EMERGENCY CONTACTS ==========

// Add emergency contact
export const addEmergencyContact = async (req, res) => {
  const user_id = req.user.id;
  const { name, phone, relation } = req.body;

  try {
    const mother = await Mother.findOneAndUpdate(
      { user_id: user_id },
      { $push: { emergency_contacts: { name, phone, relation } } },
      { new: true }
    );
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(200)
      .json({
        message: "Emergency contact added",
        data: mother.emergency_contacts,
      });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Remove emergency contact
export const removeEmergencyContact = async (req, res) => {
  const user_id = req.user.id;
  const { contact_id } = req.params;

  try {
    const mother = await Mother.findOneAndUpdate(
      { user_id: user_id },
      { $pull: { emergency_contacts: { _id: contact_id } } },
      { new: true }
    );
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(200)
      .json({
        message: "Emergency contact removed",
        data: mother.emergency_contacts,
      });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get emergency contacts (for SOS feature)
export const getEmergencyContacts = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(200)
      .json({ message: "Success", data: mother.emergency_contacts });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
