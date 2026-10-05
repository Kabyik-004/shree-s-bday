import { useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from '../../components/animations/variants'
import { reasons } from '../../data/messages'
import FloatingHearts from '../../components/common/FloatingHearts'
import JourneyCue from '../../components/common/JourneyCue'
import ReasonsBackground from './ReasonsBackground'
import ReasonCard from './ReasonCard'

/*
 * Reasons — "Things I Don't Say Enough".
 *
 * A warm, intimate wall of little cards. Each is a keyboard-accessible
 * disclosure that reveals its (currently short, always genuine) message.
 * Only one card is open at a time, which keeps the section calm and readable.
 *
 * All content comes from src/data/messages.js — no invented personal facts.
 */
export default function Reasons() {
  // Single-open accordion: cleaner UX than many cards expanded at once.
  const [openId, setOpenId] = useState(null)

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="reasons"
        aria-label="Things I Don't Say Enough"
        className="relative isolate overflow-hidden px-6 py-20 sm:py-28"
      >
        <ReasonsBackground />
        {/* Hearts live in a fixed-height, top-anchored layer too, so opening a
            card never makes the heart field shift or redistribute. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[100rem] overflow-hidden">
          <FloatingHearts variant="reasons" />
        </div>

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
              A few quiet truths
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-medium leading-tight text-ivory"
            >
              Things I Don&apos;t Say Enough
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body"
            >
              There are probably a thousand little things I could tell you&hellip;
            </motion.p>
          </motion.header>

          {/* Cards */}
          <ul className="mt-12 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <ReasonCard
                key={reason.id}
                reason={reason}
                index={index}
                isOpen={openId === reason.id}
                onToggle={handleToggle}
              />
            ))}
          </ul>

          {/* Transition line */}
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
              className="h-px w-16 bg-gradient-to-r from-transparent via-rose/50 to-transparent"
            />
            <motion.p
              variants={fadeUp}
              className="max-w-2xl font-display text-xl italic text-ivory/85 sm:text-2xl"
            >
              And if I tried to write everything down, we&rsquo;d probably be
              here all night.
            </motion.p>
          </motion.div>

          <JourneyCue label="one more thing" className="mt-10 sm:mt-12" />
        </div>
      </section>
    </MotionConfig>
  )
}
