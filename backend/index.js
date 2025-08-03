// index.js
import dotenv from "dotenv";
import path from "path";
import express from "express";
import { server, app } from "./src/lib/socket.js"; // ✅ app and server both imported
import connectDB from "./src/db/db.js";

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    // ✅ Serve frontend only in production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "backend/public")));

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "backend/public", "index.html"));
      });
    }

    server.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB connection failed", err));
