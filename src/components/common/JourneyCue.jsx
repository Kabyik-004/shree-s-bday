import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { easeGentle } from '../animations/variants'
import { cn } from '../../lib/cn'

/*
 * JourneyCue — a small, consistent "there's something next" hint that ties the
 * sections together into one journey. Deliberately understated: an optional
 * italic line plus a short uppercase label and a gently bobbing chevron.
 *
 * Pass `onClick` to turn the whole cue into a real, keyboard-accessible button
 * (used for direct jumps such as "Now, let me show you our story →"). Without
 * it, the cue is a purely decorative nudge and normal scrolling stays natural.
 *
 * Motion is inherited from the section's <MotionConfig reducedMotion="user">,
 * so the bob is automatically disabled for reduced-motion users.
 */
export default function JourneyCue({ line, label, onClick, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 0.2, duration: 1, ease: easeGentle }}
      className={cn('flex flex-col items-center gap-2 text-center', className)}
    >
      {line && (
        <p className="max-w-xl font-display text-lg italic leading-relaxed text-ivory/85 sm:text-xl">
          {line}
        </p>
      )}

      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="group mt-1 inline-flex flex-col items-center gap-1 rounded-2xl px-3 py-2 transition-colors duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted/70 transition-colors duration-300 group-hover:text-champagne/85">
            {label}
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-champagne/70"
          >
            <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
          </motion.span>
        </button>
      ) : (
        <>
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted/70">
            {label}
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-champagne/70"
          >
            <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
          </motion.span>
        </>
      )}
    </motion.div>
  )
}
