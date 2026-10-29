// The Haunted Lab: Year 7 states of matter AR escape room.
// Game flow mirrors the Year 8 Haunted Server: names -> hub of 4 seals (any order) -> final door -> victory code.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { BUILDERS, addLights } from "./scenes.js";

const STORE = "haunted-lab-y7-v1";
const HINT_COST = 120000;

// Answers are stored as hashes so they can't simply be read from the page.
const h = s => { let x = 0x811c9dc5; for (const c of s) { x ^= c.codePointAt(0); x = Math.imul(x, 0x01000193) >>> 0; } return x.toString(16); };
const ANS = {"1a":"ef833cf2","1b":"8f5ede60","1c":"e7ea3e4d","1d":"77a210cf","1e":"afcdb32e","1f":"38cfd2c0","1g":"132e0f54","2a":"c78b5d0","2b":"3cca6940","2c":"37fa994","2d":"8fd3abf9","2e":"d72f4c41","2f":"feabda59","3a":"d33798de","3b":"915b9e2e","3c":"f9e8545b","3d":"5b6d3380","3e":"53e41d91","3f":"a9815817","4a":"d1ae2dac","4b":"72d410de","4c":"ba367db1","4d":"da87df51","4e":"4ff9fb28","4f":"bd5d6b03","4g":"a58f5eae","door":"3d3a9683"};

const STATES = [["solid", "Solid"], ["liquid", "Liquid"], ["gas", "Gas"]];
const CHANGES = [["melting", "Melting"], ["freezing", "Freezing"], ["evaporation", "Evaporation"], ["condensation", "Condensation"]];
const BOXES = [["r", "Box R"], ["s", "Box S"], ["t", "Box T"]];

