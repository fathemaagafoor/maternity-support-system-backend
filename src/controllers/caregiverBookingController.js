import CaregiverBooking from "../models/CaregiverBooking.js";
import Mother from "../models/Mother.js";
import Caregiver from "../models/Caregiver.js";

// ========== MOTHER FUNCTIONS ==========

// Create a booking request (by mother)
export const createBooking = async (req, res) => {
  const {
    caregiver_id,
    start_date,
    end_date,
    shift,
    accommodation,
    total_amount,
    address,
    notes,
  } = req.body;
  const user_id = req.user.id;

  try {
    // Get mother's profile
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res
        .status(400)
        .json({ message: "Please create your profile first" });
    }

    // Check if caregiver exists and is approved
    const caregiver = await Caregiver.findById(caregiver_id);
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }
    if (!caregiver.isApproved) {
      return res
        .status(400)
        .json({ message: "This caregiver is not approved yet" });
    }

    const booking = await CaregiverBooking.create({
      mother: mother._id,
      caregiver: caregiver_id,
      start_date,
      end_date,
      shift,
      accommodation,
      total_amount,
      address: address || mother.address,
      notes,
      status: "pending",
    });

    return res
      .status(201)
      .json({ message: "Booking request sent", data: booking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get my bookings (as mother)
export const getMyBookings = async (req, res) => {
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res
        .status(400)
        .json({ message: "Please create your profile first" });
    }

    const bookings = await CaregiverBooking.find({ mother: mother._id })
      .populate("caregiver", "name phone_no shift amount rating")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Success", data: bookings });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Cancel my booking (by mother)
export const cancelBooking = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res.status(400).json({ message: "Profile not found" });
    }

    const booking = await CaregiverBooking.findOne({
      _id: id,
      mother: mother._id,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Can only cancel pending bookings
    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Can only cancel pending bookings" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled", data: booking });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Add review after completion (by mother)
export const addReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const user_id = req.user.id;

  try {
    const mother = await Mother.findOne({ user_id: user_id });
    if (!mother) {
      return res.status(400).json({ message: "Profile not found" });
    }

    const booking = await CaregiverBooking.findOne({
      _id: id,
      mother: mother._id,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Can only review completed bookings
    if (booking.status !== "completed") {
      return res
        .status(400)
        .json({ message: "Can only review completed bookings" });
    }

    booking.review = {
      rating,
      comment,
      review_date: new Date(),
    };
    await booking.save();

    // Update caregiver's average rating
    const caregiver = await Caregiver.findById(booking.caregiver);
    if (caregiver) {
      const newTotal = caregiver.total_reviews + 1;
      const newRating =
        (caregiver.rating * caregiver.total_reviews + rating) / newTotal;
      caregiver.rating = Math.round(newRating * 10) / 10; // Round to 1 decimal
      caregiver.total_reviews = newTotal;
      await caregiver.save();
    }

    res.status(200).json({ message: "Review added", data: booking });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== CAREGIVER FUNCTIONS ==========

// Get bookings for me (as caregiver)
export const getBookingsForMe = async (req, res) => {
  const user_id = req.user.id;

  try {
    const caregiver = await Caregiver.findOne({ user_id: user_id });
    if (!caregiver) {
      return res.status(400).json({ message: "Caregiver profile not found" });
    }

    const bookings = await CaregiverBooking.find({ caregiver: caregiver._id })
      .populate("mother", "name phone_no address")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Success", data: bookings });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Accept booking (by caregiver)
export const acceptBooking = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const caregiver = await Caregiver.findOne({ user_id: user_id });
    if (!caregiver) {
      return res.status(400).json({ message: "Caregiver profile not found" });
    }

    const booking = await CaregiverBooking.findOne({
      _id: id,
      caregiver: caregiver._id,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Can only accept pending bookings" });
    }

    booking.status = "accepted";
    await booking.save();

    res.status(200).json({ message: "Booking accepted", data: booking });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Reject booking (by caregiver)
export const rejectBooking = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const caregiver = await Caregiver.findOne({ user_id: user_id });
    if (!caregiver) {
      return res.status(400).json({ message: "Caregiver profile not found" });
    }

    const booking = await CaregiverBooking.findOne({
      _id: id,
      caregiver: caregiver._id,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Can only reject pending bookings" });
    }

    booking.status = "rejected";
    await booking.save();

    res.status(200).json({ message: "Booking rejected", data: booking });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Mark booking as completed (by caregiver)
export const completeBooking = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const caregiver = await Caregiver.findOne({ user_id: user_id });
    if (!caregiver) {
      return res.status(400).json({ message: "Caregiver profile not found" });
    }

    const booking = await CaregiverBooking.findOne({
      _id: id,
      caregiver: caregiver._id,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "accepted") {
      return res
        .status(400)
        .json({ message: "Can only complete accepted bookings" });
    }

    booking.status = "completed";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking marked as completed", data: booking });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ========== ADMIN FUNCTIONS ==========

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await CaregiverBooking.find({})
      .populate("mother", "name phone_no")
      .populate("caregiver", "name phone_no")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Success", data: bookings });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get one booking by ID
export const getOneBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await CaregiverBooking.findById(id)
      .populate("mother", "name phone_no address")
      .populate("caregiver", "name phone_no");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Success", data: booking });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
