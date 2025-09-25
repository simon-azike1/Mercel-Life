const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the port assigned by Railway or default to 5000 locally
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Example projects endpoint
app.get("/projects", (req, res) => {
  res.json([{ id: 1, title: "Test Project", description: "Sample project" }]);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
