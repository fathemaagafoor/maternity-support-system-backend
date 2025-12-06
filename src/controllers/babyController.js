import Baby from "../models/Baby.js";
import Mother from "../models/Mother.js";

// Create baby (linked to logged in mother)
export const createBaby = async (req, res) => {
  const { name, gender, birth_weight, current_weight, birth_date } = req.body;
  const user_id = req.user.id;

  try {
    // First find the mother's profile to get mother_id
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res
        .status(400)
        .json({ message: "Please create your profile first" });
    }

    const baby = await Baby.create({
      mother_id: mother._id,
      name,
      gender,
      birth_weight,
      current_weight: current_weight || birth_weight,
      birth_date,
    });
    res.status(201).json({ message: "Baby added", data: baby });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all babies for logged in mother
export const getMyBabies = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res
        .status(400)
        .json({ message: "Please create your profile first" });
    }

    const babies = await Baby.find({ mother_id: mother._id });
    res.status(200).json({ message: "Success", data: babies });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get one baby by ID
export const getOneBaby = async (req, res) => {
  const { id } = req.params;

  try {
    const baby = await Baby.findOne({ _id: id });
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    res.status(200).json({ message: "Success", data: baby });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Update baby info
export const updateBaby = async (req, res) => {
  const { id } = req.params;
  const { name, current_weight } = req.body;

  try {
    const baby = await Baby.findByIdAndUpdate(
      id,
      { name, current_weight },
      { new: true }
    );
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    res.status(200).json({ message: "Baby updated", data: baby });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== FEEDING TRACKING ==========

// Add feeding log
export const addFeedingLog = async (req, res) => {
  const { id } = req.params; // baby id
  const { type, start_time, duration_minutes, amount_ml, notes } = req.body;

  try {
    const baby = await Baby.findByIdAndUpdate(
      id,
      {
        $push: {
          feeding_logs: {
            type,
            start_time,
            duration_minutes,
            amount_ml,
            notes,
          },
        },
      },
      { new: true }
    );
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    res
      .status(201)
      .json({ message: "Feeding logged", data: baby.feeding_logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get feeding logs
export const getFeedingLogs = async (req, res) => {
  const { id } = req.params;

  try {
    const baby = await Baby.findById(id);
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    // Return last 50 logs, newest first
    const logs = baby.feeding_logs.slice(-50).reverse();
    res.status(200).json({ message: "Success", data: logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== SLEEP TRACKING ==========

// Add sleep log
export const addSleepLog = async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, quality, notes } = req.body;

  try {
    const baby = await Baby.findByIdAndUpdate(
      id,
      { $push: { sleep_logs: { start_time, end_time, quality, notes } } },
      { new: true }
    );
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    res.status(201).json({ message: "Sleep logged", data: baby.sleep_logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get sleep logs
export const getSleepLogs = async (req, res) => {
  const { id } = req.params;

  try {
    const baby = await Baby.findById(id);
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    const logs = baby.sleep_logs.slice(-50).reverse();
    res.status(200).json({ message: "Success", data: logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== DIAPER TRACKING ==========

// Add diaper log
export const addDiaperLog = async (req, res) => {
  const { id } = req.params;
  const { type, time, notes } = req.body;

  try {
    const baby = await Baby.findByIdAndUpdate(
      id,
      { $push: { diaper_logs: { type, time, notes } } },
      { new: true }
    );
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    res.status(201).json({ message: "Diaper logged", data: baby.diaper_logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get diaper logs
export const getDiaperLogs = async (req, res) => {
  const { id } = req.params;

  try {
    const baby = await Baby.findById(id);
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    const logs = baby.diaper_logs.slice(-50).reverse();
    res.status(200).json({ message: "Success", data: logs });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== VACCINATION TRACKING ==========

// Add vaccination record
export const addVaccination = async (req, res) => {
  const { id } = req.params;
  const {
    vaccine_name,
    date_given,
    next_due_date,
    weight_at_vaccine,
    location,
    notes,
  } = req.body;

  try {
    const baby = await Baby.findByIdAndUpdate(
      id,
      {
        $push: {
          vaccinations: {
            vaccine_name,
            date_given,
            next_due_date,
            weight_at_vaccine,
            location,
            notes,
          },
        },
      },
      { new: true }
    );
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    res
      .status(201)
      .json({ message: "Vaccination recorded", data: baby.vaccinations });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get vaccinations
export const getVaccinations = async (req, res) => {
  const { id } = req.params;

  try {
    const baby = await Baby.findById(id);
    if (!baby) {
      return res.status(404).json({ message: "Baby not found" });
    }
    res.status(200).json({ message: "Success", data: baby.vaccinations });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all babies (for admin)
export const getAllBaby = async (req, res) => {
  try {
    const babies = await Baby.find({}).populate("mother_id");
    res.status(200).json({ message: "Success", data: babies });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
