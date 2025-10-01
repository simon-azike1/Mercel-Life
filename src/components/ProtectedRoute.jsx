// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Check if token exists in localStorage or sessionStorage
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  // If no user or token, redirect to login
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
