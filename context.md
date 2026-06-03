# Songwriting Workshop — Project Context & Structure

## About This Project

An interactive web slideshow for the **Pro Artist Series Songwriting Track** at **Good Sky Studio** (goodskystudio.com). Built for instructor **Doug McArthur** to use in a 4-week workshop series starting July 2026.

Students join a live session by scanning a QR code. The instructor controls the slides from a projected screen. When activity time begins, the student view switches from a read-along companion into a hands-on interactive tool — all in the same URL, no app install required.

-----

## Deployment

- **Repo:** `songwriting-workshop` (private GitHub)
- **Hosting:** Cloudflare Pages, auto-deploys on push to `main`
- **Pattern:** Same pipeline as `links.dougmcarthur.net`
- **Stack:** Single-page HTML/CSS/JS — no framework required, keep it lean and fast on mobile

-----

## The Program

**Good Sky Studio — Pro Artist Series**

- 8-week program, 60-minute sessions, 6–10 students per cohort
- $349 full price / $299 early bird
- Four parallel tracks: Voice, Guitar, Percussion, Songwriting
- Songwriting track: Doug McArthur weeks 1–4, visiting songwriter weeks 5–8

**Brand tone:** Science-backed, artist-led, judgment-free. Warm but direct. Premium feel — these are serious, paying students.

**Workshop philosophy:** Brevity, levity, and a sense of fun. No hand-holding, no intimidation.

-----

## Session Structure (All 4 Workshops)

Every session follows the same format:

- **0:00–0:15** → Concept block (instructor-led, projected slides)
- **0:15–1:00** → Activity (students switch to interactive mode on their devices)

-----

## Workshop 1: Know the Rules So You Can Break Them

**Theme:** Song structure — from standard radio form to rule-breaking alternatives

### Concept Block Slides (15 min)

1. **Opening provocation** — “Every song you’ve ever loved has a skeleton”
1. **The Standard Map: ABABCBB** — Verse / Chorus / Bridge breakdown
1. **The Map in Action** — Same structure across eras (Hank Williams → Beatles → current chart hit)
1. **Other Structures Worth Knowing:**

|Structure        |Description               |Example                                 |
|-----------------|--------------------------|----------------------------------------|
|AAA              |Verses only, no chorus    |“The Times They Are A-Changin’” — Dylan |
|AABA             |Verse/verse/bridge/verse  |“Over the Rainbow,” jazz standards      |
|Verse-Chorus only|No bridge                 |“Jolene” — Dolly Parton                 |
|Through-composed |Never repeats             |“Bohemian Rhapsody,” “A Day in the Life”|
|One-section loop |Single section that builds|“What’s Going On” — Marvin Gaye         |

1. **Do songs need a chorus?** — “Fast Car,” “Hurt,” “Alright” as evidence they don’t
1. **The Hero’s Journey parallel** — Same question, different art form:

|Hero’s Journey         |Song Structure                              |
|-----------------------|--------------------------------------------|
|Ordinary World         |Verse 1 — establish where we are            |
|The Call               |Pre-chorus or late V1 turn                  |
|Crossing the Threshold |First Chorus — the feeling lands            |
|Trials & Transformation|Verse 2, building tension                   |
|The Ordeal             |Bridge — everything gets complicated        |
|The Return, Changed    |Final Chorus — same words, different meaning|

1. **Case study: “Don’t Dream It’s Over” — Crowded House (1986)** — A Hero’s Journey that refuses to complete. The final chorus doesn’t bring the hero home — it insists, almost desperately. Unresolved for 40 years. Nobody’s tired of it.
1. **The thesis:** Structure isn’t the cage. It’s the launching pad.

### Activity: Build Your Skeleton (45 min)

Students see a canvas with labeled drop zones and a set of floating phrase/topic cards to drag into a song structure. No right answer — the act of choosing teaches the lesson.

**Drop zones:** V1, Pre-Ch, Ch1, V2, Ch2, Bridge, Outro (configurable)

**Floating cards (sample set):**

- “I used to believe in something”
- “The drive home after the fight”
- “3am, can’t sleep again”
- “Everything I thought I knew”
- “But maybe we could try”
- “The version of you I invented”
- “Standing in the parking lot”
- “I should have said it then”
- “Nothing left to prove”
- “Same song, different words”

**Stretch goal:** Students can see a ghosted/summarized view of what others in the room are arranging in real time (6–10 students max, so this is feasible without chaos).

-----

## Workshops 2–4 (Curriculum Developed, Not Yet Built)

### Workshop 2: What Are You Actually Saying?

*Finding Your Subject*

- Concept: Topic vs. subject. Specificity is the game. The “camera angle.”
- Activity: The Zoom-In Map (broad theme → personal → specific filmable scene)

### Workshop 3: What Do You Sound Like?

*Voice, Language & Lyric*

- Concept: Writing *about* vs. writing *from inside*. Plain vs. poetic language. The cliché ban.
- Activity: The Rewrite Game (write a verse in clichés, swap papers, rewrite to be specific and weird)

### Workshop 4: How Do You Finish Anything?

*From Fragment to Song*

- Concept: Finishing is a skill. The Minimum Viable Draft.
- Activity: The Assembly Session (structured sprint: 15 min verse / 15 min chorus / 10 min bridge / 5 min read aloud)

-----

## Suggested File Structure

```
songwriting-workshop/
├── index.html           # Workshop 1 slideshow + activity (single file to start)
├── style.css            # Shared styles (extract once we have >1 workshop)
├── app.js               # Slide control + activity logic
├── workshops/
│   ├── w1/              # Future: workshop-specific assets
│   ├── w2/
│   ├── w3/
│   └── w4/
├── assets/
│   ├── logo-gss.png     # Good Sky Studio logo (pull from goodskystudio.com)
│   └── fonts/           # If self-hosting any typography
└── README.md
```

**Start simple:** `index.html` as a single self-contained file is fine for Workshop 1 testing. Refactor into components once the structure is validated on real devices.

-----

## Design Direction

- Pull visual identity from goodskystudio.com — match their palette and feel
- Premium, not generic — this is a $349 program, materials should reflect that
- Warm, direct, a little irreverent — not corporate, not precious
- Must work beautifully on phones (students) and a projected laptop screen (instructor)
- QR code on slide 1 — students scan to join, land on the companion/activity view
- Avoid: purple gradients, system fonts, anything that looks like a default template

-----

## Key Context Links

- Program page: <https://goodskystudio.com/the-pro-artist-series/>
- Studio site: <https://goodskystudio.com>
- Logo asset: <https://i0.wp.com/goodskystudio.com/wp-content/uploads/2025/02/logo-gss-1.png>