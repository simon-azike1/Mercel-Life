import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail, HelpCircle, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  const phone = "2349056195484";
  const message = "Hi Mercelina, I would like to schedule a consultation";
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  
  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary depending on scope and complexity. A typical website redesign takes 6-8 weeks, while a mobile app design can take 8-12 weeks. I always provide detailed timelines during our initial consultation with clear milestones and deliverables.",
      category: "Timeline",
      icon: Clock,
      popular: true
    },
    {
      question: "Do you work with development teams?",
      answer: "Absolutely! I have extensive experience collaborating with development teams. I provide detailed design specifications, comprehensive style guides, and organized assets to ensure smooth handoff and pixel-perfect implementation.",
      category: "Collaboration",
      icon: Users,
      popular: true
    },
    {
      question: "What's included in your design process?",
      answer: "My comprehensive process includes discovery and research, strategy and planning, design and prototyping, user testing, and final handoff. Each phase includes specific deliverables, regular check-ins, and collaborative feedback sessions.",
      category: "Process",
      icon: HelpCircle,
      popular: false
    },
    {
      question: "Can you help with existing products?",
      answer: "Yes! I offer UX audits and redesign services for existing products. I can analyze your current design, identify pain points, conduct user research, and provide actionable recommendations for improvement with measurable outcomes.",
      category: "Services",
      icon: HelpCircle,
      popular: false
    },
    {
      question: "Do you provide ongoing support?",
      answer: "I offer various support packages including design system maintenance, performance monitoring, iterative improvements based on user feedback and analytics, and quarterly design reviews to ensure continued success.",
      category: "Support",
      icon: HelpCircle,
      popular: false
    },
    {
      question: "What tools do you use?",
      answer: "I primarily use Figma for design and prototyping, along with Miro for collaboration, Principle for advanced animations, Hotjar for user research, and Google Analytics for performance insights. I'm always adapting to the best tools for each project.",
      category: "Tools",
      icon: HelpCircle,
      popular: true
    },
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-200  mt-45 via-white to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-green-500 to-black rounded-2xl mr-4 shadow-lg">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-black via-green-600 to-black bg-clip-text text-transparent">
              FAQ
            </h2>
          </div>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-green-500 to-black mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Common questions about my design process, timeline, and collaboration approach.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
            <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {Array.from(new Set(faqs.map(faq => faq.category))).map((category, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50 transition-colors cursor-pointer"
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredFAQs.map((faq, index) => {
            const IconComponent = faq.icon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-green-50/50 transition-colors duration-300 group"
                    >
                      <div className="flex items-center flex-1">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-black rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-black group-hover:text-green-600 transition-colors duration-300">
                              {faq.question}
                            </h3>
                            {faq.popular && (
                              <Badge className="bg-green-100 text-green-700 text-xs border-green-200">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-green-600 font-medium">{faq.category}</p>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4"
                      >
                        <ChevronDown className="h-5 w-5 text-green-600" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <div className="border-t border-green-200 pt-4 ml-12">
                              <p className="text-gray-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-r from-green-500 to-black">
            <CardContent className="p-0">
              <div className="relative p-8 text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12" />
                </div>

                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <MessageCircle className="h-8 w-8 mr-3" />
                    <h3 className="text-2xl font-bold">Still Have Questions?</h3>
                  </div>
                  
                  <p className="mb-8 max-w-2xl mx-auto text-green-100 leading-relaxed">
                    Get personalized answers and discuss your project needs. 
                    I'm here to help you make informed decisions about your design journey.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      asChild
                      className="bg-white text-green-600 hover:bg-green-50 border-none shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
                    >
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        <Phone className="h-4 w-4 mr-2" />
                        Schedule a Consultation
                      </a>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-green-600 transition-all duration-300 px-8 py-3"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>

                  <div className="mt-6 text-sm text-green-100">
                    <p>📞 Usually respond within 2 hours • 💬 Free consultation available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
