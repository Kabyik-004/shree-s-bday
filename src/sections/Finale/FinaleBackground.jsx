/*
 * FinaleBackground — the warmest, brightest atmosphere of the site.
 *
 * Wine → dusk base lifted by rose and champagne glows, soft light rays and a
 * restrained sprinkling of glowing specks. Uses only the Phase 2 palette.
 * Lightweight: a handful of elements animated by CSS keyframes (no JS loop).
 */

// Deterministic glowing specks.
const SPECKS = [
  { top: '16%', left: '12%', size: 3, delay: '0s', duration: '5s' },
  { top: '24%', left: '80%', size: 2, delay: '1.1s', duration: '6s' },
  { top: '34%', left: '26%', size: 2, delay: '2.2s', duration: '4.6s' },
  { top: '44%', left: '68%', size: 3, delay: '0.6s', duration: '5.6s' },
  { top: '58%', left: '14%', size: 2, delay: '1.6s', duration: '6.4s' },
  { top: '66%', left: '86%', size: 2, delay: '0.4s', duration: '5.2s' },
  { top: '76%', left: '40%', size: 2, delay: '2.6s', duration: '7s' },
  { top: '30%', left: '50%', size: 2, delay: '1.2s', duration: '4.9s' },
  { top: '84%', left: '72%', size: 2, delay: '2s', duration: '5.3s' },
  { top: '52%', left: '92%', size: 2, delay: '3s', duration: '6.1s' },
]

export default function FinaleBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Brighter base, blending from the Letter's dusk */}
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-wine/55 to-plum/70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(217,139,163,0.16),rgba(227,203,160,0.10)_45%,rgba(29,17,41,0.35))]" />

      {/* Blend the top edge in from the Letter section's night */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night to-transparent" />

      {/* Soft light rays */}
      <div className="absolute left-1/2 top-0 h-[36rem] w-[70rem] max-w-[170vw] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,transparent,rgba(227,203,160,0.10),transparent_55%)] blur-2xl" />

      {/* Central rose glow */}
      <div className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.20),rgba(198,182,230,0.10)_45%,transparent_70%)] blur-3xl" />

      {/* Champagne warmth */}
      <div className="absolute bottom-[-10%] left-1/2 h-[30rem] w-[60rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.14),transparent_68%)] blur-3xl" />

      {/* Glowing specks */}
      {SPECKS.map((s) => (
        <span
          key={`${s.top}-${s.left}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
          className="absolute rounded-full bg-champagne/70 shadow-[0_0_8px_2px_rgba(227,203,160,0.45)] animate-twinkle"
        />
      ))}
    </div>
  )
}
