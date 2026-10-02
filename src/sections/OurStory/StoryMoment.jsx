import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import {
  fadeIn,
  fadeUp,
  scaleIn,
  staggerContainer,
} from '../../components/animations/variants'
import { cn } from '../../lib/cn'

/*
 * StoryMoment — one page of the scrapbook.
 *
 * Layout alternates its emphasis side on large screens (text left / text right)
 * and collapses to a single readable column on mobile. Nothing is placed with
 * fixed pixel coordinates, so it reflows cleanly at every width.
 *
 * Reveal order: number + progress → eyebrow → title → text → frame.
 * Triggers once when the moment scrolls into view.
 */

// Accent lookup — full class strings so Tailwind can see them statically.
const ACCENTS = {
  rose: {
    text: 'text-rose',
    rule: 'via-rose/60',
    glow: 'bg-[radial-gradient(circle_at_center,rgba(217,139,163,0.18),transparent_70%)]',
  },
  champagne: {
    text: 'text-champagne',
    rule: 'via-champagne/60',
    glow: 'bg-[radial-gradient(circle_at_center,rgba(227,203,160,0.16),transparent_70%)]',
  },
  lavender: {
    text: 'text-lavender',
    rule: 'via-lavender/60',
    glow: 'bg-[radial-gradient(circle_at_center,rgba(198,182,230,0.18),transparent_70%)]',
  },
}

// Two-digit label, e.g. "01 / 06".
const pad = (n) => String(n).padStart(2, '0')

/**
 * Story frame — shows the real photo when one is provided, otherwise the
 * elegant "a memory lives here" placeholder. Layout, mat, glow and rule are
 * unchanged; only the inner content swaps. A real photo carries its own alt
 * text; the placeholder stays hidden from assistive tech.
 */
function StoryFrame({ frame, accentText, rule, photo, alt }) {
  const hasPhoto = Boolean(photo)

  return (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
      {/* Soft halo behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2rem] bg-white/[0.02] blur-2xl"
      />

      <div
        className={cn(
          'relative aspect-[4/5] overflow-hidden rounded-card border border-white/12',
          'shadow-glass',
          !hasPhoto && cn('bg-gradient-to-br', frame),
        )}
      >
        {hasPhoto ? (
          <img
            src={photo}
            alt={alt || ''}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            {/* Polaroid-style inner mat */}
            <div
              aria-hidden="true"
              className="absolute inset-3 rounded-[1.4rem] border border-dashed border-white/20"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
            >
              <ImageIcon
                size={30}
                strokeWidth={1.25}
                className={cn('opacity-70', accentText)}
              />
              <span className="text-[0.62rem] uppercase tracking-[0.24em] text-muted/70 sm:tracking-[0.35em]">
                a memory lives here
              </span>
            </div>
          </>
        )}
      </div>

      {/* Fine accent rule beneath the frame */}
      <span
        aria-hidden="true"
        className={cn(
          'mx-auto mt-4 block h-px w-24 bg-gradient-to-r from-transparent to-transparent',
          rule,
        )}
      />
    </div>
  )
}

export default function StoryMoment({ moment, index, total }) {
  const accent = ACCENTS[moment.accent] ?? ACCENTS.rose
  const isRight = moment.align === 'right'
  const hasFrame = moment.frame !== null

  return (
    <motion.li
      variants={staggerContainer(0.16, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex min-h-[80vh] items-center"
    >
      {/* Per-moment emphasis glow — creates the changing atmosphere */}
      {hasFrame && (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-1/2 h-[26rem] w-[26rem] max-w-[110vw] -translate-y-1/2 rounded-full blur-3xl',
            isRight ? 'right-[-8%]' : 'left-[-8%]',
            accent.glow,
          )}
        />
      )}

      <div className="relative grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Text column */}
        <div
          className={cn(
            'flex flex-col items-start gap-3',
            isRight && 'lg:order-2',
          )}
        >
          <motion.p
            variants={fadeIn}
            className="flex items-baseline gap-2 text-champagne/85"
          >
            <span className="font-display text-3xl font-medium sm:text-4xl">
              {pad(index)}
            </span>
            <span className="text-xs tracking-[0.3em] text-muted/60">
              / {pad(total)}
            </span>
          </motion.p>

          <motion.p
            variants={fadeIn}
            className={cn(
              'text-[0.7rem] font-medium uppercase tracking-[0.22em] sm:tracking-[0.38em]',
              accent.text,
            )}
          >
            {moment.eyebrow}
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="font-display text-[clamp(1.85rem,5vw,3.15rem)] font-medium leading-tight text-ivory"
          >
            {moment.title}
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="max-w-md text-base leading-relaxed text-body"
          >
            {moment.text}
          </motion.p>
        </div>

        {/* Visual placeholder column */}
        <motion.div
          variants={scaleIn}
          className={cn(hasFrame ? '' : 'hidden lg:block', isRight && 'lg:order-1')}
        >
          {hasFrame && (
            <StoryFrame
              frame={moment.frame}
              accentText={accent.text}
              rule={accent.rule}
              photo={moment.photo}
              alt={moment.photoAlt}
            />
          )}
        </motion.div>
      </div>
    </motion.li>
  )
}
