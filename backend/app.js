import express from  "express"
import cors from "cors"
import cookieparser from "cookie-parser"

const app=express();
 app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieparser())

 // route import
import authRoutes from "./src/routes/auth.route.js";

app.use("/api/user/v1", authRoutes); 

export {app}