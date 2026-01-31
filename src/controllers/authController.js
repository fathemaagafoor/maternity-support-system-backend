import bcrypt from "bcrypt";
import Auth from "../models/Auth.js";
import jwt from "jsonwebtoken";

// Sign up new user
export const signup = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const role = req.body.role;

	// Check if all fields are provided
	if (!email || !password || !role) {
		return res
			.status(400)
			.json({ message: "Please provide email, password and role" });
	}

	// Check if role is valid
	const validRoles = ["mother", "caregiver", "doctor"];
	if (!validRoles.includes(role)) {
		return res
			.status(400)
			.json({ message: "Role must be mother, caregiver, or doctor" });
	}

	try {
		// Check if email already exists

		const existingUser = await Auth.findOne({ email: email });
		if (existingUser) {
			return res.status(400).json({ message: "Email already registered" });
		}

		// Hash the password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const newUser = await Auth.create({
			email: email,
			password: hashedPassword,
			role: role,
		});

		// Create token so user is logged in after signup
		const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
			algorithm: "HS256",
			expiresIn: "7d",
		});

		return res.status(201).json({
			message: "Account created successfully",
			data: { id: newUser.id, email: newUser.email, role: newUser.role },
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

// Sign in existing user
export const signIn = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide email and password" });
	}

	try {
		const user = await Auth.findOne({ email: email });
		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			algorithm: "HS256",
			expiresIn: "7d",
		});

		return res.status(200).json({
			message: "Login successful",
			data: { id: user.id, email: user.email, role: user.role },
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

// Get current logged in user
export const getMe = async (req, res) => {
	const user_id = req.user.id;

	try {
		const user = await Auth.findById(user_id).select("-password"); // Don't send password
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ message: "Success", data: user });
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong" });
	}
};

// In-memory OTP storage: { email: { otp, expiresAt, resetToken } }
const otpStore = new Map();

// Generate 6-digit OTP
const generateOtp = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate reset token
const generateResetToken = () => {
	return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Forgot password - send OTP (displayed in terminal)
export const forgotPassword = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Please provide email" });
	}

	try {
		// Check if user exists
		const user = await Auth.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ message: "Email not found" });
		}

		// Generate OTP
		const otp = generateOtp();
		const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

		// Store OTP
		otpStore.set(email, { otp, expiresAt, resetToken: null });

		// Display OTP in terminal (for development)
		console.log("\n========================================");
		console.log("🔐 PASSWORD RESET OTP");
		console.log("========================================");
		console.log(`📧 Email: ${email}`);
		console.log(`🔢 OTP: ${otp}`);
		console.log(`⏰ Expires in: 5 minutes`);
		console.log("========================================\n");

		return res.status(200).json({
			message: "OTP sent successfully. Check console for OTP.",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

// Verify OTP
export const verifyOtp = async (req, res) => {
	const { email, otp } = req.body;

	if (!email || !otp) {
		return res.status(400).json({ message: "Please provide email and OTP" });
	}

	try {
		// Get stored OTP data
		const otpData = otpStore.get(email);

		if (!otpData) {
			return res.status(400).json({ message: "No OTP request found for this email" });
		}

		// Check expiry
		if (Date.now() > otpData.expiresAt) {
			otpStore.delete(email);
			return res.status(400).json({ message: "OTP has expired. Please request a new one." });
		}

		// Verify OTP
		if (otpData.otp !== otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		// Generate reset token
		const resetToken = generateResetToken();
		otpStore.set(email, { ...otpData, resetToken, otp: null }); // Clear OTP, set reset token

		return res.status(200).json({
			message: "OTP verified successfully",
			resetToken,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

// Reset password with token
export const resetPassword = async (req, res) => {
	const { email, resetToken, newPassword } = req.body;

	if (!email || !resetToken || !newPassword) {
		return res.status(400).json({ message: "Please provide email, reset token, and new password" });
	}

	if (newPassword.length < 6) {
		return res.status(400).json({ message: "Password must be at least 6 characters" });
	}

	try {
		// Verify reset token
		const otpData = otpStore.get(email);

		if (!otpData || otpData.resetToken !== resetToken) {
			return res.status(400).json({ message: "Invalid or expired reset token" });
		}

		// Find user and update password
		const user = await Auth.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Hash new password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		// Update password
		user.password = hashedPassword;
		await user.save();

		// Clear OTP data
		otpStore.delete(email);

		return res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

// Change password
export const changePassword = async (req, res) => {
	const user_id = req.user.id;
	const { current_password, new_password } = req.body;

	if (!current_password || !new_password) {
		return res
			.status(400)
			.json({ message: "Please provide current and new password" });
	}

	if (new_password.length < 6) {
		return res
			.status(400)
			.json({ message: "New password must be at least 6 characters" });
	}

	try {
		const user = await Auth.findById(user_id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Check current password
		const isPasswordValid = await bcrypt.compare(
			current_password,
			user.password
		);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Current password is incorrect" });
		}

		// Hash new password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(new_password, saltRounds);

		// Update password
		user.password = hashedPassword;
		await user.save();

		return res.status(200).json({ message: "Password changed successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};
