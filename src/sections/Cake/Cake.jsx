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
 * Flow (unchanged): Make a Wish → Blow the Candle → realistic extinguishing →
 * "Wish made. ❤️" → auto-advance into the Fireworks celebration.
 *
 * The candle is only ever extinguished by "Blow the Candle". On that click the
 * extinguishing sequence plays (air-hit lean → deform → shrink → ember → smoke,
 * ~1.85s); once the flame is out the section shows the closing message briefly
 * and then scrolls itself into the celebration (reduced-motion aware). There is
 * no Continue button. Everything is transform/opacity based, deterministic and
 * lightweight — no raster images, no JS animation loops, no new dependencies.
 */

/* ---------------- Candle smoke wisps (thin, translucent, deterministic) --- */
const SMOKE = [
  { d: 'M0 0 C -2.4 -6 2.2 -12 0 -19 C -2 -26 1.8 -32 0 -39', x: 0, delay: 0.05 },
  { d: 'M0 0 C 2.2 -6 -2.2 -13 0 -20 C 2 -27 -1.8 -33 0 -40', x: -2.4, delay: 0.22 },
  { d: 'M0 0 C -1.8 -7 2 -13 0 -20 C -1.8 -27 1.6 -34 0 -41', x: 2.4, delay: 0.38 },
]

/*
 * CakeArt — the decorative cake. aria-hidden (the ritual is conveyed by the
 * real text + buttons). `lit` drives the flame, `smoke` the post-blow ember and
 * wisps, `settle` a barely-there physical response, and `reduceMotion` keeps the
 * flame completely still.
 */
