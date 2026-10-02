import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { easeGentle } from '../../components/animations/variants'

/*
 * ScrollIndicator — understated "there's more below" hint.
 * Fades in late (after the CTA) and bobs very gently. The bob is a transform
 * animation, so MotionConfig reducedMotion="user" disables it automatically.
 */
export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.4, duration: 1, ease: easeGentle }}
      className="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 sm:bottom-8"
    >
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted/70">
        there&apos;s more
      </span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-champagne/70"
      >
        <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
      </motion.span>
    </motion.div>
  )
}
