import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { 
  FolderKanban, 
  Briefcase, 
  MessageSquare, 
  Code, 
  User, 
  Mail, 
  Home,
  LogOut,
  Menu,
  X,
  Gamepad2,
  Eye
} from 'lucide-react'
import ProjectsManager from '../components/admin/ProjectsManager'
import ExperienceManager from '../components/admin/ExperienceManager'
import TestimonialsManager from '../components/admin/TestimonialsManager'
import SkillsManager from '../components/admin/SkillsManager'
import HeroManager from '../components/admin/HeroManager'
import AboutManager from '../components/admin/AboutManager'
import ContactManager from '../components/admin/ContactManager'

const AdminDashboard = () => {
  const { logout } = useAdmin()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('projects')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Close mobile menu when window is resized to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  const menuItems = [
    { id: 'hero', label: 'Hero', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setIsMobileMenuOpen(false)
    // Scroll to top when switching tabs
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManager />
      case 'experience':
        return <ExperienceManager />
      case 'testimonials':
        return <TestimonialsManager />
      case 'skills':
        return <SkillsManager />
      case 'hero':
        return <HeroManager />
      case 'about':
        return <AboutManager />
      case 'contact':
        return <ContactManager />
      default:
        return <ProjectsManager />
    }
  }

  return (
    <div className="min-h-screen bg-retro-yellow admin-dashboard-container">
      {/* Header */}
      <header className="admin-dashboard-header">
        <div className="max-w-full mx-auto px-4 py-3 md:py-4 flex items-center justify-between" style={{ minHeight: '64px' }}>
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="cursor-target w-10 h-10 rounded-full bg-retro-orange border-2 border-black flex items-center justify-center flex-shrink-0"
            >
              <Gamepad2 className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="font-pixel text-lg md:text-xl lg:text-2xl text-retro-dark">ADMIN DASHBOARD</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="cursor-target retro-button bg-red-600 text-white text-xs md:text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Horizontal Menu Bar - Similar to Portfolio Navbar */}
      <div className="w-full flex justify-center px-4 py-4 admin-dashboard-content">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-full border-2 border-black px-3 sm:px-4 md:px-8 py-2 md:py-3 flex items-center justify-between mx-auto w-full max-w-6xl"
          style={{ boxShadow: '0 6px 0 0 rgba(0, 0, 0, 0.5)' }}
        >
          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-target md:hidden w-8 h-8 flex items-center justify-center flex-shrink-0"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-retro-dark" /> : <Menu className="w-5 h-5 text-retro-dark" />}
          </motion.button>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTabChange(item.id)}
                  className={`cursor-target font-body text-xs lg:text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-retro-orange font-bold'
                      : 'text-retro-dark hover:text-retro-orange'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-retro-orange rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* View Site Button - Desktop */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="cursor-target hidden md:flex retro-button bg-retro-green text-white items-center gap-2 text-xs lg:text-sm flex-shrink-0"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden lg:inline">View Site</span>
            <span className="lg:hidden">View</span>
          </motion.button>

          {/* Mobile View Site Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="cursor-target md:hidden retro-button bg-retro-green text-white items-center gap-2 text-xs flex-shrink-0"
          >
            <Eye className="w-4 h-4" />
            View
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mx-4 mb-4 bg-white rounded-xl border-2 border-black p-4 space-y-2"
        >
          {menuItems.map((item) => {
            const isActive = activeTab === item.id
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabChange(item.id)}
                className={`cursor-target w-full flex items-center gap-3 text-left font-body text-sm font-medium transition-colors py-2 px-4 rounded-lg ${
                  isActive
                    ? 'bg-retro-orange text-white'
                    : 'text-retro-dark hover:text-retro-orange hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </motion.button>
            )
          })}
        </motion.div>
      )}

      {/* Content Area */}
      <div className="max-w-full mx-auto px-4 md:px-6 pb-6">
        <main className="w-full">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="retro-card bg-white w-full"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
