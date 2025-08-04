import { motion } from 'framer-motion'
import { Camera, Users, Heart, Building } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: <Camera className="w-12 h-12" />,
      title: "Portrait Photography",
      description: "Professional headshots and personal portraits that capture your unique essence and personality.",
      features: ["Studio & Outdoor", "Professional Lighting", "High-Res Images", "Quick Turnaround"]
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Wedding Photography",
      description: "Documenting your special day with artistic flair and emotional depth that tells your love story.",
      features: ["Full Day Coverage", "Engagement Sessions", "Wedding Albums", "Online Gallery"]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Event Photography",
      description: "Capturing the energy and moments of your corporate events, parties, and special occasions.",
      features: ["Corporate Events", "Social Gatherings", "Live Coverage", "Same Day Previews"]
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: "Commercial Photography",
      description: "Professional imagery for businesses, products, and marketing materials that drive results.",
      features: ["Product Shots", "Brand Photography", "Marketing Assets", "Commercial Rights"]
    }
  ]

  return (
    <section id="services" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Services
          </h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive photography services tailored to meet your unique needs and vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-8 hover:bg-gray-800 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-300 text-sm flex items-center">
                    <div className="w-1 h-1 bg-white rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection