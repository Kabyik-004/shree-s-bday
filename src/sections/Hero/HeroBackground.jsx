import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { fadeIn } from '../../components/animations/variants'

/*
 * HeroBackground — the hero's atmospheric + decorative layer.
 *
 * Pure CSS/DOM: a soft central glow, a handful of softly twinkling light
 * particles and a couple of very faint star/heart accents. No particle
 * library, no per-frame JavaScript. Everything is aria-hidden and
 * pointer-events-none so it never interferes with content or the keyboard.
 */

// Deterministic layout (avoids re-randomising on every render).
const PARTICLES = [
  { top: '16%', left: '12%', size: 3, delay: '0s', duration: '5s' },
  { top: '26%', left: '84%', size: 2, delay: '1.2s', duration: '6s' },
  { top: '38%', left: '22%', size: 2, delay: '2.4s', duration: '4.5s' },
  { top: '20%', left: '58%', size: 2, delay: '0.6s', duration: '5.5s' },
  { top: '62%', left: '10%', size: 2, delay: '1.8s', duration: '6.5s' },
  { top: '72%', left: '78%', size: 3, delay: '0.3s', duration: '5s' },
  { top: '54%', left: '90%', size: 2, delay: '2s', duration: '7s' },
  { top: '82%', left: '34%', size: 2, delay: '1s', duration: '4.8s' },
  { top: '44%', left: '48%', size: 2, delay: '2.8s', duration: '6.2s' },
  { top: '12%', left: '34%', size: 2, delay: '3.2s', duration: '5.4s' },
  { top: '68%', left: '56%', size: 2, delay: '0.9s', duration: '5.8s' },
  { top: '88%', left: '86%', size: 2, delay: '2.2s', duration: '6.6s' },
]

export default function HeroBackground() {
  // Memoise the animation style objects so re-renders don't rebuild them.
  const particles = useMemo(
    () =>
      PARTICLES.map((p) => ({
        key: `${p.top}-${p.left}`,
        style: {
          top: p.top,
          left: p.left,
          width: p.size,
          height: p.size,
          animationDelay: p.delay,
          animationDuration: p.duration,
        },
      })),
    [],
  )

  return (
    <motion.div
      aria-hidden="true"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Soft central glow behind the text */}
      <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.16),rgba(198,182,230,0.08)_45%,transparent_70%)] blur-2xl" />

      {/* Faint champagne halo, lower in the frame */}
      <div className="absolute bottom-[-12%] left-1/2 h-[30rem] w-[62rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.09),transparent_65%)] blur-3xl" />

      {/* Twinkling light particles */}
      {particles.map((p) => (
        <span
          key={p.key}
          style={p.style}
          className="absolute rounded-full bg-champagne/70 shadow-[0_0_8px_2px_rgba(227,203,160,0.45)] animate-twinkle"
        />
      ))}

      {/* A few faint star accents, floating gently */}
      <Sparkles
        size={16}
        className="absolute left-[16%] top-[30%] text-blush/30 animate-float"
      />
      <Sparkles
        size={12}
        className="absolute right-[18%] top-[24%] text-champagne/25 animate-float-slow"
      />
      <Sparkles
        size={14}
        className="absolute bottom-[22%] right-[26%] text-lavender/25 animate-float"
      />

      {/* One very subtle heart accent — elegance over excess */}
      <Heart
        size={14}
        className="absolute bottom-[28%] left-[20%] text-rose/20 animate-float-slow"
        fill="currentColor"
      />
    </motion.div>
  )
}
