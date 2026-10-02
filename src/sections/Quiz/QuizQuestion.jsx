import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { GlassCard } from '../../components/ui'
import { easeGentle } from '../../components/animations/variants'
import { cn } from '../../lib/cn'

/*
 * QuizQuestion — one question at a time.
 *
 * Answer options are real <button>s (keyboard operable). Correctness is never
 * communicated by colour alone: the revealed correct option shows a check
 * icon, the chosen wrong option shows an X, and the feedback text is announced
 * via an aria-live region.
 *
 * The card fades/slides in and out between questions via AnimatePresence.
 */

const pad = (n) => String(n).padStart(2, '0')

export default function QuizQuestion({
  question,
  index,
  total,
  selected,
  isLocked,
  onSelect,
  feedback,
}) {
  const correctIndex = question.answer
  const progress = ((index + 1) / total) * 100

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.4, ease: easeGentle }}
      className="w-full"
    >
      <GlassCard hover={false} padded className="mx-auto w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-2xl font-medium text-champagne sm:text-3xl">
            {pad(index + 1)}
            <span className="ml-1 text-sm text-muted/70">/ {pad(total)}</span>
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted/70">
            How well do you know us?
          </span>
        </div>

        <div
          className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          aria-label={`Question ${index + 1} of ${total}`}
        >
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: easeGentle }}
            className="h-full rounded-full bg-gradient-to-r from-rose to-champagne"
          />
        </div>

        {/* Question */}
        <h3 className="mt-6 font-display text-xl font-medium leading-snug text-ivory sm:text-2xl">
          {question.question}
        </h3>

        {/* Options */}
        <ul className="mt-5 flex flex-col gap-3">
          {question.options.map((option, i) => {
            const isChosen = selected === i
            const isCorrect = isLocked && i === correctIndex
            const isWrong = isLocked && isChosen && i !== correctIndex

            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-disabled={isLocked}
                  aria-pressed={isChosen}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left',
                    'font-sans text-base text-ivory transition-all duration-300 ease-gentle',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-night',
                    !isLocked && 'border-white/12 bg-white/[0.04] hover:border-rose/40 hover:bg-white/[0.08]',
                    isCorrect && 'border-champagne/70 bg-champagne/15',
                    isWrong && 'border-rose-deep/70 bg-rose-deep/15',
                    isLocked && !isCorrect && !isWrong && 'border-white/8 bg-white/[0.02] opacity-60',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs uppercase text-champagne"
                  >
                    {String.fromCharCode(65 + i)}
                  </span>

                  <span className="min-w-0 flex-1">{option}</span>

                  {isCorrect && (
                    <Check
                      size={18}
                      strokeWidth={2}
                      className="shrink-0 text-champagne"
                      aria-hidden="true"
                    />
                  )}
                  {isWrong && (
                    <X
                      size={18}
                      strokeWidth={2}
                      className="shrink-0 text-rose"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Feedback — readable without animation, announced politely */}
        <div className="mt-4 min-h-[1.5rem]" aria-live="polite">
          {feedback && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeGentle }}
              className={cn(
                'font-display text-base italic sm:text-lg',
                feedback.type === 'correct' ? 'text-champagne' : 'text-rose',
              )}
            >
              {feedback.text}
            </motion.p>
          )}
        </div>
      </GlassCard>
    </motion.div>
  )
}
