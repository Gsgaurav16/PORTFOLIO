import supabase from '../db/connection.js'
import bcrypt from 'bcryptjs'

async function seed() {
  try {
    console.log('🌱 Seeding Supabase database with default data...')
    
    // Insert default admin password (admin123)
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const { error: adminError } = await supabase
      .from('admin')
      .upsert({ id: 1, password_hash: hashedPassword }, { onConflict: 'id' })
    
    if (adminError) {
      console.error('Error seeding admin:', adminError)
    } else {
      console.log('✅ Admin seeded')
    }
    
    // Insert default hero data
    const { error: heroError } = await supabase
      .from('hero')
      .upsert({
        id: 1,
        title: "Hi, I'm Gaurav—",
        subtitle: 'Dev & Creator',
        description: 'I build game-inspired web experiences — heavy on performance, control, and delightful micro-interactions. I design interfaces that feel like menus and HUDs in retro games.',
        tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind', '3D/Assets'],
        mini_cards: [
          { title: 'Top Project', desc: 'Live' },
          { title: 'Current Goal', desc: 'Next Level' },
          { title: 'Status', desc: 'Live' },
          { title: 'Shop', desc: 'Open' },
        ],
      }, { onConflict: 'id' })
    
    if (heroError) {
      console.error('Error seeding hero:', heroError)
    } else {
      console.log('✅ Hero seeded')
    }
    
    // Insert default about data
    const { error: aboutError } = await supabase
      .from('about')
      .upsert({
        id: 1,
        title: 'ABOUT • PLAYER',
        subtitle: 'A game-inspired developer - UI/UX first design - retro arcade polish',
        mission: 'I craft game-involved web experiences that are fast, tactile, and deliberately playful. Motion-first UI with careful performance optimization and interfaces that feel like a controller in your hands.',
        core_abilities: [
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
      }, { onConflict: 'id' })
    
    if (aboutError) {
      console.error('Error seeding about:', aboutError)
    } else {
      console.log('✅ About seeded')
    }
    
    // Insert default contact data
    const { error: contactError } = await supabase
      .from('contact')
      .upsert({
        id: 1,
        name: 'Gaurav Sharma',
        role: 'Frontend • Creator',
        bio: 'Want collabs, streaming hooks, packaging, or consulting? Ping me — I respond quickly.',
        email: 'contact@gauravsharma.dev',
        status: 'available',
      }, { onConflict: 'id' })
    
    if (contactError) {
      console.error('Error seeding contact:', contactError)
    } else {
      console.log('✅ Contact seeded')
    }
    
    // Insert default skills categories
    const defaultCategories = [
      {
        category_id: 'foundations',
        label: 'Foundations',
        skills: ['HTML', 'CSS', 'JAVASCRIPT', 'TYPESCRIPT', 'SASS', 'TAILWIND'],
        achievements: [
          'Semantic HTML with ARIA patterns and component tokens',
          'Advanced CSS animations and responsive design',
          'Modern JavaScript ES6+ and TypeScript proficiency',
        ],
      },
      {
        category_id: 'frontend',
        label: 'Frontend',
        skills: ['REACT', 'NEXT.JS', 'VUE', 'GSAP', 'FRAMER MOTION', 'THREE.JS'],
        achievements: [
          'Component-based architecture and state management',
          'Performance optimization and code splitting',
          'Interactive animations and 3D web experiences',
        ],
      },
      {
        category_id: 'backend',
        label: 'Backend',
        skills: ['NODE.JS', 'EXPRESS', 'MONGODB', 'POSTGRESQL', 'REST API', 'GRAPHQL'],
        achievements: [
          'RESTful API design and implementation',
          'Database design and optimization',
          'Server-side rendering and authentication',
        ],
      },
      {
        category_id: 'design',
        label: 'Design',
        skills: ['FIGMA', 'ADOBE XD', 'SKETCH', 'PRINCIPLE', 'AFTER EFFECTS', 'BLENDER'],
        achievements: [
          'User-centered design and prototyping',
          'Motion design and micro-interactions',
          '3D modeling and asset creation',
        ],
      },
      {
        category_id: 'tools',
        label: 'Tools & Engines',
        skills: ['GIT', 'GITHUB', 'DOCKER', 'AWS', 'VERCEL', 'NETLIFY'],
        achievements: [
          'Version control and CI/CD pipelines',
          'Cloud deployment and infrastructure',
          'DevOps and automation tools',
        ],
      },
    ]
    
    for (const category of defaultCategories) {
      const { error } = await supabase
        .from('skills_categories')
        .upsert(category, { onConflict: 'category_id' })
      
      if (error) {
        console.error(`Error seeding category ${category.category_id}:`, error)
      }
    }
    
    console.log('✅ Skills categories seeded')
    
    // Insert default projects
    const defaultProjects = [
      {
        title: 'Retro Portfolio',
        name: 'retro-portfolio',
        description: 'A game-inspired portfolio website with retro aesthetics, built with React and Framer Motion. Features smooth animations, pixel-perfect design, and a unique gaming UI experience.',
        short_description: 'Game-inspired portfolio with retro aesthetics',
        tags: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'],
        features: [
          'Smooth animations and transitions',
          'Responsive design',
          'Admin panel for content management',
          'Retro gaming UI elements',
        ],
      },
      {
        title: 'E-Commerce Platform',
        name: 'ecommerce-platform',
        description: 'A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard. Built with modern web technologies for optimal performance.',
        short_description: 'Full-stack e-commerce solution',
        tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
        features: [
          'User authentication and authorization',
          'Payment processing',
          'Product management',
          'Order tracking',
        ],
      },
      {
        title: 'Task Management App',
        name: 'task-manager',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        short_description: 'Collaborative task management app',
        tags: ['React', 'Socket.io', 'MongoDB', 'Express'],
        features: [
          'Real-time collaboration',
          'Drag and drop interface',
          'Team workspaces',
          'Task assignments and deadlines',
        ],
      },
    ]
    
    for (const project of defaultProjects) {
      const { error } = await supabase
        .from('projects')
        .upsert(project, { onConflict: 'id' })
      
      if (error) {
        console.error(`Error seeding project ${project.name}:`, error)
      }
    }
    
    console.log('✅ Projects seeded')
    
    // Insert default experiences
    const defaultExperiences = [
      {
        company: 'Tech Startup Inc.',
        role: 'Senior Frontend Developer',
        period: '2022 - Present',
        description: 'Leading frontend development for multiple client projects, focusing on React-based applications and performance optimization.',
        achievements: [
          'Improved application performance by 40% through code optimization',
          'Led a team of 3 junior developers',
          'Implemented design system used across 10+ projects',
        ],
        tags: ['React', 'TypeScript', 'Team Leadership', 'Performance'],
      },
      {
        company: 'Digital Agency',
        role: 'Frontend Developer',
        period: '2020 - 2022',
        description: 'Developed responsive web applications for various clients, working closely with designers to implement pixel-perfect UI/UX designs.',
        achievements: [
          'Delivered 20+ client projects on time',
          'Reduced page load times by 50%',
          'Mentored 2 junior developers',
        ],
        tags: ['React', 'Vue.js', 'CSS', 'UI/UX'],
      },
      {
        company: 'Freelance',
        role: 'Web Developer',
        period: '2019 - 2020',
        description: 'Worked as a freelance developer, building custom websites and web applications for small businesses and startups.',
        achievements: [
          'Completed 15+ freelance projects',
          'Maintained 100% client satisfaction rate',
          'Built reusable component library',
        ],
        tags: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
      },
    ]
    
    for (const experience of defaultExperiences) {
      const { error } = await supabase
        .from('experiences')
        .upsert(experience, { onConflict: 'id' })
      
      if (error) {
        console.error(`Error seeding experience ${experience.company}:`, error)
      }
    }
    
    console.log('✅ Experiences seeded')
    
    // Insert default testimonials
    const defaultTestimonials = [
      {
        text: 'Gaurav delivered an exceptional portfolio website that perfectly captured our vision. The attention to detail and smooth animations made it stand out from the competition.',
        author: 'Sarah Johnson',
        role: 'Creative Director',
        rating: 5,
      },
      {
        text: 'Working with Gaurav was a pleasure. He transformed our ideas into a beautiful, functional website that exceeded our expectations. Highly recommended!',
        author: 'Michael Chen',
        role: 'Product Manager',
        rating: 5,
      },
      {
        text: 'The retro gaming aesthetic Gaurav created for our portfolio was exactly what we wanted. The user experience is smooth and engaging. Great work!',
        author: 'Emily Rodriguez',
        role: 'Marketing Lead',
        rating: 5,
      },
    ]
    
    for (const testimonial of defaultTestimonials) {
      const { error } = await supabase
        .from('testimonials')
        .upsert(testimonial, { onConflict: 'id' })
      
      if (error) {
        console.error(`Error seeding testimonial from ${testimonial.author}:`, error)
      }
    }
    
    console.log('✅ Testimonials seeded')
    console.log('✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()

