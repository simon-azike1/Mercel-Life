import {useRef} from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download,Eye } from "lucide-react";
import { Figma, Code, Monitor, PenTool, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillsSection from "./SkillsSection";
import Portfolio from './PortfolioSection'
import FaqSection from './FAQSection'
import TestimonialsSection from "./TestimonialsSection";


const tools = [
  { name: "Figma", icon: Figma },
  { name: "Adobe XD", icon: PenTool },
  { name: "Sketch", icon: Image },
  { name: "Photoshop", icon: Image },
  { name: "Illustrator", icon: Image },

];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({behavior:"smooth"});
  };


  return (
    <>
    <motion.div
   initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeIn", delay: 0.3 }}
  viewport={{ once: true }}

  

    >
        {/* Hero Section */}
 <section id="home" className="pt-16 min-h-screen flex items-center   bg-gray-200" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Mercelina Kehinde
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 font-medium">
                  Graphic Designer, UI/UX Designer & Writer Crafting visually stunning digital experiences and compelling storie
                  </p>
                  <p className="text-lg text-gray-500 max-w-lg">
                      I create captivating graphics, design intuitive user interfaces, and produce content that resonates. 
                       Whether it’s shaping a brand’s visual identity or telling its story, I help businesses engage their audience 
                      and achieve meaningful results. Let’s build something extraordinary together.
                      </p>
              </div>
<div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-center">
  {/* View My Work */}
  <Button
    onClick={() => scrollToSection("portfolio")}
    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
  >
    View My Work
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>

  {/* View Resume */}
  <a
    href="/assets/Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full sm:w-auto"
  >
    <Button
      variant="outline"
      className="w-full sm:w-auto border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg bg-transparent"
    >
      <Eye className="mr-2 h-7 w-8" />
      View
    </Button>
  </a>

  {/* Download Resume */}
  <a
    href="/assets/Resume.pdf"
    download="Resume.pdf"
    className="w-full sm:w-auto"
  >
    <Button
      variant="outline"
      className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg bg-transparent"
    >
      <Download className="mr-2 h-5 w-5" /> Resume
    </Button>
  </a>
</div>


            </div>

            <div className="relative">
              <div className="relative z-10  flex justify-center">
                <img
                  src="/assets/img/bg_24.jpg"
                  alt="Hero"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
    
     

      {/* Skills Section */}
      <SkillsSection />
      <Portfolio ref={sectionRef} />

      {/* Tools I Use Section */}
      <section id="tools" className="py-20 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
            Tools I Use
          </h2>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 rounded-xl bg-gray-200 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Icon className="h-12 w-12 text-purple-600 mb-2" />
                  <span className="text-gray-800 font-semibold">{tool.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
          <TestimonialsSection/>
          <FaqSection/>
        </div>
      </section>
    </>
  );
}
