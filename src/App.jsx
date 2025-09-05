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




function App() {
  return (
    <div className="min-h-screen bg-gray-300">
      <Navigation />

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/skills" element={<SkillsSection />} />
        <Route path="/portfolio" element={<PortfolioSection />} />
        <Route path="/blog" element={<BlogSection />} />
        <Route path="/experience" element={<ExperienceSection />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
