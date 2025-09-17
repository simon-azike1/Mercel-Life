import React from "react";
import { GraduationCap, Award, Book } from "lucide-react";
import {motion } from 'framer-motion'

export default function EducationSection() {
  const education = [
    {
      institution: "University of Ilorin",
      degree: "Bachelor of Library and Information Science",
      duration: "2022 - 2025",
      description:
        "Studied Library and Information Science with a focus on organizing, managing, and disseminating information. Developed skills in research, digital resource management, and information systems.",
      icon: <GraduationCap className="h-6 w-6 text-green-600" />,
      image: "https://cdn.guardian.ng/wp-content/uploads/2020/03/Unilorin-1.jpg",
    },
    {
      institution: "Graduation Ceremony",
      degree: "B.L.I.S Graduation",
      duration: "2024-2025",
      description:
        "Successfully graduated with a Bachelor of Library and Information Science, marking the culmination of academic and practical training in the field of information management.",
      icon: <Award className="h-6 w-6 text-green-600" />,
      image: "./assets/img/grad_1.png",
    },
    {
      degree: "Final Year Project",
      description:
        "Investigated and analyzed the Library and Information Science curriculum to identify opportunities for improving job readiness and employability for graduates.",
      institution: "University of Ilorin",
      duration: "2024-2025",
      image: "https://images.pexels.com/photos/669621/pexels-photo-669621.jpeg",
      icon: <Book className="h-6 w-6 text-green-600" />,
    },
  ];

  return (
   
  <motion.div 
  initial={{opacity:0,y:20}}
  transition={{duration:0.6, ease:"easeInOut"}}
  viewport={{once:true, amount:0.5}}
  whileInView={{opacity:1, y:0}}>

<section className="py-20 bg-white mt-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Education
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Mercelina’s academic background provides a strong foundation for her creative and analytical work in design and writing.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full bg-green-50"
            >
              {/* University Image */}
              {edu.image && (
                <img
                  src={edu.image}
                  alt={`${edu.institution} logo`}
                  className="w-full h-52 object-contain mb-4 mx-auto rounded-2xl"
                />
              )}

              <div className="flex items-center justify-center mb-4">
                {edu.icon}
                <h3 className="ml-3 text-xl font-semibold text-black">{edu.institution}</h3>
              </div>
              <p className="text-black font-medium mb-2 text-center">{edu.degree}</p>
              <p className="text-gray-700 mb-4 text-center">{edu.duration}</p>
              <p className="text-gray-700 flex-grow">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </motion.div>
   
   
   
  );
}
