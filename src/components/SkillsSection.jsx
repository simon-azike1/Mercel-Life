import { Palette, Users, Smartphone, Figma, Eye, Monitor } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {useState} from 'react'

export default function SkillsSection() {
  const skills = [
    { name: "UI Design", level: 95, icon: Palette },
    { name: "UX Research", level: 90, icon: Users },
    { name: "Prototyping", level: 92, icon: Smartphone },
    { name: "Figma", level: 98, icon: Figma },
    { name: "User Testing", level: 88, icon: Eye },
    { name: "Design Systems", level: 94, icon: Monitor },
  ]

  const tools = ["Figma", "Sketch", "Adobe XD", "Principle", "Framer", "InVision", "Miro", "Notion"]

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I combine technical skills with creative thinking to deliver exceptional user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white mr-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                      <p className="text-sm text-gray-600">{skill.level}% Proficiency</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Tools I Use</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => (
              <Badge
                key={tool}
                variant="secondary"
                className="px-4 py-2 text-sm bg-white border border-gray-200 hover:border-purple-300 transition-colors"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
