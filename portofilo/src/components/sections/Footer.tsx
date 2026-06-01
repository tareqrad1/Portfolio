import { Github, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/[0.07] px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-white/25">
          © {new Date().getFullYear()} Tareq Radi — Built with Next.js & GSAP
        </p>
        <div className="flex gap-5">
          {[
            { href: 'https://github.com/tareqrad1', Icon: Github, label: 'GitHub' },
            { href: 'https://linkedin.com/in/tareqradi', Icon: Linkedin, label: 'LinkedIn' },
            { href: 'https://instagram.com/tareq.radi', Icon: Instagram, label: 'Instagram' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 transition-colors hover:text-white/70"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
