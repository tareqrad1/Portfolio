'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'
import ProjectModal from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

type Project = (typeof portfolioData.projects)[number]

const TAG_COLORS: Record<string, string> = {
  'Graduation Project': 'bg-accent-red/10 text-accent-red border-accent-red/25',
  'E-Commerce':         'bg-ink/8 text-ink-soft border-paper-line',
  'Full-Stack':         'bg-ink/8 text-ink-soft border-paper-line',
  'Mobile App':         'bg-ink/8 text-ink-soft border-paper-line',
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.proj-label', {
        opacity: 0, y: 20,
        scrollTrigger: { trigger: '.proj-label', start: 'top 88%' },
        duration: 0.6,
      })
      gsap.from('.proj-card', {
        opacity: 0, y: 48, scale: 0.97,
        immediateRender: false,
        scrollTrigger: { trigger: '.proj-grid', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.65, stagger: 0.1, ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-paper-base py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 flex items-center gap-4">
          <span className="proj-label font-mono text-[11px] uppercase tracking-[0.3em] text-accent-red">
            03 — Projects
          </span>
          <div className="h-px flex-1 bg-paper-line" />
        </div>

        <div className="mb-12">
          <h2
            className="font-display font-bold leading-[0.92] text-ink"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '-0.03em' }}
          >
            Things I've{' '}
            <span className="text-accent-red italic">shipped.</span>
          </h2>
        </div>

        {/* Compact cards — details live in the modal */}
        <div className="proj-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioData.projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              onOpen={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View details for ${project.name}`}
      className="proj-card group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-paper-line bg-white/70 p-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-red/30 hover:shadow-[0_16px_48px_-12px_rgba(194,54,47,0.18)]"
    >
      {/* Top accent bar (reveals on hover) */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-accent-red via-accent-deep to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Tag */}
      <span
        className={`w-fit rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
          TAG_COLORS[project.tag] ?? 'bg-ink/8 text-ink-soft border-paper-line'
        }`}
      >
        {project.tag}
      </span>

      {/* Title + subtitle */}
      <div>
        <h3 className="font-display text-lg font-bold leading-tight text-ink transition-colors duration-300 group-hover:text-accent-red">
          {project.name}
        </h3>
        <p className="mt-1 font-body text-sm text-ink-soft/70">
          {project.subtitle}
        </p>
      </div>

      {/* View details footer */}
      <div className="flex items-center justify-between border-t border-paper-line pt-4">
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint transition-colors duration-300 group-hover:text-accent-red">
          View details
        </span>
        <ArrowUpRight
          size={16}
          className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-red"
        />
      </div>
    </button>
  )
}
