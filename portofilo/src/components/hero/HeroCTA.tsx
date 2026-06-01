'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Download } from 'lucide-react'
import { heroData } from '@/lib/hero-data'

export default function HeroCTA() {
  const primaryRef = useRef<HTMLAnchorElement>(null)
  const quickScale = useRef<gsap.QuickToFunc>()

  const getScaler = () => {
    if (!quickScale.current && primaryRef.current) {
      quickScale.current = gsap.quickTo(primaryRef.current, 'scale', {
        duration: 0.3,
        ease: 'power2.out',
      })
    }
    return quickScale.current
  }

  const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleEnter = () => {
    if (reduced()) return
    getScaler()?.(1.03)
  }
  const handleLeave = () => getScaler()?.(1)

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = primaryRef.current
    if (!el || reduced()) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.35,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleMagneticLeave = () => {
    const el = primaryRef.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <div className="hero-cta flex flex-wrap gap-3">
      {/* Primary — solid red, magnetic */}
      <a
        ref={primaryRef}
        href={heroData.cta.primary.href}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={() => {
          handleLeave()
          handleMagneticLeave()
        }}
        className="group flex items-center gap-2 rounded-full bg-accent-red px-5 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(194,54,47,0.5)] transition-colors duration-300 hover:bg-accent-deep"
      >
        {heroData.cta.primary.label}
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>

      {/* Ghost — outlined dark on light */}
      <a
        href={heroData.cta.ghost.href}
        download
        className="flex items-center gap-2 rounded-full border border-ink/20 bg-white/40 px-5 py-2.5 font-body text-sm font-medium text-ink-soft backdrop-blur-sm transition-all duration-300 hover:border-ink/40 hover:bg-white/70 hover:text-ink"
      >
        {heroData.cta.ghost.label}
        <Download size={16} />
      </a>
    </div>
  )
}
