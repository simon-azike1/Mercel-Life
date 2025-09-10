import { Palette, Users, Smartphone, Monitor, Search, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ServicesSection() {
  const phone = "2349056195484";
  const message = "Hi Mercelina, I would like to schedule a consultation";
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const services = [
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Designing intuitive and visually stunning interfaces paired with clear, engaging microcopy that guides users seamlessly through your product.",
      features: ["User Interface Design", "Visual Design", "Design Systems", "Brand Messaging"],
      price: "Starting at $500",
    },
    {
      icon: Users,
      title: "Graphic Design & Storytelling",
      description:
        "Creating captivating graphics and brand narratives that not only capture attention but also tell your story in a way your audience connects with.",
      features: ["Brand Identity Design", "Illustrations", "Content-Driven Graphics", "Visual Storytelling"],
      price: "Starting at $350",
    },
    {
      icon: Smartphone,
      title: "Mobile App Design",
      description:
        "Building responsive mobile experiences with visuals and copy that work hand in hand to deliver clarity, usability, and emotional connection.",
      features: ["iOS Design", "Android Design", "UX Writing", "App Store Assets"],
      price: "Starting at $600",
    },
    {
      icon: Monitor,
      title: "Web Design & Content",
      description:
        "Designing modern, responsive websites that combine strong visuals with compelling content, ensuring your brand identity is consistent and impactful.",
      features: ["Responsive Design", "Landing Pages", "Content Strategy", "E-commerce Design"],
      price: "Starting at $550",
    },
    {
      icon: Search,
      title: "UX Audit & Content Review",
      description:
        "Analyzing both design and content to uncover usability gaps, accessibility issues, and messaging improvements for a balanced user experience.",
      features: ["Heuristic Evaluation", "Accessibility Audit", "Content Clarity Review", "Actionable Recommendations"],
      price: "Starting at $300",
    },
    {
      icon: Zap,
      title: "Design Sprint & Content Strategy",
      description:
        "Fast-tracking product ideas with a 5-day sprint that blends design prototyping and strategic content creation for well-rounded results.",
      features: ["Problem Definition", "Ideation Workshop", "Prototyping", "Content Mapping"],
      price: "Starting at $700",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive design and product storytelling solutions crafted to bring your digital products to life with clarity and impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white"
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-600 to-black rounded-lg text-white mr-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-sm text-green-600 font-medium">{service.price}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-black rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-gray-900 text-white">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-green-600 to-black rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Every project is unique. Let's discuss your specific needs and create a tailored solution that fits your budget and timeline.
          </p>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-green-600 hover:cursor-pointer hover:bg-gray-100 px-8 py-3">
              Schedule a Consultation
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
