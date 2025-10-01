"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"

const API_BASE_URL = "http://localhost:5000/api"

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Filters and search
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    icon: "",
    features: "",
    status: "active",
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/services`)
      if (!res.ok) throw new Error("Failed to fetch services")
      const data = await res.json()
      setServices(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Filtered services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || service.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // CRUD handlers
  const openAddServiceModal = () => {
    setEditingService(null)
    setFormData({
      title: "",
      description: "",
      price: "",
      icon: "",
      features: "",
      status: "active",
    })
    setIsDialogOpen(true)
  }

  const openEditServiceModal = (service) => {
    setEditingService(service)
    setFormData({
      title: service.title || "",
      description: service.description || "",
      price: service.price || "",
      icon: service.icon || "",
      features: Array.isArray(service.features) ? service.features.join(", ") : "",
      status: service.status || "active",
    })
    setIsDialogOpen(true)
  }

  const handleSaveService = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const serviceData = {
        ...formData,
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      }

      const url = editingService
        ? `${API_BASE_URL}/services/${editingService._id}`
        : `${API_BASE_URL}/services`

      const method = editingService ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      })

      if (!res.ok) throw new Error("Failed to save service")

      setIsDialogOpen(false)
      fetchServices()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete service")
      fetchServices()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Services</h2>
          <button
            onClick={openAddServiceModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div key={service._id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {service.icon && <span className="text-2xl">{service.icon}</span>}
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      service.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{service.description}</p>
                {service.features && service.features.length > 0 && (
                  <ul className="list-disc list-inside mb-4 text-sm text-gray-600">
                    {service.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditServiceModal(service)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Service Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {editingService ? "Edit Service" : "Add Service"}
              </h3>
              <form onSubmit={handleSaveService} className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Icon (optional)"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Features (comma separated)"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
