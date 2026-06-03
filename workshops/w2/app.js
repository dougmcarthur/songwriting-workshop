'use strict';

// ─── Song registry ───────────────────────────────────────────────────────────

const SONGS = {
  'the-river': {
    title: 'The River',
    artist: 'Bruce Springsteen',
    year: '1980',
  },
  'fast-car': {
    title: 'Fast Car',
    artist: 'Tracy Chapman',
    year: '1988',
  },
  'the-night-they-drove-old-dixie-down': {
    title: 'The Night They Drove Old Dixie Down',
    artist: 'The Band',
    year: '1969',
  },
  'allentown': {
    title: 'Allentown',
    artist: 'Billy Joel',
    year: '1982',
  },
  'supermarket-flowers': {
    title: 'Supermarket Flowers',
    artist: 'Ed Sheeran',
    year: '2017',
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
    songs: ['the-river'] },
  { label: 'Specificity in Action',
    songs: ['fast-car', 'the-night-they-drove-old-dixie-down', 'allentown', 'supermarket-flowers'] },
];

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 'hook',
    type: 'hook',
    eyebrow: 'Workshop 2  ·  Good Sky Studio',
    headline: 'Every song has a topic.\nOnly the great ones\nhave a subject.',
    body: 'Today, we learn to tell the difference.',
  },
  {
    id: 'topic-vs-subject',
    type: 'comparison',
    eyebrow: 'Two things that look the same',
    headline: 'Topic vs. Subject',
    left: {
      label: 'Topic',
      desc: 'What the song is about.',
      items: [
        '"Heartbreak"',
        '"Home"',
        '"Growing up"',
        '"Loss"',
        '"Hope"',
      ],
      note: 'What anyone could write.',
    },
    right: {
      label: 'Subject',
      desc: 'What the song is really about.',
      items: [
        '"The 40-min drive home after we said it"',
        '"The house we couldn\'t sell after the split"',
        '"Being 17, knowing you\'re not staying"',
        '"The last voicemail you never deleted"',
        '"The call that changed the whole year"',
      ],
      note: 'What only you can write.',
    },
  },
  {
    id: 'vague-vs-specific',
    type: 'contrast',
    eyebrow: 'The gap between good and great',
    headline: 'Vague is forgettable.\nSpecific is unforgettable.',
    pairs: [
      {
        label: 'Grief',
        weak: '"I miss you every day"',
        strong: '"I still reach for my phone\nto tell you something I just saw"',
        note: 'Grief is the topic. The phone reflex is the subject.',
      },
      {
        label: 'Anger',
        weak: '"I\'m so angry right now"',
        strong: '"I folded all your shirts\nand put them in boxes\nwith the hands that loved you"',
        note: 'Anger is the topic. The folding is the subject.',
      },
    ],
  },
  {
    id: 'camera',
    type: 'camera',
    eyebrow: 'A cinematographer\'s trick',
    headline: 'Keep zooming until\nyou can film it.',
    body: 'Can you point a camera at this?\nCan you show it on a screen without explanation?\n\nIf not — zoom in.',
    cues: [
      '"Loneliness" — you can\'t film that.',
      '"She left on a Tuesday. She took the dog." — now you can.',
    ],
  },
  {
    id: 'zoom',
    type: 'zoom',
    eyebrow: 'The technique',
    headline: 'From wide shot\nto close-up.',
    levels: [
      {
        label: 'THEME',
        sublabel: 'Wide shot',
        example: '"Loss"',
        note: 'Broad. Universal. Not yet a song.',
      },
      {
        label: 'YOUR ANGLE',
        sublabel: 'Medium shot',
        example: '"Losing my dad before I had kids"',
        note: 'Personal territory. Getting warmer.',
      },
      {
        label: 'THE SCENE',
        sublabel: 'Close-up',
        example: '"The last voicemail I never deleted"',
        note: 'Specific. Filmable. This is a song.',
      },
    ],
  },
  {
    id: 'casestudy',
    type: 'casestudy',
    eyebrow: 'Case study',
    headline: '"The River"',
    subhead: 'Bruce Springsteen, 1980',
    songId: 'the-river',
    body: 'Topic: youth, lost dreams, regret.\nSubject: A specific couple. A specific summer. A specific river.\n\nVerse 1 alone: a graduation ceremony, a union card, a pregnant girlfriend, a borrowed wedding ring. Not "heartbreak." This heartbreak. Theirs. Yours.\n\n45 years later — still sounds like it\'s about you.',
  },
  {
    id: 'thesis',
    type: 'thesis',
    eyebrow: 'The point',
    headline: 'The more specific you are,\nthe more universal it becomes.',
    cue: '→ Activity starts now.',
  },
  {
    id: 'playlist',
    type: 'playlist',
    eyebrow: 'Workshop 2 Playlist',
    headline: 'Songs studied\ntoday.',
  },
  { id: 'activity', type: 'activity' },
];

