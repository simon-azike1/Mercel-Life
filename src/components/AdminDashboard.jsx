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

  // -------------------- Portfolio & Services Context --------------------
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const { services, addService, updateService, deleteService } = useService();

  // -------------------- State --------------------
  const [activeTab, setActiveTab] = useState("portfolio"); // 'portfolio' or 'service'
  const [editingItem, setEditingItem] = useState(null);
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
  const items = activeTab === "portfolio" ? projects : services;

  const categories = useMemo(
    () => [...new Set(items.map((p) => p.category))].filter(Boolean),
    [items]
  );

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            return a.title.localeCompare(b.title);
          case "category":
            return a.category.localeCompare(b.category);
          default:
            return 0;
        }
      });
  }, [items, searchTerm, filterCategory, sortBy]);

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
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      tags: item.tags?.join(", ") || "",
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
      errors.link = "Please enter a valid URL";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const method = editingItem ? "PUT" : "POST";
      const url = editingItem
        ? `${import.meta.env.VITE_API_URL}/${activeTab}/${editingItem._id || editingItem.id}`
        : `${import.meta.env.VITE_API_URL}/${activeTab}`;

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
      const savedItem = result.success ? result.data : result;

      if (editingItem) {
        activeTab === "portfolio"
          ? updateProject(editingItem._id || editingItem.id, savedItem)
          : updateService(editingItem._id || editingItem.id, savedItem);
      } else {
        activeTab === "portfolio"
          ? addProject(savedItem)
          : addService(savedItem);
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (err) {
      console.error(`Error saving ${activeTab}:`, err);
      alert(`Failed to save ${activeTab}: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      activeTab === "portfolio"
        ? deleteProject(item._id || item.id)
        : deleteService(item._id || item.id);
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

  // -------------------- Card Component --------------------
  const ItemCard = ({ item }) => (
    <Card className="group bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-gray-200 rounded-xl overflow-hidden">
      <CardContent className="p-0">
        {item.image ? (
          <div className="relative h-52 bg-gray-100 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="absolute top-3 right-3">
              <Badge
                className={`${getStatusBadgeColor(
                  item.status || "active"
                )} text-xs font-medium px-2 py-1 shadow-sm`}
              >
                {(item.status || "active")
                  .charAt(0)
                  .toUpperCase() + (item.status || "active").slice(1)}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-52 bg-gray-100 text-gray-400">
            <ImageIcon className="w-12 h-12" />
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-gray-900 text-xl truncate flex-1 mr-3 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openEditModal(item)}
                className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(item)}
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
            {item.category}
          </Badge>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {item.description}
          </p>

          {item.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.slice(0, 2).map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs px-2 py-1 bg-gray-50 border-gray-200"
                >
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-1 bg-gray-50 border-gray-200"
                >
                  +{item.tags.length - 2} more
                </Badge>
              )}
            </div>
          )}

          {item.link && (
            <Button
              variant="link"
              size="sm"
              onClick={() => window.open(item.link, "_blank")}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto flex items-center gap-1.5 font-medium"
            >
              <ExternalLink className="w-3 h-3" /> Visit
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
        {/* Header with Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                Manage your {activeTab === "portfolio" ? "Portfolio" : "Services"}
              </p>

              {/* Tabs */}
              <div className="flex gap-4">
                <Button
                  variant={activeTab === "portfolio" ? "default" : "outline"}
                  onClick={() => setActiveTab("portfolio")}
                >
                  Portfolio
                </Button>
                <Button
                  variant={activeTab === "service" ? "default" : "outline"}
                  onClick={() => setActiveTab("service")}
                >
                  Services
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <Button
            onClick={openAddModal}
            variant="default"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add {activeTab === "portfolio" ? "Project" : "Service"}
          </Button>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full md:w-60"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
          </select>
        </div>

        {/* Grid of Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id || item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit" : "Add"}{" "}
              {activeTab === "portfolio" ? "Project" : "Service"}
            </DialogTitle>
            <DialogDescription>
              Fill out the form to {editingItem ? "update" : "add"} your{" "}
              {activeTab === "portfolio" ? "project" : "service"}.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 w-full"
            />
            {formErrors.title && (
              <span className="text-red-500 text-xs">{formErrors.title}</span>
            )}

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 w-full"
            />
            {formErrors.category && (
              <span className="text-red-500 text-xs">{formErrors.category}</span>
            )}

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 w-full"
              rows={4}
            />
            {formErrors.description && (
              <span className="text-red-500 text-xs">
                {formErrors.description}
              </span>
            )}

            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 w-full"
            />
            {formErrors.image && (
              <span className="text-red-500 text-xs">{formErrors.image}</span>
            )}

            <input
              type="text"
              placeholder="External Link"
              value={formData.link}
              onChange={(e) => handleChange("link", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 w-full"
            />
            {formErrors.link && (
              <span className="text-red-500 text-xs">{formErrors.link}</span>
            )}

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 w-full"
            />

            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 w-full"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="mt-2"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
