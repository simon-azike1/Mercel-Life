import { useState } from "react";
import { Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ExperienceSection() {
  const experiences = [
    {
      year: "2023 - Present",
      title: "Senior UX Designer",
      company: "TechFlow Inc.",
      description:
        "Leading design initiatives for multiple product lines, mentoring junior designers, and establishing design systems.",
      achievements: ["Increased user engagement by 40%", "Led team of 5 designers", "Launched 3 major products"],
    },
    {
      year: "2021 - 2023",
      title: "UX Designer",
      company: "Digital Solutions Co.",
      description:
        "Designed user experiences for web and mobile applications, conducted user research and usability testing.",
      achievements: ["Improved conversion rate by 25%", "Conducted 50+ user interviews", "Redesigned core platform"],
    },
    {
      year: "2019 - 2021",
      title: "Junior UI Designer",
      company: "Creative Studio",
      description: "Created visual designs for various clients, developed brand identities and marketing materials.",
      achievements: ["Designed for 20+ clients", "Won design award", "Increased client satisfaction by 30%"],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">Experience</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            My professional journey and the impact I've made along the way.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-black rounded-full"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-none bg-white">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-600">{exp.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-1">{exp.title}</h3>
                    <p className="text-green-600 font-medium mb-3">{exp.company}</p>
                    <p className="text-gray-700 mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-700">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-green-500 to-black rounded-full border-4 border-white shadow-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
