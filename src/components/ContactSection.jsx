import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, ArrowRight, Send, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/FAQSection";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import MessageAlert from "./MessageAler";
import { useTheme } from './ThemeContext';

export default function ContactSection() {
  const { isDarkMode } = useTheme();
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
    <div className={`
      min-h-screen pt-20 transition-colors duration-300
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-white via-gray-50 to-green-50'
      }
    `}>
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-6"
            >
              <div className={`
                p-4 rounded-full mr-4 transition-colors duration-300
                ${isDarkMode ? 'bg-green-400/20' : 'bg-green-100'}
              `}>
                <MessageCircle className={`h-8 w-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h2 className={`
                text-4xl lg:text-6xl font-bold transition-colors duration-300
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                Let's <span className={`
                  bg-gradient-to-r bg-clip-text text-transparent
                  ${isDarkMode 
                    ? 'from-green-400 via-emerald-300 to-green-300' 
                    : 'from-green-600 via-green-500 to-emerald-600'
                  }
                `}>Connect</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={`
                w-24 h-1 mx-auto rounded-full mb-6 transition-colors duration-300
                ${isDarkMode 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-green-500 to-black'
                }
              `}></div>
              
              <p className={`
                text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300
                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
              `}>
                Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            
            {/* Enhanced Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className={`
                  text-3xl font-bold mb-6 transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <motion.div 
                    className={`
                      flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-105
                      ${isDarkMode 
                        ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700' 
                        : 'bg-white/70 hover:bg-white shadow-md hover:shadow-lg border border-gray-200'
                      }
                    `}
                    whileHover={{ y: -2 }}
                  >
                    <div className={`
                      p-3 rounded-full mr-4 transition-colors duration-300
                      ${isDarkMode ? 'bg-green-400/20' : 'bg-green-100'}
                    `}>
                      <Mail className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Email
                      </p>
                      <a 
                        href="mailto:mercelinaadebisi@gmail.com"
                        className={`
                          font-medium transition-colors duration-300 hover:underline
                          ${isDarkMode ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-green-600'}
                        `}
                      >
                        mercelinaadebisi@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div 
                    className={`
                      flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-105
                      ${isDarkMode 
                        ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700' 
                        : 'bg-white/70 hover:bg-white shadow-md hover:shadow-lg border border-gray-200'
                      }
                    `}
                    whileHover={{ y: -2 }}
                  >
                    <div className={`
                      p-3 rounded-full mr-4 transition-colors duration-300
                      ${isDarkMode ? 'bg-green-400/20' : 'bg-green-100'}
                    `}>
                      <Phone className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Phone
                      </p>
                      <a 
                        href="tel:+2349056195484"
                        className={`
                          font-medium transition-colors duration-300 hover:underline
                          ${isDarkMode ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-green-600'}
                        `}
                      >
                        +234 905 619 5484
                      </a>
                    </div>
                  </motion.div>

                  {/* Location */}
                  <motion.div 
                    className={`
                      flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-105
                      ${isDarkMode 
                        ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700' 
                        : 'bg-white/70 hover:bg-white shadow-md hover:shadow-lg border border-gray-200'
                      }
                    `}
                    whileHover={{ y: -2 }}
                  >
                    <div className={`
                      p-3 rounded-full mr-4 transition-colors duration-300
                      ${isDarkMode ? 'bg-green-400/20' : 'bg-green-100'}
                    `}>
                      <MapPin className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Location
                      </p>
                      <span className={`
                        font-medium transition-colors duration-300
                        ${isDarkMode ? 'text-white' : 'text-gray-900'}
                      `}>
                        Ifeoluwa Estate, Ejioku, Ibadan, Oyo State
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className={`
                  text-xl font-semibold mb-6 transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {[
                    { 
                      href: "https://www.linkedin.com/in/marcelina-adebisi-0393b037a/", 
                      icon: Linkedin, 
                      label: "LinkedIn",
                      color: "hover:text-blue-600"
                    },
                    { 
                      href: "https://www.facebook.com/profile.php?id=61562343710215", 
                      icon: Facebook, 
                      label: "Facebook",
                      color: "hover:text-blue-500"
                    },
                    { 
                      href: "https://www.instagram.com/marcelinaadebisi?igsh=YzljYTk1ODg3Zg==", 
                      icon: Instagram, 
                      label: "Instagram",
                      color: "hover:text-pink-500"
                    }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1
                        ${isDarkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-black/50' 
                          : 'bg-white hover:bg-gray-50 text-gray-600 shadow-gray-300/50'
                        }
                        ${social.color}
                      `}
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <social.icon className="h-6 w-6" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className={`
                p-8 border-none shadow-xl transition-all duration-300
                ${isDarkMode 
                  ? 'bg-gray-800/80 backdrop-blur-sm shadow-black/50 border border-gray-700' 
                  : 'bg-white/80 backdrop-blur-sm shadow-gray-300/50'
                }
              `}>
                <CardContent className="p-0">
                  <div className="mb-6">
                    <h3 className={`
                      text-2xl font-bold transition-colors duration-300
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}
                    `}>
                      Send me a message
                    </h3>
                    <p className={`
                      mt-2 transition-colors duration-300
                      ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      I'll get back to you within 24 hours
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`
                          block text-sm font-medium mb-2 transition-colors duration-300
                          ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                        `}>
                          First Name
                        </label>
                        <input 
                          type="text" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleChange} 
                          className={`
                            w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent
                            ${isDarkMode 
                              ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-green-400/50 focus:bg-gray-600' 
                              : 'bg-white border border-gray-300 text-gray-900 focus:ring-green-500'
                            }
                          `}
                          placeholder="John" 
                          required 
                        />
                      </div>
                      <div>
                        <label className={`
                          block text-sm font-medium mb-2 transition-colors duration-300
                          ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                        `}>
                          Last Name
                        </label>
                        <input 
                          type="text" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleChange} 
                          className={`
                            w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent
                            ${isDarkMode 
                              ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-green-400/50 focus:bg-gray-600' 
                              : 'bg-white border border-gray-300 text-gray-900 focus:ring-green-500'
                            }
                          `}
                          placeholder="Doe" 
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`
                        block text-sm font-medium mb-2 transition-colors duration-300
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                      `}>
                        Email
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className={`
                          w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent
                          ${isDarkMode 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-green-400/50 focus:bg-gray-600' 
                            : 'bg-white border border-gray-300 text-gray-900 focus:ring-green-500'
                          }
                        `}
                        placeholder="john@example.com" 
                        required 
                      />
                    </div>

                    <div>
                      <label className={`
                        block text-sm font-medium mb-2 transition-colors duration-300
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                      `}>
                        Project Type
                      </label>
                      <select 
                        name="projectType" 
                        value={formData.projectType} 
                        onChange={handleChange} 
                        className={`
                          w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent
                          ${isDarkMode 
                            ? 'bg-gray-700 border border-gray-600 text-white focus:ring-green-400/50 focus:bg-gray-600' 
                            : 'bg-white border border-gray-300 text-gray-900 focus:ring-green-500'
                          }
                        `}
                        required
                      >
                        <option value="">Select a project type</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Tell your Product Story">Tell your Product Story</option>
                        <option value="Design System">Design System</option>
                        <option value="UI/UX Research">UI/UX Research</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className={`
                        block text-sm font-medium mb-2 transition-colors duration-300
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                      `}>
                        Message
                      </label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        value={formData.message} 
                        onChange={handleChange} 
                        className={`
                          w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent resize-none
                          ${isDarkMode 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-green-400/50 focus:bg-gray-600' 
                            : 'bg-white border border-gray-300 text-gray-900 focus:ring-green-500'
                          }
                        `}
                        placeholder="Tell me about your project..." 
                        required
                      ></textarea>
                    </div>

                    <Button 
                      type="submit" 
                      className={`
                        w-full py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4
                        ${isDarkMode
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg hover:shadow-xl focus:ring-green-400/20'
                          : 'bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-gray-900 text-white shadow-lg hover:shadow-xl focus:ring-green-500/20'
                        }
                      `}
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {/* Status Messages */}
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
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* FAQ Section with Theme Support */}
          <div className="mt-20">
            {/* <FAQSection /> */}
          </div>
        </div>
        <FAQSection isDarkMode={isDarkMode} />
      </section>
    </div>
  );
}
