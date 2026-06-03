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
  { id: 'activity', type: 'activity' },
  {
    id: 'playlist',
    type: 'playlist',
    eyebrow: 'Workshop 1 Playlist',
    headline: 'Every song\nfrom today\'s session.',
  },
];

const ZONES = [
  { id:'v1',  label:'V1',     type:'verse'  },
  { id:'pch', label:'Pre-Ch', type:'chorus' },
  { id:'ch1', label:'C1',     type:'chorus' },
  { id:'v2',  label:'V2',     type:'verse'  },
  { id:'ch2', label:'C2',     type:'chorus' },
  { id:'br',  label:'Bridge', type:'bridge' },
  { id:'out', label:'Outro',  type:'outro'  },
];

const CARDS = [
  'The town we both swore we\'d leave',
  'Your boots still sitting by the door',
  '3am and I still can\'t sleep',
  'Something\'s gotta give',
  'We were gonna be alright',
  'Please don\'t take what\'s mine',
  'I did this to myself',
  'Everything I thought I knew',
  'But I still believe it',
  'Same road, new kind of lost',
];

// ─── State ───────────────────────────────────────────────────────────────────

const state = { placements: {} };

// ─── Init ────────────────────────────────────────────────────────────────────

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

// ─── Build slides ────────────────────────────────────────────────────────────

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

// ─── Controls ────────────────────────────────────────────────────────────────

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

// ─── Activity ────────────────────────────────────────────────────────────────

function setupActivity() {
  document.getElementById('btn-activity')?.addEventListener('click', () => {
    Reveal.slide(SLIDES.length - 1);
  });
}

// ─── Slide renderers ─────────────────────────────────────────────────────────

