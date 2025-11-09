import { motion } from 'framer-motion'
import { Target, Wrench, Trophy } from 'lucide-react'
import RobotCharacter from './RobotCharacter'

const About = () => {
  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <section id="about" className="py-16 px-4 md:px-6 bg-retro-green text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-4">ABOUT • PLAYER</h2>
          <p className="font-body text-base md:text-lg">
            A game-inspired developer - UI/UX first design - retro arcade polish
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Mission Box */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="retro-card bg-retro-green border-retro-green"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-red-500" />
                <h3 className="font-pixel text-xl">MISSION</h3>
              </div>
              <p className="font-body mb-6">
                I craft game-involved web experiences that are fast, tactile, and deliberately playful. Motion-first UI with careful performance optimization and interfaces that feel like a controller in your hands.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                  className="cursor-target retro-button bg-retro-yellow text-retro-dark text-sm md:text-base"
                >
                  VIEW PROJECTS
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="cursor-target retro-button bg-transparent border-white text-white text-sm md:text-base"
                >
                  CONTACT ME
                </motion.button>
              </div>
            </motion.div>

            {/* Core Abilities Box */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="retro-card bg-retro-green border-retro-green"
            >
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="w-6 h-6" />
                <h3 className="font-pixel text-xl">CORE ABILITIES</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-retro-orange rounded-full"></div>
                  <span className="font-body">Frontend Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-retro-orange rounded-full"></div>
                  <span className="font-body">UI/UX Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-retro-orange rounded-full"></div>
                  <span className="font-body">Performance Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-retro-orange rounded-full"></div>
                  <span className="font-body">Creative Problem Solving</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Robot Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="retro-card bg-retro-green border-retro-green"
            >
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-retro-orange to-yellow-500 rounded-lg flex items-center justify-center overflow-hidden">
                <RobotCharacter className="w-full h-full max-w-md" imageSrc="/images/robot-character.png" />
              </div>
            </motion.div>

            {/* Player Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-2 sm:gap-4"
            >
              <div className="retro-card bg-retro-green border-retro-green text-center relative">
                <Trophy className="w-6 h-6 mx-auto mb-2" />
                <div className="font-pixel text-2xl mb-1">42</div>
                <div className="font-body text-xs">PROJECTS</div>
              </div>
              <div className="retro-card bg-retro-green border-retro-green text-center">
                <div className="font-pixel text-2xl mb-1">
                  <span className="text-retro-green bg-retro-yellow px-2 rounded">5</span>
                </div>
                <div className="font-body text-xs mt-2">YEARS XP</div>
              </div>
              <div className="retro-card bg-retro-green border-retro-green text-center">
                <div className="font-pixel text-2xl mb-1 text-retro-yellow">128</div>
                <div className="font-body text-xs">VIDEOS</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

