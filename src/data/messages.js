// "Things I Don't Say Enough" — the reasons/cards for Shree's Little World.
//
// NOTE ON THE `message` FIELD
//   `message` is intentionally EMPTY for every card in this phase.
//   These will be filled in later with the user's own real words — no
//   AI-written romantic paragraphs are added here.
//
// When a card is opened, it reveals its `shortText`. If a real `message`
// is provided later, it is shown as the longer, more personal note.
//
// FIELDS
//   id        — unique, stable key
//   title     — short card title
//   shortText — the known, genuine line shown when the card opens
//   message   — the longer personal message (empty for now, user-authored later)
//   tone      — one of the Phase 2 accent tones (rose | champagne | lavender | blush)

export const reasons = [
  {
    id: 1,
    title: 'The way you care',
    shortText: 'You make me feel cared for — again and again.',
    message: '',
    tone: 'rose',
  },
  {
    id: 2,
    title: 'The little things',
    shortText: "It's the little things you do that stay with me.",
    message: '',
    tone: 'champagne',
  },
  {
    id: 3,
    title: 'Flowers',
    shortText: 'You plucking flowers for me is one of those memories I keep close.',
    message: '',
    tone: 'lavender',
  },
  {
    id: 4,
    title: 'The bracelet',
    shortText: 'Something small that became a very special memory.',
    message: '',
    tone: 'blush',
  },
  {
    id: 5,
    title: 'Shree',
    shortText: 'Somehow, that name became one of my favorite names to say.',
    message: '',
    tone: 'rose',
  },
  {
    id: 6,
    title: 'Mumma',
    shortText: 'My favorite name for my favorite person.',
    message: '',
    tone: 'champagne',
  },
  {
    id: 7,
    title: 'One more thing',
    shortText: "There's still something I haven't said properly.",
    message: '',
    tone: 'lavender',
  },
  {
    id: 8,
    title: 'To be continued',
    shortText: 'We still have so many little moments left to make.',
    message: '',
    tone: 'blush',
  },
]

// "Open When…" envelopes.
//
// NOTE ON THE `message` FIELD
//   Like `reasons`, every `message` here is intentionally EMPTY.
//   These are placeholders for the user's own words — no letters are invented.
//   While a message is empty, the modal shows a tasteful placeholder; it
//   disappears automatically as soon as the user writes the real message.
//
// FIELDS
//   id         — stable string key
//   title      — shown in the opened envelope ("Open when …")
//   shortLabel — the shorter, more evocative line shown on the card
//   icon       — icon key resolved in OpenWhenCard (lucide-react)
//   message    — the personal letter (empty for now, user-authored later)
//   special    — optional: gives the envelope a distinct visual treatment

