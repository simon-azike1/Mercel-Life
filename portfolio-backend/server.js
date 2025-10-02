const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ----------------------
// CORS setup
// ----------------------
const allowedOrigins = [
  "https://mercel-life.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman or server-to-server requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("CORS policy: This origin is not allowed"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

// ----------------------
// Middleware
// ----------------------
app.use(express.json());

// ----------------------
// MongoDB connection
// ----------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ----------------------
// Routes
// ----------------------
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

console.log("✅ All routes loaded");

// ----------------------
// Test route
// ----------------------
app.get("/", (req, res) => {
  res.send("API is running!");
});

// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
