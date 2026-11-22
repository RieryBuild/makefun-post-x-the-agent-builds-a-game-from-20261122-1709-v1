// PIZZA RUN — built from ONE prompt:
// "Build a tiny top-down 2D pizza-delivery game in one HTML file: a rider on a scooter
// crosses a small city map to deliver 3 pizzas before they go cold, dodging traffic cars;
// arrow keys or WASD to drive, score is tips earned, with a title screen, a win screen
// when all 3 pizzas are delivered, a lose screen when time runs out or you crash 3 times,
// one warm pizza-parlour palette, and a simple HUD showing pizzas left, timer and tips."
//
// One warm pizza-parlour palette: cream #FFF3D6, tomato #E4572E, cheese #FFC53D,
// basil #2E933C, asphalt #3A3A44, ink #191419.

const cv = document.getElementById('game');
const ctx = cv.getContext('2d');
const W = 960, H = 640;
const params = new URLSearchParams(location.search);
const AUTOPLAY = params.get('autoplay') === '1';

const CREAM = '#FFF3D6', TOMATO = '#E4572E', CHEESE = '#FFC53D', BASIL = '#2E933C',
      ASPHALT = '#3A3A44', INK = '#191419', WHITE = '#FFFFFF';

// City roads (top-down grid)
const ROADS_H = [150, 320, 490];   // horizontal road centre-y
const ROADS_V = [210, 480, 750];   // vertical road centre-x
const ROAD_W = 64;

// Delivery houses (off-road doorsteps) — order is fixed so the run is watchable.
const HOUSES = [
  { x: 880, y: 80,  label: 'A', color: TOMATO },
  { x: 80,  y: 570, label: 'B', color: BASIL },
  { x: 880, y: 570, label: 'C', color: '#7B5EA7' },
];
const SHOP = { x: 80, y: 80 };

const GAME = {
  state: 'title',           // title | playing | win | lose
  timeLeft: 90,             // seconds before the pizzas go cold
  lives: 3,
  tips: 0,
  delivered: 0,
  shake: 0,
  flash: 0,
  elapsed: 0,
  startedAt: 0,
};

const player = { x: SHOP.x, y: SHOP.y, r: 16, angle: 0, speed: 0, invuln: 0 };
const keys = {};

// Traffic cars drive along the roads and wrap around the map.
const cars = [
  { axis: 'h', road: 150, pos: 100,  speed: 2.6, color: '#4A90D9', len: 44 },
  { axis: 'h', road: 150, pos: 620,  speed: -2.2, color: '#E8B4B8', len: 40 },
  { axis: 'h', road: 320, pos: 300,  speed: 3.0, color: '#F2A541', len: 46 },
  { axis: 'h', road: 320, pos: 800,  speed: -2.8, color: '#8E7CC3', len: 42 },
  { axis: 'h', road: 490, pos: 500,  speed: 2.4, color: '#50B0A0', len: 44 },
  { axis: 'v', road: 210, pos: 200,  speed: 2.5, color: '#D95D39', len: 44 },
  { axis: 'v', road: 480, pos: 420,  speed: -2.9, color: '#6AA84F', len: 42 },
  { axis: 'v', road: 750, pos: 120,  speed: 2.7, color: '#C27BA0', len: 46 },
];

function activeHouse() { return HOUSES[GAME.delivered] || null; }

function reset() {
  GAME.state = 'playing';
  GAME.timeLeft = 90;
  GAME.lives = 3;
  GAME.tips = 0;
  GAME.delivered = 0;
  GAME.elapsed = 0;
  GAME.startedAt = performance.now();
  player.x = SHOP.x; player.y = SHOP.y; player.angle = 0; player.speed = 0; player.invuln = 0;
  cars[0].pos = 100; cars[1].pos = 620; cars[2].pos = 300; cars[3].pos = 800;
  cars[4].pos = 500; cars[5].pos = 200; cars[6].pos = 420; cars[7].pos = 120;
}

function crash() {
  GAME.lives -= 1;
  GAME.flash = 14;
  GAME.shake = 12;
  player.x = SHOP.x; player.y = SHOP.y; player.invuln = 120;
  if (GAME.lives <= 0) { GAME.state = 'lose'; GAME.loseReason = 'crashed 3 times'; }
}

function deliver() {
  const house = activeHouse();
  if (!house) return;
  const bonus = Math.max(1, Math.ceil(GAME.timeLeft / 15));
  GAME.tips += 5 + bonus;
  GAME.delivered += 1;
  GAME.flash = 6;
  if (GAME.delivered >= HOUSES.length) GAME.state = 'win';
}

