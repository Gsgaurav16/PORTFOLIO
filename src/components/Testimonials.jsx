import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Circle, Coins } from 'lucide-react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      text: "Working with Gaurav was a game-changer. Their attention to detail and creative solutions are second to none. The final product exceeded all our expectations.",
      author: "JANE DOE",
      role: "CEO, Creative Minds LLC",
      rating: 5,
    },
    {
      text: "Gaurav's ability to combine technical expertise with creative design is unmatched. They delivered a stunning portfolio that perfectly captured our vision.",
      author: "JOHN SMITH",
      role: "Founder, Tech Innovations",
      rating: 5,
    },
    {
      text: "The retro gaming aesthetic Gaurav created was exactly what we needed. Professional, polished, and incredibly engaging. Highly recommend!",
      author: "SARAH JOHNSON",
      role: "Design Director, Pixel Studios",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-16 px-4 md:px-6 bg-retro-yellow">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-4 text-retro-dark">ARCADE REVIEWS</h2>
          <p className="font-body text-base md:text-lg text-retro-dark">Insert coin to continue</p>
        </motion.div>

        {/* Arcade Screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="retro-card max-w-4xl mx-auto"
        >
          {/* Arcade Top Bar */}
          <div className="flex items-center justify-between p-3 md:p-4 bg-retro-dark rounded-t-lg border-b-2 border-black">
            <div className="flex gap-2 md:gap-4">
              <span className="font-pixel text-[10px] md:text-xs text-white">START 1-P</span>
              <span className="font-pixel text-[10px] md:text-xs text-white hidden sm:inline">2-P VS</span>
              <span className="font-pixel text-[10px] md:text-xs text-white hidden md:inline">START 1000</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <span className="font-pixel text-[10px] md:text-xs text-white hidden sm:inline">CREDITS</span>
              <div className="flex gap-1">
                <Coins className="w-3 h-3 md:w-4 md:h-4 text-retro-yellow" />
                <Coins className="w-3 h-3 md:w-4 md:h-4 text-retro-yellow" />
                <Coins className="w-3 h-3 md:w-4 md:h-4 text-retro-yellow" />
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="p-4 md:p-8 bg-retro-yellow min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6 max-w-2xl"
              >
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto bg-retro-green rounded-full border-4 border-black flex items-center justify-center text-4xl">
                  👤
                </div>

                {/* Testimonial Text */}
                <p className="font-body text-base md:text-lg text-retro-dark italic px-2">
                  "{testimonials[currentTestimonial].text}"
                </p>

                {/* Rating */}
                <div className="flex justify-center gap-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-2xl text-retro-yellow">⭐</span>
                  ))}
                </div>

                {/* Author */}
                <div>
                  <p className="font-pixel text-sm text-retro-dark mb-1">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arcade Bottom Bar */}
          <div className="flex items-center justify-between p-4 bg-retro-dark rounded-b-lg border-t-2 border-black">
            <Circle className="w-6 h-6 text-black fill-black" />
            <div className="flex gap-2">
              <Circle className="w-6 h-6 text-retro-orange fill-retro-orange" />
              <Circle className="w-6 h-6 text-retro-orange fill-retro-orange" />
              <Circle className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-retro-yellow" />
              <span className="font-pixel text-xs text-white">SLOT</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center px-2">
            <p className="font-body text-[10px] sm:text-xs text-retro-dark">
              <span className="hidden sm:inline">PRESS START TO VIEW MORE - PRESS COINS FOR NEW REVIEWS - </span>KEEP PLAYING
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="cursor-target mt-4 retro-button bg-retro-orange text-white text-xs"
            >
              NEXT REVIEW
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials

