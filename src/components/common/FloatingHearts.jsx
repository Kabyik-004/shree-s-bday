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
 *   opacity — low base opacity band (large accent hearts reach ~0.35)
 *   colors  — subset of the palette, in priority order
 *
 * Size is no longer one flat range: every section draws from three tiers
 * (small 7–11px / medium 12–18px / large 19–26px) so each field reads as a
 * natural mix — many small hearts, some medium, and a few larger accents.
 */
const VARIANTS = {
  hero: {
    count: 9,
    mobile: 6,
    opacity: [0.08, 0.16],
    colors: ['blush', 'lavender', 'champagne'],
  },
  birthday: {
    count: 11,
    mobile: 7,
    opacity: [0.1, 0.2],
    colors: ['rose', 'champagne', 'blush'],
  },
  story: {
    count: 13,
    mobile: 8,
    opacity: [0.07, 0.15],
    colors: ['blush', 'rose', 'lavender'],
  },
  memories: {
    count: 14,
    mobile: 9,
    opacity: [0.07, 0.14],
    colors: ['rose', 'lavender', 'blush'],
  },
  reasons: {
    count: 14,
    mobile: 9,
    opacity: [0.1, 0.2],
    colors: ['rose', 'blush', 'rose-deep'],
  },
  openwhen: {
    count: 14,
    mobile: 9,
    opacity: [0.09, 0.18],
    colors: ['champagne', 'blush', 'rose'],
  },
  quiz: {
    count: 12,
    mobile: 7,
    opacity: [0.1, 0.2],
    colors: ['rose', 'champagne', 'lavender', 'blush'],
  },
  secret: {
    count: 12,
    mobile: 7,
    opacity: [0.07, 0.14],
    colors: ['lavender', 'champagne'],
  },
  letter: {
    count: 13,
    mobile: 8,
    opacity: [0.06, 0.12],
    colors: ['blush', 'rose', 'lavender'],
  },
  cake: {
    count: 13,
    mobile: 8,
    opacity: [0.09, 0.18],
    colors: ['rose', 'blush', 'champagne', 'lavender'],
  },
  fireworks: {
    count: 11,
    mobile: 6,
    opacity: [0.07, 0.15],
    colors: ['champagne', 'lavender', 'rose', 'blush'],
  },
  finale: {
    count: 18,
    mobile: 10,
    opacity: [0.12, 0.24],
    colors: ['rose', 'rose-deep', 'blush', 'champagne', 'lavender'],
  },
}

/* Heart size tiers (px) — a natural size distribution, not a single range. */
const SIZE = {
  small: [7, 11],
  medium: [12, 18],
  large: [19, 26],
}

/*
 * Deterministic, balanced tier assignment that scales with the count: roughly
 * one large accent every 7 hearts and one medium every 3, everything else
 * small. Large is checked first so a heart is never both.
 */
function tierFor(index) {
  if (index % 7 === 2) return 'large'
  if (index % 3 === 0) return 'medium'
  return 'small'
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
    // Motion draws — mapping left unchanged so the animation feels identical.
    const r1 = pseudo(base + i * 12.9898) // rise
    const r2 = pseudo(base + i * 78.233 + 4.1) // drift + opacity
    const r3 = pseudo(base + i * 37.719 + 9.7) // rotate + duration
    const r4 = pseudo(base + i * 93.989 + 17.3) // delay
    const r5 = pseudo(base + i * 5.31 + 31.7) // color
    // Independent draws for spread + size (keeps colour/motion decorrelated).
    const r6 = pseudo(base + i * 24.199 + 51.3) // left
    const r7 = pseudo(base + i * 61.417 + 12.9) // top
    const r8 = pseudo(base + i * 47.531 + 6.7) // size within tier

    const tier = tierFor(i)
    const [sizeMin, sizeMax] = SIZE[tier]
    const size = sizeMin + r8 * (sizeMax - sizeMin)

    // Opacity behaviour unchanged: low band for most, brighter for the
    // occasional closer (large) accent heart.
    const opacity =
      tier === 'large'
        ? 0.22 + r2 * 0.13 // 0.22 – 0.35
        : cfg.opacity[0] + r2 * (cfg.opacity[1] - cfg.opacity[0])

    const duration = 10 + r3 * 8 // 10 – 18s (unchanged)
    const delay = -r4 * duration // negative => already mid-flight (unchanged)

    hearts.push({
      id: i,
      size,
      opacity,
      duration,
      delay,
      left: 3 + r6 * 94, // 3% – 97%
      top: 4 + r7 * 88, // 4% – 92%
      drift: (r2 - 0.5) * 16, // ±8px (unchanged)
      rise: -(60 + r1 * 70), // -60px – -130px (unchanged)
      rotate: (r3 - 0.5) * 18, // ±9deg (unchanged)
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
