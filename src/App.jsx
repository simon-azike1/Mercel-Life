import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import SkillsSection from "./components/SkillsSection";
import PortfolioSection from "./components/PortfolioSection";
import BlogSection from "./components/BlogSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Admin & Auth
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLoginForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import { PortfolioProvider } from "./components/PortfolioContext";
import { ServiceProvider } from "./components/ServiceContext";
import { AuthProvider, useAuth } from "./components/AuthContext";

// Simple Route Protection
const ProtectedRoute = ({ children, routePath }) => {
  React.useEffect(() => {
    // Only in production
    if (process.env.NODE_ENV === 'production') {
      // Check if user came directly to this URL
      const isDirectAccess = !sessionStorage.getItem('visited_home') && routePath !== '/';
      
      if (isDirectAccess) {
        window.location.replace('/');
        return;
      }
    }
  }, [routePath]);

  return children;
};

// Protect Admin Dashboard
const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  React.useEffect(() => {
    // Mark that user has visited the site properly
    if (window.location.pathname === '/') {
      sessionStorage.setItem('visited_home', 'true');
    }
  }, []);

  return (
    <AuthProvider>
      <PortfolioProvider>
        <ServiceProvider>
          <div className="min-h-screen bg-gray-300">
            <Navigation />
            <ScrollToTop />
            <Routes>
              {/* Home Route */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute routePath="/">
                    <HeroSection />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/about" 
                element={
                  <ProtectedRoute routePath="/about">
                    <AboutSection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/services" 
                element={
                  <ProtectedRoute routePath="/services">
                    <ServicesSection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/skills" 
                element={
                  <ProtectedRoute routePath="/skills">
                    <SkillsSection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/portfolio" 
                element={
                  <ProtectedRoute routePath="/portfolio">
                    <PortfolioSection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/blog" 
                element={
                  <ProtectedRoute routePath="/blog">
                    <BlogSection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/experience" 
                element={
                  <ProtectedRoute routePath="/experience">
                    <ExperienceSection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/contact" 
                element={
                  <ProtectedRoute routePath="/contact">
                    <ContactSection />
                  </ProtectedRoute>
                } 
              />

              {/* Auth Routes */}
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              
              {/* Admin Route */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </ServiceProvider>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
