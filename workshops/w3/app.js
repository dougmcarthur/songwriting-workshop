'use strict';

// ─── Song registry ───────────────────────────────────────────────────────────

const SONGS = {
  'a-case-of-you': {
    title: 'A Case of You',
    artist: 'Joni Mitchell',
    year: '1971',
  },
  'visions-of-johanna': {
    title: 'Visions of Johanna',
    artist: 'Bob Dylan',
    year: '1966',
  },
  'tangled-up-in-blue': {
    title: 'Tangled Up in Blue',
    artist: 'Bob Dylan',
    year: '1975',
  },
  'skinny-love': {
    title: 'Skinny Love',
    artist: 'Bon Iver',
    year: '2007',
  },
  'linger': {
    title: 'Linger',
    artist: 'The Cranberries',
    year: '1993',
  },
};

const PLATFORMS = [
  { id: 'spotify',      name: 'Spotify',       bg: '#1DB954', fg: '#000' },
  { id: 'appleMusic',   name: 'Apple Music',   bg: '#FC3C44', fg: '#fff' },
  { id: 'youtubeMusic', name: 'YouTube Music', bg: '#212121', fg: '#FF4040' },
  { id: 'youtube',      name: 'YouTube',       bg: '#FF0000', fg: '#fff' },
];

const PLAYLIST_GROUPS = [
  { label: 'Case Study',
    songs: ['a-case-of-you'] },
  { label: 'Voice in Action',
    songs: ['visions-of-johanna', 'tangled-up-in-blue', 'skinny-love', 'linger'] },
];

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 'title',
    type: 'title',
    classNumber: 3,
    date: 'July 21, 2026',
    headline: 'What Do You\nSound Like?',
  },
  {
    id: 'hook',
    type: 'hook',
    eyebrow: 'Workshop 3  ·  Good Sky Studio',
    headline: 'Every lyric you write\nsounds like someone.\nThe question is who.',
    body: 'Today we find the line between borrowing and becoming.',
  },
  {
    id: 'about-vs-inside',
    type: 'comparison',
    eyebrow: 'Two ways into a line',
    headline: 'Writing About vs. Writing From Inside',
    left: {
      label: 'About',
      desc: 'Describing a feeling from outside it.',
      items: [
        '"She was sad that day"',
        '"He felt so alone"',
        '"Heartbreak hurts so bad"',
        '"Time heals everything"',
        '"We were young and free"',
      ],
      note: 'Reportable. Anyone could say it.',
    },
    right: {
      label: 'From Inside',
      desc: 'Living inside the feeling as you write it.',
      items: [
        '"I keep her toothbrush in the cup, still"',
        '"I set two plates before I remember"',
        '"I learned to drive so I wouldn\'t have to talk in the car"',
        '"Some days the healing just means I forgot to check"',
        '"We thought the rules were for other people"',
      ],
      note: 'Felt. Only you could say it this way.',
    },
  },
  {
    id: 'cliche-vs-specific',
    type: 'contrast',
    eyebrow: 'The retirement list',
    headline: 'Cliché is a shortcut.\nSpecific is the truth.',
    pairs: [
      {
        label: 'Heartbreak',
        weak: '"My heart is broken in two"',
        strong: '"I keep setting out two coffee cups\nout of habit, every morning"',
        note: 'The cliché names the feeling. The image proves it.',
      },
      {
        label: 'Nostalgia',
        weak: '"Those were the best days of my life"',
        strong: '"You can still see where we carved our names —\nthe tree\'s twice as wide now"',
        note: 'One states a verdict. The other hands you a place to stand.',
      },
    ],
  },
  {
    id: 'cliche-table',
    type: 'clichetable',
    eyebrow: 'Five lines worth retiring',
    headline: 'If you\'ve heard it\na thousand times,\nso has everyone else.',
    rows: [
      {
        cliche: '"My heart is broken in two"',
        why: 'Names the feeling instead of showing it',
        instead: 'What does a broken heart make you DO? Show that.',
      },
      {
        cliche: '"I can\'t live without you"',
        why: 'Hyperbole that asks to be believed, not felt',
        instead: 'What\'s the smallest task that feels impossible without them?',
      },
      {
        cliche: '"Time heals all wounds"',
        why: 'A proverb, not an observation',
        instead: 'What does week six actually look like for you?',
      },
      {
        cliche: '"Tears like rain"',
        why: 'Borrowed imagery — heard a thousand times',
        instead: 'What did your face actually do? Where did you hide it?',
      },
      {
        cliche: '"You light up my world"',
        why: 'A greeting-card phrase standing in for a feeling',
        instead: 'What did they change about an ordinary Tuesday?',
      },
    ],
  },
  {
    id: 'casestudy',
    type: 'casestudy',
    eyebrow: 'Case study',
    headline: '"A Case of You"',
    subhead: 'Joni Mitchell, 1971',
    songId: 'a-case-of-you',
    body: 'Topic: love, longing, the way one person can take up all the space in you.\nSubject: A specific night, a specific bar, a drawing of the Northern Lights on a napkin.\n\n"I could drink a case of you, darling, and still be on my feet" — devotion turned into something you can taste, measure, survive. Not "I love you so much." This much. Measured in cases.\n\nFifty years later, it still sounds like she\'s telling you a secret — because the details are too odd, too specific, to be anyone\'s but hers.',
  },
  {
    id: 'thesis',
    type: 'thesis',
    eyebrow: 'The point',
    headline: 'Your voice isn\'t something\nyou find. It\'s something\nyou stop hiding.',
    cue: '→ Activity starts now.',
  },
  {
    id: 'playlist',
    type: 'playlist',
    eyebrow: 'Workshop 3 Playlist',
    headline: 'Songs studied\ntoday.',
  },
  { id: 'activity', type: 'activity' },
];

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  buildSlides();
  // Keep in sync with app.js
  Reveal.initialize({
    hash: true,
    width: '90%',
    height: 900,
    margin: 0.06,
    center: true,
  });
  document.addEventListener('click', e => {
    const btn = e.target.closest('.song-link');
    if (btn) { openSongOverlay(btn.dataset.song); return; }
    if (e.target.closest('.overlay-backdrop') || e.target.closest('.overlay-close')) closeSongOverlay();
    const copyBtn = e.target.closest('#playlist-copy-btn');
    if (copyBtn) { handlePlaylistCopy(copyBtn); return; }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.querySelector('.song-overlay')) {
      closeSongOverlay(); e.stopImmediatePropagation();
    }
  });
}

