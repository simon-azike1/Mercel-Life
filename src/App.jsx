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

// Context Providers
import { PortfolioProvider } from "./components/PortfolioContext";
import { ServiceProvider } from "./components/ServiceContext";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { ThemeProvider } from "./components/ThemeContext"; // 👈 ADD THIS

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

// Loading Component for Theme
const ThemeLoader = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  React.useEffect(() => {
    // Mark that user has visited the site properly
    if (window.location.pathname === '/') {
      sessionStorage.setItem('visited_home', 'true');
    }
  }, []);

  return (
    <ThemeProvider> {/* 👈 WRAP EVERYTHING WITH THEME PROVIDER */}
      <AuthProvider>
        <PortfolioProvider>
          <ServiceProvider>
            {/* Updated with theme-aware background */}
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
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

                {/* Auth Routes - Theme Aware */}
                <Route 
                  path="/login" 
                  element={
                    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
                      <AdminLogin />
                    </div>
                  } 
                />
                <Route 
                  path="/forgot-password" 
                  element={
                    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
                      <ForgotPassword />
                    </div>
                  } 
                />
                <Route 
                  path="/reset-password/:token" 
                  element={
                    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
                      <ResetPassword />
                    </div>
                  } 
                />
                
                {/* Admin Route - Theme Aware */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
                        <AdminDashboard />
                      </div>
                    </ProtectedAdminRoute>
                  }
                />

                {/* 404 Route - Theme Aware */}
                <Route 
                  path="*" 
                  element={
                    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
                        <Navigate to="/" replace />
                      </div>
                    </div>
                  } 
                />
              </Routes>
              
              <Footer />
            </div>
          </ServiceProvider>
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