export const openWhenMessages = [
  {
    id: 'miss-me',
    title: 'Open when you miss me',
    shortLabel: 'when you miss me',
    icon: 'heart',
    message:
      "hey shree close ur eyes for a sec and take a deep breath... just know im thinking about u right now too. distance or whatever doesn't matter u are always on my mind mumma. whenever u miss me just remember ur baby is missing u even more. call or text me right now okay?",
  },
  {
    id: 'bad-day',
    title: "Open when you're having a bad day",
    shortLabel: 'when today feels heavy',
    icon: 'cloud',
    message:
      "i really wish i was right there with u to give u a big hug and take all ur stress away. don't stress too much mumma, u know how smart and capable u are and whatever problem it is we will handle it together. take a little break, breathe and remember im always backing u up no matter what.",
  },
  {
    id: 'smile',
    title: 'Open when you need a smile',
    shortLabel: 'when you need a little happiness',
    icon: 'smile',
    message:
      "hey quick reminder that u have the most beautiful smile ever and i literally live for it!! just think about us in mandarmoni, sitting there and having the best time. now stop being so serious my intellectual genius and give me that cute smile... u look way too good to be frowning!",
  },
  {
    id: 'cant-sleep',
    title: "Open when you can't sleep",
    shortLabel: 'when the night feels too quiet',
    icon: 'moon',
    message:
      "get all cozy under the blanket mumma. turn off ur phone, close ur eyes and just pretend im sitting right next to u, patting ur head till u fall asleep. leave all the overthinking to me for tonight. go to sleep now, ill be waiting to talk to u as soon as u wake up.",
  },
  {
    id: 'angry',
    title: "Open when you're angry with me",
    shortLabel: 'when you need a little space',
    icon: 'space',
    message:
      "im so so sorry mumma 🥺 u know ur boy gets silly sometimes, but i never ever want to make u mad or upset. please forgive me? i love u way too much to see u annoyed with me. give me a call, let's talk it out and let me make it up to u okay?",
  },
  {
    id: 'hug',
    title: 'Open when you need a hug',
    shortLabel: 'when you need me close',
    icon: 'hug',
    message:
      "wrap ur arms tight around urself right now and squeeze—that's a big warm hug straight from me to u! u always take care of me like a baby but right now i just want to wrap u up and make u feel completely safe. im right here mumma.",
  },
  {
    id: 'love',
    title: 'Open when you want to know how much I love you',
    shortLabel: 'when you need a reminder',
    icon: 'love',
    message:
      "honestly i can't even put it into words. u are my intellectual genius, my safe place and my whole world. i love u more than anything and all i want is to be ur last love and build a happy life together with u. u mean everything to me shree.",
  },
  {
    id: 'hear-from-me',
    title: 'Open when you just want to hear from me',
    shortLabel: 'when you want a little piece of me',
    icon: 'mail',
    message:
      "hey mumma!! just wanted to pop in and remind u how special u are to me. u completely changed how i look at myself and made me realize how capable i am... im so lucky to have u. sending u the biggest kiss right now... gojo gojo mumma ta! muahh! 😘",
  },
  {
    id: 'curious',
    title: "Open when you're curious...",
    shortLabel: 'there might be something here',
    icon: 'gift',
    message:
      "wondering what's next for us? ill tell u: a whole lot of new places to roam together after mandarmoni, endless late night talks, a successful future and a lifetime of us being happy together. we are gonna make it in the end mumma, i promise u that!",
    special: true,
  },
]

// The Secret.
//
// The reveal shows the "Lifetime Mine Pass" artwork as its main content.
// `message` and `closing` remain intentionally EMPTY — the user writes those
// personally. When no message is set (and an image is shown) the placeholder
// text is omitted entirely.
export const secretMessage = {
  eyebrow: 'For Shree',
  title: 'For You',
  image: '/images/gallery/secret_pass.jpg',
  imageAlt: 'Lifetime Mine Pass created for Shree',
  message: '',
  closing: '',
}

// The Letter — the emotional centerpiece.
//
// NOTE: `paragraphs` MUST stay empty until the user writes the real letter.
// No romantic prose is generated here. While empty, the paper shows a tasteful
// placeholder that disappears automatically once paragraphs are added.
export const letter = {
  eyebrow: 'A Letter For You',
  title: 'For Shree',
  greeting: 'To my dearest Shree,',
  paragraphs: [
    'Happy Birthday, my love!',
    'Looking back at where it all started, I still clearly remember the first time I saw you. You were sitting there so quietly, listening intently to the teacher and answering every question with such ease. I remember thinking to myself how unbelievably smart and intellectual you were. Even back then, there was something so magnetic about you that completely drew me in.',
    'Over time, you became my safe space, my biggest supporter, and my comfort. You treat me with so much care and warmth—just like a mother does. No matter what problem I’m facing, I know you’re always right there to back me up, figure things out, and take care of me like a baby. You’ve given me a kind of unconditional care I never knew I needed, gojo gojo mumma ta.',
    'Our trip to Mandarmoni holds such a special place in my heart. That experience with you was absolutely amazing, and honestly, it made me realize one thing: I want to travel the world and explore every single new place with you for the rest of my life, Mumma.',
    'You have changed me in ways I can barely put into words. You changed the way I look at myself and helped me realize just how capable I truly am. Everything good I see in myself today is because of you and the faith you’ve placed in me.',
    'I just want you to know that you mean the whole world to me. I love you deeply, and my only wish is to be your last love and to spend a lifetime making you happy. I won’t make a million empty promises, but I will make this one: we will make it in the end. We are going to build a happy life and a successful, beautiful future together.',
    'I love you so much, Mumma! Muahh!',
  ],
  closing: 'Forever yours,',
  signature: 'Kabyik',
}

export default reasons
