import express from "express"
import { login, logout, signup } from "../controllers/auth.controllers.js";
//  import { upload } from "../middlware/multer.middlware.js";


const router=express.Router()

router.post("/signup",signup)


router.post("/login",login)
router.get("/logout",logout)
   


export default router;

