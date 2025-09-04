import Doctor from "../models/Doctor.js";

export const createDoctor = async (req, res) => {
	const { name, degree, hospital_id, specialised } = req.body;

	try {
		const doctor = await Doctor.create({
			name,
			degree,
			hospital_id,
			specialised,
		});
		return res.status(200).json({ message: "Doctor Is Created" });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getAllDoctor = async (req, res) => {
	try {
		const doctorList = await Doctor.find({});
		res.status(200).json({ message: "Success", data: doctorList });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getOneDoctor = async (req, res) => {
	const { id } = req.params;

	try {
		const doctor = await Doctor.findOne({
			_id: id,
		});
		res.status(200).json({ message: "success", data: doctor });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
