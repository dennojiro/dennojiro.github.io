import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlayText');
const restartBtn = document.getElementById('restartBtn');

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x090d1f, 10, 70);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 150);
camera.position.set(0, 5.4, 9.4);
camera.lookAt(0, 1.5, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
document.body.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0x8ecbff, 0.6);
scene.add(ambient);

const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
keyLight.position.set(4, 10, 7);
scene.add(keyLight);

const rim = new THREE.PointLight(0x47f0ff, 1.2, 30);
rim.position.set(0, 3, 12);
scene.add(rim);

// World
const lanes = [-3, 0, 3];
const laneMarkers = new THREE.Group();
scene.add(laneMarkers);

const floorMat = new THREE.MeshStandardMaterial({ color: 0x132144, roughness: 0.85, metalness: 0.15 });
const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 260), floorMat);
floor.rotation.x = -Math.PI * 0.5;
floor.position.z = -90;
scene.add(floor);

const stripeMat = new THREE.MeshBasicMaterial({ color: 0x2855be });
for (let z = 0; z > -220; z -= 10) {
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 3.6), stripeMat);
  stripe.position.set(0, 0.01, z);
  laneMarkers.add(stripe);
}

// Player
const playerGroup = new THREE.Group();
scene.add(playerGroup);

const body = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 1.2, 1.2),
  new THREE.MeshStandardMaterial({ color: 0xb8ecff, emissive: 0x113355, emissiveIntensity: 0.45 })
);
body.position.y = 1.05;
playerGroup.add(body);

const trail = new THREE.Mesh(
  new THREE.ConeGeometry(0.35, 1.2, 10),
  new THREE.MeshBasicMaterial({ color: 0x47f0ff })
);
trail.rotation.x = Math.PI;
trail.position.set(0, 0.62, 0.95);
playerGroup.add(trail);

let targetLane = 1;
let currentLane = 1;
let vy = 0;
let grounded = true;

const hazards = [];
const pickups = [];

const obstacleGeo = new THREE.BoxGeometry(1.4, 1.6, 1.4);
const obstacleMat = new THREE.MeshStandardMaterial({ color: 0xff4b70, emissive: 0x4e1022, emissiveIntensity: 0.42 });
const orbGeo = new THREE.IcosahedronGeometry(0.54, 0);
const orbMat = new THREE.MeshStandardMaterial({ color: 0x59f6ff, emissive: 0x1a4f59, emissiveIntensity: 0.8 });

let speed = 17;
let spawnTimer = 0;
let score = 0;
let best = Number(localStorage.getItem('runner-best') || 0);
let playing = true;
let elapsed = 0;

bestEl.textContent = String(best);

function randLane() {
  return Math.floor(Math.random() * 3);
}

function spawnChunk() {
  const z = -62 - Math.random() * 20;

  // Main hazard
  const obs = new THREE.Mesh(obstacleGeo, obstacleMat.clone());
  obs.position.set(lanes[randLane()], 0.8, z);
  scene.add(obs);
  hazards.push(obs);

  // Optional second hazard for challenge
  if (Math.random() < 0.24) {
    const obs2 = new THREE.Mesh(obstacleGeo, obstacleMat.clone());
    let lane2 = randLane();
    while (lane2 === lanes.indexOf(obs.position.x)) lane2 = randLane();
    obs2.position.set(lanes[lane2], 0.8, z - 6);
    scene.add(obs2);
    hazards.push(obs2);
  }

  // Orb pickup
  if (Math.random() < 0.72) {
    const orb = new THREE.Mesh(orbGeo, orbMat.clone());
    orb.position.set(lanes[randLane()], 1.15, z - 3.2);
    scene.add(orb);
    pickups.push(orb);
  }
}

function resetRun() {
  for (const h of hazards) scene.remove(h);
  for (const p of pickups) scene.remove(p);
  hazards.length = 0;
  pickups.length = 0;

  targetLane = 1;
  currentLane = 1;
  playerGroup.position.set(0, 0, 0);
  vy = 0;
  grounded = true;

  speed = 17;
  spawnTimer = 0;
  score = 0;
  elapsed = 0;
  playing = true;
  scoreEl.textContent = '0';

  overlay.classList.add('hidden');

  for (let i = 0; i < 6; i++) spawnChunk();
}

