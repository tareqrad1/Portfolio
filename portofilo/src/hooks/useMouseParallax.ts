'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

/**
 * Mouse-driven parallax for the magazine hero. Mutates GSAP targets directly —
 * no React state, zero re-renders. Off on touch + reduced-motion.
 */
export function useMouseParallax() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx // -1 to +1
      const dy = (e.clientY - cy) / cy // -1 to +1

      // Portrait drifts gently (it's the focal point — keep it subtle)
      gsap.to('.hero-portrait-wrapper', {
        x: dx * 12,
        y: dy * 8,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      // Big background word moves opposite for depth
      gsap.to('.hero-bigword', {
        x: dx * -18,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      gsap.to('.hero-wordmark', {
        x: dx * 14,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      // Floating accents — deepest layer, move most
      gsap.to('.hero-float', {
        x: dx * 26,
        y: dy * 18,
        duration: 1.0,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      gsap.to('.hero-glow', {
        x: dx * 30,
        y: dy * 20,
        duration: 1.8,
        ease: 'power1.out',
        overwrite: 'auto',
      })
    }

    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
}
