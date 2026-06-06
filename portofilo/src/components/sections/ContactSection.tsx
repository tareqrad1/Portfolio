'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, Globe } from 'lucide-react'
import ContactForm from './ContactForm'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.contact-anim', {
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
      className="relative overflow-hidden bg-ink py-28 md:py-36"
    >
      {/* Subtle red glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(194,54,47,1) 0%, transparent 70%)',
        }}
      />

      <div className="contact-inner relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* Label */}
        <div className="contact-anim mb-12 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-red">
            05 — Contact
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: pitch ── */}
          <div className="flex flex-col">
            <h2
              className="contact-anim font-display font-bold leading-[0.92] text-white"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', letterSpacing: '-0.03em' }}
            >
              Let's build something{' '}
              <span className="text-accent-red italic">great.</span>
            </h2>

            <p className="contact-anim mt-6 max-w-[44ch] font-body text-base leading-relaxed text-white/65 md:text-lg">
              I'm open to full-time roles, freelance projects, and interesting
              collaborations. Drop me a message — I usually respond within 24 hours.
            </p>

            {/* Availability badges */}
            <div className="contact-anim mt-10 flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-sm text-white/70">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                Available for work
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-sm text-white/70">
                <Clock size={14} className="text-accent-red" />
                Replies within 24h
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-sm text-white/70">
                <Globe size={14} className="text-accent-red" />
                Remote · Worldwide
              </span>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="contact-anim">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
