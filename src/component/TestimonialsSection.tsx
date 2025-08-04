import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      rating: 5,
      text: "Mr. Visualist captured our wedding day perfectly. Every emotion, every moment was beautifully preserved. His artistic eye and professional approach made our special day even more memorable."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO, Tech Startup",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      rating: 5,
      text: "Outstanding professional photography for our company rebrand. The quality and creativity exceeded our expectations. Mr. Visualist truly understands how to represent a brand through imagery."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Model",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      rating: 5,
      text: "Working with Mr. Visualist was an incredible experience. His direction and vision brought out the best in every shot. The portfolio he created for me opened so many new opportunities."
    },
    {
      id: 4,
      name: "David Park",
      role: "Event Coordinator",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      rating: 5,
      text: "The event photography was exceptional. Mr. Visualist captured every important moment and the energy of our corporate gathering. The images exceeded all our expectations."
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80",
      rating: 5,
      text: "Professional, creative, and reliable. Mr. Visualist delivered stunning commercial photography that perfectly represented our brand. The collaboration was seamless from start to finish."
    }
  ]

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="bg-black py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Testimonials
          </h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            What my clients say about working with me
          </p>
        </motion.div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          <motion.div
            className="flex gap-8"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity
            }}
            style={{ width: "200%" }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl relative hover:from-gray-800 hover:to-gray-700 transition-all duration-500 group shadow-2xl border border-gray-700/50 backdrop-blur-sm flex-shrink-0"
                style={{ width: "400px", minWidth: "400px" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 5) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                  <Quote size={32} />
                </div>

                {/* Rating */}
                <div className="flex mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: (index % 5) * 0.1 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center relative z-10">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-gray-600 group-hover:ring-gray-500 transition-colors duration-300">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-gray-100 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
      </div>

    </section>
  )
}

export default TestimonialsSection