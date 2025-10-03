import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Simon Azike",
      role: "Software Engineer",
      content: "Working with Mercelina has been incredible. Her attention to detail and user-centered approach has transformed our product experience. The designs are not just beautiful, but incredibly functional.",
      avatar: "/assets/img/simon.jpg",
      rating: 5,
      company: "SamzikTech",
      project: "E-commerce Platform",
      duration: "3 months",
      impact: "+40% conversion rate"
    },
    {
      name: "DevQuat",
      role: "Full Stack Developer",
      content: "Mercelina delivered exceptional designs that not only looked great but also improved our conversion rates significantly. Her collaborative approach made the entire process seamless.",
      avatar: "/assets/img/quadri.png",
      rating: 5,
      company: "Frontend Simplify",
      project: "SaaS Dashboard",
      duration: "2 months",
      impact: "+60% user engagement"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content: "The design system Mercelina created has streamlined our entire design process. Her strategic thinking and execution are top-notch. Highly recommend her expertise.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      company: "Creative Agency",
      project: "Design System",
      duration: "4 months",
      impact: "+50% team efficiency"
    },
  ];

  const stats = [
    { label: "Happy Clients", value: "50+", icon: Users },
    { label: "Projects Completed", value: "120+", icon: Award },
    { label: "Success Rate", value: "98%", icon: TrendingUp },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
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
              <Quote className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-600 to-black bg-clip-text text-transparent">
              Client Stories
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
            Real feedback from clients and colleagues who've experienced the impact of thoughtful design and strategic collaboration.
          </p> */}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-black rounded-2xl mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Avatar and Info */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <div className="relative">
                      <img
                        src={testimonials[activeTestimonial].avatar || "/placeholder.svg"}
                        alt={testimonials[activeTestimonial].name}
                        className="w-24 h-24 rounded-full mx-auto md:mx-0 shadow-lg border-4 border-white"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                        <Quote className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-xl font-bold text-gray-900">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-green-600 font-medium">{testimonials[activeTestimonial].role}</p>
                      <Badge variant="outline" className="mt-2 border-green-200 text-green-700">
                        {testimonials[activeTestimonial].company}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-gray-800 leading-relaxed mb-6 italic">
                      "{testimonials[activeTestimonial].content}"
                    </blockquote>
                    
                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="font-medium text-gray-900">Project</div>
                        <div className="text-gray-600">{testimonials[activeTestimonial].project}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="font-medium text-gray-900">Duration</div>
                        <div className="text-gray-600">{testimonials[activeTestimonial].duration}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="font-medium text-gray-900">Impact</div>
                        <div className="text-green-600 font-medium">{testimonials[activeTestimonial].impact}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full p-3 border-green-200 hover:bg-green-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-green-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full p-3 border-green-200 hover:bg-green-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="h-full bg-white/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <Quote className="h-6 w-6 text-green-500 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed flex-grow italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-green-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Client Logos */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted by Amazing Companies</h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {["SamzikTech", "Frontend Simplify", "Creative Agency", "BuildLabs", "DesignCorp", "TechFlow"].map(
              (company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <span className="text-gray-700 font-semibold group-hover:text-green-600 transition-colors">
                    {company}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
