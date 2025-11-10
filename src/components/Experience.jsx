import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

const Experience = () => {
  const { experiences } = useAdmin()
  const [selectedExperience, setSelectedExperience] = useState(0)

  const defaultExperiences = [
    {
      company: 'HYPERPLAY STUDIOS',
      role: 'Frontend Developer',
      period: '2021 - 2023',
      description: 'Game inspired UIs with real-time state and custom animation libs for super-smooth UIs.',
      achievements: [
        'Built custom UI/UX leveling with editable character levels',
        'Implemented real-time state management for gaming platform',
        'Created smooth animations using GSAP and Framer Motion',
        'Optimized performance for scalable gaming applications',
      ],
      tags: ['React', 'GSAP', 'Framer Motion', 'Next.js', 'Tailwind'],
    },
    {
      company: 'CODECRAFT',
      role: 'Full Stack Developer',
      period: '2019 - 2021',
      description: 'Developed responsive web applications with focus on performance and user experience.',
      achievements: [
        'Built RESTful APIs and GraphQL endpoints',
        'Implemented authentication and authorization systems',
        'Created responsive designs for mobile and desktop',
        'Optimized database queries and caching strategies',
      ],
      tags: ['Node.js', 'React', 'MongoDB', 'GraphQL', 'Express'],
    },
    {
      company: 'ARCHEMIS LABS',
      role: 'UI/UX Developer',
      period: '2018 - 2019',
      description: 'Designed and developed user interfaces with focus on accessibility and usability.',
      achievements: [
        'Created design systems and component libraries',
        'Implemented accessibility standards (WCAG 2.1)',
        'Conducted user research and usability testing',
        'Designed responsive layouts for multiple devices',
      ],
      tags: ['Figma', 'React', 'CSS', 'SASS', 'JavaScript'],
    },
  ]

  const experiencesList = experiences.length > 0 ? experiences : defaultExperiences

  const nextExperience = () => {
    setSelectedExperience((prev) => (prev + 1) % experiencesList.length)
  }

  const prevExperience = () => {
    setSelectedExperience((prev) => (prev - 1 + experiencesList.length) % experiencesList.length)
  }

  return (
    <section id="experience" className="py-16 px-4 md:px-6 bg-retro-yellow">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-4 text-retro-dark">EXPERIENCE</h2>
          <p className="font-body text-base md:text-lg text-retro-dark">
            Leveling up experience, one quest at a time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left - Switchboard */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="retro-card"
          >
            <h3 className="font-pixel text-xl mb-2">Switchboard</h3>
            <p className="font-body text-sm text-gray-600 mb-6">Pick a stage to play next</p>
            <div className="space-y-4">
              {experiencesList.map((exp, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedExperience(index)}
                  className={`cursor-target w-full p-4 rounded-lg border-2 border-black text-left transition-all ${
                    selectedExperience === index
                      ? 'bg-retro-yellow'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body font-medium">{exp.company}</span>
                    <div className="relative w-12 h-6 bg-gray-300 rounded-full border-2 border-black">
                      <div
                        className={`absolute top-0 left-0 w-6 h-6 rounded-full border-2 border-black transition-all ${
                          selectedExperience === index ? 'bg-retro-orange translate-x-6' : 'bg-white'
                        }`}
                      />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right - Experience Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedExperience}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="retro-card"
            >
              <div className="mb-4">
                <h3 className="font-pixel text-xl mb-2">OFF MONITOR</h3>
                <p className="font-body text-sm text-gray-600">
                  Current Stage: {String(selectedExperience + 1).padStart(2, '0')}/{String(experiencesList.length).padStart(2, '0')}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-pixel text-xl text-retro-orange mb-1">
                    {experiencesList[selectedExperience]?.company}
                  </h4>
                  <p className="font-body font-medium mb-1">
                    {experiencesList[selectedExperience]?.role}
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    {experiencesList[selectedExperience]?.period}
                  </p>
                </div>

                <p className="font-body text-gray-700">
                  {experiencesList[selectedExperience]?.description}
                </p>

                <div className="space-y-2">
                  {experiencesList[selectedExperience]?.achievements?.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <p className="font-body text-sm">{achievement}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {experiencesList[selectedExperience]?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-retro-yellow text-retro-dark rounded-full text-xs font-body font-medium border-2 border-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevExperience}
                    className="cursor-target retro-button bg-retro-orange text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-2 sm:px-3 md:px-4"
                  >
                    PREV
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextExperience}
                    className="cursor-target retro-button bg-retro-orange text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-2 sm:px-3 md:px-4"
                  >
                    NEXT
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Experience

