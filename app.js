'use strict';

// ─── Song registry ──────────────────────────────────────────────────────────

const SONGS = {
  'your-cheatin-heart': {
    title: "Your Cheatin' Heart",
    artist: 'Hank Williams',
    year: '1953',
  },
  'hey-jude': {
    title: 'Hey Jude',
    artist: 'The Beatles',
    year: '1968',
  },
  'last-night': {
    title: 'Last Night',
    artist: 'Morgan Wallen',
    year: '2023',
  },
  'times-they-are-a-changin': {
    title: "The Times They Are A-Changin'",
    artist: 'Bob Dylan',
    year: '1964',
  },
  'over-the-rainbow': {
    title: 'Over the Rainbow',
    artist: 'Judy Garland',
    year: '1939',
  },
  'jolene': {
    title: 'Jolene',
    artist: 'Dolly Parton',
    year: '1973',
  },
  'bohemian-rhapsody': {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    year: '1975',
  },
  'a-day-in-the-life': {
    title: 'A Day in the Life',
    artist: 'The Beatles',
    year: '1967',
  },
  'whats-going-on': {
    title: "What's Going On",
    artist: 'Marvin Gaye',
    year: '1971',
  },
  'fast-car': {
    title: 'Fast Car',
    artist: 'Tracy Chapman',
    year: '1988',
  },
  'hurt': {
    title: 'Hurt',
    artist: 'Johnny Cash',
    year: '2002',
  },
  'alright': {
    title: 'Alright',
    artist: 'Kendrick Lamar',
    year: '2015',
  },
  'dont-dream-its-over': {
    title: "Don't Dream It's Over",
    artist: 'Crowded House',
    year: '1986',
  },
};

// Streaming platforms — add/remove rows here to change the overlay
const PLATFORMS = [
  { id: 'spotify',      name: 'Spotify',       bg: '#1DB954', fg: '#000' },
  { id: 'appleMusic',   name: 'Apple Music',   bg: '#FC3C44', fg: '#fff' },
  { id: 'youtubeMusic', name: 'YouTube Music', bg: '#212121', fg: '#FF4040' },
  { id: 'youtube',      name: 'YouTube',       bg: '#FF0000', fg: '#fff' },
];

const PLAYLIST_GROUPS = [
  { label: 'The Map in Action',
    songs: ['your-cheatin-heart', 'hey-jude', 'last-night'] },
  { label: 'Alternative Structures',
    songs: ['times-they-are-a-changin', 'over-the-rainbow', 'jolene',
            'bohemian-rhapsody', 'a-day-in-the-life', 'whats-going-on'] },
  { label: 'No Chorus Needed',
    songs: ['fast-car', 'hurt', 'alright'] },
  { label: 'Case Study',
    songs: ['dont-dream-its-over'] },
];

