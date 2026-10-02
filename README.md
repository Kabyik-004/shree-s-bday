# Shree’s Little World ❤️

A personal, interactive birthday website made for Shreetama (“Shree”).

> **Status:** Phase 1 — project initialization only. No website sections or visual design are implemented yet.

## Tech stack

- [React](https://react.dev/) 19 (JavaScript, no TypeScript)
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4 (via the `@tailwindcss/vite` plugin)
- [Framer Motion](https://motion.dev/) for animations
- [Lucide React](https://lucide.dev/) for icons

## Getting started

```bash
npm install
npm run dev      # start the development server
npm run build    # production build
npm run preview  # preview the production build
```

## Project structure

```
shree-birthday/
├── public/
│   ├── images/
│   │   ├── memories/
│   │   ├── polaroids/
│   │   └── gallery/
│   ├── music/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── animations/
│   │   └── common/
│   ├── sections/
│   │   ├── Hero/
│   │   ├── BirthdayReveal/
│   │   ├── OurStory/
│   │   ├── Memories/
│   │   ├── Reasons/
│   │   ├── OpenWhen/
│   │   ├── Quiz/
│   │   ├── Secret/
│   │   ├── Letter/
│   │   └── Finale/
│   ├── data/
│   │   ├── memories.js
│   │   ├── messages.js
│   │   └── quiz.js
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## Design system (Phase 2)

Phase 2 established the global visual identity. No page sections are built yet.

### Fonts
- **Cormorant Garamond** — elegant display serif for headings (`font-display`).
- **Inter** — clean sans for body copy and UI (`font-sans`).

Both are loaded via Google Fonts in `index.html`.

### Color palette (Tailwind v4 `@theme` tokens in `src/index.css`)
| Token | Value | Use |
| --- | --- | --- |
| `night` / `dusk` / `plum` / `wine` | deep plums | romantic background & depth |
| `blush` | soft blush pink | soft highlights, borders |
| `rose` / `rose-deep` | rose pink | primary accent |
| `ivory` | warm ivory | primary text |
| `lavender` | soft lavender | cool secondary accent |
| `champagne` / `gold` | gold accents | focus rings, fine details |
| `muted` | dusty lilac | supporting/caption text |

Use them like normal Tailwind utilities: `bg-night`, `text-ivory`, `border-blush/25`, `text-rose`.

### Global styles
Ambient layered background (gradient + soft radial glows), typographic defaults,
box-sizing, smooth scrolling, selection & scrollbar styling, accessible
`:focus-visible` rings, and a `prefers-reduced-motion` media query.

Custom utilities: `text-gradient`, `text-body`.

### Reusable UI components (`src/components/ui/`)
- **`Button`** — variants `primary` / `secondary` / `ghost`, sizes `sm` / `md` / `lg`,
  rounded, hover lift, active + focus-visible states. Renders `<button>` or pass
  `as="a"` for links.
- **`GlassCard`** — soft glass surface (subtle transparency, blur, thin border,
  gentle shadow, optional hover lift). Props: `as`, `hover`, `padded`.

```jsx
import { Button, GlassCard } from './components/ui'
```

### Animation foundation (`src/components/animations/variants.js`)
Reusable Framer Motion variants and constants: `easeGentle`, `duration`,
`fadeIn/fadeUp/fadeDown/fadeLeft/fadeRight`, `scaleIn`, `blurIn`,
`staggerContainer`, `float`, `viewportOnce`, `revealUp`.

Motion philosophy: smooth, gentle, slightly slow — fade, soft slide, gentle
scale, float, blur-to-clear. Never bouncy or flashy.

## Notes

- All personal content (memories, messages, quiz questions, photos, music) will be added in later phases.
- Empty folders use `.gitkeep` so the structure is preserved.
