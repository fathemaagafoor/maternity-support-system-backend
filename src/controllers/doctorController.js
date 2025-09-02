import Doctor from "../models/Doctor";

export const createDoctor = async (req, res) => {
    const { name, degree, hospital_id, clinic, hospital, specialized } = req.body;

    try {
        const doctor = await Doctor.create({
            name,
            degree,
            hospital_id,
            clinic,
            hospital,
            specialized

        });
        return res.status(200).json({ message: "Doctor Is Created" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const getAllDoctor = async (req, res) => {
    try {
        const baby = await Doctor.find({});
        res.status(200).json({ message: "Success", data: doctor });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const getOneDoctor = async (req, res) => {
    const { DoctorId } = req.body;

    try {
        const baby = await Doctor.findOne({
            _id: DoctorId,
        });
        res.status(200).json({ message: "success", data: doctor });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