// ─── Build slides ─────────────────────────────────────────────────────────────

function buildSlides() {
  const container = document.getElementById('slides-container');
  SLIDES.forEach((slide, i) => {
    const section = document.createElement('section');
    if (slide.type === 'activity') {
      buildActivity(section);
    } else {
      section.innerHTML = renderSlide(slide, i);
    }
    container.appendChild(section);
  });
}

// ─── Slide renderers ──────────────────────────────────────────────────────────

function nl(str) { return esc(str).replace(/\n/g, '<br>'); }

function eyebrowHtml(text) {
  return text
    ? `<p style="font-size:0.45em;text-transform:uppercase;letter-spacing:.15em;opacity:0.55;margin:0 0 0.4em">${esc(text)}</p>`
    : '';
}

function renderSlide(slide, index) {
  const ey = eyebrowHtml(slide.eyebrow);

  switch (slide.type) {

    case 'hook':
      return `
        ${ey}
        <h2 style="font-size:2.8em;line-height:1.1;margin-bottom:0.4em;letter-spacing:-0.03em">${nl(slide.headline)}</h2>
        <p style="font-size:0.72em;opacity:0.72;margin:0">${nl(slide.body)}</p>
      `;

    case 'comparison': {
      const col = side => `
        <div style="border-top:2px solid rgba(255,255,255,0.25);padding-top:0.75em">
          <h3>${esc(side.label)}</h3>
          <p style="font-size:0.65em;opacity:0.8">${esc(side.desc)}</p>
          <ul style="font-size:0.65em">${side.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
          <p style="font-size:0.55em;opacity:0.55;margin-top:0.5em"><em>${esc(side.note)}</em></p>
        </div>
      `;
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <div class="comparison-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2em;margin-top:0.5em">${col(slide.left)}${col(slide.right)}</div>
      `;
    }

    case 'contrast': {
      const pairs = slide.pairs.map(p => `
        <div style="margin-bottom:0.75em">
          <p style="font-size:0.55em;opacity:0.55;margin-bottom:0.3em;text-transform:uppercase;letter-spacing:.05em">${esc(p.label)}</p>
          <div class="contrast-grid" style="display:grid;grid-template-columns:1fr auto 1fr;gap:0.75em;align-items:center;font-size:0.7em">
            <div style="padding:0.5em 0.75em;border:1px solid rgba(255,255,255,0.2);border-radius:4px;opacity:0.55">${esc(p.weak)}</div>
            <span style="opacity:0.4">→</span>
            <div style="padding:0.5em 0.75em;border:1px solid rgba(255,255,255,0.6);border-radius:4px">${esc(p.strong)}</div>
          </div>
          <p style="font-size:0.55em;opacity:0.5;margin-top:0.3em"><em>${esc(p.note)}</em></p>
        </div>
      `).join('');
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <div style="margin-top:0.5em">${pairs}</div>
      `;
    }

    case 'clichetable': {
      const rows = slide.rows.map(r => `
        <tr>
          <td style="font-weight:600;opacity:0.85">${esc(r.cliche)}</td>
          <td style="opacity:0.6">${esc(r.why)}</td>
          <td>${esc(r.instead)}</td>
        </tr>
      `).join('');
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <div class="table-wrap">
          <table style="font-size:0.62em;margin-top:0.5em">
            <thead><tr><th>Retire this</th><th>Why it fails</th><th>Try asking instead</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    }

    case 'casestudy': {
      const listenBtn = slide.songId
        ? `<p style="margin-top:0.8em"><button class="song-link" data-song="${slide.songId}" style="border:1px solid rgba(255,255,255,0.35);padding:0.35em 1em;border-radius:4px;font-size:0.6em">Listen to this song ↗</button></p>`
        : '';
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <h3 style="opacity:0.7;font-size:0.9em;margin-top:0.1em">${esc(slide.subhead)}</h3>
        <p style="font-size:0.65em;line-height:1.65;margin-top:0.6em" class="casestudy-body">${nl(slide.body)}</p>
        ${listenBtn}
      `;
    }

    case 'thesis': {
      const [line1, ...rest] = slide.headline.split('\n');
      const line2 = rest.join('\n');
      return `
        ${ey}
        <h2 style="opacity:0.35">${esc(line1)}</h2>
        <h2>${esc(line2)}</h2>
        <p style="font-size:0.5em;opacity:0.55;margin-top:1em">${esc(slide.cue)}</p>
      `;
    }

    case 'playlist': {
      let num = 0;
      const rows = PLAYLIST_GROUPS.map(g => {
        const groupRow = `<tr class="pl-group-row"><td class="col-num"></td><td colspan="3">${esc(g.label)}</td></tr>`;
        const songRows = g.songs.map(sid => {
          const song = SONGS[sid];
          if (!song) return '';
          num++;
          return `
            <tr class="pl-song-row">
              <td class="col-num">${num}</td>
              <td class="pl-title"><button class="song-link" data-song="${sid}">${esc(song.title)}</button></td>
              <td class="pl-artist">${esc(song.artist)}</td>
              <td class="col-year">${esc(song.year)}</td>
            </tr>
          `;
        }).join('');
        return groupRow + songRows;
      }).join('');
      return `
        ${ey}
        <div class="playlist-header">
          <h2 style="font-size:1.3em;margin:0">${nl(slide.headline)}</h2>
          <button class="playlist-create-btn" id="playlist-copy-btn">Create Playlist ↗</button>
        </div>
        <table class="playlist-table">
          <thead><tr>
            <th class="col-num">#</th>
            <th>Title</th>
            <th>Artist</th>
            <th class="col-year">Year</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    case 'title':
      return `
        <div class="title-slide">
          <p class="title-eyebrow">Good Sky Studio &middot; Pro Artist Series &middot; Songwriting Track</p>
          <h2 class="title-headline">${nl(slide.headline)}</h2>
          <p class="title-meta">Class ${slide.classNumber} of 4 &middot; ${esc(slide.date)}</p>
        </div>
      `;

    default:
      return `<p>Slide ${index + 1}</p>`;
  }
}

// ─── Playlist → Spotlistr ─────────────────────────────────────────────────────

function handlePlaylistCopy(btn) {
  const lines = [];
  PLAYLIST_GROUPS.forEach(g => {
    g.songs.forEach(sid => {
      const s = SONGS[sid];
      if (s) lines.push(`${s.title} - ${s.artist}`);
    });
  });
  const text = lines.join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied! Opening Spotlistr…';
    btn.classList.add('copied');
    window.open('https://spotlistr.com', '_blank', 'noopener,noreferrer');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 3000);
  }).catch(() => {
    window.open('https://spotlistr.com', '_blank', 'noopener,noreferrer');
  });
}

