import { heroData } from '@/lib/hero-data'

/**
 * Bottom-left social handles, magazine-footer style (reference: inst / tg).
 */
export default function HeroHandles() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      {heroData.handles.map((h) => (
        <a
          key={h.label}
          href={h.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${h.label}: ${h.value}`}
          className="hero-handle group flex flex-col leading-tight"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
            {h.label}:
          </span>
          <span className="border-b border-paper-line pb-0.5 font-mono text-xs text-ink-soft transition-colors duration-200 group-hover:border-accent-red group-hover:text-accent-red">
            {h.value}
          </span>
        </a>
      ))}
    </div>
  )
}
