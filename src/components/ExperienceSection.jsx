import { useState } from "react";
import { Calendar, TrendingUp, MapPin, Users, Award, ChevronRight, Briefcase, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const experiences = [
    {
      year: "2023 - Present",
      title: "Senior UX Designer",
      company: "TechFlow Inc.",
      location: "Remote",
      type: "Full-time",
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
      type: "Full-time",
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
      type: "Full-time",
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
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "current": return "bg-green-100 text-green-700 border-green-200";
      case "completed": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section id="experience" className="py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black rounded-full blur-3xl" />
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
            <div className="p-4 bg-gradient-to-r from-green-500 to-black rounded-2xl mr-4 shadow-lg">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-black via-green-600 to-black bg-clip-text text-transparent">
              Professional Experience
            </h2>
          </div>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-green-500 to-black mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            My professional journey showcasing growth, impact, and the meaningful contributions 
            I've made across different organizations and projects.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Enhanced Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-black rounded-full shadow-lg"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <motion.div
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm group">
                      <CardContent className="p-0">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-green-500 to-black p-6 text-white relative overflow-hidden">
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
                            <Badge className={`${getStatusColor(exp.status)} border font-medium`}>
                              {exp.status === 'current' ? 'Current' : 'Completed'}
                            </Badge>
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
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            {exp.description}
                          </p>

                          {/* Key Achievements */}
                          <div className="mb-6">
                            <h4 className="font-bold text-black mb-3 flex items-center">
                              <Award className="h-4 w-4 text-green-600 mr-2" />
                              Key Achievements
                            </h4>
                            <div className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start text-sm text-gray-700"
                                >
                                  <TrendingUp className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                  {achievement}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="mb-6">
                            <h4 className="font-bold text-black mb-3">Core Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="border-green-200 text-green-700 hover:bg-green-50 transition-colors"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Projects */}
                          <div className="mb-6">
                            <h4 className="font-bold text-black mb-3">Notable Projects</h4>
                            <div className="space-y-1">
                              {exp.projects.map((project, i) => (
                                <div key={i} className="flex items-center text-sm text-gray-600">
                                  <ChevronRight className="h-3 w-3 text-green-500 mr-2" />
                                  {project}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Hover Action */}
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ 
                              opacity: hoveredCard === index ? 1 : 0,
                              height: hoveredCard === index ? 'auto' : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-100 pt-4"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-green-600 hover:bg-green-50 transition-colors"
                              onClick={() => setSelectedExperience(exp)}
                            >
                              View Full Details
                              <ChevronRight className="h-3 w-3 ml-2" />
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Enhanced Timeline Node */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-black rounded-full border-4 border-white shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse" />
                  </div>
                </motion.div>

                {/* Year Badge for Mobile */}
                <div className="md:hidden absolute top-4 left-4 z-20">
                  <Badge className="bg-gradient-to-r from-green-500 to-black text-white border-none">
                    {exp.year}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Career Summary Stats */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">4+</div>
              <div className="text-gray-700 font-medium">Years Experience</div>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
              <div className="text-3xl font-bold text-black mb-2">50+</div>
              <div className="text-gray-700 font-medium">Projects Completed</div>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
              <div className="text-gray-700 font-medium">Team Members Led</div>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg">
              <div className="text-3xl font-bold text-black mb-2">95%</div>
              <div className="text-gray-700 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
