import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "./PortfolioContext";
import { useService } from "./ServiceContext";
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
  ExternalLink,
  ImageIcon,
  LogOut,
  Grid3x3,
  List,
  Package,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) navigate("/login", { replace: true });
  }, [navigate]);

  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const { services, addService, updateService, deleteService } = useService();

  const [activeTab, setActiveTab] = useState("portfolio");
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    link: "",
    tags: "",
    status: "active",
    icon: "",
    features: "",
    price: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const items = activeTab === "portfolio" ? projects : services;

  const categories = useMemo(
    () => [...new Set(items.map((p) => p.category))].filter(Boolean),
    [items]
  );

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesSearch =
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesCategory =
          filterCategory === "all" || item.category === filterCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return (b.id || b._id || 0) - (a.id || a._id || 0);
          case "oldest":
            return (a.id || a._id || 0) - (b.id || b._id || 0);
          case "title":
            return (a.title || "").localeCompare(b.title || "");
          case "category":
            return (a.category || "").localeCompare(b.category || "");
          default:
            return 0;
        }
      });
  }, [items, searchTerm, filterCategory, sortBy]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      active: items.filter(i => i.status === 'active').length,
      draft: items.filter(i => i.status === 'draft').length,
      archived: items.filter(i => i.status === 'archived').length,
    };
  }, [items]);

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      image: "",
      link: "",
      tags: "",
      status: "active",
      icon: "",
      features: "",
      price: "",
    });
    setFormErrors({});
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    console.log("Opening edit modal for:", item);
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
      image: item.image || "",
      link: item.link || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      features: Array.isArray(item.features) ? item.features.join(", ") : "",
      icon: item.icon || "",
      price: item.price || "",
      status: item.status || "active",
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
    if (!string) return true; // Empty is valid (optional field)
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title?.trim()) errors.title = "Title is required";
    if (!formData.category?.trim()) errors.category = "Category is required";
    if (!formData.description?.trim()) errors.description = "Description is required";
    if (formData.image && !isValidUrl(formData.image)) errors.image = "Please enter a valid image URL";
    if (formData.link && !isValidUrl(formData.link)) errors.link = "Please enter a valid URL";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const dataToSave = {
        title: formData.title.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        link: formData.link.trim(),
        status: formData.status,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (activeTab === "service") {
        if (formData.features) {
          dataToSave.features = formData.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean);
        }
        if (formData.icon?.trim()) {
          dataToSave.icon = formData.icon.trim();
        }
        if (formData.price && !isNaN(Number(formData.price))) {
          dataToSave.price = Number(formData.price);
        }
      }

      console.log("Saving:", { activeTab, editingItem: !!editingItem, dataToSave });

      if (editingItem) {
        const id = editingItem._id || editingItem.id;
        if (activeTab === "portfolio") {
          await updateProject(id, dataToSave);
        } else {
          await updateService(id, dataToSave);
        }
      } else {
        if (activeTab === "portfolio") {
          await addProject(dataToSave);
        } else {
          await addService(dataToSave);
        }
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (err) {
      console.error(`Error saving ${activeTab}:`, err);
      alert(`Failed to save: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.title}"?`)) return;
    
    try {
      const id = item._id || item.id;
      console.log("Deleting:", { activeTab, id });
      
      if (activeTab === "portfolio") {
        await deleteProject(id);
      } else {
        await deleteService(id);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert(`Failed to delete: ${err.message}`);
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
        return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      case "draft":
        return "bg-amber-500/10 text-amber-700 border-amber-500/20";
      case "archived":
        return "bg-slate-500/10 text-slate-700 border-slate-500/20";
      default:
        return "bg-blue-500/10 text-blue-700 border-blue-500/20";
    }
  };

  const ItemCard = ({ item }) => {
    console.log("Rendering card:", { title: item.title, image: item.image, link: item.link, price: item.price });
    
    return (
      <Card className="group bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          {item.image ? (
            <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  console.error("Image failed:", item.image);
                  e.target.style.display = "none";
                }}
              />
              <div className="absolute  inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4">
                <Badge className={`${getStatusBadgeColor(item.status || "active")} text-xs font-semibold px-3 py-1 shadow-lg backdrop-blur-sm border`}>
                  {(item.status || "active").charAt(0).toUpperCase() + (item.status || "active").slice(1)}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="bg-white/90 hover:bg-white backdrop-blur-sm text-slate-900 shadow-lg flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    className="bg-red-500/90 hover:bg-red-600 backdrop-blur-sm text-white shadow-lg"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
              <div className="flex items-center justify-center h-full text-slate-300">
                <ImageIcon className="w-16 h-16" />
              </div>
              <div className="absolute top-4 right-4">
                <Badge className={`${getStatusBadgeColor(item.status || "active")} text-xs font-semibold px-3 py-1 shadow-lg backdrop-blur-sm border`}>
                  {(item.status || "active").charAt(0).toUpperCase() + (item.status || "active").slice(1)}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="bg-white/90 hover:bg-white backdrop-blur-sm text-slate-900 shadow-lg flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    className="bg-red-500/90 hover:bg-red-600 backdrop-blur-sm text-white shadow-lg"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="mb-3">
              <Badge variant="secondary" className="text-xs font-semibold bg-blue-500/10 text-blue-700 border border-blue-500/20 px-3 py-1">
                {item.category}
              </Badge>
            </div>

            <h3 className="font-bold text-slate-900 text-xl mb-3 line-clamp-2 leading-tight">
              {item.title}
            </h3>

            <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {item.description}
            </p>

            {activeTab === "service" && item.features && item.features.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 mb-2">Features:</div>
                <div className="space-y-1">
                  {item.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="text-xs text-slate-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                  {item.features.length > 3 && (
                    <div className="text-xs text-slate-500 ml-4">+{item.features.length - 3} more</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "service" && item.price > 0 && (
              <div className="mb-4">
                <div className="text-2xl font-bold text-slate-900">
                  ${item.price}
                  <span className="text-sm font-normal text-slate-500"></span>
                </div>
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.slice(0, 3).map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs px-2.5 py-1 bg-slate-50 border-slate-200 text-slate-600 font-medium">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2.5 py-1 bg-slate-50 border-slate-200 text-slate-600 font-medium">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
{/* 
            {item.link && (
              <Button
                variant="link"
                size="sm"
                onClick={() => window.open(item.link, "_blank")}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto flex items-center gap-2 font-semibold group/link"
              >
                <span>{activeTab === "service" ? "Learn More" : "View Project"}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </Button>
            )} */}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen  mt-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-slate-600 text-lg ml-15">
                Manage your {activeTab === "portfolio" ? "portfolio projects" : "services"}
              </p>
            </div>

            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors border-slate-200">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200/50">
              <div className="text-blue-600 text-sm font-semibold mb-1">Total</div>
              <div className="text-3xl font-bold text-blue-900">{stats.total}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200/50">
              <div className="text-emerald-600 text-sm font-semibold mb-1">Active</div>
              <div className="text-3xl font-bold text-emerald-900">{stats.active}</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200/50">
              <div className="text-amber-600 text-sm font-semibold mb-1">Draft</div>
              <div className="text-3xl font-bold text-amber-900">{stats.draft}</div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-4 border border-slate-200/50">
              <div className="text-slate-600 text-sm font-semibold mb-1">Archived</div>
              <div className="text-3xl font-bold text-slate-900">{stats.archived}</div>
            </div>
          </div>

          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "portfolio"
                  ? "bg-white text-blue-600 shadow-lg shadow-blue-500/10"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab("service")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "service"
                  ? "bg-white text-blue-600 shadow-lg shadow-blue-500/10"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Services
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            <Button
              onClick={openAddModal}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 flex items-center gap-2 px-6 py-6 rounded-xl font-semibold transition-all"
            >
              <Plus className="w-5 h-5" />
              Add {activeTab === "portfolio" ? "Project" : "Service"}
            </Button>

            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[140px]"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[120px]"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title</option>
                <option value="category">Category</option>
              </select>

              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-16 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No items found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || filterCategory !== "all"
                ? "Try adjusting your filters"
                : `Start by adding your first ${activeTab === "portfolio" ? "project" : "service"}`}
            </p>
            {!searchTerm && filterCategory === "all" && (
              <Button onClick={openAddModal} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add {activeTab === "portfolio" ? "Project" : "Service"}
              </Button>
            )}
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredItems.map((item) => (
              <ItemCard key={item._id || item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl w-full rounded-3xl p-0 bg-white shadow-2xl border-0 max-h-[90vh] overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <DialogTitle className="text-2xl font-bold text-white">
              {editingItem ? "Edit" : "Add New"} {activeTab === "portfolio" ? "Project" : "Service"}
            </DialogTitle>
            <DialogDescription className="text-blue-100 mt-1">
              Fill out the form below to {editingItem ? "update" : "create"} your {activeTab === "portfolio" ? "project" : "service"}
            </DialogDescription>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-1 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2">Title *</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {formErrors.title && <span className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.title}</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2">Category *</label>
                <input
                  type="text"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {formErrors.category && <span className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.category}</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2">Description *</label>
                <textarea
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
                {formErrors.description && <span className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.description}</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {formErrors.image && <span className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.image}</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2">External Link</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={formData.link}
                  onChange={(e) => handleChange("link", e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {formErrors.link && <span className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.link}</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="React, Design, Development"
                  value={formData.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <span className="text-xs text-slate-500 mt-1.5">Separate tags with commas</span>
              </div>

              {activeTab === "service" && (
                <>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-slate-700 mb-2">Icon Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Palette"
                      value={formData.icon}
                      onChange={(e) => handleChange("icon", e.target.value)}
                      className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-slate-700 mb-2">Features</label>
                    <input
                      type="text"
                      placeholder="Feature 1, Feature 2, Feature 3"
                      value={formData.features}
                      onChange={(e) => handleChange("features", e.target.value)}
                      className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-slate-700 mb-2">Price</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white font-medium text-slate-700"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
              <Button
                onClick={() => setIsDialogOpen(false)}
                variant="outline"
                disabled={isLoading}
                className="flex-1 py-6 rounded-xl font-semibold border-slate-200 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 py-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    {editingItem ? "Update" : "Create"} {activeTab === "portfolio" ? "Project" : "Service"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;