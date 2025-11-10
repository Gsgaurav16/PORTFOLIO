import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext()

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}

const defaultData = {
  projects: [
    {
      id: 1,
      title: 'PROJECT ONE',
      name: "Hi, I'm Gaurav Sharma",
      description: 'A passionate Full Stack Developer with 5+ years of experience crafting scalable, and performant applications using Java, React, Nest.js, TypeScript, Tailwind CSS, and FastAPI',
      shortDescription: 'Epic game-inspired landing page with GSAP animations.',
      tags: ['React', 'GSAP', 'Tailwind'],
      features: [
        'Hero intro with timeline-based scene reveal.',
        'Magnetic cursor + hover sfx synced to UI.',
        'Optimized 60fps scroll-driven sections.',
      ],
    },
    {
      id: 2,
      title: 'PROJECT TWO',
      name: 'Retro Dashboard',
      description: 'A futuristic admin dashboard with retro gaming theme.',
      shortDescription: 'A futuristic admin dashboard with retro gaming theme.',
      tags: ['Next.js', 'TypeScript', 'Framer Motion'],
      features: [
        'Real-time data visualization.',
        'Custom game-inspired components.',
        'Performance optimized rendering.',
      ],
    },
    {
      id: 3,
      title: 'PROJECT THREE',
      name: 'Arcade Portfolio',
      description: 'Interactive portfolio with arcade-style navigation.',
      shortDescription: 'Interactive portfolio with arcade-style navigation.',
      tags: ['React', 'Three.js', 'WebGL'],
      features: [
        '3D interactive elements.',
        'Arcade-style game mechanics.',
        'Mobile-friendly controls.',
      ],
    },
  ],
  experiences: [
    {
      id: 1,
      company: 'HYPERPLAY STUDIOS',
      role: 'Frontend Developer',
      period: '2021 - 2023',
      description: 'Game inspired UIs with real-time state and custom animation libs for super-smooth UIs.',
      achievements: [
        'Built custom UI/UX leveling with editable character levels',
        'Implemented real-time state management for gaming platform',
        'Created smooth animations using GSAP and Framer Motion',
        'Optimized performance for scalable gaming applications',
      ],
      tags: ['React', 'GSAP', 'Framer Motion', 'Next.js', 'Tailwind'],
    },
    {
      id: 2,
      company: 'CODECRAFT',
      role: 'Full Stack Developer',
      period: '2019 - 2021',
      description: 'Developed responsive web applications with focus on performance and user experience.',
      achievements: [
        'Built RESTful APIs and GraphQL endpoints',
        'Implemented authentication and authorization systems',
        'Created responsive designs for mobile and desktop',
        'Optimized database queries and caching strategies',
      ],
      tags: ['Node.js', 'React', 'MongoDB', 'GraphQL', 'Express'],
    },
    {
      id: 3,
      company: 'ARCHEMIS LABS',
      role: 'UI/UX Developer',
      period: '2018 - 2019',
      description: 'Designed and developed user interfaces with focus on accessibility and usability.',
      achievements: [
        'Created design systems and component libraries',
        'Implemented accessibility standards (WCAG 2.1)',
        'Conducted user research and usability testing',
        'Designed responsive layouts for multiple devices',
      ],
      tags: ['Figma', 'React', 'CSS', 'SASS', 'JavaScript'],
    },
  ],
  testimonials: [
    {
      id: 1,
      text: "Working with Gaurav was a game-changer. Their attention to detail and creative solutions are second to none. The final product exceeded all our expectations.",
      author: "JANE DOE",
      role: "CEO, Creative Minds LLC",
      rating: 5,
    },
    {
      id: 2,
      text: "Gaurav's ability to combine technical expertise with creative design is unmatched. They delivered a stunning portfolio that perfectly captured our vision.",
      author: "JOHN SMITH",
      role: "Founder, Tech Innovations",
      rating: 5,
    },
    {
      id: 3,
      text: "The retro gaming aesthetic Gaurav created was exactly what we needed. Professional, polished, and incredibly engaging. Highly recommend!",
      author: "SARAH JOHNSON",
      role: "Design Director, Pixel Studios",
      rating: 5,
    },
  ],
  skills: {
    foundations: {
      label: 'Foundations',
      skills: ['HTML', 'CSS', 'JAVASCRIPT', 'TYPESCRIPT', 'SASS', 'TAILWIND'],
      achievements: [
        'Semantic HTML with ARIA patterns and component tokens',
        'Advanced CSS animations and responsive design',
        'Modern JavaScript ES6+ and TypeScript proficiency',
      ],
    },
    frontend: {
      label: 'Frontend',
      skills: ['REACT', 'NEXT.JS', 'VUE', 'GSAP', 'FRAMER MOTION', 'THREE.JS'],
      achievements: [
        'Component-based architecture and state management',
        'Performance optimization and code splitting',
        'Interactive animations and 3D web experiences',
      ],
    },
    backend: {
      label: 'Backend',
      skills: ['NODE.JS', 'EXPRESS', 'MONGODB', 'POSTGRESQL', 'REST API', 'GRAPHQL'],
      achievements: [
        'RESTful API design and implementation',
        'Database design and optimization',
        'Server-side rendering and authentication',
      ],
    },
    design: {
      label: 'Design',
      skills: ['FIGMA', 'ADOBE XD', 'SKETCH', 'PRINCIPLE', 'AFTER EFFECTS', 'BLENDER'],
      achievements: [
        'User-centered design and prototyping',
        'Motion design and micro-interactions',
        '3D modeling and asset creation',
      ],
    },
    tools: {
      label: 'Tools & Engines',
      skills: ['GIT', 'GITHUB', 'DOCKER', 'AWS', 'VERCEL', 'NETLIFY'],
      achievements: [
        'Version control and CI/CD pipelines',
        'Cloud deployment and infrastructure',
        'DevOps and automation tools',
      ],
    },
  },
  hero: {
    title: "Hi, I'm Gaurav—",
    subtitle: "Dev & Creator",
    description: "I build game-inspired web experiences — heavy on performance, control, and delightful micro-interactions. I design interfaces that feel like menus and HUDs in retro games.",
    tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind', '3D/Assets'],
    miniCards: [
      { title: 'Top Project', desc: 'Live' },
      { title: 'Current Goal', desc: 'Next Level' },
      { title: 'Status', desc: 'Live' },
      { title: 'Shop', desc: 'Open' },
    ],
  },
  about: {
    title: 'ABOUT • PLAYER',
    subtitle: 'A game-inspired developer - UI/UX first design - retro arcade polish',
    mission: "I craft game-involved web experiences that are fast, tactile, and deliberately playful. Motion-first UI with careful performance optimization and interfaces that feel like a controller in your hands.",
    coreAbilities: [
      'Frontend Development',
      'UI/UX Design',
      'Performance Optimization',
      'Creative Problem Solving',
    ],
    stats: {
      projects: 42,
      yearsXP: 5,
      videos: 128,
    },
  },
  contact: {
    name: 'Gaurav Sharma',
    role: 'Frontend • Creator',
    bio: 'Want collabs, streaming hooks, packaging, or consulting? Ping me — I respond quickly.',
    email: 'contact@gauravsharma.dev',
    status: 'available',
  },
}

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [data, setData] = useState(defaultData)
  const [hydrated, setHydrated] = useState(false)
  const [adminPassword, setAdminPassword] = useState('admin123')

  // Load data from localStorage on mount
  useEffect(() => {
    const savedDataV2 = localStorage.getItem('portfolioData_v2')
    const savedData = localStorage.getItem('portfolioData')
    const savedAuth = localStorage.getItem('adminAuth')
    const savedPassword = localStorage.getItem('adminPassword')
    
    if (savedDataV2 || savedData) {
      try {
        const parsed = JSON.parse(savedDataV2 || savedData)
        if (parsed && typeof parsed === 'object') {
          setData(parsed)
        }
      } catch (e) {
        console.error('Error loading data:', e)
      }
    }
    
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
    if (savedPassword) {
      setAdminPassword(savedPassword)
    }
    setHydrated(true)
  }, [])

  // Save data to localStorage whenever it changes (after hydration)
  useEffect(() => {
    if (!hydrated) return
    const serialized = JSON.stringify(data)
    localStorage.setItem('portfolioData_v2', serialized)
    // keep old key for backward compatibility
    localStorage.setItem('portfolioData', serialized)
  }, [data, hydrated])

  const login = (password) => {
    // Simple password check (demo only)
    if (password === (adminPassword || 'admin123')) {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
  }
  
  const changePassword = (currentPassword, newPassword) => {
    // if not yet hydrated, do nothing
    if (!hydrated) return false
    const effective = adminPassword || 'admin123'
    if (currentPassword !== effective) return false
    setAdminPassword(newPassword)
    localStorage.setItem('adminPassword', newPassword)
    return true
  }

  // Projects CRUD
  const addProject = (project) => {
    const newProject = { ...project, id: Date.now() }
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (id, updatedProject) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...updatedProject, id } : p)
    }))
  }

  const deleteProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }))
  }

  // Experience CRUD
  const addExperience = (experience) => {
    const newExp = { ...experience, id: Date.now() }
    setData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }))
  }

  const updateExperience = (id, updatedExperience) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? { ...updatedExperience, id } : e)
    }))
  }

  const deleteExperience = (id) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }))
  }

  // Testimonials CRUD
  const addTestimonial = (testimonial) => {
    const newTest = { ...testimonial, id: Date.now() }
    setData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, newTest]
    }))
  }

  const updateTestimonial = (id, updatedTestimonial) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...updatedTestimonial, id } : t)
    }))
  }

  const deleteTestimonial = (id) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }))
  }

  // Skills CRUD
  const slugify = (label) =>
    label
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const updateSkills = (categoryId, skillsData) => {
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [categoryId]: {
          ...(prev.skills?.[categoryId] || {}),
          ...skillsData,
        }
      }
    }))
  }

  const addSkillsCategory = (label) => {
    const base = slugify(label || 'new-category')
    let id = base
    let i = 1
    while (data.skills[id]) {
      id = `${base}-${i++}`
    }
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [id]: { label: label || 'New Category', skills: [], achievements: [] }
      }
    }))
    return id
  }

  const renameSkillsCategory = (oldId, newLabel) => {
    const current = data.skills[oldId]
    if (!current) return oldId
    const base = slugify(newLabel || current.label || oldId)
    let newId = base
    let i = 1
    if (newId !== oldId) {
      while (data.skills[newId]) {
        newId = `${base}-${i++}`
      }
    }
    setData(prev => {
      const { [oldId]: removed, ...rest } = prev.skills
      return {
        ...prev,
        skills: {
          ...rest,
          [newId]: { ...removed, label: newLabel || removed.label || newId }
        }
      }
    })
    return newId
  }

  const deleteSkillsCategory = (categoryId) => {
    setData(prev => {
      const { [categoryId]: removed, ...rest } = prev.skills
      return { ...prev, skills: rest }
    })
  }

  // Hero Update
  const updateHero = (heroData) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...heroData }
    }))
  }

  // About Update
  const updateAbout = (aboutData) => {
    setData(prev => ({
      ...prev,
      about: { ...prev.about, ...aboutData }
    }))
  }

  // Contact Update
  const updateContact = (contactData) => {
    setData(prev => ({
      ...prev,
      contact: { ...prev.contact, ...contactData }
    }))
  }

  const value = {
    isAuthenticated,
    login,
    logout,
    changePassword,
    data,
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
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

