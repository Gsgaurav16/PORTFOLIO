import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import RobotCharacter from './RobotCharacter'
import { useAdmin } from '../context/AdminContext'

const Hero = () => {
  const { hero } = useAdmin()
  const tags = hero.tags || ['React', 'TypeScript', 'Framer Motion', 'Tailwind', '3D/Assets']
  const miniCards = hero.miniCards || [
    { title: 'Top Project', desc: 'Live' },
    { title: 'Current Goal', desc: 'Next Level' },
    { title: 'Status', desc: 'Live' },
    { title: 'Shop', desc: 'Open' },
  ]

  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="pt-20 md:pt-24 pb-16 px-4 md:px-6 bg-retro-yellow">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Level Indicator */}
            <p className="font-pixel text-xs text-retro-dark">LEVEL 1 PLAYER PROFILE</p>
            
            {/* Title */}
            <div className="space-y-2">
              <h1 className="font-body text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {hero.title || "Hi, I'm "}<span className="text-retro-orange">{hero.title ? '' : 'Gaurav'}</span>{hero.title ? '' : '—'}
              </h1>
              <h1 className="font-body text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-retro-orange">{hero.subtitle || 'Dev'}</span> & Creator
              </h1>
            </div>
            
            <p className="font-body text-base md:text-lg text-retro-dark max-w-xl">
              {hero.description || "I build game-inspired web experiences — heavy on performance, control, and delightful micro-interactions. I design interfaces that feel like menus and HUDs in retro games."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="cursor-target retro-button bg-red-600 text-white flex items-center justify-center gap-2 text-sm md:text-base"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="cursor-target retro-button bg-white text-retro-dark border-2 border-black text-sm md:text-base"
              >
                Hire Me
              </motion.button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1.5 bg-white border-2 border-white rounded-lg text-xs font-body font-medium text-retro-dark"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Mini Cards */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {miniCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="retro-card p-3"
                >
                  <p className="font-body text-sm font-semibold text-retro-dark">{card.title}</p>
                  <p className="font-body text-xs text-gray-600">{card.desc}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right - Robot Character Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full"
          >
            {/* White card with orange inner border and black outer border */}
            <div 
              className="relative bg-white rounded-xl border-2 border-black w-full max-w-lg mx-auto" 
              style={{ 
                backgroundColor: '#FFFFFF',
                padding: '4px'
              }}
            >
              {/* Inner white container with orange border */}
              <div 
                className="relative bg-white rounded-lg w-full border-4 border-retro-orange" 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  padding: '8px', 
                  minHeight: '350px',
                  borderColor: '#FF8A00',
                  borderWidth: '4px'
                }}
              >
                {/* RANK S Badge - Top Left */}
                <div 
                  className="absolute bg-white text-retro-dark text-xs font-body font-semibold px-2.5 py-1 rounded border border-black z-10 whitespace-nowrap" 
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    top: '-6px',
                    left: '-6px',
                    fontSize: '11px'
                  }}
                >
                  RANK S
                </div>
                
                {/* Robot Character */}
                <div 
                  className="w-full bg-white rounded-lg flex items-center justify-center overflow-hidden" 
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    minHeight: '300px',
                    height: 'calc(100vh - 200px)',
                    maxHeight: '600px',
                    padding: '0'
                  }}
                >
                  <RobotCharacter 
                    className="w-full h-full" 
                    imageSrc="/images/robot-character.png" 
                  />
                </div>
                
                {/* HP and XP Badges - Bottom Center */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div 
                    className="bg-white text-retro-dark text-xs font-pixel px-3 py-1.5 rounded border border-black whitespace-nowrap" 
                    style={{ backgroundColor: '#FFFFFF', fontSize: '11px' }}
                  >
                    HP 100
                  </div>
                  <div 
                    className="bg-white text-retro-dark text-xs font-pixel px-3 py-1.5 rounded border border-black whitespace-nowrap" 
                    style={{ backgroundColor: '#FFFFFF', fontSize: '11px' }}
                  >
                    XP 39%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator - Bottom Center */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center justify-center pt-8 pb-4"
        >
          <div className="bg-retro-dark text-white px-4 py-2 rounded-full flex items-center gap-2">
            <span className="font-body text-xs">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

