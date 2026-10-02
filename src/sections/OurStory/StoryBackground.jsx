/*
 * StoryBackground — a subtle atmospheric drift for the Our Story section.
 *
 * The section travels dusk → plum → wine → dusk, echoing the warm environment
 * left behind by the BirthdayReveal. Same Phase 2 palette, no new colours.
 * Pure CSS, aria-hidden, pointer-events-none.
 */
export default function StoryBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base vertical drift between moments */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-plum/60 to-dusk" />

      {/* Soft atmospheric wash: lavender → rose → wine → dusk */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(198,182,230,0.07),rgba(217,139,163,0.10)_35%,rgba(58,31,61,0.28)_62%,rgba(29,17,41,0.40))]" />

      {/* Gentle side glows */}
      <div className="absolute left-[-10%] top-1/4 h-[32rem] w-[32rem] max-w-[120vw] rounded-full bg-[radial-gradient(circle,rgba(217,139,163,0.12),transparent_70%)] blur-3xl" />
      <div className="absolute right-[-10%] top-2/3 h-[30rem] w-[30rem] max-w-[120vw] rounded-full bg-[radial-gradient(circle,rgba(198,182,230,0.10),transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[-10%] left-1/3 h-[26rem] w-[40rem] max-w-[140vw] rounded-full bg-[radial-gradient(ellipse,rgba(227,203,160,0.08),transparent_70%)] blur-3xl" />

      {/* Blend the top edge in from the BirthdayReveal's wine */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-wine/70 to-transparent" />
    </div>
  )
}
