// PortfolioContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Change the URL depending on environment
        // Local: http://localhost:5000/projects
        // Render: https://mercel-life-1.onrender.com/projects
        const url = process.env.REACT_APP_BACKEND_URL || "https://mercel-life-1.onrender.com/projects";

        const res = await fetch(url);
        const data = await res.json();

        // Ensure we have an array
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Expected an array but got:", data);
          setProjects([]);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <PortfolioContext.Provider value={{ projects, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
