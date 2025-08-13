import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Settings, LogOut } from 'lucide-react'
import { useAuth } from './AuthContext'

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  isAuthenticated?: boolean
}

const Navigation = ({ currentPage, onNavigate, isAuthenticated }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#about', label: 'About', action: () => handleNavClick('#about') },
    { href: '#services', label: 'Services', action: () => handleNavClick('#services') },
    { href: 'portfolio', label: 'Portfolio', action: () => onNavigate('portfolio') },
    { href: '#testimonials', label: 'Testimonials', action: () => handleNavClick('#testimonials') },
    { href: '#contact', label: 'Contact', action: () => handleNavClick('#contact') }
  ]

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith('#')) {
      // Navigate to home page first, then scroll to section
      if (currentPage !== 'home') {
        onNavigate('home')
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  const handleLogoClick = () => {
    onNavigate('home')
    setIsMobileMenuOpen(false)
  }

  const handleAdminClick = () => {
    onNavigate('admin')
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    onNavigate('home')
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handleLogoClick}
            className="text-white text-xl font-medium font-papyrus"
            whileHover={{ scale: 1.05 }}
          >
            Mr. Visualist
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={item.action}
                className={`transition-colors duration-200 ${
                  (currentPage === 'portfolio' && item.href === 'portfolio') ||
                  (currentPage === 'home' && item.href.startsWith('#'))
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            {/* Admin Access - Only show when authenticated */}
            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={handleAdminClick}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    currentPage === 'admin'
                      ? 'bg-white text-black'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  title="Admin Dashboard"
                >
                  <Settings size={18} />
                </motion.button>
                
                <motion.button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  title="Logout"
                >
                  <LogOut size={18} />
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 py-4 bg-black/90 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={item.action}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                whileHover={{ x: 10 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            {/* Mobile Admin Access - Only show when authenticated */}
            {isAuthenticated && (
              <>
                <motion.button
                  onClick={handleAdminClick}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                  whileHover={{ x: 10 }}
                >
                  Admin Dashboard
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                  whileHover={{ x: 10 }}
                >
                  Logout
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navigation