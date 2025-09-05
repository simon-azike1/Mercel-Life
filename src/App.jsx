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
import FAQSection from './components/FAQSection'
import EducationSection from "./components/EducationSection";
import ProcessSection from "./components/ProcessSection";


function App() {
  return (
    <div className="min-h-screen bg-gray-300">
      <Navigation />

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/faqsection" element={<FAQSection />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/skills" element={<SkillsSection />} />
        <Route path="/portfolio" element={<PortfolioSection />} />
        <Route path="/blog" element={<BlogSection />} />
        <Route path="/experience" element={<ExperienceSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/education" element={<EducationSection/>}/>
        <Route path="/process" element={<ProcessSection/>}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
