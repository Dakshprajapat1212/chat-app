import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const generateAccessToken = async (userId, res) => {
  const user = await User.findById(userId);
  if (!user) {
    return res.status(560).json({ message: "User not present" });
  }

  const accessToken = jwt.sign(
    {
      _id: user._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict", // Optional for better CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  res.cookie("accessToken", accessToken, options);

  return accessToken;
};