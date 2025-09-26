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
    const { title, category, description, tags, status } = req.body;

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
      tags: Array.isArray(tags) ? tags : [],
      status: status || "active",
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
// PUT update project
// ------------------------
router.put("/:id", async (req, res) => {
  try {
    const { title, category, description, tags, status } = req.body;
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

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        description,
        tags: Array.isArray(tags) ? tags : [],
        status: status || "active",
      },
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

// ------------------------
// PATCH project status
// ------------------------
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "draft", "archived"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'active', 'draft', or 'archived'",
      });
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Project not found" });

    res.json({ success: true, message: "Project status updated successfully", data: transformProject(updated) });
  } catch (err) {
    console.error("Error updating project status:", err.stack);
    res.status(500).json({
      success: false,
      message: "Failed to update project status",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

module.exports = router;
