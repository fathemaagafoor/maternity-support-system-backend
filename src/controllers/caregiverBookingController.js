import CaregiverBooking from "../models/caregiverBooking.js";

export const createCaregiverBooking = async (req, res) => {
	const {
		mother,
		caregiver,
		request_date,
		start_date,
		end_date,
		shift,
		accommodation,
		requested_amount,
	} = req.body;

	try {
		await CaregiverBooking.create({
			mother,
			caregiver,
			request_date,
			start_date,
			end_date,
			shift,
			accommodation,
			requested_amount,
		});
		return res.status(201).json({ message: "Caregiver Booking is created" });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

export const getAllcaregiverBooking = async (req, res) => {
	try {
		const caregiverBookings = await CaregiverBooking.find({});
		res.status(200).json({ message: "Success", data: caregiverBookings });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

export const getOnecaregiverBooking = async (req, res) => {
	const { id } = req.params;

	try {
		const caregiverbooking = await CaregiverBooking.findOne({
			_id: id,
		});
		res.status(200).json({ message: "Success", data: caregiverbooking });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
