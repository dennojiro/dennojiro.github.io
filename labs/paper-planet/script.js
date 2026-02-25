const canvas = document.getElementById('planet');
const ctx = canvas.getContext('2d');

const els = {
  food: document.getElementById('food'),
  energy: document.getElementById('energy'),
  materials: document.getElementById('materials'),
  mood: document.getElementById('mood'),
  population: document.getElementById('population'),
  phase: document.getElementById('phase'),
  message: document.getElementById('message'),
  selection: document.getElementById('selection')
};

const buttons = [...document.querySelectorAll('[data-structure]')];
const center = { x: canvas.width / 2, y: 225 };
const planetRadius = 110;

const state = {
  time: 0,
  selected: null,
  resources: {
    food: 22,
    energy: 20,
    materials: 14,
    mood: 68,
    population: 6,
  },
  slots: Array(8).fill(null),
  gameOver: false,
};

const structures = {
  farm: { name: 'Leaf Farm', icon: '🌱', cost: { materials: 4 }, upkeep: { energy: 0.2 } },
  mill: { name: 'Wind Mill', icon: '🌀', cost: { materials: 5 }, upkeep: {} },
  pod: { name: 'Cozy Pod', icon: '🏠', cost: { materials: 6, energy: 2 }, upkeep: { food: 0.2 } },
};

function setSelection(type) {
  state.selected = type;
  buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.structure === type));
  els.selection.textContent = type
    ? `Selected: ${structures[type].icon} ${structures[type].name}`
    : 'Selected: none (click a building, then click a slot around the planet)';
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.structure;
    setSelection(state.selected === type ? null : type);
  });
});

function canPay(cost) {
  return Object.entries(cost).every(([k, v]) => state.resources[k] >= v);
}

function pay(cost) {
  for (const [k, v] of Object.entries(cost)) state.resources[k] -= v;
}

function slotPosition(i) {
  const ang = -Math.PI / 2 + (Math.PI * 2 * i) / state.slots.length;
  return {
    x: center.x + Math.cos(ang) * (planetRadius + 28),
    y: center.y + Math.sin(ang) * (planetRadius + 28),
  };
}

canvas.addEventListener('click', (ev) => {
  if (state.gameOver) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (ev.clientX - rect.left) * scaleX;
  const y = (ev.clientY - rect.top) * scaleY;

  for (let i = 0; i < state.slots.length; i++) {
    const p = slotPosition(i);
    if (Math.hypot(x - p.x, y - p.y) < 20) {
      if (state.slots[i]) {
        state.slots[i] = null;
        showMessage('Structure removed. (No refund)', '');
        return;
      }

      if (!state.selected) {
        showMessage('Pick a building first.', 'bad');
        return;
      }

      const def = structures[state.selected];
      if (!canPay(def.cost)) {
        showMessage('Not enough resources to build that.', 'bad');
        return;
      }

      pay(def.cost);
      state.slots[i] = state.selected;
      showMessage(`${def.icon} ${def.name} built!`, 'ok');
      return;
    }
  }
});

function isDay() {
  return (Math.sin(state.time * 0.25) + 1) / 2 > 0.48;
}

function structureCounts() {
  return state.slots.reduce((acc, s) => {
    if (s) acc[s] += 1;
    return acc;
  }, { farm: 0, mill: 0, pod: 0 });
}

function clampResource() {
  for (const key of ['food', 'energy', 'materials']) {
    state.resources[key] = Math.max(0, Math.min(999, state.resources[key]));
  }
  state.resources.mood = Math.max(0, Math.min(100, state.resources.mood));
  state.resources.population = Math.max(0, Math.min(60, state.resources.population));
}

