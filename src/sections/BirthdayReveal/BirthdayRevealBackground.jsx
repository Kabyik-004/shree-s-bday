import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'
import { fadeIn } from '../../components/animations/variants'

/*
 * BirthdayRevealBackground — warmer atmospheric layer for the reveal.
 *
 * Environment shift: night → plum → wine with a soft rose glow, so the page
 * feels brighter and more celebratory than the Hero while using the same
 * Phase 2 palette. Restrained celebratory decor only — no confetti, no
 * fireworks (those belong to the finale).
 *
 * Pure CSS/DOM, deterministic, aria-hidden, pointer-events-none.
 */

// Deterministic sparkle layout.
const SPARKLES = [
  { top: '18%', left: '14%', size: 3, delay: '0s', duration: '5s' },
  { top: '24%', left: '82%', size: 2, delay: '1.1s', duration: '6s' },
  { top: '36%', left: '24%', size: 2, delay: '2.2s', duration: '4.6s' },
  { top: '30%', left: '62%', size: 2, delay: '0.6s', duration: '5.6s' },
  { top: '58%', left: '12%', size: 2, delay: '1.6s', duration: '6.4s' },
  { top: '70%', left: '80%', size: 3, delay: '0.4s', duration: '5.2s' },
  { top: '52%', left: '90%', size: 2, delay: '2.6s', duration: '7s' },
  { top: '80%', left: '32%', size: 2, delay: '1.2s', duration: '4.9s' },
  { top: '44%', left: '46%', size: 2, delay: '3s', duration: '6.1s' },
  { top: '14%', left: '40%', size: 2, delay: '2s', duration: '5.3s' },
]

export default function BirthdayRevealBackground() {
  const sparkles = useMemo(
    () =>
      SPARKLES.map((s) => ({
        key: `${s.top}-${s.left}`,
        style: {
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          animationDelay: s.delay,
          animationDuration: s.duration,
        },
      })),
    [],
  )

  return (
    <motion.div
      aria-hidden="true"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Warm gradient floor: plum → wine */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-plum/40 to-wine/55" />

      {/* Soft rose glow behind the focal text */}
      <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.2),rgba(198,182,230,0.09)_45%,transparent_70%)] blur-2xl" />

      {/* Champagne warmth towards the top */}
      <div className="absolute -top-[8%] left-1/2 h-[26rem] w-[56rem] max-w-[150vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.12),transparent_65%)] blur-3xl" />

      {/* Blend the top edge back into the Hero's night background */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night to-transparent" />

      {/* Celebratory sparkle particles */}
      {sparkles.map((s) => (
        <span
          key={s.key}
          style={s.style}
          className="absolute rounded-full bg-champagne/75 shadow-[0_0_8px_2px_rgba(227,203,160,0.5)] animate-twinkle"
        />
      ))}

      {/* A few faint floating accents */}
      <Sparkles
        size={18}
        className="absolute left-[18%] top-[64%] text-blush/25 animate-float"
      />
      <Sparkles
        size={13}
        className="absolute right-[20%] top-[20%] text-champagne/25 animate-float-slow"
      />
      <Star
        size={12}
        className="absolute bottom-[18%] right-[28%] text-lavender/20 animate-float"
        fill="currentColor"
      />
      <Sparkles
        size={12}
        className="absolute bottom-[30%] left-[24%] text-rose/20 animate-float-slow"
      />
    </motion.div>
  )
}
