import { useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Button } from '../../components/ui'
import {
  fadeIn,
  fadeUp,
  gentleTransition,
  staggerContainer,
  viewportOnce,
} from '../../components/animations/variants'
import { secretMessage } from '../../data/messages'
import FloatingHearts from '../../components/common/FloatingHearts'
import SecretBackground from './SecretBackground'
import SecretReveal from './SecretReveal'

/*
 * Secret — something Shree discovers rather than a normal section.
 *
 * Stages: idle → confirm → reveal (overlay dialog).
 * Closing the reveal returns to idle and restores focus to the trigger, so the
 * site is never permanently locked. All secret content comes from
 * src/data/messages.js (`secretMessage`).
 */
export default function Secret() {
  const [stage, setStage] = useState('idle') // idle | confirm | reveal
  const triggerRef = useRef(null)

  const handleClose = () => {
    setStage('idle')
    // Return focus to the button that opened the secret.
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="secret"
        aria-label="The Secret"
        className="relative isolate overflow-hidden px-6 py-24 sm:py-32"
      >
        <SecretBackground />
        <FloatingHearts variant="secret" />

        <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
          <motion.header
            variants={staggerContainer(0.2, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              variants={fadeIn}
              className="flex items-center justify-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-champagne/80 sm:text-xs sm:tracking-[0.42em]"
            >
              <Sparkles size={14} aria-hidden="true" />
              Psst... Shree
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-display text-[clamp(2rem,6vw,3.5rem)] font-medium leading-tight text-ivory"
            >
              I think you found something.
            </motion.h2>
          </motion.header>

          <AnimatePresence mode="wait">
            {stage === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={gentleTransition}
                className="mt-6 flex flex-col items-center gap-6"
              >
                <p className="max-w-md font-display text-lg italic leading-relaxed text-ivory/80 sm:text-xl">
                  But I&apos;m not sure you&apos;re ready to open it yet.
                </p>
                <Button
                  ref={triggerRef}
                  size="lg"
                  onClick={() => setStage('confirm')}
                >
                  Open the secret
                </Button>
              </motion.div>
            )}

            {stage === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={gentleTransition}
                className="mt-6 flex flex-col items-center gap-6"
              >
                <p className="font-display text-xl italic text-champagne/90 sm:text-2xl">
                  Wait&hellip;
                </p>
                <p className="max-w-md text-base leading-relaxed text-body">
                  You really want to see what&apos;s hidden here?
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button size="lg" onClick={() => setStage('reveal')}>
                    Yes, show me ❤️
                  </Button>
                  <Button variant="ghost" onClick={() => setStage('idle')}>
                    Maybe later
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Opened secret */}
        <AnimatePresence>
          {stage === 'reveal' && (
            <SecretReveal config={secretMessage} onClose={handleClose} />
          )}
        </AnimatePresence>
      </section>
    </MotionConfig>
  )
}
