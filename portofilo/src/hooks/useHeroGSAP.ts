'use client'

import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ALL_TARGETS = [
  '.hero-navbar',
  '.hero-wordmark-char',
  '.hero-bigword-char',
  '.hero-brandmark',
  '.hero-roletag',
  '.hero-tagline',
  '.hero-cta',
  '.hero-social',
  '.hero-handle',
  '.hero-scroll-ind',
  '.hero-portrait-wrapper',
  '.hero-float',
  '.hero-glow',
]

/**
 * Master GSAP intro for the magazine-style hero. Scoped to `scopeRef` so all
 * selectors stay local and cleanup is automatic via gsap.context().revert().
 */
export function useHeroGSAP(scopeRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      // ── Reduced motion: snap to final states, no animation ──
      if (prefersReduced) {
        gsap.set(ALL_TARGETS, {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotationX: 0,
          filter: 'none',
          clearProps: 'transform',
        })
        return
      }

      // ── Initial states (before timeline → no FOUC) ──
      gsap.set('.hero-navbar', { autoAlpha: 0, y: -20 })
      gsap.set('.hero-wordmark-char', { autoAlpha: 0, y: 60 })
      gsap.set('.hero-bigword-char', { autoAlpha: 0, x: 50, rotationY: 40 })
      gsap.set('.hero-brandmark', { autoAlpha: 0, y: 10 })
      gsap.set('.hero-roletag', { autoAlpha: 0, x: -24 })
      gsap.set('.hero-tagline', { autoAlpha: 0, y: 18 })
      gsap.set('.hero-cta', { autoAlpha: 0, y: 20 })
      gsap.set('.hero-social', { autoAlpha: 0, y: 10 })
      gsap.set('.hero-handle', { autoAlpha: 0, y: 10 })
      gsap.set('.hero-scroll-ind', { autoAlpha: 0 })
      gsap.set('.hero-portrait-wrapper', {
        autoAlpha: 0,
        scale: 1.06,
        yPercent: 4,
        filter: 'blur(12px)',
      })
      gsap.set('.hero-float', { autoAlpha: 0 })
      gsap.set('.hero-glow', { autoAlpha: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.1,
      })

      tl.to(
        '.hero-glow',
        { autoAlpha: 1, duration: 1.8, ease: 'power1.inOut', stagger: 0.25 },
        0
      )
        .to('.hero-navbar', { autoAlpha: 1, y: 0, duration: 0.7 }, 0.1)
        // Portrait rises + sharpens — anchors the composition
        .to(
          '.hero-portrait-wrapper',
          {
            autoAlpha: 1,
            scale: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'expo.out',
          },
          0.25
        )
        // Top wordmark letters spill up from behind the photo
        .to(
          '.hero-wordmark-char',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: { each: 0.04, from: 'center' },
            ease: 'power4.out',
          },
          0.4
        )
        // Big right-edge word swings in (3D)
        .to(
          '.hero-bigword-char',
          {
            autoAlpha: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: 'back.out(1.3)',
          },
          0.7
        )
        .to('.hero-brandmark', { autoAlpha: 1, y: 0, duration: 0.5 }, 0.95)
        .to(
          '.hero-roletag',
          { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.09 },
          0.85
        )
        .to('.hero-tagline', { autoAlpha: 1, y: 0, duration: 0.6 }, 1.05)
        .to('.hero-cta', { autoAlpha: 1, y: 0, duration: 0.55 }, 1.15)
        .to(
          '.hero-social',
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 },
          1.25
        )
        .to(
          '.hero-handle',
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1 },
          1.3
        )
        .to('.hero-float', { autoAlpha: 1, duration: 0.8 }, 1.35)
        .to('.hero-scroll-ind', { autoAlpha: 1, duration: 0.6 }, 1.45)

      // ── Scroll parallax: layers drift at different speeds ──
      ScrollTrigger.create({
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          const p = self.progress
          gsap.set('.hero-portrait-wrapper', { y: p * 60 })
          gsap.set('.hero-wordmark', { y: p * -40 })
          gsap.set('.hero-bigword', { y: p * 30 })
        },
      })
    }, scope)

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }

    return () => ctx.revert()
  }, [scopeRef])
}
