import  { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion,easeIn} from "framer-motion";

export default function FAQSection() {
const [openFAQ, setOpenFAQ] = useState(0);
 const phone = "2349056195484"; // Mercelina's number without the "+"
 const message = "Hi Mercelina, I would like to schedule a consultation";
 const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer:
        "Project timelines vary depending on scope and complexity. A typical website redesign takes 6-8 weeks, while a mobile app design can take 8-12 weeks. I always provide detailed timelines during our initial consultation.",
    },
    {
      question: "Do you work with development teams?",
      answer:
        "I have extensive experience collaborating with development teams. I provide detailed design specifications, style guides, and assets to ensure smooth handoff and implementation.",
    },
    {
      question: "What's included in your design process?",
      answer:
        "My process includes discovery and research, strategy and planning, design and prototyping, user testing, and final handoff. Each phase includes specific deliverables and client collaboration points.",
    },
    {
      question: "Can you help with existing products?",
      answer:
        "Yes! I offer UX audits and redesign services for existing products. I can analyze your current design, identify pain points, and provide recommendations for improvement.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "I offer various support packages including design system maintenance, performance monitoring, and iterative improvements based on user feedback and analytics.",
    },
    {
      question: "What tools do you use?",
      answer:
        "I primarily use Figma for design and prototyping, along with tools like Miro for collaboration, Principle for advanced animations, and various research tools for user testing and analytics.",
    },
   
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <motion.div
    initial={{opacity:0, y:0}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:1, ease:"easeIn" ,delay:0.3}}
    viewport={{onece:true}}
    
    >
 <section  className="py-20 bg-gray-300 rounded-2xl mt-15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Common questions about my design process, timeline, and collaboration approach.
          </p>
        </div>

        <div className="space-y-4 ">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden border-none ">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still have questions CTA */}
       <div className="mt-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
  <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
  <p className="mb-6 max-w-2xl mx-auto text-purple-100">
    Get the latest insights on UX design, industry trends, and practical tips delivered straight to your inbox.
  </p>
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-3 rounded-lg hover:from-purple-500 hover:to-pink-500 transition">
      Schedule a Consultation
    </button>
  </a>
</div>

      </div>
    </section>
    </motion.div>
   
  );
}
