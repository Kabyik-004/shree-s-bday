import { useRef } from 'react'
import { MotionConfig, motion, useInView, useReducedMotion } from 'framer-motion'
import { easeGentle } from '../../components/animations/variants'
import FloatingHearts from '../../components/common/FloatingHearts'
import FireworksBackground from './FireworksBackground'
import FireworkBurst from './FireworkBurst'
import HeartFirework from './HeartFirework'

/*
 * Fireworks — a cinematic birthday celebration that bridges the Cake ritual
 * into Our Story.
 *
 * The whole sequence plays automatically when the section first scrolls into
 * view (once only) and then holds on the milestone. Everything decorative lives
 * in an aria-hidden layer and animates with transform/opacity only. The
 * meaningful text is normal DOM content. Reduced motion skips all particles and
 * shows the final content immediately.
 *
 * No JS timers, no animation loops: every beat is a Framer Motion delay.
 */

// Normal firecrackers — deterministic launch positions, heights, sizes & palettes.
const BURSTS = [
  { id: 1, left: '24%', top: '58%', launch: 150, spread: 58, count: 14, delay: 1.0, colors: ['rose', 'champagne', 'blush'], seed: 11 },
  { id: 2, left: '74%', top: '50%', launch: 140, spread: 54, count: 12, delay: 2.1, colors: ['champagne', 'gold', 'lavender'], seed: 23 },
  { id: 3, left: '38%', top: '46%', launch: 150, spread: 68, count: 16, delay: 3.2, colors: ['lavender', 'blush', 'champagne'], seed: 37 },
  { id: 4, left: '62%', top: '42%', launch: 140, spread: 64, count: 15, delay: 4.3, colors: ['rose', 'rose-deep', 'champagne'], seed: 51 },
  { id: 5, left: '30%', top: '36%', launch: 160, spread: 86, count: 20, delay: 5.6, colors: ['gold', 'champagne', 'blush'], seed: 67 },
  { id: 6, left: '70%', top: '34%', launch: 150, spread: 82, count: 18, delay: 6.6, colors: ['rose', 'lavender', 'champagne'], seed: 79 },
]

const HEART = { left: '50%', top: '30%', delay: 8.0 }

// A couple of gentle final fireworks while the milestone settles.
const FINAL_BURSTS = [
  { id: 7, left: '46%', top: '54%', launch: 140, spread: 58, count: 12, delay: 12.0, colors: ['lavender', 'blush', 'champagne'], seed: 97 },
  { id: 8, left: '58%', top: '48%', launch: 140, spread: 52, count: 10, delay: 13.2, colors: ['champagne', 'rose', 'gold'], seed: 103 },
]

const GRADIENT_TEXT =
  'bg-gradient-to-b from-ivory via-blush to-rose bg-clip-text text-transparent'

