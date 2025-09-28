import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { useInView } from "react-intersection-observer";
import SkillsSection from "./SkillsSection";
import TestimonialsSection from "./TestimonialsSection";
import EducationSection from "./EducationSection";

export default function AboutSection() {
  const stats = [
    { number: 12, suffix: "+", label: "Projects Completed" },
    { number: 2, suffix: "+", label: "Years Experience" },
    { number: 5, suffix: "+", label: "Happy Clients" },
    { number: 1, suffix: "", label: "Design Awards" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);

  useEffect(() => {
    if (!animate) return;
    const duration = 1500;
    const intervalTime = 30;

    stats.forEach((stat, index) => {
      let start = 0;
      const increment = Math.ceil(stat.number / (duration / intervalTime));
      const counter = setInterval(() => {
        start += increment;
        if (start >= stat.number) {
          start = stat.number;
          clearInterval(counter);
        }
        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = start;
          return updated;
        });
      }, intervalTime);
    });
  }, [animate]);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        ></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div
            ref={ref}
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-lg text-gray-800 leading-relaxed">
              My journey in design started with a fascination for how people interact with technology. I believe that
              great design is invisible – it just works, feels natural, and solves real problems.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              I specialize in user research, interaction design, and creating design systems that scale. My approach
              combines analytical thinking with creative problem-solving to deliver designs that are both beautiful and
              functional.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              When I'm not designing, you can find me exploring new coffee shops, reading about psychology, or
              experimenting with new design tools and techniques.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat, index) => (
                <article
                  key={stat.label}
                  className={`text-center transition-all duration-1000 delay-${
                    200 + index * 100
                  } ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {counts[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-700">{stat.label}</div>
                </article>
              ))}
            </div>
          </div>

          {/* Image and Award */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <img
              src="/assets/img/grad_2.jpg"
              alt="Mercelina working on design"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-green-500 to-black rounded-2xl p-6 text-white shadow-xl">
              <Award className="h-8 w-8 mb-2" />
              <div className="text-sm font-medium">Design Award Winner</div>
              {/* <div className="text-xs opacity-90">Best UX Design 2023</div> */}
            </div>
          </div>
        </div>
      </div>
      <EducationSection />
      <SkillsSection />
      <TestimonialsSection />
    </section>
  );
}
