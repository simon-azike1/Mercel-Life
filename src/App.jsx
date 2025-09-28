import React from "react";
import { Routes, Route } from "react-router-dom";

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

// Admin and Auth Components
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLoginForm";
import ForgotPassword from "./components/ForgotPassword"; // optional component to request reset
import ResetPassword from "./components/ResetPassword";

// ✅ Import the context
import { PortfolioProvider } from "./components/PortfolioContext";

function App() {
  return (
    <PortfolioProvider>
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

          {/* Admin Routes */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Password Reset Flow */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* request reset email */}
          <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* reset with token */}
        </Routes>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}

export default App;