// ─── State ────────────────────────────────────────────────────────────────────

const state = { placements: {} };

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  buildSlides();
  Reveal.initialize({
    hash: true,
    width: 1280,
    height: 720,
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

// ─── Controls ─────────────────────────────────────────────────────────────────

function setupControls() {
  const btn = document.getElementById('btn-fullscreen');
  if (!btn) return;
  btn.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', () => {
    btn.textContent = document.fullscreenElement ? '⊡' : '⛶';
    btn.title = document.fullscreenElement ? 'Exit fullscreen · F' : 'Fullscreen · F';
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}

// ─── Activity ─────────────────────────────────────────────────────────────────

function setupActivity() {
  document.getElementById('btn-activity')?.addEventListener('click', () => {
    Reveal.slide(SLIDES.length - 1);
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
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2em;margin-top:0.5em">${col(slide.left)}${col(slide.right)}</div>
      `;
    }

    case 'contrast': {
      const pairs = slide.pairs.map(p => `
        <div style="margin-bottom:0.75em">
          <p style="font-size:0.55em;opacity:0.55;margin-bottom:0.3em;text-transform:uppercase;letter-spacing:.05em">${esc(p.label)}</p>
          <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:0.75em;align-items:center;font-size:0.7em">
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

    case 'camera':
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <p>${esc(slide.body)}</p>
        <ul style="font-size:0.75em">${slide.cues.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      `;

    case 'zoom': {
      const levels = slide.levels.map((lv, i) => `
        <div style="display:flex;gap:1em;align-items:flex-start">
          <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:4px;padding:0.5em 0.75em;flex:1">
            <strong style="font-size:0.8em;opacity:0.7;text-transform:uppercase;letter-spacing:.05em">${esc(lv.label)}</strong>
            <p style="font-size:0.75em;opacity:0.65;margin:0.1em 0">${esc(lv.sublabel)}</p>
            <p style="font-size:0.85em;margin:0.2em 0">${esc(lv.example)}</p>
            ${lv.note ? `<p style="font-size:0.65em;opacity:0.5;margin-top:0.2em"><em>${esc(lv.note)}</em></p>` : ''}
          </div>
        </div>
        ${i < slide.levels.length - 1 ? '<p style="font-size:0.7em;opacity:0.35;margin:0.2em 0 0.2em 0.5em">↓ zoom in</p>' : ''}
      `).join('');
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <div style="display:flex;flex-direction:column;gap:0.25em;margin-top:0.5em;font-size:0.75em">${levels}</div>
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
        <p style="font-size:0.65em;line-height:1.65;margin-top:0.6em">${nl(slide.body)}</p>
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

// ─── QR Code ──────────────────────────────────────────────────────────────────

function generateQR() {
  const el_ = document.getElementById('qr-code-el');
  const urlEl = document.getElementById('qr-url-text');
  if (!el_) return;

  // Strip view=instructor but keep any other params
  const params = new URLSearchParams(window.location.search);
  params.delete('view');
  const qs = params.toString();
  const url = window.location.origin + window.location.pathname + (qs ? '?' + qs : '');

  if (urlEl) urlEl.textContent = url;

  if (typeof QRCode !== 'undefined') {
    new QRCode(el_, {
      text: url,
      width: 80,
      height: 80,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });
  } else {
    el_.textContent = url;
    el_.style.cssText = 'font-size:0.55rem;color:#666;word-break:break-all;padding:4px;';
  }
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
//  ACTIVITY — The Zoom-In Map
// ═══════════════════════════════════════════════════════════════

const SEED_THEMES = [
  'Loss', 'Love', 'Home', 'Failure',
  'Change', 'Fear', 'Belonging', 'Forgiveness',
  'Loneliness', 'Pride', 'Regret', 'Hope',
];

const ZOOM_LEVELS = [
  {
    num: 1,
    id: 'input-theme',
    label: 'THEME',
    sublabel: 'Where your song begins',
    placeholder: 'e.g. Loss, Love, Home…',
    type: 'input',
  },
  {
    num: 2,
    id: 'input-angle',
    label: 'YOUR ANGLE',
    sublabel: 'Your personal connection to it',
    placeholder: 'e.g. Losing my dad before I had kids',
    type: 'textarea',
  },
  {
    num: 3,
    id: 'input-scene',
    label: 'THE SCENE',
    sublabel: 'One specific, filmable moment',
    placeholder: 'e.g. The last voicemail I never deleted',
    type: 'textarea',
  },
];

function buildActivity(section) {
  const wrap = el('div', 'activity-view');

  const levels = ZOOM_LEVELS.map((lv, i) => {
    const inputEl = lv.type === 'textarea'
      ? `<textarea class="zoom-input" id="${lv.id}" placeholder="${lv.placeholder}" rows="3"></textarea>`
      : `<input type="text" class="zoom-input" id="${lv.id}" placeholder="${lv.placeholder}">`;

    const filmTest = lv.num === 3
      ? `<div class="zoom-film-test">Can you point a camera at this?</div>`
      : '';

    const connector = i < ZOOM_LEVELS.length - 1
      ? `<div class="zoom-step-arrow" aria-hidden="true">↓</div>`
      : '';

    return `
      <div class="zoom-level zoom-level-${lv.num}">
        <div class="zoom-level-head">
          <div class="zoom-level-num">${lv.num}</div>
          <div class="zoom-level-labels">
            <div class="zoom-level-label">${lv.label}</div>
            <div class="zoom-level-sublabel">${lv.sublabel}</div>
          </div>
        </div>
        ${inputEl}
        ${filmTest}
      </div>
      ${connector}
    `;
  }).join('');

  const seeds = SEED_THEMES.map(t =>
    `<button class="seed-card" data-theme="${t}">${t}</button>`
  ).join('');

  wrap.innerHTML = `
    <div class="activity-header">
      <div>
        <div class="activity-title">The Zoom-In Map</div>
        <div class="activity-sub">Start broad. Keep zooming. Stop when you can film it.</div>
      </div>
      <button class="reset-btn" id="reset-btn">Reset</button>
    </div>
    <div class="zoom-map-scroll">
      <div class="zoom-map">${levels}</div>
      <div class="seed-wrap">
        <div class="seed-label">Need a starting point? Pick a theme:</div>
        <div class="seed-pool">${seeds}</div>
      </div>
    </div>
  `;

  section.appendChild(wrap);
  wrap.querySelector('#reset-btn').addEventListener('click', resetActivity);

  wrap.querySelectorAll('.seed-card').forEach(card => {
    card.addEventListener('click', () => {
      const themeInput = document.getElementById('input-theme');
      if (themeInput) themeInput.value = card.dataset.theme;
      document.querySelectorAll('.seed-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      document.getElementById('input-angle')?.focus();
    });
  });

  const sceneInput = document.getElementById('input-scene');
  if (sceneInput) {
    sceneInput.addEventListener('focus', () => {
      document.querySelector('.zoom-film-test')?.classList.add('visible');
    });
    sceneInput.addEventListener('blur', () => {
      document.querySelector('.zoom-film-test')?.classList.remove('visible');
    });
  }
}

function resetActivity() {
  ZOOM_LEVELS.forEach(lv => {
    const input = document.getElementById(lv.id);
    if (input) input.value = '';
  });
  document.querySelectorAll('.seed-card').forEach(c => c.classList.remove('active'));
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
