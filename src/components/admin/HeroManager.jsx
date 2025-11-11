import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { Save } from 'lucide-react'

const HeroManager = () => {
  const { hero, updateHero } = useAdmin()
  const [formData, setFormData] = useState({
    title: hero.title || '',
    subtitle: hero.subtitle || '',
    description: hero.description || '',
    tags: hero.tags?.join(', ') || '',
    miniCards: hero.miniCards || [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const heroData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
    }
    try {
      await updateHero(heroData)
    } catch (error) {
      console.error('Error updating hero:', error)
    }
  }

  const updateMiniCard = (index, field, value) => {
    const updated = [...formData.miniCards]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, miniCards: updated })
  }

  return (
    <div className="w-full">
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-retro-dark mb-4 md:mb-6">Hero Section Management</h2>

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
          <label className="block font-body text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="retro-input w-full bg-white resize-none"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium mb-2">Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="retro-input w-full bg-white"
            placeholder="React, TypeScript, Framer Motion"
            required
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium mb-3">Mini Cards</label>
          <div className="space-y-3">
            {formData.miniCards.map((card, index) => (
              <div key={index} className="border-2 border-gray-300 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-body text-xs font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => updateMiniCard(index, 'title', e.target.value)}
                      className="retro-input w-full bg-white text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-medium mb-1">Description</label>
                    <input
                      type="text"
                      value={card.desc}
                      onChange={(e) => updateMiniCard(index, 'desc', e.target.value)}
                      className="retro-input w-full bg-white text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-target retro-button bg-retro-orange text-white flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Hero Section
        </motion.button>
      </form>
    </div>
  )
}

export default HeroManager