// ─── Slide data ──────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 'hook',
    type: 'hook',
    eyebrow: 'Workshop 1  ·  Good Sky Studio',
    headline: 'Every song\nyou\'ve ever loved\nhas a skeleton.',
    body: 'Most people never see it.\nBy the end of this session, you will.',
  },
  {
    id: 'standard-map',
    type: 'structure',
    eyebrow: 'The formula',
    headline: 'The Standard Map',
    blocks: [
      {l:'A', type:'verse'}, {l:'B', type:'chorus'}, {l:'A', type:'verse'},
      {l:'B', type:'chorus'}, {l:'C', type:'bridge'}, {l:'B', type:'chorus'},
      {l:'B', type:'chorus'},
    ],
    legend: [
      { type:'verse',  label:'Verse',  dot:'#7BA7D4' },
      { type:'chorus', label:'Chorus', dot:'#C8A84A' },
      { type:'bridge', label:'Bridge', dot:'#D47BAA' },
    ],
    sections: [
      { type:'verse',  letter:'A', label:'Verse',  desc:'Sets the scene. Tells the story. Establishes the world of the song.' },
      { type:'chorus', letter:'B', label:'Chorus', desc:'The emotional core. The payoff. The thing you can\'t shake.' },
      { type:'bridge', letter:'C', label:'Bridge', desc:'Disrupts the pattern. Raises the stakes. Makes the final chorus land harder.' },
    ],
  },
  {
    id: 'map-in-action',
    type: 'eras',
    eyebrow: 'Across 70 years',
    headline: 'Same skeleton,\ndifferent skin.',
    eras: [
      { year:'1953', artist:'Hank Williams', song:"Your Cheatin' Heart",
        songId: 'your-cheatin-heart', blocks: ['v','c','v','c','b','c','c'] },
      { year:'1968', artist:'The Beatles', song:'Hey Jude',
        songId: 'hey-jude', blocks: ['v','c','v','c','b','c','c'] },
      { year:'2023', artist:'Morgan Wallen', song:'Last Night',
        songId: 'last-night', blocks: ['v','c','v','c','b','c','c'] },
    ],
  },
  {
    id: 'other-structures',
    type: 'table',
    eyebrow: 'There are others',
    headline: 'The alternatives\nworth knowing.',
    rows: [
      { name:'AAA',             desc:'Verses only, no chorus',
        example:'"The Times They Are A-Changin\'" — Dylan',
        songId: 'times-they-are-a-changin' },
      { name:'AABA',            desc:'Verse / verse / bridge / verse',
        example:'"Over the Rainbow," most jazz standards',
        songId: 'over-the-rainbow' },
      { name:'Verse-Chorus',    desc:'No bridge',
        example:'"Jolene" — Dolly Parton',
        songId: 'jolene' },
      { name:'Through-composed',desc:'Never repeats',
        example:'"Bohemian Rhapsody," "A Day in the Life"',
        songId: 'bohemian-rhapsody' },
      { name:'One-section loop',desc:'Single section that builds',
        example:'"What\'s Going On" — Marvin Gaye',
        songId: 'whats-going-on' },
    ],
  },
  {
    id: 'no-chorus',
    type: 'evidence',
    eyebrow: 'The rule vs. the exception',
    headline: 'Do songs\nneed a chorus?',
    answer: 'No.',
    evidence: [
      { title:'"Fast Car"',  artist:'Tracy Chapman',     note:'No chorus. Pure verse drive.',   songId: 'fast-car' },
      { title:'"Hurt"',      artist:'NIN / Johnny Cash', note:'The refrain barely counts.',     songId: 'hurt' },
      { title:'"Alright"',   artist:'Kendrick Lamar',    note:'A chant. Not a chorus.',         songId: 'alright' },
    ],
    body: 'Three songs you know by heart. None of them needed one.',
  },
  {
    id: 'hero-journey',
    type: 'hero',
    eyebrow: 'A borrowed map',
    headline: 'You\'ve seen this\nstructure before.',
    rows: [
      { journey:'Ordinary World',          song:'Verse 1 — establish where we are' },
      { journey:'The Call',                song:'Pre-chorus or late V1 turn' },
      { journey:'Crossing the Threshold',  song:'First Chorus — the feeling lands' },
      { journey:'Trials & Transformation', song:'Verse 2, building tension' },
      { journey:'The Ordeal',              song:'Bridge — everything gets complicated' },
      { journey:'The Return, Changed',     song:'Final Chorus — same words, different meaning' },
    ],
  },
  {
    id: 'case-study',
    type: 'casestudy',
    eyebrow: 'Case study',
    headline: '"Don\'t Dream\nIt\'s Over"',
    subhead: 'Crowded House, 1986',
    songId: 'dont-dream-its-over',
    body: 'A Hero\'s Journey that refuses to complete.\n\nThe final chorus doesn\'t bring the hero home — it insists, almost desperately, that something good is still possible. The resolution never arrives.\n\nUnresolved for 40 years. Nobody\'s tired of it.',
  },
  {
    id: 'thesis',
    type: 'thesis',
    eyebrow: 'The point',
    headline: 'Structure isn\'t the cage.\nIt\'s the launching pad.',
    cue: '→ Activity starts now.',
  },
  {
    id: 'playlist',
    type: 'playlist',
    eyebrow: 'Workshop 1 Playlist',
    headline: 'Every song\nfrom today\'s session.',
  },
];

