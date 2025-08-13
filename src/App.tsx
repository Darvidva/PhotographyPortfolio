'use client'

import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './component/AuthContext'
import Navigation from './component/Navigation'
import HeroSection from './component/HeroSection'
import AboutSection from './component/AboutSection'
import ServicesSection from './component/ServicesSection'
import PortfolioSection from './component/PortfolioSection'
import TestimonialsSection from './component/TestimonialsSection'
import ContactSection from './component/ContactSection'
import PortfolioPage from './component/PortfolioPage'
import AdminDashboard from './component/AdminDashboard'
import LoginForm from './component/LoginForm'

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    // Set dark theme
    document.documentElement.classList.add('dark')
    
    // Handle initial route from URL
    const path = window.location.pathname
    if (path === '/admin') {
      setCurrentPage('admin')
    } else if (path === '/portfolio') {
      setCurrentPage('portfolio')
    } else {
      setCurrentPage('home')
    }
    
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

    // Handle browser back/forward
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/admin') {
        setCurrentPage('admin')
      } else if (path === '/portfolio') {
        setCurrentPage('portfolio')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigateToPage = (page: string) => {
    setCurrentPage(page)
    
    // Update URL without page reload
    const newPath = page === 'home' ? '/' : `/${page}`
    window.history.pushState({}, '', newPath)
  }

  const renderPage = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )
    }

    switch (currentPage) {
      case 'portfolio':
        return <PortfolioPage onNavigate={navigateToPage} />
      case 'admin':
        // Show login form if not authenticated, otherwise show admin dashboard
        return isAuthenticated ? (
          <AdminDashboard onNavigate={navigateToPage} />
        ) : (
          <LoginForm />
        )
      default:
        return (
          <main>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <PortfolioSection onNavigate={navigateToPage} />
            <TestimonialsSection />
            <ContactSection />
          </main>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Only show navigation if not on admin login page */}
      {!(currentPage === 'admin' && !isAuthenticated) && (
        <Navigation 
          currentPage={currentPage} 
          onNavigate={navigateToPage}
          isAuthenticated={isAuthenticated}
        />
      )}
      
      {renderPage()}
      
      {/* Footer - only show on home page */}
      {currentPage === 'home' && (
        <footer className="bg-black border-t border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-white text-lg font-medium mb-4 md:mb-0">
                Mr. Visualist
              </div>
              <div className="text-gray-400 text-sm">
                © 2025 Mr. Visualist. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}