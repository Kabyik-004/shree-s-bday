import { motion } from 'framer-motion'
import { easeGentle } from '../../components/animations/variants'

/*
 * CakeCelebration — the short cinematic moment between "Blow the Candle" and
 * the final wish message.
 *
 * Two exports:
 *   - `Fireworks` (named): a full-bleed, decorative, FINITE sequence of
 *     firecrackers and one heart-shaped firework. aria-hidden + pointer-events
 *     -none, clipped inside its parent, and mounted only while celebrating.
 *   - `CakeCelebration` (default): the meaningful birthday message — "23 years /
 *     8,401 days on this planet / CONGRATS ON LEVELING UP! ✨" — as real DOM text.
 *
 * Everything is deterministic (hash-based offsets, no Math.random) and uses
 * Framer Motion transforms/opacity only. No loops, no particle library.
 */

/* --- deterministic pseudo-randomness (no Math.random) --------------------- */
function prand(seed) {
  const value = Math.sin(seed) * 43758.5453123
  return value - Math.floor(value)
}

const GLOW = '0 0 7px 1px rgba(227,203,160,0.7)'

const COLOR_CLASS = {
  rose: 'bg-rose',
  'rose-deep': 'bg-rose-deep',
  blush: 'bg-blush',
  champagne: 'bg-champagne',
  gold: 'bg-gold',
  lavender: 'bg-lavender',
}

function buildBurst(count, spread, seedBase) {
  const particles = []
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + prand(seedBase + i) * 0.6
    const distance = spread * (0.6 + prand(seedBase + i * 2.3) * 0.6)
    particles.push({
      i,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance - spread * 0.15,
      size: 2 + prand(seedBase + i * 3.7) * 3,
    })
  }
  return particles
}

/* Parametric heart — particles settle onto these offsets, then scatter. */
function buildHeart(count, scale, seedBase) {
  const points = []
  for (let i = 0; i < count; i += 1) {
    const t = (i / count) * Math.PI * 2
    const hx = 16 * Math.sin(t) ** 3
    const hy =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    points.push({
      i,
      x: hx * scale,
      y: -hy * scale,
      size: 1.6 + prand(seedBase + i * 3.1) * 2.2,
    })
  }
  return points
}

const BURST_PALETTES = [
  ['champagne', 'rose', 'blush'],
  ['lavender', 'champagne', 'rose'],
  ['rose', 'gold', 'champagne', 'lavender'],
]

/* A single radial burst of particles. */
function Burst({ left, top, count, spread, delay, palette, seed }) {
  const particles = buildBurst(count, spread, seed)
  return (
    <div className="absolute" style={{ left, top }}>
      {particles.map((p) => {
        const color = palette[p.i % palette.length]
        return (
          <motion.span
            key={p.i}
            className={`absolute rounded-full ${COLOR_CLASS[color]}`}
            style={{ width: p.size, height: p.size, boxShadow: GLOW }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={{
              x: [0, p.dx],
              y: [0, p.dy],
              opacity: [0, 1, 0],
              scale: [0.4, 1, 0.35],
            }}
            transition={{ duration: 1.3, delay, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

/* The highlight: particles travel out, settle into a heart, glow, scatter. */
function HeartFirework({ left, top, delay }) {
  const points = buildHeart(38, 3.2, 91)
  return (
    <div
      className="absolute origin-center scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100"
      style={{ left, top }}
    >
      {points.map((p) => (
        <motion.span
          key={p.i}
          className="absolute rounded-full bg-champagne"
          style={{ width: p.size, height: p.size, boxShadow: GLOW }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
          animate={{
            x: [0, p.x * 0.6, p.x, p.x * 1.18],
            y: [0, p.y * 0.6, p.y, p.y * 1.18],
            opacity: [0, 1, 1, 0],
            scale: [0.4, 1, 1, 0.3],
          }}
          transition={{
            duration: 2.6,
            delay: delay + p.i * 0.012,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* soft glow that blooms as the heart forms, then fades */}
      <motion.span
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,203,160,0.22),transparent_70%)] blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.9, 0] }}
        transition={{ duration: 2.6, delay, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* Full-bleed decorative firework sequence (finite, deterministic). */
export function Fireworks() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* small opening firecrackers */}
      <Burst
        left="24%"
        top="54%"
        count={14}
        spread={72}
        delay={0.4}
        palette={BURST_PALETTES[0]}
        seed={11}
      />
      <Burst
        left="74%"
        top="46%"
        count={12}
        spread={62}
        delay={0.9}
        palette={BURST_PALETTES[1]}
        seed={29}
      />

      {/* rising streak for the main firework */}
      <motion.span
        className="absolute bottom-[14%] left-1/2 h-16 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-t from-transparent via-champagne to-transparent"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: '-52vh' }}
        transition={{ duration: 0.5, delay: 1.35, ease: 'easeOut' }}
      />

      {/* main burst + heart formation near the top */}
      <Burst
        left="50%"
        top="26%"
        count={26}
        spread={116}
        delay={1.9}
        palette={BURST_PALETTES[2]}
        seed={53}
      />
      <HeartFirework left="50%" top="24%" delay={2.0} />
    </div>
  )
}

/* The meaningful celebration message (real DOM text, never aria-hidden). */
export default function CakeCelebration({ reduceMotion = false }) {
  const d = (time) => (reduceMotion ? 0 : time)

  return (
    <div className="flex scroll-mt-24 flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: d(2.2), duration: 0.9, ease: easeGentle }}
      >
        <span className="block bg-gradient-to-b from-ivory via-blush to-rose bg-clip-text font-display text-[clamp(4rem,20vw,9rem)] font-medium leading-[0.85] text-transparent">
          23
        </span>
        <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.5em] text-champagne/85 sm:text-sm">
          Years
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: d(2.5), duration: 0.8, ease: easeGentle }}
        className="mt-6 font-display text-[clamp(1.15rem,4.6vw,2rem)] leading-snug text-ivory"
      >
        8,401 days <span className="text-muted">on this planet 🌍</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: d(3.0), duration: 0.8, ease: easeGentle }}
        className="mt-4 text-[0.75rem] uppercase tracking-[0.35em] text-gold sm:text-sm"
      >
        CONGRATS ON LEVELING UP! ✨
      </motion.p>
    </div>
  )
}
