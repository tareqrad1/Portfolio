import { Github, Linkedin, Instagram, type LucideIcon } from 'lucide-react'
import { heroData } from '@/lib/hero-data'

const ICONS: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Instagram,
}

export default function HeroSocials() {
  return (
    <div className="flex gap-4">
      {heroData.socials.map((social) => {
        const Icon = ICONS[social.icon] ?? Github
        return (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social text-ink-faint transition-colors duration-200 hover:text-accent-red [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:scale-110"
          >
            <Icon size={20} aria-hidden="true" />
          </a>
        )
      })}
    </div>
  )
}
