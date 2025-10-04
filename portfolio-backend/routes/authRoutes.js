const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Login route with detailed debugging
router.post("/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;
  
  // Validate request
  if (!email || !password) {
    console.warn("Login attempt with missing email or password");
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    console.log("Login attempt for:", email);

    // Find user in DB
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.warn(`Login failed: User not found - ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    if (!user.password) {
      console.error(`User ${email} has no password stored!`);
      return res.status(500).json({ message: "Internal server error" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match for ${email}:`, isMatch);

    if (!isMatch) {
      console.warn(`Login failed: Incorrect password - ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Sign JWT
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables!");
      return res.status(500).json({ message: "Internal server error" });
    }

    const tokenExpiry = rememberMe ? "7d" : "24h";
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    console.log(`Login successful: ${email}`);

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name || user.email.split("@")[0] },
      expiresIn: rememberMe ? 604800 : 86400,
    });
  } catch (err) {
    console.error("Login route error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
