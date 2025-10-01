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
import { ServiceProvider } from "./components/ServiceContext"; // <-- added
import { AuthProvider, useAuth } from "./components/AuthContext";

// Protect Admin Dashboard
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <ServiceProvider>
          <div className="min-h-screen bg-gray-300">
            <Navigation />
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HeroSection />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/services" element={<ServicesSection />} />
              <Route path="/skills" element={<SkillsSection />} />
              <Route path="/portfolio" element={<PortfolioSection />} />
              <Route path="/blog" element={<BlogSection />} />
              <Route path="/experience" element={<ExperienceSection />} />
              <Route path="/contact" element={<ContactSection />} />

              {/* Auth & Admin */}
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
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
