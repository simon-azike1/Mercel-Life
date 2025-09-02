import {  useState} from "react";
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechFlow",
      content:
        "Working with Alex has been incredible. Their attention to detail and user-centered approach has transformed our product experience.",
      avatar: "/placeholder.svg?height=60&width=60&text=SJ",
      rating: 5,
      company: "TechFlow Inc.",
    },
    {
      name: "Michael Chen",
      role: "CEO at StartupXYZ",
      content:
        "Alex delivered exceptional designs that not only looked great but also improved our conversion rates significantly.",
      avatar: "/placeholder.svg?height=60&width=60&text=MC",
      rating: 5,
      company: "StartupXYZ",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content:
        "The design system Alex created has streamlined our entire design process. Highly recommend their expertise.",
      avatar: "/placeholder.svg?height=60&width=60&text=ER",
      rating: 5,
      company: "Creative Agency",
    },
    {
      name: "David Kim",
      role: "Frontend Developer",
      content:
        "Alex's designs are not only beautiful but also developer-friendly. The handoff process was seamless and well-documented.",
      avatar: "/placeholder.svg?height=60&width=60&text=DK",
      rating: 5,
      company: "Dev Solutions",
    },
    {
      name: "Lisa Wang",
      role: "UX Researcher",
      content:
        "Alex's research-driven approach to design is impressive. They truly understand user needs and translate them into great experiences.",
      avatar: "/placeholder.svg?height=60&width=60&text=LW",
      rating: 5,
      company: "Research Lab",
    },
    {
      name: "James Wilson",
      role: "Startup Founder",
      content:
        "From concept to launch, Alex guided our design process expertly. Our app's user engagement increased by 60% after the redesign.",
      avatar: "/placeholder.svg?height=60&width=60&text=JW",
      rating: 5,
      company: "InnovateCorp",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What People Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Feedback from clients and colleagues I've had the pleasure to work with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 relative">
              <CardContent className="p-0">
                <Quote className="h-8 w-8 text-purple-500 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-purple-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-8">Trusted by amazing companies</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["TechFlow", "StartupXYZ", "Creative Agency", "Dev Solutions", "Research Lab", "InnovateCorp"].map(
              (company, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:opacity-100 transition-opacity"
                >
                  {company}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
