import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, RotateCcw, MessageCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Message sent! (This is a demo)')
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 md:px-6 bg-retro-yellow">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="retro-card relative"
          >
            {/* CONTACT Button and Insert Coin - Inside card */}
            <div className="flex items-center gap-3 mb-6">
              <button 
                onClick={() => {
                  // Scroll to contact form or focus on first input
                  const nameInput = document.querySelector('input[name="name"]')
                  if (nameInput) nameInput.focus()
                }}
                className="rounded-lg border-2 border-black bg-white text-retro-dark text-xs py-1 px-3 cursor-target whitespace-nowrap font-pixel"
              >
                CONTACT
              </button>
              <span className="font-body text-sm text-retro-dark">// Insert Coin</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-body text-sm font-medium mb-2 text-retro-dark">YOUR NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="retro-input w-full bg-retro-yellow"
                  required
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-2 text-retro-dark">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="retro-input w-full bg-retro-yellow"
                  required
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-2 text-retro-dark">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="retro-input w-full resize-none bg-retro-yellow"
                  required
                />
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-target rounded-lg border-2 border-black bg-retro-orange text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 whitespace-nowrap font-pixel"
                >
                  SEND
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-target rounded-lg border-2 border-black bg-white text-retro-dark text-[10px] sm:text-xs py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 whitespace-nowrap font-pixel"
                >
                  RESET
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => window.location.href = 'mailto:contact@gauravsharma.dev'}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-target rounded-lg border-2 border-black bg-white text-retro-dark text-[10px] sm:text-xs py-1 px-1.5 sm:px-2 md:px-3 whitespace-nowrap font-pixel"
                >
                  Email
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    // You can add Discord link here
                    alert('Discord link would open here')
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-target rounded-lg border-2 border-black bg-white text-retro-dark text-[10px] sm:text-xs py-1 px-1.5 sm:px-2 md:px-3 flex items-center gap-1 whitespace-nowrap font-pixel"
                >
                  <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span className="hidden sm:inline">Discord</span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Right - Profile and Status */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Status Indicator - Above profile card */}
            <div className="flex items-center gap-2">
              <span className="font-body text-sm font-medium text-retro-dark">Status</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-retro-orange border-2 border-black"></div>
                <div className="w-3 h-3 rounded-full bg-white border-2 border-black"></div>
                <div className="w-3 h-3 rounded-full bg-white border-2 border-black"></div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="retro-card">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-retro-green border-4 border-black flex items-center justify-center text-3xl flex-shrink-0">
                  👤
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-body text-sm sm:text-base md:text-lg font-semibold text-retro-dark mb-1">Gaurav Sharma</h3>
                  <p className="font-body text-[10px] sm:text-xs md:text-sm text-gray-600 mb-2 sm:mb-3">Frontend • Creator</p>
                  <p className="font-body text-[10px] sm:text-xs md:text-sm text-gray-700 mb-3 sm:mb-4">
                    Want collabs, streaming hooks, packaging, or consulting? Ping me — I respond quickly.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <motion.button
                      onClick={() => {
                        // You can add pricing page or modal here
                        alert('Pricing information would be displayed here')
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="cursor-target rounded-lg border-2 border-black bg-white text-retro-dark text-[10px] sm:text-xs py-1 px-1.5 sm:px-2 md:px-3 font-pixel"
                    >
                      Pricing
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        // You can add availability info here
                        alert('Availability information would be displayed here')
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="cursor-target rounded-lg border-2 border-black bg-white text-retro-dark text-[10px] sm:text-xs py-1 px-1.5 sm:px-2 md:px-3 font-pixel"
                    >
                      Availability
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* CONNECT Section with Progress Bars */}
            <div className="retro-card">
              <div className="flex items-center gap-3 mb-4">
                <h4 className="font-pixel text-sm text-retro-dark">CONNECT</h4>
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded bg-retro-orange border-2 border-black"></div>
                  <div className="w-4 h-4 rounded bg-retro-orange border-2 border-black"></div>
                </div>
              </div>
              {/* Progress Bar 1 */}
              <div className="mb-3">
                <div className="w-full h-6 bg-gray-300 rounded border-2 border-black relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-retro-orange rounded" style={{ width: '95%' }}></div>
                </div>
              </div>
              {/* Progress Bar 2 */}
              <div>
                <div className="w-full h-6 bg-gray-300 rounded border-2 border-black relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-retro-orange rounded" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            {/* HP/XP Indicators */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border-2 border-black bg-white py-2 sm:py-3 px-2 sm:px-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="font-pixel text-[10px] sm:text-xs text-retro-dark">HP</span>
                  <span className="font-pixel text-xs sm:text-sm text-retro-dark">100</span>
                </div>
              </div>
              <div className="rounded-xl border-2 border-black bg-white py-2 sm:py-3 px-2 sm:px-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="font-pixel text-[10px] sm:text-xs text-retro-dark">XP</span>
                  <span className="font-pixel text-xs sm:text-sm text-retro-dark">39%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

