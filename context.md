# Songwriting Workshop — Project Context & Status

## About This Project

An interactive web slideshow for the **Pro Artist Series Songwriting Track** at **Good Sky Studio** (goodskystudio.com). Built for instructor **Doug McArthur** to use in a 4-week workshop series starting July 2026.

Students join a live session by scanning a QR code displayed on Slide 1. The instructor controls the presentation from a projected/iPad screen. The last slide in each workshop is the interactive activity — students navigate there and work directly in the browser. No app install required.

---

## Deployment

- **Repo:** `dougmcarthur/songwriting-workshop` (GitHub)
- **Live site:** https://songwriting-workshop.pages.dev
- **Hosting:** Cloudflare Pages — auto-deploys on every push to `main`
- **Branch policy:** Always push directly to `main`
- **Stack:** Vanilla HTML/CSS/JS + Reveal.js 5.1.0, no build step, no npm

---

## Tech Stack

### Reveal.js 5.1.0
Both workshops use Reveal.js loaded from jsDelivr CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reset.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css">
...
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js"></script>
```

**Critical:** Both `reset.css` AND `reveal.css` must be included. `reset.css` first.

### Initialization pattern (working — don't change without testing)
```js
Reveal.initialize({
  controls: true,
  controlsTutorial: false,
  controlsLayout: 'bottom-right',
  progress: true,
  slideNumber: false,
  hash: true,
  history: true,
  keyboard: true,
  overview: true,
  center: false,
  touch: true,
  transition: 'slide',
  transitionSpeed: 'fast',
  backgroundTransition: 'none',
  width: 1280,
  height: 720,
  margin: 0.04,
}).then(() => {
  generateQR();
});
window.addEventListener('resize', () => Reveal.layout());
```

**Do NOT use:** `window.innerWidth/Height`, `'100%'` strings, `minScale/maxScale`, or `requestAnimationFrame` wrappers — all were tried and caused blank/flashing slides.

### CSS architecture
- `style.css` is shared across all workshops (linked as `../../style.css` from subdirs)
- Dark theme: `--bg: #0A0908`, `--accent: #C8A84A` (gold), `--text: #EDE8E0`
- Fonts: Cormorant Garamond (display/serif) + Inter (UI/sans-serif) from Google Fonts
- Key rule: `.reveal-viewport { background: var(--bg) }` — Reveal.js adds this class to `<body>` and its own default is white; this override keeps the dark background

### Other CDN dependencies
- QRCode.js: `https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js`

---

## File Structure (Current)

```
songwriting-workshop/
├── index.html              # Workshop 1
├── app.js                  # Workshop 1 logic
├── style.css               # Shared styles
├── context.md              # This file
└── workshops/
    └── w2/
        ├── index.html      # Workshop 2
        └── app.js          # Workshop 2 logic
```

---

## UI Layout

Each workshop page has:
- **`.reveal` container** — full-page Reveal.js presentation
- **Float bar** (top-right, `position: fixed`, `z-index: 100`) — two buttons:
  - **Activity** — jumps directly to the last slide (the activity slide)
  - **Fullscreen** (⛶ icon) — toggles browser fullscreen; keyboard shortcut `F`
- **No sidebar panels** — outline and activity panels were removed; activity is a proper slide

---

## Workshop 1: Know the Rules So You Can Break Them

**File:** `index.html` + `app.js`

**Slides (dynamically built from `SLIDES` array in `app.js`):**
1. Hook — "Every song you've ever loved has a skeleton"
2. Structure — The standard ABABCBB map with visual block diagram
3. Eras — Same structure across eras (Hank Williams → Beatles → current)
4. Table — Other structures worth knowing (AAA, AABA, Verse-Chorus, Through-composed, Loop)
5. Evidence — Do songs need a chorus? Fast Car, Hurt, Alright
6. Hero — Hero's Journey parallel table
7. Case Study — "Don't Dream It's Over" — Crowded House
8. Thesis — "Structure isn't the cage. It's the launching pad."
9. Playlist — Listen list with platform links
10. **Activity slide** — "Build Your Skeleton" (drag-and-drop)

