import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { Button } from '../../components/ui'
import {
  easeGentle,
  fadeIn,
  fadeUp,
  gentleTransition,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from '../../components/animations/variants'
import FloatingHearts from '../../components/common/FloatingHearts'
import CakeBackground from './CakeBackground'

/*
 * Cake — the birthday wish ritual, bridging the birthday opening into the story.
 *
 * A single sequenced ritual:
 *   Make a Wish → Blow the Candle → Wish made → Continue our story.
 *
 * The candle is only ever extinguished by "Blow the Candle", and the closing
 * message (with the "Continue our story →" button that scrolls into the
 * Fireworks celebration) only appears once the candle is out. The cake is drawn
 * with HTML/CSS + inline SVG (no images, no emoji artwork), and every effect is
 * transform/opacity based with a finite, deterministic sequence — no loops.
 * Reduced motion keeps the full state sequence but skips the particle effects.
 */

// Rising smoke curls after the flame goes out (deterministic offsets).
const SMOKE = [
  { dx: 0, delay: 0 },
  { dx: -3, delay: 0.18 },
  { dx: 3, delay: 0.34 },
]

/*
 * CakeArt — the decorative cake. aria-hidden (the ritual is conveyed by the
 * real text + buttons). `lit` drives the flame, `smoke` the post-blow ember,
 * and `reduceMotion` keeps the flame still when motion is reduced.
 */
function CakeArt({ lit, smoke, reduceMotion }) {
  const flicker = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: [0, 1, 0.92, 0.98, 0.94, 1],
        scaleX: [1, 1.05, 0.97, 1.03, 0.98, 1],
        scaleY: [1, 0.96, 1.04, 0.98, 1.03, 1],
        rotate: [-1.6, 1.2, -0.7, 1.5, -0.5, -1.6],
        x: [0, 0.8, -0.6, 0.5, -0.4, 0],
      }

  return (
    <div className="relative w-[min(84vw,20rem)]" aria-hidden="true">
      {/* Soft halo behind the whole cake */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,203,160,0.16),rgba(217,139,163,0.09)_48%,transparent_72%)] blur-2xl" />

      <svg viewBox="0 0 240 300" className="w-full overflow-visible">
        <defs>
          <linearGradient id="ck-tier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbf4ea" />
            <stop offset="55%" stopColor="#f5e4de" />
            <stop offset="100%" stopColor="#ebd0d3" />
          </linearGradient>
          <linearGradient id="ck-tier2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdf7ef" />
            <stop offset="100%" stopColor="#f0d8da" />
          </linearGradient>
          <linearGradient id="ck-frost" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf9" />
            <stop offset="100%" stopColor="#f8e7e2" />
          </linearGradient>
          <linearGradient id="ck-frost2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffefb" />
            <stop offset="100%" stopColor="#f9eae6" />
          </linearGradient>
          <linearGradient id="ck-plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#efe2cd" />
            <stop offset="100%" stopColor="#c9b393" />
          </linearGradient>
          <linearGradient id="ck-plateTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff7e8" />
            <stop offset="100%" stopColor="#e8d6ba" />
          </linearGradient>
          <linearGradient id="ck-candle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fbe9ee" />
            <stop offset="45%" stopColor="#f7d7de" />
            <stop offset="100%" stopColor="#e0a9b6" />
          </linearGradient>
          <radialGradient id="ck-flameOuter" cx="50%" cy="72%" r="62%">
            <stop offset="0%" stopColor="#ffd98a" />
            <stop offset="55%" stopColor="#f4a45e" />
            <stop offset="100%" stopColor="#d98ba3" />
          </radialGradient>
          <radialGradient id="ck-flameMid" cx="50%" cy="74%" r="60%">
            <stop offset="0%" stopColor="#fff2c8" />
            <stop offset="60%" stopColor="#ffd98a" />
            <stop offset="100%" stopColor="#f4b06a" />
          </radialGradient>
          <radialGradient id="ck-flameCore" cx="50%" cy="76%" r="58%">
            <stop offset="0%" stopColor="#fffdf3" />
            <stop offset="100%" stopColor="#ffe9ad" />
          </radialGradient>
          <radialGradient id="ck-flameBase" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9fc4ee" />
            <stop offset="70%" stopColor="#c79bd0" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="ck-glow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="rgba(255,224,150,0.55)" />
            <stop offset="55%" stopColor="rgba(244,164,94,0.22)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="120" cy="272" rx="104" ry="13" fill="#0b0712" opacity="0.5" />

        {/* Plate */}
        <ellipse cx="120" cy="256" rx="112" ry="17" fill="url(#ck-plate)" />
        <ellipse cx="120" cy="252" rx="104" ry="13" fill="url(#ck-plateTop)" />
        <ellipse cx="96" cy="249" rx="44" ry="6" fill="#ffffff" opacity="0.3" />

        {/* Bottom tier */}
        <path d="M44 176 L196 176 C201 176 203 180 203 187 L203 234 C203 243 196 248 187 248 L53 248 C44 248 37 243 37 234 L37 187 C37 180 39 176 44 176 Z" fill="url(#ck-tier)" />
        <ellipse cx="82" cy="186" rx="32" ry="7" fill="#ffffff" opacity="0.22" />
        <path d="M37 224 C60 239 180 239 203 224 L203 234 C203 243 196 248 187 248 L53 248 C44 248 37 243 37 234 Z" fill="#a85773" opacity="0.16" />
        <circle cx="176" cy="214" r="1.6" fill="#d9a7ae" opacity="0.6" />
        <circle cx="69" cy="206" r="1.2" fill="#d9a7ae" opacity="0.5" />

        {/* Bottom frosting (wavy draped edge + drips) */}
        <path d="M36 178 C36 170 52 164 120 164 C188 164 204 170 204 178 L204 190 C198 200 190 191 183 200 C176 209 168 195 160 203 C152 211 145 195 137 204 C129 213 121 197 113 204 C105 211 98 195 90 203 C82 211 74 195 66 203 C58 211 50 198 43 192 C39 189 37 186 36 190 Z" fill="url(#ck-frost)" />
        <path d="M50 170 C80 166 160 166 190 170" stroke="#ffffff" strokeWidth="2" opacity="0.5" fill="none" strokeLinecap="round" />

        {/* Top tier */}
        <path d="M80 124 L160 124 C165 124 167 128 167 134 L167 166 C167 174 161 179 153 179 L87 179 C79 179 73 174 73 166 L73 134 C73 128 75 124 80 124 Z" fill="url(#ck-tier2)" />
        <ellipse cx="100" cy="132" rx="20" ry="5" fill="#ffffff" opacity="0.26" />
        <path d="M73 160 C92 170 148 170 167 160 L167 166 C167 174 161 179 153 179 L87 179 C79 179 73 174 73 166 Z" fill="#a85773" opacity="0.13" />

        {/* Top frosting */}
        <path d="M72 126 C72 119 84 114 120 114 C156 114 168 119 168 126 L168 136 C163 143 156 136 150 142 C144 148 137 138 131 144 C125 150 118 140 112 145 C106 150 99 140 93 145 C87 150 80 141 76 138 C73 136 72 133 72 138 Z" fill="url(#ck-frost2)" />
        <path d="M84 120 C102 117 138 117 156 120" stroke="#ffffff" strokeWidth="1.6" opacity="0.55" fill="none" strokeLinecap="round" />

        {/* Wick */}
        <line x1="120" y1="68" x2="120" y2="76" stroke="#4a3550" strokeWidth="1.3" strokeLinecap="round" />

        {/* Candle body + wax drip */}
        <rect x="115" y="74" width="10" height="45" rx="3.2" fill="url(#ck-candle)" />
        <rect x="116.4" y="75" width="2.2" height="43" rx="1.1" fill="#ffffff" opacity="0.35" />
        <path d="M115 77 C114 82 117 84 117 88 C117 91 114.5 91 114.6 87 C114.7 82.5 115 79 115 77 Z" fill="#f6d3db" />

        {/* Flame (flickers while lit; bends, stretches, shrinks, fades when blown) */}
        <AnimatePresence>
          {lit && (
            <motion.g
              key="flame"
              style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={flicker}
              exit={{
                rotate: [0, 13, 22, 9, 0],
                scaleX: [1, 1.3, 1.6, 0.8, 0.3],
                scaleY: [1, 0.92, 0.72, 0.5, 0.15],
                opacity: [1, 1, 0.8, 0.4, 0],
                y: [0, -2, -4, -8, -12],
                transition: { duration: 0.9, ease: easeGentle, times: [0, 0.25, 0.45, 0.7, 1] },
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <circle cx="120" cy="58" r="34" fill="url(#ck-glow)" />
              <path d="M120 34 C128 46 134 56 133 64 C132 71 127 73 120 73 C113 73 108 71 107 64 C106 56 112 46 120 34 Z" fill="url(#ck-flameOuter)" />
              <path d="M120 44 C124 51 127 57 126.5 63 C126 69 123.5 72 120 72 C116.5 72 114 69 113.5 63 C113 57 116 51 120 44 Z" fill="url(#ck-flameMid)" />
              <path d="M120 53 C122 57 123 60 122.8 63.5 C122.6 67 121.2 70 120 70 C118.8 70 117.4 67 117.2 63.5 C117 60 118 57 120 53 Z" fill="url(#ck-flameCore)" />
              <ellipse cx="120" cy="71.5" rx="4" ry="2.3" fill="url(#ck-flameBase)" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Tiny ember + soft smoke curls after the blow */}
        {smoke && (
          <g>
            <motion.circle
              cx="120"
              cy="71"
              fill="#ffcf8a"
              initial={{ opacity: 0.9, r: 2 }}
              animate={{ opacity: 0, r: 3.4 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            {SMOKE.map((s, i) => (
              <motion.circle
                key={i}
                fill="#e6d9e8"
                initial={{ opacity: 0, cx: 120 + s.dx, cy: 70, r: 2 }}
                animate={{ opacity: [0, 0.45, 0], cx: 120 + s.dx * 2.2, cy: 42, r: 6 }}
                transition={{ duration: 1.6, delay: s.delay, ease: 'easeOut' }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}

export default function Cake() {
  const [wished, setWished] = useState(false)
  const [blown, setBlown] = useState(false)
  const [smoke, setSmoke] = useState(false)
  const reduceMotion = useReducedMotion()

  const smokeTimer = useRef(null)

  useEffect(
    () => () => {
      clearTimeout(smokeTimer.current)
    },
    [],
  )

  const handleWish = () => setWished(true)

  const handleBlow = () => {
    if (blown) return
    setBlown(true)
    if (!reduceMotion) {
      setSmoke(true)
      smokeTimer.current = setTimeout(() => setSmoke(false), 1700)
    }
  }

  const handleContinue = () => {
    // Same reduced-motion-aware scroll pattern used by the Hero CTA.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    document.getElementById('fireworks')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="cake"
        aria-label="Make a Birthday Wish"
        className="relative isolate overflow-hidden px-6 py-20 sm:py-28"
      >
        <CakeBackground />
        <FloatingHearts variant="cake" />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
          {/* Intro */}
          {!blown && (
            <motion.header
              variants={staggerContainer(0.2, 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mx-auto max-w-2xl text-center"
            >
              <motion.p
                variants={fadeIn}
                className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-champagne/80 sm:text-xs sm:tracking-[0.42em]"
              >
                Before our story begins&hellip;
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-medium leading-tight text-ivory"
              >
                Make a little birthday wish.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-4 max-w-xl font-display text-lg italic leading-relaxed text-ivory/85 sm:text-xl"
              >
                Close your eyes, make your wish, and keep it just between you and
                the stars. ❤️
              </motion.p>
            </motion.header>
          )}

          {/* The cake */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative mt-10 flex justify-center sm:mt-12"
          >
            <CakeArt lit={!blown} smoke={smoke} reduceMotion={reduceMotion} />
          </motion.div>

          {/* Sequenced controls */}
          <div
            className="mt-10 flex min-h-[8rem] w-full flex-col items-center justify-center sm:mt-12"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              {!wished && (
                <motion.div
                  key="wish"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={gentleTransition}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <Button size="lg" onClick={handleWish}>
                    ✨ Make a Wish
                  </Button>
                </motion.div>
              )}

              {wished && !blown && (
                <motion.div
                  key="blow"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={gentleTransition}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <p className="font-display text-xl italic text-champagne/90 sm:text-2xl">
                    Wish made? Keep it secret. 🤫
                  </p>
                  <p className="max-w-md text-base leading-relaxed text-body">
                    Now it&apos;s time to blow the candle.
                  </p>
                  <Button size="lg" onClick={handleBlow}>
                    🕯️ Blow the Candle
                  </Button>
                </motion.div>
              )}

              {blown && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={gentleTransition}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <h3 className="font-display text-[clamp(1.6rem,5vw,2.4rem)] font-medium leading-tight text-ivory">
                    Wish made. ❤️
                  </h3>
                  <p className="max-w-md font-display text-lg italic leading-relaxed text-ivory/90 sm:text-xl">
                    I hope this year brings you everything your heart wishes for.
                  </p>
                  <Button size="lg" onClick={handleContinue}>
                    Continue our story →
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
