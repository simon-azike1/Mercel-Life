// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// CORS setup - allow local dev and Vercel frontend
const cors = require("cors");

app.use(cors({
  origin: [
    "https://mercel-life.vercel.app", // your frontend
    "http://localhost:5173" // for local dev
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));


app.use(express.json()); // parse JSON

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
const projectRoutes = require("./routes/projectRoutes");
app.use("/projects", projectRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
