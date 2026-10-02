import { MotionConfig, motion } from 'framer-motion'
import { Button } from '../../components/ui'
import { play as playBackgroundMusic } from '../../components/common/music'
import FloatingHearts from '../../components/common/FloatingHearts'
import {
  blurIn,
  fadeIn,
  fadeUp,
  scaleIn,
  staggerContainer,
} from '../../components/animations/variants'
import HeroBackground from './HeroBackground'
import ScrollIndicator from './ScrollIndicator'

/*
 * Hero — the opening experience.
 *
 * Emotional arc: mystery → warmth → recognition → invitation.
 * Background settles first, then the eyebrow line, the name "Shree",
 * the supporting message and finally the call to action.
 *
 * MotionConfig reducedMotion="user" makes Framer Motion honour the visitor's
 * OS "reduce motion" preference for every animation in this section.
 */
export default function Hero() {
  const handleBegin = () => {
    // Start the soundtrack on this genuine user interaction. Any browser
    // autoplay refusal is swallowed inside play(); the experience continues.
    playBackgroundMusic()

    // Smoothly scroll into the reveal. Respect reduced-motion preferences.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    document.getElementById('birthday')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="hero"
        aria-label="Opening"
        className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:py-28"
      >
        <HeroBackground />
        <FloatingHearts variant="hero" />

        <motion.div
          variants={staggerContainer(0.42, 0.8)}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-5 sm:gap-6"
        >
          {/* Small introductory line */}
          <motion.p
            variants={fadeIn}
            className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-champagne/80 sm:text-xs sm:tracking-[0.4em]"
          >
            For someone very special&hellip;
          </motion.p>

          {/* The emotional focal point */}
          <motion.h1
            variants={blurIn}
            className="bg-gradient-to-b from-ivory via-blush to-rose bg-clip-text font-display text-[clamp(4.5rem,20vw,11rem)] font-medium leading-[0.95] tracking-[0.01em] text-transparent drop-shadow-[0_0_36px_rgba(217,139,163,0.35)]"
          >
            Shree
          </motion.h1>

          {/* Thin accent divider */}
          <motion.span
            variants={scaleIn}
            aria-hidden="true"
            className="h-px w-16 bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
          />

          {/* Short supporting line */}
          <motion.p
            variants={fadeUp}
            className="font-display text-lg italic text-ivory/85 sm:text-xl md:text-2xl"
          >
            I made a little something for you.
          </motion.p>

          {/* Call to action */}
          <motion.div variants={fadeUp} className="mt-2 sm:mt-4">
            <Button size="lg" onClick={handleBegin}>
              Begin Our Story
            </Button>
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </section>
    </MotionConfig>
  )
}
