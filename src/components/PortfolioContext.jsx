// PortfolioContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

 const apiUrl = process.env.REACT_APP_API_URL;

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${apiUrl}/projects`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchProjects();
}, [apiUrl]);


  return (
    <PortfolioContext.Provider value={{ projects, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
