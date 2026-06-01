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
import HeroCTA from './HeroCTA'
import HeroSocialLinks from './HeroSocialLinks'
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

      {/* 3. Stage */}
      <div className="relative z-[20] mx-auto min-h-screen w-full max-w-7xl px-6 pt-[60px] md:px-12">

        {/* 3a. Top wordmark — sits behind the portrait */}
        <HeroWordmark />

        {/* 3b. Portrait — nudged right on desktop to open left lane */}
        <div className="relative z-[15] flex min-h-screen items-center justify-center pb-[26vh] pt-[16vh] md:justify-end md:pb-24 md:pt-20 md:pr-[6%] lg:pr-[10%]">
          <HeroPortrait />
        </div>

        {/* 3c. Big display word — bottom right */}
        <HeroBigWord />

        {/* 3d. Role tags — desktop left column only */}
        <div className="pointer-events-none absolute left-6 top-[24%] z-[25] hidden md:left-12 md:block">
          <HeroRoleTags />
        </div>

        {/* 3e. Bottom-left content block — tagline + CTAs + socials */}
        <div className="absolute bottom-[14%] left-6 right-6 z-[30] flex flex-col gap-4 md:bottom-[12%] md:left-12 md:right-auto md:max-w-[380px]">

          {/* Mobile role pills */}
          <div className="flex flex-wrap gap-2 md:hidden">
            {heroData.roleTags.map((tag, i) => (
              <span
                key={tag}
                className={`hero-roletag rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide ${
                  i === 0
                    ? 'border-accent-red/40 bg-accent-red/10 text-accent-red'
                    : 'border-paper-line bg-white/50 text-ink-soft'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p className="hero-tagline max-w-[30ch] font-display text-lg font-semibold leading-snug text-ink md:text-xl">
            {heroData.tagline}
          </p>

          {/* CTAs */}
          <HeroCTA />

          {/* Social links — icon + handle, unified, no duplication */}
          <HeroSocialLinks />
        </div>
      </div>

      {/* 4. Scroll indicator */}
      <div className="absolute bottom-6 right-8 z-[30] hidden lg:block">
        <HeroScrollIndicator />
      </div>

      {/* 5. Floating accents */}
      <div className="pointer-events-none absolute inset-0 z-[18] hidden lg:block">
        <HeroFloatingElements />
      </div>
    </section>
  )
}
