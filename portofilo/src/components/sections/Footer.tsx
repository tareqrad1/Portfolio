'use client'

import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { href: 'https://github.com/tareqrad1', Icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/tareqradi', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/tareq.radi', Icon: Instagram, label: 'Instagram' },
  { href: `mailto:${portfolioData.about.email}`, Icon: Mail, label: 'Email' },
]

export default function Footer() {
  const scrollTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink">
      {/* Soft red glow anchored bottom-left */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[400px] -translate-x-1/3 translate-y-1/3 opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, rgba(194,54,47,1) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-12">
        {/* Top: brand + nav + socials */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollTop()
              }}
              className="font-display text-3xl font-bold tracking-tight text-white transition-colors hover:text-accent-red"
            >
              Tareq Radi<span className="text-accent-red">.</span>
            </a>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-white/45">
              Full-Stack Developer crafting fast, scalable web products end to end —
              from clean architecture to pixel-perfect, animated interfaces.
            </p>

            <a
              href={`mailto:${portfolioData.about.email}`}
              className="group mt-6 inline-flex items-center gap-2 font-body text-sm text-white/70 transition-colors hover:text-white"
            >
              <Mail size={15} className="text-accent-red" />
              {portfolioData.about.email}
            </a>

            {/* Back-to-top */}
            <div className="mt-7">
              <button
                type="button"
                onClick={scrollTop}
                aria-label="Back to top"
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-white/50 transition-all duration-200 hover:border-accent-red/40 hover:text-accent-red"
              >
                Top
                <ArrowUp
                  size={13}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
              Navigate
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center font-body text-sm text-white/55 transition-colors hover:text-white"
                  >
                    <span className="mr-0 h-px w-0 bg-accent-red transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-red/40 hover:bg-accent-red/10 hover:text-accent-red"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
