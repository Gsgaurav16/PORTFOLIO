import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

const SkillsManager = () => {
  const { skills, updateSkills } = useAdmin()
  const [expandedCategories, setExpandedCategories] = useState({
    foundations: true,
    frontend: true,
    backend: true,
    design: true,
    tools: true,
  })
  const [formData, setFormData] = useState({
    foundations: { skills: [], achievements: [] },
    frontend: { skills: [], achievements: [] },
    backend: { skills: [], achievements: [] },
    design: { skills: [], achievements: [] },
    tools: { skills: [], achievements: [] },
  })

  const categories = [
    { id: 'foundations', label: 'Foundations', icon: '📚' },
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'design', label: 'Design', icon: '✨' },
    { id: 'tools', label: 'Tools & Engines', icon: '🛠️' },
  ]

  // Initialize form data from context
  useEffect(() => {
    const initialData = {
      foundations: { 
        skills: skills?.foundations?.skills || [], 
        achievements: skills?.foundations?.achievements || [] 
      },
      frontend: { 
        skills: skills?.frontend?.skills || [], 
        achievements: skills?.frontend?.achievements || [] 
      },
      backend: { 
        skills: skills?.backend?.skills || [], 
        achievements: skills?.backend?.achievements || [] 
      },
      design: { 
        skills: skills?.design?.skills || [], 
        achievements: skills?.design?.achievements || [] 
      },
      tools: { 
        skills: skills?.tools?.skills || [], 
        achievements: skills?.tools?.achievements || [] 
      },
    }
    setFormData(initialData)
  }, [skills])

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const handleSkillChange = (categoryId, value) => {
    setFormData((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        skills: value.split(',').map((s) => s.trim()).filter((s) => s),
      },
    }))
  }

  const handleAchievementChange = (categoryId, value) => {
    setFormData((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        achievements: value.split('\n').filter((a) => a.trim()),
      },
    }))
  }

  const handleSaveCategory = (categoryId) => {
    updateSkills(categoryId, formData[categoryId])
    alert(`${categories.find((c) => c.id === categoryId)?.label} updated successfully!`)
  }

  const handleSaveAll = () => {
    categories.forEach((cat) => {
      updateSkills(cat.id, formData[cat.id])
    })
    alert('All skills updated successfully!')
  }

  const addSkill = (categoryId) => {
    const newSkill = prompt('Enter new skill:')
    if (newSkill && newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          skills: [...prev[categoryId].skills, newSkill.trim()],
        },
      }))
    }
  }

  const removeSkill = (categoryId, skillIndex) => {
    setFormData((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        skills: prev[categoryId].skills.filter((_, index) => index !== skillIndex),
      },
    }))
  }

  const addAchievement = (categoryId) => {
    const newAchievement = prompt('Enter new achievement:')
    if (newAchievement && newAchievement.trim()) {
      setFormData((prev) => ({
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          achievements: [...prev[categoryId].achievements, newAchievement.trim()],
        },
      }))
    }
  }

  const removeAchievement = (categoryId, achievementIndex) => {
    setFormData((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        achievements: prev[categoryId].achievements.filter((_, index) => index !== achievementIndex),
      },
    }))
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-4">
        <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-retro-dark">Skills Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveAll}
          className="cursor-target retro-button bg-retro-green text-white flex items-center gap-2 text-xs sm:text-sm"
        >
          <Save className="w-4 h-4" />
          Save All Categories
        </motion.button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => {
          const categoryData = formData[category.id] || { skills: [], achievements: [] }
          const isExpanded = expandedCategories[category.id]

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="retro-card bg-white border-2 border-black"
            >
              {/* Category Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-t-lg transition-colors"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-pixel text-lg text-retro-dark">{category.label}</h3>
                  <span className="text-xs text-gray-500">
                    ({categoryData.skills?.length || 0} skills, {categoryData.achievements?.length || 0} achievements)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSaveCategory(category.id)
                    }}
                    className="cursor-target p-2 hover:bg-retro-orange hover:text-white rounded transition-colors"
                    title="Save this category"
                  >
                    <Save className="w-4 h-4" />
                  </motion.button>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-retro-dark" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-retro-dark" />
                  )}
                </div>
              </div>

              {/* Category Content */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-4 pt-0 space-y-4 border-t-2 border-gray-200"
                >
                  {/* Skills Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-body text-sm font-medium text-retro-dark">
                        Skills
                      </label>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addSkill(category.id)}
                        className="cursor-target p-1 hover:bg-retro-yellow rounded transition-colors"
                        title="Add skill"
                      >
                        <Plus className="w-4 h-4 text-retro-orange" />
                      </motion.button>
                    </div>
                    <input
                      type="text"
                      value={categoryData.skills?.join(', ') || ''}
                      onChange={(e) => handleSkillChange(category.id, e.target.value)}
                      className="retro-input w-full bg-white"
                      placeholder="HTML, CSS, JavaScript (comma separated)"
                    />
                    {categoryData.skills && categoryData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {categoryData.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-retro-yellow border border-black rounded-lg text-xs font-body"
                          >
                            {skill}
                            <button
                              onClick={() => removeSkill(category.id, index)}
                              className="cursor-target hover:text-red-600 transition-colors"
                              title="Remove skill"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Achievements Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-body text-sm font-medium text-retro-dark">
                        Achievements
                      </label>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addAchievement(category.id)}
                        className="cursor-target p-1 hover:bg-retro-yellow rounded transition-colors"
                        title="Add achievement"
                      >
                        <Plus className="w-4 h-4 text-retro-orange" />
                      </motion.button>
                    </div>
                    <textarea
                      value={categoryData.achievements?.join('\n') || ''}
                      onChange={(e) => handleAchievementChange(category.id, e.target.value)}
                      className="retro-input w-full bg-white resize-none"
                      rows="4"
                      placeholder="Enter achievements (one per line)"
                    />
                    {categoryData.achievements && categoryData.achievements.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {categoryData.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg"
                          >
                            <span className="text-retro-orange font-bold">•</span>
                            <span className="flex-1 text-sm font-body text-retro-dark">{achievement}</span>
                            <button
                              onClick={() => removeAchievement(category.id, index)}
                              className="cursor-target p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
                              title="Remove achievement"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillsManager

