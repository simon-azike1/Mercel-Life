import {useState} from "react"

import { Award } from "lucide-react"

export default function AboutSection() {
  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "5+", label: "Years Experience" },
    { number: "25+", label: "Happy Clients" },
    { number: "3", label: "Design Awards" },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm a passionate UX/UI designer with 5+ years of experience creating digital experiences that make a
            difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              My journey in design started with a fascination for how people interact with technology. I believe that
              great design is invisible – it just works, feels natural, and solves real problems.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              I specialize in user research, interaction design, and creating design systems that scale. My approach
              combines analytical thinking with creative problem-solving to deliver designs that are both beautiful and
              functional.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When I'm not designing, you can find me exploring new coffee shops, reading about psychology, or
              experimenting with new design tools and techniques.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/assets/img/bg__23.PNG"
              alt="About Mercelina"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
              <Award className="h-8 w-8 mb-2" />
              <div className="text-sm font-medium">Design Award Winner</div>
              <div className="text-xs opacity-90">Best UX Design 2023</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
