import Hospital from "../models/Hospital";

export const createHospital = async (req, res) => {
	const { hospital_name, place, phoneNumber, address, location } = req.body;

	try {
		const hospital = await Hospital.create({
			hospital_name,
			phoneNumber,
			place,
			address,
			location,
		});
		res.status(500).json({ message: error });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
