const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');

const statusEl = document.getElementById('status');
const panicBtn = document.getElementById('panicMute');
const quickJamBtn = document.getElementById('quickJam');
const resetBtn = document.getElementById('resetAll');
const toggleBtn = document.getElementById('toggleRun');
const masterSlider = document.getElementById('masterGain');
const tempoSlider = document.getElementById('tempo');
const tempoValue = document.getElementById('tempoValue');
const chordToggle = document.getElementById('chordModeToggle');
const presetButtons = [...document.querySelectorAll('[data-preset]')];
const chordButtons = [...document.querySelectorAll('[data-chord]')];

let audioCtx;
let masterGain;
let limiter;
let running = true;
let tempo = +tempoSlider.value;
let nodes = [];
let step = 0;
let nextStepAt = 0;

let chordMode = chordToggle.checked;
let stageFlash = 0;
let activeChordSet = 'lofi';
let activeChordIndex = 0;

const TWO_PI = Math.PI * 2;
const safeScale = [0, 2, 4, 7, 9, 12]; // major pentatonic

const baseScales = {
  minor: [0, 3, 7, 10, 12],
  pent: [0, 2, 5, 7, 10, 12],
  dissonant: [0, 1, 6, 7, 11, 12],
  bellish: [0, 4, 7, 11, 14],
  safe: safeScale
};

const chordPresets = {
  lofi: {
    label: 'Lo-Fi Flow',
    root: 48,
    progression: [
      [0, 3, 7],
      [5, 8, 12],
      [7, 10, 14],
      [3, 7, 10]
    ]
  },
  dreamy: {
    label: 'Dreamy Bloom',
    root: 50,
    progression: [
      [0, 4, 9],
      [2, 7, 11],
      [4, 9, 12],
      [7, 11, 14]
    ]
  },
  bright: {
    label: 'Bright Lift',
    root: 52,
    progression: [
      [0, 4, 7],
      [5, 9, 12],
      [7, 11, 14],
      [9, 12, 16]
    ]
  },
  tense: {
    label: 'Tense Drive',
    root: 47,
    progression: [
      [0, 1, 7],
      [3, 6, 10],
      [5, 8, 11],
      [1, 6, 9]
    ]
  }
};

function ensureAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  masterGain = audioCtx.createGain();
  masterGain.gain.value = +masterSlider.value;

  limiter = audioCtx.createDynamicsCompressor();
  limiter.threshold.value = -8;
  limiter.knee.value = 15;
  limiter.ratio.value = 9;
  limiter.attack.value = 0.01;
  limiter.release.value = 0.15;

  masterGain.connect(limiter).connect(audioCtx.destination);
  nextStepAt = audioCtx.currentTime;
  statusEl.textContent = `Audio: running • ${chordMode ? `Chord Mode (${chordPresets[activeChordSet].label})` : 'Free Mode'}`;
}

function quantizeSemitone(value, scale = safeScale) {
  const octave = Math.floor(value / 12);
  const inOctave = ((value % 12) + 12) % 12;
  let closest = scale[0];
  let bestDiff = Infinity;

  scale.forEach((note) => {
    const diff = Math.abs(note - inOctave);
    if (diff < bestDiff) {
      bestDiff = diff;
      closest = note;
    }
  });

  return octave * 12 + closest;
}

function chordForStep(stepOffset = 0) {
  const preset = chordPresets[activeChordSet] || chordPresets.lofi;
  const idx = (activeChordIndex + stepOffset + preset.progression.length) % preset.progression.length;
  return preset.progression[idx].map(interval => preset.root + interval);
}

class OrbitNode {
  constructor(x, y, opts = {}) {
    ensureAudio();
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * (opts.speed ?? 1.8);
    this.vy = (Math.random() - 0.5) * (opts.speed ?? 1.8);
    this.r = opts.radius ?? (10 + Math.random() * 12);
    this.hue = opts.hue ?? (Math.random() * 360);
    this.pan = ((x / canvas.width) * 2) - 1;
    this.scale = opts.scale || (chordMode ? 'safe' : 'minor');
    this.baseScale = this.scale;
    this.oct = opts.oct ?? 2;
    this.density = opts.density ?? (1 + Math.floor(Math.random() * 4));
    this.energy = 0.8;

    this.osc = audioCtx.createOscillator();
    this.osc.type = opts.wave || ['sine', 'triangle', 'square', 'sawtooth'][Math.floor(Math.random() * 4)];
    this.gain = audioCtx.createGain();
    this.gain.gain.value = 0;
    this.filter = audioCtx.createBiquadFilter();
    this.filter.type = 'bandpass';
    this.filter.Q.value = 8 + Math.random() * 10;

    this.panner = audioCtx.createStereoPanner();
    this.panner.pan.value = this.pan;

    this.osc.connect(this.filter).connect(this.gain).connect(this.panner).connect(masterGain);
    this.osc.start();
    this.setPitchFromPos();
  }

