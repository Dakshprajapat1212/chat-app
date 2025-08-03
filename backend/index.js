// index.js
import dotenv from "dotenv";
import { server } from "./src/lib/socket.js"; // ✅ already has http.createServer(app)
import connectDB from "./src/db/db.js";
import path from "path"

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB connection failed", err));