import { MotionConfig, motion } from 'framer-motion'
import {
  blurIn,
  easeGentle,
  fadeIn,
  fadeUp,
  scaleIn,
  staggerContainer,
} from '../../components/animations/variants'
import FloatingHearts from '../../components/common/FloatingHearts'
import BirthdayRevealBackground from './BirthdayRevealBackground'

/*
 * BirthdayReveal — the first real surprise.
 *
 * Sequence: section settles → "October 9" → divider → "Happy Birthday"
 * → "Shree" (focal point) → supporting message. Restrained celebratory
 * particles live in the background layer.
 *
 * MotionConfig reducedMotion="user" honours the visitor's OS setting.
 * The heading text is readable even with all motion disabled.
 */

// The "9" starts calm and gently warms into champagne — no complex JS.
const dateNumber = {
  hidden: { opacity: 0.65, scale: 0.94, color: '#f8f2ea' },
  visible: {
    opacity: 1,
    scale: 1.08,
    color: '#e3cba0',
    transition: { delay: 0.55, duration: 0.9, ease: easeGentle },
  },
}

export default function BirthdayReveal() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="birthday"
        aria-label="Happy Birthday"
        className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:py-28"
      >
        <BirthdayRevealBackground />
        <FloatingHearts variant="birthday" />

        <motion.div
          variants={staggerContainer(0.45, 0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-4 sm:gap-5"
        >
          {/* Date — "October" then the "9" warms and lifts */}
          <motion.p
            variants={fadeIn}
            className="flex items-baseline gap-2 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-champagne/85 sm:text-sm sm:tracking-[0.45em]"
          >
            <span>October</span>
            <motion.span
              variants={dateNumber}
              className="inline-block font-display text-base font-semibold normal-case tracking-normal text-champagne sm:text-lg"
            >
              9
            </motion.span>
          </motion.p>

          {/* Subtle glow / divider */}
          <motion.span
            variants={scaleIn}
            aria-hidden="true"
            className="h-px w-20 bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
          />

          {/* Heading: "Happy Birthday" + focal "Shree" */}
          <h2 className="font-display font-medium leading-none text-ivory">
            <motion.span
              variants={fadeUp}
              className="block text-[clamp(2.5rem,8vw,5rem)] tracking-[0.02em] text-ivory/90"
            >
              Happy Birthday
            </motion.span>
            <motion.span
              variants={blurIn}
              className="mt-1 block bg-gradient-to-b from-ivory via-blush to-rose bg-clip-text font-display text-[clamp(3.5rem,15vw,9rem)] leading-[0.95] text-transparent drop-shadow-[0_0_38px_rgba(217,139,163,0.4)] sm:mt-2"
            >
              Shree <span aria-hidden="true">&#10084;&#65039;</span>
            </motion.span>
          </h2>

          {/* Supporting message */}
          <motion.p
            variants={fadeUp}
            className="mt-2 max-w-md font-display text-xl italic text-ivory/90 sm:text-2xl"
          >
            Today is all about you.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-sm leading-relaxed text-muted sm:text-base"
          >
            Today, the world gets to celebrate the person who makes my world a
            little more beautiful.
          </motion.p>
        </motion.div>

        {/* Subtle scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 2.6, duration: 1, ease: easeGentle }}
          className="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 sm:bottom-8"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted/70">
            there&apos;s a little more
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-champagne/70"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.span>
        </motion.div>
      </section>
    </MotionConfig>
  )
}
