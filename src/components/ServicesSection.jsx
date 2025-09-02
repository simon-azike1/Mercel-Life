import { Palette, Users, Smartphone, Monitor, Search, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {useState} from 'react'

export default function ServicesSection() {
  const services = [
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Creating beautiful and intuitive user interfaces that enhance user experience and drive engagement.",
      features: ["User Interface Design", "Visual Design", "Design Systems", "Brand Integration"],
      price: "Starting at $2,500",
    },
    {
      icon: Users,
      title: "User Research",
      description: "In-depth user research to understand your audience and inform design decisions with data.",
      features: ["User Interviews", "Usability Testing", "Persona Development", "Journey Mapping"],
      price: "Starting at $1,800",
    },
    {
      icon: Smartphone,
      title: "Mobile App Design",
      description: "Native and responsive mobile app designs optimized for iOS and Android platforms.",
      features: ["iOS Design", "Android Design", "Responsive Design", "App Store Assets"],
      price: "Starting at $3,200",
    },
    {
      icon: Monitor,
      title: "Web Design",
      description: "Modern, responsive websites that look great on all devices and convert visitors into customers.",
      features: ["Responsive Design", "Landing Pages", "E-commerce Design", "CMS Integration"],
      price: "Starting at $2,800",
    },
    {
      icon: Search,
      title: "UX Audit",
      description: "Comprehensive analysis of your existing product to identify usability issues and opportunities.",
      features: ["Heuristic Evaluation", "Accessibility Audit", "Performance Analysis", "Recommendations"],
      price: "Starting at $1,200",
    },
    {
      icon: Zap,
      title: "Design Sprint",
      description: "Fast-track your product development with a structured 5-day design sprint process.",
      features: ["Problem Definition", "Ideation Workshop", "Prototyping", "User Testing"],
      price: "Starting at $4,500",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive design services to help bring your digital products to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white"
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white mr-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-sm text-purple-600 font-medium">{service.price}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Every project is unique. Let's discuss your specific needs and create a tailored solution that fits your
            budget and timeline.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">Schedule a Consultation</Button>
        </div>
      </div>
    </section>
  )
}
