 import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 

export const signup = asyncHandler(async (req, res) => {
  const { password } = req.body;
  console.log("Received password:", password);

  if (password.length > 15) {
    return res.status(400).json({ message: "Password must at most 14 digit" });
  } else if (password.length > 7) {
    return res.status(201).json({ message: "Password is valid." });
  } else {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }
})
export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.send("logout route");
};
