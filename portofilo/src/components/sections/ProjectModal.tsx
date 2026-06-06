'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ArrowUpRight, ExternalLink, Star, X } from 'lucide-react'
import type { portfolioData } from '@/lib/portfolio-data'

type Project = (typeof portfolioData.projects)[number]

const TAG_COLORS: Record<string, string> = {
  'Graduation Project': 'bg-accent-red/10 text-accent-red border-accent-red/25',
  'E-Commerce':         'bg-ink/8 text-ink-soft border-paper-line',
  'Full-Stack':         'bg-ink/8 text-ink-soft border-paper-line',
  'Mobile App':         'bg-ink/8 text-ink-soft border-paper-line',
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const open = project !== null

  useEffect(() => setMounted(true), [])

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  // Close on Escape + simple focus trap.
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Enter animation.
  useLayoutEffect(() => {
    if (!open) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([overlayRef.current, panelRef.current], { opacity: 1, y: 0, scale: 1 })
        return
      }
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
      )
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
      )
      gsap.fromTo(
        '.pm-stagger',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, delay: 0.12, ease: 'power2.out' },
      )
    })
    // Move focus into the dialog.
    closeBtnRef.current?.focus()
    return () => ctx.revert()
  }, [open])

  // Animated close — plays exit, then unmounts via onClose.
  const handleClose = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !panelRef.current) {
      onClose()
      return
    }
    gsap
      .timeline({ onComplete: onClose })
      .to(panelRef.current, { opacity: 0, y: 24, scale: 0.97, duration: 0.3, ease: 'power2.in' }, 0)
      .to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
  }

  if (!mounted || !open) return null

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close dialog"
        onClick={handleClose}
        className="absolute inset-0 cursor-default bg-ink/40 backdrop-blur-[3px]"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-t-3xl border border-paper-line bg-paper-base shadow-[0_40px_120px_-20px_rgba(26,26,26,0.45)] sm:rounded-3xl"
      >
        {/* Accent top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-accent-red via-accent-deep to-transparent" />

        {/* Close button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-paper-line bg-white/70 text-ink-soft backdrop-blur-sm transition-all duration-200 hover:rotate-90 hover:border-accent-red/40 hover:text-accent-red"
        >
          <X size={18} />
        </button>

        <div className="max-h-[85vh] overflow-y-auto px-6 py-8 sm:px-9 sm:py-10">
          {/* Tag */}
          <span
            className={`pm-stagger inline-block rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${
              TAG_COLORS[project.tag] ?? 'bg-ink/8 text-ink-soft border-paper-line'
            }`}
          >
            {project.tag}
          </span>

          {/* Title + subtitle */}
          <div className="pm-stagger mt-4">
            <h3
              id="project-modal-title"
              className="font-display font-bold leading-[0.95] text-ink"
              style={{ fontSize: 'clamp(28px, 5vw, 44px)', letterSpacing: '-0.02em' }}
            >
              {project.name}
            </h3>
            <p className="mt-1.5 font-body text-base text-ink-soft/80">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="pm-stagger mt-6 font-body text-[15px] leading-relaxed text-ink-soft">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="pm-stagger mt-8">
            <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-red">
              Highlights
            </h4>
            <ul className="flex flex-col gap-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <Star
                    size={11}
                    className="mt-1.5 shrink-0 fill-accent-red text-accent-red"
                  />
                  <span className="font-body text-sm leading-relaxed text-ink-soft">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="pm-stagger mt-8">
            <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-red">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-paper-line bg-paper-soft px-3 py-1.5 font-mono text-[11px] text-ink-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pm-stagger mt-10 flex flex-col gap-3 border-t border-paper-line pt-7 sm:flex-row">
            {project.href && project.href !== '#' ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-red px-6 py-3.5 font-body text-sm font-semibold text-white shadow-[0_12px_32px_-10px_rgba(194,54,47,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                <ExternalLink size={16} />
                View Live
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ) : (
              <span className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-paper-line bg-paper-soft px-6 py-3.5 font-body text-sm font-medium text-ink-faint">
                <ExternalLink size={16} />
                Live demo coming soon
              </span>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-paper-line px-6 py-3.5 font-body text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-ink/30 hover:text-ink"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
