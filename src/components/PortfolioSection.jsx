import { ExternalLink, Eye, Heart, MessageCircle, ArrowRight, FastForward } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";

 const  PortfolioSection = forwardRef ((props, ref) =>  {
  const projects =[
    {
      id: 1,
      title: "E-Commerce Brand Identity & Content Strategy",
      category: "Graphic Design & Content Creation",
      description:
        "Crafted a complete visual identity and compelling brand narrative for an e-commerce platform, combining stunning graphics with persuasive copy that drives engagement and conversions.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["Branding", "Graphic Design", "Content Strategy", "Copywriting"],
      link: "#",
      stats: { views: "2.3k", likes: "156", comments: "23" },
    },
    {
      id: 2,
      title: "SaaS Dashboard Design & User Experience Writing",
      category: "UI/UX Design & Content",
      description:
        "Redesigned a SaaS dashboard with intuitive interfaces and crafted clear, user-focused microcopy that guides users through complex data visualization seamlessly.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["UI/UX Design", "UX Writing", "Data Visualization", "User Experience"],
      link: "#",
      stats: { views: "1.8k", likes: "124", comments: "18" },
    },
    {
      id: 3,
      title: "Mobile Banking App & Security Content",
      category: "UI/UX Design & Technical Writing",
      description:
        "Designed an intuitive mobile banking interface while creating clear, trustworthy content that communicates security features and builds user confidence in financial transactions.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["Mobile Design", "UI/UX", "Technical Writing", "Security Content"],
      link: "#",
      stats: { views: "3.1k", likes: "201", comments: "34" },
    },
    {
      id: 4,
      title: "Design System & Documentation Storytelling",
      category: "Graphic Design & Technical Writing",
      description:
        "Created a comprehensive design system with visually stunning components and wrote engaging documentation that tells the story of each design decision and usage guideline.",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["Design System", "Graphic Design", "Documentation", "Storytelling"],
      link: "#",
      stats: { views: "4.2k", likes: "287", comments: "45" },
    },
    {
      id: 5,
      title: "Healthcare Platform Design & Patient Communication",
      category: "UI/UX Design & Health Content",
      description:
        "Designed an accessible healthcare interface and crafted empathetic, clear content that helps patients navigate their health journey with confidence and understanding.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["Healthcare Design", "UI/UX", "Health Content", "Accessibility"],
      link: "#",
      stats: { views: "1.9k", likes: "143", comments: "21" },
    },
    {
      id: 6,
      title: "Food Delivery App & Culinary Storytelling",
      category: "UI/UX Design & Creative Writing",
      description:
        "Developed a mouth-watering food delivery interface paired with compelling culinary content that tells the story of each dish and creates an emotional connection with food lovers.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["Food Design", "UI/UX", "Creative Writing", "Brand Storytelling"],
      link: "#",
      stats: { views: "2.7k", likes: "189", comments: "29" },
    },
  ]

  return (
    
    <motion.div
     
     initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
       transition={{ duration: 0.6, delay: 0.1 }}
        >
       <section ref={ref} className="py-20 bg-white"  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center mb-16">
  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Featured Work</h2>
  <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
    A selection of projects that showcase my design process, creative thinking, and problem-solving approach.
  </p>
  <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-2">
    From crafting intuitive user interfaces and immersive mobile experiences to creating compelling visual content and graphics, each project reflects a balance of functionality and aesthetics.
  </p>
  <p className="text-lg text-gray-500 max-w-3xl mx-auto">
    My goal is to design digital experiences that not only look beautiful but also deliver meaningful impact for users and businesses alike. Explore how design, usability, and storytelling come together in my work.
  </p>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {project.stats.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
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
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                    {project.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full text-purple-600 hover:bg-purple-50  group-hover:text-black transition-all duration-300"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          
          <Link to="/portfolio">
           <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 bg-transparent"
          >
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
          </Link>
         
        </div>
      </div>
    </section>
    </motion.div>
    
   
  );
})

export default PortfolioSection;