const SEALS = {
  1: {
    title: "The Graveyard Pond", dot: "4.1.1 States of water on Earth", letter: "T",
    intro: "The curse has frozen and boiled the graveyard. Find the water in each state. Labels A to E float above the scene.",
    qs: [
      { id: "1a", text: "<b>A</b>: the icicles on the tombstone", opts: STATES },
      { id: "1b", text: "<b>B</b>: the pond", opts: STATES },
      { id: "1c", text: "<b>C</b>: the rain falling from the cloud", opts: STATES },
      { id: "1d", text: "<b>D</b>: the water vapour rising off the pond (really invisible, shown as faint wisps)", opts: STATES },
      { id: "1e", text: "<b>E</b>: the snow on the mountain", opts: STATES },
      { id: "1f", text: "Which change turns pond water into water vapour?", opts: CHANGES },
      { id: "1g", text: "High in the sky, water vapour cools and forms tiny droplets in clouds. What is this change called?", opts: CHANGES }
    ],
    hints: ["Solids keep their shape (ice, snow). Liquids flow (pond water, rain). A gas spreads out and water vapour is invisible.",
            "Two labels are solid, two are liquid and one is gas. Liquid to gas is evaporation. Gas to liquid is condensation."],
    lesson: "<p>Water on Earth is found in all <b>3 states</b>: <b>solid</b> (ice, snow, glaciers), <b>liquid</b> (oceans, rivers, rain) and <b>gas</b> (invisible water vapour). The Sun's heat makes water <b>evaporate</b>. When vapour cools high up, it <b>condenses</b> into cloud droplets that fall as rain or snow. This is the <b>water cycle</b>.</p>"
  },
  2: {
    title: "The Potion Jars", dot: "4.1.3 Particles and changes of state", letter: "E",
    intro: "Each jar of ghost particles changes state, then fades and starts again. Watch how the particles start and how they end.",
    qs: [
      { id: "2a", text: "Jar <b>W</b> shows...", opts: CHANGES },
      { id: "2b", text: "Jar <b>X</b> shows...", opts: CHANGES },
      { id: "2c", text: "Jar <b>Y</b> shows...", opts: CHANGES },
      { id: "2d", text: "Jar <b>Z</b> shows...", opts: CHANGES },
      { id: "2e", text: "In which state do particles only vibrate in fixed positions?", opts: STATES },
      { id: "2f", text: "In which state are particles close together but able to slide past each other?", opts: STATES }
    ],
    hints: ["Neat rows that only wobble = solid. Close together but jumbled and sliding = liquid. Spread out and zooming everywhere = gas.",
            "Solid to liquid is melting. Liquid to solid is freezing. Liquid to gas is evaporation. Gas to liquid is condensation. Each change is used once."],
    lesson: "<p>Particles in a <b>solid</b> are packed in fixed positions and only <b>vibrate</b>. In a <b>liquid</b> they are still close but can <b>slide</b> past each other. In a <b>gas</b> they are far apart and move fast in all directions. Heating gives particles more energy, so they move more and can change state.</p>"
  },
  3: {
    title: "The Spell Bonds", dot: "4.1.4 Attractive forces between particles", letter: "L",
    intro: "Glowing spell bonds show the attractive forces between particles. Thicker, brighter bonds mean stronger forces.",
    qs: [
      { id: "3a", text: "Which box has the <b>strongest</b> attractive forces?", opts: BOXES },
      { id: "3b", text: "Which box has <b>medium</b> attractive forces?", opts: BOXES },
      { id: "3c", text: "Which box has the <b>weakest</b> attractive forces?", opts: BOXES },
      { id: "3d", text: "Why does a gas spread out to fill its whole container?", opts: [
        ["bigger", "Its particles get bigger when they move"],
        ["weak", "The attractive forces are very weak, so particles move freely in all directions"],
        ["walls", "Its particles are pulled towards the walls"],
        ["light", "Gas particles weigh nothing"]] },
      { id: "3e", text: "Why does a solid keep its shape?", opts: [
        ["still", "Its particles don't move at all"],
        ["fixed", "Strong attractive forces hold its particles in fixed positions"],
        ["hard", "Its particles are harder than other particles"]] },
      { id: "3f", text: "Why can a liquid be poured?", opts: [
        ["none", "There are no attractive forces between liquid particles"],
        ["slide", "The forces keep particles close, but are weak enough for them to slide past each other"],
        ["small", "Liquid particles are smaller than solid particles"]] }
    ],
    hints: ["Look for the box with thick, bright bonds that never break, and the box with no bonds at all.",
            "Solids have the strongest forces and gases the weakest. Liquids are in the middle: their bonds keep breaking and re-forming."],
    lesson: "<p><b>Attractive forces</b> pull particles together. They are <b>strongest in solids</b>, so particles stay in fixed positions and the solid keeps its shape. They are <b>weaker in liquids</b>, so particles stay close but slide, and the liquid flows. In <b>gases</b> the forces are <b>very weak</b>, so particles fly apart and fill any container.</p>"
  },
  4: {
    title: "The Witch's Cauldron", dot: "4.1.2 Heating water and changes of state", letter: "M",
    intro: "The witch is heating ice in her cauldron. Watch the graph and the thermometer. Move your phone closer to read the graph.",
    qs: [
      { id: "4a", text: "What temperature is the <b>first</b> flat section of the graph?", type: "number" },
      { id: "4b", text: "What temperature is the <b>second</b> flat section of the graph?", type: "number" },
      { id: "4c", text: "What state is the water in at point <b>P</b>?", opts: STATES },
      { id: "4d", text: "What is happening to the water at point <b>Q</b>?", opts: [["melting", "Melting"], ["freezing", "Freezing"], ["boiling", "Boiling"], ["condensing", "Condensing"]] },
      { id: "4e", text: "What state is the water in at point <b>R</b>?", opts: STATES },
      { id: "4f", text: "What is happening to the water at point <b>S</b>?", opts: [["melting", "Melting"], ["freezing", "Freezing"], ["boiling", "Boiling"], ["condensing", "Condensing"]] },
      { id: "4g", text: "Why does the temperature stay the same on the flat sections, even though the fire is still on?", opts: [
        ["off", "The heat stops reaching the water"],
        ["forces", "The heat energy is used to overcome the attractive forces between particles, so the water changes state"],
        ["broken", "The thermometer stops working"]] }
    ],
    hints: ["The flat sections are where the line goes straight across. Read the temperature on the left side of the graph.",
            "Ice melts at 0 °C and water boils at 100 °C. While water changes state, the energy goes into pulling particles apart, not raising the temperature."],
    lesson: "<p>When you heat ice, its temperature rises until <b>0 °C</b>. Then it stays flat while the ice <b>melts</b>. The water heats up to <b>100 °C</b> and stays flat again while it <b>boils</b>. On the flat sections the energy is used to <b>overcome the attractive forces</b> between particles, so the state changes but the temperature doesn't. You can see this in your own heating-water practical graph.</p>"
  }
};
const DOOR_HINTS = ["You have 4 letters. Rearrange them into a word.", "It's the change of state that turns ice into water."];

