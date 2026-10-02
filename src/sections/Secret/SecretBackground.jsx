import { Sparkles, Star } from 'lucide-react'

/*
 * SecretBackground — a little more mysterious than the Quiz, still romantic.
 *
 * A soft vignette, a champagne glow and faint stars / thin decorative lines.
 * Never gothic or horror-like. Uses only the Phase 2 palette.
 * Pure CSS, aria-hidden, pointer-events-none, no animation loops.
 */

const STARS = [
  { top: '14%', left: '12%', size: 2, opacity: 0.5 },
  { top: '22%', left: '78%', size: 2, opacity: 0.4 },
  { top: '34%', left: '28%', size: 3, opacity: 0.55 },
  { top: '46%', left: '88%', size: 2, opacity: 0.35 },
  { top: '58%', left: '16%', size: 2, opacity: 0.45 },
  { top: '70%', left: '64%', size: 2, opacity: 0.4 },
  { top: '82%', left: '36%', size: 3, opacity: 0.5 },
  { top: '30%', left: '52%', size: 2, opacity: 0.3 },
  { top: '64%', left: '90%', size: 2, opacity: 0.35 },
]

export default function SecretBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Deeper base than the surrounding sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum/70 via-night to-dusk" />

      {/* Blend the top edge in from the Quiz section's dusk */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dusk to-transparent" />

      {/* Champagne glow, centred */}
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,203,160,0.12),rgba(217,139,163,0.08)_45%,transparent_70%)] blur-3xl" />

      {/* Vignette to draw the eye inward */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(14,7,22,0.72))]" />

      {/* Faint stars */}
      {STARS.map((s) => (
        <span
          key={`${s.top}-${s.left}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          }}
          className="absolute rounded-full bg-ivory"
        />
      ))}

      {/* Thin decorative accents */}
      <Sparkles
        size={16}
        className="absolute left-[18%] top-[38%] text-champagne/20"
      />
      <Star
        size={12}
        className="absolute bottom-[24%] right-[22%] text-lavender/20"
        fill="currentColor"
      />
    </div>
  )
}
