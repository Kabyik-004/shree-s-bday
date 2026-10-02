/*
 * Shared, deterministic helpers for the Fireworks section.
 *
 * Kept in a plain module (not a component file) so the component files only
 * export components. No Math.random — every value is derived from a seed.
 */

// Palette → Tailwind fill + matching glow. Existing site colours only.
export const FIREWORK_COLORS = {
  rose: { bg: 'bg-rose', glow: '0 0 6px 1px rgba(217,139,163,0.85)' },
  'rose-deep': { bg: 'bg-rose-deep', glow: '0 0 6px 1px rgba(194,112,140,0.85)' },
  champagne: { bg: 'bg-champagne', glow: '0 0 6px 1px rgba(227,203,160,0.9)' },
  gold: { bg: 'bg-gold', glow: '0 0 6px 1px rgba(207,169,111,0.9)' },
  lavender: { bg: 'bg-lavender', glow: '0 0 6px 1px rgba(198,182,230,0.85)' },
  blush: { bg: 'bg-blush', glow: '0 0 6px 1px rgba(246,223,228,0.9)' },
  ivory: { bg: 'bg-ivory', glow: '0 0 6px 1px rgba(248,242,234,0.9)' },
}

// Deterministic pseudo-randomness (no Math.random).
export function prand(seed) {
  const value = Math.sin(seed) * 43758.5453123
  return value - Math.floor(value)
}

/* Precomputed deterministic particle field for a radial burst. */
export function makeParticles(seed, count, spread) {
  const particles = []
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + prand(seed + i * 1.7) * 0.5
    const distance = spread * (0.5 + prand(seed + i * 2.3) * 0.7)
    particles.push({
      i,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance - spread * 0.12,
      size: 2 + prand(seed + i * 3.3) * 3,
      fall: prand(seed + i * 4.9) > 0.72, // occasional falling spark
    })
  }
  return particles
}
