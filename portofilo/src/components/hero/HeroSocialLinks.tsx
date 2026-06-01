import { Github, Linkedin, Instagram } from 'lucide-react'

const SOCIALS = [
  {
    label: 'GitHub',
    handle: 'tareqrad1',
    href: 'https://github.com/tareqrad1',
    Icon: Github,
  },
  {
    label: 'LinkedIn',
    handle: 'tareqradi',
    href: 'https://linkedin.com/in/tareqradi',
    Icon: Linkedin,
  },
  {
    label: 'Instagram',
    handle: 'tareq.radi',
    href: 'https://instagram.com/tareq.radi',
    Icon: Instagram,
  },
] as const

export default function HeroSocialLinks() {
  return (
    <div className="flex flex-col gap-2.5">
      {SOCIALS.map(({ label, handle, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label}: ${handle}`}
          className="hero-social group flex items-center gap-2.5 w-fit"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-paper-line bg-white/60 text-ink-soft transition-all duration-200 group-hover:border-accent-red/40 group-hover:bg-accent-red/8 group-hover:text-accent-red">
            <Icon size={13} aria-hidden="true" />
          </span>
          <span className="font-mono text-[11px] text-ink-soft transition-colors duration-200 group-hover:text-accent-red">
            {handle}
          </span>
        </a>
      ))}
    </div>
  )
}
