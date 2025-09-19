import { ExternalLink, Eye, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProcessSection from "./ProcessSection";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import portFolioDB from '../portfolioDb'


const PortfolioSection = forwardRef((props,ref) => {
  const projects  = portFolioDB;

const display = props.showIds ? projects.filter(project => props.showIds.includes(project.id)):projects;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <section  className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
              A selection of projects that showcase my design process, creative
              thinking, and problem-solving approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {display.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none hover:cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img style={{height:"50%"}}
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
                            {project.stats.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1 text-green-500" />
                            {project.stats.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {project.stats.comments}
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-2">
                    <Link to={project.link}>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 transition-colors cursor-pointer"
                      >
                        {project.category}
                      </Badge>
                    </Link>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-green-600 transition-colors">
                    <Link to={project.link}>{project.title}</Link>
                  </h3>

                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-green-300 text-green-600 hover:bg-green-100"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* {<Link to={project.link}>
                    <Button
                      variant="ghost"
                      className="w-full text-green-600 hover:bg-green-100 transition-all duration-300"
                    >
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>  } */}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="https://marcelinaadebisi.wordpress.com/"
            target="_blank"
            >
            {props.showIds && (
            <div className="text-center mt-12">
              <Link to="/portfolio"
              target="_blank"
              >
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 hover:cursor-pointer"
                >
                  View All Projects
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
            </Link>
          </div>
        </div>
      </section>

      <ProcessSection />
    </motion.div>
  );
});

export default PortfolioSection;
