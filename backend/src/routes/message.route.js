import express from "express";
import { protectRoute } from "../middlware/auth.middleware.js";
import { sendMessage } from "../controllers/message.controllers.js";
import { getMessages } from "../controllers/message.controllers.js";
import { getUsersForSidebar } from "../controllers/message.controllers.js";
const router =express.Router();

router.post("/sender/:id",protectRoute,sendMessage)
router.get("/users",protectRoute,getUsersForSidebar)
router.get("/:id",protectRoute,getMessages)//gonna fetch user id that fetch message 
export default router;
