import Booking from "../models/Booking";
import booking from "../models/Booking";

export const createBooking = async (req, res) => {
    const { mother, caregiver, request_date, start_date, end_date, shift, accomadation, requested_amount } = req.body;

    try {
        const booking = await Booking.create({
            mother,
            caregiver,
            request_date,
            start_date,
            end_date,
            shift,
            accomadation,
            requested_amount,
        });
        return res.status(200).json({ message: "Doctor Is Created" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const getAllBooking = async (req, res) => {
    try {
        const booking = await Doctor.find({});
        res.status(200).json({ message: "Success", data: booking });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const getOneBooking = async (req, res) => {
    const { DoctorId } = req.body;

    try {
        const booking = await Booking.findOne({
            _id: BookingId,
        });
        res.status(200).json({ message: "success", data: booking });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
