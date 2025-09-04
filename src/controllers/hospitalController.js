import Hospital from "../models/Hospital.js";

export const createHospital = async (req, res) => {
	const {
		hospital_name,
		hospital_type,
		place,
		phone_number,
		address,
		location,
	} = req.body;

	try {
		const hospital = await Hospital.create({
			hospital_name,
			hospital_type,
			phone_number,
			place,
			address,
			location,
		});
		res.status(200).json({ message: "Hospital Is Created", data: hospital });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
export const getAllHospital = async (req, res) => {
	try {
		const hospitals = await Hospital.find({});
		res.status(200).json({ message: "Success", data: hospitals });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

export const getOneHospital = async (req, res) => {
	const {id } = req.params;

	try {
		const hospital = await Hospital.findOne({
			_id:id,
		});
		res.status(200).json({ message: "success", data: hospital });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