// ═══════════════════════════════════════════════════════════════
//  SONG OVERLAY
// ═══════════════════════════════════════════════════════════════

function buildStreamingLinks(title, artist) {
  const q = encodeURIComponent(`${title} ${artist}`);
  return {
    spotify:      `https://open.spotify.com/search/${q}`,
    appleMusic:   `https://music.apple.com/search?term=${q}`,
    youtubeMusic: `https://music.youtube.com/search?q=${q}`,
    youtube:      `https://www.youtube.com/results?search_query=${q}`,
  };
}

function openSongOverlay(songId) {
  const song = SONGS[songId];
  if (!song) return;

  closeSongOverlay();

  const links = buildStreamingLinks(song.title, song.artist);
  const wrap = el('div', 'song-overlay');

  const platformBtns = PLATFORMS.map(p => `
    <a href="${links[p.id]}"
       target="_blank"
       rel="noopener noreferrer"
       class="platform-btn"
       style="--p-bg:${p.bg};--p-fg:${p.fg}">
      <span class="platform-name">${esc(p.name)}</span>
      <span class="platform-arrow">↗</span>
    </a>
  `).join('');

  wrap.innerHTML = `
    <div class="overlay-backdrop"></div>
    <div class="song-card" role="dialog" aria-modal="true" aria-label="${esc(song.title)}">
      <div class="song-card-top">
        <div class="song-note" aria-hidden="true">♪</div>
        <div class="song-card-info">
          <div class="song-card-title">${esc(song.title)}</div>
          <div class="song-card-meta">${esc(song.artist)} · ${esc(song.year)}</div>
        </div>
        <button class="overlay-close" aria-label="Close">✕</button>
      </div>
      <div class="song-card-platforms">${platformBtns}</div>
    </div>
  `;

  document.body.appendChild(wrap);
  requestAnimationFrame(() => wrap.classList.add('open'));
}

