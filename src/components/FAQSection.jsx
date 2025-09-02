import  { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(0);

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
    {
      question: "How do you handle revisions?",
      answer:
        "Each project includes a set number of revision rounds built into the timeline. I encourage feedback at each milestone to ensure we're aligned before moving to the next phase.",
    },
    {
      question: "What information do you need to get started?",
      answer:
        "I'll need details about your project goals, target audience, timeline, budget, and any existing brand guidelines or research. We'll cover everything in our initial consultation.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Common questions about my design process, timeline, and collaboration approach.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
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
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-purple-100 mb-6">
            I'm here to help! Schedule a free consultation to discuss your project and get all your questions answered.
          </p>
          <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
