// ServiceContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ServiceContext = createContext();
export const useService = () => useContext(ServiceContext);

const API_BASE_URL = "http://localhost:5000/api"; // <-- backend base URL

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch services from backend
  const fetchServices = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      if (!res.ok) throw new Error("Failed to fetch services");

      const data = await res.json();

      const normalized = data.map((s) => ({
        ...s,
        _id: s._id?.$oid || s._id || s.id,
        features: Array.isArray(s.features) ? s.features : [],
      }));

      setServices(normalized);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add service
  const addService = async (service) => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      if (!res.ok) throw new Error("Failed to add service");
      const data = await res.json();
      setServices((prev) => [data, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update service
  const updateService = async (id, service) => {
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      if (!res.ok) throw new Error("Failed to update service");
      const data = await res.json();
      setServices((prev) => prev.map((s) => (s._id === id ? data : s)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete service
  const deleteService = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const value = {
    services,
    loading,
    error,
    fetchServices,
    addService,
    updateService,
    deleteService,
  };

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
};
