const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import routes
const projectRoutes = require("./routes/projectRoutes");
app.use("/projects", projectRoutes); // <- this defines /projects route

// Test route
app.get("/", (req, res) => {
    res.send("API is running!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
