import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  Briefcase,
  FolderOpen,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("portfolio"); // 'portfolio' or 'services'
  
  // Portfolio State
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    link: "",
    tags: "",
    status: "active",
  });
  const [projectFormErrors, setProjectFormErrors] = useState({});
  
  // Services State
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [serviceFormData, setServiceFormData] = useState({
    title: "",
    description: "",
    price: "",
    icon: "Palette",
    features: "",
    status: "active",
  });
  const [serviceFormErrors, setServiceFormErrors] = useState({});
  
  // Common State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  // Load data on mount
  useEffect(() => {
    fetchProjects();
    fetchServices();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/services`);
      const data = await res.json();
      setServices(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

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

  // Filter & sort services
  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        const matchesSearch =
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return (b.id || b._id || 0) - (a.id || a._id || 0);
          case "oldest":
            return (a.id || a._id || 0) - (b.id || b._id || 0);
          case "title":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [services, searchTerm, sortBy]);

  // Portfolio Handlers
  const resetProjectForm = () => {
    setProjectFormData({
      title: "",
      category: "",
      description: "",
      image: "",
      link: "",
      tags: "",
      status: "active",
    });
    setProjectFormErrors({});
    setEditingProject(null);
  };

  const openEditProjectModal = (project) => {
    setEditingProject(project);
    setProjectFormData({
      ...project,
      tags: project.tags?.join(", ") || "",
      status: project.status || "active",
    });
    setProjectFormErrors({});
    setIsProjectDialogOpen(true);
  };

  const openAddProjectModal = () => {
    resetProjectForm();
    setIsProjectDialogOpen(true);
  };

  const handleProjectChange = (name, value) => {
    setProjectFormData((prev) => ({ ...prev, [name]: value }));
    if (projectFormErrors[name]) setProjectFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const validateProjectForm = () => {
    const errors = {};
    if (!projectFormData.title.trim()) errors.title = "Title is required";
    if (!projectFormData.category.trim()) errors.category = "Category is required";
    if (!projectFormData.description.trim()) errors.description = "Description is required";
    if (projectFormData.image && !isValidUrl(projectFormData.image))
      errors.image = "Please enter a valid image URL";
    if (projectFormData.link && !isValidUrl(projectFormData.link))
      errors.link = "Please enter a valid project URL";
    setProjectFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProject = async () => {
    if (!validateProjectForm()) return;

    try {
      setIsLoading(true);
      const method = editingProject ? "PUT" : "POST";
      const url = editingProject
        ? `${import.meta.env.VITE_API_URL}/projects/${editingProject._id || editingProject.id}`
        : `${import.meta.env.VITE_API_URL}/projects`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...projectFormData,
          tags: projectFormData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);

      await fetchProjects();
      resetProjectForm();
      setIsProjectDialogOpen(false);
    } catch (err) {
      console.error("Error saving project:", err);
      alert(`Failed to save project: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/projects/${project._id || project.id}`, {
          method: "DELETE",
        });
        await fetchProjects();
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project");
      }
    }
  };

  // Service Handlers
  const resetServiceForm = () => {
    setServiceFormData({
      title: "",
      description: "",
      price: "",
      icon: "Palette",
      features: "",
      status: "active",
    });
    setServiceFormErrors({});
    setEditingService(null);
  };

  const openEditServiceModal = (service) => {
    setEditingService(service);
    setServiceFormData({
      ...service,
      features: service.features?.join("\n") || "",
      status: service.status || "active",
    });
    setServiceFormErrors({});
    setIsServiceDialogOpen(true);
  };

  const openAddServiceModal = () => {
    resetServiceForm();
    setIsServiceDialogOpen(true);
  };

  const handleServiceChange = (name, value) => {
    setServiceFormData((prev) => ({ ...prev, [name]: value }));
    if (serviceFormErrors[name]) setServiceFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateServiceForm = () => {
    const errors = {};
    if (!serviceFormData.title.trim()) errors.title = "Title is required";
    if (!serviceFormData.description.trim()) errors.description = "Description is required";
    if (!serviceFormData.price.trim()) errors.price = "Price is required";
    setServiceFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveService = async () => {
    if (!validateServiceForm()) return;

    try {
      setIsLoading(true);
      const method = editingService ? "PUT" : "POST";
      const url = editingService
        ? `${import.meta.env.VITE_API_URL}/services/${editingService._id || editingService.id}`
        : `${import.meta.env.VITE_API_URL}/services`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...serviceFormData,
          features: serviceFormData.features.split("\n").map((f) => f.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);

      await fetchServices();
      resetServiceForm();
      setIsServiceDialogOpen(false);
    } catch (err) {
      console.error("Error saving service:", err);
      alert(`Failed to save service: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (service) => {
    if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/services/${service._id || service.id}`, {
          method: "DELETE",
        });
        await fetchServices();
      } catch (err) {
        console.error("Error deleting service:", err);
        alert("Failed to delete service");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    window.location.href = '/';
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

  // Project Card Component
  const ProjectCard = ({ project }) => (
    <Card className="group bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-gray-200 rounded-xl overflow-hidden">
      <CardContent className="p-0">
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
              <Badge className={`${getStatusBadgeColor(project.status || "active")} text-xs font-medium px-2 py-1 shadow-sm`}>
                {(project.status || "active").charAt(0).toUpperCase() + (project.status || "active").slice(1)}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-52 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <ImageIcon className="w-12 h-12" />
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-gray-900 text-xl truncate flex-1 mr-3 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openEditProjectModal(project)}
                className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteProject(project)}
                className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 rounded-lg"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Badge variant="secondary" className="mb-4 text-xs font-medium bg-blue-50 text-blue-700 border-blue-200">
            {project.category}
          </Badge>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 2).map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs px-2 py-1 bg-gray-50 border-gray-200">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 2 && (
                <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50 border-gray-200">
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
              <ExternalLink className="w-3 h-3" />
              Visit Project
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Service Card Component
  const ServiceCard = ({ service }) => (
    <Card className="group bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-gray-200 rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-green-600 to-black rounded-lg text-white mr-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xl group-hover:text-green-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-green-600 font-medium">{service.price}</p>
            </div>
          </div>
          <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openEditServiceModal(service)}
              className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteService(service)}
              className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 rounded-lg"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

        {service.features?.length > 0 && (
          <div className="space-y-2">
            {service.features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-black rounded-full mr-3"></div>
                {feature}
              </div>
            ))}
            {service.features.length > 3 && (
              <p className="text-sm text-gray-500 ml-5">+{service.features.length - 3} more features</p>
            )}
          </div>
        )}

        <Badge className={`${getStatusBadgeColor(service.status || "active")} text-xs font-medium px-2 py-1 mt-4`}>
          {(service.status || "active").charAt(0).toUpperCase() + (service.status || "active").slice(1)}
        </Badge>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage your portfolio and services</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
              <Button
                onClick={activeTab === "portfolio" ? openAddProjectModal : openAddServiceModal}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 px-6 py-2.5"
              >
                <Plus className="w-4 h-4" />
                Add New {activeTab === "portfolio" ? "Project" : "Service"}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab("portfolio");
                setSearchTerm("");
                setFilterCategory("all");
              }}
              className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 flex items-center gap-2 ${
                activeTab === "portfolio"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              Portfolio Projects
            </button>
            <button
              onClick={() => {
                setActiveTab("services");
                setSearchTerm("");
                setFilterCategory("all");
              }}
              className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 flex items-center gap-2 ${
                activeTab === "services"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Services
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        {activeTab === "portfolio" ? (
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
                value: projects.filter((p) => p.status === "active" || !p.status).length,
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
              <Card key={idx} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                label: "Total Services",
                value: services.length,
                icon: <Briefcase className="w-6 h-6" />,
                bgColor: "bg-green-50",
                textColor: "text-green-600",
              },
              {
                label: "Active Services",
                value: services.filter((s) => s.status === "active" || !s.status).length,
                icon: <Calendar className="w-6 h-6" />,
                bgColor: "bg-emerald-50",
                textColor: "text-emerald-600",
              },
              {
                label: "Draft Services",
                value: services.filter((s) => s.status === "draft").length,
                icon: <Edit className="w-6 h-6" />,
                bgColor: "bg-amber-50",
                textColor: "text-amber-600",
              },
            ].map((stat, idx) => (
              <Card key={idx} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
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
        )}

        {/* Search & Filters */}
        <Card className="bg-white border border-gray-100 rounded-xl shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === "portfolio" ? "projects" : "services"}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                />
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                {activeTab === "portfolio" && (
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
                )}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 min-w-[140px]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">By Title</option>
                  {activeTab === "portfolio" && <option value="category">By Category</option>}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        {activeTab === "portfolio" ? (
          filteredProjects.length > 0 ? (
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterCategory !== "all"
                    ? "Try adjusting your search or filters"
                    : "Get started by adding your first project"}
                </p>
                {!searchTerm && filterCategory === "all" && (
                  <Button onClick={openAddProjectModal} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Project
                  </Button>
                )}
              </div>
            </div>
          )
        ) : (
          filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id || service._id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm
                    ? "Try adjusting your search"
                    : "Get started by adding your first service"}
                </p>
                {!searchTerm && (
                  <Button onClick={openAddServiceModal} className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Service
                  </Button>
                )}
              </div>
            </div>
          )
        )}

        {/* Portfolio Dialog */}
        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Project Title *</label>
                <input
                  type="text"
                  value={projectFormData.title}
                  onChange={(e) => handleProjectChange("title", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter project title"
                />
                {projectFormErrors.title && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {projectFormErrors.title}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Category *</label>
                <input
                  type="text"
                  value={projectFormData.category}
                  onChange={(e) => handleProjectChange("category", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g. Web Design, Branding, Photography"
                />
                {projectFormErrors.category && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {projectFormErrors.category}
                  </span>
                )}
              </div>

              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-900">Description *</label>
                <textarea
                  value={projectFormData.description}
                  onChange={(e) => handleProjectChange("description", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your project, the challenges you solved, and the impact it made..."
                />
                {projectFormErrors.description && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {projectFormErrors.description}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Image URL</label>
                <input
                  type="text"
                  value={projectFormData.image}
                  onChange={(e) => handleProjectChange("image", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                />
                {projectFormErrors.image && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {projectFormErrors.image}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Project Link</label>
                <input
                  type="text"
                  value={projectFormData.link}
                  onChange={(e) => handleProjectChange("link", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://your-project.com"
                />
                {projectFormErrors.link && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {projectFormErrors.link}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Tags</label>
                <input
                  type="text"
                  value={projectFormData.tags}
                  onChange={(e) => handleProjectChange("tags", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="React, Design, Frontend (comma separated)"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Status</label>
                <select
                  value={projectFormData.status}
                  onChange={(e) => handleProjectChange("status", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-100 gap-4">
              <Button
                variant="outline"
                onClick={() => setIsProjectDialogOpen(false)}
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProject}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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

        {/* Service Dialog */}
        <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-0 rounded-2xl">
            <DialogHeader className="pb-6 border-b border-gray-100">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {editingService ? "Edit Service" : "Create New Service"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-lg">
                {editingService
                  ? `Editing: ${editingService.title}`
                  : "Fill out the details to add a new service offering."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Service Title *</label>
                <input
                  type="text"
                  value={serviceFormData.title}
                  onChange={(e) => handleServiceChange("title", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter service title"
                />
                {serviceFormErrors.title && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {serviceFormErrors.title}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Price *</label>
                <input
                  type="text"
                  value={serviceFormData.price}
                  onChange={(e) => handleServiceChange("price", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g. $999 or Starting at $500"
                />
                {serviceFormErrors.price && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {serviceFormErrors.price}
                  </span>
                )}
              </div>

              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-900">Description *</label>
                <textarea
                  value={serviceFormData.description}
                  onChange={(e) => handleServiceChange("description", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe what this service includes and the value it provides..."
                />
                {serviceFormErrors.description && (
                  <span className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {serviceFormErrors.description}
                  </span>
                )}
              </div>

              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-900">Features</label>
                <textarea
                  value={serviceFormData.features}
                  onChange={(e) => handleServiceChange("features", e.target.value)}
                  rows={6}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Enter each feature on a new line&#10;Responsive Design&#10;SEO Optimization&#10;Mobile-First Approach"
                />
                <p className="text-xs text-gray-500">Enter each feature on a new line</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Icon Name</label>
                <input
                  type="text"
                  value={serviceFormData.icon}
                  onChange={(e) => handleServiceChange("icon", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g. Palette, Code, Camera"
                />
                <p className="text-xs text-gray-500">Use Lucide React icon names</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Status</label>
                <select
                  value={serviceFormData.status}
                  onChange={(e) => handleServiceChange("status", e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-100 gap-4">
              <Button
                variant="outline"
                onClick={() => setIsServiceDialogOpen(false)}
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveService}
                className="bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-gray-900 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading
                  ? editingService
                    ? "Updating..."
                    : "Creating..."
                  : editingService
                  ? "Update Service"
                  : "Create Service"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;