'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroFloatingElements() {
  const shape1 = useRef<HTMLDivElement>(null)
  const shape2 = useRef<HTMLDivElement>(null)
  const shape3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tweens: gsap.core.Tween[] = []

    if (shape1.current) {
      tweens.push(
        gsap.to(shape1.current, {
          y: -18,
          repeat: -1,
          yoyo: true,
          duration: 3.5,
          ease: 'sine.inOut',
        })
      )
    }
    if (shape2.current) {
      tweens.push(
        gsap.fromTo(
          shape2.current,
          { opacity: 0.6, scaleX: 0.8 },
          {
            opacity: 1,
            scaleX: 1,
            repeat: -1,
            yoyo: true,
            duration: 2.8,
            ease: 'sine.inOut',
            delay: 0.5,
          }
        )
      )
    }
    if (shape3.current) {
      tweens.push(
        gsap.to(shape3.current, {
          y: 12,
          rotate: 180,
          repeat: -1,
          yoyo: true,
          duration: 4.2,
          ease: 'sine.inOut',
          delay: 1.0,
        })
      )
    }

    return () => {
      tweens.forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      {/* Shape 1 — diamond */}
      <div
        ref={shape1}
        className="hero-float absolute left-[8%] top-[24%] text-lg text-accent-red/35 will-change-transform"
        aria-hidden="true"
      >
        ◇
      </div>

      {/* Shape 2 — thin horizontal line */}
      <div
        ref={shape2}
        className="hero-float absolute right-[14%] top-[40%] h-px w-12 bg-gradient-to-r from-transparent via-accent-red/55 to-transparent will-change-transform"
        aria-hidden="true"
      />

      {/* Shape 3 — ring */}
      <div
        ref={shape3}
        className="hero-float absolute bottom-[30%] left-[4%] h-5 w-5 rounded-full border border-accent-deep/30 will-change-transform"
        aria-hidden="true"
      />
    </>
  )
}
