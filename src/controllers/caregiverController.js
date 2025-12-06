import Caregiver from "../models/Caregiver.js";

// Create caregiver profile (after signup)
export const createCaregiver = async (req, res) => {
  const { name, phone_no, age, experience_years, about, shift, amount } =
    req.body;

  // user_id comes from the logged in user (set by auth middleware)
  const user_id = req.user.id;

  try {
    // Check if caregiver profile already exists
    const existing = await Caregiver.findOne({ user_id: user_id });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Caregiver profile already exists" });
    }

    const caregiver = await Caregiver.create({
      user_id,
      name,
      phone_no,
      age,
      experience_years,
      about,
      shift,
      amount,
    });
    return res
      .status(201)
      .json({ message: "Caregiver profile created", data: caregiver });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all approved caregivers (for mothers to see)
export const getAllCaregiver = async (req, res) => {
  try {
    // Only show approved and available caregivers
    const caregivers = await Caregiver.find({ isApproved: true });
    res.status(200).json({ message: "Success", data: caregivers });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get one caregiver by ID
export const getOneCaregiver = async (req, res) => {
  const { id } = req.params;

  try {
    const caregiver = await Caregiver.findOne({ _id: id });
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }
    res.status(200).json({ message: "Success", data: caregiver });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get my caregiver profile (for logged in caregiver)
export const getMyProfile = async (req, res) => {
  const user_id = req.user.id;

  try {
    const caregiver = await Caregiver.findOne({ user_id: user_id });
    if (!caregiver) {
      return res
        .status(404)
        .json({ message: "Profile not found. Please create your profile." });
    }
    res.status(200).json({ message: "Success", data: caregiver });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Update my caregiver profile
export const updateMyProfile = async (req, res) => {
  const user_id = req.user.id;
  const {
    name,
    phone_no,
    age,
    experience_years,
    about,
    shift,
    amount,
    availability,
  } = req.body;

  try {
    const caregiver = await Caregiver.findOneAndUpdate(
      { user_id: user_id },
      {
        name,
        phone_no,
        age,
        experience_years,
        about,
        shift,
        amount,
        availability,
      },
      { new: true } // return updated document
    );
    if (!caregiver) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile updated", data: caregiver });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
