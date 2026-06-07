# Songwriting Workshop — Project Context & Handoff

## About This Project

An interactive web slideshow for the **Pro Artist Series Songwriting Track** at **Good Sky Studio** (goodskystudio.com). Built for instructor **Doug McArthur**. Students join a live session via the URL displayed on Slide 1. The instructor drives the presentation; the last slide in each workshop is an interactive activity students use in their own browsers. No app install required.

---

## Deployment

- **Repo:** `dougmcarthur/songwriting-workshop` (GitHub)
- **Live site:** https://songwriting-workshop.pages.dev
- **Workshop 2:** https://songwriting-workshop.pages.dev/workshops/w2/
- **Hosting:** Cloudflare Pages — auto-deploys on every push to `main`
- **Branch policy:** Always push directly to `main`
- **Stack:** Vanilla HTML/CSS/JS + Reveal.js 5.1.0 via CDN, no build step, no npm

---

## File Structure

```
songwriting-workshop/
├── index.html              # Workshop 1
├── app.js                  # Workshop 1 logic
├── workshop-theme.css      # Shared custom styles (linked by all workshops + hub)
├── style.css               # OLD — DO NOT LINK (causes iOS Safari compositing bug)
├── context.md              # This file
├── hub/
│   └── index.html          # Class hub — sidebar + cards linking to all 4 decks (standalone, no Reveal)
└── workshops/
    ├── w2/
    │   ├── index.html      # Workshop 2
    │   └── app.js          # Workshop 2 logic
    ├── w3/
    │   ├── index.html      # Workshop 3
    │   └── app.js          # Workshop 3 logic
    └── w4/
        ├── index.html      # Workshop 4
        └── app.js          # Workshop 4 logic
```

**Hub page** (`/hub/`): Self-contained dashboard (own `<style>` block, not Reveal-based) listing all 4 classes with dates and topic names — sidebar nav + class cards, both linking to `/`, `/workshops/w2/`, `/workshops/w3/`, `/workshops/w4/`.

---

## Tech Stack

### Reveal.js 5.1.0