function CakeArt({ lit, smoke, settle, reduceMotion }) {
  // Layered flame movement — each layer desyncs so the flame never simply
  // scales up/down. Multi-keyframe paths read as organic drift.
  const outerMove = reduceMotion
    ? { opacity: 1 }
    : {
        x: [0, 0.7, -0.5, 0.4, -0.35, 0.6, 0],
        y: [0, -0.4, 0.3, -0.2, 0.35, -0.3, 0],
        rotate: [-1.3, 1.5, -1, -0.5, 1.4, -0.6, -1.3],
        scaleX: [1, 1.03, 0.975, 1.04, 0.97, 1.02, 1],
        scaleY: [1, 0.97, 1.05, 0.98, 1.03, 0.96, 1],
        opacity: [1, 0.95, 1, 0.92, 1, 0.94, 1],
      }
  const midMove = reduceMotion
    ? { opacity: 1 }
    : {
        x: [0, -0.4, 0.55, -0.6, 0.3, -0.45, 0],
        scaleY: [1, 1.06, 0.96, 1.03, 0.97, 1.04, 1],
        rotate: [0.6, -0.9, 0.8, -0.4, 1, -0.7, 0.6],
        opacity: [1, 0.92, 1, 0.95, 1, 0.93, 1],
      }
  const coreMove = reduceMotion
    ? { opacity: 1 }
    : {
        x: [0, 0.3, -0.4, 0.4, -0.2, 0.3, 0],
        scaleY: [1, 0.94, 1.06, 0.97, 1.02, 0.95, 1],
        opacity: [1, 0.95, 1, 0.9, 1, 0.96, 1],
      }
  const glowMove = reduceMotion
    ? { opacity: 0.5 }
    : {
        opacity: [0.42, 0.6, 0.4, 0.58, 0.44, 0.62, 0.42],
        scale: [1, 1.06, 0.95, 1.04, 0.97, 1.05, 1],
        x: [0, 0.8, -0.6, 0.5, -0.4, 0.7, 0],
      }

  const loop = (duration) =>
    reduceMotion ? { duration: 0 } : { duration, repeat: Infinity, ease: 'easeInOut' }

  return (
    <div className="relative w-[clamp(15rem,70vw,22rem)]" aria-hidden="true">
      {/* Very soft ambient glow — kept close so it never overpowers the cake */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,203,160,0.14),rgba(217,139,163,0.08)_48%,transparent_72%)] blur-2xl" />

      <svg viewBox="0 0 240 300" className="w-full overflow-visible">
        <defs>
          {/* Soft blur for shadows + smoke */}
          <filter id="ck-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="ck-smoke" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.3" />
          </filter>

          {/* Tier bodies — warm cream with gentle tonal falloff */}
          <linearGradient id="ck-tier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdf7ef" />
            <stop offset="42%" stopColor="#f6e7e0" />
            <stop offset="78%" stopColor="#eed6d6" />
            <stop offset="100%" stopColor="#e3c4c9" />
          </linearGradient>
          <linearGradient id="ck-tier2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffaf4" />
            <stop offset="55%" stopColor="#f7e6e1" />
            <stop offset="100%" stopColor="#ecd2d4" />
          </linearGradient>

          {/* Frosting — near-white cream with a whisper of rose */}
          <linearGradient id="ck-frost" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#fffdf9" />
            <stop offset="52%" stopColor="#fdf3ee" />
            <stop offset="100%" stopColor="#f6e3df" />
          </linearGradient>
          <linearGradient id="ck-frostHi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Plate */}
          <linearGradient id="ck-plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#efe2cd" />
            <stop offset="100%" stopColor="#c6b090" />
          </linearGradient>
          <linearGradient id="ck-plateTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff8ea" />
            <stop offset="100%" stopColor="#e6d3b6" />
          </linearGradient>

          {/* Candle — cylindrical shading (dark edges, lit centre) */}
          <linearGradient id="ck-candle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#cf8d9c" />
            <stop offset="20%" stopColor="#f2cdd6" />
            <stop offset="48%" stopColor="#fff2f4" />
            <stop offset="76%" stopColor="#eebfc9" />
            <stop offset="100%" stopColor="#c47f90" />
          </linearGradient>
          <linearGradient id="ck-waxPool" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff4f5" />
            <stop offset="100%" stopColor="#e7b9c4" />
          </linearGradient>

          {/* Flame layers */}
          <linearGradient id="ck-flameMain" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#ffe4a0" stopOpacity="0.5" />
            <stop offset="35%" stopColor="#ffca6e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e5834f" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="ck-flameMid" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#fff7dd" />
            <stop offset="55%" stopColor="#ffe08c" />
            <stop offset="100%" stopColor="#f6b25f" />
          </linearGradient>
          <linearGradient id="ck-flameCore" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fff0b8" />
          </linearGradient>
          <radialGradient id="ck-flameBase" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a9cdf2" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#c99bd6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c99bd6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ck-glow" cx="50%" cy="56%" r="52%">
            <stop offset="0%" stopColor="rgba(255,226,158,0.5)" />
            <stop offset="52%" stopColor="rgba(244,164,94,0.2)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Contact shadow on the surface */}
        <ellipse cx="120" cy="268" rx="106" ry="13" fill="#0a0510" opacity="0.55" filter="url(#ck-soft)" />

        {/* Plate */}
        <ellipse cx="120" cy="256" rx="112" ry="16" fill="url(#ck-plate)" />
        <ellipse cx="120" cy="252.5" rx="103" ry="12.5" fill="url(#ck-plateTop)" />
        <ellipse cx="95" cy="249" rx="42" ry="5.5" fill="#ffffff" opacity="0.32" />

        {/* The cake body responds to the blow with a barely-there settle */}
        <motion.g
          animate={settle ? { y: [0, 0.7, 0] } : { y: 0 }}
          transition={{ duration: 0.85, ease: easeGentle }}
        >
          {/* ---- Bottom tier ---- */}
          <path d="M44 174 L196 174 C201 174 203 178 203 185 L203 234 C203 243 196 248 187 248 L53 248 C44 248 37 243 37 234 L37 185 C37 178 39 174 44 174 Z" fill="url(#ck-tier)" />
          {/* left light / right shade for roundness */}
          <path d="M44 174 L86 174 L86 248 L53 248 C44 248 37 243 37 234 L37 185 C37 178 39 174 44 174 Z" fill="#ffffff" opacity="0.12" />
          <path d="M168 174 L196 174 C201 174 203 178 203 185 L203 234 C203 243 196 248 187 248 L168 248 Z" fill="#b06c80" opacity="0.12" />
          {/* soft crumb texture */}
          <g fill="#c98d9b" opacity="0.28">
            <circle cx="72" cy="214" r="1.1" />
            <circle cx="104" cy="228" r="1" />
            <circle cx="152" cy="220" r="1.1" />
            <circle cx="176" cy="206" r="0.9" />
            <circle cx="128" cy="238" r="1" />
          </g>

          {/* shadow cast by the bottom frosting onto the tier */}
          <path d="M40 186 C70 196 170 196 200 186 L200 196 C170 206 70 206 40 196 Z" fill="#8a4f63" opacity="0.18" filter="url(#ck-soft)" />

          {/* ---- Bottom frosting (irregular draped edge, varied drips) ---- */}
          <path d="M36 176 C36 167 54 160 120 160 C186 160 204 167 204 176 L204 188 C201 200 196 188 192 199 C188 210 183 194 179 203 C175 212 170 195 166 204 C162 213 156 196 152 205 C148 214 143 197 139 205 C135 213 129 197 125 206 C121 215 116 198 112 205 C108 212 103 196 99 204 C95 212 89 196 85 203 C81 210 75 195 71 200 C66 206 60 193 56 196 C50 200 44 191 41 189 C38 187 37 184 36 188 Z" fill="url(#ck-frost)" />
          {/* upper-surface highlight + soft under-edge shadow */}
          <path d="M46 172 C78 164 162 164 194 172 C160 168 80 168 46 172 Z" fill="url(#ck-frostHi)" />
          <path d="M52 178 C86 172 154 172 188 178" stroke="#ffffff" strokeWidth="2.2" opacity="0.5" fill="none" strokeLinecap="round" />
          <path d="M40 186 C70 194 170 194 200 186" stroke="#b07283" strokeWidth="1.4" opacity="0.28" fill="none" strokeLinecap="round" />

          {/* ---- Top tier ---- */}
          <path d="M80 122 L160 122 C165 122 167 126 167 133 L167 166 C167 175 161 180 153 180 L87 180 C79 180 73 175 73 166 L73 133 C73 126 75 122 80 122 Z" fill="url(#ck-tier2)" />
          <path d="M80 122 L104 122 L104 180 L87 180 C79 180 73 175 73 166 L73 133 C73 126 75 122 80 122 Z" fill="#ffffff" opacity="0.12" />
          <path d="M146 122 L160 122 C165 122 167 126 167 133 L167 166 C167 175 161 180 153 180 L146 180 Z" fill="#b06c80" opacity="0.1" />

          {/* shadow under the top frosting */}
          <path d="M76 132 C100 140 140 140 164 132 L164 140 C140 148 100 148 76 140 Z" fill="#8a4f63" opacity="0.18" filter="url(#ck-soft)" />

          {/* ---- Top frosting ---- */}
          <path d="M72 126 C72 118 86 112 120 112 C154 112 168 118 168 126 L168 134 C165 143 161 134 157 142 C153 150 149 137 145 144 C141 151 136 138 132 145 C128 152 123 139 119 146 C115 153 110 140 106 145 C102 150 97 139 93 144 C89 149 84 138 80 141 C76 144 73 137 72 141 Z" fill="url(#ck-frost)" />
          <path d="M84 118 C104 112 136 112 156 118 C136 116 104 116 84 118 Z" fill="url(#ck-frostHi)" />
          <path d="M86 124 C106 119 134 119 154 124" stroke="#ffffff" strokeWidth="1.8" opacity="0.55" fill="none" strokeLinecap="round" />
          <path d="M76 132 C100 139 140 139 164 132" stroke="#b07283" strokeWidth="1.2" opacity="0.26" fill="none" strokeLinecap="round" />

          {/* ---- Candle ---- */}
          {/* melted wax pool at the top */}
          <ellipse cx="120" cy="75.5" rx="5.6" ry="2.1" fill="url(#ck-waxPool)" />
          {/* body */}
          <rect x="114.6" y="75" width="10.8" height="45" rx="3.4" fill="url(#ck-candle)" />
          {/* highlight along the lit side */}
          <rect x="116.6" y="76" width="2" height="42.5" rx="1" fill="#ffffff" opacity="0.4" />
          {/* soft inner shadow on the dark side */}
          <rect x="123.2" y="76" width="1.6" height="42.5" rx="0.8" fill="#a45f72" opacity="0.28" />
          {/* a natural wax drip down one side */}
          <path d="M114.8 78 C114 84 117.2 86 117.2 90 C117.2 93.4 114.4 93.2 114.6 89 C114.8 84 115 80.5 114.8 78 Z" fill="#f3cdd6" opacity="0.95" />
          {/* base shadow where the candle meets the frosting */}
          <ellipse cx="120" cy="119.5" rx="7.4" ry="2.4" fill="#8a4f63" opacity="0.26" filter="url(#ck-soft)" />

          {/* wick — slight natural bend, glowing tip when lit */}
          <path d="M120 66.5 C119.2 70 120.8 73 120 76.2" stroke="#4a3550" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          {lit && <circle cx="120" cy="67" r="1" fill="#ffcf8a" opacity="0.9" />}
        </motion.g>

        {/* ---- Flame (layered, organic movement; phased extinguish) ---- */}
        <AnimatePresence>
          {lit && (
            <motion.g
              key="flame"
              style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                x: [0, 5, 7, 3, 0],
                rotate: [0, 20, 27, 10, -6],
                scaleX: [1, 1.2, 1.5, 0.75, 0.2],
                scaleY: [1, 1.12, 0.82, 0.5, 0.12],
                opacity: [1, 1, 0.9, 0.5, 0],
                transition: { duration: 0.95, ease: easeGentle, times: [0, 0.16, 0.34, 0.56, 1] },
              }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: easeGentle }}
            >
              {/* outer glow around the flame */}
              <motion.circle
                cx="120"
                cy="57"
                r="31"
                fill="url(#ck-glow)"
                animate={glowMove}
                transition={loop(3.2)}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 60%' }}
              />
              {/* outer flame */}
              <motion.g
                animate={outerMove}
                transition={loop(4.8)}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              >
                <path d="M120 32 C128.5 43.5 134.5 53 133.4 61.2 C132.6 69 127 73 120 73 C112.6 73 106.6 68.8 106.4 61 C106.2 52.8 112.5 43 120 32 Z" fill="url(#ck-flameMain)" />
              </motion.g>
              {/* main flame */}
              <motion.g
                animate={midMove}
                transition={loop(3.6)}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              >
                <path d="M120 42.5 C125 50 128 57 126.8 63 C125.7 69 123 72 120 72 C116.4 72 113.6 68.8 113.2 63 C112.8 57.2 116 50 120 42.5 Z" fill="url(#ck-flameMid)" />
              </motion.g>
              {/* inner core (disappears last via parent timing) */}
              <motion.g
                animate={coreMove}
                transition={loop(2.8)}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              >
                <path d="M120 52 C122.2 56.8 123.4 60.2 123 63.6 C122.6 67.2 121.4 70 120 70 C118.6 70 117.4 67.2 117 63.6 C116.6 60.2 117.8 56.8 120 52 Z" fill="url(#ck-flameCore)" />
              </motion.g>
              {/* blue/rose base near the wick */}
              <ellipse cx="120" cy="71.4" rx="3.8" ry="2.2" fill="url(#ck-flameBase)" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ---- Ember + thin smoke wisps after the blow ---- */}
        {smoke && (
          <g>
            {/* lingering ember at the wick */}
            <motion.circle
              cx="120"
              cy="70"
              fill="#ffb968"
              initial={{ opacity: 0.95, r: 1.7 }}
              animate={{ opacity: 0, r: 3.1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
            <motion.circle
              cx="120"
              cy="70"
              fill="#fff2d0"
              initial={{ opacity: 0.9, r: 0.8 }}
              animate={{ opacity: 0, r: 1.4 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
            {/* wisps rise, drift, expand and fade */}
            <g transform="translate(120 68)" filter="url(#ck-smoke)">
              {SMOKE.map((wisp, i) => (
                <motion.path
                  key={i}
                  d={wisp.d}
                  stroke="#e9dce9"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ opacity: 0, x: wisp.x, y: 0, scaleY: 0.6 }}
                  animate={{
                    opacity: [0, 0.5, 0.26, 0],
                    x: [wisp.x, wisp.x * 1.7],
                    y: [0, -22, -50],
                    scaleY: [0.6, 1, 1.55],
                  }}
                  transition={{ duration: 1.5, delay: wisp.delay, ease: 'easeOut' }}
                  style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                />
              ))}
            </g>
          </g>
        )}
      </svg>
    </div>
  )
}

