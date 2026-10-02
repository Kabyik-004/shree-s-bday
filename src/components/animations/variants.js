/*
 * Animation foundation for Shree's Little World.
 *
 * Philosophy: smooth, gentle, romantic, slightly slow — never aggressive.
 * These are reusable building blocks only. Section-specific animations are
 * intentionally NOT defined here.
 *
 * Usage:
 *   import { fadeUp, revealUp, staggerContainer, viewportOnce } from
 *     '../components/animations/variants'
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
 *               viewport={viewportOnce} />
 *
 * Reduced motion: wrap the app/section in <MotionConfig reducedMotion="user">
 * so Framer Motion honours the user's OS setting automatically.
 */

/* --- Shared timing / easing ---------------------------------------------- */

// Gentle "ease out" curve used across the site (mirrors --ease-gentle in CSS).
export const easeGentle = [0.22, 1, 0.36, 1]

/*
 * One consistent motion hierarchy for the whole story.
 * Every animation on the site should read down this ladder — nothing faster
 * than a micro-interaction, nothing slower than a cinematic beat.
 */
export const duration = {
  micro: 0.18, // hover, press, chevron, "selected" states
  ui: 0.3, // small UI transitions: accordion, feedback, tab switches
  reveal: 0.6, // content reveals: cards, list items, body copy
  display: 0.9, // emotional / display reveals: focal names, the letter
  cinematic: 1.4, // full-bleed section transitions
}

// Default transition for content reveals (cards, list items, paragraphs).
export const gentleTransition = {
  duration: duration.reveal,
  ease: easeGentle,
}

// Quick transition for interactive UI (accordion panels, feedback, steps).
export const uiTransition = {
  duration: duration.ui,
  ease: easeGentle,
}

// Slower, more emotional transition for focal / display moments.
export const displayTransition = {
  duration: duration.display,
  ease: easeGentle,
}

/* --- Reveal variants ------------------------------------------------------ */

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: gentleTransition },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: gentleTransition },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: gentleTransition },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: gentleTransition },
}

export const fadeRight = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: gentleTransition },
}

// Gentle scale-up.
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: gentleTransition },
}

// Blur-to-clear — dreamy entrance for hero / emotional headings.
// Blur is deliberately gentle (8px) so it reads as "coming into focus"
// rather than a heavy gaussian wash.
export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { ...displayTransition } },
}

/* --- Containers ----------------------------------------------------------- */

// Stagger children that each use a reveal variant above.
export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

/* --- Continuous / ambient motion ------------------------------------------ */

// Slow floating loop for decorative elements (parallax comes later).
export const float = {
  y: [0, -10, 0],
  transition: { duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
}

/* --- Shared viewport config for scroll reveals ---------------------------- */

// Triggers once, when ~30% of the element is visible.
export const viewportOnce = { once: true, amount: 0.3 }

// Ready-made props for a simple scroll reveal.
export const revealUp = {
  variants: fadeUp,
  initial: 'hidden',
  whileInView: 'visible',
  viewport: viewportOnce,
}