// ---------- state ----------
const fresh = () => ({ team: "", endAt: 0, minutes: 30, started: 0, sealed: {}, ans: {}, hints: {}, hintsUsed: 0, finishedAt: 0, overtime: false, lessonFor: 0 });
let S = fresh();
try { const saved = JSON.parse(localStorage.getItem(STORE) || "null"); if (saved && saved.team) S = Object.assign(fresh(), saved); } catch (e) {}
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} };

const $ = id => document.getElementById(id);
const screens = ["start", "hub", "station", "lesson", "door", "win"];
let current = 0;   // open station number
let screenNow = "start";

function show(name) {
  screens.forEach(s => { $("s-" + s).hidden = s !== name; });
  $("bar").hidden = name === "start";
  screenNow = name;
  if (name !== "station") closeView();
  window.scrollTo(0, 0);
}

function renderBar() {
  $("barTeam").textContent = S.team;
  $("barSeals").innerHTML = [1, 2, 3, 4].map(n => `<span class="${S.sealed[n] ? "done" : ""}">${S.sealed[n] ? SEALS[n].letter : n}</span>`).join("");
  $("barHints").textContent = S.hintsUsed + (S.hintsUsed === 1 ? " hint used" : " hints used");
}

function render() {
  renderBar();
  if (!S.team) return show("start");
  if (S.finishedAt) return showWin();
  if (S.lessonFor) return showLesson(S.lessonFor);
  showHub();
}

