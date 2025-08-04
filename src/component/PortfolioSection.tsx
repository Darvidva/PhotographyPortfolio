import { useState } from 'react'
import { motion } from 'framer-motion'


const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const portfolioItems = [
    {
      id: 1,
      category: 'event',
      image: '../src/assets/img/portfolios/event.jpg',
      title: 'Family Portrait',
      description: 'Wishing a Merry Christmas'
    },
    {
      id: 2,
      category: 'wedding',
      image: '../src/assets/img/portfolios/wedding.jpg',
      title: 'Wedding Ceremony',
      description: 'Romantic outdoor wedding'
    },
    {
      id: 3,
      category: 'event',
      image: '../src/assets/img/portfolios/event2.jpg',
      title: 'Birthday Shoot',
      description: 'Wishing you a Happy Birthday Ayo'
    },
    {
      id: 4,
      category: 'commercial',
      image: '../src/assets/img/portfolios/convocation.jpg',
      title: 'Product Photography',
      description: 'Commercial product showcase'
    },
    {
      id: 5,
      category: 'portrait',
      image: '../src/assets/img/portfolios/commercial.jpg',
      title: 'Creative Portrait',
      description: 'Stand Strong and Bold'
    },
    {
      id: 6,
      category: 'wedding',
      image: '../src/assets/img/portfolios/wedding2.jpg',
      title: 'Wedding Reception',
      description: 'Celebration moments captured'
    },
    {
      id: 7,
      category: 'event',
      image: '../src/assets/img/portfolios/portrait.jpg',
      title: 'My Grandma',
      description: 'Celebrating my Grandmum!'
    },
    {
      id: 8,
      category: 'commercial',
      image: '../src/assets/img/portfolios/portrait2.jpg',
      title: 'Art!',
      description: 'Artistic portrait session'
    }
  ]

  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'portrait', label: 'Portraits' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'event', label: 'Events' },
    { id: 'commercial', label: 'Commercial' }
  ]

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter)

  return (
    <section id="portfolio" className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Portfolio
          </h2>
          <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-none transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-300 border border-gray-600 hover:border-white hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden aspect-square cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              layout
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-4 h-4 border-2 border-white"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioSection