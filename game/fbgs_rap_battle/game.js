// FBGS RAP BATTLE — Game Logic
const CHARS = [
  {
    id: 'necla', name: 'NECLA', font: 'NeoClassicalGoth', attr: 'Blackletter', fontCSS: '"UnifrakturMaguntia",cursive',
    color: '#e6e67c', color2: '#333', avatar: '🖤', atk: 3, spd: 1, def: 2,
    punch: '"Your soul is my SERIF."', ability: 'Heavy Glyph'
  },
  {
    id: '2ton', name: '2TON', font: 'HariganeDancing', attr: 'CyberSansSerif', fontCSS: '"Orbitron",sans-serif',
    color: '#f2b735', color2: '#3b4a6b', avatar: '💙', atk: 2, spd: 3, def: 1,
    punch: '"I deliver WORDS at light speed."', ability: 'Auto Kerning'
  },
  {
    id: 'pace', name: 'PACE', font: 'PeaChass', attr: 'Handwrite', fontCSS: '"Rock Salt",cursive',
    color: '#e791bf', color2: '#7ac9e5', avatar: '🩷', atk: 1, spd: 2, def: 2,
    punch: '"Can\'t read my HANDWRITING, babe!"', ability: 'Scribble'
  },
  {
    id: 'blanc', name: 'BLANC', font: 'FlamingoSerif', attr: 'FantasticSerif', fontCSS: '"Playfair Display",serif',
    color: '#b0c4de', color2: '#2d3e50', avatar: '🤍', atk: 2, spd: 2, def: 2,
    punch: '"Every LETTER carries a soul."', ability: 'Ornament'
  },
  {
    id: 'grire', name: 'GRIRE', font: 'Shinigami01', attr: 'Blackletter', fontCSS: '"UnifrakturMaguntia",cursive',
    color: '#c82828', color2: '#9b9b9b', avatar: '❤️‍🔥', atk: 3, spd: 1, def: 2,
    punch: '"DEATH NOTE in every GLYPH."', ability: 'Heavy Glyph'
  },
  {
    id: 'axel', name: 'AXEL', font: 'AxelBox', attr: 'CyberSansSerif', fontCSS: '"Orbitron",sans-serif',
    color: '#38b2ac', color2: '#2c303a', avatar: '🩵', atk: 2, spd: 3, def: 1,
    punch: '"Layer by LAYER, I wrap you up."', ability: 'Auto Kerning'
  }
];

// Rhyme groups — words that rhyme with each other
const RHYMES = [
  ['FIRE', 'WIRE', 'HIGHER', 'LIAR', 'FLYER'],
  ['COLD', 'BOLD', 'GOLD', 'TOLD', 'HOLD'],
  ['NIGHT', 'FIGHT', 'LIGHT', 'SIGHT', 'RIGHT', 'TIGHT', 'WRITE'],
  ['BEAT', 'HEAT', 'STREET', 'FEAT', 'SWEET', 'MEAT'],
  ['FLOW', 'SHOW', 'GLOW', 'BLOW', 'KNOW', 'LOW', 'GROW'],
  ['KING', 'RING', 'SWING', 'BRING', 'STING', 'THING'],
  ['DARK', 'SPARK', 'MARK', 'SHARK', 'BARK'],
  ['RAGE', 'STAGE', 'PAGE', 'CAGE', 'SAGE'],
  ['SOUL', 'ROLE', 'GOAL', 'CONTROL', 'SCROLL'],
  ['PAIN', 'RAIN', 'CHAIN', 'BRAIN', 'GAIN', 'LANE'],
  ['BLADE', 'SHADE', 'TRADE', 'FADE', 'MADE', 'GRADE'],
  ['STEEL', 'REAL', 'DEAL', 'FEEL', 'HEAL', 'WHEEL'],
  ['POWER', 'TOWER', 'HOUR', 'FLOWER', 'DEVOUR'],
  ['DREAM', 'STREAM', 'CREAM', 'TEAM', 'SCREAM'],
  ['BREAK', 'SHAKE', 'FAKE', 'WAKE', 'MAKE', 'TAKE'],
  ['STONE', 'BONE', 'ZONE', 'THRONE', 'CLONE', 'TONE'],
  ['DEEP', 'KEEP', 'SLEEP', 'STEEP', 'CREEP', 'SWEEP'],
  ['WILD', 'CHILD', 'MILD', 'STYLED', 'FILED'],
  ['CRASH', 'FLASH', 'CLASH', 'DASH', 'SMASH', 'SLASH'],
  ['STORM', 'FORM', 'NORM', 'WARM', 'SWARM'],
  ['VERSE', 'CURSE', 'BURST', 'FIRST', 'WORST']
];

