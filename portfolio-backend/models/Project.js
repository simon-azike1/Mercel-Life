const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  status: { type: String, enum: ["active", "draft", "archived"], default: "active" },
  image: { type: String, default: "" },  // new field
  link: { type: String, default: "" },   // new field
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);