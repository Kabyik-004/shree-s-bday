import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { GlassCard } from '../../components/ui'
import { easeGentle } from '../../components/animations/variants'
import MemoryMedia from './MemoryMedia'

/*
 * MemoryLightbox — full-screen memory viewer.
 *
 * Accessibility: role="dialog" + aria-modal, a labelled close button, Escape
 * to close, click-outside to close, body scroll lock and a simple focus trap.
 * Focus moves to the close button on open and is restored to the card that
 * opened it (handled by the parent).
 *
 * Motion is inherited from the section's <MotionConfig reducedMotion="user">.
 */
export default function MemoryLightbox({ memory, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!memory) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      // Keep focus inside the dialog.
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
  }, [memory, onClose])

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          key="lightbox"
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
            aria-label={
              memory.caption ? `Memory: ${memory.caption}` : `Memory ${memory.id}`
            }
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.4, ease: easeGentle }}
            className="relative z-10 w-full max-w-2xl"
          >
            <GlassCard hover={false} className="overflow-hidden">
              <div className="relative aspect-[4/5] w-full sm:aspect-[4/3]">
                <MemoryMedia memory={memory} iconSize={42} />

                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close memory"
                  className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-night/70 text-ivory backdrop-blur-sm transition-colors duration-300 hover:bg-night focus-visible:ring-2 focus-visible:ring-champagne/80"
                >
                  <X size={18} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>

              {/* Caption + category */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne/85">
                  {memory.category}
                </span>
                {memory.caption && (
                  <p className="font-display text-base italic text-ivory/90">
                    {memory.caption}
                  </p>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
