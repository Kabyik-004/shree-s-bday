import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

/*
 * MemoryMedia — renders a memory photo, or an elegant placeholder when the
 * real file does not exist yet.
 *
 * This is what lets the scrapbook work today (no photos) and later (real
 * photos in public/images/gallery) without changing any JSX: the <img> is
 * simply kept until it loads, and falls back to the placeholder on error.
 *
 * Performance: lazy + async decoding, and it fills an aspect-ratio container
 * sized by the parent, so there is no layout shift while images load.
 */
export default function MemoryMedia({ memory, className, iconSize = 30 }) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !memory?.src || failed

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {!showPlaceholder && (
        <img
          src={memory.src}
          alt={memory.alt || ''}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {showPlaceholder && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-plum/70 via-night to-dusk px-4 text-center"
        >
          {/* Soft inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,139,163,0.16),transparent_70%)]" />

          <div className="absolute inset-3 rounded-[1.2rem] border border-dashed border-white/15" />

          <ImageIcon
            size={iconSize}
            strokeWidth={1.25}
            className="relative text-blush/55"
          />
          <span className="relative text-[0.6rem] uppercase tracking-[0.3em] text-muted/70">
            your memory goes here
          </span>
        </div>
      )}
    </div>
  )
}
