export const createAppoiment = async (req, res) => {
    const {venue,doctor_name,mother_id,time,date,phone_no} = req.body;

    try {
        const Appoiment = await Appoiment.create({
            venue,
            doctor_name,
            mother_id,
            time,
            date,
            phone_no
        });
        res.status(200).json({ message: "Appoiment Is Created" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const getAllAppoiment = async (req, res) => {
    try {
        const Appoiment = await Appoiment.find({});
        res.status(200).json({ message: "Success", data: Appoiment });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const getOneAppoiment = async (req, res) => {
    const { AppoimentId } = req.body;

    try {
        const Appoiment = await AppoimentId.findOne({
            _id: AppoimentIdId,
        });
        res.status(200).json({ message: "success", data: Appoiment });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};