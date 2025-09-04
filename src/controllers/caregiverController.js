import Caregiver from "../models/Caregiver.js";

export const createCaregiver = async (req, res) => {
	const { name, email, password, availability, shift, amount, isApproved } =
		req.body;
	try {
		const caregiver = await Caregiver.create({
			name,
			email,
			password,
			availability,
			shift,
			amount,
			isApproved,
		});
		return res.status(200).json({ message: "Caregiver Is Created" });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getAllCaregiver = async (req, res) => {
	try {
		const caregiver = await Caregiver.find({});
		res.status(200).json({ message: "Success", data: caregiver });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getOneCaregiver = async (req, res) => {
	const { id } = req.params;

	try {
		const caregiver = await Caregiver.findOne({
			_id: id,
		});
		res.status(200).json({ message: "success", data: caregiver });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
