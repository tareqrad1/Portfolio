import { heroData } from '@/lib/hero-data'

/**
 * Stacked role/stack tags on the left, big and bold like UX / UI / WEB in the
 * reference. Light theme: dark ink with a red lead tag.
 */
export default function HeroRoleTags() {
  return (
    <ul className="flex flex-col gap-1">
      {heroData.roleTags.map((tag, i) => (
        <li
          key={tag}
          className="hero-roletag font-display font-bold uppercase leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(26px, 4vw, 52px)' }}
        >
          <span className={i === 0 ? 'text-accent-red' : 'text-ink'}>
            {tag}
          </span>
        </li>
      ))}
    </ul>
  )
}
