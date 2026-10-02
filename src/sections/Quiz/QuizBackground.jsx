/*
 * QuizBackground — a slightly brighter, more playful atmosphere than OpenWhen.
 *
 * Deep plum / wine base lifted with rose, champagne and lavender glows so the
 * quiz feels light, while staying inside the Phase 2 palette (no neon).
 * Pure CSS, aria-hidden, pointer-events-none, no animation loops.
 */
export default function QuizBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Brighter base */}
      <div className="absolute inset-0 bg-gradient-to-b from-wine/60 via-plum/70 to-dusk" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(217,139,163,0.14),rgba(198,182,230,0.10)_45%,rgba(29,17,41,0.32))]" />

      {/* Rose glow */}
      <div className="absolute left-[-8%] top-[20%] h-[32rem] w-[32rem] max-w-[120vw] rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.20),transparent_70%)] blur-3xl" />

      {/* Champagne glow */}
      <div className="absolute right-[-8%] top-[38%] h-[28rem] w-[32rem] max-w-[130vw] rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.16),transparent_70%)] blur-3xl" />

      {/* Lavender glow */}
      <div className="absolute bottom-[-6%] left-1/3 h-[26rem] w-[34rem] max-w-[140vw] rounded-full bg-[radial-gradient(ellipse,rgba(198,182,230,0.14),transparent_70%)] blur-3xl" />
    </div>
  )
}
