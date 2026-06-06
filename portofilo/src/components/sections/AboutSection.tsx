'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioData } from '@/lib/portfolio-data'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.about-label', {
        opacity: 0, y: 24,
        scrollTrigger: { trigger: '.about-label', start: 'top 88%' },
        duration: 0.7,
      })
      gsap.from('.about-headline', {
        opacity: 0, y: 32,
        scrollTrigger: { trigger: '.about-headline', start: 'top 88%' },
        duration: 0.8, delay: 0.1,
      })
      gsap.from('.about-summary', {
        opacity: 0, y: 24,
        scrollTrigger: { trigger: '.about-summary', start: 'top 88%' },
        duration: 0.7, delay: 0.15,
      })
      gsap.from('.skill-category', {
        opacity: 0, y: 28, scale: 0.97,
        immediateRender: false,
        scrollTrigger: { trigger: '.skills-grid', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, stagger: 0.1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-paper-base py-28 md:py-36"
    >
      {/* Decorative top rule */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 flex items-center gap-4">
          <span className="about-label font-mono text-[11px] uppercase tracking-[0.3em] text-accent-red">
            01 — About
          </span>
          <div className="h-px flex-1 bg-paper-line" />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — headline + summary */}
          <div className="flex flex-col justify-center gap-6">
            <h2
              className="about-headline font-display font-bold leading-[0.92] text-ink"
              style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', letterSpacing: '-0.03em' }}
            >
              Crafting digital products that{' '}
              <span className="text-accent-red italic">actually work.</span>
            </h2>
            <p className="about-summary max-w-[52ch] font-body text-base leading-relaxed text-ink-soft md:text-lg">
              {portfolioData.about.summary}
            </p>
          </div>

          {/* Right — skills grid */}
          <div className="skills-grid grid grid-cols-2 gap-4">
            {portfolioData.skills.map((group) => (
              <div
                key={group.category}
                className="skill-category rounded-2xl border border-paper-line bg-white/60 p-5 backdrop-blur-sm"
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-red">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-paper-soft px-2.5 py-1 font-body text-[11px] font-medium text-ink-soft"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
