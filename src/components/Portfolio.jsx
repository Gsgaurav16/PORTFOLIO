import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Experience from './Experience'
import Testimonials from './Testimonials'
import Contact from './Contact'
import Footer from './Footer'
import TargetCursor from './TargetCursor'

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-retro-yellow">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default Portfolio

