import express from "express";
import { protectRoute } from "../middlware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.controllers.js";
const router =express.Router();


router.get("/users",protectRoute,getUsersForSidebar)
router.get("/:id",protectRoute,getMessages)//gonna fetch user id that fetch message 
export default router;