import React, { useState } from "react";
import { Calendar, TrendingUp, MapPin, Users, Award, ChevronRight, Briefcase, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExperienceSection({ isDarkMode = false }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const experiences = [
    {
      year: "2023 - Present",
      title: "Senior UX Designer",
      company: "TechFlow Inc.",
      location: "Remote",
      description: "Leading design initiatives for multiple product lines, mentoring junior designers, and establishing comprehensive design systems that scale across the organization.",
      achievements: [
        "Increased user engagement by 40%",
        "Led team of 5 designers",
        "Launched 3 major products",
        "Reduced design debt by 60%"
      ],
      skills: ["Design Systems", "Team Leadership", "Product Strategy", "User Research"],
      projects: ["E-commerce Platform", "Mobile App Redesign", "Design System 2.0"],
      teamSize: 5,
      impact: "40% engagement increase",
      status: "current"
    },
    {
      year: "2021 - 2023",
      title: "UX Designer",
      company: "Digital Solutions Co.",
      location: "New York, NY",
      description: "Designed comprehensive user experiences for web and mobile applications, conducted extensive user research and usability testing to drive data-informed design decisions.",
      achievements: [
        "Improved conversion rate by 25%",
        "Conducted 50+ user interviews",
        "Redesigned core platform",
        "Implemented design thinking workshops"
      ],
      skills: ["User Research", "Prototyping", "A/B Testing", "Wireframing"],
      projects: ["SaaS Dashboard", "Mobile Banking App", "Customer Portal"],
      teamSize: 3,
      impact: "25% conversion boost",
      status: "completed"
    },
    {
      year: "2019 - 2021",
      title: "Junior UI Designer",
      company: "Creative Studio",
      location: "San Francisco, CA",
      description: "Created compelling visual designs for diverse clients, developed cohesive brand identities and impactful marketing materials that drove business growth.",
      achievements: [
        "Designed for 20+ clients",
        "Won regional design award",
        "Increased client satisfaction by 30%",
        "Built reusable component library"
      ],
      skills: ["Visual Design", "Branding", "Illustration", "Print Design"],
      projects: ["Brand Identity System", "Marketing Campaigns", "Website Redesigns"],
      teamSize: 2,
      impact: "30% satisfaction increase",
      status: "completed"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="experience" 
      className={`py-24 relative overflow-hidden transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
          : 'bg-gradient-to-br from-gray-100 via-gray-50 to-white'
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl transition-colors duration-500 ${
          isDarkMode ? 'bg-green-400' : 'bg-green-500'
        }`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl transition-colors duration-500 ${
          isDarkMode ? 'bg-blue-400' : 'bg-black'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className={`p-4 rounded-2xl mr-4 shadow-lg transition-colors duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                : 'bg-gradient-to-r from-green-500 to-black'
            }`}>
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h2 className={`text-5xl lg:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
              isDarkMode 
                ? 'from-white via-green-400 to-blue-400' 
                : 'from-black via-green-600 to-black'
            }`}>
              Professional Experience
            </h2>
          </div>
          
          <motion.div 
            className={`w-32 h-1 mx-auto mb-8 rounded-full transition-colors duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-400 to-blue-400' 
                : 'bg-gradient-to-r from-green-500 to-black'
            }`}
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
          
          <p className={`text-xl max-w-4xl mx-auto leading-relaxed transition-colors duration-500 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            My professional journey showcasing growth, impact, and the meaningful contributions 
            I've made across different organizations and projects.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full shadow-lg transition-colors duration-500 ${
            isDarkMode 
              ? 'bg-gradient-to-b from-green-400 to-blue-400' 
              : 'bg-gradient-to-b from-green-500 to-black'
          }`}></div>

          <motion.div 
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm ${
                      isDarkMode 
                        ? 'bg-gray-800/90 border border-gray-700/50' 
                        : 'bg-white/90 border border-gray-200/50'
                    }`}>
                      {/* Card Header */}
                      <div className={`p-6 text-white relative overflow-hidden transition-colors duration-500 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                          : 'bg-gradient-to-r from-green-500 to-black'
                      }`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16" />
                        
                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <div>
                            <div className="flex items-center mb-2">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                                {exp.year}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                            <p className="text-green-100 font-semibold text-lg">{exp.company}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full border font-medium transition-colors duration-300 ${
                            exp.status === 'current' 
                              ? 'bg-green-900/50 text-green-300 border-green-700' 
                              : 'bg-gray-800/50 text-gray-300 border-gray-600'
                          }`}>
                            {exp.status === 'current' ? 'Current' : 'Completed'}
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-green-100 relative z-10">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {exp.location}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            Team of {exp.teamSize}
                          </span>
                          <span className="flex items-center">
                            <Target className="h-3 w-3 mr-1" />
                            {exp.impact}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <p className={`mb-6 leading-relaxed transition-colors duration-500 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {exp.description}
                        </p>

                        {/* Key Achievements */}
                        <div className="mb-6">
                          <h4 className={`font-bold mb-3 flex items-center transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-black'
                          }`}>
                            <Award className={`h-4 w-4 mr-2 transition-colors duration-500 ${
                              isDarkMode ? 'text-green-400' : 'text-green-600'
                            }`} />
                            Key Achievements
                          </h4>
                          <div className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <div
                                key={i}
                                className={`flex items-start text-sm transition-colors duration-500 ${
                                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}
                              >
                                <TrendingUp className={`h-4 w-4 mr-3 flex-shrink-0 mt-0.5 transition-colors duration-500 ${
                                  isDarkMode ? 'text-green-400' : 'text-green-500'
                                }`} />
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-6">
                          <h4 className={`font-bold mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-black'
                          }`}>
                            Core Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 rounded-full border text-sm transition-all duration-300 hover:scale-105 ${
                                  isDarkMode 
                                    ? 'border-green-400 text-green-400 hover:bg-green-400/10' 
                                    : 'border-green-200 text-green-700 hover:bg-green-50'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        <div className="mb-6">
                          <h4 className={`font-bold mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-black'
                          }`}>
                            Notable Projects
                          </h4>
                          <div className="space-y-1">
                            {exp.projects.map((project, i) => (
                              <div key={i} className={`flex items-center text-sm transition-colors duration-500 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                <ChevronRight className={`h-3 w-3 mr-2 transition-colors duration-500 ${
                                  isDarkMode ? 'text-green-400' : 'text-green-500'
                                }`} />
                                {project}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Hover Action */}
                        <AnimatePresence>
                          {hoveredCard === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`border-t pt-4 transition-colors duration-500 ${
                                isDarkMode ? 'border-gray-700' : 'border-gray-100'
                              }`}
                            >
                              <button className={`w-full py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                                isDarkMode 
                                  ? 'text-green-400 hover:bg-green-400/10' 
                                  : 'text-green-600 hover:bg-green-50'
                              }`}>
                                View Full Details
                                <ChevronRight className="h-3 w-3 ml-2 inline" />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-6 h-6 rounded-full border-4 shadow-lg transition-colors duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-green-400 to-blue-400 border-gray-800' 
                      : 'bg-gradient-to-br from-green-500 to-black border-white'
                  }`}>
                    <div className={`w-full h-full rounded-full animate-pulse transition-colors duration-500 ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-green-300 to-green-500' 
                        : 'bg-gradient-to-br from-green-400 to-green-600'
                    }`} />
                  </div>
                </motion.div>

                {/* Mobile Year Badge */}
                <div className="md:hidden absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-medium transition-colors duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                      : 'bg-gradient-to-r from-green-500 to-black'
                  }`}>
                    {exp.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Career Stats */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "4+", label: "Years Experience", color: "green" },
              { value: "50+", label: "Projects Completed", color: "black" },
              { value: "10+", label: "Team Members Led", color: "green" },
              { value: "95%", label: "Client Satisfaction", color: "black" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className={`p-6 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700' 
                    : 'bg-white/80 border-gray-100'
                }`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
                  stat.color === 'green' 
                    ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                    : (isDarkMode ? 'text-white' : 'text-black')
                }`}>
                  {stat.value}
                </div>
                <div className={`font-medium transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`p-8 rounded-2xl shadow-xl backdrop-blur-sm border transition-colors duration-500 ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700' 
              : 'bg-white/80 border-gray-100'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              Ready to Work Together?
            </h3>
            <p className={`mb-6 max-w-2xl mx-auto transition-colors duration-500 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Let's discuss how my experience can help bring your vision to life. 
              I'm always excited to take on new challenges and create meaningful user experiences.
            </p>
            <motion.button
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg' 
                  : 'bg-gradient-to-r from-green-500 to-black text-white hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
