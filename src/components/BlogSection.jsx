import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of UX Design: Trends to Watch in 2024",
      excerpt:
        "Exploring the emerging trends that will shape user experience design in the coming year, from AI integration to sustainable design practices.",
      image: "https://unsplash.it/400/250?image=1011",
      category: "Design Trends",
      readTime: "8 min read",
      publishDate: "Dec 15, 2023",
      tags: ["UX Design", "Trends", "Future"],
      featured: true,
    },
    {
      id: 2,
      title: "Building Accessible Design Systems at Scale",
      excerpt:
        "A comprehensive guide to creating design systems that prioritize accessibility from the ground up, ensuring inclusive experiences for all users.",
      image: "https://unsplash.it/400/250?image=1022",
      category: "Accessibility",
      readTime: "12 min read",
      publishDate: "Dec 8, 2023",
      tags: ["Accessibility", "Design Systems", "Inclusive Design"],
      featured: false,
    },
    {
      id: 3,
      title: "User Research Methods That Actually Work",
      excerpt:
        "Practical insights into conducting effective user research, from guerrilla testing to comprehensive usability studies.",
      image: "https://unsplash.it/400/250?image=1033",
      category: "Research",
      readTime: "10 min read",
      publishDate: "Nov 28, 2023",
      tags: ["User Research", "Methods", "Testing"],
      featured: false,
    },
    {
      id: 4,
      title: "From Wireframes to Prototypes: My Design Process",
      excerpt:
        "A behind-the-scenes look at my design process, from initial concepts to high-fidelity prototypes and user testing.",
      image: "https://unsplash.it/400/250?image=1044",
      category: "Process",
      readTime: "6 min read",
      publishDate: "Nov 20, 2023",
      tags: ["Design Process", "Wireframes", "Prototyping"],
      featured: false,
    },
    {
      id: 5,
      title: "The Psychology Behind Great Interface Design",
      excerpt:
        "Understanding cognitive psychology principles and how they apply to creating intuitive and engaging user interfaces.",
      image: "https://unsplash.it/400/250?image=1055",
      category: "Psychology",
      readTime: "9 min read",
      publishDate: "Nov 12, 2023",
      tags: ["Psychology", "UI Design", "Cognitive Science"],
      featured: false,
    },
    {
      id: 6,
      title: "Mobile-First Design: Best Practices for 2024",
      excerpt:
        "Essential strategies for designing mobile-first experiences that work seamlessly across all device sizes and contexts.",
      image: "https://unsplash.it/400/250?image=1066",
      category: "Mobile Design",
      readTime: "7 min read",
      publishDate: "Nov 5, 2023",
      tags: ["Mobile Design", "Responsive", "Best Practices"],
      featured: false,
    },
  ];

  const categories = [
    { name: "All Posts", count: 24, icon: BookOpen },
    { name: "Design Trends", count: 8, icon: TrendingUp },
    { name: "User Research", count: 6, icon: Users },
    { name: "Accessibility", count: 4, icon: Users },
    { name: "Process", count: 6, icon: BookOpen },
  ];

  return (
    <section id="blog" className="py-20 bg-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Blog & Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sharing my thoughts on design, user experience, and the latest trends in the industry.
          </p>
        </div>

        {/* Blog Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  index === 0
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "border-purple-200 text-purple-600 hover:bg-purple-50"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>

        {/* Featured Post */}
        {blogPosts.filter((post) => post.featured).map((post) => (
          <Card key={post.id} className="mb-12 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Featured</Badge>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.publishDate}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-purple-600 transition-colors cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white self-start">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}

        {/* Regular Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter((post) => !post.featured).map((post) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.publishDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors cursor-pointer line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full text-purple-600 hover:bg-purple-50 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 bg-transparent"
          >
            Load More Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Get the latest insights on UX design, industry trends, and practical tips delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3">Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
