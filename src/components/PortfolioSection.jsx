import { ExternalLink, Eye, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProcessSection from "./ProcessSection";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const PortfolioSection = forwardRef((props,ref) => {
  const projects  =  [
  {
    id: 9,
    title: "Wishes and Celebration Card",
    category: "Graphic Design & Technical Writing",
    description:
      "In this project, I designed a visually engaging celebration card that celebrates birthday and communicates heartfelt messages of the celebrant. I focused on storytelling and color harmony to captivate and connect with the audience effectively.",
    image:
      "https://marcelinaadebisi.wordpress.com/wp-content/uploads/2025/08/1000010308.jpg?w=1526&h=",
    tags: ["Design System", "Graphic Design", "Documentation", "Storytelling"],
    link: "/experience",
    stats: { views: "4.2k", likes: "287", comments: "45" },
  },
  {
    id: 5,
    title: "Home of Beauty",
    category: "UI/UX Design & Health Content",
    description:
      "For this project, I designed an accessible beauty brand interface, combining intuitive Graphic design with clear, empathetic content. My goal was to enhance user engagement and help clients appreciate their journey with confidence.",
    image:
      "https://marcelinaadebisi.wordpress.com/wp-content/uploads/2025/08/1000010314.jpg?w=1526&h",
    tags: ["Fashion Design", "Clothe Content", "Beauty"],
    link: "/about",
    stats: { views: "1.9k", likes: "143", comments: "21" },
  },
  {
    id: 6,
    title: "Prisca Apparel",
    category: "UI/UX Design & Creative Fabrics",
    description:
      "In this project, I designed a clothing brand’s digital presence, focusing on intuitive product presentation. I crafted a design that reflects the brand’s story while delivering an engaging and visually appealing experience.",
    image:
      "/assets/img/project_(9).png",
    tags: ["UI/UX", "Brand Storytelling"],
    link: "/services",
    stats: { views: "2.7k", likes: "189", comments: "29" },
  },
  {
    id: 2,
    title: "Grow your Business",
    category: "UI/UX Design & Content",
    description:
      "This personal project allowed me to combine UI/UX design with creative content. I designed a promotional card that communicates thoughtful messages effectively, creating a program visibility.",
    image:
      "/assets/img/project_ (6).jpg",
    tags: ["UI/UX Design", "UX Writing", "Data Visualization", "User Experience"],
    link: "/contact",
    stats: { views: "1.8k", likes: "124", comments: "18" },
  },
  {
    id: 1,
    title: "Fundamentals of Christian Faith",
    category: "Graphic Design & Content Creation",
    description:
      "For this project, I developed visually appealing Christian-themed content. I applied graphic design and clear messaging techniques to effectively communicate faith-based concepts while maintaining a professional and engaging aesthetic.",
    image:
      "https://marcelinaadebisi.wordpress.com/wp-content/uploads/2025/08/1000008987.jpg?w=1526&h=",
    tags: ["Branding", "Graphic Design", "Content Strategy", "Copywriting"],
    link: "/skills",
    stats: { views: "2.3k", likes: "156", comments: "23" },
  },
  {
    id: 3,
    title: "Learn a Skill",
    category: "UI/UX Design & Promotion",
    description:
      "In this project, I designed an intuitive 'promotional' barner that communicates personality and professional brand. I combined clear, trustworthy content with effective Graphic design to build confidence and trust in personal branding effective promotional message.",
    image:
      "/assets/img/project_(8).jpg",
    tags: ["Mobile Design", "UI/UX", "Technical Writing", "Security Content"],
    link: "/blog",
    stats: { views: "3.1k", likes: "201", comments: "34" },
  },
  {
    id: 4,
    title: "Internship Program",
    category: "Graphic Design ",
    description:
      "In this project, I designed a Internship call to action card communicates company's program and professionalism. In this project I combined clear, trustworthy content with effective graphic skills to build confidence and trust in clients message.",
    image:
      "/assets/img/project_(3).jpg",
    tags: ["Mobile Design", "Graphic Design", "Technical Writing", "Promotional Content"],
    link: "/blog",
    stats: { views: "3.1k", likes: "201", comments: "34" },
  },
  {
    id: 7,
    title: "Social Networking",
    category: "UI/UX Design & Technical Writing",
    description:
      "With this project  I designed an intuitive 'social media promotional flyer that communicates personality and professionalism. I combined clear, trustworthy content with effective graphic design to build confidence and trust in clients branding.",
    image:
      "/assets/img/project_(4).jpg",
    tags: ["Graphic  Design", "UI/UX", "Technical Writing", "Promotional Content"],
    link: "/blog",
    stats: { views: "3.1k", likes: "201", comments: "34" },
  },
  {
    id: 8,
    title: "Facebook Ads",
    category: "Graphic Design & Technical Writing",
    description:
      "This project allowed me to designed an intuitive  Social media fleyer. This project required me to combined my clear design skill and writings to create trustworthy content with effective graphic design to build confidence and trust in personal branding.",
    image:
      "/assets/img/project_(5).jpg",
    tags: ["Graphic design", "UI/UX", "Technical Writing", "Content Creation"],
    link: "/blog",
    stats: { views: "3.1k", likes: "201", comments: "34" },
  },
  {
    id: 10,
    title: "Advertisement",
    category: "Graphic Design & Technical Writing",
    description:
      "This project allowed me to designed an intuitive  advertisement fleyer. This project required me to combined my clear design and writings skill to create trustworthy content with effective graphic design to build confidence and trust in personal branding.",
    image:
      "/assets/img/project_(1).jpg",
    tags: ["Graphic design", "UI/UX", "Technical Writing", "Content Creation"],
    link: "/blog",
    stats: { views: "3.1k", likes: "201", comments: "34" },
  },
  {
    id: 11,
    title: "Business Scale FacebookAds",
    category: "Graphic Design ",
    description:
      "This project allowed me to designed an clean and profession social media fleyer for program advert",
    image:
      "/assets/img/project_(7).jpg",
    tags: ["Graphic design", "Technical Writing"],
    link: "/blog",
    stats: { views: "3.1k", likes: "201", comments: "34" },
  },
  {
    id: 12,
    title: "Gydgen",
    category: "Graphic Design & Technical Writing",
    description:
      "Call for Internship social media fleyer for company promotion",
    image:
      "/assets/img/project_ (2).jpg",
    tags: ["Graphic design", "UI/UX", "Technical Writing", "Content Creation"],
    link: "/blog",
    stats: { views: "3.1k", likes: "201", comments: "34" },
  },
];

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
