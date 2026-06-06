import type { Metadata } from 'next'
import { Space_Grotesk, Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Tareq Radi — Full-Stack Developer',
  description:
    'Tareq Radi — Full-Stack Developer. I build fast, scalable web products end to end with React, Next.js, Node and Express.',
  authors: [{ name: 'Tareq Radi' }],
  creator: 'Tareq Radi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
