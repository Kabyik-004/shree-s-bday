import { motion } from 'framer-motion'
import { GlassCard } from '../../components/ui'
import { gentleTransition } from '../../components/animations/variants'
import MemoryMedia from './MemoryMedia'

/*
 * MemoryCard — a polaroid-inspired scrapbook card.
 *
 * The whole card is a real <button>, so it is keyboard-focusable and opens the
 * lightbox with Enter/Space. Rotation is deterministic (from the data) and is
 * applied with a CSS variable so the card can gently straighten on hover/focus.
 *
 * Reveal: fades/slides in once when scrolled into view, with a small capped
 * delay so only the first few cards stagger — cheap even with ~50 photos.
 */
export default function MemoryCard({ memory, index, onOpen }) {
  const rotation = memory?.rotation ?? 0
  const label = memory.caption
    ? `Open memory: ${memory.caption}`
    : `Open memory ${memory.id} (${memory.category})`

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ ...gentleTransition, delay: Math.min(index, 7) * 0.06 }}
      className="group [perspective:1000px]"
    >
      <div
        style={{ '--rot': `${rotation}deg` }}
        className="rotate-[var(--rot)] transition-transform duration-500 ease-gentle group-hover:rotate-0 group-focus-within:rotate-0"
      >
        <GlassCard
          as="button"
          type="button"
          onClick={() => onOpen(memory)}
          aria-label={label}
          className="block w-full cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
        >
          {/* Photo / placeholder — aspect box avoids layout shift */}
          <div className="relative aspect-[4/5] w-full">
            <MemoryMedia memory={memory} />
          </div>

          {/* Polaroid-style caption band */}
          <div className="border-t border-white/10 px-4 py-3">
            <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-champagne/80">
              {memory.category}
            </span>
            {memory.caption && (
              <p className="mt-1 font-display text-sm italic text-ivory/85">
                {memory.caption}
              </p>
            )}
          </div>
        </GlassCard>
      </div>
    </motion.li>
  )
}
