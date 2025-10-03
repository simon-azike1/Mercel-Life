import { Palette, Users, Smartphone, Figma, Eye, Monitor, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { 
      name: "UI Design", 
      level: 95, 
      icon: Palette,
      description: "Creating beautiful, intuitive interfaces",
      projects: 50,
      category: "Design",
      color: "from-purple-500 to-pink-500"
    },
    { 
      name: "UX Research", 
      level: 90, 
      icon: Users,
      description: "Understanding user needs and behaviors",
      projects: 35,
      category: "Research",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      name: "Prototyping", 
      level: 92, 
      icon: Smartphone,
      description: "Rapid prototyping and wireframing",
      projects: 40,
      category: "Development",
      color: "from-green-500 to-emerald-500"
    },
    { 
      name: "Figma", 
      level: 98, 
      icon: Figma,
      description: "Advanced design system creation",
      projects: 60,
      category: "Tools",
      color: "from-orange-500 to-red-500"
    },
    { 
      name: "User Testing", 
      level: 88, 
      icon: Eye,
      description: "Validating designs through testing",
      projects: 25,
      category: "Research",
      color: "from-indigo-500 to-purple-500"
    },
    { 
      name: "Design Systems", 
      level: 94, 
      icon: Monitor,
      description: "Scalable design system architecture",
      projects: 15,
      category: "Systems",
      color: "from-teal-500 to-green-500"
    },
  ];

  const categories = [...new Set(skills.map(skill => skill.category))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const getSkillLevel = (level) => {
    if (level >= 95) return { text: "Expert", color: "text-green-600" };
    if (level >= 90) return { text: "Advanced", color: "text-blue-600" };
    if (level >= 80) return { text: "Proficient", color: "text-orange-600" };
    return { text: "Intermediate", color: "text-gray-600" };
  };

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
              <Award className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-600 to-black bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
          </div>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-green-500 to-black mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
          
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Combining technical expertise with creative vision to deliver exceptional user experiences 
            that drive business growth and user satisfaction.
          </p> */}

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-sm font-medium border-green-200 text-green-700 hover:bg-green-50 transition-colors cursor-pointer"
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Skill Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            const skillLevel = getSkillLevel(skill.level);
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredSkill(index)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm group h-full">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <CardContent className="p-8 relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 bg-gradient-to-br ${skill.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="secondary" 
                          className={`${skillLevel.color} bg-transparent border font-medium`}
                        >
                          {skillLevel.text}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                          {skill.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 py-3 border-t border-gray-100">
                        <span className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                          {skill.projects} Projects
                        </span>
                        <span className="font-semibold text-gray-700">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className={`h-3 rounded-full bg-gradient-to-r ${skill.color} relative`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                          >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover Details */}
                      <motion.div
                        className="pt-4 border-t border-gray-100"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: hoveredSkill === index ? 1 : 0,
                          height: hoveredSkill === index ? 'auto' : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Category: {skill.category}</span>
                          <span className="flex items-center">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color} mr-1`} />
                            Active
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${skill.color} opacity-10 rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500`} />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">225+</div>
              <div className="text-gray-600">Total Projects</div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
              <div className="text-gray-600">Average Proficiency</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