const ALL_WORDS = RHYMES.flat();

function getRhymeGroup(w) { return RHYMES.find(g => g.includes(w)) || null }
function rhymesWith(a, b) { const g = getRhymeGroup(a); return g && g.includes(b) && a !== b }

// === HIPHOP Audio Engine ===
let actx = null;
function initAudio() { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)() }
function noise(dur, vol = .1) {
  if (!actx) return; const n = actx.createBufferSource(), buf = actx.createBuffer(1, actx.sampleRate * dur, actx.sampleRate);
  const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++)d[i] = (Math.random() * 2 - 1);
  n.buffer = buf; const g = actx.createGain(); g.gain.value = vol;
  const f = actx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 3000;
  n.connect(f); f.connect(g); g.connect(actx.destination); n.start();
  g.gain.exponentialRampToValueAtTime(.001, actx.currentTime + dur); return n
}
function osc(freq, dur, type = 'sine', vol = .15) {
  if (!actx) return; const o = actx.createOscillator(), g = actx.createGain();
  o.type = type; o.frequency.value = freq; g.gain.value = vol;
  o.connect(g); g.connect(actx.destination); o.start();
  g.gain.exponentialRampToValueAtTime(.001, actx.currentTime + dur); o.stop(actx.currentTime + dur + .01); return o
}
// 808 Kick (deep sub bass)
function kick808() {
  if (!actx) return; const t = actx.currentTime;
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(30, t + .15);
  g.gain.setValueAtTime(.6, t); g.gain.exponentialRampToValueAtTime(.001, t + .3);
  o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + .3)
}
// Snare (noise burst + body)
function snare() {
  if (!actx) return; const t = actx.currentTime;
  noise(.12, .18);
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = 'triangle'; o.frequency.value = 180;
  g.gain.setValueAtTime(.25, t); g.gain.exponentialRampToValueAtTime(.001, t + .08);
  o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + .08)
}
// Hi-hat (filtered noise)
function hihat(open = false) {
  if (!actx) return; const dur = open ? .15 : .04;
  const n = actx.createBufferSource(), buf = actx.createBuffer(1, actx.sampleRate * dur, actx.sampleRate);
  const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++)d[i] = (Math.random() * 2 - 1);
  n.buffer = buf; const g = actx.createGain(); g.gain.value = .12;
  const f = actx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 8000;
  n.connect(f); f.connect(g); g.connect(actx.destination); n.start();
  g.gain.exponentialRampToValueAtTime(.001, actx.currentTime + dur)
}
// DJ Scratch (frequency sweep)
function scratch() {
  if (!actx) return; const t = actx.currentTime;
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(800, t); o.frequency.linearRampToValueAtTime(200, t + .06);
  o.frequency.linearRampToValueAtTime(1200, t + .12); o.frequency.linearRampToValueAtTime(300, t + .18);
  g.gain.setValueAtTime(.2, t); g.gain.exponentialRampToValueAtTime(.001, t + .2);
  o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + .2)
}
// Air Horn (layered harmonics)
function airhorn() {
  if (!actx) return; const t = actx.currentTime;
  [500, 750, 1000].forEach(f => {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'square'; o.frequency.setValueAtTime(f, t); o.frequency.linearRampToValueAtTime(f * 1.02, t + .4);
    g.gain.setValueAtTime(.08, t); g.gain.setValueAtTime(.12, t + .05); g.gain.exponentialRampToValueAtTime(.001, t + .5);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + .5)
  })
}
// Record stop (reverse spin down)
function recordStop() {
  if (!actx) return; const t = actx.currentTime;
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = 'sawtooth'; o.frequency.setValueAtTime(400, t); o.frequency.exponentialRampToValueAtTime(20, t + .6);
  g.gain.setValueAtTime(.15, t); g.gain.exponentialRampToValueAtTime(.001, t + .6);
  o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + .6)
}
// Beat pattern (boom bap)
let beatCount = 0;
function playBeat() {
  beatCount++;
  kick808();
  if (beatCount % 2 === 0) snare();
  hihat(beatCount % 4 === 3);
}
// Hit sounds per judgment
function playHit(j) {
  if (j === 'FIRE🔥') { airhorn(); setTimeout(snare, 100) }
  else if (j === 'DOPE') { snare() }
  else if (j === 'COOL') { hihat(true) }
  else { recordStop() }
}
// Rhyme chain celebration
function playRhyme() { scratch(); setTimeout(() => airhorn(), 150) }