**Activity ("Build Your Skeleton"):**
- Drag phrase cards into song structure drop zones (V1, Pre-Ch, Ch1, V2, Ch2, Bridge, Outro)
- 10 phrase cards (e.g. "The drive home after the fight", "3am, can't sleep again")
- Drag ghost is `position: fixed` so it works correctly under Reveal's CSS scale transform
- Reset button clears all placements

**Songs referenced:** Your Cheatin' Heart, Hey Jude, Last Night, Times They Are A-Changin', Over the Rainbow, Jolene, Bohemian Rhapsody, A Day in the Life, What's Going On, Fast Car, Hurt, Alright, Don't Dream It's Over

---

## Workshop 2: What Are You Actually Saying?

**File:** `workshops/w2/index.html` + `workshops/w2/app.js`

**Slides:**
1. Hook — "Every song has a topic. Only the great ones have a subject."
2. Comparison — Topic vs. Subject (side-by-side two-column)
3. Contrast — Vague vs. Specific language examples
4. Camera — "Write what a camera can see"
5. Zoom — The zoom-in technique diagram
6. Case Study — "The River" by Bruce Springsteen
7. Thesis — "The more specific you are, the more universal you become."
8. Playlist — Listen list
9. **Activity slide** — "The Zoom-In Map" (text inputs)

**Activity ("The Zoom-In Map"):**
- Three-level form: Theme → Your Angle → The Scene
- "Can you point a camera at this?" prompt appears on Scene field focus
- Seed theme cards (click to populate Theme field): Loss, Home, Identity, etc.
- Reset button clears all fields

**Songs referenced:** The River, Fast Car, The Night They Drove Old Dixie Down, Allentown, Supermarket Flowers

---

## Workshops 3–4 (Curriculum Planned, Not Yet Built)

### Workshop 3: What Do You Sound Like?
*Voice, Language & Lyric*
- Concept: Writing *about* vs. writing *from inside*. Plain vs. poetic language. The cliché ban.
- Activity: The Rewrite Game (write a verse in clichés, swap papers, rewrite to be specific and weird)

### Workshop 4: How Do You Finish Anything?
*From Fragment to Song*
- Concept: Finishing is a skill. The Minimum Viable Draft.
- Activity: The Assembly Session (structured sprint: 15 min verse / 15 min chorus / 10 min bridge / 5 min read aloud)

---

## Known Issues / Next Steps

- **Slide content visibility** — There was a persistent flash-then-disappear bug through multiple attempts. The current state (Reveal.js 5.1.0, reset.css, 1280×720 explicit dimensions) matches the working reference at https://github.com/ryanbbrown/revealjs-skill — verify at https://songwriting-workshop.pages.dev
- **Workshops 3 and 4** — Curriculum is defined above, implementation not started
- **Real-time student sync** — Originally planned stretch goal (students see each other's skeleton in real time). Not started; would require a backend (Cloudflare Workers + D1 or similar)
- **Workshop 1 Outline** — The outline/handout panel was removed for simplicity. If Doug wants it back, it would be an aside panel triggered by a button in the float bar

---

## The Program

**Good Sky Studio — Pro Artist Series**

- 8-week program, 60-minute sessions, 6–10 students per cohort
- $349 full price / $299 early bird
- Four parallel tracks: Voice, Guitar, Percussion, Songwriting
- Songwriting track: Doug McArthur weeks 1–4, visiting songwriter weeks 5–8

**Brand tone:** Science-backed, artist-led, judgment-free. Warm but direct. Premium feel.
**Workshop philosophy:** Brevity, levity, sense of fun. No hand-holding, no intimidation.

---

## Key Links

- Live site: https://songwriting-workshop.pages.dev
- Repo: https://github.com/dougmcarthur/songwriting-workshop
- Program page: https://goodskystudio.com/the-pro-artist-series/
- Studio site: https://goodskystudio.com
- Logo: https://i0.wp.com/goodskystudio.com/wp-content/uploads/2025/02/logo-gss-1.png
- Reveal.js reference implementation: https://github.com/ryanbbrown/revealjs-skill