const ZONES = [
  { id:'v1',  label:'V1',     sublabel:'Verse 1',   type:'verse'  },
  { id:'pch', label:'Pre-Ch', sublabel:'Pre-Chorus', type:'chorus' },
  { id:'ch1', label:'Ch 1',   sublabel:'Chorus 1',   type:'chorus' },
  { id:'v2',  label:'V2',     sublabel:'Verse 2',    type:'verse'  },
  { id:'ch2', label:'Ch 2',   sublabel:'Chorus 2',   type:'chorus' },
  { id:'br',  label:'Bridge', sublabel:'',           type:'bridge' },
  { id:'out', label:'Outro',  sublabel:'',           type:'outro'  },
];

const CARDS = [
  'I used to believe in something',
  'The drive home after the fight',
  '3am, can\'t sleep again',
  'Everything I thought I knew',
  'But maybe we could try',
  'The version of you I invented',
  'Standing in the parking lot',
  'I should have said it then',
  'Nothing left to prove',
  'Same song, different words',
];

// ─── State ───────────────────────────────────────────────────────────────────

const state = {
  view: 'student',
  tab: 'slides',
  slide: 0,
  placements: {},
};

// ─── Init ────────────────────────────────────────────────────────────────────

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

  // Global: song-link overlay triggers + close
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
    if (document.querySelector('.song-overlay')) return; // let Escape close overlay
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      activateSlide(state.slide + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      activateSlide(state.slide - 1);
    }
  });
}

