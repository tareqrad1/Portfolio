'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Star } from 'lucide-react'
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

  const featured  = portfolioData.projects.filter((p) => p.featured)
  const secondary = portfolioData.projects.filter((p) => !p.featured)

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

        {/* Featured — large cards */}
        <div className="proj-grid mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              large
              onOpen={() => setActiveProject(project)}
            />
          ))}
        </div>

        {/* Secondary — compact cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {secondary.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              large={false}
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
  large,
  onOpen,
}: {
  project: Project
  large: boolean
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View details for ${project.name}`}
      className="proj-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-paper-line bg-white/70 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_-12px_rgba(194,54,47,0.18)]"
    >
      {/* Top bar with gradient */}
      <div
        className="h-1.5 w-full bg-gradient-to-r from-accent-red via-accent-deep to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className={`flex flex-col gap-4 p-6 ${large ? 'md:p-7' : ''}`}>
        {/* Tag + arrow */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
              TAG_COLORS[project.tag] ?? 'bg-ink/8 text-ink-soft border-paper-line'
            }`}
          >
            {project.tag}
          </span>
          <ArrowUpRight
            size={16}
            className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-red"
          />
        </div>

        {/* Title */}
        <div>
          <h3
            className={`font-display font-bold text-ink ${
              large ? 'text-xl md:text-2xl' : 'text-lg'
            }`}
          >
            {project.name}
          </h3>
          <p className="mt-0.5 font-body text-sm text-ink-soft/70">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          {project.description}
        </p>

        {/* Highlights */}
        {large && (
          <ul className="flex flex-col gap-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <Star
                  size={10}
                  className="mt-1.5 shrink-0 fill-accent-red text-accent-red"
                />
                <span className="font-body text-xs leading-relaxed text-ink-soft">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 border-t border-paper-line pt-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-paper-soft px-2.5 py-1 font-mono text-[10px] text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>

        {/* View details affordance */}
        <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-faint transition-colors duration-300 group-hover:text-accent-red">
          View details
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </button>
  )
}
