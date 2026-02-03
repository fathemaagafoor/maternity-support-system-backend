import Vaccine from "../models/Vaccine.js";

export const createVaccine = async (req, res) => {
	const { name, description, intake_type, recommended_age, number_of_doses, disease_protection, order } = req.body;

	try {
		const vaccine = await Vaccine.create({
			name,
			description,
			intake_type,
			recommended_age,
			number_of_doses,
			disease_protection,
			order,
		});
		res.status(201).json({
			message: "Vaccine created successfully",
			data: vaccine,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message || error });
	}
};

export const getAllVaccine = async (req, res) => {
	try {
		const vaccines = await Vaccine.find({}).sort({ order: 1 });
		res.status(200).json({
			message: "Success",
			data: vaccines,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message || error });
	}
};
export const getOneVaccine = async (req, res) => {
	const { id } = req.params;

	try {
		const vaccine = await Vaccine.find({
			_id: id,
		});
		res.status(200).json({
			message: "Successs",
			data: vaccine,
		});
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
