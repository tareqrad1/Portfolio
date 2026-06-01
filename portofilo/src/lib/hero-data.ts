export const heroData = {
  /** Shown as the giant top wordmark. */
  name: 'Tareq Radi',
  /** Big display word split across the right edge (magazine style). */
  bigWord: 'DEVELOPER',
  /** Small kicker above/near the name. */
  wordmark: 'Portfolio',
  /** Brand mark shown small near the big word. */
  brandMark: 'FULLSTACK',

  /** Stacked role tags on the left (reference: UX / UI / WEB). */
  roleTags: ['React', 'Next', 'Node', 'Express'],

  /** One-line value statement under the name. */
  tagline: 'I build fast, scalable web products end to end.',

  /** Social handles shown at the bottom-left, magazine style. */
  handles: [
    { label: 'github', value: 'tareqrad1', href: 'https://github.com/tareqrad1' },
    {
      label: 'linkedin',
      value: 'tareqradi',
      href: 'https://linkedin.com/in/tareqradi',
    },
    {
      label: 'instagram',
      value: 'tareq.radi',
      href: 'https://instagram.com/tareq.radi',
    },
  ],

  /** Icon social links (top-right of the content block). */
  socials: [
    { label: 'GitHub', href: 'https://github.com/tareqrad1', icon: 'Github' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/tareqradi',
      icon: 'Linkedin',
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/tareq.radi',
      icon: 'Instagram',
    },
  ],

  cta: {
    primary: { label: 'View My Work', href: '#work' },
    ghost: { label: 'Download CV', href: '/cv/Tareq_Radi_CV.pdf' },
  },
} as const

export type HeroData = typeof heroData