const BLOCK_COLORS = { verse: '#7BA7D4', chorus: '#C8A84A', bridge: '#D47BAA', prechorus: '#7BC4C4' };

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

    case 'structure': {
      const blockColor = { verse:'#7BA7D4', chorus:'#C8A84A', bridge:'#D47BAA', prechorus:'#7BC4C4' };
      const blocks = slide.blocks.map(b =>
        `<span style="background:${blockColor[b.type]||'#888'};color:#000;padding:6px 16px;border-radius:4px;font-weight:700;font-size:0.95em;font-family:'Poppins',sans-serif">${esc(b.l)}</span>`
      ).join('');
      const legend = slide.legend.map(l =>
        `<span style="display:inline-flex;align-items:center;gap:6px;font-size:0.68em;opacity:0.75">
           <span style="display:inline-block;width:11px;height:11px;border-radius:2px;background:${esc(l.dot)}"></span>${esc(l.label)}
         </span>`
      ).join('');
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:1em 0 0.75em">${blocks}</div>
        <div style="display:flex;gap:2em;flex-wrap:wrap;justify-content:center">${legend}</div>
      `;
    }

    case 'eras': {
      const cards = slide.eras.map(era => {
        const blockColor = { v:'#7BA7D4', c:'#C8A84A', b:'#D47BAA' };
        const mini = era.blocks.map(b =>
          `<span style="background:${blockColor[b]||'#888'};color:#000;padding:2px 6px;border-radius:2px;font-size:0.7em;font-weight:700">${b==='v'?'V':b==='c'?'C':'B'}</span>`
        ).join('');
        const songEl = era.songId
          ? `<button class="song-link" data-song="${era.songId}">${esc(era.song)}</button>`
          : `<span>${esc(era.song)}</span>`;
        return `
          <div style="border-top:2px solid rgba(255,255,255,0.15);padding-top:0.75em;text-align:center">
            <p style="opacity:0.45;font-size:0.7em;margin-bottom:0.35em">${esc(era.year)}</p>
            <p style="font-size:0.95em;font-weight:700;margin-bottom:0.2em">${songEl}</p>
            <p style="font-size:0.6em;text-transform:uppercase;letter-spacing:0.08em;opacity:0.45;margin-bottom:0.55em">${esc(era.artist)}</p>
            <div style="display:flex;gap:3px;flex-wrap:wrap;justify-content:center">${mini}</div>
          </div>
        `;
      }).join('');
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5em;font-size:0.8em;margin-top:0.5em">${cards}</div>
      `;
    }

    case 'table': {
      const rows = slide.rows.map(r => {
        const exampleCell = r.songId
          ? `<button class="song-link" data-song="${r.songId}">${esc(r.example)}</button>`
          : esc(r.example);
        return `<tr><td style="font-weight:600">${esc(r.name)}</td><td style="opacity:0.75">${esc(r.desc)}</td><td>${exampleCell}</td></tr>`;
      }).join('');
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <table style="font-size:0.68em;margin-top:0.5em">
          <thead><tr><th>Structure</th><th>What it is</th><th>Example</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    case 'evidence': {
      const CARD_PALETTES = [
        { bg: 'linear-gradient(135deg, #2a1f0e 0%, #3d2f14 100%)', icon: '♪', accent: '#c8953a' },
        { bg: 'linear-gradient(135deg, #1a0e0e 0%, #2e1818 100%)', icon: '♩', accent: '#8a3535' },
        { bg: 'linear-gradient(135deg, #0e1a2e 0%, #162440 100%)', icon: '♫', accent: '#3a6aaa' },
      ];
      const cards = slide.evidence.map((e, i) => {
        const pal = CARD_PALETTES[i % CARD_PALETTES.length];
        const titleEl = e.songId
          ? `<button class="song-link" data-song="${e.songId}" style="font-weight:700;display:block;width:100%">${esc(e.title)}</button>`
          : `<strong>${esc(e.title)}</strong>`;
        return `
          <div class="evidence-card">
            <div class="evidence-card-art" style="background:${pal.bg};color:${pal.accent}">${pal.icon}</div>
            <div class="evidence-card-body">
              <div class="evidence-card-title">${titleEl}</div>
              <div class="evidence-card-artist">${esc(e.artist)}</div>
              <div class="evidence-card-note">${esc(e.note)}</div>
            </div>
          </div>
        `;
      }).join('');
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <p style="font-size:2em;font-weight:700;font-family:'Poppins',sans-serif;letter-spacing:-0.03em;margin:0.1em 0 0.4em">${esc(slide.answer)}</p>
        <div class="evidence-grid">${cards}</div>
        <p style="font-size:0.6em;opacity:0.55;margin-top:0.5em">${esc(slide.body)}</p>
      `;
    }

    case 'hero': {
      const rows = slide.rows.map(r =>
        `<tr><td>${esc(r.journey)}</td><td>${esc(r.song)}</td></tr>`
      ).join('');
      return `
        ${ey}
        <h2>${nl(slide.headline)}</h2>
        <table style="font-size:0.65em;margin-top:0.5em">
          <thead><tr><th>Hero's Journey</th><th>Song Structure</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
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
      const rows = PLAYLIST_GROUPS.flatMap(g => g.songs).map(sid => {
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

// ─── Playlist → Spotlistr ────────────────────────────────────────────────────

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
//  ACTIVITY — Build Your Skeleton
// ═══════════════════════════════════════════════════════════════

function buildActivity(section) {
  const wrap = el('div', 'activity-view');
  wrap.innerHTML = `
    <div class="activity-header">
      <div>
        <div class="activity-title">Build Your Skeleton</div>
        <div class="activity-sub">Drag a phrase into each section. No wrong answer.</div>
      </div>
      <button class="reset-btn" id="reset-btn">Reset</button>
    </div>
    <div class="activity-body">
      <div class="pool-col">
        <div class="pool-heading">Phrase Cards</div>
        <div class="card-pool" id="card-pool">
          ${CARDS.map((text, i) =>
            `<div class="card" data-card="${i}" draggable="false">${esc(text)}</div>`
          ).join('')}
        </div>
      </div>
      <div class="zones-col">
        ${ZONES.map(z => `
          <div class="zone-row">
            <div class="drop-zone" id="zone-${z.id}" data-zone="${z.id}">
              <div class="zone-content" data-zone-content="${z.id}">
                <div class="zone-placeholder">drag a card here</div>
              </div>
            </div>
            <div class="zone-label-side">${esc(z.label)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  section.appendChild(wrap);
  wrap.querySelector('#reset-btn').addEventListener('click', resetActivity);
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
    if (content) content.innerHTML = '<div class="zone-placeholder">drag a card here</div>';
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
  ghost.style.left     = rect.left + 'px';
  ghost.style.top      = rect.top  + 'px';
  ghost.style.width    = rect.width + 'px';
  ghost.style.fontSize = window.getComputedStyle(card).fontSize;
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
