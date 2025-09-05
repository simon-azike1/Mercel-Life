import { Search, Lightbulb, Palette, TestTube, Rocket, Users } from "lucide-react"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"

export default function ProcessSection() {
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Research",
      description:
        "Understanding your business goals, target audience, and project requirements through comprehensive research.",
      icon: Search,
      duration: "1-2 weeks",
      deliverables: ["Project Brief", "User Research", "Competitive Analysis", "Requirements Document"],
    },
    {
      step: "02",
      title: "Strategy & Planning",
      description: "Developing a strategic approach based on research insights and defining the project roadmap.",
      icon: Lightbulb,
      duration: "1 week",
      deliverables: ["Design Strategy", "User Personas", "User Journey Maps", "Project Timeline"],
    },
    {
      step: "03",
      title: "Design & Prototyping",
      description: "Creating wireframes, visual designs, and interactive prototypes to bring ideas to life.",
      icon: Palette,
      duration: "2-4 weeks",
      deliverables: ["Wireframes", "Visual Designs", "Interactive Prototypes", "Design System"],
    },
    {
      step: "04",
      title: "Testing & Iteration",
      description: "Validating designs through user testing and iterating based on feedback and insights.",
      icon: TestTube,
      duration: "1-2 weeks",
      deliverables: ["Usability Testing", "Test Results", "Design Iterations", "Final Recommendations"],
    },
    {
      step: "05",
      title: "Handoff & Launch",
      description: "Preparing final assets and documentation for development team and supporting the launch.",
      icon: Rocket,
      duration: "1 week",
      deliverables: ["Design Specs", "Asset Library", "Style Guide", "Developer Handoff"],
    },
    {
      step: "06",
      title: "Support & Optimization",
      description: "Ongoing support and optimization based on real user data and feedback post-launch.",
      icon: Users,
      duration: "Ongoing",
      deliverables: ["Performance Analysis", "User Feedback", "Design Updates", "Optimization Reports"],
    },
  ]

  return (
    <section id="process" className="py-20 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">My Design Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven methodology that ensures successful outcomes through structured collaboration and iteration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group border-none bg-gray-100"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>

                <CardContent className="p-0 relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl font-bold text-purple-600 mr-4">{step.step}</div>
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-purple-600 mb-2">Duration: {step.duration}</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Key Deliverables:</div>
                    <div className="space-y-1">
                      {step.deliverables.map((deliverable, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></div>
                          {deliverable}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Process Timeline */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Typical Project Timeline</h3>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">6-12</div>
              <div className="text-sm text-gray-600">Weeks Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3-5</div>
              <div className="text-sm text-gray-600">Review Cycles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Communication</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