export default function Cake() {
  const [wished, setWished] = useState(false)
  const [blowStarted, setBlowStarted] = useState(false)
  const [blown, setBlown] = useState(false)
  const [smoke, setSmoke] = useState(false)
  const reduceMotion = useReducedMotion()

  const timers = useRef([])

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    },
    [],
  )

  const handleWish = () => setWished(true)

  const handleBlow = () => {
    if (blowStarted) return

    if (reduceMotion) {
      setBlowStarted(true)
      setBlown(true)
      return
    }

    // Begin the extinguishing animation immediately.
    setBlowStarted(true)
    const schedule = (fn, ms) => timers.current.push(setTimeout(fn, ms))
    schedule(() => setSmoke(true), 380) // ember + smoke begin mid-sequence
    schedule(() => setSmoke(false), 1950) // smoke finishes
    schedule(() => setBlown(true), 1850) // then the birthday message appears
  }

  // Once the candle is out, take the visitor into the celebration automatically.
  useEffect(() => {
    if (!blown) return undefined
    const id = setTimeout(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      document.getElementById('fireworks')?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }, 1600)
    return () => clearTimeout(id)
  }, [blown])

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
          {/* Intro — kept mounted at all times so the cake never shifts when
              the candle is blown. */}
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

          {/* The cake */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative mt-10 flex justify-center sm:mt-12"
          >
            <CakeArt
              lit={!blowStarted}
              smoke={smoke}
              settle={blowStarted}
              reduceMotion={reduceMotion}
            />
          </motion.div>

          {/* Sequenced controls — reserved height keeps the section stable
              across the wish → blow → message swaps. */}
          <div
            className="mt-10 flex min-h-[12rem] w-full flex-col items-center justify-center sm:mt-12"
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

              {wished && !blowStarted && (
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
