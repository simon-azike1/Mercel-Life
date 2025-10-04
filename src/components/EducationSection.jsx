import React, { useState } from "react";
import { GraduationCap, Award, Book, Calendar, MapPin, ExternalLink, ChevronRight, Star, Trophy, Target, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import ExperienceSection from "./ExperienceSection";

export default function EducationSection() {
  const { isDarkMode } = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);

  const education = [
    {
      institution: "University of Ilorin",
      degree: "Bachelor of Library and Information Science",
      duration: "2022 - 2025",
      status: "In Progress",
      location: "Ilorin, Nigeria",
      gpa: "4.2/5.0",
      description: "Comprehensive study of Library and Information Science with focus on digital resource management, information systems, and research methodologies. Developing expertise in organizing, managing, and disseminating information in the digital age.",
      icon: GraduationCap,
      image: "https://cdn.guardian.ng/wp-content/uploads/2020/03/Unilorin-1.jpg",
      color: isDarkMode ? "from-blue-400 to-indigo-500" : "from-blue-500 to-indigo-600",
      achievements: [
        "Dean's List - 3 semesters",
        "Research Excellence Award",
        "Digital Library Systems Certification"
      ],
      coursework: ["Information Systems", "Digital Libraries", "Research Methods", "Data Management"]
    },
    {
      institution: "University of Ilorin",
      degree: "B.L.I.S Graduation Ceremony",
      duration: "2024-2025",
      status: "Upcoming",
      location: "Ilorin, Nigeria",
      description: "Anticipated graduation ceremony marking the successful completion of Bachelor of Library and Information Science program. Celebration of academic achievements and transition into professional practice.",
      icon: Award,
      image: "./assets/img/grad_1.png",
      color: isDarkMode ? "from-yellow-400 to-orange-500" : "from-yellow-500 to-orange-600",
      achievements: [
        "Magna Cum Laude Expected",
        "Outstanding Student Award Nominee",
        "Academic Excellence Recognition"
      ],
      milestone: true
    },
    {
      institution: "University of Ilorin",
      degree: "Final Year Research Project",
      duration: "2024-2025",
      status: "Completed",
      location: "Ilorin, Nigeria",
      description: "Comprehensive research project investigating the Library and Information Science curriculum effectiveness in preparing graduates for modern job market demands. Analyzed industry requirements and proposed curriculum enhancements.",
      icon: Book,
      image: "https://images.pexels.com/photos/669621/pexels-photo-669621.jpeg",
      color: isDarkMode ? "from-green-400 to-emerald-500" : "from-green-500 to-emerald-600",
      achievements: [
        "Research Excellence Award",
        "Published in Academic Journal",
        "Presented at National Conference"
      ],
      coursework: ["Curriculum Analysis", "Industry Research", "Data Analytics", "Academic Writing"]
    },
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getStatusColor = (status) => {
    if (isDarkMode) {
      switch (status) {
        case "Completed": return "bg-green-900/50 text-green-300 border-green-700";
        case "In Progress": return "bg-blue-900/50 text-blue-300 border-blue-700";
        case "Upcoming": return "bg-yellow-900/50 text-yellow-300 border-yellow-700";
        default: return "bg-gray-800/50 text-gray-300 border-gray-600";
      }
    } else {
      switch (status) {
        case "Completed": return "bg-green-100 text-green-700 border-green-200";
        case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200";
        case "Upcoming": return "bg-yellow-100 text-yellow-700 border-yellow-200";
        default: return "bg-gray-100 text-gray-700 border-gray-200";
      }
    }
  };

  return (
    <div className={`
      min-h-screen pt-20 transition-colors duration-300
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
      }
    `}>
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className={`
            absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl transition-colors duration-300
            ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}
          `} />
          <div className={`
            absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl transition-colors duration-300
            ${isDarkMode ? 'bg-green-400' : 'bg-green-500'}
          `} />
          <div className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl transition-colors duration-300
            ${isDarkMode ? 'bg-purple-400' : 'bg-purple-500'}
          `} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Enhanced Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div 
                className={`
                  p-4 rounded-2xl mr-4 shadow-lg transition-colors duration-300
                  ${isDarkMode 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500' 
                    : 'bg-gradient-to-r from-blue-500 to-green-500'
                  }
                `}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className={`
                text-5xl lg:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300
                ${isDarkMode 
                  ? 'from-white via-blue-400 to-green-400' 
                  : 'from-gray-900 via-blue-600 to-green-600'
                }
              `}>
                Educational Journey
              </h2>
            </div>
            
            <motion.div 
              className={`
                h-1 mx-auto mb-8 rounded-full transition-colors duration-300
                ${isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-green-400' 
                  : 'bg-gradient-to-r from-blue-500 to-green-500'
                }
              `}
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            />
            
            <p className={`
              text-xl max-w-4xl mx-auto leading-relaxed transition-colors duration-300
              ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
            `}>
              Academic foundation combining theoretical knowledge with practical application, 
              fostering analytical thinking and creative problem-solving skills essential for modern design and information management.
            </p>
          </motion.div>

          {/* Enhanced Timeline Visualization */}
          <div className="hidden lg:block mb-16">
            <div className="relative">
              <div className={`
                absolute left-1/2 transform -translate-x-1/2 h-full w-1 rounded-full transition-colors duration-300
                ${isDarkMode 
                  ? 'bg-gradient-to-b from-blue-400 to-green-400' 
                  : 'bg-gradient-to-b from-blue-500 to-green-500'
                }
              `} />
              <div className="space-y-12">
                {education.map((edu, index) => (
                  <motion.div 
                    key={index} 
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <motion.div 
                        className={`
                          p-4 rounded-xl shadow-lg border transition-all duration-300 hover:scale-105
                          ${isDarkMode 
                            ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' 
                            : 'bg-white/80 backdrop-blur-sm border-gray-100'
                          }
                        `}
                        whileHover={{ y: -5 }}
                      >
                        <h4 className={`
                          font-bold transition-colors duration-300
                          ${isDarkMode ? 'text-white' : 'text-gray-900'}
                        `}>
                          {edu.degree}
                        </h4>
                        <p className={`
                          font-medium transition-colors duration-300
                          ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                        `}>
                          {edu.institution}
                        </p>
                        <p className={`
                          text-sm transition-colors duration-300
                          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                        `}>
                          {edu.duration}
                        </p>
                      </motion.div>
                    </div>
                    <div className="relative z-10">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-r ${edu.color} rounded-full flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <edu.icon className="h-6 w-6 text-white" />
                      </motion.div>
                    </div>
                    <div className="w-5/12" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Education Cards */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {education.map((edu, index) => {
              const IconComponent = edu.icon;
              
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -12, transition: { duration: 0.3 } }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Card className={`
                    h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 group
                    ${isDarkMode 
                      ? 'bg-gray-800/80 backdrop-blur-sm hover:bg-gray-800/90' 
                      : 'bg-white/80 backdrop-blur-sm hover:bg-white/90'
                    }
                  `}>
                    {/* Enhanced Image Header */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={edu.image}
                        alt={edu.institution}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Enhanced Gradient Overlay */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-t ${edu.color} transition-opacity duration-300
                        ${isDarkMode ? 'opacity-70' : 'opacity-60'}
                      `} />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getStatusColor(edu.status)} border font-medium backdrop-blur-sm`}>
                          {edu.status}
                        </Badge>
                      </div>

                      {/* Milestone Badge */}
                      {edu.milestone && (
                        <div className="absolute top-4 left-4">
                          <Badge className={`
                            border-none animate-pulse backdrop-blur-sm
                            ${isDarkMode 
                              ? 'bg-yellow-500/90 text-yellow-900' 
                              : 'bg-yellow-400 text-yellow-900'
                            }
                          `}>
                            <Star className="h-3 w-3 mr-1" />
                            Milestone
                          </Badge>
                        </div>
                      )}

                      {/* Enhanced Icon */}
                      <div className="absolute bottom-4 left-4">
                        <motion.div 
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </motion.div>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Header Info */}
                      <div className="mb-4">
                        <h3 className={`
                          text-xl font-bold mb-2 transition-colors duration-300
                          ${isDarkMode 
                            ? 'text-white group-hover:text-blue-400' 
                            : 'text-gray-900 group-hover:text-blue-600'
                          }
                        `}>
                          {edu.degree}
                        </h3>
                        <p className={`
                          font-semibold mb-2 transition-colors duration-300
                          ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                        `}>
                          {edu.institution}
                        </p>
                        
                        {/* Meta Information */}
                        <div className={`
                          flex flex-wrap gap-2 text-sm mb-3 transition-colors duration-300
                          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                        `}>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {edu.duration}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {edu.location}
                          </span>
                          {edu.gpa && (
                            <span className={`
                              flex items-center font-medium transition-colors duration-300
                              ${isDarkMode ? 'text-green-400' : 'text-green-600'}
                            `}>
                              GPA: {edu.gpa}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`
                        text-sm leading-relaxed mb-4 flex-grow transition-colors duration-300
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                      `}>
                        {edu.description}
                      </p>

                      {/* Achievements */}
                      {edu.achievements && (
                        <div className="mb-4">
                          <h4 className={`
                            font-semibold mb-2 text-sm flex items-center transition-colors duration-300
                            ${isDarkMode ? 'text-white' : 'text-gray-900'}
                          `}>
                            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                            Key Achievements:
                          </h4>
                          <ul className="space-y-1">
                            {edu.achievements.slice(0, 3).map((achievement, idx) => (
                              <li key={idx} className={`
                                text-xs flex items-center transition-colors duration-300
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                              `}>
                                <ChevronRight className={`
                                  h-3 w-3 mr-1 flex-shrink-0 transition-colors duration-300
                                  ${isDarkMode ? 'text-green-400' : 'text-green-500'}
                                `} />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Coursework */}
                      {edu.coursework && (
                        <div className="mb-4">
                          <h4 className={`
                            font-semibold mb-2 text-sm flex items-center transition-colors duration-300
                            ${isDarkMode ? 'text-white' : 'text-gray-900'}
                          `}>
                            <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                            Key Coursework:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {edu.coursework.slice(0, 4).map((course, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className={`
                                  text-xs transition-colors duration-300
                                  ${isDarkMode 
                                    ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10' 
                                    : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                                  }
                                `}
                              >
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Enhanced Hover Details */}
                      <motion.div
                        className={`
                          border-t pt-4 transition-colors duration-300
                          ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}
                        `}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: hoveredCard === index ? 1 : 0,
                          height: hoveredCard === index ? 'auto' : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`
                            w-full transition-colors duration-300
                            ${isDarkMode 
                              ? 'text-blue-400 hover:bg-blue-400/10' 
                              : 'text-blue-600 hover:bg-blue-50'
                            }
                          `}
                        >
                          View Details
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced Summary Stats */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "4.2", label: "Current GPA", color: "blue", icon: Target },
                { value: "3+", label: "Years of Study", color: "green", icon: Calendar },
                { value: "15+", label: "Research Projects", color: "purple", icon: Book },
                { value: "5+", label: "Academic Awards", color: "orange", icon: Trophy }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`
                    p-6 rounded-2xl border transition-all duration-300 hover:scale-105
                    ${isDarkMode 
                      ? 'bg-gray-800/60 backdrop-blur-sm border-gray-700 hover:bg-gray-800/80' 
                      : 'bg-white/60 backdrop-blur-sm border-gray-100 hover:bg-white/80'
                    }
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className={`
                      h-6 w-6 transition-colors duration-300
                      ${stat.color === 'blue' && (isDarkMode ? 'text-blue-400' : 'text-blue-600')}
                      ${stat.color === 'green' && (isDarkMode ? 'text-green-400' : 'text-green-600')}
                      ${stat.color === 'purple' && (isDarkMode ? 'text-purple-400' : 'text-purple-600')}
                      ${stat.color === 'orange' && (isDarkMode ? 'text-orange-400' : 'text-orange-600')}
                    `} />
                  </div>
                  <div className={`
                    text-3xl font-bold mb-2 transition-colors duration-300
                    ${stat.color === 'blue' && (isDarkMode ? 'text-blue-400' : 'text-blue-600')}
                    ${stat.color === 'green' && (isDarkMode ? 'text-green-400' : 'text-green-600')}
                    ${stat.color === 'purple' && (isDarkMode ? 'text-purple-400' : 'text-purple-600')}
                    ${stat.color === 'orange' && (isDarkMode ? 'text-orange-400' : 'text-orange-600')}
                  `}>
                    {stat.value}
                  </div>
                  <div className={`
                    text-sm transition-colors duration-300
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                  `}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <ExperienceSection isDarkMode={isDarkMode} />
      </section>
    </div>
  );
}
