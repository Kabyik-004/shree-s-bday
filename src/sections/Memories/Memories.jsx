import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Button } from '../../components/ui'
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from '../../components/animations/variants'
import { memories, memoryCategories } from '../../data/memories'
import FloatingHearts from '../../components/common/FloatingHearts'
import MemoryBackground from './MemoryBackground'
import MemoryCard from './MemoryCard'
import MemoryLightbox from './MemoryLightbox'

/*
 * Memories — "A Few Pieces of Us", a romantic scrapbook.
 *
 * Data-driven: everything comes from src/data/memories.js, so real photos can
 * be dropped into public/images/gallery later without touching this JSX.
 * Filtering is plain React state (no library). The grid is responsive
 * (1 → 2 → 3 → 4 columns) which stays cheap as the list grows to ~50 items.
 */
export default function Memories() {
  const [category, setCategory] = useState('All')
  const [activeMemory, setActiveMemory] = useState(null)
  const lastFocused = useRef(null)

  const filtered = useMemo(
    () =>
      category === 'All'
        ? memories
        : memories.filter((memory) => memory.category === category),
    [category],
  )

  const handleOpen = (memory) => {
    lastFocused.current = document.activeElement
    setActiveMemory(memory)
  }

  const handleClose = () => {
    setActiveMemory(null)
    // Return focus to the card that opened the lightbox.
    lastFocused.current?.focus?.()
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="memories"
        aria-label="A Few Pieces of Us"
        className="relative isolate overflow-hidden px-6 py-20 sm:py-28"
      >
        <MemoryBackground />
        <FloatingHearts variant="memories" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Intro */}
          <motion.header
            variants={staggerContainer(0.2, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.p
              variants={fadeIn}
              className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-champagne/80 sm:text-xs sm:tracking-[0.42em]"
            >
              The Scrapbook
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-medium leading-tight text-ivory"
            >
              A Few Pieces of Us
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body"
            >
              Some moments are ordinary when they happen, and precious when you
              look back.
            </motion.p>
          </motion.header>

          {/* Category filters */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            role="group"
            aria-label="Filter memories by category"
            className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {memoryCategories.map((item) => {
              const isActive = item === category
              return (
                <Button
                  key={item}
                  type="button"
                  size="sm"
                  variant={isActive ? 'primary' : 'ghost'}
                  aria-pressed={isActive}
                  onClick={() => setCategory(item)}
                  className="min-h-11 sm:min-h-0"
                >
                  {item}
                </Button>
              )
            })}
          </motion.div>

          {/* Scrapbook grid */}
          <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                  onOpen={handleOpen}
                />
              ))}
            </AnimatePresence>
          </ul>

          {/* Closing line */}
          <motion.div
            variants={staggerContainer(0.18, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-20 flex flex-col items-center gap-3 text-center sm:mt-28"
          >
            <motion.span
              aria-hidden="true"
              variants={fadeIn}
              className="h-px w-16 bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
            />
            <motion.p
              variants={fadeUp}
              className="max-w-2xl font-display text-xl italic text-ivory/85 sm:text-2xl"
            >
              And somehow, every little moment became part of our story.
            </motion.p>
          </motion.div>
        </div>

        {/* Full-screen viewer */}
        <MemoryLightbox memory={activeMemory} onClose={handleClose} />
      </section>
    </MotionConfig>
  )
}
