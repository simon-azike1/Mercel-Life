// routes/authRoutes.js - MOST SECURE VERSION
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /auth/register - COMPLETELY DISABLED FOR SECURITY
router.post("/register", (req, res) => {
  res.status(403).json({ 
    message: "Registration is disabled. Contact administrator for access." 
  });
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user (case insensitive)
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token with longer expiry if rememberMe is true
    const tokenExpiry = rememberMe ? "7d" : "24h";
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    // Update user's last login
    user.lastLogin = new Date();
    await user.save();

    // Return response in the format your frontend expects
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || user.email.split('@')[0]
      },
      expiresIn: rememberMe ? 604800 : 86400 // seconds
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /auth/verify - to verify if token is still valid
router.post("/verify", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.json({
      message: "Token is valid",
      user: {
        id: user._id,
        email: user.email,
        name: user.name || user.email.split('@')[0]
      }
    });

  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// POST /auth/logout - clear any server-side session data
router.post("/logout", async (req, res) => {
  try {
    // Since we're using JWTs, logout is mainly handled client-side
    // But we can add any server-side cleanup here if needed
    
    res.json({
      message: "Logged out successfully"
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;