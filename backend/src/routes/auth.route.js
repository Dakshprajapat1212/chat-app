import express from "express"
import { login, logout, signup,UpdateProfile,checkAuth } from "../controllers/auth.controllers.js";
//  import { upload } from "../middlware/multer.middlware.js";
import { protectRoute } from "../middlware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.controllers.js";

const router=express.Router()

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)
router.put("/update-profile",protectRoute,UpdateProfile)

router.get("/check",protectRoute,checkAuth)
   router.get("/:id",protectRoute,getUsersForSidebar)
router.post("sender/:id",protectRoute,sendMessage)

export default router;