// Background canvas
const bgc = document.getElementById('bg'); const bgctx = bgc.getContext('2d');
let glyphs = [];
function initBg() {
  bgc.width = innerWidth; bgc.height = innerHeight;
  glyphs = []; for (let i = 0; i < 30; i++)glyphs.push({
    x: Math.random() * bgc.width, y: Math.random() * bgc.height,
    ch: String.fromCharCode(65 + Math.floor(Math.random() * 26)), s: 20 + Math.random() * 40,
    vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, a: Math.random() * .3
  })
}
function drawBg() {
  bgctx.clearRect(0, 0, bgc.width, bgc.height);
  glyphs.forEach(g => {
    bgctx.font = `${g.s}px "Permanent Marker"`; bgctx.fillStyle = `rgba(108,92,231,${g.a})`;
    bgctx.fillText(g.ch, g.x, g.y); g.x += g.vx; g.y += g.vy;
    if (g.x < -50) g.x = bgc.width + 50; if (g.x > bgc.width + 50) g.x = -50;
    if (g.y < -50) g.y = bgc.height + 50; if (g.y > bgc.height + 50) g.y = -50
  });
  requestAnimationFrame(drawBg)
}
initBg(); drawBg(); window.addEventListener('resize', initBg);

// Game state
let tutStep = 0;
const G = window.G = {
  scene: 'title', player: null, enemy: null,
  pHp: 100, eHp: 100, hype: 0, combo: 0, maxCombo: 0, score: 0, rhymeChain: 0, maxRhyme: 0,
  phase: 'attack', lastWord: null, beatTimer: null, beatInterval: 600, beatPhase: 0,
  fireCount: 0, totalHits: 0, turnsLeft: 20, flyingLyrics: [],
  goTitle() { G.showScene('title') },
  goSelect() { initAudio(); G.showScene('select'); buildCharGrid() },
  goTutorial() { initAudio(); tutStep = 0; G.showScene('tutorial'); updateTut() },
  tutNext() {
    tutStep++; if (tutStep >= 4) { G.goSelect(); return }
    updateTut(); scratch()
  },
  tutPrev() {
    tutStep = Math.max(0, tutStep - 1); updateTut(); hihat()
  },
  showScene(id) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active'); G.scene = id
  },
  startBattle() {
    if (!G.player) return; initAudio();
    let pool = CHARS.filter(c => c.id !== G.player.id);
    G.enemy = pool[Math.floor(Math.random() * pool.length)];
    G.pHp = 100; G.eHp = 100; G.hype = 0; G.combo = 0; G.maxCombo = 0; G.score = 0;
    G.rhymeChain = 0; G.maxRhyme = 0; G.fireCount = 0; G.totalHits = 0; G.turnsLeft = 20;
    G.lastWord = null; G.phase = 'attack'; G.flyingLyrics = []; beatCount = 0;
    G.showScene('vs');
    document.getElementById('vsP').textContent = G.player.name;
    document.getElementById('vsP').style.color = G.player.color;
    document.getElementById('vsE').textContent = G.enemy.name;
    document.getElementById('vsE').style.color = G.enemy.color;
    kick808(); setTimeout(snare, 200);
    setTimeout(() => { G.showScene('battle'); initBattle() }, 2000)
  }
};
function updateTut() {
  document.querySelectorAll('.tut-step').forEach(s => s.classList.remove('active'));
  const step = document.querySelector(`.tut-step[data-step="${tutStep}"]`);
  if (step) step.classList.add('active');
  document.querySelectorAll('.tut-dot').forEach((d, i) => d.classList.toggle('active', i === tutStep));
  document.getElementById('tutPrevBtn').style.visibility = tutStep > 0 ? 'visible' : 'hidden';
  document.getElementById('tutNextBtn').textContent = tutStep >= 3 ? 'LET\'S GO!' : 'NEXT';
}

