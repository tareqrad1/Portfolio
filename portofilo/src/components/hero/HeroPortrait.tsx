import Image from 'next/image'
import { heroData } from '@/lib/hero-data'

export default function HeroPortrait() {
  return (
    <div className="relative mx-auto h-[72vh] max-h-[640px] w-full max-w-[400px]">
      {/* Subtle neutral glow halo behind the image */}
      <div
        className="pointer-events-none absolute inset-[-10%] z-[0]"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 42%, rgba(0,0,0,0.06) 0%, transparent 72%)',
        }}
      />

      {/* Image wrapper — GSAP animates this, zero color overlays */}
      <div className="hero-portrait-wrapper relative z-[10] h-full w-full overflow-hidden rounded-[3px] will-change-transform">
        <Image
          src="/images/portrait.jpg"
          alt={`${heroData.name} — Full-Stack Developer`}
          fill
          priority
          sizes="(max-width: 768px) 78vw, 400px"
          className="object-cover object-top"
          style={{ objectPosition: 'center top' }}
        />

        {/* Soft bottom fade so the photo blends into the cream page */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[35%]"
          style={{
            background:
              'linear-gradient(to top, #F5F1EC 0%, rgba(245,241,236,0.5) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Thin accent frame */}
      <div
        className="pointer-events-none absolute z-[20]"
        style={{
          top: '3%',
          left: '5%',
          right: '5%',
          bottom: '7%',
          border: '1px solid rgba(26,26,26,0.12)',
          borderRadius: '3px',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
