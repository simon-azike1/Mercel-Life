// scripts/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import User model
const User = require("../models/User");

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Admin user details - CHANGE THESE!
    const adminData = {
      email: "admin@mercel-life.com", // Change this
      password: "admin123456", // Change this to a strong password
      name: "Admin User",
      role: "admin"
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("❌ Admin user already exists with this email");
      process.exit(1);
    }

    // Create admin user
    const admin = new User(adminData);
    await admin.save();

    console.log("✅ Admin user created successfully!");
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`🔑 Password: ${adminData.password}`);
    console.log("⚠️  Please change the password after first login!");

  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
createAdminUser();