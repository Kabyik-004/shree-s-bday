import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button } from '../../components/ui'
import { easeGentle } from '../../components/animations/variants'
import { cn } from '../../lib/cn'

/*
 * SecretReveal — the opened secret, presented as an accessible overlay dialog.
 *
 * Reveal sequence: dim backdrop → the sealed envelope appears → the wax-seal
 * heart opens → the content fades in. Gentle and intimate; no fireworks.
 * With "reduce motion" on, the seal step is skipped and the content appears
 * immediately.
 *
 * Accessibility mirrors MemoryLightbox / OpenWhenModal: role="dialog",
 * aria-modal, labelled close button, Escape to close, click-outside to close,
 * body scroll lock and a simple focus trap. The parent restores focus.
 */
const SEAL_DELAY = 900 // ms

export default function SecretReveal({ config, onClose }) {
  const [opened, setOpened] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  // Progress from "sealed" to "opened".
  useEffect(() => {
    const delay = shouldReduceMotion ? 0 : SEAL_DELAY
    const timer = setTimeout(() => setOpened(true), delay)
    return () => clearTimeout(timer)
  }, [shouldReduceMotion])

  // Dialog behaviours: Escape, focus trap, scroll lock, initial focus.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const items = Array.from(focusable).filter((el) => !el.disabled)
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  if (typeof document === 'undefined') return null

  /*
   * The overlay is portaled to <body> on purpose.
   *
   * The host section (#secret) uses `isolate`, which creates a stacking
   * context. A fixed overlay inside it can only stack *within* that context, so
   * later sibling sections (Letter, Finale) — which also create stacking
   * contexts — would paint on top of the dialog. Rendering into <body> lifts
   * the dialog into the root stacking context, above every section, while the
   * React context (MotionConfig / AnimatePresence) still flows through the
   * portal unchanged.
   */
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: easeGentle }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Dim backdrop — click to close */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-night/90 backdrop-blur-md"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="secret-title"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeGentle }}
        className={cn(
          'relative z-10 w-full max-w-lg overflow-hidden rounded-card',
          'border border-champagne/30 bg-gradient-to-br from-wine/95 via-plum/95 to-night/95 shadow-glass-hover',
        )}
      >
        {/* Hairline top highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
        />

        <div className="relative max-h-[82vh] overflow-y-auto px-6 py-9 sm:px-10 sm:py-12">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close the secret"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-night/60 text-ivory transition-colors duration-300 hover:bg-night focus-visible:ring-2 focus-visible:ring-champagne/80"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Sealed envelope → opened content */}
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="seal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.06 }}
                transition={{ duration: 0.5, ease: easeGentle }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-night shadow-glow-rose"
                >
                  <Heart size={26} fill="currentColor" />
                </span>
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-champagne/80">
                  opening
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeGentle }}
                className="text-center"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.24em] text-champagne/85 sm:tracking-[0.42em]">
                  {config.eyebrow}
                </p>

                <h3
                  id="secret-title"
                  className="mt-3 font-display text-[clamp(1.6rem,5vw,2.4rem)] font-medium leading-tight text-ivory"
                >
                  {config.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="mx-auto my-5 block h-px w-16 bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
                />

                {/* Lifetime Mine Pass — the main content of the reveal.
                    `object-contain` + natural height keep it uncropped and
                    unstretched at its original 16:9 aspect ratio. */}
                {config.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.7, ease: easeGentle }}
                    className="relative mx-auto w-full overflow-hidden rounded-2xl border border-champagne/30 bg-night/40 shadow-[0_20px_55px_-20px_rgba(227,203,160,0.5)]"
                  >
                    <img
                      src={config.image}
                      alt={config.imageAlt || ''}
                      className="block h-auto w-full object-contain"
                      decoding="async"
                    />
                  </motion.div>
                )}

                {config.message ? (
                  <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-ivory/90">
                    {config.message}
                  </p>
                ) : !config.image ? (
                  <p className="font-display text-lg italic leading-relaxed text-ivory/60">
                    The secret is waiting for your words.
                  </p>
                ) : null}

                {config.closing && (
                  <p className="mt-5 font-display text-base italic text-ivory/80">
                    {config.closing}
                  </p>
                )}

                <span
                  aria-hidden="true"
                  className="mx-auto mt-7 block h-px w-full bg-white/10"
                />
                <p className="mt-4 text-rose" aria-hidden="true">
                  <Heart size={15} className="mx-auto" fill="currentColor" />
                </p>

                <div className="mt-6 flex justify-center">
                  <Button variant="secondary" onClick={onClose}>
                    Keep this little secret ❤️
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
