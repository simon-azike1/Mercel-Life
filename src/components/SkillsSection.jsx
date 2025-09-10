import { Palette, Users, Smartphone, Figma, Eye, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function SkillsSection() {
  const skills = [
    { name: "UI Design", level: 95, icon: Palette },
    { name: "UX Research", level: 90, icon: Users },
    { name: "Prototyping", level: 92, icon: Smartphone },
    { name: "Figma", level: 98, icon: Figma },
    { name: "User Testing", level: 88, icon: Eye },
    { name: "Design Systems", level: 94, icon: Monitor },
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I combine technical skills with creative thinking to deliver exceptional user experiences.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transform transition-transform duration-300 border border-gray-100 hover:scale-105">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {/* Icon with green theme */}
                      <div className="p-3 bg-gradient-to-br from-green-600 to-black rounded-lg text-white mr-4">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {skill.level}% Proficiency
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-600 to-black h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
