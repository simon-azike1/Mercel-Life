import { useEffect, useState } from "react";
import { Award, Users, Briefcase, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import SkillsSection from "./SkillsSection";
import TestimonialsSection from "./TestimonialsSection";
import EducationSection from "./EducationSection";
import { useTheme } from './ThemeContext';

export default function AboutSection() {
  const { isDarkMode } = useTheme();
  
  const stats = [
    { number: 12, suffix: "+", label: "Projects", icon: Briefcase },
    { number: 2, suffix: "+", label: "Years Experience", icon: Trophy },
    { number: 5, suffix: "+", label: "Happy Clients", icon: Users },
    { number: 1, suffix: "", label: "Design Award", icon: Award },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  // Counter animation function
  const animateCounter = () => {
    if (hasAnimated) return;
    setHasAnimated(true);
    
    const duration = 2000;
    const intervalTime = 50;

    stats.forEach((stat, index) => {
      let start = 0;
      const increment = Math.ceil(stat.number / (duration / intervalTime));
      const counter = setInterval(() => {
        start += increment;
        if (start >= stat.number) {
          start = stat.number;
          clearInterval(counter);
        }
        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = start;
          return updated;
        });
      }, intervalTime);
    });
  };

  return (
    <div className={`
      min-h-screen pt-20 transition-colors duration-300
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-white via-gray-50 to-green-50'
      }
    `}>
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <h2 className={`
              text-4xl lg:text-6xl font-bold mb-6 transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              About <span className={`
                bg-gradient-to-r bg-clip-text text-transparent
                ${isDarkMode 
                  ? 'from-green-400 via-emerald-300 to-green-300' 
                  : 'from-green-600 via-green-500 to-emerald-600'
                }
              `}>Me</span>
            </h2>
            
            <motion.div 
              className={`
                h-1 mx-auto rounded-full transition-colors duration-300
                ${isDarkMode 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-green-500 to-black'
                }
              `}
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            />
            
            <p className={`
              text-xl max-w-3xl mx-auto mt-6 transition-colors duration-300
              ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
            `}>
              Passionate designer creating meaningful digital experiences that bridge creativity and functionality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* About Text - Enhanced with theme */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className={`
                  p-8 rounded-2xl transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl shadow-black/20' 
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-2xl shadow-gray-300/20'
                  }
                `}
                variants={itemVariants}
              >
                <h3 className={`
                  text-2xl font-bold mb-4 transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  Creative Designer & Problem Solver
                </h3>
                
                <div className="space-y-4">
                  <motion.p 
                    className={`
                      text-lg leading-relaxed transition-colors duration-300
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                    `}
                    variants={itemVariants}
                  >
                    I'm passionate about creating designs that bridge the gap between 
                    user needs and business goals. My approach combines creative thinking 
                    with data-driven insights to deliver impactful solutions.
                  </motion.p>
                  
                  <motion.p 
                    className={`
                      text-lg leading-relaxed transition-colors duration-300
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                    `}
                    variants={itemVariants}
                  >
                    Specializing in UI/UX design and brand identity, I help businesses 
                    tell their story through compelling visuals and intuitive user experiences.
                  </motion.p>
                </div>
              </motion.div>

              {/* Enhanced Stats Grid with Theme */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                variants={containerVariants}
                onViewportEnter={animateCounter}
                viewport={{ once: true, amount: 0.5 }}
              >
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className={`
                        group text-center p-6 rounded-2xl transition-all duration-300 transform hover:scale-105
                        ${isDarkMode 
                          ? 'bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 shadow-xl shadow-black/20' 
                          : 'bg-white/90 hover:bg-green-50/90 border border-gray-200/50 shadow-xl shadow-gray-300/20'
                        }
                      `}
                      variants={statsVariants}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: isDarkMode 
                          ? "0 20px 40px -10px rgba(0, 0, 0, 0.4)" 
                          : "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="flex justify-center mb-3"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className={`
                          p-3 rounded-xl transition-all duration-300
                          ${isDarkMode 
                            ? 'bg-green-400/20 text-green-400 group-hover:bg-green-400/30' 
                            : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                          }
                        `}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className={`
                          text-3xl font-bold mb-2 transition-colors duration-300
                          ${isDarkMode ? 'text-green-400' : 'text-green-600'}
                        `}
                        animate={{ scale: hasAnimated ? [1, 1.1, 1] : 1 }}
                        transition={{ delay: index * 0.2 + 1, duration: 0.3 }}
                      >
                        {counts[index]}{stat.suffix}
                      </motion.div>
                      
                      <div className={`
                        text-sm font-medium transition-colors duration-300
                        ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                      `}>
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Enhanced Image Section with Theme */}
            <motion.div
              className="relative"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/assets/img/grad_2.jpg"
                  alt="Adebisi Marcelina - Creative Designer"
                  className={`
                    w-full h-[500px] object-cover object-center transition-all duration-300
                    ${isDarkMode 
                      ? 'shadow-2xl shadow-black/50 border border-gray-700' 
                      : 'shadow-2xl shadow-gray-300/50 border border-gray-200'
                    }
                  `}
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className={`
                  absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300
                  ${isDarkMode 
                    ? 'bg-gradient-to-t from-black/40 via-transparent to-green-400/10' 
                    : 'bg-gradient-to-t from-black/20 via-transparent to-green-500/10'
                  }
                `} />
              </motion.div>

              {/* Enhanced Floating Award Badge */}
              <motion.div 
                className={`
                  absolute -top-6 -right-6 rounded-2xl p-6 text-white shadow-2xl transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-green-400/20' 
                    : 'bg-gradient-to-br from-green-500 to-black shadow-black/30'
                  }
                `}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "backOut" }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: isDarkMode 
                    ? "0 25px 50px -12px rgba(34, 197, 94, 0.4)" 
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
                }}
                viewport={{ once: true }}
              >
                <Award className="h-8 w-8 mb-2 mx-auto" />
                <div className="text-sm font-bold whitespace-nowrap text-center">
                  Design Award
                </div>
                <div className="text-xs opacity-90 text-center">Winner 2024</div>
              </motion.div>

              {/* Enhanced Decorative Elements */}
              <motion.div 
                className={`
                  absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-2xl transition-colors duration-300
                  ${isDarkMode ? 'bg-green-400/20' : 'bg-green-200/30'}
                `}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className={`
                  absolute -top-8 -left-8 w-24 h-24 rounded-full blur-2xl transition-colors duration-300
                  ${isDarkMode ? 'bg-emerald-500/20' : 'bg-black/10'}
                `}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sub-sections with Theme Wrappers */}
      <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <EducationSection />
      </div>
      
      <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <SkillsSection />
      </div>
      
      <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <TestimonialsSection />
      </div>
    </div>
  );
}
