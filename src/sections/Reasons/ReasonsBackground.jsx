import { Sparkles, Flower2 } from 'lucide-react'

/*
 * ReasonsBackground — a warm, intimate atmosphere.
 *
 * Soft rose/champagne glow with a very faint floral + sparkle language.
 * Same Phase 2 palette only. Pure CSS + a few static (non-animated) decorative
 * icons, aria-hidden, pointer-events-none. No continuous animation loops.
 *
 * IMPORTANT: the whole atmosphere lives in a FIXED-HEIGHT, top-anchored layer.
 * The Reasons grid grows when a card is expanded; because these decorations are
 * positioned with percentages, anchoring them to a fixed box keeps the
 * background perfectly still while only the card window opens.
 */

// Deterministic, very faint decorative accents.
const ACCENTS = [
  { Icon: Sparkles, size: 16, top: '16%', left: '12%', className: 'text-champagne/20' },
  { Icon: Flower2, size: 18, top: '26%', left: '84%', className: 'text-rose/15' },
  { Icon: Sparkles, size: 12, top: '62%', left: '8%', className: 'text-blush/20' },
  { Icon: Flower2, size: 14, top: '72%', left: '80%', className: 'text-lavender/15' },
  { Icon: Sparkles, size: 14, top: '44%', left: '92%', className: 'text-champagne/15' },
  { Icon: Flower2, size: 15, top: '84%', left: '34%', className: 'text-rose/12' },
]

export default function ReasonsBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Solid dark base so the area below the fixed layer stays dark */}
      <div className="absolute inset-0 bg-night" />

      {/* Fixed-height atmospheric layer — does NOT reflow when cards expand */}
      <div className="absolute inset-x-0 top-0 h-[100rem] overflow-hidden">
        {/* Warm base, blending from the Memories section behind it */}
        <div className="absolute inset-0 bg-gradient-to-b from-dusk via-plum/60 to-night" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(217,139,163,0.12),rgba(58,31,61,0.20)_50%,rgba(29,17,41,0.36))]" />

        {/* Rose glow */}
        <div className="absolute left-[-10%] top-[18%] h-[34rem] w-[34rem] max-w-[120vw] rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.18),transparent_70%)] blur-3xl" />

        {/* Champagne glow */}
        <div className="absolute right-[-10%] top-[52%] h-[30rem] w-[34rem] max-w-[130vw] rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.13),transparent_70%)] blur-3xl" />

        {/* Lavender haze */}
        <div className="absolute bottom-[-8%] left-1/3 h-[26rem] w-[34rem] max-w-[140vw] rounded-full bg-[radial-gradient(ellipse,rgba(198,182,230,0.12),transparent_70%)] blur-3xl" />

        {/* Faint floral / sparkle accents */}
        {ACCENTS.map(({ Icon, size, top, left, className }, i) => (
          <Icon
            key={`${top}-${left}-${i}`}
            size={size}
            strokeWidth={1.5}
            style={{ top, left }}
            className={`absolute ${className}`}
          />
        ))}
      </div>

      {/* Blend the top edge in from the Memories section's night */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night to-transparent" />
    </div>
  )
}
