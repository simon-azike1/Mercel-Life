import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechFlow",
      content:
        "Working with Mercelina has been incredible. Her attention to detail and user-centered approach has transformed our product experience.",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      rating: 5,
      company: "TechFlow Inc.",
    },
    {
      name: "Michael Chen",
      role: "CEO at StartupXYZ",
      content:
        "Mercelina delivered exceptional designs that not only looked great but also improved our conversion rates significantly.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      company: "StartupXYZ",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content:
        "The design system Mercelina created has streamlined our entire design process. Highly recommend her expertise.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      company: "Creative Agency",
    },
    {
      name: "David Kim",
      role: "Frontend Developer",
      content:
        "Mercelina's designs are not only beautiful but also developer-friendly. The handoff process was seamless and well-documented.",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      rating: 5,
      company: "Dev Solutions",
    },
    {
      name: "Lisa Wang",
      role: "UX Researcher",
      content:
        "Mercelina's research-driven approach to design is impressive. She truly understands user needs and translates them into great experiences.",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
      rating: 5,
      company: "Research Lab",
    },
    {
      name: "James Wilson",
      role: "Startup Founder",
      content:
        "From concept to launch, Mercelina guided our design process expertly. Our app's user engagement increased by 60% after the redesign.",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
      rating: 5,
      company: "InnovateCorp",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeIn", delay: 0.3 }}
    >
      <section id="testimonials" className="py-20 bg-white mt-23">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">What People Say</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Feedback from clients and colleagues I've had the pleasure to work with.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 bg-white hover:shadow-lg transform transition-transform duration-300 hover:scale-105 relative border-none hover:cursor-pointer"
              >
                <CardContent className="p-0">
                  <Quote className="h-8 w-8 text-green-600 mb-4" />
                  <p className="text-gray-800 mb-6 leading-relaxed">"{testimonial.content}"</p>

                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-black">{testimonial.name}</h4>
                      <p className="text-sm text-gray-700">{testimonial.role}</p>
                      <p className="text-xs text-green-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-green-500 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Client Logos */}
          <div className="mt-16 text-center">
            <h3 className="text-lg font-semibold text-black mb-8">Trusted by amazing companies</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {["SamzikTech", "DevQuat", "Digital Dev", "BuildLabs"].map(
                (company, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 bg-gray-200 rounded-lg text-black font-medium hover:opacity-100 transition  hover:cursor-pointer"
                  >
                    {company}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
