import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, User, Calendar, Images } from 'lucide-react'
import type { PortfolioItem } from './PortfolioData'

interface ImageGalleryModalProps {
  item: PortfolioItem
  onClose: () => void
}

const ImageGalleryModal = ({ item, onClose }: ImageGalleryModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        navigatePrevious()
      } else if (e.key === 'ArrowRight') {
        navigateNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const navigateNext = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    )
  }

  const navigatePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    )
  }

  const currentImage = item.images[currentImageIndex]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image Section */}
          <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8">
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation Buttons */}
            {item.images.length > 1 && (
              <>
                <motion.button
                  onClick={navigatePrevious}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  onClick={navigateNext}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Main Image */}
            <motion.div
              key={currentImageIndex}
              className="relative max-w-full max-h-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={currentImage.url}
                alt={currentImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Image Counter */}
            {item.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {item.images.length}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <motion.div
            className="w-full lg:w-96 bg-gray-900/95 backdrop-blur-sm p-8 overflow-y-auto"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Project Info */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
                <div className="flex items-center text-gray-300 text-sm">
                  <Images className="w-4 h-4 mr-1" />
                  <span>{item.images.length}</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                {item.title}
              </h2>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Metadata */}
              <div className="space-y-3">
                {item.client && (
                  <div className="flex items-center text-gray-300">
                    <User className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{item.client}</span>
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{item.location}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>

            {/* Current Image Info */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-white mb-2">
                {currentImage.title}
              </h3>
              {currentImage.description && (
                <p className="text-gray-400 text-sm">
                  {currentImage.description}
                </p>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {item.images.length > 1 && (
              <div className="border-t border-gray-700 pt-6 mt-6">
                <h4 className="text-white font-medium mb-4">All Photos</h4>
                <div className="grid grid-cols-3 gap-2">
                  {item.images.map((image, index) => (
                    <motion.button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-white'
                          : 'border-transparent hover:border-gray-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-white/20"></div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ImageGalleryModal