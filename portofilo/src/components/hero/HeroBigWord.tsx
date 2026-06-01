import { heroData } from '@/lib/hero-data'

/**
 * The huge display word on the right edge (like "DESIGNER" in the reference).
 * Filled red, partially behind the portrait, split per character. Sized to fit
 * within the content column so it never clips on smaller desktops.
 */
export default function HeroBigWord() {
  const text = heroData.bigWord

  return (
    <div
      className="hero-bigword pointer-events-none absolute bottom-[5%] right-0 z-[12] max-w-full text-right will-change-transform"
      aria-hidden="true"
      style={{ perspective: '800px' }}
    >
      {/* small brand mark above the big word (reference: "AKKIRA") */}
      <span className="hero-brandmark mb-1 block pr-1 font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-accent-red/70 md:text-xs">
        {heroData.brandMark}
      </span>

      <span
        className="block font-display font-black uppercase leading-[0.82] text-accent-red"
        style={{
          fontSize: 'clamp(40px, 9.5vw, 150px)',
          letterSpacing: '-0.03em',
        }}
      >
        {text.split('').map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="hero-bigword-char inline-block"
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </span>
    </div>
  )
}
