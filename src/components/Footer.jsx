import { motion } from 'framer-motion'
import { ArrowUp, Mail } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-16 px-6 bg-retro-yellow relative">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="font-pixel text-4xl md:text-5xl text-white" style={{ textShadow: '3px 3px 0px #000' }}>
            LET'S BUILD SOMETHING EPIC
          </h2>
          <motion.a
            href="mailto:contact@gauravsharma.dev"
            whileHover={{ scale: 1.05 }}
            className="cursor-target inline-block retro-button bg-white text-retro-dark flex items-center gap-2 mx-auto text-xs sm:text-sm"
          >
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="break-all">contact@gauravsharma.dev</span>
          </motion.a>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t-2 border-black gap-4 sm:gap-0">
          <p className="font-body text-xs sm:text-sm text-retro-dark text-center sm:text-left">
            © 2025 Gaurav | All rights reserved.
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="cursor-target retro-button bg-white text-retro-dark flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2"
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">SCROLL TO TOP</span>
            <span className="sm:hidden">TOP</span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer

