import { useEffect, useState } from "react";
import { Award, Users, Briefcase, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import SkillsSection from "./SkillsSection";
import TestimonialsSection from "./TestimonialsSection";
import EducationSection from "./EducationSection";

export default function AboutSection() {
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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-green-500 to-black mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* About Text - Reduced and Focused */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed"
              variants={itemVariants}
            >
              I'm passionate about creating designs that bridge the gap between 
              user needs and business goals. My approach combines creative thinking 
              with data-driven insights to deliver impactful solutions.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed"
              variants={itemVariants}
            >
              Specializing in UI/UX design and brand identity, I help businesses 
              tell their story through compelling visuals and intuitive user experiences.
            </motion.p>

            {/* Enhanced Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-6 pt-8"
              variants={containerVariants}
              onViewportEnter={animateCounter}
              viewport={{ once: true, amount: 0.5 }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors duration-300"
                    variants={statsVariants}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="flex justify-center mb-2"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </motion.div>
                    <motion.div 
                      className="text-3xl font-bold text-green-600 mb-1"
                      animate={{ scale: hasAnimated ? [1, 1.1, 1] : 1 }}
                      transition={{ delay: index * 0.2 + 1, duration: 0.3 }}
                    >
                      {counts[index]}{stat.suffix}
                    </motion.div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Enhanced Image Section */}
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
                alt="Adebisi Marcelina"
                className="w-full h-[500px] object-cover object-center shadow-2xl"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Floating Award Badge */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-gradient-to-br from-green-500 to-black rounded-2xl p-4 text-white shadow-2xl"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "backOut" }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
              }}
              viewport={{ once: true }}
            >
              <Award className="h-6 w-6 mb-2" />
              <div className="text-sm font-semibold whitespace-nowrap">
                Design Award
              </div>
              <div className="text-xs opacity-90">Winner 2024</div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div 
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -top-8 -left-8 w-24 h-24 bg-black opacity-10 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1]
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

      {/* Sub-sections */}
      <EducationSection />
      <SkillsSection />
      <TestimonialsSection />
    </section>
  );
}