// ─── Slide renderers ─────────────────────────────────────────────────────────

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

    case 'structure': {
      const blocks = slide.blocks.map(b =>
        `<div class="s-block ${b.type}">${b.l}</div>`
      ).join('');
      const legend = slide.legend.map(l =>
        `<div class="legend-item">
           <div class="legend-dot" style="background:${l.dot}"></div>
           ${esc(l.label)}
         </div>`
      ).join('');
      const defs = slide.sections.map(s =>
        `<p class="slide-body" style="margin-bottom:.55rem">
           <strong><span class="s-block ${s.type}" style="display:inline-flex;width:auto;height:auto;padding:.1rem .4rem;font-size:.8rem;vertical-align:middle;margin-right:.4rem">${s.letter}</span>${esc(s.label)}</strong>
           — ${esc(s.desc)}
         </p>`
      ).join('');
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <div class="structure-row">${blocks}</div>
        <div class="structure-legend" style="margin-bottom:1.25rem">${legend}</div>
        ${defs}
      `;
    }

    case 'eras': {
      const cards = slide.eras.map(era => {
        const mini = era.blocks.map(b => {
          const cls = b === 'v' ? 'v' : b === 'c' ? 'c' : 'b';
          const lbl = b === 'v' ? 'V' : b === 'c' ? 'C' : 'B';
          return `<div class="mini-block ${cls}">${lbl}</div>`;
        }).join('');
        const songDisplay = era.songId
          ? `<button class="song-link" data-song="${era.songId}">${esc(era.song)}</button>`
          : esc(era.song);
        return `
          <div class="era-card">
            <div class="yr">${esc(era.year)}</div>
            <div class="artist">${esc(era.artist)}</div>
            <div class="song">${songDisplay}</div>
            <div class="mini-blocks">${mini}</div>
          </div>
        `;
      }).join('');
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <div class="era-grid">${cards}</div>
      `;
    }

    case 'table': {
      const rows = slide.rows.map(r => {
        const exampleCell = r.songId
          ? `<button class="song-link" data-song="${r.songId}">${esc(r.example)}</button>`
          : esc(r.example);
        return `<tr>
          <td class="col-name">${esc(r.name)}</td>
          <td class="col-desc">${esc(r.desc)}</td>
          <td class="col-example">${exampleCell}</td>
        </tr>`;
      }).join('');
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <table class="data-table">
          <thead><tr>
            <th>Structure</th><th>What it is</th><th>Example</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    case 'evidence': {
      const items = slide.evidence.map(e => {
        const titleEl = e.songId
          ? `<button class="song-link" data-song="${e.songId}">${esc(e.title)}</button>`
          : `<span class="ev-title">${esc(e.title)}</span>`;
        return `<li>
          <span class="ev-title">${titleEl}</span>
          <span class="ev-artist">${esc(e.artist)}</span>
          <span class="ev-note">— ${esc(e.note)}</span>
        </li>`;
      }).join('');
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <div class="big-answer">${esc(slide.answer)}</div>
        <ul class="evidence-list">${items}</ul>
        <p class="slide-body">${esc(slide.body)}</p>
      `;
    }

    case 'hero': {
      const rows = slide.rows.map(r =>
        `<div class="hero-cell">${esc(r.journey)}</div>
         <div class="hero-cell">${esc(r.song)}</div>`
      ).join('');
      return `
        ${eyebrow}
        <h1 class="slide-headline">${esc(slide.headline)}</h1>
        <div class="hero-grid">
          <div class="hero-col-head">Hero's Journey</div>
          <div class="hero-col-head">Song Structure</div>
          ${rows}
        </div>
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

// ─── QR Code ─────────────────────────────────────────────────────────────────

function generateQR() {
  const el_ = document.getElementById('qr-code-el');
  const urlEl = document.getElementById('qr-url-text');
  if (!el_) return;

  const url = window.location.origin + window.location.pathname;
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
//  SONG OVERLAY  (tapelink-style streaming links)
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
      <span class="workshop-label">Workshop 1 — Song Structure</span>
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

  // Helper: build a song-link button for handout use
  function slinkH(songId, label) {
    return `<button class="song-link" data-song="${songId}">${label}</button>`;
  }

  const sections = [
    {
      label: 'The Formula',
      title: 'The Standard Map',
      body: 'Most chart songs follow ABABCBB — Verse, Chorus, Verse, Chorus, Bridge, Chorus, Chorus. Learn this skeleton first.',
      extra: () => {
        const row = el('div', 'h-structure-row');
        SLIDES[1].blocks.forEach(b => {
          const d = el('div', `s-block ${b.type}`);
          d.textContent = b.l;
          d.style.cssText = 'min-width:28px;height:28px;font-size:.75rem;';
          row.appendChild(d);
        });
        return row;
      },
    },
    {
      label: 'Other Structures',
      title: 'The Alternatives',
      // Build as raw HTML so song-links render
      rawTable: SLIDES[3].rows.map(r =>
        `<tr><td>${esc(r.name)}</td><td>${
          r.songId ? slinkH(r.songId, esc(r.example)) : esc(r.example)
        }</td></tr>`
      ).join(''),
    },
    {
      label: 'The Rule vs. The Exception',
      title: 'Do songs need a chorus?',
      rawBody: `No. ${slinkH('fast-car','"Fast Car"')}. ${slinkH('hurt','"Hurt"')}. ${slinkH('alright','"Alright"')}. Zero choruses. Completely unforgettable.`,
    },
    {
      label: 'A Borrowed Map',
      title: "Hero's Journey = Song Structure",
      table: SLIDES[5].rows.map(r => [r.journey, r.song]),
    },
    {
      label: 'Case Study',
      title: '"Don\'t Dream It\'s Over" — Crowded House',
      rawBody: `A Hero's Journey that refuses to complete. The final chorus insists rather than resolves.<br><br>Unresolved for 40 years. Nobody's tired of it.<br><br>${slinkH('dont-dream-its-over','Listen to this song ↗')}`,
    },
    {
      label: 'The Point',
      title: 'Structure isn\'t the cage. It\'s the launching pad.',
      body: '→ Switch to the Activity tab when your instructor says go.',
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

    if (s.rawTable) {
      const tbl = el('table', 'h-mini-table');
      tbl.innerHTML = s.rawTable;
      sec.appendChild(tbl);
    } else if (s.table) {
      const tbl = el('table', 'h-mini-table');
      s.table.forEach(([a, b]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${esc(a)}</td><td>${esc(b)}</td>`;
        tbl.appendChild(row);
      });
      sec.appendChild(tbl);
    }

    if (s.extra) sec.appendChild(s.extra());
    wrap.appendChild(sec);
  });

  // ── Playlist section ──────────────────────────────────────────
  const playlistSec = el('div', 'handout-section');
  playlistSec.innerHTML = `<div class="h-label">Workshop 1 Playlist</div>
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
//  ACTIVITY — Build Your Skeleton
// ═══════════════════════════════════════════════════════════════

function buildActivity(panel) {
  panel.className = 'activity-view';

  panel.innerHTML = `
    <div class="activity-header">
      <div>
        <div class="activity-title">Build Your Skeleton</div>
        <div class="activity-sub">Drag phrase cards into the structure. No right answer.</div>
      </div>
      <button class="reset-btn" id="reset-btn">Reset</button>
    </div>
    <div class="zones-scroll" id="zones-scroll">
      ${ZONES.map(z => `
        <div class="drop-zone" id="zone-${z.id}" data-zone="${z.id}">
          <div class="zone-label-col type-${z.type}">
            <div class="zone-label">${esc(z.label)}</div>
            ${z.sublabel ? `<div class="zone-sublabel">${esc(z.sublabel)}</div>` : ''}
          </div>
          <div class="zone-content" data-zone-content="${z.id}">
            <div class="zone-placeholder">drop a card here</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="pool-wrap">
      <div class="pool-label">Your Cards — drag to place</div>
      <div class="card-pool" id="card-pool">
        ${CARDS.map((text, i) =>
          `<div class="card" data-card="${i}" draggable="false">${esc(text)}</div>`
        ).join('')}
      </div>
    </div>
  `;

  panel.querySelector('#reset-btn').addEventListener('click', resetActivity);
  setupDragAndDrop();
}

function resetActivity() {
  state.placements = {};
  const pool = document.getElementById('card-pool');
  if (!pool) return;

  document.querySelectorAll('.card[data-card]').forEach(card => {
    pool.appendChild(card);
    card.classList.remove('is-dragging');
    card.style.opacity = '';
  });

  ZONES.forEach(z => {
    const content = document.querySelector(`[data-zone-content="${z.id}"]`);
    if (content) content.innerHTML = '<div class="zone-placeholder">drop a card here</div>';
    const zone = document.getElementById(`zone-${z.id}`);
    if (zone) zone.classList.remove('has-card', 'drag-over');
  });
}

// ─── Drag-and-drop via Pointer Events ────────────────────────────────────────

let drag = null;

function setupDragAndDrop() {
  document.addEventListener('pointerdown', onPD, { passive: false });
  document.addEventListener('pointermove', onPM, { passive: false });
  document.addEventListener('pointerup', onPU);
  document.addEventListener('pointercancel', onPU);
}

function onPD(e) {
  const card = e.target.closest('.card[data-card]');
  if (!card) return;
  e.preventDefault();

  const rect = card.getBoundingClientRect();
  const ghost = el('div', 'drag-ghost');
  ghost.textContent = card.textContent;
  ghost.style.left  = rect.left + 'px';
  ghost.style.top   = rect.top  + 'px';
  ghost.style.width = rect.width + 'px';
  document.body.appendChild(ghost);

  card.classList.add('is-dragging');
  drag = {
    card,
    ghost,
    offsetX: e.clientX - rect.left,
    offsetY: e.clientY - rect.top,
    lastZone: null,
    pointerId: e.pointerId,
  };
}

function onPM(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  e.preventDefault();

  drag.ghost.style.left = (e.clientX - drag.offsetX) + 'px';
  drag.ghost.style.top  = (e.clientY - drag.offsetY) + 'px';

  drag.ghost.style.display = 'none';
  const under = document.elementFromPoint(e.clientX, e.clientY);
  drag.ghost.style.display = '';

  const zone = under?.closest('.drop-zone');
  if (drag.lastZone && drag.lastZone !== zone) drag.lastZone.classList.remove('drag-over');
  if (zone) zone.classList.add('drag-over');
  drag.lastZone = zone || null;
}

function onPU(e) {
  if (!drag) return;
  if (e.pointerId !== drag.pointerId) return;

  const { card, ghost, lastZone } = drag;
  drag = null;

  if (lastZone) lastZone.classList.remove('drag-over');
  card.classList.remove('is-dragging');
  document.body.removeChild(ghost);

  if (lastZone) {
    const zoneId  = lastZone.dataset.zone;
    const content = lastZone.querySelector('[data-zone-content]');
    const existing = lastZone.querySelector('.card[data-card]');
    if (existing) {
      const pool = document.getElementById('card-pool');
      existing.classList.remove('is-dragging');
      pool.appendChild(existing);
      delete state.placements[zoneId];
    }
    content.innerHTML = '';
    content.appendChild(card);
    lastZone.classList.add('has-card');
    state.placements[zoneId] = +card.dataset.card;
  }
}

// ─── Utilities ───────────────────────────────────────────────────────────────

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
