import { motion } from 'framer-motion'
import About from '../assets/img/About.jpg'


const AboutSection = () => {
  return (
    <section id="about" className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Me
            </h2>
            <div className="w-20 h-1 bg-white mb-8"></div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              With over a decade of experience behind the lens, I specialize in capturing the 
              essence of life's most precious moments. My passion lies in transforming ordinary 
              scenes into extraordinary visual narratives that resonate with emotion and artistry.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              From intimate portraits to grand landscapes, my work spans across multiple genres, 
              always with a focus on authenticity and creative excellence. Each photograph tells 
              a unique story, crafted with meticulous attention to detail and an eye for the 
              extraordinary in the everyday.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
                <p className="text-gray-400">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">10+</h3>
                <p className="text-gray-400">Years Experience</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                <p className="text-gray-400">Awards Won</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">100%</h3>
                <p className="text-gray-400">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={About}
                alt="Mr. Visualist portrait"
                className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection