import React, { useEffect } from "react";
import { useService } from "./ServiceContext";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const { services, setServices, loading, error } = useService();

  useEffect(() => {
    const fetchServices = async () => {
      if (services.length > 0) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/services`);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();

        const normalized = data.map((s) => ({
          ...s,
          _id: s._id?.$oid || s._id || s._id.toString(),
          features: Array.isArray(s.features) ? s.features : [],
        }));

        setServices(normalized);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServices();
  }, [services, setServices]);

  if (loading) return <p className="text-center py-12">Loading services...</p>;
  if (error) return <p className="text-center py-12 text-red-600">{error}</p>;

  return (
    <section className="py-16 bg-gray-100" id="services">
      <div className="max-w-6xl mx-auto px-4">
        {/* <h2 className="text-3xl font-bold text-center mb-12">My Services</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