function closeSongOverlay() {
  const existing = document.querySelector('.song-overlay');
  if (!existing) return;
  existing.classList.remove('open');
  existing.addEventListener('transitionend', () => existing.remove(), { once: true });
}

// ═══════════════════════════════════════════════════════════════
//  ACTIVITY — The Rewrite Game
// ═══════════════════════════════════════════════════════════════

const CLICHE_LINES = [
  'My heart is broken in two',
  'I can\'t stop thinking about you',
  'You were my whole world',
  'I\'m not the same since you left',
  'We were meant to be',
  'I\'da given you everything',
  'You light up my world',
  'Time heals all wounds',
];

const SPECIFICITY_PROMPTS = [
  'A smell from that time',
  'An object still in your space',
  'Something you do differently now',
  'A place you avoid',
  'The last thing they said',
  'A sound that brings it back',
  'What was on the table',
  'The exact time of day',
];

function buildActivity(section) {
  const wrap = el('div', 'activity-view touch-activity');

  const clicheCards = CLICHE_LINES.map(line =>
    `<button class="cliche-card" data-line="${esc(line)}">"${esc(line)}"</button>`
  ).join('');

  const promptChips = SPECIFICITY_PROMPTS.map(p =>
    `<button class="prompt-chip" data-prompt="${esc(p)}">${esc(p)}</button>`
  ).join('');

  wrap.innerHTML = `
    <div class="activity-header">
      <div>
        <div class="activity-title">The Rewrite Game</div>
        <div class="activity-sub">Pick a cliché. Rewrite it from inside. Make it yours.</div>
      </div>
      <button class="reset-btn" id="reset-btn">Reset</button>
    </div>
    <div class="rewrite-body">
      <div class="rewrite-pool-col">
        <div class="pool-heading">Pick a line to retire:</div>
        <div class="cliche-pool">${clicheCards}</div>
      </div>
      <div class="rewrite-work-col">
        <div class="rewrite-original" id="rewrite-original">Pick a line on the left to begin&hellip;</div>
        <textarea class="rewrite-input" id="rewrite-input" placeholder="Make it specific. Make it weird. Make it true." rows="4"></textarea>
        <div class="prompt-label">Stuck? Borrow a detail — click to add it to your rewrite:</div>
        <div class="prompt-pool">${promptChips}</div>
      </div>
    </div>
  `;

  section.appendChild(wrap);
  wrap.querySelector('#reset-btn').addEventListener('click', resetActivity);

  wrap.querySelectorAll('.cliche-card').forEach(card => {
    card.addEventListener('click', () => {
      wrap.querySelectorAll('.cliche-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const original = document.getElementById('rewrite-original');
      if (original) original.innerHTML = `Retiring: <span class="rewrite-original-line">&ldquo;${esc(card.dataset.line)}&rdquo;</span>`;
      document.getElementById('rewrite-input')?.focus();
    });
  });

  wrap.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const input = document.getElementById('rewrite-input');
      if (!input) return;
      const addition = `[${chip.dataset.prompt}: ]`;
      input.value = input.value ? `${input.value}\n${addition}` : addition;
      chip.classList.add('used');
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
  });
}

function resetActivity() {
  const original = document.getElementById('rewrite-original');
  if (original) original.innerHTML = 'Pick a line on the left to begin&hellip;';
  const input = document.getElementById('rewrite-input');
  if (input) input.value = '';
  document.querySelectorAll('.cliche-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.prompt-chip').forEach(c => c.classList.remove('used'));
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function el(tag, className) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  return e;
}

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