function buildCharGrid() {
  const grid = document.getElementById('charGrid'); grid.innerHTML = '';
  CHARS.forEach(c => {
    const d = document.createElement('div'); d.className = 'char-card'; d.style.setProperty('--c', c.color);
    d.innerHTML = `<div class="icon">${c.avatar}</div><div class="name" style="color:${c.color}">${c.name}</div>
<div class="font-name">${c.font} / ${c.attr}</div>
<div class="stats"><span class="stat">ATK${'★'.repeat(c.atk)}</span><span class="stat">SPD${'★'.repeat(c.spd)}</span><span class="stat">DEF${'★'.repeat(c.def)}</span></div>`;
    d.onclick = () => {
      document.querySelectorAll('.char-card').forEach(x => x.classList.remove('sel'));
      d.classList.add('sel'); G.player = c; document.getElementById('fightBtn').disabled = false; hihat()
    };
    grid.appendChild(d)
  })
}

function initBattle() {
  const p = G.player, e = G.enemy;
  document.getElementById('pName').textContent = p.name; document.getElementById('pName').style.color = p.color;
  document.getElementById('eName').textContent = e.name; document.getElementById('eName').style.color = e.color;
  document.getElementById('pHp').style.background = p.color;
  document.getElementById('eHp').style.background = e.color;
  document.getElementById('pAvatar').textContent = p.avatar;
  document.getElementById('eAvatar').textContent = e.avatar;
  document.getElementById('pNameB').textContent = p.name; document.getElementById('pNameB').style.color = p.color;
  document.getElementById('eNameB').textContent = e.name; document.getElementById('eNameB').style.color = e.color;
  updateHud();
  G.phase = 'attack';
  startBeatLoop();
  showWordPanels();
  updatePhaseLabel();
}

function updateHud() {
  document.getElementById('pHp').style.width = Math.max(0, G.pHp) + '%';
  document.getElementById('eHp').style.width = Math.max(0, G.eHp) + '%';
  document.getElementById('hypeFill').style.width = Math.min(100, G.hype) + '%';
  document.getElementById('comboDisplay').textContent = G.combo > 1 ? `${G.combo} COMBO` : '';
  const hint = document.getElementById('guardHint');
  hint.textContent = G.phase === 'defend' ? '[SPACE] Guard / [D][F][J][K] Counter with rhyme!' :
    G.hype >= 100 ? '[ENTER] ★ PUNCHLINE READY ★' : '[D][F][J][K] Select a word on the beat!';
}

function updatePhaseLabel() {
  const lbl = document.getElementById('phaseLabel');
  if (G.phase === 'attack') { lbl.textContent = 'YOUR TURN — ATTACK!'; lbl.style.color = '#ffd93d' }
  else { lbl.textContent = 'DEFEND — INCOMING!'; lbl.style.color = '#e74c3c' }
}

