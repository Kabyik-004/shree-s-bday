import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FIREWORK_COLORS, prand } from './fireworkUtils'

/*
 * HeartFirework — the emotional centerpiece.
 *
 * A rocket rises, flashes, and its particles travel outward, settle onto a
 * parametric heart curve, glow softly, then scatter and fade. The heart is
 * built from many glowing particles (never an emoji or a single static SVG
 * heart). Decorative only; deterministic; transform/opacity only.
 */

const HEART_COLORS = ['champagne', 'rose', 'gold', 'blush', 'lavender']

function buildHeart(count, scale, seed) {
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
      size: 1.8 + prand(seed + i * 3.1) * 2.4,
      color: HEART_COLORS[i % HEART_COLORS.length],
    })
  }
  return points
}

export default function HeartFirework({ left = '50%', top = '30%', delay = 8 }) {
  const points = useMemo(() => buildHeart(40, 3.2, 91), [])
  const burstStart = delay + 0.62

  return (
    <div
      className="absolute origin-center scale-[0.62] sm:scale-75 md:scale-90 lg:scale-100"
      style={{ left, top }}
    >
      {/* Rocket streak */}
      <motion.span
        className="absolute h-14 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-t from-transparent via-champagne to-transparent"
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: [150, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.62, delay, ease: 'easeOut' }}
      />

      {/* Ignition flash */}
      <motion.span
        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ boxShadow: '0 0 30px 10px rgba(255,244,216,0.95)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 3, 0.6], opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, delay: burstStart, ease: 'easeOut' }}
      />

      {/* Heart particles: burst out → settle into the heart → scatter */}
      {points.map((p) => {
        const color = FIREWORK_COLORS[p.color] ?? FIREWORK_COLORS.champagne
        return (
          <motion.span
            key={p.i}
            className={`absolute rounded-full ${color.bg}`}
            style={{ width: p.size, height: p.size, boxShadow: color.glow }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={{
              x: [0, p.x * 0.5, p.x, p.x * 1.18],
              y: [0, p.y * 0.5, p.y, p.y * 1.18],
              opacity: [0, 1, 1, 0],
              scale: [0.4, 1, 1, 0.4],
            }}
            transition={{
              duration: 2.6,
              delay: burstStart + p.i * 0.012,
              ease: 'easeInOut',
            }}
          />
        )
      })}

      {/* Soft glow blooming as the heart forms, then fading */}
      <motion.span
        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,203,160,0.22),transparent_70%)] blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.9, 0] }}
        transition={{ duration: 2.6, delay: burstStart, ease: 'easeInOut' }}
      />
    </div>
  )
}
