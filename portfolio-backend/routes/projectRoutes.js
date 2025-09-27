const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Helper to transform MongoDB document to frontend-friendly object
const transformProject = (project) => ({
  ...project.toObject(),
  id: project._id.toString(),
});

// ------------------------
// GET all projects
// ------------------------
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects.map(transformProject));
  } catch (err) {
    console.error("Error fetching projects:", err.stack);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// ------------------------
// GET single project by ID
// ------------------------
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    res.json(transformProject(project));
  } catch (err) {
    console.error("Error fetching project:", err.stack);
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// ------------------------
// POST new project
// ------------------------
router.post("/", async (req, res) => {
  try {
    const { title, category, description, tags, status, image, link } = req.body;

    // Required fields validation
    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and description are required",
        errors: {
          ...(!title && { title: "Title is required" }),
          ...(!category && { category: "Category is required" }),
          ...(!description && { description: "Description is required" }),
        },
      });
    }

    const newProject = new Project({
      title,
      category,
      description,
      tags: Array.isArray(tags) ? tags.map(tag => tag.trim()).filter(Boolean) : [],
      status: status || "active",
      image: image || "",
      link: link || "",
    });

    const saved = await newProject.save();
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: transformProject(saved),
    });

  } catch (err) {
    console.error("Error creating project:", err.stack);
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// ------------------------
// PUT update project (partial updates allowed)
// ------------------------
router.put("/:id", async (req, res) => {
  try {
    const { title, category, description, tags, status, image, link } = req.body;

    const updatedData = {};
    if (title) updatedData.title = title;
    if (category) updatedData.category = category;
    if (description) updatedData.description = description;
    if (tags) updatedData.tags = Array.isArray(tags) ? tags.map(tag => tag.trim()).filter(Boolean) : [];
    if (status) updatedData.status = status;
    if (image) updatedData.image = image;
    if (link) updatedData.link = link;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ success: false, message: "No valid fields provided to update" });
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Project not found" });

    res.json({
      success: true,
      message: "Project updated successfully",
      data: transformProject(updated),
    });

  } catch (err) {
    console.error("Error updating project:", err.stack);
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// ------------------------
// PATCH project status
// ------------------------
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["active", "draft", "archived"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Project not found" });

    res.json({
      success: true,
      message: "Project status updated successfully",
      data: transformProject(updated),
    });

  } catch (err) {
    console.error("Error updating project status:", err.stack);
    res.status(500).json({
      success: false,
      message: "Failed to update project status",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// ------------------------
// DELETE project
// ------------------------
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Project not found" });

    res.json({
      success: true,
      message: "Project deleted successfully",
      data: { id: deleted._id.toString(), title: deleted.title },
    });
  } catch (err) {
    console.error("Error deleting project:", err.stack);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

module.exports = router;
