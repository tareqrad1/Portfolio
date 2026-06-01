'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Globe } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

gsap.registerPlugin(ScrollTrigger)

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.edu-card', {
        opacity: 0, y: 36,
        immediateRender: false,
        scrollTrigger: { trigger: '.edu-card', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.7, stagger: 0.15, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative bg-paper-soft py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-red">
            04 — Education & Languages
          </span>
          <div className="h-px flex-1 bg-paper-line" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Education card */}
          <div className="edu-card flex flex-col gap-5 overflow-hidden rounded-2xl border border-paper-line bg-white/70 p-8 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-red/10">
              <GraduationCap size={24} className="text-accent-red" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-red">
                Education
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                {portfolioData.education.degree}
              </h3>
              <p className="mt-1 font-body text-base font-medium text-ink-soft">
                {portfolioData.education.school}
                <span className="mx-2 text-ink-faint">·</span>
                {portfolioData.education.location}
              </p>
              <p className="mt-1 font-mono text-sm text-ink-faint">
                {portfolioData.education.period}
              </p>
            </div>
          </div>

          {/* Languages card */}
          <div className="edu-card flex flex-col gap-5 overflow-hidden rounded-2xl border border-paper-line bg-white/70 p-8 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-red/10">
              <Globe size={24} className="text-accent-red" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-red">
                Languages
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {portfolioData.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-ink">
                      {lang.name}
                    </span>
                    <span className="rounded-full border border-paper-line px-3 py-1 font-body text-sm text-ink-soft">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
