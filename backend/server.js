const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");
connectDB();
console.log(process.env.MONGO_URI);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});