let beatLoopId = null;
function startBeatLoop() {
  if (beatLoopId) clearInterval(beatLoopId);
  G.beatPhase = 0;
  const bpm = 90; G.beatInterval = 60000 / bpm;
  beatLoopId = setInterval(() => {
    playBeat();
    const ind = document.getElementById('beatInd');
    ind.style.width = '100%'; ind.style.transition = 'none';
    requestAnimationFrame(() => { ind.style.transition = `width ${G.beatInterval * .95}ms linear`; ind.style.width = '0%' });
    G.beatPhase++;
    if (G.beatPhase % 4 === 0 && G.scene === 'battle') {
      // switch phase every 4 beats
      G.phase = G.phase === 'attack' ? 'defend' : 'attack';
      updatePhaseLabel();
      G.turnsLeft--;
      if (G.turnsLeft <= 0 || G.pHp <= 0 || G.eHp <= 0) { endBattle(); return }
      if (G.phase === 'defend') { enemyAttack() }
      showWordPanels()
    }
  }, G.beatInterval)
}

function showWordPanels() {
  const wp = document.getElementById('wordPanels'); wp.innerHTML = '';
  const keys = ['D', 'F', 'J', 'K'];
  let words = [];
  // ensure 1-2 rhyme options if we have a lastWord
  if (G.lastWord && G.phase === 'attack') {
    const rg = getRhymeGroup(G.lastWord);
    if (rg) {
      const candidates = rg.filter(w => w !== G.lastWord);
      const rhymeCount = Math.random() < .6 ? 2 : 1;
      for (let i = 0; i < rhymeCount && candidates.length; i++) {
        const idx = Math.floor(Math.random() * candidates.length);
        words.push(candidates.splice(idx, 1)[0])
      }
    }
  }
  // fill rest with random non-rhyming words
  while (words.length < 4) {
    const w = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
    if (!words.includes(w)) words.push(w)
  }
  // shuffle
  for (let i = words.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[words[i], words[j]] = [words[j], words[i]] }
  words.slice(0, 4).forEach((w, i) => {
    const d = document.createElement('div'); d.className = 'word-panel';
    const fontCSS = G.phase === 'attack' ? G.player.fontCSS : G.enemy.fontCSS;
    d.innerHTML = `<div class="word" style="font-family:${fontCSS};color:${G.phase === 'attack' ? G.player.color : G.enemy.color}">${w}</div><div class="key">[${keys[i]}]</div>`;
    d.onclick = () => selectWord(w, d);
    d.dataset.word = w; d.dataset.key = keys[i];
    wp.appendChild(d)
  })
}

let incomingWord = null;
function enemyAttack() {
  // enemy throws a word at player
  const rg = RHYMES[Math.floor(Math.random() * RHYMES.length)];
  incomingWord = rg[Math.floor(Math.random() * rg.length)];
  // show flying lyric from enemy
  flyLyric(incomingWord, G.enemy, true);
  // prepare counter panels with rhyme options
  setTimeout(() => {
    const wp = document.getElementById('wordPanels'); wp.innerHTML = '';
    const keys = ['D', 'F', 'J', 'K'];
    let words = [];
    const candidates = (getRhymeGroup(incomingWord) || []).filter(w => w !== incomingWord);
    if (candidates.length) words.push(candidates[Math.floor(Math.random() * candidates.length)]);
    while (words.length < 4) { const w = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)]; if (!words.includes(w) && w !== incomingWord) words.push(w) }
    for (let i = words.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[words[i], words[j]] = [words[j], words[i]] }
    words.slice(0, 4).forEach((w, i) => {
      const d = document.createElement('div'); d.className = 'word-panel';
      d.innerHTML = `<div class="word" style="font-family:${G.player.fontCSS};color:${G.player.color}">${w}</div><div class="key">[${keys[i]}]</div>`;
      d.onclick = () => selectWord(w, d); d.dataset.word = w; d.dataset.key = keys[i];
      wp.appendChild(d)
    })
  }, 300)
}

