// routes/authRoutes.js - WITH NODEMAILER EMAIL INTEGRATION
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// Create nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Email template for password reset
const createResetEmailHTML = (resetUrl, userEmail) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1f2937, #059669); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px 20px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #1f2937, #059669); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Reset Your Password</h1>
          <p>Mercel Life Portfolio Admin</p>
        </div>
        
        <div class="content">
          <h2>Hello,</h2>
          <p>You recently requested to reset your password for your Mercel Life admin account.</p>
          
          <p>Click the button below to reset your password:</p>
          
          <a href="${resetUrl}" class="button">Reset Password</a>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #059669;">${resetUrl}</p>
          
          <div class="warning">
            <strong>Security Notice:</strong>
            <ul>
              <li>This link will expire in <strong>10 minutes</strong> for security</li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>Never share this link with anyone</li>
            </ul>
          </div>
          
          <p>If you're having trouble, please contact the administrator.</p>
        </div>
        
        <div class="footer">
          <p>This email was sent to: ${userEmail}</p>
          <p>&copy; 2024 Mercel Life Portfolio. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

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
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const tokenExpiry = rememberMe ? "7d" : "24h";
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || user.email.split('@')[0]
      },
      expiresIn: rememberMe ? 604800 : 86400
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    // Always return success message for security (don't reveal if email exists)
    if (!user) {
      return res.status(200).json({ 
        message: "If that email exists in our system, we've sent a password reset link." 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const frontendUrl = process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL_PROD 
      : process.env.FRONTEND_URL_LOCAL;
    
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;
    
    // Send email
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Mercel Life Portfolio',
        address: process.env.EMAIL_USER
      },
      to: user.email,
      subject: 'Reset Your Password - Mercel Life Portfolio',
      html: createResetEmailHTML(resetUrl, user.email),
      text: `
        Reset Your Password - Mercel Life Portfolio
        
        You recently requested to reset your password.
        
        Click this link to reset your password: ${resetUrl}
        
        This link will expire in 10 minutes for security.
        
        If you didn't request this reset, please ignore this email.
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log(`Password reset email sent to: ${user.email}`);
    
    res.status(200).json({ 
      message: "If that email exists in our system, we've sent a password reset link."
    });

  } catch (err) {
    console.error("Forgot password error:", err);
    
    // Don't reveal email sending errors to user for security
    if (err.code === 'EAUTH' || err.code === 'ESOCKET') {
      console.error("Email configuration error:", err.message);
    }
    
    res.status(200).json({ 
      message: "If that email exists in our system, we've sent a password reset link."
    });
  }
});

// POST /auth/reset-password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: "Invalid or expired reset token. Please request a new password reset." 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    // Send confirmation email
    try {
      const transporter = createTransporter();
      
      const confirmationMailOptions = {
        from: {
          name: 'Mercel Life Portfolio',
          address: process.env.EMAIL_USER
        },
        to: user.email,
        subject: 'Password Successfully Reset - Mercel Life Portfolio',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1f2937, #059669); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1>Password Reset Successful</h1>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px;">
              <p>Your password has been successfully reset.</p>
              <p>You can now log in to your admin dashboard with your new password.</p>
              <p>If you didn't make this change, please contact the administrator immediately.</p>
            </div>
          </div>
        `,
        text: 'Your password has been successfully reset. You can now log in with your new password.'
      };

      await transporter.sendMail(confirmationMailOptions);
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
      // Don't fail the password reset if email fails
    }

    res.status(200).json({ 
      message: "Password has been successfully reset. You can now log in with your new password." 
    });

  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /auth/verify
router.post("/verify", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

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

// POST /auth/logout
router.post("/logout", async (req, res) => {
  try {
    res.json({
      message: "Logged out successfully"
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;