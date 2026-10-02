import { Heart } from 'lucide-react'
import { cn } from '../../lib/cn'

/*
 * LetterPaper — the physical letter.
 *
 * Warm ivory paper with soft blush edges, a very subtle CSS texture, a
 * champagne divider and a generous reading width. Everything (greeting,
 * paragraphs, closing, signature) comes from the data object.
 *
 * While `paragraphs` is empty a tasteful placeholder is shown; it disappears
 * automatically as soon as real paragraphs are provided.
 *
 * Fully readable on its own — the section only fades/slides it in.
 */
export default function LetterPaper({ letter }) {
  const hasParagraphs = letter.paragraphs.length > 0

  return (
    <article
      className={cn(
        'relative mx-auto w-full max-w-2xl overflow-hidden rounded-[1.25rem]',
        'border border-white/50 bg-gradient-to-br from-ivory via-ivory to-blush/45',
        'px-6 py-10 shadow-glass-hover sm:px-12 sm:py-14',
      )}
    >
      {/* Very subtle paper warmth + texture (no grid, no notebook lines) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.6),transparent_60%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(0deg,rgba(58,31,61,0.9)_0px,rgba(58,31,61,0.9)_1px,transparent_1px,transparent_3px)]"
      />

      {/* Decorative seal */}
      <div className="relative flex flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-night shadow-glow-rose"
        >
          <Heart size={18} fill="currentColor" />
        </span>
        <p className="mt-4 text-[0.6rem] uppercase tracking-[0.24em] text-wine/55 sm:tracking-[0.42em]">
          {letter.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,5vw,2.6rem)] font-medium leading-tight text-wine">
          {letter.title}
        </h2>
      </div>

      <span
        aria-hidden="true"
        className="mx-auto my-7 block h-px w-20 bg-gradient-to-r from-transparent via-champagne to-transparent"
      />

      {/* Letter body */}
      <div className="relative font-display text-wine/90">
        {letter.greeting && (
          <p className="text-xl italic sm:text-2xl">{letter.greeting}</p>
        )}

        {hasParagraphs ? (
          <div className="mt-5 flex flex-col gap-5">
            {letter.paragraphs.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 12)}`}
                className="text-[1.075rem] leading-[1.9] sm:text-lg sm:leading-[1.95]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-5 text-lg italic leading-[1.9] text-wine/45 sm:text-xl">
            The words for this letter are waiting to be written.
          </p>
        )}

        {letter.closing && (
          <p className="mt-7 text-[1.075rem] leading-[1.9] sm:text-lg">
            {letter.closing}
          </p>
        )}

        {letter.signature && (
          <p className="mt-8 font-display text-2xl italic text-rose-deep sm:text-3xl">
            {letter.signature}
          </p>
        )}
      </div>
    </article>
  )
}
