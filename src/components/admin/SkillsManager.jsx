import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Edit2 } from 'lucide-react'

const SkillsManager = () => {
  const { skills, updateSkills, addSkillsCategory, renameSkillsCategory, deleteSkillsCategory } = useAdmin()
  const [expandedCategories, setExpandedCategories] = useState({})
  const [formData, setFormData] = useState({})
  const [newSkillText, setNewSkillText] = useState({})
  const [newAchievementText, setNewAchievementText] = useState({})
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategoryLabel, setNewCategoryLabel] = useState('')

  const categories = Object.keys(skills || {}).map((id) => ({
    id,
    label: skills?.[id]?.label || id,
    icon: '🛠️',
  }))

  // Initialize form data from context
  useEffect(() => {
    const initial = {}
    const expanded = {}
    const addSkillInit = {}
    const addAchInit = {}
    Object.entries(skills || {}).forEach(([id, cfg]) => {
      initial[id] = {
        skills: cfg?.skills || [],
        achievements: cfg?.achievements || [],
        label: cfg?.label || id,
      }
      expanded[id] = true
      addSkillInit[id] = ''
      addAchInit[id] = ''
    })
    setFormData(initial)
    setExpandedCategories(expanded)
    setNewSkillText(addSkillInit)
    setNewAchievementText(addAchInit)
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
  }

  const handleSaveAll = () => {
    categories.forEach((cat) => {
      const { skills: s = [], achievements: a = [], label } = formData[cat.id] || {}
      updateSkills(cat.id, { skills: s, achievements: a, label })
    })
  }

  const addSkill = (categoryId) => {
    const text = (newSkillText[categoryId] || '').trim()
    if (!text) return
    setFormData((prev) => {
      const next = {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          skills: [...(prev[categoryId].skills || []), text],
        },
      }
      updateSkills(categoryId, next[categoryId])
      return next
    })
    setNewSkillText((prev) => ({ ...prev, [categoryId]: '' }))
  }

  const removeSkill = (categoryId, skillIndex) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          skills: prev[categoryId].skills.filter((_, index) => index !== skillIndex),
        },
      }
      updateSkills(categoryId, next[categoryId])
      return next
    })
  }

  const renameSkill = (categoryId, skillIndex) => {
    const current = formData[categoryId]?.skills?.[skillIndex] ?? ''
    const updated = prompt('Rename skill:', current)
    if (updated && updated.trim() && updated.trim() !== current) {
      setFormData((prev) => {
        const nextSkills = [...(prev[categoryId].skills || [])]
        nextSkills[skillIndex] = updated.trim()
        const next = {
          ...prev,
          [categoryId]: {
            ...prev[categoryId],
            skills: nextSkills,
          },
        }
        updateSkills(categoryId, next[categoryId])
        return next
      })
    }
  }

  const addAchievement = (categoryId) => {
    const text = (newAchievementText[categoryId] || '').trim()
    if (!text) return
    setFormData((prev) => {
      const next = {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          achievements: [...(prev[categoryId].achievements || []), text],
        },
      }
      updateSkills(categoryId, next[categoryId])
      return next
    })
    setNewAchievementText((prev) => ({ ...prev, [categoryId]: '' }))
  }

  const removeAchievement = (categoryId, achievementIndex) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          achievements: prev[categoryId].achievements.filter((_, index) => index !== achievementIndex),
        },
      }
      updateSkills(categoryId, next[categoryId])
      return next
    })
  }

  const addCategory = () => {
    const label = newCategoryLabel.trim()
    if (!label) return
    const id = addSkillsCategory(label)
    setFormData((prev) => ({
      ...prev,
      [id]: { label, skills: [], achievements: [] },
    }))
    setExpandedCategories((prev) => ({ ...prev, [id]: true }))
    setNewSkillText((prev) => ({ ...prev, [id]: '' }))
    setNewAchievementText((prev) => ({ ...prev, [id]: '' }))
    setIsAddingCategory(false)
    setNewCategoryLabel('')
  }

  const renameCategory = (categoryId) => {
    const current = formData[categoryId]?.label || skills?.[categoryId]?.label || categoryId
    const newLabel = prompt('Rename category:', current)
    if (!newLabel || !newLabel.trim() || newLabel.trim() === current) return
    const newId = renameSkillsCategory(categoryId, newLabel.trim())
    setFormData((prev) => {
      const { [categoryId]: removed, ...rest } = prev
      return {
        ...rest,
        [newId]: { ...(removed || {}), label: newLabel.trim() },
      }
    })
    setExpandedCategories((prev) => {
      const { [categoryId]: old, ...rest } = prev
      return { ...rest, [newId]: old ?? true }
    })
  }

  const removeCategory = (categoryId) => {
    deleteSkillsCategory(categoryId)
    setFormData((prev) => {
      const { [categoryId]: removed, ...rest } = prev
      return rest
    })
    setExpandedCategories((prev) => {
      const { [categoryId]: removed, ...rest } = prev
      return rest
    })
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-4">
        <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-retro-dark">Skills Management</h2>
        <div className="flex items-center gap-2">
          {isAddingCategory ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newCategoryLabel}
                onChange={(e) => setNewCategoryLabel(e.target.value)}
                className="retro-input bg-white text-sm"
                placeholder="New category name (e.g., Cybersecurity)"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addCategory}
                className="cursor-target retro-button bg-retro-orange text-white text-xs sm:text-sm"
              >
                Add
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setIsAddingCategory(false); setNewCategoryLabel('') }}
                className="cursor-target retro-button bg-gray-200 text-retro-dark text-xs sm:text-sm"
              >
                Cancel
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingCategory(true)}
              className="cursor-target retro-button bg-white text-retro-dark flex items-center gap-2 text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </motion.button>
          )}
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
                  <h3 className="font-pixel text-lg text-retro-dark">{categoryData.label || category.label}</h3>
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
                      renameCategory(category.id)
                    }}
                    className="cursor-target p-2 hover:bg-yellow-100 rounded transition-colors"
                    title="Rename category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      removeCategory(category.id)
                    }}
                    className="cursor-target p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
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
                              onClick={() => renameSkill(category.id, index)}
                              className="cursor-target hover:text-retro-dark/70 transition-colors"
                              title="Rename skill"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
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
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="text"
                        value={newSkillText[category.id] || ''}
                        onChange={(e) => setNewSkillText((prev) => ({ ...prev, [category.id]: e.target.value }))}
                        className="retro-input bg-white flex-1"
                        placeholder="Add a skill (e.g., CYBERSECURITY)"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addSkill(category.id)}
                        className="cursor-target retro-button bg-retro-yellow text-retro-dark"
                      >
                        Add
                      </motion.button>
                    </div>
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
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="text"
                        value={newAchievementText[category.id] || ''}
                        onChange={(e) => setNewAchievementText((prev) => ({ ...prev, [category.id]: e.target.value }))}
                        className="retro-input bg-white flex-1"
                        placeholder="Add an achievement"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addAchievement(category.id)}
                        className="cursor-target retro-button bg-retro-yellow text-retro-dark"
                      >
                        Add
                      </motion.button>
                    </div>
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

