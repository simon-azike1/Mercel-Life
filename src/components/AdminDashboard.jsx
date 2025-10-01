import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  LogOut,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // -------------------- Authentication --------------------
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) navigate("/login", { replace: true });
  }, [navigate]);

  // -------------------- Portfolio Context --------------------
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();

  // -------------------- State --------------------
  const [editingProject, setEditingProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

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

  // -------------------- Derived Data --------------------
  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category))].filter(Boolean),
    [projects]
  );

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

  // -------------------- Helper Functions --------------------
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
    if (formErrors[name])
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
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
    if (!formData.description.trim())
      errors.description = "Description is required";
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
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
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
    if (
      window.confirm(`Are you sure you want to delete "${project.title}"?`)
    ) {
      deleteProject(project._id || project.id);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "draft":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  // -------------------- Components --------------------
  const ProjectCard = ({ project }) => (
    <Card className="group bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-gray-200 rounded-xl overflow-hidden">
      <CardContent className="p-0">
        {/* Project Image */}
        {project.image ? (
          <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute top-3 right-3">
              <Badge
                className={`${getStatusBadgeColor(
                  project.status || "active"
                )} text-xs font-medium px-2 py-1 shadow-sm`}
              >
                {(project.status || "active")
                  .charAt(0)
                  .toUpperCase() + (project.status || "active").slice(1)}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-52 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <ImageIcon className="w-12 h-12" />
          </div>
        )}

        {/* Project Details */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-gray-900 text-xl truncate flex-1 mr-3 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openEditModal(project)}
                className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(project)}
                className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 rounded-lg"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Badge
            variant="secondary"
            className="mb-4 text-xs font-medium bg-blue-50 text-blue-700 border-blue-200"
          >
            {project.category}
          </Badge>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 2).map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs px-2 py-1 bg-gray-50 border-gray-200"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-1 bg-gray-50 border-gray-200"
                >
                  +{project.tags.length - 2} more
                </Badge>
              )}
            </div>
          )}

          {project.link && (
            <Button
              variant="link"
              size="sm"
              onClick={() => window.open(project.link, "_blank")}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto flex items-center gap-1.5 font-medium"
            >
              <ExternalLink className="w-3 h-3" /> Visit Project
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // -------------------- Render --------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Portfolio Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and showcase your creative work
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
              <Button
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 px-6 py-2.5"
              >
                <Plus className="w-4 h-4" /> Add New Project
              </Button>
            </div>
          </div>
        </div>

             {/* -------------------- Stats Grid -------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Projects",
              value: projects.length,
              icon: <Eye className="w-6 h-6" />,
              bgColor: "bg-blue-50",
              textColor: "text-blue-600",
            },
            {
              label: "Categories",
              value: categories.length,
              icon: <Tag className="w-6 h-6" />,
              bgColor: "bg-emerald-50",
              textColor: "text-emerald-600",
            },
            {
              label: "Active Projects",
              value: projects.filter((p) => p.status === "active" || !p.status)
                .length,
              icon: <Calendar className="w-6 h-6" />,
              bgColor: "bg-green-50",
              textColor: "text-green-600",
            },
            {
              label: "Draft Projects",
              value: projects.filter((p) => p.status === "draft").length,
              icon: <Edit className="w-6 h-6" />,
              bgColor: "bg-amber-50",
              textColor: "text-amber-600",
            },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-4 rounded-xl ${stat.textColor}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* -------------------- Search & Filters -------------------- */}
        <Card className="bg-white border border-gray-100 rounded-xl shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 min-w-[160px]"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 min-w-[140px]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">By Title</option>
                <option value="category">By Category</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* -------------------- Projects Grid -------------------- */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id || project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl border border-gray-200 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by adding your first project"}
              </p>
              {!searchTerm && filterCategory === "all" && (
                <Button
                  onClick={openAddModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Your First Project
                </Button>
              )}
            </div>
          </div>
        )}

        {/* -------------------- Add/Edit Project Dialog -------------------- */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-0 rounded-2xl">
            <DialogHeader className="pb-6 border-b border-gray-100">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {editingProject ? "Edit Project" : "Create New Project"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-lg">
                {editingProject
                  ? `Editing: ${editingProject.title}`
                  : "Fill out the details to showcase your new project."}
              </DialogDescription>
            </DialogHeader>

            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter project title"
                />
                {formErrors.title && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {formErrors.title}
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  Category *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g. Web Design, Branding, Photography"
                />
                {formErrors.category && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {formErrors.category}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your project, the challenges you solved, and the impact it made..."
                />
                {formErrors.description && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {formErrors.description}
                  </span>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                />
                {formErrors.image && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {formErrors.image}
                  </span>
                )}
              </div>

              {/* Project Link */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  Project Link
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => handleChange("link", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://yourproject.com"
                />
                {formErrors.link && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {formErrors.link}
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g. React, UI, Branding"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Dialog Actions */}
            <div className="flex justify-end gap-4 mt-8 border-t border-gray-100 pt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading
                  ? editingProject
                    ? "Saving..."
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
