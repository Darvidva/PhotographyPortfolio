import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import  hero  from '../assets/img/hero.jpg'

const HeroSection = () => {
  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero}
          alt="Photography hero background"
          className="w-full h-full  object-cover object-[50%_10%]"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-papyrus"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Mr. Visualist
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Capturing moments that tell extraordinary stories through the lens of artistry
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <button
            onClick={handleScrollToAbout}
            className="bg-white text-black px-8 py-3 rounded-[10px] hover:bg-gray-200 transition-colors duration-300 font-medium"
          >
            Discover My Work
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white text-white px-8 py-3 rounded-[10px] hover:bg-white hover:text-black transition-all duration-300 font-medium"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        onClick={handleScrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  )
}

export default HeroSection