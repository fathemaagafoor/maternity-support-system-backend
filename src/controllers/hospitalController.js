export const create = async (req, res) => {
	const hospital_name = req.body.hospital_name;
	const place = req.body.place;
	const phone_number = req.body.phone_number;
	const address = req.body.address;
	const location = req.body.location;

	try {
		await hospital_name.create({});
		res.status(500).json({ message: error });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