  setPitchFromPos(mod = 0) {
    let semitone;

    if (chordMode) {
      const chord = chordForStep(step + mod);
      const lane = Math.floor((this.y / canvas.height) * chord.length) % chord.length;
      semitone = chord[lane] + this.oct * 12;
      semitone = quantizeSemitone(semitone, safeScale);
    } else {
      const scale = baseScales[this.scale] || baseScales.minor;
      const idx = Math.floor((this.y / canvas.height) * scale.length) % scale.length;
      semitone = scale[(idx + mod + scale.length) % scale.length] + this.oct * 12;
    }

    const hz = 27.5 * 2 ** (semitone / 12);
    this.osc.frequency.setTargetAtTime(hz, audioCtx.currentTime, 0.03);
    this.filter.frequency.setTargetAtTime(Math.min(2800, hz * 3.8), audioCtx.currentTime, 0.08);
  }

  pulse(strength = 1) {
    const now = audioCtx.currentTime;
    const a = Math.min(0.22, 0.04 + 0.06 * strength);
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.setValueAtTime(0.0001, now);
    this.gain.gain.linearRampToValueAtTime(a, now + 0.016);
    this.gain.gain.exponentialRampToValueAtTime(0.0001, now + (0.14 + 0.18 / this.density));
    this.energy = Math.min(1.5, this.energy + 0.3);
    stageFlash = Math.min(1, stageFlash + 0.18 * strength);
  }

  tick(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.x < this.r || this.x > canvas.width - this.r) this.vx *= -1;
    if (this.y < this.r || this.y > canvas.height - this.r) this.vy *= -1;

    this.x = Math.max(this.r, Math.min(canvas.width - this.r, this.x));
    this.y = Math.max(this.r, Math.min(canvas.height - this.r, this.y));

    this.vx *= 0.999;
    this.vy *= 0.999;

    this.pan = ((this.x / canvas.width) * 2) - 1;
    this.panner.pan.setTargetAtTime(this.pan, audioCtx.currentTime, 0.08);
    this.energy = Math.max(0.2, this.energy * 0.994);
  }

  draw() {
    const glow = this.r * (1.4 + this.energy * 0.9);
    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.hue},90%,55%,0.14)`;
    ctx.arc(this.x, this.y, glow, 0, TWO_PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.hue},95%,65%,0.88)`;
    ctx.arc(this.x, this.y, this.r, 0, TWO_PI);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = `hsla(${this.hue},100%,75%,${0.25 + this.energy * 0.3})`;
    ctx.lineWidth = 1.6;
    ctx.arc(this.x, this.y, this.r + 4 + this.energy * 7, 0, TWO_PI);
    ctx.stroke();
  }

  dispose() {
    const now = audioCtx.currentTime;
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.setTargetAtTime(0.0001, now, 0.02);
    this.osc.stop(now + 0.08);
    this.osc.disconnect();
    this.filter.disconnect();
    this.gain.disconnect();
    this.panner.disconnect();
  }
}

function stagePos(e) {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches?.[0] || e.changedTouches?.[0];
  const clientX = touch ? touch.clientX : e.clientX;
  const clientY = touch ? touch.clientY : e.clientY;
  return {
    x: ((clientX - rect.left) / rect.width) * canvas.width,
    y: ((clientY - rect.top) / rect.height) * canvas.height
  };
}

function spawnNode(x, y, opts = {}) {
  if (nodes.length >= 48) {
    const old = nodes.shift();
    old.dispose();
  }
  nodes.push(new OrbitNode(x, y, opts));
}

function interactionGraph() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 170) {
        const pull = (170 - dist) / 170 * 0.005;
        a.vx += dx * pull;
        a.vy += dy * pull;
        b.vx -= dx * pull;
        b.vy -= dy * pull;

        if (dist < a.r + b.r + 3) {
          const beatBoost = 0.2 + (1 - dist / (a.r + b.r + 3)) * 0.7;
          a.pulse(beatBoost);
          b.pulse(beatBoost);
          a.setPitchFromPos(1);
          b.setPitchFromPos(-1);
        }

        ctx.beginPath();
        ctx.strokeStyle = `hsla(${(a.hue + b.hue) * 0.5},95%,72%,${0.04 + (170 - dist) / 170 * 0.22})`;
        ctx.lineWidth = 1;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
}