Both workshops use identical HTML structure:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reset.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/theme/black.css">
<link rel="stylesheet" href="workshop-theme.css">   <!-- ../../workshop-theme.css for w2 -->
```

**Reveal init config — both workshops use identical values (do not change without testing on iOS Safari):**
```js
Reveal.initialize({
  hash: true,
  width: '90%',
  height: 900,
  margin: 0.06,
  center: true,
});
```

Do NOT add: `window.innerWidth/Height`, fixed pixel widths, `minScale/maxScale`, `requestAnimationFrame` wrappers — all were tried and caused blank/invisible slides on iOS Safari.

**Mobile scaling math:** With `width: '90%'` on a 390px iPhone, slide canvas = 351px. Reveal applies `transform: scale()` so usable width after the 6% margin ≈ 295px. Media queries fire on the actual viewport (390px), not the scaled canvas — so `@media (max-width: 640px)` correctly targets phones even though the canvas is narrower.

### iOS Safari compositing bug (FIXED — do not regress)

Setting `background` on `.reveal` itself creates a separate compositing layer on iOS Safari that renders on top of slide content, making everything invisible. The fix: **never set `background` on `.reveal`**. Only set it on `body` and `.reveal-viewport`. This is why `style.css` is not linked — it had `background: var(--bg) !important` on `.reveal`.

`workshop-theme.css` correctly sets:
```css
body, .reveal-viewport { background: var(--bg) !important; }
/* .reveal — NO background rule here */
```

### Fonts

- **Poppins 600/700** — all headings (`h1`, `h2`, `h3`, `h4`)
- **DM Sans 400/500** — all body text
- Reveal's default `text-transform: uppercase` on headings is overridden to `none`
- Heading `letter-spacing: -0.025em` for tight modern feel

### CSS architecture

`workshop-theme.css` (shared, in root, `../../workshop-theme.css` from w2):
- Typography overrides (Poppins headings, DM Sans body, no uppercase, tight kerning)
- Table styles: no border lines, alternating row tints at 4% white opacity
- `.song-link` base: no underline, no border/bg, hover opacity
- Evidence card grid (`.evidence-grid`, `.evidence-card`)
- Playlist table (`.playlist-table`, `.playlist-create-btn`)
- Song overlay (`.song-overlay`, `.song-card`, `.platform-btn`)
- W1 activity: drag-and-drop zones and card pool
- W2 activity: zoom-map inputs and seed card pool
- **Mobile responsive section at end of file** (see Mobile Responsive Design below)

`style.css` — exists but is **not linked anywhere**. Contains old styles from before the iOS Safari fix. Do not link it.

---

## Mobile Responsive Design

### Strategy

Reveal.js scales the entire slide canvas via `transform: scale()`. This means inline styles can't be overridden by media queries without `!important` — so JS-rendered HTML elements that need mobile overrides must have **CSS class hooks** added so `workshop-theme.css` can target them.

**Key class hooks added to JS-rendered HTML:**

| Class | Element | Where |
|-------|---------|--------|
| `.hook-h2` | Hook slide `<h2>` | W1 `app.js` hook case |
| `.era-card` | Each era column div | W1 `app.js` eras case |
| `.eras-grid` | Era grid wrapper | W1 `app.js` eras case |
| `.table-wrap` | Wrapper around structures table | W1 `app.js` table case |
| `.evidence-answer` | "No." paragraph | W1 `app.js` evidence case |
| `.casestudy-body` | Body paragraph wrapper | W1 `app.js` casestudy case |
| `.comparison-grid` | Comparison slide grid | W2 `app.js` comparison case |
| `.contrast-grid` | Contrast slide grid | W2 `app.js` contrast case |

### Reveal quirks that affect mobile

- **`overflow: hidden` on `<section>`**: Prevents horizontal scroll inside slides. A `overflow-x: auto` child wrapper does nothing. Fix: hide columns (`display: none`) instead of scrolling.
- **`word-wrap: break-word` on headings**: Causes mid-character line breaks on narrow canvases. Override: `overflow-wrap: normal !important; word-wrap: normal !important`.
- **`em` values inherit Reveal base (~40px)**: Not browser default 16px. Budget accordingly.
- **Hero modal is outside Reveal transform** (`position: fixed` appended to `body`): A `min-width` value physically overflows phone screens. Must be removed.

### Breakpoints in `workshop-theme.css`

**`@media (max-width: 900px)` — Tablet:**
- Evidence grid: 3-col → 2-col
- Hero modal: remove fixed `min-width`, cap at `min(90vw, 560px)`
- W2 zoom-map seed panel: stacks below instead of side-by-side

**`@media (max-width: 640px)` — Phone (~295px usable canvas):**
- Slide padding tightened to 14px 20px
- All multi-column grids (`eras-grid`, `evidence-grid`, `comparison-grid`, `contrast-grid`) → 1 column
- `h2` font-size 1.2em, hook `h2` 1.6em (prevents mid-word breaks)
- Structures table: last (Example) column hidden — can't scroll inside Reveal section
- Slide 3 eras: gap/padding/margins tightened so 3 cards fit
- Slide 5 evidence: art height 36px, card notes hidden, "No." shrunk to 1.2em
- Slide 7 case study: body `<p>` margin-top 0.2em (body is split `<p>` elements, not `<br><br>`)
- Slide 9 activity: `.activity-view` hidden, `.activity-mobile-msg` shown (drag-and-drop requires pointer events, not touch)
- Song card, playlist header, hero modal all adjusted for narrow widths

---

## Slide System

Each workshop's `app.js` defines:
- `SONGS` — song registry `{ id: { title, artist, year } }`
- `PLAYLIST_GROUPS` — ordered groups for the playlist slide
- `SLIDES` — array of slide data objects
- `renderSlide(slide, index)` — switch on `slide.type`, returns HTML string
- `buildSlides()` — iterates `SLIDES`, creates `<section>` elements, appends to `#slides-container`

The activity slide is built by `buildActivity(section)` (separate DOM approach, not innerHTML).

### Slide types (W1)

| Type | Description |
|------|-------------|
| `hook` | Large headline, sub-body. Fixed 2.8em font-size (not r-fit-text) to prevent overflow |
| `structure` | Block sequence (A B A B C B B) + legend. Centered. Explanatory text removed |
| `eras` | 3-column grid — each era: year (dim) → song title (bold, clickable) → ARTIST (small caps) → mini blocks |
| `table` | Alternatives table — subtle alternating rows, no bold borders |
| `evidence` | Headline + big "No." answer + 3-card grid with coloured art headers |
| `hero` | Hero's Journey parallel table |
| `casestudy` | Headline + subhead + body text (0.65em, line-height 1.65) + listen button |
| `thesis` | Two-line split headline (line 1 dim, line 2 full), small cue below |
| `playlist` | Streaming-service numbered table + green "Create Playlist" button |
| `activity` | Built by `buildActivity()` — drag-and-drop skeleton builder |

### Slide types (W2)

| Type | Description |
|------|-------------|
| `hook` | Same as W1 hook |
| `comparison` | Two-column Topic vs. Subject grid |
| `contrast` | Weak→strong example pairs with arrow |
| `camera` | Headline + body + bullet cues |
| `zoom` | Vertical stack of zoom levels (theme → angle → scene) with ↓ arrows |
| `casestudy` | Same as W1 casestudy |
| `thesis` | Same as W1 thesis |
| `playlist` | Same as W1 playlist |
| `activity` | Built by `buildActivity()` — zoom-in map text inputs |

### Slide types (W3)

| Type | Description |
|------|-------------|
| `title`, `hook`, `comparison`, `contrast`, `casestudy`, `thesis`, `playlist` | Same renderers as W1/W2 |
| `clichetable` | New type — 3-col table (Retire this / Why it fails / Try asking instead), reuses `.table-wrap` |
| `activity` | Built by `buildActivity()` — The Rewrite Game (click-based, see below) |

### Slide types (W4)

| Type | Description |
|------|-------------|
| `title`, `hook`, `comparison`, `casestudy`, `thesis`, `playlist` | Same renderers as W1/W2 |
| `activity` | Built by `buildActivity()` — The Assembly Session (stage sprint board with timer, see below) |

---

## Song Overlay

Every `<button class="song-link" data-song="[id]">` opens a streaming links modal. The overlay is handled by `openSongOverlay(songId)` / `closeSongOverlay()`. The modal shows the song title + 4 platform links (Spotify, Apple Music, YouTube Music, YouTube) constructed as search URLs.

Click handler is attached globally in `init()`:
```js
document.addEventListener('click', e => {
  const btn = e.target.closest('.song-link');
  if (btn) { openSongOverlay(btn.dataset.song); return; }
  if (e.target.closest('.overlay-backdrop') || e.target.closest('.overlay-close')) closeSongOverlay();
  const copyBtn = e.target.closest('#playlist-copy-btn');
  if (copyBtn) { handlePlaylistCopy(copyBtn); return; }
});
```

---

## Playlist Slide

Displays songs in a numbered streaming-service table: `# | Title | Artist | Year`, grouped by section with dim uppercase group headers.

**"Create Playlist ↗" button** (Spotify green):
1. Formats song list as `Song Title - Artist` (one per line)
2. Copies to clipboard
3. Opens https://spotlistr.com in a new tab
4. Button text changes to "Copied! Opening Spotlistr…" for 3 seconds

On Spotlistr the user pastes the clipboard content to generate a Spotify / Apple Music / YouTube playlist automatically.

---

## Workshop 1: Know the Rules So You Can Break Them

**Songs:** Your Cheatin' Heart (Hank Williams, 1953), Hey Jude (The Beatles, 1968), Last Night (Morgan Wallen, 2023), The Times They Are A-Changin' (Bob Dylan, 1964), Over the Rainbow (Judy Garland, 1939), Jolene (Dolly Parton, 1973), Bohemian Rhapsody (Queen, 1975), A Day in the Life (The Beatles, 1967), What's Going On (Marvin Gaye, 1971), Fast Car (Tracy Chapman, 1988), Hurt (Johnny Cash, 2002), Alright (Kendrick Lamar, 2015), Don't Dream It's Over (Crowded House, 1986)

