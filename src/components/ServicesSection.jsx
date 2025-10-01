// ServicesSection.jsx
import React, { useEffect } from "react";
import { useService } from "./ServiceContext";
import * as LucideIcons from "lucide-react"; // import all icons

export default function ServicesSection() {
  const { services, setServices, loading, error } = useService();

  // Fetch services if not already loaded
  useEffect(() => {
    const fetchServices = async () => {
      if (services.length > 0) return; // prevent re-fetch
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/services`);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();

        // Normalize _id and features
        const normalized = data.map((s) => ({
          ...s,
          _id: s._id?.$oid || s._id || s._id.toString(),
          features: Array.isArray(s.features) ? s.features : [],
        }));

        setServices(normalized);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, [services, setServices]);

  if (loading) return <p className="text-center py-12">Loading services...</p>;
  if (error) return <p className="text-center py-12 text-red-600">{error}</p>;

  return (
    <section className="py-16 bg-gray-100" id="services">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = LucideIcons[service.icon] || LucideIcons.Palette;

            return (
              <div
                key={service._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{service.description}</p>
                {service.features && service.features.length > 0 && (
                  <ul className="list-disc list-inside text-gray-600 text-sm mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                )}
                {service.price && <p className="text-gray-900 font-medium">{service.price}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
