import { cn } from '../../lib/cn'

/*
 * FloatingHearts — the recurring ambient heart motif for the whole site.
 *
 * Design intent: "little pieces of love are floating through the experience",
 * NOT a heart-rain or a Valentine effect. A small, deterministic set of solid
 * SVG hearts drifts slowly upward, fades in and out, drifts a few pixels
 * sideways and rotates a couple of degrees. Nothing is spawned at runtime and
 * there is no JavaScript loop — every heart is a fixed DOM node animated by a
 * single CSS keyframe (`shree-heart-float` in src/index.css).
 *
 * Layering & a11y: the container is `absolute inset-0`, `pointer-events-none`
 * and `aria-hidden`, and each section renders it *behind* its `relative z-10`
 * content, so hearts never sit over text, photos, buttons or dialogs and never
 * reach the accessibility tree.
 *
 * Responsiveness: sizes/opacities are intentionally small. Hearts beyond a
 * section's `mobile` count are `hidden sm:block`, and the CSS scales the whole
 * layer down on small screens (see the mobile block in src/index.css).
 *
 * The heart shape is an inline SVG path (not an emoji) so it renders
 * identically across browsers, and it takes its colour from the existing
 * Tailwind palette tokens via `currentColor`.
 */

// Lucide's heart path (already a project dependency's shape) rendered solid.
const HEART_PATH =
  'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5l7 7Z'

const COLOR_CLASS = {
  rose: 'text-rose',
  'rose-deep': 'text-rose-deep',
  blush: 'text-blush',
  champagne: 'text-champagne',
  lavender: 'text-lavender',
}

/*
 * One shared heart system, with a light personality per section.
 *   count   — hearts rendered on >= sm screens
 *   mobile  — how many of those stay visible on small screens
 *   min/max — tiny/small heart size in px (an occasional "big" heart adds ~8px)
 *   opacity — normal opacity band (occasional closer hearts reach ~0.35)
 *   colors  — subset of the palette, in priority order
 */
const VARIANTS = {
  hero: {
    count: 9,
    mobile: 5,
    min: 7,
    max: 13,
    opacity: [0.08, 0.16],
    colors: ['blush', 'lavender', 'champagne'],
  },
  birthday: {
    count: 10,
    mobile: 5,
    min: 8,
    max: 14,
    opacity: [0.1, 0.2],
    colors: ['rose', 'champagne', 'blush'],
  },
  story: {
    count: 7,
    mobile: 5,
    min: 6,
    max: 11,
    opacity: [0.07, 0.15],
    colors: ['blush', 'rose', 'lavender'],
  },
  memories: {
    count: 8,
    mobile: 4,
    min: 7,
    max: 12,
    opacity: [0.07, 0.14],
    colors: ['rose', 'lavender', 'blush'],
  },
  reasons: {
    count: 9,
    mobile: 5,
    min: 8,
    max: 13,
    opacity: [0.1, 0.2],
    colors: ['rose', 'blush', 'rose-deep'],
  },
  openwhen: {
    count: 8,
    mobile: 4,
    min: 8,
    max: 14,
    opacity: [0.09, 0.18],
    colors: ['champagne', 'blush', 'rose'],
  },
  quiz: {
    count: 9,
    mobile: 5,
    min: 8,
    max: 14,
    opacity: [0.1, 0.2],
    colors: ['rose', 'champagne', 'lavender', 'blush'],
  },
  secret: {
    count: 5,
    mobile: 3,
    min: 6,
    max: 11,
    opacity: [0.07, 0.14],
    colors: ['lavender', 'champagne'],
  },
  letter: {
    count: 6,
    mobile: 4,
    min: 7,
    max: 12,
    opacity: [0.06, 0.12],
    colors: ['blush', 'rose', 'lavender'],
  },
  finale: {
    count: 12,
    mobile: 6,
    min: 9,
    max: 18,
    opacity: [0.12, 0.24],
    colors: ['rose', 'rose-deep', 'blush', 'champagne', 'lavender'],
  },
}

/* --- Deterministic pseudo-randomness (no Math.random, no re-seeding) ------- */

function seedFrom(text) {
  let hash = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function pseudo(seed) {
  const value = Math.sin(seed) * 43758.5453123
  return value - Math.floor(value)
}

/** Build a fixed, reproducible heart layout for one variant. */
function buildHearts(key, cfg) {
  const base = seedFrom(key)
  const hearts = []

  for (let i = 0; i < cfg.count; i += 1) {
    const r1 = pseudo(base + i * 12.9898)
    const r2 = pseudo(base + i * 78.233 + 4.1)
    const r3 = pseudo(base + i * 37.719 + 9.7)
    const r4 = pseudo(base + i * 93.989 + 17.3)
    const r5 = pseudo(base + i * 5.31 + 31.7)

    // Every sixth heart is the occasional closer, brighter one.
    const big = i % 6 === 3
    const size = big
      ? cfg.min + r1 * (cfg.max - cfg.min) + 8
      : cfg.min + r1 * (cfg.max - cfg.min)
    const opacity = big
      ? 0.22 + r2 * 0.13 // 0.22 – 0.35
      : cfg.opacity[0] + r2 * (cfg.opacity[1] - cfg.opacity[0])

    const duration = 10 + r3 * 8 // 10 – 18s
    const delay = -r4 * duration // negative => already mid-flight, desynced

    hearts.push({
      id: i,
      size,
      opacity,
      duration,
      delay,
      left: 4 + r5 * 90, // 4% – 94%
      top: 6 + r4 * 84, // 6% – 90%
      drift: (r2 - 0.5) * 16, // ±8px
      rise: -(60 + r1 * 70), // -60px – -130px
      rotate: (r3 - 0.5) * 18, // ±9deg
      color: cfg.colors[Math.floor(r5 * cfg.colors.length) % cfg.colors.length],
      hideOnMobile: i >= cfg.mobile,
    })
  }

  return hearts
}

// Precompute every layout once at module load — nothing runs per render.
const HEART_SETS = Object.fromEntries(
  Object.entries(VARIANTS).map(([key, cfg]) => [key, buildHearts(key, cfg)]),
)

export default function FloatingHearts({ variant = 'hero', className }) {
  const hearts = HEART_SETS[variant] ?? HEART_SETS.hero

  return (
    <div
      aria-hidden="true"
      className={cn(
        'shree-hearts pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
            '--heart-opacity': heart.opacity,
            '--heart-duration': `${heart.duration}s`,
            '--heart-delay': `${heart.delay}s`,
            '--heart-drift': `${heart.drift}px`,
            '--heart-rise': `${heart.rise}px`,
            '--heart-rotate': `${heart.rotate}deg`,
          }}
          className={cn(
            'shree-heart absolute',
            COLOR_CLASS[heart.color] ?? 'text-rose',
            heart.hideOnMobile && 'hidden sm:block',
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-full w-full"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={HEART_PATH} />
          </svg>
        </span>
      ))}
    </div>
  )
}