function onRoad(x, y) {
  for (const ry of ROADS_H) if (Math.abs(y - ry) < ROAD_W / 2) return true;
  for (const rx of ROADS_V) if (Math.abs(x - rx) < ROAD_W / 2) return true;
  return false;
}

// --- autopilot (only with ?autoplay=1): steers at the active house, sidesteps cars ---
function autopilot() {
  const house = activeHouse();
  if (!house) return;
  const dx = house.x - player.x, dy = house.y - player.y;
  let mx = 0, my = 0;
  if (Math.abs(dx) > 14) mx = Math.sign(dx);
  else if (Math.abs(dy) > 14) my = Math.sign(dy);
  // crude dodge: if a car is close ahead on our axis, step sideways
  for (const c of cars) {
    const cx = c.axis === 'h' ? c.pos : c.road;
    const cy = c.axis === 'h' ? c.road : c.pos;
    const ddx = cx - player.x, ddy = cy - player.y;
    if (Math.hypot(ddx, ddy) < 70) {
      if (mx !== 0 && Math.abs(ddy) < 40) { mx = 0; my = ddy > 0 ? -1 : 1; }
      else if (my !== 0 && Math.abs(ddx) < 40) { my = 0; mx = ddx > 0 ? -1 : 1; }
    }
  }
  keys.auto = { x: mx, y: my };
}

function step(dt) {
  if (GAME.state !== 'playing') return;
  GAME.elapsed += dt;
  GAME.timeLeft = Math.max(0, 90 - GAME.elapsed);
  if (GAME.timeLeft <= 0) { GAME.state = 'lose'; GAME.loseReason = 'the pizzas went cold'; return; }

  if (AUTOPLAY) autopilot();
  let mx = 0, my = 0;
  if (keys.ArrowLeft || keys.a) mx -= 1;
  if (keys.ArrowRight || keys.d) mx += 1;
  if (keys.ArrowUp || keys.w) my -= 1;
  if (keys.ArrowDown || keys.s) my += 1;
  if (keys.auto) { mx = keys.auto.x; my = keys.auto.y; }
  if (mx || my) {
    const len = Math.hypot(mx, my);
    const sp = 3.4 * (onRoad(player.x, player.y) ? 1 : 0.75);
    player.x += (mx / len) * sp;
    player.y += (my / len) * sp;
    player.angle = Math.atan2(my, mx);
    player.speed = sp;
  } else player.speed = 0;
  player.x = Math.max(24, Math.min(W - 24, player.x));
  player.y = Math.max(24, Math.min(H - 24, player.y));

  for (const c of cars) {
    c.pos += c.speed;
    const lim = c.axis === 'h' ? W + 60 : H + 60;
    if (c.pos > lim) c.pos = -60;
    if (c.pos < -60) c.pos = lim;
  }

  const house = activeHouse();
  if (house && Math.hypot(player.x - house.x, player.y - house.y) < 34) deliver();

  if (player.invuln > 0) player.invuln -= 1;
  else {
    for (const c of cars) {
      const cx = c.axis === 'h' ? c.pos : c.road;
      const cy = c.axis === 'h' ? c.road : c.pos;
      const hw = c.axis === 'h' ? c.len / 2 : 14;
      const hh = c.axis === 'h' ? 14 : c.len / 2;
      if (Math.abs(player.x - cx) < hw + 12 && Math.abs(player.y - cy) < hh + 12) { crash(); break; }
    }
  }
  if (GAME.shake > 0) GAME.shake -= 1;
  if (GAME.flash > 0) GAME.flash -= 1;
}

// --- drawing ---
function drawRoads() {
  ctx.fillStyle = ASPHALT;
  for (const ry of ROADS_H) ctx.fillRect(0, ry - ROAD_W / 2, W, ROAD_W);
  for (const rx of ROADS_V) ctx.fillRect(rx - ROAD_W / 2, 0, ROAD_W, H);
  ctx.strokeStyle = CHEESE; ctx.lineWidth = 3; ctx.setLineDash([18, 16]);
  ctx.beginPath();
  for (const ry of ROADS_H) { ctx.moveTo(0, ry); ctx.lineTo(W, ry); }
  for (const rx of ROADS_V) { ctx.moveTo(rx, 0); ctx.lineTo(rx, H); }
  ctx.stroke(); ctx.setLineDash([]);
}

