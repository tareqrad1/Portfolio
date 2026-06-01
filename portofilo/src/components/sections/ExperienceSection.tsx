'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, Building2, GraduationCap } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

gsap.registerPlugin(ScrollTrigger)

/* ── icon + colour per entry type ── */
const ENTRY_STYLE: Record<
  string,
  { Icon: typeof Briefcase; accent: string; badge: string; dot: string }
> = {
  Freelance: {
    Icon: Briefcase,
    accent: 'from-accent-red/20 via-accent-red/5 to-transparent',
    badge: 'bg-accent-red text-white',
    dot:   'bg-accent-red',
  },
  'Full-Time': {
    Icon: Building2,
    accent: 'from-ink/8 via-ink/3 to-transparent',
    badge: 'bg-ink text-white',
    dot:   'bg-ink/60',
  },
  Internship: {
    Icon: GraduationCap,
    accent: 'from-ink/6 via-ink/2 to-transparent',
    badge: 'bg-paper-soft text-ink border border-paper-line',
    dot:   'bg-ink/40',
  },
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.exp-header', {
        opacity: 0, y: 24,
        immediateRender: false,
        scrollTrigger: { trigger: '.exp-header', start: 'top 88%', toggleActions: 'play none none none' },
        duration: 0.7,
      })
      gsap.from('.exp-card', {
        opacity: 0, y: 44,
        immediateRender: false,
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 84%', toggleActions: 'play none none none' },
        duration: 0.7, stagger: 0.14, ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-paper-soft py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* ── Section header ── */}
        <div className="exp-header mb-16 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-red">
            02 — Experience
          </span>
          <div className="h-px flex-1 bg-paper-line" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">

          {/* ── Left: sticky headline ── */}
          <div>
            <h2
              className="sticky top-28 font-display font-bold leading-[0.92] text-ink"
              style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-0.03em' }}
            >
              Where I&apos;ve{' '}
              <span className="text-accent-red italic">worked.</span>
            </h2>
          </div>

          {/* ── Right: cards ── */}
          <div className="exp-timeline flex flex-col gap-5">
            {portfolioData.experience.map((job, i) => {
              const style = ENTRY_STYLE[job.tag ?? 'Internship'] ?? ENTRY_STYLE['Internship']
              const { Icon } = style
              const isFreelance = job.tag === 'Freelance'

              return (
                <div
                  key={i}
                  className={`exp-card group relative overflow-hidden rounded-2xl border transition-shadow duration-300 ${
                    isFreelance
                      ? 'border-accent-red/25 bg-white hover:shadow-[0_12px_48px_-10px_rgba(194,54,47,0.22)]'
                      : 'border-paper-line bg-white/70 hover:shadow-[0_8px_40px_-12px_rgba(26,26,26,0.12)]'
                  } backdrop-blur-sm`}
                >
                  {/* Gradient wash — strongest on freelance */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.accent}`}
                  />

                  {/* Left accent bar (appears on hover for non-featured, always for freelance) */}
                  <div
                    className={`absolute left-0 top-0 h-full w-[3px] rounded-r-full ${style.dot} transition-opacity duration-300 ${
                      isFreelance ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  <div className="relative p-7">
                    {/* ── Card header ── */}
                    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        {/* Icon badge */}
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            isFreelance ? 'bg-accent-red/12' : 'bg-paper-soft'
                          }`}
                        >
                          <Icon
                            size={17}
                            className={isFreelance ? 'text-accent-red' : 'text-ink-soft'}
                          />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-lg font-bold text-ink md:text-xl">
                              {job.role}
                            </h3>
                            {/* Type badge */}
                            <span
                              className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${style.badge}`}
                            >
                              {job.tag}
                            </span>
                          </div>
                          <p className="mt-0.5 font-body text-sm">
                            <span
                              className={isFreelance ? 'font-semibold text-accent-red' : 'font-medium text-accent-red'}
                            >
                              {job.company}
                            </span>
                            <span className="mx-2 text-ink-faint">·</span>
                            <span className="text-ink-faint">{job.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Period pill */}
                      <span className="shrink-0 rounded-full border border-paper-line bg-paper-base px-3 py-1 font-mono text-[11px] text-ink-soft">
                        {job.period}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="mb-4 h-px bg-paper-line" />

                    {/* ── Bullets ── */}
                    <ul className="flex flex-col gap-2.5">
                      {job.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span
                            className={`mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full ${style.dot} opacity-70`}
                          />
                          <span className="font-body text-sm leading-relaxed text-ink-soft">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
