import Baby from "../models/Baby.js";

export const createBaby = async (req, res) => {
	const { mother_id, name, gender, weight, weeks, delivery_date } = req.body;
	try {
		const baby = await Baby.create({
			mother_id,
			name,
			gender,
			weight,
			weeks,
			delivery_date,
		});
		res.status(200).json({ message: "Baby Is Created" });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getAllBaby = async (req, res) => {
	try {
		const baby = await Baby.find({});
		res.status(200).json({ message: "Success", data: baby });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getOneBaby = async (req, res) => {
	const { BabyId } = req.body;

	try {
		const baby = await Baby.findOne({
			_id: BabyId,
		});
		res.status(200).json({ message: "success", data: baby });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
