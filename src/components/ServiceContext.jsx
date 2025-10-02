import React, { createContext, useContext, useState, useEffect } from "react";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${apiUrl}/api/services`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        // Handle both new format (with success flag) and old format (direct array)
        const servicesData = data.success ? data.data || [] : data;
        setServices(Array.isArray(servicesData) ? servicesData : []);

      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err.message);
        setServices([]); // fallback empty
      } finally {
        setLoading(false);
      }
    };

    if (apiUrl) {
      fetchServices();
    }
  }, [apiUrl]);

  // Add new service
  const addService = async (serviceData) => {
    try {
      console.log("Adding service to:", `${apiUrl}/api/services`);
      console.log("Service data:", serviceData);

      const response = await fetch(`${apiUrl}/api/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Add service result:", result);
      console.log("Result type:", typeof result);
      console.log("Result keys:", Object.keys(result));

      // Handle multiple response formats
      let newService;
      if (result.success !== undefined && result.data) {
        // Format: { success: true, data: {...} }
        newService = result.data;
        console.log("Using result.data (success format)");
      } else if (result._id || result.id) {
        // Format: Direct service object
        newService = result;
        console.log("Using result directly (has _id or id)");
      } else if (result.service) {
        // Format: { service: {...} }
        newService = result.service;
        console.log("Using result.service");
      } else {
        console.error("Unexpected response format:", result);
        // Don't throw - try to use result as-is
        newService = result;
        console.warn("Using result as-is despite unexpected format");
      }

      console.log("New service to add to state:", newService);
      
      setServices((prev) => {
        const updated = [newService, ...prev];
        console.log("Updated services count:", updated.length);
        return updated;
      });
      
      return newService;
    } catch (error) {
      console.error("Error adding service (caught):", error);
      console.error("Error stack:", error.stack);
      throw error;
    }
  };

  // Update existing service
  const updateService = async (serviceId, updatedData) => {
    try {
      console.log("Updating service:", serviceId);
      console.log("Updated data:", updatedData);

      const response = await fetch(`${apiUrl}/api/services/${serviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      console.log("Update response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Update service result:", result);

      // Handle multiple response formats
      let updatedService;
      if (result.success !== undefined && result.data) {
        updatedService = result.data;
      } else if (result._id || result.id) {
        updatedService = result;
      } else {
        updatedService = result;
      }

      setServices((prev) =>
        prev.map((service) =>
          service.id === serviceId || service._id === serviceId
            ? updatedService
            : service
        )
      );
      return updatedService;
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  };

  // Delete service
  const deleteService = async (serviceId) => {
    try {
      console.log("Deleting service:", serviceId);

      const response = await fetch(`${apiUrl}/api/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Delete error response:", errorText);
        throw new Error(`Failed to delete: ${response.status}`);
      }

      // Remove from state immediately
      setServices((prev) =>
        prev.filter(
          (service) =>
            service.id !== serviceId && service._id !== serviceId
        )
      );
      
      console.log("Service deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  };

  // Update service status only
  const updateServiceStatus = async (serviceId, status) => {
    try {
      const response = await fetch(`${apiUrl}/api/services/${serviceId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();

      if (result.success) {
        const updatedService = result.data;
        setServices((prev) =>
          prev.map((service) =>
            service.id === serviceId || service._id === serviceId
              ? updatedService
              : service
          )
        );
        return updatedService;
      } else {
        throw new Error(result.message || "Failed to update service status");
      }
    } catch (error) {
      console.error("Error updating service status:", error);
      throw error;
    }
  };

  // Get single service by ID
  const getService = (serviceId) => {
    return services.find(
      (service) => service.id === serviceId || service._id === serviceId
    );
  };

  // Refresh services
  const refreshServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${apiUrl}/api/services`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const servicesData = data.success ? data.data || [] : data;
      setServices(Array.isArray(servicesData) ? servicesData : []);
    } catch (err) {
      console.error("Error refreshing services:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter services by status
  const getServicesByStatus = (status) => {
    return services.filter((service) => service.status === status);
  };

  // Get services by category
  const getServicesByCategory = (category) => {
    return services.filter(
      (service) => service.category?.toLowerCase() === category.toLowerCase()
    );
  };

  // Search services
  const searchServices = (query) => {
    const searchTerm = query.toLowerCase();
    return services.filter(
      (service) =>
        service.title?.toLowerCase().includes(searchTerm) ||
        service.description?.toLowerCase().includes(searchTerm) ||
        service.category?.toLowerCase().includes(searchTerm) ||
        service.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        service.features?.some((feature) => feature.toLowerCase().includes(searchTerm))
    );
  };

  const contextValue = {
    // State
    services,
    loading,
    error,

    // CRUD Operations
    addService,
    updateService,
    deleteService,
    updateServiceStatus,

    // Utility functions
    getService,
    refreshServices,
    getServicesByStatus,
    getServicesByCategory,
    searchServices,

    // Computed values
    activeServices: services.filter(
      (s) => s.status === "active" || !s.status
    ),
    draftServices: services.filter((s) => s.status === "draft"),
    archivedServices: services.filter((s) => s.status === "archived"),
    categories: [...new Set(services.map((s) => s.category))].filter(Boolean),
    totalServices: services.length,
  };

  return (
    <ServiceContext.Provider value={contextValue}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }
  return context;
};