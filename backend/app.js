import express from  "express"
import cors from "cors"
import cookieparser from "cookie-parser"

const app=express();
;

app.use(cors({
  origin: "http://localhost:5173", // ✅ No extra quotes
  credentials: true, // If you use cookies
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieparser())

 // route import
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";

app.use("/api/auth", authRoutes); 
app.use("/api/messages", messageRoutes); 


export {app}