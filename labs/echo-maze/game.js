const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const timerEl = document.getElementById('timer');
const bestEl = document.getElementById('best');
const msgEl = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

const W = canvas.width;
const H = canvas.height;

const walls = [
  // outer bounds
  { x: 0, y: 0, w: W, h: 20 },
  { x: 0, y: H - 20, w: W, h: 20 },
  { x: 0, y: 0, w: 20, h: H },
  { x: W - 20, y: 0, w: 20, h: H },

  // maze lanes
  { x: 100, y: 60, w: 20, h: 380 },
  { x: 180, y: 140, w: 260, h: 20 },
  { x: 180, y: 220, w: 20, h: 260 },
  { x: 260, y: 60, w: 20, h: 320 },
  { x: 340, y: 220, w: 220, h: 20 },
  { x: 420, y: 60, w: 20, h: 260 },
  { x: 500, y: 300, w: 20, h: 180 },
  { x: 580, y: 140, w: 20, h: 260 },
  { x: 660, y: 60, w: 20, h: 240 },
  { x: 740, y: 220, w: 20, h: 220 },
  { x: 660, y: 420, w: 160, h: 20 },
  { x: 560, y: 60, w: 180, h: 20 },
];

const start = { x: 55, y: 55 };
const exit = { x: 840, y: 485, w: 40, h: 40 };

let player;
let keys;
let running;
let won;
let startTime;
let elapsed;
let bestTime = Number(localStorage.getItem('echoMazeBest')) || null;

const moveSpeed = 190;
const playerRadius = 10;

const pulse = {
  active: false,
  startAt: 0,
  duration: 1000,
  maxRadius: 220,
};

function resetGame() {
  player = { x: start.x, y: start.y };
  keys = Object.create(null);
  running = true;
  won = false;
  startTime = performance.now();
  elapsed = 0;
  pulse.active = false;
  msgEl.textContent = '';
}

function updateBestText() {
  bestEl.textContent = bestTime ? `${bestTime.toFixed(2)}s` : '--';
}

function formatSeconds(seconds) {
  return `${seconds.toFixed(2)}s`;
}

function collidesCircleRect(cx, cy, r, rect) {
  const nearestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
  const nearestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
  const dx = cx - nearestX;
  const dy = cy - nearestY;
  return dx * dx + dy * dy < r * r;
}

function tryMove(dx, dy) {
  const nx = player.x + dx;
  const ny = player.y + dy;

  const hit = walls.some((w) => collidesCircleRect(nx, ny, playerRadius, w));
  if (!hit) {
    player.x = nx;
    player.y = ny;
  }
}

function reachedExit() {
  return (
    player.x + playerRadius > exit.x &&
    player.x - playerRadius < exit.x + exit.w &&
    player.y + playerRadius > exit.y &&
    player.y - playerRadius < exit.y + exit.h
  );
}

function triggerPulse() {
  pulse.active = true;
  pulse.startAt = performance.now();
}

function pulseState(now) {
  if (!pulse.active) return null;
  const t = now - pulse.startAt;
  if (t >= pulse.duration) {
    pulse.active = false;
    return null;
  }

  const progress = t / pulse.duration;
  const radius = pulse.maxRadius * Math.sqrt(progress);
  const alpha = 1 - progress;
  return { radius, alpha };
}

function wallVisibility(wall, pstate) {
  if (!pstate) return 0;

  const cx = wall.x + wall.w / 2;
  const cy = wall.y + wall.h / 2;
  const dx = cx - player.x;
  const dy = cy - player.y;
  const d = Math.hypot(dx, dy);

  const edgeFade = Math.max(0, 1 - d / (pstate.radius + 1));
  return edgeFade * pstate.alpha;
}

function update(dt, now) {
  if (!running) return;

  const vx = (keys['arrowright'] || keys['d'] ? 1 : 0) - (keys['arrowleft'] || keys['a'] ? 1 : 0);
  const vy = (keys['arrowdown'] || keys['s'] ? 1 : 0) - (keys['arrowup'] || keys['w'] ? 1 : 0);

  if (vx || vy) {
    const length = Math.hypot(vx, vy) || 1;
    const nx = vx / length;
    const ny = vy / length;
    tryMove(nx * moveSpeed * dt, ny * moveSpeed * dt);
  }

  elapsed = (now - startTime) / 1000;

  if (!won && reachedExit()) {
    won = true;
    running = false;
    const result = Number(elapsed.toFixed(2));

    if (!bestTime || result < bestTime) {
      bestTime = result;
      localStorage.setItem('echoMazeBest', String(bestTime));
      msgEl.textContent = `Escaped in ${formatSeconds(result)} — new best!`;
    } else {
      msgEl.textContent = `Escaped in ${formatSeconds(result)}.`;
    }
    updateBestText();
  }
}

function draw(now) {
  const pstate = pulseState(now);

  ctx.clearRect(0, 0, W, H);

  // Base darkness
  ctx.fillStyle = '#01050d';
  ctx.fillRect(0, 0, W, H);

  // Exit visible only during pulse and only if nearby
  if (pstate) {
    const ex = exit.x + exit.w / 2;
    const ey = exit.y + exit.h / 2;
    const d = Math.hypot(ex - player.x, ey - player.y);
    const visible = Math.max(0, 1 - d / (pstate.radius + 1)) * pstate.alpha;
    if (visible > 0.01) {
      ctx.fillStyle = `rgba(143,255,190,${0.2 + visible * 0.7})`;
      ctx.fillRect(exit.x, exit.y, exit.w, exit.h);
      ctx.strokeStyle = `rgba(143,255,190,${0.3 + visible * 0.7})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(exit.x + 1, exit.y + 1, exit.w - 2, exit.h - 2);
    }
  }

  // Walls are revealed by pulse
  for (const w of walls) {
    const vis = wallVisibility(w, pstate);
    if (vis > 0.01) {
      ctx.fillStyle = `rgba(110,170,255,${0.08 + vis * 0.75})`;
      ctx.fillRect(w.x, w.y, w.w, w.h);
    }
  }

  // Pulse ring visual
  if (pstate) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, pstate.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(99,228,255,${pstate.alpha * 0.9})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Player (always visible)
  ctx.beginPath();
  ctx.arc(player.x, player.y, playerRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#63e4ff';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 1;
  ctx.stroke();

  timerEl.textContent = formatSeconds(elapsed);
}

let previous = performance.now();
function loop(now) {
  const dt = Math.min(0.033, (now - previous) / 1000);
  previous = now;

  update(dt, now);
  draw(now);

  requestAnimationFrame(loop);
}

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  if (key === ' ') {
    e.preventDefault();
    triggerPulse();
    return;
  }

  if (key === 'r') {
    resetGame();
    return;
  }

  keys[key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

restartBtn.addEventListener('click', resetGame);

updateBestText();
resetGame();
requestAnimationFrame(loop);
