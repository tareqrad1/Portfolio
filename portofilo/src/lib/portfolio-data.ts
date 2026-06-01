export const portfolioData = {
  about: {
    summary:
      'Full Stack Developer with 2+ years of experience designing and implementing scalable web applications. Strong in both front-end and back-end technologies with robust problem-solving skills — proficient in modern frameworks with a deep understanding of OOP, data structures, and algorithms. Passionate about creating innovative solutions in collaborative environments.',
    email: 'raditareq16@gmail.com',
    phone: '+970 597 053 085',
  },

  skills: [
    {
      category: 'Frontend',
      items: [
        'React', 'Next.js', 'TypeScript', 'JavaScript',
        'TailwindCSS', 'GSAP', 'React Native', 'Zustand',
        'TanStack Query', 'React Hook Form', 'SWR',
      ],
    },
    {
      category: 'Backend',
      items: [
        'Node.js', 'Express.js', 'REST API', 'JWT',
        'Joi', 'OTP Auth', 'Payment Integration',
      ],
    },
    {
      category: 'Database',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'Postman', 'Vercel'],
    },
  ],

  experience: [
    {
      role: 'React & Next.js Developer Intern',
      company: 'Code Tech',
      location: 'Gaza — On-site',
      period: 'Apr 2025 – Jun 2025',
      bullets: [
        'Implemented advanced React patterns and built reusable component libraries.',
        'Developed a full-stack project using Next.js with server-side rendering (SSR).',
        'Integrated APIs into modular React components and optimized UI performance.',
        'Built modern, responsive UIs using design systems and component libraries.',
        'Collaborated using GitHub for version control and task management.',
      ],
    },
    {
      role: 'React.js Developer',
      company: 'Gaza Sky Geeks',
      location: 'Remote',
      period: 'Jan 2026 – Mar 2026',
      bullets: [
        'Built applications using feature-based architecture for scalability.',
        'Implemented server state management with TanStack Query — caching and background updates.',
        'Handled routing and URL state synchronization using TanStack Router.',
        'Applied design patterns to improve code quality, reusability, and maintainability.',
        'Developed UI components following a design system for consistent styling.',
        'Collaborated via Git & GitHub: pull requests, branch workflows, code reviews.',
      ],
    },
  ],

  projects: [
    {
      name: 'ScholarHub',
      subtitle: 'Scholarship Opportunity Platform',
      tag: 'Graduation Project',
      description:
        'Full-stack web platform helping students in Gaza discover and explore international scholarship opportunities. Centralizes scholarship data with advanced search and filtering.',
      tech: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'React'],
      highlights: [
        'Centralized international scholarship discovery',
        'Advanced search & filter system',
        'Secure & scalable full-stack architecture',
        'Fully responsive across all devices',
      ],
      href: '#',
      featured: true,
    },
    {
      name: 'Matcha',
      subtitle: 'Animated Retail Experience',
      tag: 'E-Commerce',
      description:
        'Modern animated e-commerce web app for premium matcha products. Cinematic shopping experience with smooth GSAP animations and luxury-level UI/UX design.',
      tech: ['Next.js', 'TypeScript', 'GSAP', 'TailwindCSS'],
      highlights: [
        'Cinematic GSAP animations for immersive UX',
        'Dynamic product browsing with interactive cards',
        'Functional cart with smooth micro-interactions',
        'Premium luxury minimal UI/UX',
      ],
      href: '#',
      featured: true,
    },
    {
      name: 'Cinematic Headphone Store',
      subtitle: 'High-End E-Commerce',
      tag: 'E-Commerce',
      description:
        'Immersive e-commerce experience for a premium headphone brand. Scroll-driven cinematic animations, 3D product storytelling, and a luxury dark aesthetic inspired by Apple and Awwwards.',
      tech: ['Next.js', 'GSAP', 'ScrollTrigger', 'TypeScript'],
      highlights: [
        'Scroll-driven GSAP ScrollTrigger animations',
        '3D-inspired product storytelling with frame sequences',
        'Advanced cart with animated UX patterns',
        'Performance-optimized with lazy loading & frame caching',
      ],
      href: '#',
      featured: true,
    },
    {
      name: 'JAHEZ',
      subtitle: 'Food Delivery Platform',
      tag: 'Mobile App',
      description:
        'Premium cross-platform food delivery mobile app with cinematic UX, bilingual Arabic/English support, and seamless performance across iOS and Android.',
      tech: ['React Native', 'Expo', 'TypeScript', 'TanStack Query', 'Zustand', 'i18next'],
      highlights: [
        'Cross-platform iOS & Android with Expo Router',
        'Bilingual RTL/LTR support (Arabic/English)',
        'Cinematic interactions with Reanimated & haptics',
        'Secure API layer with token refresh & request queuing',
      ],
      href: '#',
      featured: false,
    },
    {
      name: 'Tourvisto',
      subtitle: 'Travel Booking Platform',
      tag: 'Full-Stack',
      description:
        'Full-stack travel booking platform for seamless itinerary creation and secure payments, with interactive maps and a responsive admin dashboard.',
      tech: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      highlights: [
        'Stripe integration for secure payments',
        'Interactive maps for destination previews',
        'Admin dashboard for users, trips & bookings',
        'SSR/SSG + SWR for optimized performance',
      ],
      href: '#',
      featured: false,
    },
    {
      name: 'E-Commerce Store',
      subtitle: 'Full-Stack Shop',
      tag: 'Full-Stack',
      description:
        'Scalable full-stack e-commerce store with role-based access control, Stripe payments, and a complete admin dashboard for product and user management.',
      tech: ['React', 'Express.js', 'MongoDB', 'Stripe'],
      highlights: [
        'Role-based access with admin dashboard',
        'Stripe secure payment processing',
        'Full CRUD: products, cart, auth, orders',
        'Clean responsive UI',
      ],
      href: '#',
      featured: false,
    },
  ],

  education: {
    degree: 'Bachelor of Computer Science',
    school: 'Al-Azhar University',
    location: 'Gaza',
    period: 'Sep 2021 – Jul 2026',
  },

  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Intermediate' },
  ],
} as const

export type PortfolioData = typeof portfolioData
