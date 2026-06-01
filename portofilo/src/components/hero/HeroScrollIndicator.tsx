'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroScrollIndicator() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = dotRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tween = gsap.to(el, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut',
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div
      className="hero-scroll-ind flex flex-col items-center"
      aria-hidden="true"
    >
      <div className="flex h-9 w-6 justify-center rounded-full border border-ink/25 pt-1.5">
        <div
          ref={dotRef}
          className="h-1.5 w-1 rounded-full bg-accent-red/70 will-change-transform"
        />
      </div>
      <span className="mt-2 font-body text-[10px] uppercase tracking-widest text-ink-faint">
        Scroll
      </span>
    </div>
  )
}
