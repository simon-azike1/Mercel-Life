import React, { useState } from "react";
import { GraduationCap, Award, Book, Calendar, MapPin, ExternalLink, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function EducationSection() {
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
      color: "from-blue-500 to-indigo-600",
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
      color: "from-yellow-500 to-orange-600",
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
      color: "from-green-500 to-emerald-600",
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
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 border-green-200";
      case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Upcoming": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
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
            <div className="p-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl mr-4 shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Educational Journey
            </h2>
          </div>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Academic foundation combining theoretical knowledge with practical application, 
            fostering analytical thinking and creative problem-solving skills essential for modern design and information management.
          </p>
        </motion.div>

        {/* Timeline Visualization */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500 rounded-full" />
            <div className="space-y-12">
              {education.map((edu, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100">
                      <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.duration}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-r ${edu.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <edu.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="w-5/12" />
                </div>
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
                <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm group">
                  {/* Image Header */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={edu.image}
                      alt={edu.institution}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${edu.color} opacity-60`} />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className={`${getStatusColor(edu.status)} border font-medium`}>
                        {edu.status}
                      </Badge>
                    </div>

                    {/* Milestone Badge */}
                    {edu.milestone && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-400 text-yellow-900 border-none animate-pulse">
                          <Star className="h-3 w-3 mr-1" />
                          Milestone
                        </Badge>
                      </div>
                    )}

                    {/* Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Header Info */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {edu.degree}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-2">{edu.institution}</p>
                      
                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {edu.duration}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {edu.location}
                        </span>
                        {edu.gpa && (
                          <span className="flex items-center font-medium text-green-600">
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                      {edu.description}
                    </p>

                    {/* Achievements */}
                    {edu.achievements && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {edu.achievements.slice(0, 3).map((achievement, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-center">
                              <ChevronRight className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Coursework */}
                    {edu.coursework && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Coursework:</h4>
                        <div className="flex flex-wrap gap-1">
                          {edu.coursework.slice(0, 4).map((course, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hover Details */}
                    <motion.div
                      className="border-t border-gray-100 pt-4"
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
                        className="w-full text-blue-600 hover:bg-blue-50 transition-colors"
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

        {/* Summary Stats */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.2</div>
              <div className="text-gray-600 text-sm">Current GPA</div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">3+</div>
              <div className="text-gray-600 text-sm">Years of Study</div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600 text-sm">Research Projects</div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
              <div className="text-gray-600 text-sm">Academic Awards</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
