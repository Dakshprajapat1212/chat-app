import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/utils.js";
import cloudinary from "../utils/cloudinary.js";
export const signup = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    console.log("Received:", req.body);

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 8 || password.length > 14) {
      return res.status(400).json({ message: "Password must be 8–14 characters." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword
    });

    if (newUser) {
      const accessToken = await generateAccessToken(newUser._id, res); // ⬅️ FIX: Awaited function
      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          token: accessToken
        }
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email or password required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const accessToken = await generateAccessToken(user._id, res);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: accessToken
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const logout = async (_req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
    console.log("Logout successful");
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal error" });
  }
};


export const UpdateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Invalid user" });
    }
    const updateResponse = await cloudinary.uploader.upload(profilePic, {
      resource_type: "auto",
      timeout: 60000
    });
    const ok=await User.findByIdAndUpdate(userId, { profilePic: updateResponse.secure_url });
    return res.status(200).json({ message: "Profile updated successfully", profilePic: updateResponse.secure_url });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export const checkAuth = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(200).json({ message: "Authenticated", user });
};

