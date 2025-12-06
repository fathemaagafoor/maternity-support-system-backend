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
