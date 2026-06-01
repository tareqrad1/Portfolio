'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioData } from '@/lib/portfolio-data'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.exp-label', {
        opacity: 0, y: 20,
        scrollTrigger: { trigger: '.exp-label', start: 'top 88%' },
        duration: 0.6,
      })
      gsap.from('.exp-card', {
        opacity: 0, y: 40,
        immediateRender: false,
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 82%', toggleActions: 'play none none none' },
        duration: 0.7, stagger: 0.15, ease: 'power3.out',
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
        {/* Section header */}
        <div className="mb-16 flex items-center gap-4">
          <span className="exp-label font-mono text-[11px] uppercase tracking-[0.3em] text-accent-red">
            02 — Experience
          </span>
          <div className="h-px flex-1 bg-paper-line" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          {/* Left — big headline */}
          <div>
            <h2
              className="sticky top-28 font-display font-bold leading-[0.92] text-ink"
              style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-0.03em' }}
            >
              Where I've{' '}
              <span className="text-accent-red italic">worked.</span>
            </h2>
          </div>

          {/* Right — timeline */}
          <div className="exp-timeline flex flex-col gap-6">
            {portfolioData.experience.map((job, i) => (
              <div
                key={i}
                className="exp-card group relative overflow-hidden rounded-2xl border border-paper-line bg-white/70 p-7 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_8px_40px_-12px_rgba(194,54,47,0.18)]"
              >
                {/* Accent bar on left */}
                <div className="absolute left-0 top-6 h-12 w-[3px] rounded-r-full bg-accent-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Header */}
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink md:text-xl">
                      {job.role}
                    </h3>
                    <p className="mt-0.5 font-body text-sm font-medium text-accent-red">
                      {job.company}
                      <span className="ml-2 text-ink-faint">· {job.location}</span>
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-paper-line px-3 py-1 font-mono text-[11px] text-ink-soft">
                    {job.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-red/60" />
                      <span className="font-body text-sm leading-relaxed text-ink-soft">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