// Timed text groups (they cross-fade in the same centred area).
function TimedCelebration() {
  return (
    <>
      {/* Opening */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 7.6, times: [0, 0.04, 0.88, 1], ease: 'easeInOut' }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: easeGentle }}
          className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-champagne/80 sm:text-sm"
        >
          AND NOW&hellip;
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: easeGentle }}
          className="mt-3 font-display text-[clamp(1.6rem,6vw,3rem)] font-medium leading-tight text-ivory"
        >
          LET&apos;S CELEBRATE YOU.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)', y: 14 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ delay: 2.2, duration: 1, ease: easeGentle }}
          className={`mt-5 font-display text-[clamp(1.8rem,7vw,3.4rem)] font-medium leading-tight ${GRADIENT_TEXT}`}
        >
          Happy Birthday, Shree! ❤️
        </motion.p>
      </motion.div>

      {/* Heart firework moment */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 8.6, duration: 3.4, times: [0, 0.12, 0.82, 1], ease: 'easeInOut' }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 8.8, duration: 0.8, ease: easeGentle }}
          className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-champagne/85 sm:text-sm"
        >
          FOR MY FAVORITE PERSON
        </motion.p>
        <motion.p
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 9.4, duration: 1, ease: easeGentle }}
          className={`mt-3 font-display text-[clamp(2.4rem,12vw,6rem)] font-medium leading-none ${GRADIENT_TEXT}`}
        >
          SHREE
        </motion.p>
      </motion.div>

      {/* Milestone (stays) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 10.9, duration: 0.7, ease: easeGentle }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 11.2, duration: 0.7, ease: easeGentle }}
          className={`font-display text-[clamp(2.6rem,13vw,6.5rem)] font-medium leading-none ${GRADIENT_TEXT}`}
        >
          8,401 DAYS
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 11.9, duration: 0.7, ease: easeGentle }}
          className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted/70 sm:text-xs"
        >
          9 October 2003 — 9 October 2026
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 12.2, duration: 0.7, ease: easeGentle }}
          className="mt-3 font-display text-[clamp(1rem,4.4vw,1.7rem)] italic leading-snug text-ivory/85"
        >
          of being wonderfully, completely YOU.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 12.9, duration: 0.7, ease: easeGentle }}
          className="mt-6 text-[0.8rem] uppercase tracking-[0.36em] text-gold sm:text-base"
        >
          CONGRATS ON LEVELING UP
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 13.5, duration: 0.7, ease: easeGentle }}
          className="mt-2 text-[0.95rem] text-champagne sm:text-lg"
        >
          Level 23 unlocked.
        </motion.p>
      </motion.div>
    </>
  )
}

// Reduced-motion view: the meaningful content, shown at once with a soft fade.
function StaticCelebration() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: easeGentle }}
      className="flex flex-col items-center"
    >
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-champagne/80 sm:text-sm">
        AND NOW&hellip; LET&apos;S CELEBRATE YOU.
      </p>
      <p className={`mt-4 font-display text-[clamp(1.8rem,7vw,3.4rem)] font-medium leading-tight ${GRADIENT_TEXT}`}>
        Happy Birthday, Shree! ❤️
      </p>
      <p className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-champagne/85 sm:text-sm">
        FOR MY FAVORITE PERSON
      </p>
      <p className={`mt-2 font-display text-[clamp(2.4rem,12vw,6rem)] font-medium leading-none ${GRADIENT_TEXT}`}>
        SHREE
      </p>
      <p className={`mt-8 font-display text-[clamp(2.6rem,13vw,6.5rem)] font-medium leading-none ${GRADIENT_TEXT}`}>
        8,401 DAYS
      </p>
      <p className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted/70 sm:text-xs">
        9 October 2003 — 9 October 2026
      </p>
      <p className="mt-3 font-display text-[clamp(1rem,4.4vw,1.7rem)] italic leading-snug text-ivory/85">
        of being wonderfully, completely YOU.
      </p>
      <p className="mt-6 text-[0.8rem] uppercase tracking-[0.36em] text-gold sm:text-base">
        CONGRATS ON LEVELING UP
      </p>
      <p className="mt-2 text-[0.95rem] text-champagne sm:text-lg">
        Level 23 unlocked.
      </p>
    </motion.div>
  )
}

export default function Fireworks() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  // Derived during render (no effect): the show begins once the section is seen.
  const started = inView

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        id="fireworks"
        aria-label="Birthday Celebration"
        className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-20 text-center sm:py-28"
      >
        <FireworksBackground />
        <FloatingHearts variant="fireworks" />

        {/* Decorative firework layer — behind the content, clipped in-section */}
        {!reduceMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          >
            {started && (
              <>
                {BURSTS.map((burst) => (
                  <FireworkBurst key={burst.id} {...burst} />
                ))}
                <HeartFirework {...HEART} />
                {FINAL_BURSTS.map((burst) => (
                  <FireworkBurst key={burst.id} {...burst} />
                ))}
              </>
            )}
          </div>
        )}

        {/* Meaningful content */}
        <div className="relative z-10 w-full max-w-3xl">
          {reduceMotion ? (
            <StaticCelebration />
          ) : (
            <div className="relative mx-auto flex min-h-[19rem] w-full items-center justify-center">
              {started && <TimedCelebration />}
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  )
}
