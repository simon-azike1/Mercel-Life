import React, { forwardRef } from "react";
import { usePortfolio } from "./PortfolioContext";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Eye, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PortfolioSection = forwardRef(({ limit }, ref) => {
  const { projects, loading } = usePortfolio();

  const displayProjects = limit ? projects.slice(0, limit) : projects;

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
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
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

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          {/* <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
            A selection of projects that showcase my design process, creative thinking, and problem-solving approach.
          </p> */}
        </motion.div>

        {loading ? (

          // Fancy 3-dot bouncing loader
          <div className="flex justify-center items-center py-20 space-x-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-5 h-5 rounded-full bg-gradient-to-r from-green-600 to-black"
                animate={{ y: ["0%", "-50%", "0%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        ) : displayProjects.length === 0 ? (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No projects available.
          </motion.p>
        ) : (
          
          /* Animated Projects Grid */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {displayProjects.map((project, index) => (
              <motion.div
                key={project._id || project.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none hover:cursor-pointer h-full">
                  <motion.div 
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="absolute bottom-4 left-4 right-4">
                        <motion.div 
                          className="flex items-center justify-between text-white text-sm"
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex items-center space-x-4">
                            <motion.span 
                              className="flex items-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              {project.stats?.views || 0}
                            </motion.span>
                            <motion.span 
                              className="flex items-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Heart className="h-4 w-4 mr-1 text-green-500" />
                              {project.stats?.likes || 0}
                            </motion.span>
                            <motion.span 
                              className="flex items-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {project.stats?.comments || 0}
                            </motion.span>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <CardContent className="p-6">
                    <motion.div 
                      className="mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 transition-colors cursor-pointer"
                      >
                        {project.category}
                      </Badge>
                    </motion.div>

                    <motion.h3 
                      className="text-xl font-bold text-black mb-2 group-hover:text-green-600 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Link to={project.link}>{project.title}</Link>
                    </motion.h3>

                    <motion.p 
                      className="text-gray-700 mb-4 text-sm leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>

                    <motion.div 
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      {project.tags?.map((tag, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="outline"
                            className="text-xs border-green-300 text-green-600 hover:bg-green-100"
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Animated View All Button */}
        {!loading && (
          <motion.div
            className="flex justify-center mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={buttonVariants}
          >
            <Link to="/portfolio">
              <motion.button 
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-gray-900 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-3/4 sm:w-auto hover:cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View All Projects
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
});

export default PortfolioSection;
