import { MotionConfig, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import {
  blurIn,
  fadeIn,
  fadeUp,
  scaleIn,
  staggerContainer,
} from '../../components/animations/variants'
import FloatingHearts from '../../components/common/FloatingHearts'
import FinaleBackground from './FinaleBackground'

/*
 * Finale — the final embrace of the site.
 *
 * Cinematic but concise: the Letter already carries the long message, so the
 * Finale simply closes the journey. It uses only facts already established in
 * the project (October 9, "Shree", "Mumma").
 *
 * The background music is NOT touched here — the single player mounted at the
 * app root keeps playing straight through this section.
 *
 * A future photo moment could be dropped in later (Phase 12B) but is
 * intentionally not implemented here.
 */

// A few floating hearts — decorative only, gentle and restrained.
const HEARTS = [
  { top: '22%', left: '18%', size: 14, delay: '0s', className: 'animate-float text-rose/25' },
  { top: '62%', left: '82%', size: 12, delay: '1.4s', className: 'animate-float-slow text-blush/25' },
  { top: '78%', left: '30%', size: 16, delay: '0.8s', className: 'animate-float text-lavender/20' },
]

export default function Finale() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="finale"
        aria-label="Happy Birthday"
        className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:py-28"
      >
        <FinaleBackground />
        <FloatingHearts variant="finale" />

        {/* Floating hearts */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {HEARTS.map((h) => (
            <Heart
              key={`${h.top}-${h.left}`}
              size={h.size}
              fill="currentColor"
              style={{ top: h.top, left: h.left, animationDelay: h.delay }}
              className={`absolute ${h.className}`}
            />
          ))}
        </div>

        <motion.div
          variants={staggerContainer(0.45, 0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-5 sm:gap-6"
        >
          <motion.p
            variants={fadeIn}
            className="text-[0.7rem] font-medium uppercase tracking-[0.26em] text-champagne/85 sm:text-sm sm:tracking-[0.45em]"
          >
            October 9
          </motion.p>

          <h2 className="font-display font-medium leading-none text-ivory">
            <motion.span
              variants={fadeUp}
              className="block text-[clamp(2.5rem,8vw,5rem)] tracking-[0.02em] text-ivory/90"
            >
              Happy Birthday,
            </motion.span>
            <motion.span
              variants={blurIn}
              className="mt-1 block bg-gradient-to-b from-ivory via-blush to-rose bg-clip-text font-display text-[clamp(3.5rem,15vw,9rem)] leading-[0.95] text-transparent drop-shadow-[0_0_38px_rgba(217,139,163,0.4)] sm:mt-2"
            >
              Shree <span aria-hidden="true">&#10084;&#65039;</span>
            </motion.span>
          </h2>

          <motion.span
            variants={scaleIn}
            aria-hidden="true"
            className="h-px w-20 bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
          />

          <motion.p
            variants={fadeUp}
            className="max-w-xl font-display text-lg italic leading-relaxed text-ivory/90 sm:text-xl md:text-2xl"
          >
            Here&apos;s to everything we&apos;ve been, everything we are, and
            everything still waiting for us.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-2 font-display text-xl text-champagne sm:text-2xl"
          >
            Happy Birthday, Mumma. <span aria-hidden="true">&#10084;&#65039;</span>
          </motion.p>
        </motion.div>

        {/* Understated ending mark */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 2.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[calc(2rem+env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.2em] text-muted/70 sm:tracking-[0.32em]"
        >
          That&apos;s our little story. <span aria-hidden="true">&#10084;&#65039;</span>
        </motion.p>
      </section>
    </MotionConfig>
  )
}
