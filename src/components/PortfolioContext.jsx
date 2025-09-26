// PortfolioContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`${apiUrl}/projects`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        
        // Handle both new format (with success flag) and old format (direct array)
        const projectsData = data.success ? data : data;
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setProjects([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    
    if (apiUrl) {
      fetchProjects();
    }
  }, [apiUrl]);

  // Add new project
  const addProject = async (projectData) => {
    try {
      const response = await fetch(`${apiUrl}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        const newProject = result.data;
        setProjects(prev => [newProject, ...prev]); // Add to beginning
        return newProject;
      } else {
        throw new Error(result.message || 'Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

  // Update existing project
  const updateProject = async (projectId, updatedData) => {
    try {
      const response = await fetch(`${apiUrl}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        const updatedProject = result.data;
        setProjects(prev => 
          prev.map(project => 
            (project.id === projectId || project._id === projectId) 
              ? updatedProject 
              : project
          )
        );
        return updatedProject;
      } else {
        throw new Error(result.message || 'Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(`${apiUrl}/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setProjects(prev => 
          prev.filter(project => 
            project.id !== projectId && project._id !== projectId
          )
        );
        return result;
      } else {
        throw new Error(result.message || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  // Update project status only
  const updateProjectStatus = async (projectId, status) => {
    try {
      const response = await fetch(`${apiUrl}/projects/${projectId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        const updatedProject = result.data;
        setProjects(prev => 
          prev.map(project => 
            (project.id === projectId || project._id === projectId) 
              ? updatedProject 
              : project
          )
        );
        return updatedProject;
      } else {
        throw new Error(result.message || 'Failed to update project status');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      throw error;
    }
  };

  // Get single project by ID
  const getProject = (projectId) => {
    return projects.find(project => 
      project.id === projectId || project._id === projectId
    );
  };

  // Refresh projects (useful for manual refresh)
  const refreshProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`${apiUrl}/projects`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      const projectsData = data.success ? data : data;
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      
    } catch (err) {
      console.error("Error refreshing projects:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects by status
  const getProjectsByStatus = (status) => {
    return projects.filter(project => project.status === status);
  };

  // Get projects by category
  const getProjectsByCategory = (category) => {
    return projects.filter(project => 
      project.category?.toLowerCase() === category.toLowerCase()
    );
  };

  // Search projects
  const searchProjects = (query) => {
    const searchTerm = query.toLowerCase();
    return projects.filter(project =>
      project.title?.toLowerCase().includes(searchTerm) ||
      project.description?.toLowerCase().includes(searchTerm) ||
      project.category?.toLowerCase().includes(searchTerm) ||
      project.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  };

  const contextValue = {
    // State
    projects,
    loading,
    error,
    
    // CRUD Operations
    addProject,
    updateProject,
    deleteProject,
    updateProjectStatus,
    
    // Utility functions
    getProject,
    refreshProjects,
    getProjectsByStatus,
    getProjectsByCategory,
    searchProjects,
    
    // Computed values
    activeProjects: projects.filter(p => p.status === 'active' || !p.status),
    draftProjects: projects.filter(p => p.status === 'draft'),
    archivedProjects: projects.filter(p => p.status === 'archived'),
    categories: [...new Set(projects.map(p => p.category))].filter(Boolean),
    totalProjects: projects.length,
  };

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};