import { motion } from 'framer-motion'
import { useState } from 'react'
import { Gamepad2, Mail, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Testimonials']

  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[9999] flex justify-center pointer-events-none"
      style={{ background: 'transparent' }}
    >
      <div className="mt-2 md:mt-4 pointer-events-auto w-full max-w-7xl px-2 sm:px-3 md:px-6">
        <div className="bg-white rounded-full border-2 border-black px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-3 flex items-center justify-between mx-auto w-full md:w-[90%]" style={{ boxShadow: '0 6px 0 0 rgba(0, 0, 0, 0.5)' }}>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="cursor-target w-8 h-8 md:w-12 md:h-12 rounded-full bg-retro-orange border-2 border-black flex items-center justify-center cursor-pointer flex-shrink-0"
        >
          <Gamepad2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </motion.div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(link)}
              className="cursor-target font-body text-xs lg:text-sm font-medium text-retro-dark hover:text-retro-orange transition-colors"
            >
              {link}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-target md:hidden w-8 h-8 flex items-center justify-center"
        >
          {isMenuOpen ? <X className="w-5 h-5 text-retro-dark" /> : <Menu className="w-5 h-5 text-retro-dark" />}
        </motion.button>

        {/* Contact Button - Desktop */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contact')}
          className="cursor-target hidden md:flex retro-button bg-retro-orange text-white items-center gap-2 text-xs lg:text-sm"
        >
          <Mail className="w-4 h-4" />
          <span className="hidden lg:inline">Contact Me</span>
          <span className="lg:hidden">Contact</span>
        </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 bg-white rounded-xl border-2 border-black p-4 space-y-2"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(link)}
                className="cursor-target w-full text-left font-body text-sm font-medium text-retro-dark hover:text-retro-orange transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                {link}
              </motion.button>
            ))}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="cursor-target w-full retro-button bg-retro-orange text-white flex items-center justify-center gap-2 mt-2"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar

