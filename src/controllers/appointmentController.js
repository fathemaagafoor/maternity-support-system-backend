import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
	const { venue, doctor_name, mother_id, time, date, phone_no } = req.body;

	try {
		const appointment = await Appointment.create({
			venue,
			doctor_name,
			mother_id,
			time,
			date,
			phone_no,
		});
		res
			.status(200)
			.json({ message: "Appointment Is Created", data: appointment });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getAllAppointment = async (req, res) => {
	try {
		const appointmentList = await Appointment.find({});
		res.status(200).json({ message: "Success", data: appointmentList });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getOneAppointment = async (req, res) => {
	const { appointmentId } = req.body;

	try {
		const appointment = await Appointment.findOne({
			_id: appointmentId,
		});
		res.status(200).json({ message: "success", data: appointment });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
