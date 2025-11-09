import { motion } from 'framer-motion'
import { useState } from 'react'

const RobotCharacter = ({ className = "", imageSrc = "/images/robot-character.png" }) => {
  const [imageError, setImageError] = useState(false)

  // If image fails to load, show a placeholder or fallback
  if (imageError) {
    return (
      <motion.div
        className={`relative ${className} flex items-center justify-center`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🤖</div>
          <p className="font-body text-sm text-gray-600">
            Add robot image to<br />
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">public/images/robot-character.png</code>
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`relative ${className} flex items-center justify-center`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', height: '100%' }}
    >
      <img 
        src={imageSrc} 
        alt="Robot Character" 
        className="object-contain"
        style={{ 
          width: '100%', 
          height: '100%',
          minHeight: '500px',
          objectFit: 'contain'
        }}
        onError={() => setImageError(true)}
      />
    </motion.div>
  )
}

export default RobotCharacter
