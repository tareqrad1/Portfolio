export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-[0] overflow-hidden bg-paper-base">
      {/* Soft warm vignette so the cream isn't flat */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, #FBF8F3 0%, #F5F1EC 45%, #ECE5DB 100%)',
        }}
      />

      {/* Glow 1 — warm red, top right */}
      <div
        className="hero-glow pointer-events-none absolute right-[-120px] top-[-120px] h-[620px] w-[620px] opacity-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(194,54,47,0.14) 0%, transparent 70%)',
        }}
      />
      {/* Glow 2 — deeper red, bottom left */}
      <div
        className="hero-glow pointer-events-none absolute bottom-[-80px] left-[-160px] h-[520px] w-[520px] opacity-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(142,42,40,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Hairline frame — subtle magazine print border */}
      <div className="pointer-events-none absolute inset-4 rounded-sm border border-paper-line md:inset-6" />
    </div>
  )
}