// ---------- timer ----------
const fmt = ms => { const s = Math.max(0, Math.round(ms / 1000)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
function tick() {
  if (!S.team) return;
  const t = $("barTime");
  if (S.finishedAt) { t.textContent = fmt(S.endAt - S.finishedAt); t.classList.remove("low"); return; }
  if (S.overtime) { t.textContent = "Overtime"; t.classList.add("low"); return; }
  const left = S.endAt - Date.now();
  t.textContent = fmt(left);
  t.classList.toggle("low", left < 5 * 60000);
  if (left <= 0) $("timeup").hidden = false;
}
setInterval(tick, 500);

// ---------- start ----------
$("startForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("teamName").value.trim();
  if (!name) return;
  S = fresh();
  S.team = name;
  S.minutes = 30;
  S.started = Date.now();
  S.endAt = S.started + S.minutes * 60000;
  save(); render(); tick();
});

// ---------- hub ----------
function showHub() {
  const done = Object.keys(S.sealed).length;
  $("hubCount").textContent = `${done} of 4 seals broken`;
  $("sealList").innerHTML = [1, 2, 3, 4].map(n => {
    const s = SEALS[n], ok = S.sealed[n];
    return `<button type="button" class="seal ${ok ? "ok" : ""}" data-seal="${n}">
      <span class="sn">${ok ? s.letter : n}</span>
      <span><b>Seal ${n}: ${s.title}</b><small>${ok ? `Broken · letter ${s.letter}` : s.dot}</small></span></button>`;
  }).join("");
  $("doorBtn").disabled = done < 4;
  $("doorBtn").textContent = done < 4 ? `The cursed door (break all 4 seals first)` : "Open the cursed door";
  show("hub");
}
$("sealList").addEventListener("click", e => {
  const b = e.target.closest("[data-seal]");
  if (b) openStation(Number(b.dataset.seal));
});
$("doorBtn").addEventListener("click", showDoor);

// ---------- station ----------
function openStation(n) {
  current = n;
  const s = SEALS[n];
  $("stNo").textContent = `Seal ${n} of 4 · ${s.dot}`;
  $("stTitle").textContent = s.title;
  $("stIntro").textContent = s.intro;
  $("stQs").innerHTML = s.qs.map((q, i) => {
    const saved = S.ans[q.id] || "";
    if (q.type === "number") return `<div class="q"><label for="q-${q.id}"><span class="qn">${i + 1}</span> ${q.text}</label>
      <span class="num"><input id="q-${q.id}" data-q="${q.id}" inputmode="numeric" autocomplete="off" value="${saved}"> °C</span></div>`;
    return `<div class="q"><p><span class="qn">${i + 1}</span> ${q.text}</p><div class="chips ${q.opts[0][1].length > 20 ? "long" : ""}" role="group">
      ${q.opts.map(([v, l]) => `<button type="button" data-q="${q.id}" data-v="${v}" aria-pressed="${saved === v}">${l}</button>`).join("")}</div></div>`;
  }).join("");
  $("stFeedback").textContent = ""; $("stFeedback").className = "feedback";
  $("stSubmit").hidden = !!S.sealed[n];
  $("stDone").hidden = !S.sealed[n];
  renderHints();
  show("station");
  openView(n, view.prefer3d ? "3d" : "ar");
}

$("stQs").addEventListener("click", e => {
  const b = e.target.closest("button[data-q]");
  if (!b) return;
  S.ans[b.dataset.q] = b.dataset.v;
  b.parentElement.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
  save();
});
$("stQs").addEventListener("input", e => {
  if (e.target.dataset.q) { S.ans[e.target.dataset.q] = e.target.value; save(); }
});

const normNum = s => String(s || "").replace(/[^0-9-]/g, "");
$("stForm").addEventListener("submit", e => {
  e.preventDefault();
  const s = SEALS[current];
  const fb = $("stFeedback");
  const vals = s.qs.map(q => q.type === "number" ? normNum(S.ans[q.id]) : (S.ans[q.id] || ""));
  if (vals.some(v => !v)) { fb.className = "feedback bad"; fb.textContent = "Answer every question first."; return shake(); }
  const right = s.qs.filter((q, i) => h(q.id + ":" + vals[i].toLowerCase()) === ANS[q.id]).length;
  if (right === s.qs.length) {
    S.sealed[current] = true;
    S.lessonFor = current;
    save(); render();
  } else {
    fb.className = "feedback bad";
    fb.textContent = `The seal holds. ${right} of ${s.qs.length} answers are correct.`;
    shake();
  }
});
function shake() { const p = $("stForm"); p.classList.remove("shake"); void p.offsetWidth; p.classList.add("shake"); }
$("stBack").addEventListener("click", () => render());
$("stDone").addEventListener("click", () => render());

function renderHints() {
  const key = current, list = SEALS[key].hints, used = S.hints[key] || 0;
  $("stHints").innerHTML = list.slice(0, used).map((t, i) => `<div class="hint"><b>Hint ${i + 1}:</b> ${t}</div>`).join("");
  $("stHintBtn").hidden = used >= list.length || !!S.sealed[key];
}
function useHint(key) {
  S.hints[key] = (S.hints[key] || 0) + 1;
  S.hintsUsed++;
  if (!S.overtime) S.endAt -= HINT_COST;
  save(); renderBar(); tick();
}
$("stHintBtn").addEventListener("click", () => { useHint(current); renderHints(); });

// ---------- lesson ----------
function showLesson(n) {
  const s = SEALS[n];
  $("lsNo").textContent = `Seal ${n} broken`;
  $("lsTitle").textContent = s.title;
  $("lsLetter").textContent = s.letter;
  $("lsBody").innerHTML = s.lesson;
  $("lsTag").textContent = s.dot;
  show("lesson");
}
$("lsNext").addEventListener("click", () => { S.lessonFor = 0; save(); render(); });

// ---------- final door ----------
function showDoor() {
  $("doorLetters").innerHTML = [1, 2, 3, 4].map(n => `<span>${SEALS[n].letter}</span>`).join("");
  const used = S.hints.door || 0;
  $("doorHints").innerHTML = DOOR_HINTS.slice(0, used).map((t, i) => `<div class="hint"><b>Hint ${i + 1}:</b> ${t}</div>`).join("");
  $("doorHintBtn").hidden = used >= DOOR_HINTS.length;
  $("doorFeedback").textContent = "";
  show("door");
}
$("doorHintBtn").addEventListener("click", () => { useHint("door"); showDoor(); });
$("doorForm").addEventListener("submit", e => {
  e.preventDefault();
  const v = $("doorInput").value.toLowerCase().replace(/[^a-z]/g, "");
  if (h("door:" + v) === ANS.door) {
    S.finishedAt = Date.now();
    save(); render();
  } else {
    $("doorFeedback").className = "feedback bad";
    $("doorFeedback").textContent = "The door won't budge. Try another order.";
    const p = $("doorForm"); p.classList.remove("shake"); void p.offsetWidth; p.classList.add("shake");
  }
});
$("doorBack").addEventListener("click", () => render());

// ---------- win ----------
function showWin() {
  const left = S.endAt - S.finishedAt;
  const inTime = !S.overtime && left > 0;
  $("vcode").textContent = inTime ? "BOO-" + h(S.team + "|" + S.finishedAt).toUpperCase().slice(-4) : "PRACTICE";
  $("winMsg").textContent = inTime
    ? `${S.team} melted the curse and escaped the Haunted Lab!`
    : `${S.team} melted the curse in overtime. No prize this time, but the witch is impressed!`;
  $("statLeft").textContent = inTime ? fmt(left) : "0:00";
  $("statHints").textContent = S.hintsUsed;
  $("statAt").textContent = new Date(S.finishedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  $("timeup").hidden = true;
  show("win");
}

// ---------- time up / reset ----------
$("overtimeBtn").addEventListener("click", () => { S.overtime = true; save(); $("timeup").hidden = true; tick(); });
let resetArmed = false;
$("resetBtn").addEventListener("click", () => {
  const b = $("resetBtn");
  if (!resetArmed) {
    resetArmed = true; b.textContent = "Tap again to wipe progress";
    setTimeout(() => { resetArmed = false; b.textContent = "Start over"; }, 4000);
    return;
  }
  resetArmed = false; b.textContent = "Start over";
  S = fresh();
  try { localStorage.removeItem(STORE); } catch (e) {}
  $("timeup").hidden = true;
  $("teamName").value = "";
  render();
});

// ---------- AR camera view and 3D fallback ----------
const view = { mode: null, n: 0, mind: null, renderer: null, controls: null, ro: null, built: {}, prefer3d: false, token: 0 };
const built = n => view.built[n] || (view.built[n] = BUILDERS[n]());
const now = () => performance.now() / 1000;

function status(text, tone = "") {
  const el = $("arStatus");
  el.textContent = text;
  el.className = "arstatus " + tone;
}

// Jump-scare flash: one brief red/white pulse over the camera view (no strobing) plus a short buzz.
(() => {
  const st = document.createElement("style");
  st.textContent = `#arView.scare-flash::after{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;
    background:radial-gradient(circle,rgba(255,255,255,.85),rgba(255,40,40,.7));animation:scareFlash .6s ease-out forwards}
    @keyframes scareFlash{0%{opacity:0}12%{opacity:.8}100%{opacity:0}}
    @media (prefers-reduced-motion:reduce){#arView.scare-flash::after{animation:none;opacity:0}}`;
  document.head.appendChild(st);
})();
function scareFlash() {
  const box = $("arView");
  box.classList.remove("scare-flash"); void box.offsetWidth; box.classList.add("scare-flash");
  setTimeout(() => box.classList.remove("scare-flash"), 700);
  try { navigator.vibrate?.(200); } catch (e) {}
}

async function closeView() {
  view.token++;
  if (view.mind) {
    const m = view.mind; view.mind = null;
    try { m.renderer.setAnimationLoop(null); await m.stop(); } catch (e) {}
    try { m.renderer.dispose(); } catch (e) {}
  }
  if (view.renderer) {
    view.renderer.setAnimationLoop(null);
    view.renderer.dispose();
    view.controls?.dispose();
    view.ro?.disconnect();
    view.renderer = view.controls = view.ro = null;
  }
  $("arView").innerHTML = "";
  view.mode = null;
}

async function openView(n, mode) {
  await closeView();
  const token = view.token;
  view.n = n; view.mode = mode;
  $("viewToggle").textContent = mode === "ar" ? "Can't scan? View in 3D" : "Use the camera";
  const box = $("arView");
  const S3 = built(n);
  S3.onScare = scareFlash;
  if (mode === "ar") {
    status("Starting the camera...");
    try {
      const { MindARThree } = await import("mindar-image-three");
      if (token !== view.token) return;
      const mind = new MindARThree({
        container: box, imageTargetSrc: "targets.mind", maxTrack: 1,
        uiLoading: "no", uiScanning: "no", uiError: "no", filterMinCF: 0.0001, filterBeta: 0.01
      });
      view.mind = mind;
      addLights(mind.scene);
      // The card is the x-y plane with z out of the paper; scenes are built y-up, so tip them onto the card.
      const holder = new THREE.Group();
      holder.rotation.x = Math.PI / 2;
      holder.add(S3.root);
      for (let i = 0; i < 4; i++) {
        const a = mind.addAnchor(i);
        if (i === n - 1) a.group.add(holder);
        a.onTargetFound = () => i === n - 1
          ? status(`Seal ${n} found! Move your phone around to explore.`, "good")
          : status(`That's a Seal ${i + 1} card. Find a Seal ${n} card.`, "warn");
        a.onTargetLost = () => status(`Point your phone at a Seal ${n} card.`);
      }
      await mind.start();
      if (token !== view.token) { try { mind.stop(); } catch (e) {} return; }
      status(`Point your phone at a Seal ${n} card.`);
      mind.renderer.setAnimationLoop(() => { S3.update(now()); mind.renderer.render(mind.scene, mind.camera); });
    } catch (e) {
      console.error(e);
      if (token === view.token) status("The camera didn't start. Allow camera access, or tap “View in 3D”.", "bad");
    }
    return;
  }
  // 3D viewer: the scene sits on a picture of its card; drag to turn, pinch to zoom.
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio));
  renderer.setClearColor(0x140f1c);
  // Absolutely positioned and CSS-sized, so the canvas never feeds back into the box's own size.
  Object.assign(renderer.domElement.style, { position: "absolute", inset: "0", width: "100%", height: "100%" });
  box.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  addLights(scene);
  const tex = new THREE.TextureLoader().load(`cards/card-${n}.png`);
  tex.colorSpace = THREE.SRGBColorSpace;
  const card = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.414), new THREE.MeshBasicMaterial({ map: tex }));
  card.rotation.x = -Math.PI / 2;
  scene.add(card, S3.root);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 20);
  camera.position.set(0, 1.05, 1.4);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.16, -0.05);
  controls.enableDamping = true;
  controls.minDistance = 0.3; controls.maxDistance = 3;
  controls.update();
  const size = () => {
    const w = box.clientWidth, hgt = box.clientHeight;
    renderer.setSize(w, hgt, false);
    camera.aspect = w / hgt; camera.updateProjectionMatrix();
  };
  size();
  view.ro = new ResizeObserver(size); view.ro.observe(box);
  view.renderer = renderer; view.controls = controls;
  renderer.setAnimationLoop(() => { controls.update(); S3.update(now()); renderer.render(scene, camera); });
  status("3D view: drag to turn it, pinch to zoom.");
}

$("viewToggle").addEventListener("click", () => {
  view.prefer3d = view.mode === "ar";
  openView(current, view.prefer3d ? "3d" : "ar");
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) closeView();
  else if (screenNow === "station") openView(current, view.prefer3d ? "3d" : "ar");
});

render();
tick();
