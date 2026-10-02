import { MotionConfig, motion } from 'framer-motion'
import { fadeIn } from '../../components/animations/variants'
import { letter } from '../../data/messages'
import FloatingHearts from '../../components/common/FloatingHearts'
import LetterBackground from './LetterBackground'
import LetterPaper from './LetterPaper'

/*
 * Letter — a quiet, intimate letter placed inside the page.
 *
 * Unlike the previous sections this is not interactive: the page simply scrolls
 * through it. The paper fades/slides in once, as a whole — no per-word or
 * typewriter effect, so the letter reads naturally (and is fully legible with
 * animations disabled).
 *
 * All content lives in src/data/messages.js (`letter`).
 */
export default function Letter() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="letter"
        aria-label="A Letter For You"
        className="relative isolate overflow-hidden px-6 py-24 sm:py-32"
      >
        <LetterBackground />
        <FloatingHearts variant="letter" />

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <LetterPaper letter={letter} />
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}
