import { createContext, useContext, useState, useEffect } from 'react'
import {
  getPortfolioData,
  projectsAPI,
  experiencesAPI,
  testimonialsAPI,
  skillsAPI,
  sectionsAPI,
  authAPI,
} from '../utils/api'

const AdminContext = createContext()

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}

const defaultData = {
  projects: [],
  experiences: [],
  testimonials: [],
  skills: {},
  hero: {
    title: '',
    subtitle: '',
    description: '',
    tags: [],
    miniCards: [],
  },
  about: {
    title: '',
    subtitle: '',
    mission: '',
    coreAbilities: [],
    stats: {},
  },
  contact: {
    name: '',
    role: '',
    bio: '',
    email: '',
    status: '',
  },
}

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load data from API on mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const portfolioData = await getPortfolioData()
      setData(portfolioData)
    } catch (err) {
      console.error('Error loading data:', err)
      setError(err.message)
      // Keep default data on error
    } finally {
      setLoading(false)
    }
  }

  const login = async (password) => {
    try {
      const result = await authAPI.login(password)
      if (result.authenticated) {
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (err) {
      console.error('Login error:', err)
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await authAPI.changePassword(currentPassword, newPassword)
      return true
    } catch (err) {
      console.error('Change password error:', err)
      return false
    }
  }

  // Projects CRUD
  const addProject = async (project) => {
    try {
      const newProject = await projectsAPI.create(project)
      setData((prev) => ({
        ...prev,
        projects: [...prev.projects, newProject],
      }))
      return newProject
    } catch (err) {
      console.error('Error adding project:', err)
      throw err
    }
  }

  const updateProject = async (id, updatedProject) => {
    try {
      const project = await projectsAPI.update(id, updatedProject)
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) => (p.id === id ? project : p)),
      }))
      return project
    } catch (err) {
      console.error('Error updating project:', err)
      throw err
    }
  }

  const deleteProject = async (id) => {
    try {
      await projectsAPI.delete(id)
      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }))
    } catch (err) {
      console.error('Error deleting project:', err)
      throw err
    }
  }

  // Experience CRUD
  const addExperience = async (experience) => {
    try {
      const newExp = await experiencesAPI.create(experience)
      setData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, newExp],
      }))
      return newExp
    } catch (err) {
      console.error('Error adding experience:', err)
      throw err
    }
  }

  const updateExperience = async (id, updatedExperience) => {
    try {
      const experience = await experiencesAPI.update(id, updatedExperience)
      setData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((e) => (e.id === id ? experience : e)),
      }))
      return experience
    } catch (err) {
      console.error('Error updating experience:', err)
      throw err
    }
  }

  const deleteExperience = async (id) => {
    try {
      await experiencesAPI.delete(id)
      setData((prev) => ({
        ...prev,
        experiences: prev.experiences.filter((e) => e.id !== id),
      }))
    } catch (err) {
      console.error('Error deleting experience:', err)
      throw err
    }
  }

  // Testimonials CRUD
  const addTestimonial = async (testimonial) => {
    try {
      const newTest = await testimonialsAPI.create(testimonial)
      setData((prev) => ({
        ...prev,
        testimonials: [...prev.testimonials, newTest],
      }))
      return newTest
    } catch (err) {
      console.error('Error adding testimonial:', err)
      throw err
    }
  }

  const updateTestimonial = async (id, updatedTestimonial) => {
    try {
      const testimonial = await testimonialsAPI.update(id, updatedTestimonial)
      setData((prev) => ({
        ...prev,
        testimonials: prev.testimonials.map((t) => (t.id === id ? testimonial : t)),
      }))
      return testimonial
    } catch (err) {
      console.error('Error updating testimonial:', err)
      throw err
    }
  }

  const deleteTestimonial = async (id) => {
    try {
      await testimonialsAPI.delete(id)
      setData((prev) => ({
        ...prev,
        testimonials: prev.testimonials.filter((t) => t.id !== id),
      }))
    } catch (err) {
      console.error('Error deleting testimonial:', err)
      throw err
    }
  }

  // Skills CRUD
  const slugify = (label) =>
    label
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const updateSkills = async (categoryId, skillsData) => {
    try {
      const updated = await skillsAPI.update(categoryId, skillsData)
      setData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [categoryId]: updated,
        },
      }))
      return updated
    } catch (err) {
      console.error('Error updating skills:', err)
      throw err
    }
  }

  const addSkillsCategory = async (label) => {
    try {
      const base = slugify(label || 'new-category')
      let categoryId = base
      let i = 1
      while (data.skills[categoryId]) {
        categoryId = `${base}-${i++}`
      }
      const newCategory = await skillsAPI.create(categoryId, {
        label: label || 'New Category',
        skills: [],
        achievements: [],
      })
      setData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [categoryId]: newCategory,
        },
      }))
      return categoryId
    } catch (err) {
      console.error('Error adding skills category:', err)
      throw err
    }
  }

  const renameSkillsCategory = async (oldId, newLabel) => {
    try {
      const current = data.skills[oldId]
      if (!current) return oldId
      const base = slugify(newLabel || current.label || oldId)
      let newId = base
      let i = 1
      if (newId !== oldId) {
        while (data.skills[newId] && newId !== oldId) {
          newId = `${base}-${i++}`
        }
      }
      if (newId !== oldId) {
        // Create new category with new ID
        await skillsAPI.create(newId, {
          label: newLabel || current.label || newId,
          skills: current.skills || [],
          achievements: current.achievements || [],
        })
        // Delete old category
        await skillsAPI.delete(oldId)
        setData((prev) => {
          const { [oldId]: removed, ...rest } = prev.skills
          return {
            ...prev,
            skills: {
              ...rest,
              [newId]: {
                label: newLabel || removed.label || newId,
                skills: removed.skills || [],
                achievements: removed.achievements || [],
              },
            },
          }
        })
        return newId
      } else {
        // Just update the label
        await updateSkills(oldId, {
          ...current,
          label: newLabel || current.label || oldId,
        })
        return oldId
      }
    } catch (err) {
      console.error('Error renaming skills category:', err)
      throw err
    }
  }

  const deleteSkillsCategory = async (categoryId) => {
    try {
      await skillsAPI.delete(categoryId)
      setData((prev) => {
        const { [categoryId]: removed, ...rest } = prev.skills
        return { ...prev, skills: rest }
      })
    } catch (err) {
      console.error('Error deleting skills category:', err)
      throw err
    }
  }

  // Hero Update
  const updateHero = async (heroData) => {
    try {
      const updated = await sectionsAPI.updateHero(heroData)
      setData((prev) => ({
        ...prev,
        hero: updated,
      }))
      return updated
    } catch (err) {
      console.error('Error updating hero:', err)
      throw err
    }
  }

  // About Update
  const updateAbout = async (aboutData) => {
    try {
      const updated = await sectionsAPI.updateAbout(aboutData)
      setData((prev) => ({
        ...prev,
        about: updated,
      }))
      return updated
    } catch (err) {
      console.error('Error updating about:', err)
      throw err
    }
  }

  // Contact Update
  const updateContact = async (contactData) => {
    try {
      const updated = await sectionsAPI.updateContact(contactData)
      setData((prev) => ({
        ...prev,
        contact: updated,
      }))
      return updated
    } catch (err) {
      console.error('Error updating contact:', err)
      throw err
    }
  }

  const value = {
    isAuthenticated,
    login,
    logout,
    changePassword,
    data,
    loading,
    error,
    // Projects
    projects: data.projects,
    addProject,
    updateProject,
    deleteProject,
    // Experience
    experiences: data.experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    // Testimonials
    testimonials: data.testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    // Skills
    skills: data.skills,
    updateSkills,
    addSkillsCategory,
    renameSkillsCategory,
    deleteSkillsCategory,
    // Hero
    hero: data.hero,
    updateHero,
    // About
    about: data.about,
    updateAbout,
    // Contact
    contact: data.contact,
    updateContact,
    // Reload data
    reloadData: loadData,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