**Activity — Build Your Skeleton:**
- 7 drop zones: V1, Pre-Ch, Ch1, V2, Ch2, Bridge, Outro
- 10 draggable phrase cards (e.g. "The drive home after the fight")
- Pointer Events API drag-and-drop (works on desktop; hidden on mobile — see Mobile Responsive Design)
- Drag ghost is `position: fixed` to work under Reveal's CSS scale transform
- Reset button clears all placements
- On phones (≤640px): `.activity-view` is hidden; `.activity-mobile-msg` shows "Open on a laptop" prompt

---

## Workshop 2: What Are You Actually Saying?

**Songs:** The River (Bruce Springsteen, 1980), Fast Car (Tracy Chapman, 1988), The Night They Drove Old Dixie Down (The Band, 1969), Allentown (Billy Joel, 1982), Supermarket Flowers (Ed Sheeran, 2017)

**Activity — The Zoom-In Map:**
- Three-level form: Theme (input) → Your Angle (textarea) → The Scene (textarea)
- "Can you point a camera at this?" prompt appears when Scene field is focused
- 12 seed theme cards (click to populate Theme field)
- Reset button clears all fields

---

## Workshop 3: What Do You Sound Like?
*Voice, Language & Lyric*

**Songs:** A Case of You (Joni Mitchell, 1971 — case study), Visions of Johanna (Bob Dylan, 1966), Tangled Up in Blue (Bob Dylan, 1975), Skinny Love (Bon Iver, 2007), Linger (The Cranberries, 1993)

Writing *about* vs. writing *from inside*. Cliché vs. specific. A "Five Lines Worth Retiring" table (`clichetable` slide type). Case study on Joni Mitchell's hyper-specific imagery.

**Activity — The Rewrite Game:**
- Pick a clichéd line from a pool of 8 cards (e.g. "My heart is broken in two")
- Rewrite it from inside in a textarea
- 8 "specificity prompt" chips (e.g. "A smell from that time") — click to insert a `[prompt: ]` cue into the rewrite
- Click-based (not drag-and-drop) — works on touch devices, so it is **shown** on mobile (uses `.touch-activity` modifier class to override the W1 "hide on mobile" rule)
- Reset button clears selection, textarea, and used-chip states

---

## Workshop 4: How Do You Finish Anything?
*From Fragment to Song*

**Songs:** Yesterday (The Beatles, 1965 — case study), Hallelujah (Leonard Cohen, 1984), Blackbird (The Beatles, 1968), Africa (Toto, 1982), Don't Stop Believin' (Journey, 1981)

Reframes "I'm not feeling it" as fear of finishing. Defines the Minimum Viable Draft (a complete, rough structure beats a polished fragment). Case study: McCartney finished "Yesterday"'s melody with placeholder "Scrambled Eggs" lyrics to hold its shape.

**Activity — The Assembly Session:**
- 4-stage sprint board: Verse (15 min) → Chorus (15 min) → Bridge (10 min) → Read Aloud (5 min)
- Each stage shows a prompt, a live mm:ss countdown timer (Start/Pause), and a textarea (Read Aloud stage shows a no-writing note instead)
- Stage pills along the top act as a tracker — click to jump to any stage; `← Back` / `Next Stage →` for linear navigation
- Click-based — also uses `.touch-activity` to stay visible on mobile
- Reset stops the timer, clears all textareas, and returns to stage 1
- State stored in module-level `assembly` object; `assembly.root` holds a reference to the activity's wrapper element so DOM queries work even before the section is appended to the document (the render function runs synchronously during `buildActivity()`, before `buildSlides()` appends the `<section>`)

---

## Pending / Future Work

- **Real-time student sync** — Stretch goal: students see each other's activity responses live. Would require Cloudflare Workers + D1
- **Artist/album images** — Evidence cards use coloured gradient placeholders. Framework is in place (`.evidence-card-art` div); real images could be added via an `art` URL field in `SONGS`

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
- Workshop 2: https://songwriting-workshop.pages.dev/workshops/w2/
- Repo: https://github.com/dougmcarthur/songwriting-workshop
- Program page: https://goodskystudio.com/the-pro-artist-series/
- Studio site: https://goodskystudio.com
