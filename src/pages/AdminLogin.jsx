import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { Lock, Gamepad2 } from 'lucide-react'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (login(password)) {
      navigate('/admin/dashboard')
    } else {
      setError('Invalid password!')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-retro-yellow flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="retro-card max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-4"
          >
            <Gamepad2 className="w-16 h-16 text-retro-orange mx-auto" />
          </motion.div>
          <h1 className="font-pixel text-3xl mb-2 text-retro-dark">ADMIN PANEL</h1>
          <p className="font-body text-sm text-gray-600">Enter password to access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-body text-sm font-medium mb-2 text-retro-dark">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="retro-input w-full pl-12 bg-retro-yellow"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs mt-2 font-body"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-target w-full retro-button bg-retro-orange text-white"
          >
            LOGIN
          </motion.button>
        </form>

        {/* Default password hint removed for security and cleaner UI */}
      </motion.div>
    </div>
  )
}

export default AdminLogin

