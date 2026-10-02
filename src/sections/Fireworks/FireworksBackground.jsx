/*
 * FireworksBackground — a dark, cinematic atmosphere for the celebration.
 *
 * Deeper/darker than the Finale (which must remain the emotional climax): a
 * deep plum/wine base with a subtle rose glow, a champagne glow and a faint
 * lavender haze, plus a few very subtle stars. Blends in from the Cake's night
 * at the top and settles on wine at the bottom to meet OurStory's top blend.
 *
 * Pure CSS, aria-hidden, pointer-events-none, no animation loops.
 */

// Deterministic faint stars.
const STARS = [
  { top: '12%', left: '16%', size: 2, opacity: 0.5 },
  { top: '22%', left: '72%', size: 2, opacity: 0.4 },
  { top: '34%', left: '40%', size: 2, opacity: 0.35 },
  { top: '48%', left: '84%', size: 2, opacity: 0.45 },
  { top: '58%', left: '24%', size: 2, opacity: 0.3 },
  { top: '68%', left: '62%', size: 2, opacity: 0.4 },
  { top: '80%', left: '12%', size: 2, opacity: 0.35 },
  { top: '28%', left: '54%', size: 2, opacity: 0.3 },
  { top: '74%', left: '88%', size: 2, opacity: 0.4 },
]

export default function FireworksBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Deep base: keeps the section darker than the Finale */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-plum/70 to-wine/70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,7,22,0.55),rgba(29,17,41,0.35)_52%,rgba(58,31,61,0.45))]" />

      {/* Blend the top edge in from the Cake section's night */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night to-transparent" />

      {/* Subtle rose glow */}
      <div className="absolute left-[-10%] top-[22%] h-[34rem] w-[34rem] max-w-[120vw] rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.12),transparent_72%)] blur-3xl" />

      {/* Champagne glow, lower */}
      <div className="absolute right-[-10%] bottom-[10%] h-[30rem] w-[36rem] max-w-[130vw] rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.10),transparent_72%)] blur-3xl" />

      {/* Faint lavender haze */}
      <div className="absolute left-1/3 top-1/2 h-[26rem] w-[32rem] max-w-[140vw] rounded-full bg-[radial-gradient(ellipse,rgba(198,182,230,0.08),transparent_72%)] blur-3xl" />

      {/* Faint stars */}
      {STARS.map((s, i) => (
        <span
          key={`${s.top}-${s.left}-${i}`}
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }}
          className="absolute rounded-full bg-ivory"
        />
      ))}
    </div>
  )
}
