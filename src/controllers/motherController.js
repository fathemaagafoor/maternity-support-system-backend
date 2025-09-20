import Mother from "../models/Mother.js";

export const createMother = async (req, res) => {
	const {
		user_id,
		name,
		// email,
		expected_delivery_date,
		is_pregnant,
		phone_no,
		age,
	} = req.body;
	try {
		const mother = await Mother.create({
			user_id,
			name,
			// email,
			expected_delivery_date,
			is_pregnant,
			phone_no,
			age,
		});
		return res.status(200).json({ message: "Mother Is Created" });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getAllMother = async (req, res) => {
	try {
		const mother = await Mother.find({});
		res.status(200).json({ message: "Success", data: mother });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};



export const getOneMother = async (req, res) => {
	const { id } = req.params;

	try {
		const mother = await Mother.findOne({
			_id: id,
		});
		res.status(200).json({ message: "success", data: mother });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
