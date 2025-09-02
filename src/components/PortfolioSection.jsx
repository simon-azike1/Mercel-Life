import { ExternalLink, Eye, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PortfolioSection() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      category: "Mobile Design",
      description:
        "Complete redesign of a fashion e-commerce app focusing on user experience and conversion optimization.",
      image: "https://unsplash.it/400/300?image=1080",
      tags: ["UI/UX", "Mobile", "Figma", "Prototyping"],
      link: "#",
      stats: { views: "2.3k", likes: "156", comments: "23" },
    },
    {
      id: 2,
      title: "SaaS Dashboard Design",
      category: "Web Design",
      description: "Modern dashboard design for a project management SaaS platform with focus on data visualization.",
      image: "https://unsplash.it/400/300?image=1050",
      tags: ["Dashboard", "SaaS", "Data Viz", "Web"],
      link: "#",
      stats: { views: "1.8k", likes: "124", comments: "18" },
    },
    {
      id: 3,
      title: "Banking App Redesign",
      category: "Mobile Design",
      description: "Complete UX overhaul of a banking application with emphasis on security and ease of use.",
      image: "https://unsplash.it/400/300?image=1045",
      tags: ["Fintech", "Mobile", "Security", "UX"],
      link: "#",
      stats: { views: "3.1k", likes: "201", comments: "34" },
    },
    {
      id: 4,
      title: "Design System",
      category: "Design System",
      description:
        "Comprehensive design system for a tech startup including components, guidelines, and documentation.",
      image: "https://unsplash.it/400/300?image=1060",
      tags: ["Design System", "Components", "Guidelines"],
      link: "#",
      stats: { views: "4.2k", likes: "287", comments: "45" },
    },
    {
      id: 5,
      title: "Healthcare Platform",
      category: "Web Design",
      description:
        "Patient portal design for a healthcare platform focusing on accessibility and user-friendly interface.",
      image: "https://unsplash.it/400/300?image=1020",
      tags: ["Healthcare", "Accessibility", "Web", "UX"],
      link: "#",
      stats: { views: "1.9k", likes: "143", comments: "21" },
    },
    {
      id: 6,
      title: "Food Delivery App",
      category: "Mobile Design",
      description: "Modern food delivery app design with focus on quick ordering and seamless user experience.",
      image: "https://unsplash.it/400/300?image=1070",
      tags: ["Mobile", "Food Tech", "UI", "Ordering"],
      link: "#",
      stats: { views: "2.7k", likes: "189", comments: "29" },
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Featured Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A selection of projects that showcase my design process and problem-solving approach.
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
                  className="w-full text-purple-600 hover:bg-purple-50 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 bg-transparent"
          >
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
