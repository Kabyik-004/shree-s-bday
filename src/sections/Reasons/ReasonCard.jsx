import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  Flower2,
  Gem,
  Heart,
  Infinity as InfinityIcon,
  Quote,
  Sparkles,
  Star,
} from 'lucide-react'
import { easeGentle, gentleTransition } from '../../components/animations/variants'
import { cn } from '../../lib/cn'

/*
 * ReasonCard — one "Things I Don't Say Enough" card.
 *
 * Accessible disclosure pattern: a full-width <button> toggles a region.
 * The button carries aria-expanded + aria-controls; the panel has a matching
 * id and role="region" with an aria-labelledby pointing back at the title.
 *
 * Reveal: opening shows the known `shortText`, and — once the user adds their
 * own words — the longer `message`. No invented text is ever displayed.
 */

// Icon per card id — purely decorative.
const ICONS = {
  1: Heart,
  2: Sparkles,
  3: Flower2,
  4: Gem,
  5: Star,
  6: Heart,
  7: Quote,
  8: InfinityIcon,
}

// Accent tones reuse the Phase 2 palette (full class strings for Tailwind).
const TONES = {
  rose: {
    icon: 'text-rose',
    ring: 'hover:border-rose/35',
    glow: 'bg-[radial-gradient(circle_at_30%_20%,rgba(217,139,163,0.16),transparent_70%)]',
    dot: 'bg-rose/70',
  },
  champagne: {
    icon: 'text-champagne',
    ring: 'hover:border-champagne/35',
    glow: 'bg-[radial-gradient(circle_at_30%_20%,rgba(227,203,160,0.14),transparent_70%)]',
    dot: 'bg-champagne/70',
  },
  lavender: {
    icon: 'text-lavender',
    ring: 'hover:border-lavender/35',
    glow: 'bg-[radial-gradient(circle_at_30%_20%,rgba(198,182,230,0.16),transparent_70%)]',
    dot: 'bg-lavender/70',
  },
  blush: {
    icon: 'text-blush',
    ring: 'hover:border-blush/40',
    glow: 'bg-[radial-gradient(circle_at_30%_20%,rgba(246,223,228,0.14),transparent_70%)]',
    dot: 'bg-blush/70',
  },
}

export default function ReasonCard({ reason, index, isOpen, onToggle }) {
  const tone = TONES[reason.tone] ?? TONES.rose
  const Icon = ICONS[reason.id] ?? Sparkles

  const buttonId = `reason-button-${reason.id}`
  const panelId = `reason-panel-${reason.id}`

  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...gentleTransition, delay: Math.min(index, 6) * 0.07 }}
    >
      <div
        className={cn(
          'group relative flex flex-col overflow-hidden rounded-card border border-white/10',
          'bg-white/[0.045] shadow-glass backdrop-blur-md transition-colors duration-500 ease-gentle',
          tone.ring,
        )}
      >
        {/* Soft per-card glow */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-2xl',
            tone.glow,
          )}
        />

        <button
          type="button"
          id={buttonId}
          onClick={() => onToggle(reason.id)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="relative flex w-full cursor-pointer items-center gap-3 p-5 text-left focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-night sm:p-6"
        >
          <span
            aria-hidden="true"
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5',
              tone.icon,
            )}
          >
            <Icon size={18} strokeWidth={1.5} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block font-display text-lg font-medium leading-tight text-ivory sm:text-xl">
              {reason.title}
            </span>
            <span className="mt-0.5 block text-[0.6rem] uppercase tracking-[0.28em] text-muted/70">
              {isOpen ? 'tap to close' : 'tap to open'}
            </span>
          </span>

          <motion.span
            aria-hidden="true"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: easeGentle }}
            className="shrink-0 text-champagne/70"
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </motion.span>
        </button>

        {/* Expanding region */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: easeGentle }}
              className="relative overflow-hidden"
            >
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <span
                  aria-hidden="true"
                  className={cn('mb-3 block h-px w-12', tone.dot)}
                />
                <p className="text-base leading-relaxed text-ivory/90">
                  {reason.shortText}
                </p>

                {/* Longer personal message — only shown once the user writes it */}
                {reason.message && (
                  <p className="mt-3 font-display text-base italic leading-relaxed text-body">
                    {reason.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  )
}
