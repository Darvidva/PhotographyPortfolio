import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Images, MapPin, User, Calendar } from 'lucide-react'
import { PortfolioStore, type PortfolioItem } from './PortfolioData'
import ImageGalleryModal from './ImageGalleryModal'

interface PortfolioPageProps {
  onNavigate: (page: string) => void
}

const PortfolioPage = ({ onNavigate }: PortfolioPageProps) => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const filters = [
    { id: 'all', label: 'All Work', count: PortfolioStore.getAll().length },
    { id: 'portrait', label: 'Portraits', count: PortfolioStore.getByCategory('portrait').length },
    { id: 'wedding', label: 'Weddings', count: PortfolioStore.getByCategory('wedding').length },
    { id: 'event', label: 'Events', count: PortfolioStore.getByCategory('event').length },
    { id: 'commercial', label: 'Commercial', count: PortfolioStore.getByCategory('commercial').length }
  ]

  const filteredItems = PortfolioStore.getByCategory(activeFilter)

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
        onClick={() => setSelectedItem(item)}
      >
        {/* Album Stack Effect */}
        <div className="relative">
          {/* Shadow cards for stack effect */}
          <div className="absolute top-3 left-3 w-full h-96 bg-gray-800 rounded-xl opacity-50 transform rotate-3"></div>
          <div className="absolute top-2 left-2 w-full h-96 bg-gray-700 rounded-xl opacity-60 transform rotate-2"></div>
          <div className="absolute top-1 left-1 w-full h-96 bg-gray-600 rounded-xl opacity-70 transform rotate-1"></div>
          
          {/* Main card */}
          <div className="relative w-full h-96 overflow-hidden rounded-xl bg-gray-900 border border-gray-700 shadow-2xl">
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-200 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm font-medium">
                    {filters.find(f => f.id === item.category)?.label}
                  </span>
                  <div className="flex items-center text-white text-sm bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                    <Images className="w-4 h-4 mr-1" />
                    <span>{item.images.length} photos</span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                {/* Metadata */}
                <div className="space-y-1">
                  {item.client && (
                    <div className="flex items-center text-gray-300 text-xs">
                      <User className="w-3 h-3 mr-1" />
                      <span>{item.client}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center text-gray-300 text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-300 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo count indicator */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              {item.images.length}
            </div>

            {/* Click indicator */}
            <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Portfolio
            </h1>
            <div className="w-20 h-1 bg-white mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl">
              Explore my complete collection of photography work across different genres and styles.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 py-8 sticky top-10 z-40 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-white hover:text-white hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                <span className="font-medium">{filter.label}</span>
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  activeFilter === filter.id 
                    ? 'bg-black/20 text-black' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {filter.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredItems.map((item, index) => (
              <AlbumCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-400 text-lg">No portfolio items found for this category.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Image Gallery Modal */}
      {selectedItem && (
        <ImageGalleryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}

export default PortfolioPage