function selectWord(word, panel) {
  if (G.scene !== 'battle') return;
  panel.classList.add('hit');
  if (G.phase === 'attack') {
    // Attack
    let isRhyme = G.lastWord && rhymesWith(G.lastWord, word);
    if (isRhyme) { G.rhymeChain++; if (G.rhymeChain > G.maxRhyme) G.maxRhyme = G.rhymeChain; playRhyme(); showRhymeAlert(G.rhymeChain) }
    else { G.rhymeChain = 0 }
    let mult = 1 + G.rhymeChain * .5;
    let baseDmg = 5 + G.player.atk * 3;
    let dmg = Math.round(baseDmg * mult);
    // timing judgment (simplified — based on beat phase)
    const beatPos = (Date.now() % G.beatInterval) / G.beatInterval;
    const off = Math.min(beatPos, 1 - beatPos);
    let judge;
    if (off < .08) { judge = 'FIRE🔥'; dmg = Math.round(dmg * 1.5); G.fireCount++ }
    else if (off < .15) { judge = 'DOPE'; dmg = Math.round(dmg * 1) }
    else if (off < .25) { judge = 'COOL'; dmg = Math.round(dmg * .7) }
    else { judge = 'WACK💀'; dmg = 0; G.pHp -= 3; G.combo = 0; G.rhymeChain = 0 }
    if (judge !== 'WACK💀') { G.eHp -= dmg; G.combo++; if (G.combo > G.maxCombo) G.maxCombo = G.combo; G.score += dmg * 10; G.hype = Math.min(100, G.hype + 8 + (isRhyme ? 12 : 0)); G.totalHits++ }
    G.lastWord = word;
    showJudge(judge); playHit(judge);
    flyLyric(word, G.player, false);
    // shake enemy on hit
    if (judge !== 'WACK💀') { const es = document.getElementById('eSpr'); es.style.transform = 'translateX(-8px)'; setTimeout(() => es.style.transform = '', 150) }
    else { const ps = document.getElementById('pSpr'); ps.style.transform = 'translateX(8px)'; setTimeout(() => ps.style.transform = '', 150) }
    updateHud();
    showWordPanels();
    if (G.eHp <= 0 || G.pHp <= 0) { setTimeout(endBattle, 500); return }
  } else {
    // Defend — counter or guard
    let isCounter = incomingWord && rhymesWith(incomingWord, word);
    if (isCounter) {
      showJudge('COUNTER!'); playRhyme();
      showRhymeAlert(0, 'COUNTER RHYME!');
      G.eHp -= 8; G.hype = Math.min(100, G.hype + 15); G.score += 500; G.combo++; G.totalHits++;
      flyLyric(word, G.player, false);
      const es = document.getElementById('eSpr'); es.style.transform = 'translateX(-12px)'; setTimeout(() => es.style.transform = '', 150)
    } else {
      showJudge('GUARD'); kick808();
      G.pHp -= 5;// partial damage
    }
    incomingWord = null;
    updateHud();
    if (G.eHp <= 0 || G.pHp <= 0) { setTimeout(endBattle, 500) }
  }
}

// Keyboard input
document.addEventListener('keydown', e => {
  if (G.scene !== 'battle') return;
  const keyMap = { d: 0, f: 1, j: 2, k: 3 };
  const idx = keyMap[e.key.toLowerCase()];
  if (idx !== undefined) {
    const panels = document.querySelectorAll('.word-panel');
    if (panels[idx]) { panels[idx].click() }
  }
  if (e.key === ' ' && G.phase === 'defend') {
    // Guard
    e.preventDefault();
    showJudge('GUARD'); kick808();
    G.pHp -= 3; incomingWord = null; updateHud();
    if (G.pHp <= 0) setTimeout(endBattle, 500)
  }
  if (e.key === 'Enter' && G.hype >= 100) {
    // Punchline!
    G.hype = 0; updateHud();
    doPunchline()
  }
});

