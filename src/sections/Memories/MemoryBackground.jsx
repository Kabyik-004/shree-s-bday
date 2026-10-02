/*
 * MemoryBackground — a slightly warmer atmosphere than OurStory.
 *
 * Same Phase 2 palette: rose glow, champagne warmth and a lavender haze over
 * deep plum/wine. Pure CSS, aria-hidden, pointer-events-none.
 */
export default function MemoryBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Warm base */}
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-plum/55 to-night" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(217,139,163,0.10),rgba(58,31,61,0.22)_45%,rgba(29,17,41,0.38))]" />

      {/* Rose glow */}
      <div className="absolute left-[-12%] top-[15%] h-[34rem] w-[34rem] max-w-[120vw] rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.16),transparent_70%)] blur-3xl" />

      {/* Champagne glow */}
      <div className="absolute right-[-8%] top-1/2 h-[30rem] w-[34rem] max-w-[130vw] rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.12),transparent_70%)] blur-3xl" />

      {/* Lavender haze */}
      <div className="absolute bottom-[-10%] left-1/4 h-[28rem] w-[36rem] max-w-[140vw] rounded-full bg-[radial-gradient(ellipse,rgba(198,182,230,0.12),transparent_70%)] blur-3xl" />

      {/* Blend from OurStory's dusk */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dusk to-transparent" />
    </div>
  )
}
