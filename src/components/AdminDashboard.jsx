import React, { useState, useMemo } from "react";
import { usePortfolio } from "./PortfolioContext";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Edit,
  Trash,
  Plus,
  Search,
  Filter,
  Eye,
  ExternalLink,
  Calendar,
  Tag,
  AlertCircle,
  ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

const AdminDashboard = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [editingProject, setEditingProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    link: "",
    tags: "",
    status: "active",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Added

  // Get unique categories
  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category))].filter(Boolean),
    [projects]
  );

  // Filter & sort projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          );
        const matchesCategory =
          filterCategory === "all" || project.category === filterCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return (b.id || b._id || 0) - (a.id || a._id || 0);
          case "oldest":
            return (a.id || a._id || 0) - (b.id || b._id || 0);
          case "title":
            return a.title.localeCompare(b.title);
          case "category":
            return a.category.localeCompare(b.category);
          default:
            return 0;
        }
      });
  }, [projects, searchTerm, filterCategory, sortBy]);

  // Helpers
  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      image: "",
      link: "",
      tags: "",
      status: "active",
    });
    setFormErrors({});
    setEditingProject(null);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      tags: project.tags?.join(", ") || "",
      status: project.status || "active",
    });
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const openAddModal = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (formData.image && !isValidUrl(formData.image))
      errors.image = "Please enter a valid image URL";
    if (formData.link && !isValidUrl(formData.link))
      errors.link = "Please enter a valid project URL";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const method = editingProject ? "PUT" : "POST";
      const url = editingProject
        ? `${import.meta.env.VITE_API_URL}/projects/${
            editingProject._id || editingProject.id
          }`
        : `${import.meta.env.VITE_API_URL}/projects`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`HTTP error! ${res.status}: ${errorData}`);
      }

      const result = await res.json();
      const savedProject = result.success ? result.data : result;

      if (editingProject) {
        updateProject(editingProject._id || editingProject.id, savedProject);
      } else {
        addProject(savedProject);
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error saving project:", err);
      alert(`Failed to save project: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      deleteProject(project._id || project.id);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  // Project Card
  const ProjectCard = ({ project }) => (
    <Card className="bg-white hover:shadow-lg transition-shadow duration-200 border-none">
      <CardContent className="p-0">
        {project.image ? (
          <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="absolute top-2 right-2">
              <Badge
                className={`${getStatusBadgeColor(project.status || "active")} text-xs`}
              >
                {(project.status || "active")
                  .charAt(0)
                  .toUpperCase() +
                  (project.status || "active").slice(1)}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-400">
            No Image
          </div>
        )}

        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-gray-900 text-lg truncate flex-1 mr-2">
              {project.title}
            </h3>
            <div className="flex gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openEditModal(project)}
                className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(project)}
                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Badge variant="secondary" className="mb-3 text-xs">
            {project.category}
          </Badge>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs px-2 py-1">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{project.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {project.link && (
            <Button
              variant="link"
              size="sm"
              onClick={() => window.open(project.link, "_blank")}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto flex items-center gap-1"
            >
              Visit Project <ExternalLink className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-23">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center  gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
          </div>
          <Button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 border-none">
          {[
            {
              label: "Total Projects",
              value: projects.length,
              icon: <Eye className="w-5 h-5 text-blue-600" />,
              color: "bg-blue-100",
            },
            {
              label: "Categories",
              value: categories.length,
              icon: <Tag className="w-5 h-5 text-green-600" />,
              color: "bg-green-100",
            },
            {
              label: "Active",
              value: projects.filter((p) => p.status === "active" || !p.status).length,
              icon: <Calendar className="w-5 h-5 text-green-600" />,
              color: "bg-green-100",
            },
            {
              label: "Drafts",
              value: projects.filter((p) => p.status === "draft").length,
              icon: <Edit className="w-5 h-5 text-yellow-600" />,
              color: "bg-yellow-100",
            },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-white border-none">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>{stat.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search & Filters */}
        <Card className="bg-white mb-6 border-none">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title</option>
                <option value="category">Category</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id || project._id} project={project} />
          ))}
        </div>

        {/* Modern Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white shadow-2xl border-0">
            <DialogHeader className="pb-6 border-b border-gray-100">
              <DialogTitle className="text-lg font-semibold">
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? `Editing: ${editingProject.title}`
                  : "Fill out the details for the new project."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.title && (
                  <span className="text-red-600 text-xs">{formErrors.title}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.category && (
                  <span className="text-red-600 text-xs">{formErrors.category}</span>
                )}
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.description && (
                  <span className="text-red-600 text-xs">{formErrors.description}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.image && (
                  <span className="text-red-600 text-xs">{formErrors.image}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Project Link</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => handleChange("link", e.target.value)}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.link && (
                  <span className="text-red-600 text-xs">{formErrors.link}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading
                  ? editingProject
                    ? "Updating..."
                    : "Creating..."
                  : editingProject
                  ? "Update Project"
                  : "Create Project"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