function flyLyric(word, char, incoming) {
  const el = document.createElement('div'); el.className = 'lyric-fly';
  el.textContent = word; el.style.fontFamily = char.fontCSS; el.style.color = char.color;
  el.style.fontSize = `${1.2 + Math.random() * .8}rem`;
  const battle = document.getElementById('battle'); battle.appendChild(el);
  if (incoming) {
    el.style.left = '15%'; el.style.top = `${35 + Math.random() * 20}%`;
    gsapFly(el, 1, 0)
  } else {
    el.style.right = '15%'; el.style.top = `${35 + Math.random() * 20}%`;
    gsapFly(el, 0, 1)
  }
}

function gsapFly(el, fromLeft, toRight) {
  let start = Date.now(); const dur = 600;
  const sx = fromLeft ? -100 : 100; const ex = fromLeft ? 100 : -100;
  function tick() {
    const p = Math.min(1, (Date.now() - start) / dur);
    const x = sx + (ex - sx) * p;
    el.style.transform = `translateX(${x}px)`;
    el.style.opacity = p < .7 ? 1 : (1 - (p - .7) / .3);
    if (p < 1) requestAnimationFrame(tick); else el.remove()
  }
  requestAnimationFrame(tick)
}

function showJudge(text) {
  const el = document.getElementById('judgeFlash');
  el.textContent = text;
  el.style.color = text.includes('FIRE') ? '#ff6b6b' : text === 'DOPE' ? '#ffd93d' : text === 'COOL' ? '#6bcb77' : text.includes('COUNTER') ? '#4d96ff' : '#888';
  el.className = 'judge-flash show';
  setTimeout(() => el.className = 'judge-flash', 600)
}

function showRhymeAlert(chain, customText) {
  const el = document.getElementById('rhymeAlert');
  el.textContent = customText || (chain >= 4 ? '🔥 BARS!! 🔥' : chain >= 3 ? 'RHYME CHAIN x' + chain + '!!' : chain >= 2 ? 'RHYME! x' + chain : 'RHYME!');
  el.className = 'rhyme-alert show';
  setTimeout(() => el.className = 'rhyme-alert', 800)
}

function doPunchline() {
  const ov = document.getElementById('punchOverlay');
  const txt = document.getElementById('punchText');
  txt.style.fontFamily = G.player.fontCSS; txt.style.color = G.player.color;
  txt.textContent = G.player.punch;
  ov.classList.add('show');
  airhorn(); setTimeout(() => scratch(), 200); setTimeout(() => airhorn(), 400);
  G.eHp -= 25; updateHud();
  setTimeout(() => { ov.classList.remove('show'); if (G.eHp <= 0) endBattle() }, 2000)
}

function endBattle() {
  if (beatLoopId) { clearInterval(beatLoopId); beatLoopId = null }
  const win = G.eHp <= 0 || (G.pHp > G.eHp);
  G.showScene('result');
  const rt = document.getElementById('resultTitle');
  if (win) { rt.textContent = 'YOU WIN!'; rt.style.color = '#ffd93d' }
  else { rt.textContent = 'YOU LOSE...'; rt.style.color = '#e74c3c' }
  const sg = document.getElementById('statsGrid');
  sg.innerHTML = `
<div class="stat-item"><div class="val">${G.score.toLocaleString()}</div><div class="lbl">SCORE</div></div>
<div class="stat-item"><div class="val">${G.maxCombo}</div><div class="lbl">MAX COMBO</div></div>
<div class="stat-item"><div class="val">${G.maxRhyme}</div><div class="lbl">BEST RHYME CHAIN</div></div>
<div class="stat-item"><div class="val">${G.totalHits ? Math.round(G.fireCount / G.totalHits * 100) : 0}%</div><div class="lbl">FIRE RATE</div></div>`;
}
