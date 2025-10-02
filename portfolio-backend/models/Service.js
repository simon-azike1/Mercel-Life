const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "General" },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    features: [String],
    tags: { type: [String], default: [] },
    price: { type: String, default: "" },
    icon: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
