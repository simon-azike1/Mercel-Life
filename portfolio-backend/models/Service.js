const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  price: String,
  icon: String,
  status: { 
    type: String, 
    enum: ['active', 'draft', 'archived'], 
    default: 'active' 
  } // ADD THIS
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);