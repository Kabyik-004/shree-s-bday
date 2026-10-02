/*
 * OpenWhenBackground — a soft, romantic "writing desk" atmosphere.
 *
 * Deep plum / wine with a rose glow and faint champagne specks. Distinct from
 * Reasons (which is warmer/rose-heavy) while staying in the Phase 2 palette.
 * Pure CSS, aria-hidden, pointer-events-none, no animation loops.
 */

// Faint champagne specks — deterministic positions.
const SPECKS = [
  { top: '14%', left: '10%' },
  { top: '22%', left: '62%' },
  { top: '36%', left: '86%' },
  { top: '48%', left: '18%' },
  { top: '60%', left: '74%' },
  { top: '72%', left: '40%' },
  { top: '84%', left: '12%' },
  { top: '30%', left: '34%' },
]

export default function OpenWhenBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base, blending from the Reasons section */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-plum/70 to-wine/70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(58,31,61,0.30),rgba(29,17,41,0.20)_45%,rgba(217,139,163,0.10))]" />

      {/* Rose glow, upper left */}
      <div className="absolute left-[-12%] top-[12%] h-[34rem] w-[34rem] max-w-[120vw] rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.18),transparent_70%)] blur-3xl" />

      {/* Champagne glow, lower right */}
      <div className="absolute right-[-10%] bottom-[8%] h-[32rem] w-[36rem] max-w-[130vw] rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.14),transparent_70%)] blur-3xl" />

      {/* Lavender haze */}
      <div className="absolute left-1/3 top-1/2 h-[26rem] w-[32rem] max-w-[140vw] rounded-full bg-[radial-gradient(ellipse,rgba(198,182,230,0.10),transparent_70%)] blur-3xl" />

      {/* Faint champagne specks */}
      {SPECKS.map((s, i) => (
        <span
          key={`${s.top}-${s.left}-${i}`}
          style={{ top: s.top, left: s.left }}
          className="absolute h-[3px] w-[3px] rounded-full bg-champagne/40"
        />
      ))}
    </div>
  )
}
