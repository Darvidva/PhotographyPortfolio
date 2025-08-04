
import { useEffect } from 'react'
import Navigation from './component/Navigation'
import HeroSection from './component/HeroSection'
import AboutSection from './component/AboutSection'
import ServicesSection from './component/ServicesSection'
import PortfolioSection from './component/PortfolioSection'
import TestimonialsSection from './component/TestimonialsSection'
import ContactSection from './component/ContactSection'

export default function App() {
  useEffect(() => {
    // Set dark theme
    document.documentElement.classList.add('dark')
    
    // Smooth scrolling for anchor links
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white text-lg font-semibold mb-4 md:mb-0 font-papyrus">
              Mr. Visualist
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Mr. Visualist. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}