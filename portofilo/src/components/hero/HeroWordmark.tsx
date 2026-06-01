import { heroData } from '@/lib/hero-data'

/**
 * The giant top wordmark (the person's name), magazine-cover style.
 * It sits BEHIND the portrait — the photo overlaps the middle letters, exactly
 * like "Portfolio" in the reference. Each char is animatable.
 */
export default function HeroWordmark() {
  const text = heroData.name

  return (
    <div
      className="hero-wordmark pointer-events-none absolute left-0 right-0 top-[6%] z-[10] flex justify-center will-change-transform md:top-[5%]"
      aria-hidden="true"
    >
      <span
        className="whitespace-nowrap font-display font-bold leading-none text-ink"
        style={{
          fontSize: 'clamp(64px, 15vw, 220px)',
          letterSpacing: '-0.04em',
        }}
      >
        {text.split('').map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="hero-wordmark-char inline-block"
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </span>
    </div>
  )
}
