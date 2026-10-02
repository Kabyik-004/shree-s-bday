import { useRef, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from '../../components/animations/variants'
import { openWhenMessages } from '../../data/messages'
import FloatingHearts from '../../components/common/FloatingHearts'
import OpenWhenBackground from './OpenWhenBackground'
import OpenWhenCard from './OpenWhenCard'
import OpenWhenModal from './OpenWhenModal'

/*
 * OpenWhen — a collection of envelopes for the moments Shree might need one.
 *
 * All content lives in src/data/messages.js (`openWhenMessages`), so the real
 * letters can be written later without touching this JSX.
 *
 * Clicking an envelope opens an accessible dialog; focus returns to the
 * originating envelope on close.
 */
export default function OpenWhen() {
  const [activeItem, setActiveItem] = useState(null)
  const lastFocused = useRef(null)

  const handleOpen = (item) => {
    lastFocused.current = document.activeElement
    setActiveItem(item)
  }

  const handleClose = () => {
    setActiveItem(null)
    lastFocused.current?.focus?.()
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="open-when"
        aria-label="Open When"
        className="relative isolate overflow-hidden px-6 py-20 sm:py-28"
      >
        <OpenWhenBackground />
        <FloatingHearts variant="openwhen" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
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
              A letter for every mood
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-medium leading-tight text-ivory"
            >
              Open When&hellip;
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body"
            >
              For all the little moments when you need a piece of me.
            </motion.p>
          </motion.header>

          {/* Envelopes */}
          <ul className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {openWhenMessages.map((item, index) => (
              <OpenWhenCard
                key={item.id}
                item={item}
                index={index}
                onOpen={handleOpen}
              />
            ))}
          </ul>
        </div>

        {/* Opened envelope */}
        <OpenWhenModal item={activeItem} onClose={handleClose} />
      </section>
    </MotionConfig>
  )
}
