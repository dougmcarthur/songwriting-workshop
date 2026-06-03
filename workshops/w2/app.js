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
];

// ─── State ────────────────────────────────────────────────────────────────────

const state = {
  view: 'student',
  tab: 'slides',
  slide: 0,
};

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  const params = new URLSearchParams(window.location.search);
  state.view = params.get('view') === 'instructor' ? 'instructor' : 'student';

  const app = document.getElementById('app');

  if (state.view === 'instructor') {
    app.appendChild(buildInstructorView());
    activateSlide(0, 'init');
    setupInstructorKeyboard();
  } else {
    app.appendChild(buildStudentView());
    switchStudentTab('slides');
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.song-link');
    if (btn) { openSongOverlay(btn.dataset.song); return; }
    if (e.target.closest('.overlay-backdrop') || e.target.closest('.overlay-close')) {
      closeSongOverlay();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSongOverlay();
  });
}

// ═══════════════════════════════════════════════════════════════
//  INSTRUCTOR VIEW
// ═══════════════════════════════════════════════════════════════

function buildInstructorView() {
  const root = el('div', 'instructor-view');
  const container = el('div', 'slides-container');
  container.id = 'slides-container';

  SLIDES.forEach((_, i) => {
    const s = el('div', 'slide');
    s.id = `slide-${i}`;
    s.dataset.index = i;
    container.appendChild(s);
  });

  const nav = el('nav', 'instructor-nav');
  nav.innerHTML = `
    <button class="nav-btn" id="nav-prev" aria-label="Previous" disabled>&#8592;</button>
    <div class="slide-progress" id="slide-progress">
      ${SLIDES.map((_, i) => `<button class="progress-dot" data-i="${i}" aria-label="Slide ${i+1}"></button>`).join('')}
    </div>
    <button class="nav-btn" id="nav-next" aria-label="Next">&#8594;</button>
    <span class="key-hint"><kbd>&#8592;</kbd>&nbsp;<kbd>&#8594;</kbd></span>
  `;

  root.appendChild(container);
  root.appendChild(nav);

  nav.querySelector('#nav-prev').addEventListener('click', () => activateSlide(state.slide - 1));
  nav.querySelector('#nav-next').addEventListener('click', () => activateSlide(state.slide + 1));
  nav.querySelectorAll('.progress-dot').forEach(dot => {
    dot.addEventListener('click', () => activateSlide(+dot.dataset.i));
  });

  return root;
}

function activateSlide(index, mode = 'forward') {
  index = Math.max(0, Math.min(SLIDES.length - 1, index));
  if (index === state.slide && mode !== 'init') return;

  const prev = document.querySelector('.slide.active');
  const next = document.getElementById(`slide-${index}`);
  if (!next) return;

  if (!next.dataset.rendered) {
    next.innerHTML = renderSlide(SLIDES[index], index);
    next.dataset.rendered = '1';
    if (index === 0) generateQR();
  }

  if (prev && prev !== next) {
    prev.classList.add('exiting');
    prev.addEventListener('transitionend', () => prev.classList.remove('active', 'exiting'), { once: true });
  }

  requestAnimationFrame(() => next.classList.add('active'));
  state.slide = index;

  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) nextBtn.disabled = index === SLIDES.length - 1;
  document.querySelectorAll('.progress-dot').forEach((d, i) =>
    d.classList.toggle('active', i === index)
  );
}

