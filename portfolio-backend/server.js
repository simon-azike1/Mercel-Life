const express = require("express");
const mongoose = require("mongoose"); // <- uncommented
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173", // Vite dev server
    "https://mercel-life.vercel.app" // Vercel frontend
  ]
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); // stop server if DB connection fails
    });

// Import routes
const projectRoutes = require("./routes/projectRoutes");
app.use("/projects", projectRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("API is running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
