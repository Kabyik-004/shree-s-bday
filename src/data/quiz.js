// Relationship quiz for Shree's Little World.
//
// FACT RULE: every question is built only from facts already established in
// the project — no relationship facts are invented here.
//
// The quiz is exactly 6 questions. There is no placeholder / "add later"
// mechanism; the total is derived from this array's length.
//
// FIELDS (per question)
//   id             — unique key
//   question       — the prompt shown to Shree
//   options        — answer choices (strings)
//   answer         — zero-based index of the correct option
//   correctMessage — optional per-question override (falls back to quizFeedback)
//   wrongMessage   — optional per-question override (falls back to quizFeedback)
//
// Filling `correctMessage` / `wrongMessage` on a question overrides the playful
// defaults in `quizFeedback`.

// Intro copy
export const quizIntro = {
  heading: 'How well do you know us?',
  subtext: 'No pressure... but I am judging you 👀',
  cta: "Let's Find Out",
}

// Default feedback (data-driven so it is easy to edit)
export const quizFeedback = {
  correct: 'Correct ❤️',
  wrong: 'Hmmmm... really? 👀',
}

// Score messages for a 6-question quiz. Matched top-down by score ratio
// (correct / total): 6 or 5 → high, 4 → middle, 3 or below → low.
export const quizResults = [
  { min: 5 / 6, message: 'Okay okay... you know us pretty well ❤️' },
  { min: 4 / 6, message: "Not bad... I'll give you that 😌" },
  { min: 0, message: 'We clearly need another date 😂' },
]

export const quiz = [
  {
    id: 1,
    question: 'Where did our story begin?',
    options: ['A café', 'A college classroom', 'A park', 'A random train ride'],
    answer: 1,
    correctMessage: '',
    wrongMessage: '',
  },
  {
    id: 2,
    question: 'Where did we first hold hands?',
    options: ['In a classroom', 'In an auto', 'At a restaurant', 'On a bus'],
    answer: 1,
    correctMessage: '',
    wrongMessage: '',
  },
  {
    id: 3,
    question: 'What did you give me while I was returning home from Kolkata?',
    options: ['A letter', 'A bracelet', 'A flower', 'A keychain'],
    answer: 1,
    correctMessage: '',
    wrongMessage: '',
  },
  {
    id: 4,
    question: 'What is one of my favorite memories?',
    options: ['Our first date', 'A random exam', 'A shopping trip', 'A college lecture'],
    answer: 0,
    correctMessage: '',
    wrongMessage: '',
  },
  {
    id: 5,
    question: 'Which of these do I call you?',
    options: ['Only Shree', 'Only Mumma', 'Both Shree and Mumma', 'None of these'],
    answer: 2,
    correctMessage: '',
    wrongMessage: '',
  },
  {
    id: 6,
    question: "What's something you do that always makes me feel cared for?",
    options: [
      'The little things you do',
      'Ignoring me',
      'Stealing my food',
      'Making me study',
    ],
    answer: 0,
    correctMessage: '',
    wrongMessage: '',
  },
]

export default quiz