function tick() {
  if (state.gameOver) return;

  state.time += 0.1;
  const day = isDay();
  const c = structureCounts();
  const r = state.resources;

  // Baseline life support usage.
  r.food -= r.population * 0.055;
  r.energy -= r.population * 0.03;

  // Structure upkeep.
  r.energy -= c.farm * 0.2;
  r.food -= c.pod * 0.2;

  // Production loops.
  r.food += c.farm * (day ? 0.48 : 0.08);
  r.energy += c.mill * 0.36;

  // Pods provide housing + comfort.
  const popCap = 6 + c.pod * 3;

  // Mood dynamics.
  r.mood += day ? 0.12 : -0.08;
  if (r.food < 8 || r.energy < 6) r.mood -= 0.4;
  if (c.farm + c.mill + c.pod >= 5) r.mood += 0.08;

  // Convert stability into materials.
  if (r.energy > 16 && r.food > 16) r.materials += 0.2 + c.mill * 0.04;

  // Population drift.
  if (r.food > 18 && r.energy > 14 && r.mood > 55 && r.population < popCap) {
    r.population += 0.03;
  }
  if (r.food < 4 || r.energy < 3 || r.mood < 20) {
    r.population -= 0.07;
  }

  clampResource();

  // Win/fail conditions.
  if (r.population <= 1) {
    state.gameOver = true;
    showMessage('Your tiny civilization faded away. Click reload to retry.', 'bad');
  } else if (r.population >= 14 && r.mood > 75 && r.food > 30 && r.energy > 25) {
    showMessage('Planet thriving! You made a happy paper utopia 🎉', 'ok');
  } else if (r.food < 6 || r.energy < 5) {
    showMessage('Low resources! Build balance fast.', 'bad');
  } else {
    showMessage('Keep your tiny world balanced.', '');
  }

  render();
  updateHUD(day);
}

function updateHUD(day) {
  const r = state.resources;
  els.food.textContent = r.food.toFixed(1);
  els.energy.textContent = r.energy.toFixed(1);
  els.materials.textContent = r.materials.toFixed(1);
  els.mood.textContent = r.mood.toFixed(0);
  els.population.textContent = r.population.toFixed(1);
  els.phase.textContent = day ? 'Day' : 'Night';
}

function showMessage(text, cls) {
  els.message.textContent = text;
  els.message.className = `message ${cls || ''}`.trim();
}

function drawSky(dayAmount) {
  const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
  g.addColorStop(0, `rgba(${30 + 140 * dayAmount}, ${55 + 160 * dayAmount}, ${95 + 140 * dayAmount}, 1)`);
  g.addColorStop(1, `rgba(${80 + 165 * dayAmount}, ${80 + 140 * dayAmount}, ${110 + 80 * dayAmount}, 1)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // stars at night
  if (dayAmount < 0.45) {
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    for (let i = 0; i < 30; i++) {
      const x = (i * 79) % canvas.width;
      const y = (i * 53) % 150;
      ctx.fillRect(x, y, 2, 2);
    }
  }
}

function render() {
  const dayAmount = (Math.sin(state.time * 0.25) + 1) / 2;
  drawSky(dayAmount);

  // Sun / moon around planet
  const orbitR = 175;
  const orbX = center.x + Math.cos(state.time * 0.25 - Math.PI / 2) * orbitR;
  const orbY = center.y + Math.sin(state.time * 0.25 - Math.PI / 2) * orbitR;
  ctx.beginPath();
  ctx.fillStyle = dayAmount > 0.48 ? '#ffe89b' : '#e8ecff';
  ctx.arc(orbX, orbY, 20, 0, Math.PI * 2);
  ctx.fill();

  // Planet body
  ctx.beginPath();
  ctx.fillStyle = '#89c889';
  ctx.arc(center.x, center.y, planetRadius, 0, Math.PI * 2);
  ctx.fill();

  // Paper texture strips
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  for (let i = -4; i <= 4; i++) {
    ctx.beginPath();
    ctx.arc(center.x, center.y + i * 11, planetRadius - Math.abs(i) * 2.5, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  // Tiny trees / critters
  ctx.font = '20px sans-serif';
  ctx.fillText('🌳', center.x - 55, center.y - 12);
  ctx.fillText('🦊', center.x + 24, center.y + 30);
  ctx.fillText('🐑', center.x - 8, center.y + 8);

  // Build slots + buildings
  for (let i = 0; i < state.slots.length; i++) {
    const p = slotPosition(i);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.strokeStyle = '#6e6e6e';
    ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const structure = state.slots[i];
    if (structure) {
      ctx.font = '18px sans-serif';
      ctx.fillText(structures[structure].icon, p.x - 9, p.y + 6);
    }
  }

  // pointer hint
  if (state.selected) {
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#1c1c1c';
    ctx.fillText(`Placing: ${structures[state.selected].icon} ${structures[state.selected].name}`, 12, 22);
  }
}

render();
updateHUD(true);
setInterval(tick, 220);
