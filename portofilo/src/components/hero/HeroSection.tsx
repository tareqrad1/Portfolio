'use client'

import { useRef } from 'react'
import { useHeroGSAP } from '@/hooks/useHeroGSAP'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { heroData } from '@/lib/hero-data'
import HeroBackground from './HeroBackground'
import HeroNavbar from './HeroNavbar'
import HeroWordmark from './HeroWordmark'
import HeroBigWord from './HeroBigWord'
import HeroPortrait from './HeroPortrait'
import HeroRoleTags from './HeroRoleTags'
import HeroHandles from './HeroHandles'
import HeroCTA from './HeroCTA'
import HeroSocials from './HeroSocials'
import HeroScrollIndicator from './HeroScrollIndicator'
import HeroFloatingElements from './HeroFloatingElements'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useHeroGSAP(sectionRef)
  useMouseParallax()

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-paper-base text-ink"
    >
      {/* 1. Background */}
      <HeroBackground />

      {/* 2. Navbar */}
      <HeroNavbar />

      {/* 3. Stage — the magazine cover composition */}
      <div className="relative z-[20] mx-auto min-h-screen w-full max-w-7xl px-6 pt-[60px] md:px-12">
        {/* 3a. Top wordmark (name) — sits behind the portrait */}
        <HeroWordmark />

        {/* 3b. Centered portrait. On desktop it's nudged right so the left
                column has a clear lane for the text. */}
        <div className="relative z-[15] flex min-h-screen items-center justify-center pb-[28vh] pt-[16vh] md:justify-end md:pb-24 md:pt-20 md:pr-[6%] lg:pr-[10%]">
          <HeroPortrait />
        </div>

        {/* 3c. Big right-edge display word */}
        <HeroBigWord />

        {/* 3d. Left role tags — upper-left on desktop (clear of the photo);
                hidden on small screens where the compact pills are shown. */}
        <div className="pointer-events-none absolute left-6 top-[24%] z-[25] hidden md:left-12 md:block">
          <HeroRoleTags />
        </div>

        {/* 3e. Lower-left content block: tagline → CTA → socials.
                Has its own soft backdrop so it's always legible over the photo. */}
        <div className="absolute bottom-[17%] left-6 right-6 z-[30] flex flex-col gap-4 md:bottom-[14%] md:right-auto md:max-w-[400px] md:left-12">
          {/* Compact stack tags — mobile only */}
          <div className="flex flex-wrap gap-2 md:hidden">
            {heroData.roleTags.map((tag, i) => (
              <span
                key={tag}
                className={`hero-roletag rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide ${
                  i === 0
                    ? 'border-accent-red/40 bg-accent-red/10 text-accent-red'
                    : 'border-paper-line bg-white/40 text-ink-soft'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="hero-tagline max-w-[32ch] font-display text-lg font-semibold leading-snug text-ink md:text-xl">
            {heroData.tagline}
          </p>
          <div className="flex flex-col gap-3">
            <HeroCTA />
            <HeroSocials />
          </div>
        </div>

        {/* 3f. Bottom-left handles (magazine footer) */}
        <div className="absolute bottom-6 left-6 z-[30] md:left-12">
          <HeroHandles />
        </div>
      </div>

      {/* 4. Scroll indicator (desktop only — bottom-right, clear of the word) */}
      <div className="absolute bottom-6 right-8 z-[30] hidden lg:block">
        <HeroScrollIndicator />
      </div>

      {/* 5. Floating accents (desktop) */}
      <div className="pointer-events-none absolute inset-0 z-[18] hidden lg:block">
        <HeroFloatingElements />
      </div>
    </section>
  )
}
