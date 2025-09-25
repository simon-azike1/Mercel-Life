import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Eye } from "lucide-react";
import { Figma, PenTool, Image, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import SkillsSection from "./SkillsSection";
import PortfolioSection from "./PortfolioSection";
import FAQSection from "./FAQSection";
import TestimonialsSection from "./TestimonialsSection";
import { Link } from "react-router-dom";

const tools = [
  { name: "Figma", icon: Figma },
  { name: "Adobe XD", icon: PenTool },
  { name: "Sketch", icon: Image },
  { name: "Canva", icon: PenTool },
  { name: "PixelApp", icon: Image },
  { name: "Web Design", icon: Monitor },
];

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
          className="pt-16 min-h-screen flex items-center bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side */}
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-green-600 to-black bg-clip-text text-transparent">
                    Marcelina Kehinde
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 font-medium">
                  Graphic Designer, UI/UX Designer & Writer Crafting visually
                  stunning digital experiences and compelling stories
                </p>
                <p className="text-lg text-gray-600 max-w-lg">
                  I create captivating graphics, design intuitive user
                  interfaces, and produce content that resonates. Whether
                  it’s shaping a brand’s visual identity or telling its story,
                  I help businesses engage their audience and achieve
                  meaningful results. Let’s build something extraordinary
                  together.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-center">
                  <Button
                    onClick={scrollToPortfolio}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-black text-white px-8 py-3 text-lg hover:cursor-pointer"
                  >
                    View Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <a
                    href="/assets/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto hover:cursor-pointer border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg bg-transparent"
                    >
                      <Eye className="mr-2 h-7 w-8" />
                      View
                    </Button>
                  </a>

                  <a
                    href="/assets/Resume.pdf"
                    download="Resume.pdf"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-black text-black hover:bg-gray-100 px-8 py-3 text-lg bg-transparent hover:cursor-pointer"
                    >
                      <Download className="mr-2 h-5 w-5" /> Resume
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative">
                <img
                  src="/assets/img/bg_24.png"
                  alt="Hero"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-green-400 to-black rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-black to-green-400 rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Skills Section */}
      <SkillsSection />

      {/* Portfolio Section (3 projects) */}
      <PortfolioSection ref={portfolioRef} limit={3} />

     

      {/* Tools I Use Section */}
      <section id="tools" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
            Tools I Use
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
      </section>

      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
