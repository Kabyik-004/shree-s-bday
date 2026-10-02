import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FIREWORK_COLORS, makeParticles } from './fireworkUtils'

/*
 * FireworkBurst — one normal firework.
 *
 * Believable, deterministic sequence: a rocket streak rises, a bright
 * ignition flash fires, then particles burst outward at varied distances and
 * angles, a few of them falling like sparks, all fading naturally.
 *
 * Decorative only (rendered inside an aria-hidden layer). Uses only transform
 * and opacity. No Math.random — particle offsets come from a hash of the seed
 * and are memoised, so nothing is regenerated on re-render.
 */

export default function FireworkBurst({
  left,
  top,
  launch = 120,
  spread = 60,
  count = 14,
  delay = 0,
  colors = ['champagne', 'rose'],
  seed = 1,
}) {
  const particles = useMemo(
    () => makeParticles(seed, count, spread),
    [seed, count, spread],
  )
  const burstStart = delay + 0.62

  return (
    <div className="absolute" style={{ left, top }}>
      {/* Rocket streak accelerating upward */}
      <motion.span
        className="absolute h-10 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-t from-transparent via-champagne to-transparent"
        initial={{ y: launch, opacity: 0 }}
        animate={{ y: [launch, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.62, delay, ease: 'easeOut' }}
      />

      {/* Ignition flash */}
      <motion.span
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ boxShadow: '0 0 24px 8px rgba(255,244,216,0.9)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.6, 0.6], opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, delay: burstStart, ease: 'easeOut' }}
      />

      {/* Particles */}
      {particles.map((p) => {
        const color =
          FIREWORK_COLORS[colors[p.i % colors.length]] ?? FIREWORK_COLORS.champagne
        return (
          <motion.span
            key={p.i}
            className={`absolute rounded-full ${color.bg}`}
            style={{ width: p.size, height: p.size, boxShadow: color.glow }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
            animate={
              p.fall
                ? { x: [0, p.dx], y: [0, p.dy, p.dy + 26], opacity: [0, 1, 1, 0], scale: [0.5, 1, 0.6] }
                : { x: [0, p.dx], y: [0, p.dy], opacity: [0, 1, 0], scale: [0.5, 1, 0.4] }
            }
            transition={{
              duration: p.fall ? 1.7 : 1.35,
              delay: burstStart,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}
