import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button } from '../../components/ui'
import { easeGentle } from '../../components/animations/variants'

/*
 * QuizResult — playful score screen.
 *
 * The score is text ("7 / 8") so it never depends on colour or animation.
 * The message is chosen from the quizResults config by score ratio.
 */
export default function QuizResult({ score, total, message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.8, ease: easeGentle }}
      className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 text-center"
    >
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-rose"
      >
        <Heart size={30} fill="currentColor" />
      </motion.span>

      <h3 className="font-display text-[clamp(1.6rem,5vw,2.6rem)] font-medium leading-tight text-ivory">
        Quiz complete ❤️
      </h3>

      <p className="font-display text-4xl text-champagne sm:text-5xl">
        {score} <span className="text-muted/70">/ {total}</span>
      </p>

      <p className="max-w-md font-display text-lg italic leading-relaxed text-ivory/90 sm:text-xl">
        {message}
      </p>

      <Button size="lg" onClick={onRetry} className="mt-2">
        Play Again
      </Button>
    </motion.div>
  )
}
