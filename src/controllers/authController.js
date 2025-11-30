import bcrypt from "bcrypt";
import Auth from "../models/Auth.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const role = req.body.role;

	// Hash the password
	const saltRounds = 10; // Number of salt rounds (higher = more secure but slower)
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	try {
		await Auth.create({
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


		const userExist = await Auth.findOne({ email: email });
		if (!userExist) {
			return res.status(401).json({ message: "User not exist!" });
		}


		const isPasswordValid = await bcrypt.compare(password, userExist.password);

		if (!isPasswordValid) {
			return res.status(422).json({ message: "Incorrect password!" });
		}
		const privateKey = process.env.JWT_SECRET
		const token = jwt.sign({ id: userExist.id }, privateKey, { algorithm: 'HS256', expiresIn: "1D" });
		return res
			.status(200)
			.json({ message: "LogIn Successfull", data: userExist, token });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error });
	}
};
