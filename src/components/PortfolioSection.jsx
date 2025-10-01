// PortfolioSection.jsx
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

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
            A selection of projects that showcase my design process, creative thinking, and problem-solving approach.
          </p>
        </div>

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
          <p className="text-center text-gray-500">No projects available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <Card
                key={project._id || project.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none hover:cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {project.stats?.views || 0}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1 text-green-500" />
                            {project.stats?.likes || 0}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {project.stats?.comments || 0}
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 transition-colors cursor-pointer"
                    >
                      {project.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-green-600 transition-colors">
                    <Link to={project.link}>{project.title}</Link>
                  </h3>

                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs border-green-300 text-green-600 hover:bg-green-100"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link to={project.link}>
                    <button className="w-full text-green-600 hover:bg-green-100 px-3 py-2 rounded-md transition-all duration-300">
                      View Case Study
                    </button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && (
          <div className="flex justify-center mt-8">
            <Link to="/portfolio">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-gray-900 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-3/4 sm:w-auto hover:cursor-pointer">
                View All Projects
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
});

export default PortfolioSection;