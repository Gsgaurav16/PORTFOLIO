import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import projectsRouter from './routes/projects.js'
import experiencesRouter from './routes/experiences.js'
import testimonialsRouter from './routes/testimonials.js'
import skillsRouter from './routes/skills.js'
import sectionsRouter from './routes/sections.js'
import authRouter from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/projects', projectsRouter)
app.use('/api/experiences', experiencesRouter)
app.use('/api/testimonials', testimonialsRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/sections', sectionsRouter)
app.use('/api/auth', authRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
})

