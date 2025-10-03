import React, { useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Download, Github, Linkedin, Facebook, 
  Mail, Instagram, Figma, PenTool, Image, Monitor 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillsSection from "./SkillsSection";
import PortfolioSection from "./PortfolioSection";
import FAQSection from "./FAQSection";
import TestimonialsSection from "./TestimonialsSection";
import TypingName from "./TypingName";
import { Link } from "react-router-dom";

// const tools = [
//   { name: "Figma", icon: Figma },
//   { name: "Adobe XD", icon: PenTool },
//   { name: "Sketch", icon: Image },
//   { name: "Canva", icon: PenTool },
//   { name: "PixelApp", icon: Image },
//   { name: "Web Design", icon: Monitor },
// ];

export default function HeroSection() {
  const portfolioRef = useRef(null);

  // Smooth scroll to Portfolio section
  const scrollToPortfolio = () => {
    portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.3 }}
        viewport={{ once: true }}
      >
        <section
          id="home"
          className="pt-16 min-h-[80vh] flex items-center bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* Left Side - Image with face and partial body visible */}
              <div className="relative h-[480px] max-h-[98vh] lg:h-[560px]">
                <img
                  src="/assets/img/bg_27.jpg"
                  alt="Hero"
                  className="rounded-2xl shadow-lg w-full h-full object-cover object-[center_top_30%]"
                  style={{ objectPosition: "center 20%" }}
                />
                <div className="absolute -top-4 -right-4 w-60 h-60 bg-gradient-to-br from-green-400 to-black rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-60 h-60 bg-gradient-to-br from-black to-green-400 rounded-full opacity-20 blur-3xl"></div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-4 bg-white p-5 rounded-xl relative">
                {/* Circular element with greeting */}
                <div className="bg-green-100 text-green-700 rounded-full px-5 py-1.5 inline-block mb-1 text-sm">
                  Hi 🙋‍♀️
                </div>
                
                {/* Name */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  I'm <TypingName name="Adebisi Marcelina" />
                </h1>
                
                {/* Simplified Professional title */}
                <p className="text-lg text-gray-700 font-medium">
                  Graphic Designer & UI/UX Designer
                </p>
                
                {/* Concise Description */}
                <p className="text-base text-gray-600">
                  I create captivating visuals and intuitive user interfaces 
                  that help businesses connect with their audience and achieve 
                  meaningful results.
                </p>

                {/* Compact Action Row: Social + Buttons */}
                <div className="flex flex-wrap items-center justify-between pt-2">
                  {/* Social Media Icons with your actual links */}
                  <div className="flex gap-3 my-2">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61562343710215" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/marcelina-adebisi-0393b037a/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href="https://www.instagram.com/marcelinaadebisi?igsh=YzljYTk1ODg3Zg==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                    <a 
                      href="mailto:mercelinaadebisi@gmail.com" 
                      className="text-gray-600 hover:text-green-600 transition-colors"
                      aria-label="Email"
                    >
                      <Mail size={18} />
                    </a>
                  </div>

                  {/* Compact Buttons */}
                  <div className="flex gap-3 my-2">
                    <Button
                      onClick={scrollToPortfolio}
                      className="bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-black text-white px-4 py-1.5 text-sm hover:cursor-pointer rounded-md"
                    >
                      View Work
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>

                    <a href="/assets/Resume.pdf" download="Resume.pdf">
                      <Button
                        variant="outline"
                        className="border-black text-black hover:bg-gray-100 px-3 py-1.5 text-sm bg-transparent hover:cursor-pointer rounded-md"
                      >
                        <Download className="mr-1 h-3.5 w-3.5" /> Resume
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Skills Section */}
      {/* <SkillsSection /> */}

      {/* Portfolio Section (3 projects) */}
      <PortfolioSection ref={portfolioRef} limit={3} />

      {/* Tools I Use Section */}
      {/* <section id="tools" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
            Tools
          </h2>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  className="group flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 hover:scale-105"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Icon className="h-12 w-12 text-green-500 mb-2 transition-colors duration-300 group-hover:text-green-600" />
                  <span className="text-gray-800 font-semibold">{tool.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section> */}

      <TestimonialsSection />
      {/* <FAQSection /> */}
    </>
  );
}
