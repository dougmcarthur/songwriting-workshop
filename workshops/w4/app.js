'use strict';

// ─── Song registry ───────────────────────────────────────────────────────────

const SONGS = {
  'yesterday': {
    title: 'Yesterday',
    artist: 'The Beatles',
    year: '1965',
  },
  'hallelujah': {
    title: 'Hallelujah',
    artist: 'Leonard Cohen',
    year: '1984',
  },
  'blackbird': {
    title: 'Blackbird',
    artist: 'The Beatles',
    year: '1968',
  },
  'africa': {
    title: 'Africa',
    artist: 'Toto',
    year: '1982',
  },
  'dont-stop-believin': {
    title: 'Don\'t Stop Believin\'',
    artist: 'Journey',
    year: '1981',
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
    songs: ['yesterday'] },
  { label: 'Songs That Got Finished',
    songs: ['hallelujah', 'blackbird', 'africa', 'dont-stop-believin'] },
];

// ─── Slide data ───────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 'title',
    type: 'title',
    classNumber: 4,
    date: 'July 28, 2026',
    headline: 'How Do You\nFinish Anything?',
  },
  {
    id: 'hook',
    type: 'hook',
    headline: 'You have 47 voice memos.\nZero finished songs.\nLet\'s talk about that.',
    body: 'Finishing isn\'t a talent. It\'s a practice — and a decision you make before you feel ready.',
  },
  {
    id: 'blame-vs-truth',
    type: 'comparison',
    headline: 'What We Blame vs. What\'s Actually Happening',
    left: {
      label: 'What We Blame',
      desc: 'The story we tell ourselves.',
      items: [
        '"I\'m not feeling it today"',
        '"It\'s not good enough yet"',
        '"I\'m waiting for the right moment"',
        '"I need to be in the right headspace"',
        '"This verse just isn\'t working"',
      ],
      note: 'Sounds like self-awareness.',
    },
    right: {
      label: 'What\'s Actually Happening',
      desc: 'The truth underneath.',
      items: [
        '"I\'m scared of finding out it\'s not great"',
        '"Perfect doesn\'t exist, so I never have to stop"',
        '"If I never finish it, it can never be judged"',
        '"Stopping mid-idea feels safer than starting the next part"',
        '"I don\'t have a system for getting unstuck"',
      ],
      note: 'Harder to admit. Easier to fix.',
    },
  },
  {
    id: 'mvd',
    type: 'comparison',
    headline: 'The Minimum Viable Draft',
    left: {
      label: 'Not an MVD',
      desc: 'Fragments. Often beautiful. Always unfinished.',
      items: [
        'A polished opening verse, nothing else',
        'A chorus melody with no words',
        'Eleven versions of line one',
        'A "vibe" with no structure',
        'A voice memo from three years ago',
      ],
      note: 'Feels like progress. Isn\'t a song yet.',
    },
    right: {
      label: 'A Minimum Viable Draft',
      desc: 'Not your best work. Your whole work — for now.',
      items: [
        'Verse, chorus, and a second verse — even rough',
        'Placeholder words that hold the shape',
        'A bridge that\'s "good enough for now"',
        'A complete structure, start to finish',
        'Something you could play for a friend tonight',
      ],
      note: 'Done badly beats undone perfectly.',
    },
  },
  {
    id: 'casestudy',
    type: 'casestudy',
    headline: '"Yesterday"',
    subhead: 'The Beatles, 1965 — written first as "Scrambled Eggs"',
    songId: 'yesterday',
    body: 'Paul McCartney woke up one morning with the entire melody in his head — fully formed, like he\'d dreamed it. He was so sure he must have heard it somewhere that he played it for friends for weeks, asking, "Is this something? I couldn\'t have written it. I dreamed it."\n\nTo hold the melody\'s shape while he searched for real words, he sang nonsense to it: "Scrambled eggs, oh my baby how I love your legs." Placeholder lyrics. A song-shaped draft, finished in form, unfinished in content.\n\nThe real lyrics came weeks later, on a long drive to Portugal. "Yesterday" went on to become the most-covered song in recorded history — and it started as a complete shape with throwaway words inside it.',
  },
  {
    id: 'thesis',
    type: 'thesis',
    headline: 'Perfect is a fragment.\nFinished is a song.',
    cue: '→ Activity starts now.',
  },
  {
    id: 'playlist',
    type: 'playlist',
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

function renderSlide(slide, index) {
  switch (slide.type) {

    case 'hook':
      return `
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
        <h2>${nl(slide.headline)}</h2>
        <div class="comparison-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2em;margin-top:0.5em">${col(slide.left)}${col(slide.right)}</div>
      `;
    }

    case 'casestudy': {
      const listenBtn = slide.songId
        ? `<p style="margin-top:0.8em"><button class="song-link" data-song="${slide.songId}" style="border:1px solid rgba(255,255,255,0.35);padding:0.35em 1em;border-radius:4px;font-size:0.6em">Listen to this song ↗</button></p>`
        : '';
      return `
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
//  ACTIVITY — The Assembly Session
// ═══════════════════════════════════════════════════════════════

const ASSEMBLY_STAGES = [
  {
    num: 1,
    id: 'verse',
    label: 'VERSE',
    minutes: 15,
    prompt: 'Write your first verse. Don\'t fix it — finish it.',
    placeholder: 'Get the verse down. Imperfect is fine. Complete is the goal.',
    hasInput: true,
  },
  {
    num: 2,
    id: 'chorus',
    label: 'CHORUS',
    minutes: 15,
    prompt: 'Write the chorus. What\'s the one thing this song wants to say?',
    placeholder: 'The hook. The heart. The line they\'ll sing back to you.',
    hasInput: true,
  },
  {
    num: 3,
    id: 'bridge',
    label: 'BRIDGE',
    minutes: 10,
    prompt: 'Write a bridge — or a second verse, if that\'s what the song needs.',
    placeholder: 'A turn. A new angle. A way out of the chorus and back in.',
    hasInput: true,
  },
  {
    num: 4,
    id: 'read',
    label: 'READ ALOUD',
    minutes: 5,
    prompt: 'Read the whole thing out loud, start to finish — once, without stopping to fix anything.',
    placeholder: '',
    hasInput: false,
    note: 'No writing for this stage. Just read what you\'ve made — out loud, all the way through. That\'s a finished Minimum Viable Draft.',
  },
];

const assembly = {
  root: null,
  stage: 0,
  remaining: 0,
  running: false,
  timerId: null,
  drafts: {},
  finished: false,
};

function buildActivity(section) {
  const wrap = el('div', 'activity-view touch-activity');
  assembly.root = wrap;

  const pills = ASSEMBLY_STAGES.map(s => `
    <div class="assembly-stage-pill" data-stage="${s.num - 1}">
      <span class="assembly-stage-pill-num">${s.num}</span>
      <span class="assembly-stage-pill-label">${esc(s.label)}</span>
      <span class="assembly-stage-pill-time">${s.minutes} min</span>
    </div>
  `).join('');

  wrap.innerHTML = `
    <div class="activity-header">
      <div>
        <div class="activity-title">The Assembly Session</div>
        <div class="activity-sub">One sprint. Four stages. Build the whole song — start to finish.</div>
      </div>
      <button class="reset-btn" id="reset-btn">Reset</button>
    </div>
    <div class="assembly-board">
      <div class="assembly-stages">${pills}</div>
      <div class="assembly-stage-active">
        <div class="assembly-stage-head">
          <div class="assembly-stage-num" id="assembly-num">1</div>
          <div class="assembly-stage-labels">
            <div class="assembly-stage-label" id="assembly-label">VERSE</div>
            <div class="assembly-stage-prompt" id="assembly-prompt"></div>
          </div>
          <div class="assembly-timer">
            <span class="assembly-timer-display" id="assembly-timer-display">15:00</span>
            <button class="assembly-timer-btn" id="assembly-timer-btn">Start</button>
          </div>
        </div>
        <div id="assembly-input-wrap"></div>
        <div class="assembly-complete-banner" id="assembly-complete-banner" hidden>
          <div class="assembly-complete-headline">That's a finished Minimum Viable Draft.</div>
          <div class="assembly-complete-sub">Verse, chorus, bridge, read-through — start to finish. Hit Reset to run the sprint again.</div>
        </div>
        <div class="assembly-nav">
          <button class="assembly-nav-btn" id="assembly-back">&larr; Back</button>
          <button class="assembly-nav-btn assembly-nav-btn-primary" id="assembly-next">Next Stage &rarr;</button>
        </div>
      </div>
    </div>
  `;

  section.appendChild(wrap);

  wrap.querySelector('#reset-btn').addEventListener('click', resetActivity);
  wrap.querySelector('#assembly-back').addEventListener('click', () => goToStage(assembly.stage - 1));
  wrap.querySelector('#assembly-next').addEventListener('click', () => {
    if (assembly.stage === ASSEMBLY_STAGES.length - 1) {
      finishAssembly();
    } else {
      goToStage(assembly.stage + 1);
    }
  });
  wrap.querySelector('#assembly-timer-btn').addEventListener('click', toggleAssemblyTimer);

  wrap.querySelectorAll('.assembly-stage-pill').forEach(pill => {
    pill.addEventListener('click', () => goToStage(Number(pill.dataset.stage)));
  });

  renderAssemblyStage();
}

function renderAssemblyStage() {
  const root = assembly.root;
  const stage = ASSEMBLY_STAGES[assembly.stage];

  root.querySelectorAll('.assembly-stage-pill').forEach((pill, i) => {
    pill.classList.toggle('active', i === assembly.stage);
    pill.classList.toggle('done', i < assembly.stage);
  });

  root.querySelector('#assembly-num').textContent = stage.num;
  root.querySelector('#assembly-label').textContent = stage.label;
  root.querySelector('#assembly-prompt').textContent = stage.prompt;

  const inputWrap = root.querySelector('#assembly-input-wrap');
  if (stage.hasInput) {
    inputWrap.innerHTML = `<textarea class="assembly-input" id="assembly-input-${stage.id}" placeholder="${esc(stage.placeholder)}" rows="6"></textarea>`;
    const textarea = inputWrap.querySelector('textarea');
    textarea.value = assembly.drafts[stage.id] || '';
    textarea.addEventListener('input', () => { assembly.drafts[stage.id] = textarea.value; });
  } else {
    inputWrap.innerHTML = `<div class="assembly-readaloud-note">${esc(stage.note)}</div>`;
  }

  const banner = root.querySelector('#assembly-complete-banner');
  banner.hidden = true;

  root.querySelector('#assembly-back').disabled = assembly.stage === 0;
  const nextBtn = root.querySelector('#assembly-next');
  nextBtn.disabled = false;
  nextBtn.textContent = assembly.stage === ASSEMBLY_STAGES.length - 1
    ? 'Done — Finish'
    : 'Next Stage →';

  assembly.finished = false;
  stopAssemblyTimer();
  assembly.remaining = stage.minutes * 60;
  updateAssemblyTimerDisplay();
}

function goToStage(index) {
  if (index < 0 || index >= ASSEMBLY_STAGES.length) return;
  if (index === assembly.stage) return;
  assembly.stage = index;
  renderAssemblyStage();
}

function finishAssembly() {
  if (assembly.finished) return;
  assembly.finished = true;
  stopAssemblyTimer();
  const root = assembly.root;
  root.querySelector('#assembly-complete-banner').hidden = false;
  root.querySelector('#assembly-next').disabled = true;
}

function toggleAssemblyTimer() {
  if (assembly.running) {
    stopAssemblyTimer();
  } else {
    startAssemblyTimer();
  }
}

function startAssemblyTimer() {
  if (assembly.running) return;
  assembly.running = true;
  const btn = assembly.root.querySelector('#assembly-timer-btn');
  if (btn) btn.textContent = 'Pause';
  assembly.timerId = setInterval(() => {
    assembly.remaining = Math.max(0, assembly.remaining - 1);
    updateAssemblyTimerDisplay();
    if (assembly.remaining === 0) stopAssemblyTimer();
  }, 1000);
}

function stopAssemblyTimer() {
  assembly.running = false;
  if (assembly.timerId) {
    clearInterval(assembly.timerId);
    assembly.timerId = null;
  }
  const btn = assembly.root?.querySelector('#assembly-timer-btn');
  if (btn) btn.textContent = 'Start';
}

function updateAssemblyTimerDisplay() {
  const display = assembly.root?.querySelector('#assembly-timer-display');
  if (!display) return;
  const mins = Math.floor(assembly.remaining / 60);
  const secs = assembly.remaining % 60;
  display.textContent = `${mins}:${String(secs).padStart(2, '0')}`;
  display.classList.toggle('low', assembly.remaining > 0 && assembly.remaining <= 60);
  display.classList.toggle('done', assembly.remaining === 0);
}

function resetActivity() {
  stopAssemblyTimer();
  assembly.stage = 0;
  assembly.drafts = {};
  assembly.finished = false;
  renderAssemblyStage();
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
