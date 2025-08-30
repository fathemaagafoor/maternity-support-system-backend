import bcrypt from "bcrypt";
import AuthSchema from "../models/Auth";

export const signup = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const role = req.body.role;

	// Hash the password
	const saltRounds = 10; // Number of salt rounds (higher = more secure but slower)
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	try {
		await User.create({
			email: email,
			password: hashedPassword,
			role: role, //admin, doctor, caregiver, mother
		});
		return res.status(201).json({ message: "User created" });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

export const signIn = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const userExist = await AuthSchema.findOne({ email: email });
		if (!userExist) {
			return res.status(401).json({ message: "User not exist!" });
		}
		const isPasswordValid = await bcrypt.compare(password, userExist.password);

		if (!isPasswordValid) {
			return res.status(422).json({ message: "Incorrect password!" });
		}

		return res.status(201).json({ message: "LogIn Successfull" });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