function drawBlocks() {
  // park + plaza decoration on the warm cream ground
  ctx.fillStyle = '#EAF3C0';
  ctx.fillRect(300, 40, 90, 70); ctx.fillRect(560, 400, 110, 60);
  ctx.fillStyle = BASIL;
  ctx.beginPath(); ctx.arc(345, 75, 16, 0, 7); ctx.arc(615, 430, 14, 0, 7); ctx.fill();
  ctx.fillStyle = '#F6D8A8';
  ctx.fillRect(560, 40, 110, 70);
  ctx.fillStyle = INK; ctx.font = 'bold 15px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('PARK', 345, 80); ctx.fillText('PLAZA', 615, 80);
}

function drawShop() {
  ctx.fillStyle = TOMATO;
  ctx.beginPath(); ctx.arc(SHOP.x, SHOP.y, 30, 0, 7); ctx.fill();
  ctx.fillStyle = WHITE; ctx.font = 'bold 22px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('🍕', SHOP.x, SHOP.y + 8);
  ctx.fillStyle = INK; ctx.font = 'bold 13px sans-serif';
  ctx.fillText('PIZZA SHOP', SHOP.x, SHOP.y + 48);
}

function drawHouses() {
  HOUSES.forEach((h, i) => {
    const done = i < GAME.delivered;
    const active = i === GAME.delivered && GAME.state === 'playing';
    ctx.fillStyle = done ? '#B9B09A' : h.color;
    ctx.fillRect(h.x - 26, h.y - 22, 52, 44);
    ctx.fillStyle = '#5B3A29';
    ctx.beginPath(); ctx.moveTo(h.x - 30, h.y - 22); ctx.lineTo(h.x, h.y - 40); ctx.lineTo(h.x + 30, h.y - 22); ctx.closePath(); ctx.fill();
    ctx.fillStyle = WHITE; ctx.font = 'bold 20px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(done ? '✓' : h.label, h.x, h.y + 7);
    if (active) {
      const pulse = 1 + 0.12 * Math.sin(performance.now() / 180);
      ctx.strokeStyle = CHEESE; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(h.x, h.y, 40 * pulse, 0, 7); ctx.stroke();
      ctx.fillStyle = INK; ctx.font = 'bold 14px sans-serif';
      ctx.fillText('DELIVER HERE', h.x, h.y - 52);
    }
  });
}

function drawCars() {
  for (const c of cars) {
    const cx = c.axis === 'h' ? c.pos : c.road;
    const cy = c.axis === 'h' ? c.road : c.pos;
    ctx.save(); ctx.translate(cx, cy);
    if (c.axis === 'v') ctx.rotate(Math.PI / 2);
    ctx.fillStyle = c.color;
    ctx.beginPath(); ctx.roundRect(-c.len / 2, -13, c.len, 26, 7); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.75)';
    ctx.fillRect(-6, -11, 14, 22);
    ctx.fillStyle = '#FFE9A8';
    ctx.fillRect(c.len / 2 - 4, -10, 4, 6); ctx.fillRect(c.len / 2 - 4, 4, 4, 6);
    ctx.restore();
  }
}

function drawPlayer() {
  if (player.invuln > 0 && Math.floor(performance.now() / 120) % 2 === 0) return; // blink
  ctx.save(); ctx.translate(player.x, player.y); ctx.rotate(player.angle);
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 7); ctx.fill();       // scooter body
  ctx.fillStyle = CHEESE; ctx.beginPath(); ctx.arc(10, 0, 7, 0, 7); ctx.fill();    // front wheel
  ctx.fillStyle = WHITE; ctx.beginPath(); ctx.arc(-6, 0, 5, 0, 7); ctx.fill();     // rider dot
  ctx.fillStyle = TOMATO; ctx.fillRect(-16, -9, 10, 18);                            // pizza box
  ctx.restore();
}

function drawHUD() {
  ctx.fillStyle = 'rgba(25,20,25,.88)';
  ctx.beginPath(); ctx.roundRect(0, 0, W, 52, [0, 0, 12, 12]); ctx.fill();
  ctx.fillStyle = WHITE; ctx.font = 'bold 24px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText(`🍕 ${HOUSES.length - GAME.delivered} left`, 18, 36);
  ctx.fillText(`⏱ ${Math.ceil(GAME.timeLeft)}s`, 250, 36);
  ctx.fillText(`💰 $${GAME.tips} tips`, 440, 36);
  ctx.fillText('❤'.repeat(Math.max(0, GAME.lives)) + '🤍'.repeat(Math.max(0, 3 - GAME.lives)), 700, 36);
  if (GAME.state === 'playing') {
    const house = activeHouse();
    if (house) {
      const label = `Deliver pizza ${GAME.delivered + 1} of 3 → house ${house.label}`;
      ctx.font = 'bold 16px sans-serif';
      const tw = ctx.measureText(label).width;
      ctx.fillStyle = 'rgba(25,20,25,.85)';
      ctx.beginPath(); ctx.roundRect(W / 2 - tw / 2 - 14, 60, tw + 28, 30, 15); ctx.fill();
      ctx.fillStyle = CHEESE; ctx.textAlign = 'center';
      ctx.fillText(label, W / 2, 81);
    }
  }
}

