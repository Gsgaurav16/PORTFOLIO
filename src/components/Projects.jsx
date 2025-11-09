import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0)

  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const projects = [
    {
      title: 'PROJECT ONE',
      name: "Hi, I'm Gaurav Sharma",
      description: 'A passionate Full Stack Developer with 5+ years of experience crafting scalable, and performant applications using Java, React, Nest.js, TypeScript, Tailwind CSS, and FastAPI',
      shortDescription: 'Epic game-inspired landing page with GSAP animations.',
      tags: ['React', 'GSAP', 'Tailwind'],
      features: [
        'Hero intro with timeline-based scene reveal.',
        'Magnetic cursor + hover sfx synced to UI.',
        'Optimized 60fps scroll-driven sections.',
      ],
    },
    {
      title: 'PROJECT TWO',
      name: 'Retro Dashboard',
      description: 'A futuristic admin dashboard with retro gaming theme.',
      shortDescription: 'A futuristic admin dashboard with retro gaming theme.',
      tags: ['Next.js', 'TypeScript', 'Framer Motion'],
      features: [
        'Real-time data visualization.',
        'Custom game-inspired components.',
        'Performance optimized rendering.',
      ],
    },
    {
      title: 'PROJECT THREE',
      name: 'Arcade Portfolio',
      description: 'Interactive portfolio with arcade-style navigation.',
      shortDescription: 'Interactive portfolio with arcade-style navigation.',
      tags: ['React', 'Three.js', 'WebGL'],
      features: [
        '3D interactive elements.',
        'Arcade-style game mechanics.',
        'Mobile-friendly controls.',
      ],
    },
  ]

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
      }
      if (e.key === 'ArrowRight') {
        setCurrentProject((prev) => (prev + 1) % projects.length)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [projects.length])

  return (
    <section id="projects" className="py-16 px-6 bg-retro-yellow">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-4xl md:text-5xl mb-4 text-retro-dark" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>PROJECTS</h2>
          <p className="font-body text-lg text-retro-dark">
            Showcasing my work with a retro game twist ✨
          </p>
        </motion.div>

        {/* Project Window Frame - White with black border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto relative"
        >
          {/* White frame with black border */}
          <div className="bg-white rounded-xl border-2 border-black p-1">
            {/* Window Header with colored circles */}
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
              </div>
              <h3 className="font-pixel text-xs text-retro-dark">RETRO PROJECT WINDOW</h3>
              <div className="w-12"></div>
            </div>

            {/* Project Content */}
            <div className="relative p-3 md:p-6">
              {/* Side Navigation Arrows - Hidden on mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevProject}
                className="cursor-target hidden md:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-retro-orange border-2 border-black items-center justify-center"
                style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }}
              >
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextProject}
                className="cursor-target hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-retro-orange border-2 border-black items-center justify-center"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 50%)' }}
              >
              </motion.button>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Left Section - Dark Preview Frame */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-3 md:p-6 border-2 border-black min-h-[200px] sm:min-h-[250px] md:min-h-[350px] flex flex-col justify-between relative overflow-hidden">
                  {/* Starry background effect */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `twinkle ${2 + Math.random() * 2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <style>{`
                    @keyframes twinkle {
                      0%, 100% { opacity: 0.3; }
                      50% { opacity: 1; }
                    }
                  `}</style>
                  
                  <div className="relative z-10">
                    <p className="font-body text-sm sm:text-base md:text-lg mb-3 md:mb-4" style={{ color: '#90EE90' }}>
                      {projects[currentProject].name}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-gray-300 mb-4 md:mb-6">
                      {projects[currentProject].description}
                    </p>
                  </div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection('projects')}
                      className="cursor-target px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg border-2 border-black font-body text-xs sm:text-sm font-medium"
                    >
                      View My Work
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection('contact')}
                      className="cursor-target px-3 sm:px-4 py-2 bg-transparent text-white rounded-lg border-2 border-white font-body text-xs sm:text-sm font-medium"
                    >
                      Contact Now
                    </motion.button>
                  </div>
                </div>

                {/* Right Section - Project Details */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-pixel text-xl sm:text-2xl md:text-3xl lg:text-4xl text-retro-orange mb-2 sm:mb-3 font-bold">
                        {projects[currentProject].title}
                      </h4>
                      <p className="font-body text-xs sm:text-sm md:text-base text-retro-dark mb-3 sm:mb-4">
                        {projects[currentProject].shortDescription}
                      </p>

                      {/* Tags - White with black borders */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {projects[currentProject].tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 sm:px-3 py-1 bg-white text-retro-dark rounded-lg text-[10px] sm:text-xs font-body font-medium border-2 border-black"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Features - Bulleted list */}
                      <ul className="space-y-1.5 sm:space-y-2">
                        {projects[currentProject].features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-retro-dark mt-1 text-xs">•</span>
                            <p className="font-body text-xs sm:text-sm text-retro-dark">{feature}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* VIEW PROJECT Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        // You can add actual project link here
                        console.log('Viewing project:', projects[currentProject].title)
                        alert(`Opening ${projects[currentProject].title}`)
                      }}
                      className="cursor-target w-full bg-white border-2 border-black rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-center gap-2 font-pixel text-xs sm:text-sm text-retro-dark mt-auto"
                    >
                      VIEW PROJECT
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 md:mt-6 pt-3 md:pt-4 border-t-2 border-black gap-3 sm:gap-0">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevProject}
                    className="cursor-target retro-button bg-retro-orange text-white text-xs py-2 px-3 md:px-4 rounded-lg border-2 border-black font-pixel flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">PREV</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextProject}
                    className="cursor-target retro-button bg-retro-orange text-white text-xs py-2 px-3 md:px-4 rounded-lg border-2 border-black font-pixel flex items-center gap-1"
                  >
                    <span className="hidden sm:inline">NEXT</span>
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                  </motion.button>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-1">
                  <div className="flex gap-2">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProject(index)}
                        className={`cursor-target w-2 h-2 rounded-full transition-all ${
                          index === currentProject ? 'bg-retro-orange w-3 h-3' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-body text-xs text-gray-600 hidden sm:block">Arrow keys • Click dots</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

