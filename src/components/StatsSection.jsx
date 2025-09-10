import { TrendingUp, Users, Award, Coffee } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      number: "150%",
      label: "Average Conversion Increase",
      description: "Across all client projects",
    },
    {
      icon: Users,
      number: "50K+",
      label: "Users Impacted",
      description: "Through design improvements",
    },
    {
      icon: Award,
      number: "15+",
      label: "Design Awards",
      description: "Industry recognition",
    },
    {
      icon: Coffee,
      number: "1000+",
      label: "Cups of Coffee",
      description: "Fueling creative sessions",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">Impact by Numbers</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Measurable results that demonstrate the value of great design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <IconComponent className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-green-600 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-700">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
