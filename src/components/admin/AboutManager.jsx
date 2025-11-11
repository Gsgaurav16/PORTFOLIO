import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { Save } from 'lucide-react'

const AboutManager = () => {
  const { about, updateAbout } = useAdmin()
  const [formData, setFormData] = useState({
    title: about.title || '',
    subtitle: about.subtitle || '',
    mission: about.mission || '',
    coreAbilities: about.coreAbilities?.join('\n') || '',
    stats: about.stats || { projects: 0, yearsXP: 0, videos: 0 },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const aboutData = {
      ...formData,
      coreAbilities: formData.coreAbilities.split('\n').filter(a => a.trim()),
    }
    try {
      await updateAbout(aboutData)
    } catch (error) {
      console.error('Error updating about:', error)
    }
  }

  return (
    <div className="w-full">
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-retro-dark mb-4 md:mb-6">About Section Management</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-body text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="retro-input w-full bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="retro-input w-full bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium mb-2">Mission Description</label>
          <textarea
            value={formData.mission}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            className="retro-input w-full bg-white resize-none"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium mb-2">Core Abilities (one per line)</label>
          <textarea
            value={formData.coreAbilities}
            onChange={(e) => setFormData({ ...formData, coreAbilities: e.target.value })}
            className="retro-input w-full bg-white resize-none"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium mb-3">Stats</label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-body text-xs font-medium mb-1">Projects</label>
              <input
                type="number"
                value={formData.stats.projects}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, projects: parseInt(e.target.value) },
                  })
                }
                className="retro-input w-full bg-white"
                required
              />
            </div>
            <div>
              <label className="block font-body text-xs font-medium mb-1">Years XP</label>
              <input
                type="number"
                value={formData.stats.yearsXP}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, yearsXP: parseInt(e.target.value) },
                  })
                }
                className="retro-input w-full bg-white"
                required
              />
            </div>
            <div>
              <label className="block font-body text-xs font-medium mb-1">Videos</label>
              <input
                type="number"
                value={formData.stats.videos}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, videos: parseInt(e.target.value) },
                  })
                }
                className="retro-input w-full bg-white"
                required
              />
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-target retro-button bg-retro-orange text-white flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save About Section
        </motion.button>
      </form>
    </div>
  )
}

export default AboutManager

