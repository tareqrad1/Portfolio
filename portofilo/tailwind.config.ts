import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial light + red theme
        paper: {
          base: '#F5F1EC', // warm cream background
          soft: '#EDE7DF', // slightly deeper cream for panels
          line: 'rgba(26,26,26,0.10)', // hairline borders on light
        },
        ink: {
          DEFAULT: '#1A1A1A', // near-black text
          soft: '#4A453F', // muted body text
          faint: 'rgba(26,26,26,0.45)',
        },
        accent: {
          red: '#C2362F', // editorial red
          deep: '#8E2A28', // darker red for depth/wordmark
          glow: 'rgba(194,54,47,0.18)',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        body: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
