import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Images } from 'lucide-react'
import { PortfolioStore, type PortfolioItem } from './PortfolioData'

interface PortfolioSectionProps {
  onNavigate: (page: string) => void
}

const PortfolioSection = ({ onNavigate }: PortfolioSectionProps) => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'portrait', label: 'Portraits' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'event', label: 'Events' },
    { id: 'commercial', label: 'Commercial' }
  ]

  const filteredItems = PortfolioStore.getByCategory(activeFilter)
  const displayItems = filteredItems.slice(0, 6) // Show only 6 items on home page

  const AlbumCard = ({ item, index }: { item: PortfolioItem; index: number }) => {
    return (
      <motion.div
        className="group relative cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        layout
      >
        {/* Album Stack Effect */}
        <div className="relative">
          {/* Shadow cards for stack effect */}
          <div className="absolute top-2 left-2 w-full h-80 bg-gray-800 rounded-xl opacity-60 transform rotate-2"></div>
          <div className="absolute top-1 left-1 w-full h-80 bg-gray-700 rounded-xl opacity-70 transform rotate-1"></div>
          
          {/* Main card */}
          <div className="relative w-full h-80 overflow-hidden rounded-xl bg-gray-900 border border-gray-700">
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-300 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                    {filters.find(f => f.id === item.category)?.label}
                  </span>
                  <div className="flex items-center text-white text-xs">
                    <Images className="w-4 h-4 mr-1" />
                    <span>{item.images.length}</span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {item.description}
                </p>
                {item.client && (
                  <p className="text-gray-400 text-xs mt-1">
                    Client: {item.client}
                  </p>
                )}
              </div>
            </div>

            {/* Corner indicator */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

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
            Featured Portfolio
          </h2>
          <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          layout
        >
          {displayItems.map((item, index) => (
            <AlbumCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => onNavigate('portfolio')}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium mr-2">View Complete Portfolio</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioSection