import Appointment from "../models/Appointment.js";
import Mother from "../models/Mother.js";

// Create appointment (by logged in mother)
export const createAppointment = async (req, res) => {
  const { title, venue_type, venue_name, doctor_name, date, time, notes } =
    req.body;
  const user_id = req.user.id;

  try {
    // Get mother's profile
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res
        .status(400)
        .json({ message: "Please create your profile first" });
    }

    const appointment = await Appointment.create({
      mother_id: mother._id,
      title,
      venue_type,
      venue_name,
      doctor_name,
      date,
      time,
      notes,
    });

    res.status(201).json({ message: "Appointment created", data: appointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get my appointments (for logged in mother)
export const getMyAppointments = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res
        .status(400)
        .json({ message: "Please create your profile first" });
    }

    const appointments = await Appointment.find({ mother_id: mother._id }).sort(
      { date: 1 }
    ); // Sort by date, upcoming first

    res.status(200).json({ message: "Success", data: appointments });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    venue_type,
    venue_name,
    doctor_name,
    date,
    time,
    notes,
    is_completed,
  } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      {
        title,
        venue_type,
        venue_name,
        doctor_name,
        date,
        time,
        notes,
        is_completed,
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment updated", data: appointment });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all appointments (for admin)
export const getAllAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).populate(
      "mother_id",
      "name phone_no"
    );
    res.status(200).json({ message: "Success", data: appointments });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get one appointment by ID
export const getOneAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Success", data: appointment });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
