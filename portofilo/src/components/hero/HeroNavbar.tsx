'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { heroData } from '@/lib/hero-data'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = ['Work', 'About', 'Stack', 'Contact'] as const

export default function HeroNavbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = navRef.current
    if (!el) return

    // Toggle the scrolled style via a class — no React state, zero re-renders.
    const st = ScrollTrigger.create({
      start: 'top -20',
      end: 99999,
      onToggle: (self) => {
        el.classList.toggle('is-scrolled', self.isActive)
      },
    })

    return () => st.kill()
  }, [])

  // Initials from the name for the monogram.
  const monogram = heroData.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <nav
      ref={navRef}
      className="hero-navbar fixed left-0 right-0 top-0 z-[50] h-[60px] border-b border-transparent bg-transparent transition-[background-color,backdrop-filter,border-color] duration-300 [&.is-scrolled]:border-paper-line [&.is-scrolled]:bg-paper-base/80 [&.is-scrolled]:backdrop-blur-md"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Left: monogram */}
        <a
          href="#hero-section"
          aria-label="Home"
          className="flex h-8 w-8 items-center justify-center border border-accent-red font-display text-[18px] font-bold leading-none text-ink"
        >
          {monogram}
        </a>

        {/* Center: nav links (hidden on mobile) */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-body text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-accent-red"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Hire Me */}
        <a
          href="#contact"
          className="rounded-full border border-accent-red/50 bg-accent-red/10 px-4 py-1.5 font-body text-sm font-medium text-accent-red transition-all duration-300 hover:bg-accent-red hover:text-white"
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}
