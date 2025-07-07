
import { setMaxListeners } from "events";
setMaxListeners(20); // Or more


import express from "express";



import dotenv from "dotenv"
import connectDB from "./src/db/db.js";
import { app } from "./app.js";

dotenv.config();
 // ✅ Declare first
const PORT=process.env.PORT ;

connectDB()
.then(()=>{
      app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
});

})
