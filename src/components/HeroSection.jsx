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
import { useTheme } from './ThemeContext';

export default function HeroSection() {
  const portfolioRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();

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
          className={`
            pt-16 min-h-[80vh] flex items-center transition-all duration-300
            ${isDarkMode 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
              : 'bg-gradient-to-br from-white via-gray-50 to-green-50'
            }
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* Left Side - Image with enhanced theme support */}
              <div className="relative h-[480px] max-h-[98vh] lg:h-[560px]">
                <div className={`
                  absolute inset-0 rounded-2xl transition-all duration-300
                  ${isDarkMode ? 'bg-gray-800/20' : 'bg-white/20'}
                `}></div>
                
                <img
                  src="/assets/img/bg_27.jpg"
                  alt="Adebisi Marcelina - Graphic Designer & UI/UX Designer"
                  className={`
                    rounded-2xl w-full h-full object-cover object-[center_top_30%] 
                    transition-all duration-300 relative z-10
                    ${isDarkMode 
                      ? 'shadow-2xl shadow-black/50 border border-gray-700' 
                      : 'shadow-2xl shadow-gray-300/50 border border-gray-200'
                    }
                  `}
                  style={{ objectPosition: "center 20%" }}
                />
                
                {/* Enhanced gradient overlays */}
                <div className={`
                  absolute -top-4 -right-4 w-60 h-60 rounded-full blur-3xl transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-gradient-to-br from-green-400/30 to-emerald-500/20' 
                    : 'bg-gradient-to-br from-green-400/20 to-black/10'
                  }
                `}></div>
                
                <div className={`
                  absolute -bottom-4 -left-4 w-60 h-60 rounded-full blur-3xl transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-gradient-to-br from-emerald-500/20 to-green-400/30' 
                    : 'bg-gradient-to-br from-black/10 to-green-400/20'
                  }
                `}></div>
              </div>

              {/* Right Side - Content with full theme support */}
              <div className={`
                space-y-4 p-6 lg:p-8 rounded-2xl relative transition-all duration-300
                ${isDarkMode 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl shadow-black/20' 
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-2xl shadow-gray-300/20'
                }
              `}>
                
                {/* Greeting badge */}
                <div className={`
                  rounded-full px-5 py-2 inline-block mb-2 text-sm font-medium transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-green-400/20 text-green-300 border border-green-400/30' 
                    : 'bg-green-100 text-green-700 border border-green-200'
                  }
                `}>
                  Hi 🙋‍♀️
                </div>
                
                {/* Name with theme-aware styling */}
                <h1 className={`
                  text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  I'm <TypingName name="Adebisi Marcelina" />
                </h1>
                
                {/* Professional title with gradient */}
                <p className={`
                  text-lg lg:text-xl font-semibold bg-gradient-to-r bg-clip-text text-transparent
                  ${isDarkMode 
                    ? 'from-green-400 via-emerald-300 to-green-300' 
                    : 'from-green-600 via-green-500 to-emerald-600'
                  }
                `}>
                  Graphic Designer & UI/UX Designer
                </p>
                
                {/* Description */}
                <p className={`
                  text-base lg:text-lg leading-relaxed transition-colors duration-300
                  ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  I create captivating visuals and intuitive user interfaces 
                  that help businesses connect with their audience and achieve 
                  meaningful results.
                </p>

                {/* Action Row: Social + Buttons */}
                <div className="flex flex-wrap items-center justify-between pt-4 gap-4">
                  
                  {/* Social Media Icons */}
                  <div className="flex gap-4">
                    {[
                      { 
                        href: "https://www.facebook.com/profile.php?id=61562343710215", 
                        icon: Facebook, 
                        label: "Facebook",
                        color: "hover:text-blue-500"
                      },
                      { 
                        href: "https://www.linkedin.com/in/marcelina-adebisi-0393b037a/", 
                        icon: Linkedin, 
                        label: "LinkedIn",
                        color: "hover:text-blue-600"
                      },
                      { 
                        href: "https://www.instagram.com/marcelinaadebisi?igsh=YzljYTk1ODg3Zg==", 
                        icon: Instagram, 
                        label: "Instagram",
                        color: "hover:text-pink-500"
                      },
                      { 
                        href: "mailto:mercelinaadebisi@gmail.com", 
                        icon: Mail, 
                        label: "Email",
                        color: "hover:text-green-500"
                      }
                    ].map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a 
                          key={index}
                          href={social.href} 
                          target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className={`
                            p-2 rounded-lg transition-all duration-300 transform hover:scale-110
                            ${isDarkMode 
                              ? 'text-gray-400 hover:bg-gray-700/50' 
                              : 'text-gray-600 hover:bg-gray-100'
                            } ${social.color}
                          `}
                          aria-label={social.label}
                        >
                          <Icon size={20} />
                        </a>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={scrollToPortfolio}
                      className={`
                        px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/20
                        ${isDarkMode
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-gray-900'
                          : 'bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-gray-900 text-white'
                        } shadow-lg hover:shadow-xl
                      `}
                    >
                      View Work
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <a href="/assets/Resume.pdf" download="Resume.pdf">
                      <Button
                        className={`
                          px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/20
                          ${isDarkMode
                            ? 'bg-gray-700/50 text-white border border-gray-600 hover:bg-gray-600/50 hover:border-gray-500'
                            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          } shadow-lg hover:shadow-xl
                        `}
                      >
                        <Download className="mr-2 h-4 w-4" /> 
                        Resume
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className={`
                  absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl transition-all duration-300
                  ${isDarkMode ? 'bg-green-400/10' : 'bg-green-500/10'}
                `}></div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Portfolio Section */}
      <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <PortfolioSection ref={portfolioRef} limit={3} isDarkMode={isDarkMode} />
      </div>

      {/* Testimonials Section */}
      <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <TestimonialsSection />
      </div>
    </>
  );
}
