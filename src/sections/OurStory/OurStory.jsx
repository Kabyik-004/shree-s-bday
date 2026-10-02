import { MotionConfig, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from '../../components/animations/variants'
import FloatingHearts from '../../components/common/FloatingHearts'
import StoryBackground from './StoryBackground'
import StoryMoment from './StoryMoment'

/*
 * OurStory — a romantic scrapbook of the moments that began the relationship.
 *
 * Only the known facts are used. No dates, locations, dialogue or events are
 * invented; each moment's visual is an honest placeholder for a future photo.
 *
 * Structure is an ordered list so assistive tech reads the story in sequence.
 * The intro header is the section's <h2>; each moment title is an <h3>.
 */

// Alternating emphasis side (left / right / left / right …).
const MOMENTS = [
  {
    id: 'beginning',
    eyebrow: 'College classroom',
    title: 'The Beginning',
    text: 'Somehow, in an ordinary college classroom, I met someone who would become anything but ordinary.',
    align: 'left',
    accent: 'rose',
    frame: 'from-rose/25 via-plum/30 to-night',
    photo: '/images/gallery/the_begining.jpg',
    photoAlt: 'The beginning of our story',
  },
  {
    id: 'first-date',
    eyebrow: 'Where it started',
    title: 'Our First Date',
    text: 'One of my favorite memories will always be our first date.',
    align: 'right',
    accent: 'champagne',
    frame: 'from-champagne/20 via-wine/30 to-night',
    photo: '/images/gallery/our_first_date.jpg',
    photoAlt: 'Our first date',
  },
  {
    id: 'first-hand-hold',
    eyebrow: 'The auto',
    title: 'The First Hand Hold',
    text: 'The first time we held hands was in an auto.',
    align: 'left',
    accent: 'lavender',
    frame: 'from-lavender/25 via-plum/30 to-night',
    photo: '/images/gallery/first_hand_holding.jpg',
    photoAlt: 'Holding hands for the first time',
  },
  {
    id: 'bracelet',
    eyebrow: 'Returning home from Kolkata',
    title: 'The Bracelet',
    text: 'While I was returning home from Kolkata, you gave me your bracelet.',
    align: 'right',
    accent: 'rose',
    frame: 'from-rose-deep/25 via-wine/30 to-night',
    photo: '/images/gallery/the_bracelet.jpg',
    photoAlt: 'The bracelet',
  },
  {
    id: 'flowers',
    eyebrow: 'A little thing',
    title: 'The Flowers',
    text: 'You plucking flowers for me is one of those little things I will always remember.',
    align: 'left',
    accent: 'champagne',
    frame: 'from-champagne/25 via-plum/25 to-night',
    photo: '/images/gallery/the_flower.jpg',
    photoAlt: 'Flowers',
  },
  {
    id: 'care',
    eyebrow: 'Every single day',
    title: 'The Way You Care',
    text: 'You make me feel cared for — not just once, but again and again.',
    align: 'right',
    accent: 'lavender',
    frame: 'from-lavender/20 via-wine/30 to-night',
    photo: '/images/gallery/the_way_you_care.jpg',
    photoAlt: 'The way you care',
  },
]

export default function OurStory() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="story"
        aria-label="Our Story"
        className="relative isolate overflow-hidden px-6 py-20 sm:py-28"
      >
        <StoryBackground />
        <FloatingHearts variant="story" />

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
              Our Story
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-medium leading-tight text-ivory"
            >
              How it all began
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body"
            >
              An ordinary college classroom became the beginning of something
              very special.
            </motion.p>
            <motion.p
              variants={fadeIn}
              className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted/60 sm:tracking-[0.32em]"
            >
              about a year and a half together
            </motion.p>
          </motion.header>

          {/* The moments */}
          <ol className="mt-12 flex flex-col gap-16 sm:mt-16 sm:gap-24">
            {MOMENTS.map((moment, i) => (
              <StoryMoment
                key={moment.id}
                moment={moment}
                index={i + 1}
                total={MOMENTS.length}
              />
            ))}
          </ol>

          {/* Closing line + scroll cue */}
          <motion.div
            variants={staggerContainer(0.18, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-20 flex flex-col items-center gap-10 text-center sm:mt-28"
          >
            <motion.p
              variants={fadeUp}
              className="max-w-2xl font-display text-xl italic text-ivory/85 sm:text-2xl"
            >
              And those are only a few of the moments that made us&hellip; us.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted/70">
                to be continued
              </span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-champagne/70"
              >
                <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}
