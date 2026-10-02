/*
 * CakeBackground — a warm, candlelit atmosphere for the birthday ritual.
 *
 * Slightly warmer than the Letter section (rose + champagne glows, a faint
 * lavender haze) while settling back toward night so it flows naturally into
 * the Finale. Blends in from the Letter's night at the top edge, and its own
 * bottom edge is night to meet the Finale's top blend.
 *
 * Pure CSS, aria-hidden, pointer-events-none, no animation loops.
 */
export default function CakeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Warm base, settling back toward night for the Finale */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-plum/60 to-night" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(58,31,61,0.22),rgba(217,139,163,0.10)_45%,rgba(227,203,160,0.06)_72%,rgba(29,17,41,0.30))]" />

      {/* Blend the top edge in from the Letter section's night */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night to-transparent" />

      {/* Warm rose glow behind the cake */}
      <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.16),rgba(227,203,160,0.08)_45%,transparent_70%)] blur-3xl" />

      {/* Champagne warmth from below, like candlelight on a surface */}
      <div className="absolute bottom-[-8%] left-1/2 h-[24rem] w-[44rem] max-w-[150vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.12),transparent_68%)] blur-3xl" />

      {/* Faint lavender haze, upper left */}
      <div className="absolute left-[-8%] top-[18%] h-[26rem] w-[30rem] max-w-[120vw] rounded-full bg-[radial-gradient(circle,rgba(198,182,230,0.10),transparent_70%)] blur-3xl" />
    </div>
  )
}
