import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./router/userRouter.js"
import ownerRouter from "./router/ownerRouter.js"


// Initialize Express App
const app = express();

// Connect db
await connectDB ()

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running ");
});
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)

// Port (from .env or fallback to 3000)
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
