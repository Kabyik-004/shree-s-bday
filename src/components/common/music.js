/*
 * Global background music — a module-level singleton.
 *
 * Why a singleton rather than a React context/ref?
 *   A single <audio> element created once outside React guarantees the music
 *   can never restart because a component re-rendered, a section entered the
 *   viewport, or the tree remounted. Nothing in React owns the element, so
 *   there is exactly one audio source for the whole site.
 *
 * The UI subscribes with useSyncExternalStore; the Hero simply calls play().
 * Playback failures (e.g. browser autoplay blocking) are swallowed silently —
 * the listener can always start the music from the control.
 */

const AUDIO_SRC = '/music/shree-song.mp3'
const TARGET_VOLUME = 0.18 // gentle background level (~15–20%)
const FADE_STEP_MS = 40
const FADE_DURATION_MS = 900

let audioEl = null
let fadeTimer = null
let state = { playing: false, muted: false }
const listeners = new Set()

function emit() {
  listeners.forEach((listener) => listener())
}

function setState(patch) {
  // Only replace the snapshot when something actually changed, so
  // useSyncExternalStore does not re-render on no-op updates.
  const next = { ...state, ...patch }
  if (next.playing === state.playing && next.muted === state.muted) return
  state = next
  emit()
}

/** Create the single audio element on first use (keeps first paint light). */
function ensureAudio() {
  if (audioEl || typeof window === 'undefined') return audioEl

  const el = new Audio()
  el.src = AUDIO_SRC
  el.loop = true
  el.preload = 'metadata'
  el.volume = 0

  el.addEventListener('play', () => setState({ playing: true }))
  el.addEventListener('pause', () => setState({ playing: false }))

  audioEl = el
  return el
}

/** Smoothly ramp the element's volume toward `target`. */
function fadeTo(target, onDone) {
  const el = ensureAudio()
  if (!el) return

  clearInterval(fadeTimer)
  const start = el.volume
  const steps = Math.max(1, Math.round(FADE_DURATION_MS / FADE_STEP_MS))
  let step = 0

  fadeTimer = setInterval(() => {
    step += 1
    const value = start + (target - start) * (step / steps)
    el.volume = Math.min(1, Math.max(0, value))
    if (step >= steps) {
      clearInterval(fadeTimer)
      fadeTimer = null
      if (onDone) onDone()
    }
  }, FADE_STEP_MS)
}

/**
 * Attempt to start the music. Resolves to true when playback begins and false
 * when the browser blocks it. Never throws and never shows an error.
 */
export async function play() {
  const el = ensureAudio()
  if (!el) return false

  el.muted = false
  setState({ muted: false })

  try {
    await el.play()
    fadeTo(TARGET_VOLUME) // gentle fade-in from the current volume
    return true
  } catch {
    // Autoplay restricted — stay quiet and let the user press play.
    setState({ playing: false })
    return false
  }
}

/** Fade out, then pause. */
export function pause() {
  const el = ensureAudio()
  if (!el) return

  fadeTo(0, () => el.pause())
}

/** Toggle play/pause. */
export function toggle() {
  const el = ensureAudio()
  if (!el) return

  if (el.paused) {
    play()
  } else {
    pause()
  }
}

/** Toggle mute. Reliable and instantaneous; playback state is untouched. */
export function toggleMute() {
  const el = ensureAudio()
  if (!el) return

  const nextMuted = !el.muted
  el.muted = nextMuted
  setState({ muted: nextMuted })
}

export function subscribeMusic(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getMusicState() {
  return state
}