function setupInstructorKeyboard() {
  document.addEventListener('keydown', e => {
    if (document.querySelector('.song-overlay')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      activateSlide(state.slide + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      activateSlide(state.slide - 1);
    }
  });
}

// ─── Slide renderers ──────────────────────────────────────────────────────────

function renderSlide(slide, index) {
  const eyebrow = slide.eyebrow
    ? `<div class="slide-eyebrow">${esc(slide.eyebrow)}</div>`
    : '';

  switch (slide.type) {

    case 'hook':
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <p class="slide-body">${esc(slide.body)}</p>
        <div class="qr-block">
          <div class="qr-wrap" id="qr-code-el"></div>
          <div class="qr-info">
            <span class="qr-cta">Students: scan to follow along</span>
            <span class="qr-sub">Open on your phone — no install needed</span>
            <span class="qr-url" id="qr-url-text"></span>
          </div>
        </div>
      `;

    case 'comparison': {
      const col = (side, cls) => `
        <div class="cmp-col ${cls}">
          <div class="cmp-label">${esc(side.label)}</div>
          <div class="cmp-desc">${esc(side.desc)}</div>
          <ul class="cmp-list">
            ${side.items.map(item => `<li>${esc(item)}</li>`).join('')}
          </ul>
          <div class="cmp-note">${esc(side.note)}</div>
        </div>
      `;
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <div class="cmp-grid">
          ${col(slide.left, 'cmp-left')}
          <div class="cmp-divider"></div>
          ${col(slide.right, 'cmp-right')}
        </div>
      `;
    }

    case 'contrast': {
      const pairs = slide.pairs.map(p => `
        <div class="contrast-pair">
          <div class="contrast-pair-label">${esc(p.label)}</div>
          <div class="contrast-row">
            <div class="contrast-side weak">
              <div class="contrast-badge">vague</div>
              <div class="contrast-text">${esc(p.weak)}</div>
            </div>
            <div class="contrast-arrow">→</div>
            <div class="contrast-side strong">
              <div class="contrast-badge">specific</div>
              <div class="contrast-text">${esc(p.strong)}</div>
            </div>
          </div>
          <div class="contrast-note">${esc(p.note)}</div>
        </div>
      `).join('');
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <div class="contrast-pairs">${pairs}</div>
      `;
    }

    case 'camera': {
      const cues = slide.cues.map(c =>
        `<div class="camera-cue">${esc(c)}</div>`
      ).join('');
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <p class="slide-body">${esc(slide.body)}</p>
        <div class="camera-cues">${cues}</div>
      `;
    }

    case 'zoom': {
      const levels = slide.levels.map((lv, i) => {
        const connector = i < slide.levels.length - 1
          ? `<div class="zoom-slide-connector">↓</div>`
          : '';
        return `
          <div class="zoom-slide-lvl zoom-slide-lvl-${i + 1}">
            <div class="zoom-slide-tag">${esc(lv.label)}</div>
            <div class="zoom-slide-sublabel">${esc(lv.sublabel)}</div>
            <div class="zoom-slide-example">${esc(lv.example)}</div>
            <div class="zoom-slide-note">${esc(lv.note)}</div>
          </div>
          ${connector}
        `;
      }).join('');
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <div class="zoom-slide-diagram">${levels}</div>
      `;
    }

    case 'casestudy': {
      const listenBtn = slide.songId
        ? `<button class="song-link listen-btn" data-song="${slide.songId}">Listen to this song ↗</button>`
        : '';
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <p class="slide-subhead">${esc(slide.subhead)}</p>
        <p class="slide-body">${esc(slide.body)}</p>
        ${listenBtn}
      `;
    }

    case 'thesis': {
      const [line1, line2] = slide.headline.split('\n');
      return `
        ${eyebrow}
        <div class="thesis-wrap">
          <span class="thesis-line muted">${esc(line1)}</span>
          <span class="thesis-line lit">${esc(line2)}</span>
          <span class="thesis-cue">${esc(slide.cue)}</span>
        </div>
      `;
    }

    case 'playlist':
      return renderPlaylistSlide(slide, eyebrow);

    default:
      return `<p class="slide-body">Slide ${index + 1}</p>`;
  }
}

function renderPlaylistSlide(slide, eyebrow) {
  const groups = PLAYLIST_GROUPS.map(g => {
    const items = g.songs.map(sid => {
      const song = SONGS[sid];
      if (!song) return '';
      return `
        <button class="song-link playlist-row" data-song="${sid}">
          <span class="pl-title">${esc(song.title)}</span>
          <span class="pl-meta">${esc(song.artist)} · ${song.year}</span>
          <span class="pl-arrow">↗</span>
        </button>
      `;
    }).join('');
    return `
      <div class="pl-group">
        <div class="pl-group-label">${esc(g.label)}</div>
        ${items}
      </div>
    `;
  }).join('');

  return `
    ${eyebrow}
    <h1 class="slide-headline" style="margin-bottom:1.25rem">${esc(slide.headline)}</h1>
    <div class="pl-grid">${groups}</div>
  `;
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
//  STUDENT VIEW
// ═══════════════════════════════════════════════════════════════

function buildStudentView() {
  const root = el('div', 'student-view');

  root.innerHTML = `
    <header class="student-header">
      <span class="workshop-label">Workshop 2 — Finding Your Subject</span>
      <span class="gss-label">Good Sky Studio</span>
    </header>
    <div class="student-tabs">
      <button class="tab-btn" data-tab="slides">Slides</button>
      <button class="tab-btn" data-tab="activity">Activity</button>
    </div>
    <div class="student-panel" id="panel-slides"></div>
    <div class="student-panel" id="panel-activity" hidden></div>
  `;

  root.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchStudentTab(btn.dataset.tab));
  });

  return root;
}

