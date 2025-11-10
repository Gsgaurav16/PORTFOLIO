import { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Server, Palette, Settings, Box } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

const Skills = () => {
  const { skills } = useAdmin()
  const [activeTab, setActiveTab] = useState('foundations')

  const tabs = [
    { id: 'foundations', label: 'FOUNDATIONS', icon: Box },
    { id: 'frontend', label: 'FRONTEND', icon: Monitor },
    { id: 'backend', label: 'BACKEND', icon: Server },
    { id: 'design', label: 'DESIGN', icon: Palette },
    { id: 'tools', label: 'TOOLS & ENGINES', icon: Settings },
  ]

  const skillsData = {
    foundations: {
      skills: ['HTML', 'CSS', 'JAVASCRIPT', 'TYPESCRIPT', 'SASS', 'TAILWIND'],
      achievements: [
        'Semantic HTML with ARIA patterns and component tokens',
        'Advanced CSS animations and responsive design',
        'Modern JavaScript ES6+ and TypeScript proficiency',
      ],
    },
    frontend: {
      skills: ['REACT', 'NEXT.JS', 'VUE', 'GSAP', 'FRAMER MOTION', 'THREE.JS'],
      achievements: [
        'Component-based architecture and state management',
        'Performance optimization and code splitting',
        'Interactive animations and 3D web experiences',
      ],
    },
    backend: {
      skills: ['NODE.JS', 'EXPRESS', 'MONGODB', 'POSTGRESQL', 'REST API', 'GRAPHQL'],
      achievements: [
        'RESTful API design and implementation',
        'Database design and optimization',
        'Server-side rendering and authentication',
      ],
    },
    design: {
      skills: ['FIGMA', 'ADOBE XD', 'SKETCH', 'PRINCIPLE', 'AFTER EFFECTS', 'BLENDER'],
      achievements: [
        'User-centered design and prototyping',
        'Motion design and micro-interactions',
        '3D modeling and asset creation',
      ],
    },
    tools: {
      skills: ['GIT', 'GITHUB', 'DOCKER', 'AWS', 'VERCEL', 'NETLIFY'],
      achievements: [
        'Version control and CI/CD pipelines',
        'Cloud deployment and infrastructure',
        'DevOps and automation tools',
      ],
    },
  }

  const currentSkills = skills[activeTab] || skillsData[activeTab] || skillsData.foundations

  return (
    <section id="skills" className="py-16 px-4 md:px-6 bg-retro-green text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-4">SKILLS • LOADOUT</h2>
          <p className="font-body text-base md:text-lg">
            Choose your class - Have your mastery - Level as your game
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 md:mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-target retro-button flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  isActive
                    ? 'bg-retro-orange text-white'
                    : 'bg-white text-retro-dark'
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Skills Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="retro-card bg-retro-green border-retro-green"
        >
          <div className="flex items-center gap-3 mb-6">
            {(() => {
              const Icon = tabs.find((t) => t.id === activeTab)?.icon || Box
              return <Icon className="w-6 h-6" />
            })()}
            <h3 className="font-pixel text-xl">
              {tabs.find((t) => t.id === activeTab)?.label || 'FOUNDATIONS'}
            </h3>
            <span className="font-body text-sm ml-auto">Level 1/4</span>
          </div>

          {/* Equipment */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Box className="w-5 h-5" />
              <h4 className="font-pixel text-sm">EQUIPMENT</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentSkills.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 bg-retro-yellow text-retro-dark rounded-full text-xs font-body font-medium border-2 border-black"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⭐</span>
              <h4 className="font-pixel text-sm">ACHIEVEMENTS UNLOCKED</h4>
            </div>
            <div className="space-y-2">
              {currentSkills.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-retro-green border-2 border-retro-green rounded-lg"
                >
                  <span className="text-green-400">✓</span>
                  <p className="font-body text-sm">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

