import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { easeGentle } from '../../components/animations/variants'
import { cn } from '../../lib/cn'

/*
 * OpenWhenModal — the opened envelope.
 *
 * Accessible dialog following the same pattern as MemoryLightbox:
 * role="dialog" + aria-modal, labelled close button, Escape to close,
 * click-outside to close, body scroll lock and a simple focus trap.
 * Focus is moved into the dialog on open and restored by the parent.
 *
 * When the real `message` is empty, a tasteful placeholder is shown instead.
 * It disappears automatically once the user writes the letter.
 */
export default function OpenWhenModal({ item, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!item) return undefined

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
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="open-when-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: easeGentle }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Dim backdrop — click to close */}
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-night/85 backdrop-blur-md"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="open-when-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.4, ease: easeGentle }}
            className={cn(
              'relative z-10 w-full max-w-lg overflow-hidden rounded-card',
              'bg-gradient-to-br from-ivory via-blush/60 to-blush/40 shadow-glass-hover',
              item.special ? 'border-2 border-champagne/70' : 'border border-white/50',
            )}
          >
            {/* Letter body */}
            <div className="relative max-h-[80vh] overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close message"
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-wine/90 text-ivory transition-colors duration-300 hover:bg-wine focus-visible:ring-2 focus-visible:ring-champagne/80"
              >
                <X size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>

              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-wine/60">
                Open when&hellip;
              </p>

              <h3
                id="open-when-title"
                className="mt-3 pr-8 font-display text-2xl font-medium leading-snug text-wine sm:text-3xl"
              >
                {item.title}
              </h3>

              <span
                aria-hidden="true"
                className={cn(
                  'my-5 block h-px w-16',
                  item.special
                    ? 'bg-gradient-to-r from-champagne to-transparent'
                    : 'bg-gradient-to-r from-rose to-transparent',
                )}
              />

              {item.message ? (
                <p className="whitespace-pre-line text-base leading-relaxed text-wine/90">
                  {item.message}
                </p>
              ) : (
                <p className="font-display text-lg italic leading-relaxed text-wine/55">
                  Your message for this moment will live here.
                </p>
              )}

              <span
                aria-hidden="true"
                className="mt-8 block h-px w-full bg-wine/10"
              />
              <p className="mt-4 text-center text-rose" aria-hidden="true">
                <Heart size={16} className="mx-auto" fill="currentColor" />
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