function drawTitle() {
  ctx.fillStyle = 'rgba(25,20,25,.72)'; ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.fillStyle = CHEESE; ctx.font = 'bold 84px sans-serif';
  ctx.fillText('🍕 PIZZA RUN', W / 2, 220);
  ctx.fillStyle = WHITE; ctx.font = 'bold 30px sans-serif';
  ctx.fillText('One prompt. One game. Three hot pizzas.', W / 2, 285);
  ctx.font = '24px sans-serif';
  ctx.fillText('Drive with Arrow keys or WASD — dodge the traffic,', W / 2, 350);
  ctx.fillText('deliver all 3 pizzas before they go cold!', W / 2, 385);
  ctx.fillStyle = TOMATO;
  ctx.beginPath(); ctx.roundRect(W / 2 - 170, 430, 340, 62, 14); ctx.fill();
  ctx.fillStyle = WHITE; ctx.font = 'bold 26px sans-serif';
  ctx.fillText('▶  PRESS ENTER TO PLAY', W / 2, 470);
  ctx.fillStyle = CHEESE; ctx.font = '20px sans-serif';
  ctx.fillText('⏱ 90 seconds   •   ❤ 3 lives   •   💰 tips = score', W / 2, 540);
}

function drawEnd(win) {
  ctx.fillStyle = 'rgba(25,20,25,.78)'; ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  if (win) {
    ctx.fillStyle = CHEESE; ctx.font = 'bold 76px sans-serif';
    ctx.fillText('🎉 ALL DELIVERED!', W / 2, 240);
    ctx.fillStyle = WHITE; ctx.font = 'bold 34px sans-serif';
    ctx.fillText(`You earned $${GAME.tips} in tips`, W / 2, 310);
    ctx.font = '24px sans-serif';
    ctx.fillText(`3 pizzas delivered with ${Math.ceil(GAME.timeLeft)}s to spare — still hot!`, W / 2, 355);
  } else {
    ctx.fillStyle = TOMATO; ctx.font = 'bold 76px sans-serif';
    ctx.fillText('💔 GAME OVER', W / 2, 240);
    ctx.fillStyle = WHITE; ctx.font = 'bold 30px sans-serif';
    ctx.fillText(GAME.loseReason === 'the pizzas went cold'
      ? 'The pizzas went cold…' : 'You crashed 3 times…', W / 2, 310);
    ctx.font = '24px sans-serif';
    ctx.fillText(`${GAME.delivered} of 3 pizzas delivered  •  $${GAME.tips} in tips`, W / 2, 355);
  }
  ctx.fillStyle = CHEESE; ctx.font = 'bold 24px sans-serif';
  ctx.fillText('Press ENTER to play again', W / 2, 440);
}

function draw() {
  ctx.save();
  if (GAME.shake > 0) ctx.translate((Math.random() - .5) * GAME.shake, (Math.random() - .5) * GAME.shake);
  ctx.fillStyle = CREAM; ctx.fillRect(-20, -20, W + 40, H + 40);
  drawBlocks();
  drawRoads();
  drawShop();
  drawHouses();
  drawCars();
  drawPlayer();
  ctx.restore();
  drawHUD();
  if (GAME.state === 'title') drawTitle();
  if (GAME.state === 'win') drawEnd(true);
  if (GAME.state === 'lose') drawEnd(false);
  if (GAME.flash > 0) { ctx.fillStyle = `rgba(255,197,61,${GAME.flash / 40})`; ctx.fillRect(0, 0, W, H); }
}

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  step(dt);
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

addEventListener('keydown', (e) => {
  keys[e.key] = true;
  if (e.key === 'Enter' && GAME.state !== 'playing') reset();
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
});
addEventListener('keyup', (e) => { keys[e.key] = false; });
cv.addEventListener('click', () => { if (GAME.state !== 'playing') reset(); });

// test hook: play state readable from outside (headless play-test + video capture)
window.__pizza = GAME;
window.__pizzaPlayer = player;
if (AUTOPLAY) setTimeout(() => { if (GAME.state === 'title') reset(); }, 800);
