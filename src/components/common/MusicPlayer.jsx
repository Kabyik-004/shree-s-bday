import { useSyncExternalStore } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import {
  getMusicState,
  subscribeMusic,
  toggle,
  toggleMute,
} from './music'
import { cn } from '../../lib/cn'

/*
 * MusicPlayer — the single, persistent floating music control.
 *
 * Mounted once at the application root (never inside a section), so the one
 * audio element created in `music.js` keeps playing across the whole site.
 * It merely reflects the singleton's state and forwards clicks.
 */
export default function MusicPlayer() {
  const { playing, muted } = useSyncExternalStore(
    subscribeMusic,
    getMusicState,
    getMusicState,
  )

  const baseButton = cn(
    'flex h-11 w-11 items-center justify-center rounded-full text-ivory',
    'transition-colors duration-300 ease-gentle',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-night',
  )

  return (
    <div
      role="group"
      aria-label="Background music controls"
      className={cn(
        'fixed z-40 flex items-center gap-1 rounded-full p-1',
        'right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))]',
        'border border-white/12 bg-white/[0.06] shadow-glass backdrop-blur-md',
        'sm:bottom-6 sm:right-6',
      )}
    >
      {/* Play / pause */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
        className={cn(baseButton, 'hover:bg-white/10')}
      >
        {playing ? (
          <Pause size={17} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Play size={17} strokeWidth={1.75} aria-hidden="true" />
        )}
      </button>

      {/* Mute / unmute */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
        aria-pressed={muted}
        className={cn(baseButton, 'hover:bg-white/10')}
      >
        {muted ? (
          <VolumeX size={17} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Volume2 size={17} strokeWidth={1.75} aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
