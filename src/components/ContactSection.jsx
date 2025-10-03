import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/FAQSection";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import MessageAlert from "./MessageAler";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // "sending", "success", "error"

  emailjs.init("xL6_CntdprOU1DvCJ");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      project_type: formData.projectType,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send("service_ayjos7k", "template_rg09fy2", templateParams);
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        projectType: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }

    // Hide the message after 5 seconds
    setTimeout(() => setStatus(""), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-white via-gray-200 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">Let's Work Together</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
          </p> */}
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center"><Mail className="h-6 w-6 text-green-600 mr-4" /> <span className="text-gray-700">mercelinaadebisi@gmail.com</span></div>
                <div className="flex items-center"><Phone className="h-6 w-6 text-green-600 mr-4" /> <span className="text-gray-700">+234 905 619 5484</span></div>
                <div className="flex items-center"><MapPin className="h-6 w-6 text-green-600 mr-4" /> <span className="text-gray-700">Ifeoluwa Estate, Ejioku, Ibadan, Oyo State</span></div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-black mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/marcelina-adebisi-0393b037a/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-600 hover:text-green-600"><Linkedin className="h-6 w-6" /></a>
                <a href="https://www.facebook.com/profile.php?id=61562343710215" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-600 hover:text-green-600"><Facebook className="h-6 w-6" /></a>
                <a href="https://www.instagram.com/marcelinaadebisi?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-600 hover:text-green-600"><Instagram className="h-6 w-6" /></a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="p-8 border-none shadow-lg bg-white">
              <CardContent className="p-0">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="John" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="Doe" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="john@example.com" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                    <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-4 py-3 border-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" required>
                      <option value="">Select a project type</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Tell your Product Story">Tell your Product Story</option>
                      <option value="Design System">Design System</option>
                      <option value="UI/UX Research">UI/UX Research</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none" placeholder="Tell me about your project..." required></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-black text-white py-3 text-lg" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send Message"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                 {status === "success" && (
  <MessageAlert
    type="success"
    message="Your message has been sent successfully! We'll get back to you soon."
    onClose={() => setStatus("")}
  />
)}

{status === "error" && (
  <MessageAlert
    type="error"
    message="Oops! Something went wrong. Please try again later."
    onClose={() => setStatus("")}
  />
)}
                  {status === "error" && <p className="mt-4 text-red-600 font-semibold">Failed to send message. Please try again.</p>}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </section>
  );
}