function sequencerTick() {
  if (!audioCtx || !running) return;
  const secPerBeat = 60 / tempo;

  while (nextStepAt < audioCtx.currentTime + 0.1) {
    nodes.forEach((n, idx) => {
      const cycle = Math.max(1, n.density);
      const shouldHit = ((step + idx) % cycle) === 0;
      if (shouldHit) {
        n.setPitchFromPos((step + idx) % 3 - 1);
        n.pulse(0.7);
      }
    });

    if (chordMode && step % 4 === 0) {
      activeChordIndex = (activeChordIndex + 1) % chordPresets[activeChordSet].progression.length;
    }

    step++;
    nextStepAt += secPerBeat / 2;
  }
}

let lastTs = performance.now();
function frame(ts) {
  const dt = Math.min(32, ts - lastTs) * 0.075;
  lastTs = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(10,12,24,0.28)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  nodes.forEach(n => n.tick(dt));
  interactionGraph();
  nodes.forEach(n => n.draw());
  sequencerTick();

  stageFlash = Math.max(0, stageFlash * 0.92 - 0.01);
  document.documentElement.style.setProperty('--pulse', stageFlash.toFixed(3));

  requestAnimationFrame(frame);
}

function panicMute() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setTargetAtTime(0.0001, now, 0.01);
  statusEl.textContent = 'Audio: muted (panic)';
}

function setMaster(level) {
  if (!audioCtx || !masterGain) return;
  masterGain.gain.setTargetAtTime(level, audioCtx.currentTime, 0.02);
}

function clearNodes() {
  nodes.forEach(n => n.dispose());
  nodes = [];
}

function resetAll() {
  panicMute();
  clearNodes();
  setTimeout(() => {
    if (audioCtx) setMaster(+masterSlider.value);
    statusEl.textContent = `Audio: ${running ? 'running' : 'paused'} • ${chordMode ? `Chord Mode (${chordPresets[activeChordSet].label})` : 'Free Mode'}`;
  }, 90);
}

function applyPreset(name) {
  resetAll();

  const presets = {
    stardust: () => {
      for (let i = 0; i < 10; i++) {
        spawnNode(
          120 + i * 95,
          110 + (i % 2) * 80,
          { wave: 'triangle', scale: 'pent', oct: 2 + (i % 2), density: 2 + (i % 3), hue: 180 + i * 8, speed: 2.2 }
        );
      }
    },
    gridlock: () => {
      for (let y = 1; y <= 3; y++) {
        for (let x = 1; x <= 5; x++) {
          spawnNode(
            x * (canvas.width / 6),
            y * (canvas.height / 4),
            { wave: 'square', scale: 'dissonant', oct: 1 + (y % 2), density: 1 + ((x + y) % 4), hue: 320 - y * 30 + x * 5, speed: 1.2 }
          );
        }
      }
    },
    nocturne: () => {
      for (let i = 0; i < 8; i++) {
        spawnNode(
          canvas.width * (0.15 + Math.random() * 0.7),
          canvas.height * (0.2 + Math.random() * 0.7),
          { wave: 'sine', scale: 'bellish', oct: 3, density: 3 + (i % 4), hue: 220 + i * 6, speed: 0.9, radius: 8 + i * 0.7 }
        );
      }
    },
    hazard: () => {
      for (let i = 0; i < 12; i++) {
        spawnNode(
          canvas.width / 2 + Math.cos(i / 12 * TWO_PI) * 210,
          canvas.height / 2 + Math.sin(i / 12 * TWO_PI) * 150,
          { wave: i % 2 ? 'sawtooth' : 'square', scale: 'dissonant', oct: 2, density: 1 + (i % 2), hue: i % 2 ? 12 : 350, speed: 2.6, radius: 11 }
        );
      }
    }
  };

  presets[name]?.();
  statusEl.textContent = `Audio: running (${name})`;
}

