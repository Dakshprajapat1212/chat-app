import  Jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const protectRoute = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "unauthorised session" });
    }

    const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       const user = await User.findById(decodedToken?._id).select("-password")

    if (!user) {
      return res.status(401).json({ message: "invalid status" });
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(403, error?.message || "invalid access token");
  }
});

