const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// ----------------------
// Nodemailer transporter
// ----------------------
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT == 465, // true if port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
};

// ----------------------
// Email template
// ----------------------
const createResetEmailHTML = (resetUrl, userEmail) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #1f2937, #059669); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1>Reset Your Password</h1>
    </div>
    <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px;">
      <p>Hello,</p>
      <p>You requested a password reset for your Mercel Life admin account.</p>
      <p>Click below to reset your password:</p>
      <a href="${resetUrl}" style="display:inline-block; padding:12px 25px; background:#059669; color:white; border-radius:8px; text-decoration:none;">Reset Password</a>
      <p>If that doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color:#059669;">${resetUrl}</p>
      <p>This link expires in 10 minutes. Ignore this email if you didn't request a reset.</p>
    </div>
  </div>
`;

// ----------------------
// Routes
// ----------------------

// Disabled registration
router.post("/register", (req, res) => {
  res.status(403).json({ message: "Registration disabled. Contact admin." });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const tokenExpiry = rememberMe ? "7d" : "24h";
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: tokenExpiry,
    });

    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name || user.email.split("@")[0] },
      expiresIn: rememberMe ? 604800 : 86400,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Don't reveal user existence
      return res.status(200).json({ message: "If that email exists, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    const frontendUrl = process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL_PROD
      : process.env.FRONTEND_URL_LOCAL;

    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Mercel Life Portfolio" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: createResetEmailHTML(resetUrl, user.email),
      text: `Reset your password using this link: ${resetUrl}`,
    });

    console.log(`Password reset email sent to: ${user.email}`);

    res.status(200).json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(200).json({ message: "If that email exists, a reset link has been sent." });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: "Token and password required." });
  if (newPassword.length < 6) return res.status(400).json({ message: "Password must be >=6 characters." });

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired reset token." });

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    // Send confirmation email
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Mercel Life Portfolio" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Password Reset Successful",
        text: "Your password has been successfully reset.",
      });
    } catch (emailErr) {
      console.error("Confirmation email failed:", emailErr);
    }

    res.status(200).json({ message: "Password successfully reset." });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Verify JWT token
router.post("/verify", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    res.json({ message: "Token valid", user: { id: user._id, email: user.email, name: user.name || user.email.split("@")[0] } });
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
