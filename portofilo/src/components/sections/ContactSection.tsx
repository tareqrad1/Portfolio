'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, Github, Linkedin, ArrowRight } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.contact-inner > *', {
        opacity: 0, y: 40,
        scrollTrigger: { trigger: '.contact-inner', start: 'top 82%' },
        duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-28 md:py-40"
    >
      {/* Subtle red glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(194,54,47,1) 0%, transparent 70%)',
        }}
      />

      <div className="contact-inner relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-10 px-6 text-center md:px-12">
        {/* Label */}
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-red">
          05 — Contact
        </span>

        {/* Headline */}
        <h2
          className="font-display font-bold leading-[0.92] text-white"
          style={{ fontSize: 'clamp(40px, 6vw, 88px)', letterSpacing: '-0.03em' }}
        >
          Let's build something{' '}
          <span className="text-accent-red italic">great.</span>
        </h2>

        <p className="max-w-[44ch] font-body text-base leading-relaxed text-white/55 md:text-lg">
          I'm open to full-time roles, freelance projects, and interesting collaborations.
          Drop me a message — I usually respond within 24 hours.
        </p>

        {/* Primary CTA */}
        <a
          href={`mailto:${portfolioData.about.email}`}
          className="group flex items-center gap-3 rounded-full bg-accent-red px-8 py-4 font-body text-base font-semibold text-white shadow-[0_12px_40px_-8px_rgba(194,54,47,0.55)] transition-all duration-300 hover:bg-accent-deep hover:shadow-[0_16px_48px_-8px_rgba(194,54,47,0.65)]"
        >
          {portfolioData.about.email}
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

        {/* Secondary links */}
        <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8">
          <a
            href={`tel:${portfolioData.about.phone}`}
            className="flex items-center gap-2 font-body text-sm text-white/40 transition-colors hover:text-white"
          >
            <Phone size={15} />
            {portfolioData.about.phone}
          </a>
          <a
            href="https://github.com/tareqrad1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-sm text-white/40 transition-colors hover:text-white"
          >
            <Github size={15} />
            github.com/tareqrad1
          </a>
          <a
            href="https://linkedin.com/in/tareqradi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-sm text-white/40 transition-colors hover:text-white"
          >
            <Linkedin size={15} />
            linkedin.com/in/tareqradi
          </a>
        </div>
      </div>
    </section>
  )
}
