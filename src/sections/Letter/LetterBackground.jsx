/*
 * LetterBackground — quieter than the Secret; the site slows down here.
 *
 * Dusk / plum / wine with a soft rose glow and a faint champagne glow.
 * Deliberately minimal: no particles, no animation loops.
 * Pure CSS, aria-hidden, pointer-events-none.
 */
export default function LetterBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Calm base */}
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-plum/70 to-night" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(58,31,61,0.25),rgba(217,139,163,0.08)_55%,rgba(29,17,41,0.35))]" />

      {/* Soft rose glow behind the letter */}
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.12),transparent_70%)] blur-3xl" />

      {/* Faint champagne glow */}
      <div className="absolute bottom-[-8%] right-[-6%] h-[28rem] w-[32rem] max-w-[130vw] rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.10),transparent_70%)] blur-3xl" />
    </div>
  )
}
