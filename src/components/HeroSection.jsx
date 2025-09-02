import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Figma, Code, Monitor, PenTool, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillsSection from "./SkillsSection";

const tools = [
  { name: "Figma", icon: Figma },
  { name: "Adobe XD", icon: PenTool },
  { name: "Sketch", icon: Image },
  { name: "Photoshop", icon: Image },
  { name: "Illustrator", icon: Image },
  { name: "VS Code", icon: Code },
];

export default function HeroSection() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-purple-50 via-white to-pink-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Mercelina Kehinde
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 font-medium">
                  UX/UI Designer crafting digital experiences that users love
                </p>
                <p className="text-lg text-gray-500 max-w-lg">
                  I specialize in creating intuitive, user-centered designs that solve real problems and drive business
                  results. Let's build something amazing together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollToSection("portfolio")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg bg-transparent"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/assets/img/bg_24.jpg"
                  alt="Hero"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

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
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Icon className="h-12 w-12 text-purple-600 mb-2" />
                  <span className="text-gray-800 font-semibold">{tool.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
