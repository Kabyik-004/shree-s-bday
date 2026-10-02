// Memories data for Shree's Little World — the scrapbook's single source of truth.
//
// HOW TO ADD / REPLACE PHOTOS
//   1. Drop image files into:  public/images/gallery/
//   2. Point each entry's `src` at that file (e.g. '/images/gallery/us_1.jpg').
//      If a file is missing, the card automatically falls back to the elegant
//      placeholder — nothing in the JSX needs to change.
//   3. Fill in `caption` (optional) and a meaningful `alt` for accessibility.
//
// FIELDS
//   id       — unique, stable key
//   src      — public path to the photo (placeholder fallback until it exists)
//   alt      — accessible description of the photo (empty for now = decorative)
//   caption  — optional short note shown under/over the photo (empty = none)
//   category — one of the categories in `memoryCategories`
//   rotation — deterministic scrapbook tilt in degrees (never random)
//
// To reach ~50 memories later, simply keep appending objects to this array.

export const memoryCategories = [
  'All',
  'Us',
  'Little Moments',
  'Silly Us',
  'Favorites',
  'Memories',
]

export const memories = [
  // Real photos live in public/images/gallery/. Alt text is kept neutral
  // (the photos have not been described in detail); captions are left empty
  // for the user to write personally.
  //
  // NOTE: `memories_02.heif` is a HEIC file browsers cannot display. Convert it
  // to `memories_02.jpg` (keeping the original .heif) and entry 9 below will
  // show it automatically — no code change needed in the meantime.
  { id: 1, src: '/images/gallery/us_1.jpg', alt: 'Kabyik and Shree', caption: '', category: 'Us', rotation: -2 },
  { id: 2, src: '/images/gallery/little_moments_1.jpg', alt: 'A little moment together', caption: '', category: 'Little Moments', rotation: 2 },
  { id: 3, src: '/images/gallery/silly_us_1.jpg', alt: 'A silly moment together', caption: '', category: 'Silly Us', rotation: -1 },
  { id: 4, src: '/images/gallery/favorites_1.jpg', alt: 'One of our favorite memories', caption: '', category: 'Favorites', rotation: 3 },
  { id: 5, src: '/images/gallery/memories_01.jpg', alt: 'A memory of us', caption: '', category: 'Memories', rotation: -3 },
  { id: 6, src: '/images/gallery/us_2.jpg', alt: 'Kabyik and Shree', caption: '', category: 'Us', rotation: 1 },
  { id: 7, src: '/images/gallery/silly_us_2.jpg', alt: 'A silly moment together', caption: '', category: 'Silly Us', rotation: -1 },
  { id: 8, src: '/images/gallery/favorites_2.jpg', alt: 'One of our favorite memories', caption: '', category: 'Favorites', rotation: 3 },
  { id: 9, src: '/images/gallery/memories_02.jpg', alt: 'A memory of us', caption: '', category: 'Memories', rotation: 2 },
]

export default memories
