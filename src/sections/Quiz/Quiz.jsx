import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Button } from '../../components/ui'
import {
  fadeIn,
  fadeUp,
  gentleTransition,
  staggerContainer,
  viewportOnce,
} from '../../components/animations/variants'
import {
  quiz,
  quizFeedback,
  quizIntro,
  quizResults,
} from '../../data/quiz'
import FloatingHearts from '../../components/common/FloatingHearts'
import QuizBackground from './QuizBackground'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'

/*
 * Quiz — "How well do you know us?"
 *
 * A small state machine: intro → playing → result.
 * One question at a time, gentle feedback, then an automatic advance.
 * All copy comes from src/data/quiz.js — nothing is hard-coded per question.
 *
 * A single-open guard (ref) prevents double-answering before React re-renders.
 * The advance timer is cleared on unmount.
 */

const ANSWER_DELAY = 1100 // ms to read the feedback before moving on

export default function Quiz() {
  const [status, setStatus] = useState('intro') // intro | playing | result
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isLocked, setIsLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const lockRef = useRef(false)
  const timerRef = useRef(null)
  const indexRef = useRef(0)
  const total = quiz.length

  useEffect(() => () => clearTimeout(timerRef.current), [])

  // Unlock answering only once a new question (or the result) has actually been
  // presented. Keeping the lock through the timed transition means a stray extra
  // activation can never double-advance past the last question.
  useEffect(() => {
    lockRef.current = false
  }, [index, status])

  const handleStart = () => {
    clearTimeout(timerRef.current)
    indexRef.current = 0
    setStatus('playing')
    setIndex(0)
    setSelected(null)
    setIsLocked(false)
    setScore(0)
    setFeedback(null)
    lockRef.current = false
  }

  const handleSelect = (optionIndex) => {
    if (lockRef.current) return
    const question = quiz[indexRef.current]
    if (!question) return
    lockRef.current = true

    const isCorrect = optionIndex === question.answer

    setSelected(optionIndex)
    setIsLocked(true)
    if (isCorrect) setScore((value) => value + 1)

    setFeedback({
      type: isCorrect ? 'correct' : 'wrong',
      text: isCorrect
        ? question.correctMessage || quizFeedback.correct
        : question.wrongMessage || quizFeedback.wrong,
    })

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const next = indexRef.current + 1
      if (next >= total) {
        // After the final question, go straight to the result screen.
        setStatus('result')
        return
      }
      indexRef.current = next
      setIndex(next)
      setSelected(null)
      setIsLocked(false)
      setFeedback(null)
    }, ANSWER_DELAY)
  }

  // Defensive: never read a question out of range, even if a stray event
  // somehow arrives. The quiz is exactly `quiz.length` questions.
  const safeIndex = Math.min(index, Math.max(total - 1, 0))
  const currentQuestion = quiz[safeIndex]

  const resultMessage =
    quizResults.find((entry) => score / total >= entry.min)?.message ??
    quizResults[quizResults.length - 1].message

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="quiz"
        aria-label="Relationship Quiz"
        className="relative isolate overflow-hidden px-6 py-20 sm:py-28"
      >
        <QuizBackground />
        <FloatingHearts variant="quiz" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          {/* Section heading — visible on the intro, kept for structure after */}
          <motion.header
            variants={staggerContainer(0.2, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={
              status === 'intro'
                ? 'mx-auto mb-12 max-w-2xl text-center'
                : 'sr-only'
            }
          >
            <motion.p
              variants={fadeIn}
              aria-hidden={status !== 'intro'}
              className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-champagne/80 sm:text-xs sm:tracking-[0.42em]"
            >
              A little game
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-medium leading-tight text-ivory"
            >
              {quizIntro.heading}
            </motion.h2>
          </motion.header>

          <AnimatePresence mode="wait">
            {status === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={gentleTransition}
                className="mx-auto flex w-full max-w-xl flex-col items-center gap-5 text-center"
              >
                <p className="font-display text-lg italic text-ivory/85 sm:text-xl">
                  {quizIntro.subtext}
                </p>
                <Button size="lg" onClick={handleStart}>
                  {quizIntro.cta}
                </Button>
              </motion.div>
            )}

            {status === 'playing' && currentQuestion && (
              <QuizQuestion
                key={currentQuestion.id}
                question={currentQuestion}
                index={safeIndex}
                total={total}
                selected={selected}
                isLocked={isLocked}
                onSelect={handleSelect}
                feedback={feedback}
              />
            )}

            {status === 'result' && (
              <QuizResult
                key="result"
                score={score}
                total={total}
                message={resultMessage}
                onRetry={handleStart}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </MotionConfig>
  )
}