function quickJam() {
  ensureAudio();
  clearNodes();

  const laneYs = [0.2, 0.34, 0.5, 0.66, 0.8];
  const laneXs = [0.18, 0.36, 0.54, 0.72, 0.86];

  laneXs.forEach((xNorm, i) => {
    spawnNode(
      canvas.width * xNorm,
      canvas.height * laneYs[i % laneYs.length],
      {
        wave: i % 2 ? 'triangle' : 'sine',
        scale: chordMode ? 'safe' : 'minor',
        oct: 2 + (i % 2),
        density: 2 + (i % 3),
        hue: 165 + i * 22,
        speed: 1.3,
        radius: 10 + i
      }
    );
  });

  stageFlash = Math.min(1, stageFlash + 0.35);
  statusEl.textContent = `Audio: running • Quick Jam (${chordMode ? chordPresets[activeChordSet].label : 'Free Mode'})`;
}

function harmonyBloom() {
  ensureAudio();
  const chord = chordForStep(0);
  const centerX = canvas.width * 0.5;
  const centerY = canvas.height * 0.48;

  chord.slice(0, 3).forEach((_, i) => {
    const angle = (i / 3) * TWO_PI - Math.PI / 2;
    const radius = 110;
    spawnNode(
      centerX + Math.cos(angle) * radius,
      centerY + Math.sin(angle) * radius,
      {
        wave: i === 1 ? 'triangle' : 'sine',
        scale: chordMode ? 'safe' : 'minor',
        oct: 2,
        density: 1 + i,
        hue: 280 + i * 28,
        speed: 1.1,
        radius: 11
      }
    );
  });

  stageFlash = Math.min(1, stageFlash + 0.45);
  statusEl.textContent = `Audio: running • Harmony Bloom (${chordMode ? chordPresets[activeChordSet].label : 'Free Mode'})`;
}

function setChordPreset(name) {
  if (!chordPresets[name]) return;
  activeChordSet = name;
  activeChordIndex = 0;

  chordButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.chord === name);
  });

  if (chordMode) {
    nodes.forEach(node => node.setPitchFromPos(0));
    statusEl.textContent = `Audio: running • Chord Mode (${chordPresets[name].label})`;
  }
}

function toggleChordMode(on) {
  chordMode = on;
  nodes.forEach(node => {
    node.scale = chordMode ? 'safe' : node.baseScale;
    node.setPitchFromPos(0);
  });

  statusEl.textContent = `Audio: ${running ? 'running' : 'paused'} • ${chordMode ? `Chord Mode (${chordPresets[activeChordSet].label})` : 'Free Mode'}`;
}

canvas.addEventListener('pointerdown', (e) => {
  ensureAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const p = stagePos(e);
  spawnNode(p.x, p.y, { scale: chordMode ? 'safe' : 'minor', wave: chordMode ? 'triangle' : undefined });
});

panicBtn.addEventListener('click', panicMute);
quickJamBtn.addEventListener('click', quickJam);
resetBtn.addEventListener('click', resetAll);

chordToggle.addEventListener('change', () => {
  ensureAudio();
  toggleChordMode(chordToggle.checked);
});

toggleBtn.addEventListener('click', async () => {
  ensureAudio();
  if (running) {
    running = false;
    toggleBtn.textContent = 'Resume';
    await audioCtx.suspend();
    statusEl.textContent = 'Audio: paused';
  } else {
    running = true;
    toggleBtn.textContent = 'Pause';
    await audioCtx.resume();
    nextStepAt = audioCtx.currentTime;
    statusEl.textContent = `Audio: running • ${chordMode ? `Chord Mode (${chordPresets[activeChordSet].label})` : 'Free Mode'}`;
  }
});

masterSlider.addEventListener('input', () => setMaster(+masterSlider.value));

tempoSlider.addEventListener('input', () => {
  tempo = +tempoSlider.value;
  tempoValue.textContent = `${tempo} BPM`;
});

presetButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    ensureAudio();
    applyPreset(btn.dataset.preset);
  });
});

chordButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    ensureAudio();
    setChordPreset(btn.dataset.chord);
  });
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    harmonyBloom();
    return;
  }

  const keyMap = { '1': 'lofi', '2': 'dreamy', '3': 'bright', '4': 'tense' };
  const chord = keyMap[e.key];
  if (!chord) return;
  ensureAudio();
  setChordPreset(chord);
});

window.addEventListener('resize', () => {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round((rect.width / (16 / 9)) * ratio);
});

(function init() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round((rect.width / (16 / 9)) * ratio);
  tempoValue.textContent = `${tempo} BPM`;
  setChordPreset('lofi');
  requestAnimationFrame(frame);
})();