function gameOver() {
  playing = false;
  if (score > best) {
    best = score;
    localStorage.setItem('runner-best', String(best));
    bestEl.textContent = String(best);
  }

  overlayText.textContent = `Final score: ${score}. Avoid the red blocks and collect orbs for bonus points.`;
  overlay.classList.remove('hidden');
}

function moveLane(direction) {
  targetLane = Math.max(0, Math.min(2, targetLane + direction));
}

function jump() {
  if (!grounded || !playing) return;
  grounded = false;
  vy = 9.8;
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') moveLane(-1);
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') moveLane(1);
  if (e.key === 'ArrowUp' || e.key === ' ' || e.key.toLowerCase() === 'w') jump();
  if (!playing && e.key.toLowerCase() === 'r') resetRun();
});

let sx = 0;
let sy = 0;
let touchActive = false;
window.addEventListener('touchstart', (e) => {
  if (!e.touches[0]) return;
  touchActive = true;
  sx = e.touches[0].clientX;
  sy = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  if (!touchActive) return;
  touchActive = false;
  const t = e.changedTouches[0];
  if (!t) return;

  const dx = t.clientX - sx;
  const dy = t.clientY - sy;

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 20) {
    moveLane(dx > 0 ? 1 : -1);
  } else if (dy < -20) {
    jump();
  } else if (!playing) {
    resetRun();
  }
}, { passive: true });

restartBtn.addEventListener('click', resetRun);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(0.033, clock.getDelta());

  if (playing) {
    elapsed += dt;
    speed = 17 + Math.min(16, elapsed * 0.95);

    // lane movement smoothing
    const desiredX = lanes[targetLane];
    playerGroup.position.x += (desiredX - playerGroup.position.x) * Math.min(1, dt * 13);
    currentLane = targetLane;

    // jump physics
    vy -= 24 * dt;
    playerGroup.position.y += vy * dt;
    if (playerGroup.position.y <= 0) {
      playerGroup.position.y = 0;
      vy = 0;
      grounded = true;
    }

    body.rotation.y += dt * 3.2;
    trail.scale.y = 1 + Math.sin(elapsed * 12) * 0.08;

    // moving lane stripes to fake motion
    for (const stripe of laneMarkers.children) {
      stripe.position.z += speed * dt;
      if (stripe.position.z > 8) stripe.position.z = -210;
    }

    // spawn and advance entities
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawnChunk();
      spawnTimer = 0.44 + Math.random() * 0.44;
    }

    for (let i = hazards.length - 1; i >= 0; i--) {
      const h = hazards[i];
      h.position.z += speed * dt;
      h.rotation.x += dt * 0.85;
      h.rotation.y += dt * 1.25;

      if (h.position.z > 11) {
        scene.remove(h);
        hazards.splice(i, 1);
        continue;
      }

      const closeX = Math.abs(h.position.x - playerGroup.position.x) < 1.05;
      const closeZ = Math.abs(h.position.z - 0.2) < 0.95;
      const closeY = playerGroup.position.y < 1.05;
      if (closeX && closeZ && closeY) {
        gameOver();
        break;
      }
    }

    for (let i = pickups.length - 1; i >= 0; i--) {
      const p = pickups[i];
      p.position.z += speed * dt;
      p.rotation.x += dt * 2.3;
      p.rotation.y += dt * 2.7;
      p.position.y = 1.15 + Math.sin(elapsed * 8 + i) * 0.2;

      if (p.position.z > 11) {
        scene.remove(p);
        pickups.splice(i, 1);
        continue;
      }

      const hitX = Math.abs(p.position.x - playerGroup.position.x) < 1.0;
      const hitZ = Math.abs(p.position.z - 0.2) < 0.8;
      const hitY = Math.abs(playerGroup.position.y + 1.05 - p.position.y) < 1.2;
      if (hitX && hitZ && hitY) {
        score += 25;
        scene.remove(p);
        pickups.splice(i, 1);
      }
    }

    score += Math.floor(dt * 60 * 0.8);
    scoreEl.textContent = String(score);
  }

  renderer.render(scene, camera);
}

resetRun();
animate();
