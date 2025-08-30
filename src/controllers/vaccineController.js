import Vaccine from "../models/Vaccine";

export const createVaccine = async (req, res) => {
    const { name, intake_type } = req.body;

    try {
        const vaccine = await Vaccine.create({
            name, intake_type
        });
        res.status(200).json({
            message: "vaccine is created",
            data: vaccine
        }


        );
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};


export const getAllVaccine = async (req, res) => {


    try {
        const vaccine = await Vaccine.find({

        });
        res.status(200).json({
            message: "Successs",
            data: vaccine
        }


        );
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};