function switchStudentTab(tab) {
  state.tab = tab;

  document.querySelectorAll('.tab-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.tab === tab)
  );

  const slidesPanel   = document.getElementById('panel-slides');
  const activityPanel = document.getElementById('panel-activity');

  if (tab === 'slides') {
    slidesPanel.hidden   = false;
    activityPanel.hidden = true;
    if (!slidesPanel.dataset.built) {
      buildHandout(slidesPanel);
      slidesPanel.dataset.built = '1';
    }
  } else {
    slidesPanel.hidden   = true;
    activityPanel.hidden = false;
    if (!activityPanel.dataset.built) {
      buildActivity(activityPanel);
      activityPanel.dataset.built = '1';
    }
  }
}

// ─── Handout ──────────────────────────────────────────────────────────────────

function buildHandout(panel) {
  panel.className = 'student-panel';
  const wrap = el('div', 'handout');

  function slinkH(songId, label) {
    return `<button class="song-link" data-song="${songId}">${label}</button>`;
  }

  const sections = [
    {
      label: 'The Core Distinction',
      title: 'Topic vs. Subject',
      rawBody:
        '<strong>Topic</strong> — what the song is about. Heartbreak. Home. Loss.<br><br>' +
        '<strong>Subject</strong> — what the song is <em>really</em> about. The specific, ' +
        'personal thing only you can write.<br><br>' +
        'Topic is the genre. Subject is the song.',
    },
    {
      label: 'The Test',
      title: 'Vague is forgettable. Specific is unforgettable.',
      body:
        '"I miss you every day" is a topic.\n"I still reach for my phone to tell you something I just saw" is a subject.\n\n' +
        'The second one works because it\'s one person\'s specific reflex — and everyone recognises it.',
    },
    {
      label: 'The Technique',
      title: 'Keep zooming until you can film it.',
      body:
        'Can you point a camera at this?\nCan you show it without explanation?\n\n' +
        'If not — zoom in.\n\n' +
        'Theme → Your Angle → The Scene.\n\n' +
        'You\'re done when you have a scene.',
    },
    {
      label: 'Case Study',
      title: '"The River" — Bruce Springsteen',
      rawBody:
        'Verse 1: graduation ceremony, union card, pregnant girlfriend, borrowed wedding ring. ' +
        'Every detail is specific. None of it is vague.<br><br>' +
        'Topic: regret, lost youth. Subject: <em>this</em> couple, <em>this</em> river, ' +
        '<em>this</em> specific fading hope.<br><br>' +
        slinkH('the-river', 'Listen to The River ↗'),
    },
    {
      label: 'The Point',
      title: 'The more specific you are, the more universal it becomes.',
      body:
        'You don\'t make a song relatable by being general.\n' +
        'You make it relatable by being so particular\n' +
        'that people recognise something they didn\'t know they felt.\n\n' +
        '→ Switch to the Activity tab when your instructor says go.',
    },
  ];

  sections.forEach(s => {
    const sec = el('div', 'handout-section');
    sec.innerHTML = `<div class="h-label">${esc(s.label)}</div>
                     <div class="h-title">${esc(s.title)}</div>`;

    if (s.rawBody) {
      const p = el('div', 'h-body');
      p.innerHTML = s.rawBody;
      sec.appendChild(p);
    } else if (s.body) {
      const p = el('div', 'h-body');
      p.textContent = s.body;
      sec.appendChild(p);
    }

    wrap.appendChild(sec);
  });

  // ── Playlist ──────────────────────────────────────────────────
  const playlistSec = el('div', 'handout-section');
  playlistSec.innerHTML = `<div class="h-label">Workshop 2 Playlist</div>
                            <div class="h-title">Every song from today's session.</div>`;

  PLAYLIST_GROUPS.forEach(g => {
    const groupEl = el('div', 'h-pl-group');
    groupEl.innerHTML = `<div class="h-pl-group-label">${esc(g.label)}</div>`;

    g.songs.forEach(sid => {
      const song = SONGS[sid];
      if (!song) return;
      const btn = el('button', 'song-link h-pl-row');
      btn.dataset.song = sid;
      btn.innerHTML = `
        <span class="h-pl-title">${esc(song.title)}</span>
        <span class="h-pl-artist">${esc(song.artist)} · ${song.year}</span>
        <span class="h-pl-arrow">↗</span>
      `;
      groupEl.appendChild(btn);
    });

    playlistSec.appendChild(groupEl);
  });

  wrap.appendChild(playlistSec);
  panel.appendChild(wrap);
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

function buildActivity(panel) {
  panel.className = 'activity-view';

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

  panel.innerHTML = `
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

  panel.querySelector('#reset-btn').addEventListener('click', resetActivity);

  panel.querySelectorAll('.seed-card').forEach(card => {
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
