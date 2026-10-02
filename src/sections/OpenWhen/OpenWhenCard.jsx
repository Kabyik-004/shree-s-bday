import { motion } from 'framer-motion'
import {
  Cloud,
  Gift,
  Heart,
  Mail,
  Moon,
  Smile,
  Sparkles,
  Wind,
} from 'lucide-react'
import { gentleTransition } from '../../components/animations/variants'
import { cn } from '../../lib/cn'

/*
 * OpenWhenCard — an envelope Shree can open.
 *
 * The whole envelope is a real <button>, so it is keyboard operable and opens
 * the message dialog. Visual variation is deterministic (per index) so the
 * collection feels hand-arranged but never random.
 *
 * Paper-like ivory/blush surface against the deep plum background reads as a
 * physical letter rather than a generic card.
 */

// Situation → icon (all icons are aria-hidden decorations).
const ICONS = {
  heart: Heart,
  cloud: Cloud,
  smile: Smile,
  moon: Moon,
  space: Wind,
  hug: Heart,
  love: Sparkles,
  mail: Mail,
  gift: Gift,
}

// Deterministic paper tints.
const PAPERS = [
  'from-ivory via-blush/70 to-blush/50',
  'from-blush/75 via-ivory to-blush/60',
  'from-ivory via-blush/60 to-lavender/35',
  'from-blush/70 via-blush/50 to-ivory',
]

// Deterministic tilts (never random).
const ROTATIONS = [-1.4, 1, -0.8, 1.6, -1.2, 0.6, -0.9, 1.3, 0]

export default function OpenWhenCard({ item, index, onOpen }) {
  const Icon = ICONS[item.icon] ?? Mail
  const paper = PAPERS[index % PAPERS.length]
  const rotation = item.special ? 0 : ROTATIONS[index % ROTATIONS.length]
  const isSpecial = Boolean(item.special)

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...gentleTransition, delay: Math.min(index, 7) * 0.07 }}
      className="group h-full"
      style={{ '--rot': `${rotation}deg` }}
    >
      <div className="rotate-[var(--rot)] transition-transform duration-500 ease-gentle group-hover:rotate-0 group-focus-within:rotate-0">
        <button
          type="button"
          onClick={() => onOpen(item)}
          aria-haspopup="dialog"
          aria-label={`${item.title}`}
          className={cn(
            'block w-full cursor-pointer overflow-hidden rounded-card text-left shadow-glass',
            'transition-all duration-500 ease-gentle hover:-translate-y-1 hover:shadow-glass-hover',
            'focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-night',
            isSpecial
              ? 'border-2 border-champagne/60 ring-1 ring-champagne/20'
              : 'border border-white/40',
          )}
        >
          {/* Envelope body */}
          <div
            className={cn(
              'relative aspect-[3/2] w-full bg-gradient-to-br',
              paper,
            )}
          >
            {/* Flap */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-blush/40 [clip-path:polygon(0_0,100%_0,50%_100%)]"
            />

            {/* Wax-seal style icon */}
            <span
              aria-hidden="true"
              className={cn(
                'absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-glow-rose',
                isSpecial
                  ? 'bg-gradient-to-br from-champagne to-gold text-night'
                  : 'bg-gradient-to-br from-rose to-rose-deep text-night',
              )}
            >
              <Icon size={20} strokeWidth={1.75} />
            </span>

            {/* "OPEN WHEN" micro-label */}
            <span className="absolute inset-x-0 bottom-2 text-center text-[0.55rem] uppercase tracking-[0.22em] text-wine/70 sm:tracking-[0.36em]">
              Open when
            </span>

            {isSpecial && (
              <span className="absolute right-2 top-2 rounded-full bg-night/45 px-2 py-0.5 text-[0.5rem] uppercase tracking-[0.24em] text-champagne">
                special
              </span>
            )}
          </div>

          {/* Label band */}
          <div className="border-t border-wine/10 bg-ivory/95 px-4 py-4">
            <p className="font-display text-lg font-medium leading-snug text-wine">
              {item.shortLabel}
            </p>
            <span className="mt-1 block text-[0.58rem] uppercase tracking-[0.3em] text-wine/55">
              tap to open
            </span>
          </div>
        </button>
      </div>
    </motion.li>
  )
}
