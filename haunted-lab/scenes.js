// 3D scenes for the four seals. Each build function returns { root, update(t) }.
// Coordinates: y is up out of the card; the card is 1 unit wide (x -0.5..0.5) and
// 1.414 deep (z -0.707 top edge .. 0.707 bottom edge, nearest the student).
import * as THREE from "three";

const C = {
  bone: 0xf2eadb, mist: 0xab9fbd, pumpkin: 0xff8c32, slime: 0x7fe3b4,
  purple: 0x8c7bd6, blood: 0xff6474, night: 0x140f1c, water: 0x2f86b0, ice: 0xbfe8ff
};

const std = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05, ...extra });
const glow = (color, intensity = 0.6, extra = {}) => std(color, { emissive: color, emissiveIntensity: intensity, ...extra });

// Round letter badge that always faces the camera.
function badge(text, color = "#ff8c32", size = 0.075) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  g.fillStyle = "#140f1c"; g.beginPath(); g.arc(64, 64, 60, 0, Math.PI * 2); g.fill();
  g.lineWidth = 8; g.strokeStyle = color; g.stroke();
  g.fillStyle = "#f2eadb"; g.font = "bold 72px 'Atkinson Hyperlegible', sans-serif";
  g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, 64, 70);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false }));
  s.scale.set(size, size, 1);
  s.renderOrder = 10;
  return s;
}

// Sprite with redrawable text (used for the thermometer read-out).
function textSprite(w = 256, h = 96, scale = 0.16) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false }));
  s.scale.set(scale, scale * h / w, 1);
  s.renderOrder = 10;
  s.draw = text => {
    const g = c.getContext("2d");
    g.clearRect(0, 0, w, h);
    g.fillStyle = "rgba(20,15,28,.9)"; g.beginPath(); g.roundRect(4, 4, w - 8, h - 8, 20); g.fill();
    g.strokeStyle = "#ff8c32"; g.lineWidth = 5; g.stroke();
    g.fillStyle = "#f2eadb"; g.font = "bold 54px 'IBM Plex Mono', monospace";
    g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, w / 2, h / 2 + 3);
    tex.needsUpdate = true;
  };
  return s;
}

const smooth = x => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
const lerp = (a, b, k) => a + (b - a) * k;

// ---------- shared visual helpers (kept cheap: shared textures/geometries, few draw calls) ----------
let _glowTex;
function glowTex() {
  if (_glowTex) return _glowTex;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.3, "rgba(255,255,255,.45)");
  gr.addColorStop(0.65, "rgba(255,255,255,.1)"); gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  _glowTex = new THREE.CanvasTexture(c);
  _glowTex.colorSpace = THREE.SRGBColorSpace;
  return _glowTex;
}
// Soft additive halo (faces the camera).
function glowSprite(color, size, opacity = 0.5) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(), color, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity }));
  s.scale.set(size, size, 1);
  s.renderOrder = 3;
  return s;
}
// Soft additive pool of light lying on the floor.
const _floorGeo = new THREE.CircleGeometry(1, 32);
function floorGlow(color, r, opacity = 0.5) {
  const m = new THREE.Mesh(_floorGeo, new THREE.MeshBasicMaterial({ map: glowTex(), color, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity }));
  m.rotation.x = -Math.PI / 2; m.scale.setScalar(r); m.position.y = 0.004; m.renderOrder = 2;
  return m;
}
// Glass with a view-angle (fresnel) rim: bright edges, clear middle. Cheap: no env map needed.
function fresnelMat(color, edge, base = 0.06, power = 2.2, strength = 0.6) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uEdge: { value: new THREE.Color(edge) }, uBase: { value: base }, uPow: { value: power }, uStr: { value: strength } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uColor; uniform vec3 uEdge; uniform float uBase; uniform float uPow; uniform float uStr; varying vec3 vN; varying vec3 vV;
      void main(){ vec3 n = normalize(vN); if (!gl_FrontFacing) n = -n; float f = pow(1.0 - abs(dot(n, normalize(vV))), uPow);
        gl_FragColor = vec4(mix(uColor, uEdge, f), uBase + f * uStr);
      #include <colorspace_fragment>
      }`,
    transparent: true, depthWrite: false, side: THREE.DoubleSide
  });
}
// Low ground mist: a few big, very soft, slowly drifting puffs.
function mist(root, spots, color = 0x9a8fc4, opacity = 0.16) {
  const arr = spots.map(([x, z, s], i) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(), color, transparent: true, depthWrite: false, opacity }));
    sp.scale.set(s, s * 0.45, 1); sp.position.set(x, 0.035, z); sp.renderOrder = 1;
    sp.home = [x, z]; sp.ph = i * 1.9;
    root.add(sp); return sp;
  });
  return t => arr.forEach(sp => {
    sp.position.x = sp.home[0] + Math.sin(t * 0.25 + sp.ph) * 0.05;
    sp.position.z = sp.home[1] + Math.cos(t * 0.2 + sp.ph) * 0.03;
    sp.material.opacity = opacity * (0.75 + 0.25 * Math.sin(t * 0.5 + sp.ph));
  });
}
// A few flapping bats circling above the scene.
let _wingGeo, _batBodyGeo, _batMat;
function bats(root, n = 3, cx = 0, cz = 0, R = 0.38, y = 0.62) {
  if (!_wingGeo) {
    const sh = new THREE.Shape();
    sh.moveTo(0, 0.008); sh.quadraticCurveTo(0.025, 0.04, 0.062, 0.022); sh.lineTo(0.052, 0.006);
    sh.lineTo(0.044, 0.014); sh.lineTo(0.034, -0.002); sh.lineTo(0.022, 0.006); sh.lineTo(0.012, -0.012); sh.lineTo(0, -0.008);
    _wingGeo = new THREE.ShapeGeometry(sh);
    _batBodyGeo = new THREE.SphereGeometry(0.011, 8, 6);
    _batMat = new THREE.MeshBasicMaterial({ color: 0x1a1226, side: THREE.DoubleSide });
  }
  const list = [];
  for (let i = 0; i < n; i++) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(_batBodyGeo, _batMat); body.scale.set(0.8, 1, 1.5);
    const wr = new THREE.Mesh(_wingGeo, _batMat), wl = new THREE.Mesh(_wingGeo, _batMat);
    wl.scale.x = -1;
    const eyes = glowSprite(0xff4455, 0.02, 0.9); eyes.position.set(0, 0.002, 0.012);
    g.add(body, wr, wl, eyes);
    g.scale.setScalar(1.15);
    root.add(g);
    list.push({ g, wr, wl, dir: i % 2 ? -1 : 1, ph: i / n * Math.PI * 2, sp: 0.5 + i * 0.13, r: R * (0.8 + 0.2 * i), yy: y + i * 0.04 });
  }
  return t => list.forEach(b => {
    const a = t * b.sp * b.dir + b.ph;
    b.g.position.set(cx + Math.cos(a) * b.r, b.yy + Math.sin(t * 1.7 + b.ph) * 0.03, cz + Math.sin(a) * b.r * 0.8);
    b.g.rotation.y = b.dir > 0 ? -a : Math.PI - a;
    const f = Math.sin(t * 16 + b.ph) * 0.7;
    b.wr.rotation.z = f; b.wl.rotation.z = -f;
  });
}

// Drifting fireflies / sparkles (one additive Points draw call).
function fireflies(root, n, ax, az, ay, y0, color = 0xd8ff8a, size = 0.03) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(n * 3);
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ map: glowTex(), color, size, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.9 }));
  pts.frustumCulled = false; pts.renderOrder = 3;
  const seed = seeded(77 + n);
  const ph = Array.from({ length: n }, () => [seed() * 6.28, seed() * 6.28, seed() * 6.28, 0.3 + seed() * 0.5]);
  root.add(pts);
  return t => {
    for (let i = 0; i < n; i++) {
      const p = ph[i];
      pos[i * 3] = Math.sin(t * p[3] + p[0]) * ax;
      pos[i * 3 + 1] = y0 + (Math.sin(t * p[3] * 1.3 + p[1]) * 0.5 + 0.5) * ay;
      pos[i * 3 + 2] = Math.cos(t * p[3] * 0.8 + p[2]) * az;
    }
    geo.attributes.position.needsUpdate = true;
    pts.material.opacity = 0.75 + 0.25 * Math.sin(t * 3);
  };
}

// "Rise up" intro whenever a scene (re)appears: grows out of the card with a little overshoot.
function withIntro(obj) {
  const inner = obj.update;
  let t0 = null, last = -99;
  obj.update = function (t) {
    if (t0 === null || t < last || t - last > 0.4) t0 = t;
    last = t;
    const k = Math.min(1, (t - t0) / 1.1);
    const c1 = 1.9, e = 1 + (c1 + 1) * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); // easeOutBack
    obj.root.scale.set(1, Math.max(0.001, k < 1 ? e : 1), 1);
    inner.call(obj, t);
  };
  // Called whenever the scene's own clock restarts at 0 (station opened, AR <-> 3D switch).
  obj.reset = () => { t0 = null; last = -99; if (obj.onReset) obj.onReset(); };
  return obj;
}

// Shared spooky extras: a flickering jack-o'-lantern with a carved face and a warm halo.
let _lg;
function lanternGeos() {
  return _lg || (_lg = {
    body: new THREE.SphereGeometry(0.035, 18, 14), stem: new THREE.CylinderGeometry(0.005, 0.008, 0.02, 8),
    eye: new THREE.CircleGeometry(0.0075, 3), mouth: new THREE.CircleGeometry(0.016, 10, Math.PI, Math.PI),
    dark: new THREE.MeshBasicMaterial({ color: 0x1a0c05 })
  });
}
function lantern(x, z, s = 1) {
  const L = lanternGeos();
  const g = new THREE.Group();
  const body = new THREE.Mesh(L.body, glow(C.pumpkin, 0.35));
  body.scale.set(1.2, 0.9, 1.2);
  const stem = new THREE.Mesh(L.stem, std(C.slime));
  stem.position.y = 0.036; stem.rotation.z = 0.25;
  const e1 = new THREE.Mesh(L.eye, L.dark), e2 = new THREE.Mesh(L.eye, L.dark), mo = new THREE.Mesh(L.mouth, L.dark);
  e1.position.set(-0.014, 0.009, 0.0385); e2.position.set(0.014, 0.009, 0.0385);
  e1.rotation.z = e2.rotation.z = Math.PI / 2; mo.position.set(0, -0.004, 0.0395);
  const halo = glowSprite(0xff8c32, 0.17, 0.55); halo.position.y = 0.01;
  g.add(body, stem, e1, e2, mo, halo);
  g.position.set(x, 0.032 * s, z);
  g.scale.setScalar(s);
  const fl = floorGlow(0xff8c32, 0.12 * s, 0.35); fl.position.set(x, 0.004, z);
  g.floorGlow = fl;
  g.update = t => {
    const f = Math.abs(Math.sin(t * 7.3) * Math.sin(t * 3.1));
    body.material.emissiveIntensity = 0.3 + 0.25 * f;
    halo.material.opacity = 0.4 + 0.3 * f;
    fl.material.opacity = 0.25 + 0.2 * f;
  };
  return g;
}
// Add a lantern together with its floor glow.
function addLantern(root, x, z, s = 1) { const l = lantern(x, z, s); root.add(l, l.floorGlow); return l; }

// ---------- Seal 1: the graveyard pond (water on Earth) ----------
function archGeo(w, h, d) {
  const r = w / 2, sh = new THREE.Shape();
  sh.moveTo(-r, 0); sh.lineTo(r, 0); sh.lineTo(r, h); sh.absarc(0, h, r, 0, Math.PI, false); sh.lineTo(-r, 0);
  const g = new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: true, bevelSize: 0.004, bevelThickness: 0.004, bevelSegments: 2, curveSegments: 16 });
  g.translate(0, 0, -d / 2);
  return g;
}

function buildPond() {
  const root = new THREE.Group();
  const rand = seeded(4242);
  const ground = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.48, 0.012, 56), std(0x2a2238, { roughness: 0.9 }));
  ground.scale.z = 1.35; ground.position.y = 0.006;
  const edge = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.004, 6, 64), glow(C.purple, 0.6));
  edge.rotation.x = Math.PI / 2; edge.scale.y = 1.35; edge.position.y = 0.012;
  root.add(ground, edge);

  // Pond: dark rim of stones, glossy water, moon glint
  const shore = new THREE.Mesh(new THREE.RingGeometry(0.19, 0.235, 48), std(0x1b1626, { roughness: 1 }));
  shore.rotation.x = -Math.PI / 2; shore.scale.set(1.25, 1, 1); shore.position.set(0.03, 0.0125, 0.2);
  const pond = new THREE.Mesh(new THREE.CircleGeometry(0.2, 48), std(C.water, { emissive: 0x0c2a3a, emissiveIntensity: 0.7, roughness: 0.1, metalness: 0.2 }));
  pond.rotation.x = -Math.PI / 2; pond.scale.set(1.25, 1, 1); pond.position.set(0.03, 0.014, 0.2);
  const pondGlow = floorGlow(0x3fb0e0, 0.3, 0.35); pondGlow.scale.set(0.34, 0.26, 1); pondGlow.scale.setScalar(0.3); pondGlow.position.set(0.03, 0.0145, 0.2);
  pondGlow.scale.x = 0.38;
  const stones = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.014, 0), std(0x4a4256, { flatShading: true, roughness: 0.9 }), 16);
  const mm = new THREE.Matrix4(), qq = new THREE.Quaternion(), ee = new THREE.Euler();
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * Math.PI * 2 + rand() * 0.2, rr = 1.02 + rand() * 0.1;
    ee.set(rand() * 3, rand() * 3, rand() * 3); qq.setFromEuler(ee);
    mm.compose(new THREE.Vector3(0.03 + Math.cos(a) * 0.25 * rr, 0.015, 0.2 + Math.sin(a) * 0.2 * rr), qq, new THREE.Vector3(1 + rand() * 0.6, 0.7, 1 + rand() * 0.5));
    stones.setMatrixAt(i, mm);
  }
  root.add(shore, pond, pondGlow, stones);
  const ripples = [0, 1, 2].map(i => {
    const r = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.036, 40), new THREE.MeshBasicMaterial({ color: 0x9fdcf0, transparent: true, depthWrite: false }));
    r.rotation.x = -Math.PI / 2; r.position.set(0.03, 0.016, 0.2); r.phase = i / 3;
    root.add(r); return r;
  });
  const glint = glowSprite(0xcfefff, 0.05, 0.9); glint.position.set(-0.04, 0.025, 0.15);
  root.add(glint);

  // Spiky grass tufts (one draw call)
  const grass = new THREE.InstancedMesh(new THREE.ConeGeometry(0.004, 0.028, 4), std(0x3a5a4a, { roughness: 1 }), 48);
  for (let i = 0, k = 0; k < 48 && i < 400; i++) {
    const x = (rand() - 0.5) * 0.86, z = (rand() - 0.5) * 1.2;
    if ((x / 0.46) ** 2 + (z / 0.62) ** 2 > 0.85) continue;
    if (((x - 0.03) / 0.3) ** 2 + ((z - 0.2) / 0.26) ** 2 < 1) continue;
    ee.set((rand() - 0.5) * 0.4, 0, (rand() - 0.5) * 0.4); qq.setFromEuler(ee);
    mm.compose(new THREE.Vector3(x, 0.024, z), qq, new THREE.Vector3(1, 0.7 + rand() * 0.8, 1));
    grass.setMatrixAt(k++, mm);
  }
  root.add(grass);

  // Mountain with snow cap (E)
  const mountain = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.38, 7), std(C.mist, { flatShading: true, roughness: 0.9 }));
  mountain.position.set(0.24, 0.2, -0.36);
  const snow = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.11, 7), std(0xffffff, { flatShading: true, emissive: 0x99aabb, emissiveIntensity: 0.4 }));
  snow.position.set(0.24, 0.335, -0.36);
  const snowGlow = glowSprite(0xbfe0ff, 0.2, 0.35); snowGlow.position.set(0.24, 0.36, -0.4);
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.045, 0), std(0x5a5068, { flatShading: true }));
  rock.position.set(0.41, 0.025, -0.24); rock.scale.set(1, 0.7, 1.2);
  root.add(mountain, snow, snowGlow, rock);

  // Tombstones (A has icicles); they wobble ever so slightly
  const stoneGeo = archGeo(0.1, 0.1, 0.03);
  const stoneMat = std(0x6c6478, { roughness: 0.85 });
  const iceMat = std(C.ice, { transparent: true, opacity: 0.88, roughness: 0.05, metalness: 0.1, emissive: 0x4488aa, emissiveIntensity: 0.5 });
  const icicleGeo = new THREE.ConeGeometry(0.006, 1, 6); icicleGeo.rotateX(Math.PI); icicleGeo.translate(0, -0.5, 0);
  function tombstone(withIce) {
    const tomb = new THREE.Group();
    tomb.add(new THREE.Mesh(stoneGeo, stoneMat));
    const mound = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 8), std(0x201a2a, { roughness: 1 }));
    mound.scale.set(0.8, 0.16, 0.9); mound.position.set(0, 0, 0.07);
    tomb.add(mound);
    if (withIce) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.108, 0.011, 0.012), iceMat);
      band.position.set(0, 0.1, 0.021);
      tomb.add(band);
      for (let i = 0; i < 6; i++) {
        const len = 0.025 + (i % 3) * 0.012;
        const ic = new THREE.Mesh(icicleGeo, iceMat);
        ic.scale.set(1, len, 1);
        ic.position.set(-0.042 + i * 0.017, 0.097, 0.024);
        tomb.add(ic);
      }
      const frost = glowSprite(0x9fe0ff, 0.17, 0.4); frost.position.set(0, 0.085, 0.04);
      tomb.add(frost);
    } else {
      const m = std(0x4a4358);
      const v = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.045, 0.004), m), h = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.008, 0.004), m);
      v.position.set(0, 0.07, 0.019); h.position.set(0, 0.08, 0.019);
      tomb.add(v, h);
    }
    return tomb;
  }
  const tomb = tombstone(true);
  tomb.position.set(-0.3, 0.012, -0.02); tomb.rotation.y = 0.35;
  const tomb2 = tombstone(false);
  tomb2.position.set(-0.36, 0.012, 0.3); tomb2.rotation.y = -0.2; tomb2.scale.setScalar(0.7);
  root.add(tomb, tomb2);

  // Bare spooky tree
  const bark = std(0x2b2233, { roughness: 1 });
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.02, 0.24, 7), bark); trunk.position.y = 0.12;
  tree.add(trunk);
  [[0.08, 0.7, 0.09, 0.2], [0.17, -0.6, 0.08, 0.5], [0.2, 0.5, 0.06, 2.4], [0.12, -0.9, 0.07, 3.4], [0.23, 0.2, 0.06, 4.4]].forEach(([y, rz, l, ry]) => {
    const br = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.007, l, 5), bark);
    br.geometry = br.geometry.clone(); br.geometry.translate(0, l / 2, 0);
    br.position.y = y; br.rotation.set(0, ry, rz);
    tree.add(br);
  });
  tree.position.set(0.4, 0.012, 0.0); tree.rotation.y = 0.5;
  root.add(tree);

  // Cloud with rain (C): plump, soft, with a flicker of lightning
  const cloud = new THREE.Group();
  const cloudGeo = new THREE.SphereGeometry(1, 18, 12);
  const cloudMat = std(0xd8d2e6, { emissive: 0x4a4066, emissiveIntensity: 0.5, roughness: 1 });
  [[0, 0, 0, 0.07], [0.07, -0.01, 0.01, 0.055], [-0.07, -0.012, 0, 0.055], [0.03, 0.035, -0.01, 0.055], [-0.035, 0.03, 0.01, 0.05], [0.0, -0.018, 0.025, 0.05], [0.105, -0.02, 0, 0.035], [-0.105, -0.022, 0, 0.035]]
    .forEach(([x, y, z, r]) => { const p = new THREE.Mesh(cloudGeo, cloudMat); p.scale.setScalar(r); p.position.set(x, y, z); cloud.add(p); });
  const cloudGlow = glowSprite(0xa99cff, 0.4, 0.28); cloudGlow.position.set(0, 0, 0.05);
  cloud.add(cloudGlow);
  cloud.position.set(-0.08, 0.46, -0.18);
  root.add(cloud);
  const drops = [];
  const dropMat = std(0x7cc8ee, { emissive: 0x2a6f8f, emissiveIntensity: 0.8 });
  const dropGeo = new THREE.CapsuleGeometry(0.0035, 0.018, 3, 6);
  for (let i = 0; i < 16; i++) {
    const d = new THREE.Mesh(dropGeo, dropMat);
    d.base = new THREE.Vector3(-0.08 + (Math.random() - 0.5) * 0.17, 0, -0.18 + (Math.random() - 0.5) * 0.08);
    d.phase = Math.random();
    root.add(d); drops.push(d);
  }

  // Invisible water vapour (D): faint upward arrows show where the invisible vapour goes (a model, not mist)
  const wisps = [];
  const shaftGeo = new THREE.CylinderGeometry(0.0016, 0.0016, 0.034, 6); shaftGeo.translate(0, 0.017, 0);
  const headGeo = new THREE.ConeGeometry(0.0068, 0.018, 8); headGeo.translate(0, 0.043, 0);
  for (let i = 0; i < 14; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xb9e3ff, transparent: true, opacity: 0.3, depthWrite: false });
    const w = new THREE.Group();
    w.add(new THREE.Mesh(shaftGeo, mat), new THREE.Mesh(headGeo, mat));
    w.mat = mat;
    w.base = new THREE.Vector3(0.03 + (Math.random() - 0.5) * 0.34, 0, 0.2 + (Math.random() - 0.5) * 0.2);
    w.phase = i / 14 + (Math.random() - 0.5) * 0.05;
    w.renderOrder = 2;
    root.add(w); wisps.push(w);
  }

  const lan = addLantern(root, 0.33, 0.42, 1.1);
  const mistT = mist(root, [[-0.25, 0.45, 0.4], [0.3, 0.25, 0.35], [-0.3, -0.35, 0.35], [0.0, -0.5, 0.4]]);
  const batT = bats(root, 3, 0, -0.05, 0.4, 0.62);
  const flyT = fireflies(root, 12, 0.4, 0.55, 0.22, 0.04);

  const A = badge("A"); A.position.set(-0.3, 0.2, -0.02);
  const B = badge("B"); B.position.set(-0.12, 0.07, 0.36);
  const Cb = badge("C"); Cb.position.set(-0.19, 0.22, -0.18);  // beside the falling rain
  const D = badge("D"); D.position.set(0.13, 0.2, 0.22);       // in the vapour rising off the pond, well in front of the mountain
  const E = badge("E"); E.position.set(0.24, 0.45, -0.36);
  root.add(A, B, Cb, D, E);

  return withIntro({
    root,
    update(t) {
      ripples.forEach(r => { const k = (t * 0.35 + r.phase) % 1; r.scale.setScalar(1 + k * 4); r.material.opacity = 0.7 * (1 - k); });
      drops.forEach(d => { const k = (t * 1.1 + d.phase) % 1; d.position.set(d.base.x, lerp(0.42, 0.02, k), d.base.z); });
      wisps.forEach(w => {
        const k = (t * 0.14 + w.phase) % 1;
        w.position.set(w.base.x + Math.sin(t * 1.2 + w.phase * 9) * 0.008, lerp(0.02, 0.3, k), w.base.z);
        w.mat.opacity = 0.42 * Math.sin(Math.PI * k);
      });
      cloud.position.x = -0.08 + Math.sin(t * 0.5) * 0.01;
      const fl = Math.max(0, Math.sin(t * 0.9) * 8 - 7.2) + Math.max(0, Math.sin(t * 2.3 + 1) * 10 - 9.5); // brief lightning flicker
      cloudMat.emissiveIntensity = 0.5 + Math.min(1, fl) * 1.2;
      cloudGlow.material.opacity = 0.28 + Math.min(1, fl) * 0.5;
      tomb.rotation.z = Math.sin(t * 1.3) * 0.025; tomb2.rotation.z = Math.sin(t * 1.1 + 2) * 0.03;
      tree.rotation.z = Math.sin(t * 0.8) * 0.015;
      glint.material.opacity = 0.5 + 0.4 * Math.sin(t * 2.2);
      lan.update(t); mistT(t); batT(t); flyT(t);
    }
  });
}

// ---------- particle helpers for seals 2 and 3 ----------
// Positions for one state, in a container whose floor is y=0.
function solidLattice(nx, ny, nz, gap, y0) {
  const out = [];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) for (let k = 0; k < nz; k++)
    out.push(new THREE.Vector3((i - (nx - 1) / 2) * gap, y0 + j * gap, (k - (nz - 1) / 2) * gap));
  return out;
}
function seeded(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

// Push overlapping particles apart (centres kept at least d0 apart). `fixed` particles never move.
function separate(list, fixed, d0, passes, flat = false) {
  for (let it = 0; it < passes; it++) {
    for (let a = 0; a < list.length; a++) {
      const A = list[a].p;
      for (let b = a + 1; b < list.length; b++) {
        const B = list[b].p;
        let dx = B.x - A.x, dy = flat ? 0 : B.y - A.y, dz = B.z - A.z, d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d >= d0) continue;
        if (d < 1e-5) { dx = 1e-3; dy = dz = 0; d = 1e-3; }
        const f = (d0 - d) / 2 / d;
        A.x -= dx * f; A.y -= dy * f; A.z -= dz * f; B.x += dx * f; B.y += dy * f; B.z += dz * f;
      }
      for (let b = 0; b < fixed.length; b++) {
        const B = fixed[b];
        let dx = B.x - A.x, dy = B.y - A.y, dz = B.z - A.z, d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d >= d0) continue;
        if (d < 1e-5) { dx = 1e-3; dy = dz = 0; d = 1e-3; }
        const f = (d0 - d) / d;
        A.x -= dx * f; A.y -= dy * f; A.z -= dz * f;
      }
    }
  }
}
// Liquid motion: each particle wanders (slowly turning heading), stays close to its layer height,
// is pushed off its neighbours and kept inside the container, so it travels and changes neighbours.
function wander(list, fixed, dt, o) {
  for (let i = 0; i < list.length; i++) {
    const q = list[i];
    q.th += (Math.random() - 0.5) * 7 * dt;
    q.p.x += Math.cos(q.th) * o.speed * dt; q.p.z += Math.sin(q.th) * o.speed * dt;
    q.p.y += (q.ly - q.p.y) * Math.min(1, 10 * dt);
  }
  separate(list, fixed, o.d0, 3, o.flat);
  for (let i = 0; i < list.length; i++) {
    const q = list[i];
    if (o.confine(q.p)) q.th = Math.atan2(-q.p.z, -q.p.x) + (Math.random() - 0.5);
  }
}

// Gas particles bouncing in a box (|x|,|z| < r) or, with circ, a cylinder of radius r (y0 < y < y1).
function gasCloud(n, r, y0, y1, speed, rand, circ = false) {
  const p = [], v = [];
  for (let i = 0; i < n; i++) {
    let x, z;
    do { x = (rand() - 0.5) * 2 * r; z = (rand() - 0.5) * 2 * r; } while (circ && x * x + z * z > r * r);
    p.push(new THREE.Vector3(x, lerp(y0, y1, rand()), z));
    v.push(new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize().multiplyScalar(speed));
  }
  return {
    p,
    step(dt) {
      for (let i = 0; i < n; i++) {
        p[i].addScaledVector(v[i], dt);
        if (circ) bounceCircle(p[i], v[i], r);
        else {
          if (Math.abs(p[i].x) > r) { p[i].x = Math.sign(p[i].x) * r; v[i].x *= -1; }
          if (Math.abs(p[i].z) > r) { p[i].z = Math.sign(p[i].z) * r; v[i].z *= -1; }
        }
        if (p[i].y < y0) { p[i].y = y0; v[i].y *= -1; }
        if (p[i].y > y1) { p[i].y = y1; v[i].y *= -1; }
      }
    }
  };
}
function bounceCircle(p, v, R) {
  const r = Math.hypot(p.x, p.z);
  if (r > R) {
    const nx = p.x / r, nz = p.z / r;
    p.x = nx * R; p.z = nz * R;
    const vn = v.x * nx + v.z * nz;
    if (vn > 0) { v.x -= 2 * vn * nx; v.z -= 2 * vn * nz; }
  }
}

// Solid particles: fixed lattice sites with a tiny fast vibration.
function solidAt(site, i, t, vib) {
  return new THREE.Vector3(
    site.x + Math.sin(t * 31 + i * 1.7) * vib, site.y + Math.sin(t * 27 + i * 2.3) * vib, site.z + Math.sin(t * 29 + i * 0.9) * vib);
}

// ---------- Seal 2: potion jars (changes of state) ----------
const JARS = [
  { letter: "W", from: "solid", to: "liquid", color: C.slime },   // melting
  { letter: "X", from: "gas", to: "liquid", color: C.bone },      // condensation
  { letter: "Y", from: "liquid", to: "solid", color: C.purple },  // freezing
  { letter: "Z", from: "liquid", to: "gas", color: C.pumpkin }    // evaporation
];
const JAR_N = 18, JAR_R = 0.085, JAR_H = 0.3, PR = 0.0105;
const JAR_IN = JAR_R - PR - 0.003;          // furthest a particle centre may be from the jar axis
const POOL_Y = 0.008 + PR + 0.002;          // height of particle centres lying on the jar floor
const LATT = 0.039;                         // lattice spacing: particles 0.023 wide, so ~0.011 gaps show
const T_HOLD = 3.5, T_CHG = 4, CYCLE = 12;  // BEFORE hold 3.5 s, change 4 s, AFTER hold 3.5 s, fade out/reset/fade in 1 s
const HEATED = { W: true, Z: true };
const M_SOLID = 0, M_LIQ = 1, M_GAS = 2, M_FREEZE = 3, M_FALL = 4;

// One jar's particle simulation. Particles change state one at a time at staggered moments.
function makeJarSim(J, seed) {
  const rand = seeded(seed);
  const sites = solidLattice(3, 3, 2, LATT, POOL_Y);
  const items = sites.map((site, i) => ({ i, site, p: new THREE.Vector3(), v: new THREE.Vector3(), th: 0, ly: POOL_Y, mode: 0, ev: 0, tgt: new THREE.Vector3() }));
  const shrinks = J.letter === "X" || J.letter === "Z";
  const liq = [], fixed = [];
  const sim = { items, poolR: JAR_IN, frac: 0, nL: 0 };
  const gasTop = JAR_H - 0.025;
  const randDisc = R => { const a = rand() * 6.283, r = Math.sqrt(rand()) * R; return [Math.cos(a) * r, Math.sin(a) * r]; };
  sim.init = () => {
    const N = items.length;
    // order in which particles change state: the top layer of a melting solid goes first, otherwise random
    const order = items.map((it, k) => ({ k, key: (J.from === "solid" ? it.site.y * 20 : 0) + rand() })).sort((a, b) => b.key - a.key).map(o => o.k);
    order.forEach((idx, n) => { items[idx].ev = T_HOLD + 0.2 + n / (N - 1) * (T_CHG - 1.4); });
    sim.poolR = JAR_IN; sim.frac = J.from === "liquid" ? 1 : 0;
    items.forEach(it => {
      it.ly = POOL_Y; it.th = rand() * 6.283; it.v.set(0, 0, 0);
      if (J.from === "solid") { it.mode = M_SOLID; it.p.copy(it.site); }
      else if (J.from === "gas") {
        it.mode = M_GAS;
        const [x, z] = randDisc(JAR_IN);
        it.p.set(x, lerp(0.06, gasTop, rand()), z);
        it.v.set(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize().multiplyScalar(0.4);
      } else {
        it.mode = M_LIQ;
        const [x, z] = randDisc(JAR_IN);
        it.p.set(x, POOL_Y, z);
      }
    });
    if (J.from === "liquid") { // relax into a packed, jumbled pool that just touches
      for (let k = 0; k < 80; k++) {
        separate(items, [], 0.025, 1, true);
        items.forEach(it => { const r = Math.hypot(it.p.x, it.p.z); if (r > JAR_IN) { it.p.x *= JAR_IN / r; it.p.z *= JAR_IN / r; } it.p.y = POOL_Y; });
      }
    }
  };
  sim.step = (dt, c) => {
    // staggered state changes
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (c < it.ev) continue;
      if (it.mode === M_SOLID && J.to === "liquid") { it.mode = M_LIQ; it.th = rand() * 6.283; }
      else if (it.mode === M_LIQ && J.to === "solid") it.mode = M_FREEZE;
      else if (it.mode === M_LIQ && J.to === "gas") { // escapes from the surface
        it.mode = M_GAS;
        const a = rand() * 6.283, s = 0.4;
        it.v.set(Math.cos(a) * s * 0.4, s * 0.85, Math.sin(a) * s * 0.4);
        it.p.y = Math.max(it.p.y, POOL_Y + 0.004);
      } else if (it.mode === M_GAS && J.to === "liquid") { // drops into the pool
        it.mode = M_FALL;
        const [x, z] = randDisc(Math.max(0.02, sim.poolR * 0.85));
        it.tgt.set(x, POOL_Y, z);
      }
    }
    let nL = 0, nF = 0;
    liq.length = 0; fixed.length = 0;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it.mode === M_LIQ) { nL++; liq.push(it); }
      else if (it.mode === M_FALL) nF++;
      else if (it.mode === M_SOLID) fixed.push(it.site);
      else if (it.mode === M_FREEZE) fixed.push(it.p);
    }
    sim.nL = nL;
    const R0 = shrinks ? JAR_IN * Math.min(1, Math.max(0.45, Math.sqrt((nL + nF + 1) / items.length))) : JAR_IN;
    sim.poolR += (R0 - sim.poolR) * Math.min(1, 4 * dt);
    const R = sim.poolR;
    wander(liq, fixed, dt, { speed: 0.05, d0: 0.025, flat: true, confine: p => { const r = Math.hypot(p.x, p.z); if (r > R) { p.x *= R / r; p.z *= R / r; return true; } return false; } });
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it.mode === M_GAS) {
        it.p.addScaledVector(it.v, dt);
        bounceCircle(it.p, it.v, JAR_IN);
        if (it.p.y < 0.03) { it.p.y = 0.03; it.v.y = Math.abs(it.v.y); }
        if (it.p.y > gasTop) { it.p.y = gasTop; it.v.y = -Math.abs(it.v.y); }
      } else if (it.mode === M_FREEZE) {
        it.p.lerp(it.site, Math.min(1, 9 * dt));
        if (it.p.distanceTo(it.site) < 0.0015) { it.mode = M_SOLID; it.p.copy(it.site); }
      } else if (it.mode === M_FALL) {
        const d = it.tgt.clone().sub(it.p), len = d.length(), st = 0.32 * dt;
        if (len <= st) { it.p.copy(it.tgt); it.mode = M_LIQ; it.th = rand() * 6.283; }
        else it.p.addScaledVector(d, st / len);
      }
    }
    sim.frac += (nL / items.length - sim.frac) * Math.min(1, 8 * dt);
  };
  sim.pos = (it, t) => it.mode === M_SOLID ? solidAt(it.site, it.i, t, 0.0022) : it.p;
  sim.init();
  return sim;
}

let _cueTex;
function cueTex() {
  if (_cueTex) return _cueTex;
  const mk = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
  const flame = mk(64, 96, (g, w, h) => {
    const path = () => { g.beginPath(); g.moveTo(w / 2, 4); g.bezierCurveTo(w * 0.95, h * 0.45, w * 0.95, h * 0.95, w / 2, h - 3); g.bezierCurveTo(w * 0.05, h * 0.95, w * 0.05, h * 0.5, w / 2, 4); g.closePath(); };
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#ffd24a"); gr.addColorStop(1, "#ff4a1c");
    path(); g.fillStyle = gr; g.fill();
    g.save(); g.translate(w / 2, h * 0.62); g.scale(0.5, 0.5); g.translate(-w / 2, -h * 0.62);
    path(); g.fillStyle = "#fff3b0"; g.fill(); g.restore();
  });
  // blue "cold" cue: a downward arrow
  const cold = mk(64, 96, (g, w, h) => {
    g.beginPath(); g.moveTo(w * 0.36, 4); g.lineTo(w * 0.64, 4); g.lineTo(w * 0.64, h * 0.5); g.lineTo(w * 0.92, h * 0.5);
    g.lineTo(w / 2, h - 4); g.lineTo(w * 0.08, h * 0.5); g.lineTo(w * 0.36, h * 0.5); g.closePath();
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#d6f1ff"); gr.addColorStop(1, "#3aa6ff");
    g.fillStyle = gr; g.fill(); g.lineWidth = 4; g.strokeStyle = "#e8f8ff"; g.stroke();
  });
  return (_cueTex = { flame, cold });
}

// Small readable tag under a jar: HEATING (orange) or COOLING (blue).
function tagSprite(text, color) {
  const c = document.createElement("canvas");
  c.width = 320; c.height = 84;
  const g = c.getContext("2d");
  g.fillStyle = "rgba(20,15,28,.92)"; g.beginPath(); g.roundRect(4, 4, 312, 76, 24); g.fill();
  g.lineWidth = 6; g.strokeStyle = color; g.stroke();
  g.fillStyle = color; g.font = "bold 52px 'Atkinson Hyperlegible', sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
  g.fillText(text, 160, 44);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  s.scale.set(0.2, 0.2 * 84 / 320, 1); s.renderOrder = 11;
  return s;
}

// Shared BEFORE / AFTER indicator (one canvas texture for all four jars; redrawn only when its look changes).
function makeIndicator() {
  const W = 320, H = 120, c = document.createElement("canvas");
  c.width = W; c.height = H;
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true });
  let key = "";
  const font = "bold 38px 'Atkinson Hyperlegible', sans-serif";
  const pill = (g, x, label, lit) => {
    g.fillStyle = lit ? "#ff8c32" : "rgba(20,15,28,.92)";
    g.beginPath(); g.roundRect(x, 4, 150, 56, 18); g.fill();
    g.lineWidth = 4; g.strokeStyle = lit ? "#ffd7a8" : "#5b4d78"; g.stroke();
    g.fillStyle = lit ? "#140f1c" : "#8f84a8"; g.font = font; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(label, x + 75, 34);
  };
  return {
    mat,
    set(phase, prog) { // phase 0 before, 1 change, 2 after, 3 replay
      const kk = phase + ":" + Math.round(prog * 24);
      if (kk === key) return; key = kk;
      const g = c.getContext("2d"); g.clearRect(0, 0, W, H);
      pill(g, 4, "BEFORE", phase === 0); pill(g, 166, phase === 3 ? "Replay" : "AFTER", phase === 2 || phase === 3);
      g.fillStyle = "rgba(20,15,28,.92)"; g.beginPath(); g.roundRect(4, 72, W - 8, 40, 20); g.fill();
      g.lineWidth = 4; g.strokeStyle = "#5b4d78"; g.stroke();
      const x0 = 30, x1 = W - 30, px = x0 + (x1 - x0) * prog;
      g.fillStyle = "#3a2f55"; g.fillRect(x0, 90, x1 - x0, 4);
      if (phase > 0 && phase < 3) { g.fillStyle = "#ff8c32"; g.fillRect(x0, 89, px - x0, 6); }
      g.fillStyle = phase === 1 ? "#ffd7a8" : "#ff8c32";
      g.beginPath(); g.moveTo(px + 14, 92); g.lineTo(px - 8, 78); g.lineTo(px - 8, 106); g.closePath(); g.fill();
      tex.needsUpdate = true;
    }
  };
}

function buildJars() {
  const root = new THREE.Group();
  const jarGlass = fresnelMat(0xcfc6e6, 0xd8ccff, 0.07, 2.0, 0.6);
  const glassGeo = new THREE.CylinderGeometry(JAR_R, JAR_R, JAR_H, 36, 1, true);
  const padGeo = new THREE.CylinderGeometry(JAR_R + 0.025, JAR_R + 0.03, 0.014, 36);
  const padMat = std(0x2b2140, { roughness: 0.7, metalness: 0.2 });
  const ringGeo = new THREE.TorusGeometry(JAR_R + 0.027, 0.0035, 6, 48);
  const baseGeo = new THREE.CylinderGeometry(JAR_R, JAR_R, 0.008, 32);
  const baseMat = std(0x3d3150);
  const rimGeo = new THREE.TorusGeometry(JAR_R, 0.005, 8, 40);
  const rimMat = glow(C.purple, 0.6);
  const corkGeo = new THREE.CylinderGeometry(JAR_R * 0.92, JAR_R * 0.8, 0.035, 28);
  const corkMat = std(C.pumpkin, { roughness: 0.8 });
  const bandGeo = new THREE.TorusGeometry(JAR_R * 0.86, 0.004, 6, 32);
  const sphereGeo = new THREE.SphereGeometry(PR, 16, 12);
  const BODY_R = JAR_R - 0.004;
  const bodyGeo = new THREE.CylinderGeometry(BODY_R, BODY_R, 1, 40);
  const discGeo = new THREE.CircleGeometry(1, 40);
  const surfRingGeo = new THREE.TorusGeometry(1, 0.025, 6, 48);
  const indicator = makeIndicator(), indMat = indicator.mat;
  const jars = JARS.map((J, j) => {
    const g = new THREE.Group();
    g.position.set(-0.36 + j * 0.24, 0.014, 0.05);
    const pad = new THREE.Mesh(padGeo, padMat); pad.position.y = -0.007;
    const ring = new THREE.Mesh(ringGeo, glow(J.color, 0.9)); ring.rotation.x = Math.PI / 2; ring.position.y = 0.0;
    const pool = floorGlow(J.color, 0.24, 0.35); pool.position.y = 0.001;
    const glass = new THREE.Mesh(glassGeo, jarGlass);
    glass.position.y = JAR_H / 2;
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.004;
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2; rim.position.y = JAR_H;
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = JAR_H + 0.016;
    const band = new THREE.Mesh(bandGeo, glow(J.color, 0.8)); band.rotation.x = Math.PI / 2; band.position.y = JAR_H + 0.002;
    const label = badge(J.letter, "#8c7bd6", 0.08); label.position.y = JAR_H + 0.09;
    g.add(pad, ring, pool, glass, base, rim, cork, band, label);

    const sim = makeJarSim(J, 101 + j * 17);
    // translucent liquid body with a flat, clearly visible surface (disc + bright ring); only visible while the jar holds liquid
    const body = new THREE.Mesh(bodyGeo, new THREE.MeshBasicMaterial({ color: J.color, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    body.renderOrder = 1;
    const surf = new THREE.Mesh(discGeo, new THREE.MeshBasicMaterial({ color: J.color, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    surf.rotation.x = -Math.PI / 2; surf.renderOrder = 1;
    const surfRing = new THREE.Mesh(surfRingGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    surfRing.rotation.x = Math.PI / 2; surfRing.renderOrder = 2;
    g.add(body, surf, surfRing);
    // BEFORE/AFTER indicator in front of the jar
    const ind = new THREE.Sprite(indMat); ind.scale.set(0.236, 0.236 * 120 / 320, 1); ind.position.set(0, 0.012, 0.25); ind.renderOrder = 11;
    g.add(ind);
    // heating / cooling cue in front of the jar, plus a readable tag
    const hot = !!HEATED[J.letter], cueCol = hot ? 0xff7a1c : 0x6cc8ff;
    const tag = tagSprite(hot ? "HEATING" : "COOLING", hot ? "#ff8c32" : "#6cc8ff"); tag.position.set(0, 0.012, 0.335);
    g.add(tag);
    const cueGlow = floorGlow(cueCol, 0.17, 0); cueGlow.position.set(0, 0.006, 0.0);
    const aura = glowSprite(cueCol, 0.28, 0); aura.position.set(0, 0.05, 0.15);
    const cues = [];
    const ct = cueTex();
    for (let n = 0; n < 3; n++) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: hot ? ct.flame : ct.cold, transparent: true, depthWrite: false, opacity: 0 }));
      sp.renderOrder = 9; sp.position.set((n - 1) * 0.07, 0.05, 0.17);
      cues.push(sp); g.add(sp);
    }
    g.add(cueGlow, aura);
    const pmat = glow(J.color, 0.3, { roughness: 0.35, transparent: true });
    const mesh = new THREE.InstancedMesh(sphereGeo, pmat, JAR_N);
    mesh.frustumCulled = false;
    // faint halo around every particle (one additive Points draw call per jar)
    const hgeo = new THREE.BufferGeometry();
    const hpos = new Float32Array(JAR_N * 3);
    hgeo.setAttribute("position", new THREE.BufferAttribute(hpos, 3));
    const halo = new THREE.Points(hgeo, new THREE.PointsMaterial({ map: glowTex(), color: J.color, size: 0.04, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.1 }));
    halo.frustumCulled = false; halo.renderOrder = 3;
    g.add(mesh, halo);
    root.add(g);
    return { g, mesh, pmat, halo, hpos, hgeo, sim, ring, body, surf, surfRing, cues, cueGlow, aura, hot, J };
  });
  const lan1 = addLantern(root, -0.4, 0.5, 1), lan2 = addLantern(root, 0.4, -0.4, 0.9);
  const mistT = mist(root, [[-0.3, 0.42, 0.4], [0.3, 0.45, 0.4], [0.0, -0.35, 0.5], [-0.4, -0.3, 0.3]]);
  const batT = bats(root, 3, 0, 0, 0.4, 0.62);
  const flyT = fireflies(root, 12, 0.45, 0.5, 0.35, 0.05, 0xc8b6ff);

  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
  let last = 0, resetCycle = -1;
  const api = withIntro({
    root,
    onReset() { last = 0; resetCycle = -1; jars.forEach(J => J.sim.init()); },
    update(t) {
      const dt = Math.min(0.05, Math.max(0, t - last)); last = t;
      const cyc = Math.floor(t / CYCLE), c = t - cyc * CYCLE;
      // c 0..11: the demo; 11..11.5 everything fades out; at 11.5 the jars reset to BEFORE; 11.5..12 fade back in
      if (c >= 11.5 && resetCycle !== cyc) { resetCycle = cyc; jars.forEach(J => J.sim.init()); }
      const sc = c >= 11.5 ? 0 : c;
      const lin = Math.min(1, Math.max(0, (c - T_HOLD) / T_CHG));
      const fade = c < 11 ? 1 : c < 11.5 ? 1 - (c - 11) / 0.5 : (c - 11.5) / 0.5;
      const phase = c >= 11 ? 3 : c < T_HOLD ? 0 : c < T_HOLD + T_CHG ? 1 : 2;
      indicator.set(phase, phase === 3 ? 0 : lin);
      const w = Math.min(1, Math.max(0, (c - T_HOLD) / 0.5)) * Math.min(1, Math.max(0, (T_HOLD + T_CHG - c) / 0.5));
      const cue = (0.28 + 0.72 * w) * Math.max(0, fade);
      jars.forEach(J => {
        const sim = J.sim;
        sim.step(dt, sc);
        // liquid body + flat surface; the pool shrinks/grows with the liquid
        const fr = Math.min(1, sim.frac * 1.5), rr = (sim.poolR + PR - 0.001) / BODY_R;
        const hgt = 0.026 + 0.012 * sim.frac, top = 0.008 + hgt;
        J.body.visible = J.surf.visible = J.surfRing.visible = fr > 0.01;
        J.body.scale.set(rr, hgt, rr); J.body.position.y = 0.008 + hgt / 2;
        J.body.material.opacity = 0.24 * fr * fade;
        J.surf.scale.setScalar(rr * BODY_R); J.surf.position.y = top;
        J.surf.material.opacity = 0.3 * fr * fade;
        J.surfRing.scale.setScalar(rr * BODY_R); J.surfRing.position.y = top + 0.0005;
        J.surfRing.material.opacity = 0.7 * fr * fade;
        J.cueGlow.material.opacity = 0.7 * cue; J.aura.material.opacity = 0.35 * cue;
        J.cues.forEach((sp, n) => {
          sp.material.opacity = Math.min(1, cue * 1.1);
          if (J.hot) { // flickering flame
            const f = 0.8 + 0.3 * Math.sin(t * 13 + n * 2.3) * Math.sin(t * 7.1 + n);
            const sz = (n === 1 ? 0.095 : 0.07) * f * (0.7 + 0.5 * cue);
            sp.scale.set(sz * 0.7, sz, 1); sp.position.y = 0.012 + sz * 0.5; sp.position.x = (n - 1) * 0.07 + Math.sin(t * 9 + n) * 0.004;
          } else { // blue arrows pointing down, drifting down
            const k = (t * 0.6 + n / 3) % 1, sz = 0.075;
            sp.scale.set(sz * 0.67, sz, 1); sp.position.x = (n - 1) * 0.07;
            sp.position.y = 0.1 - k * 0.07;
            sp.material.opacity = Math.min(1, cue * 1.1) * Math.sin(Math.PI * k) * 0.9 + 0.1 * cue;
          }
        });
        for (let i = 0; i < JAR_N; i++) {
          const p = sim.pos(sim.items[i], t);
          m.compose(p, q, one);
          J.mesh.setMatrixAt(i, m);
          J.hpos[i * 3] = p.x; J.hpos[i * 3 + 1] = p.y; J.hpos[i * 3 + 2] = p.z;
        }
        J.mesh.instanceMatrix.needsUpdate = true;
        J.hgeo.attributes.position.needsUpdate = true;
        J.pmat.opacity = Math.max(0, fade);
        J.mesh.visible = J.halo.visible = fade > 0.01;
        J.halo.material.opacity = 0.1 * Math.max(0, fade);
        J.ring.material.emissiveIntensity = 0.7 + 0.3 * Math.sin(t * 2);
      });
      lan1.update(t); lan2.update(t + 1); mistT(t); batT(t); flyT(t);
    }
  });
  return api;
}

// ---------- Seal 3: spell bonds (attractive forces) ----------
const BOXES = [
  { letter: "R", kind: "gas" },
  { letter: "S", kind: "solid" },
  { letter: "T", kind: "liquid" }
];
const BOX = 0.2;

function buildBonds() {
  const root = new THREE.Group();
  const up = new THREE.Vector3(0, 1, 0);
  const boxGeo = new THREE.BoxGeometry(BOX, BOX, BOX);
  const edgeGeo = new THREE.EdgesGeometry(boxGeo);
  const boxGlass = fresnelMat(0xcfc6e6, 0xd8ccff, 0.05, 1.6, 0.35);
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xc9bff2 });
  const plateGeo = new THREE.BoxGeometry(BOX + 0.05, 0.014, BOX + 0.05);
  const plateMat = std(0x2b2140, { roughness: 0.7, metalness: 0.2 });
  const plateEdgeGeo = new THREE.EdgesGeometry(plateGeo);
  const plateEdgeMat = new THREE.LineBasicMaterial({ color: 0x8c7bd6 });
  const sphGeo = new THREE.SphereGeometry(0.016, 14, 10);
  const bondGeo = new THREE.CylinderGeometry(1, 1, 1, 6);
  const BIN = BOX / 2 - 0.018; // furthest a liquid particle centre may be from the box axis
  const boxes = BOXES.map((B, j) => {
    const g = new THREE.Group();
    g.position.set(-0.32 + j * 0.32, 0.014, 0.05);
    const plate = new THREE.Mesh(plateGeo, plateMat); plate.position.y = -0.007;
    const plateEdge = new THREE.LineSegments(plateEdgeGeo, plateEdgeMat); plateEdge.position.y = -0.007;
    const pool = floorGlow(C.purple, 0.2, 0.35); pool.position.y = 0.001;
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    edges.position.y = BOX / 2;
    const glass = new THREE.Mesh(boxGeo, boxGlass);
    glass.position.y = BOX / 2;
    const label = badge(B.letter, "#ff6474", 0.08); label.position.y = BOX + 0.07;
    g.add(plate, plateEdge, pool, edges, glass, label);

    const rand = seeded(500 + j * 31);
    let pts, n, fn, bondR, bondMax, gas, liq, step = null;
    if (B.kind === "solid") {
      pts = solidLattice(3, 3, 3, 0.05, 0.035); n = pts.length;
      fn = (i, t) => solidAt(pts[i], i, t, 0.0025);
      bondR = 0.0055; bondMax = 0.056;
    } else if (B.kind === "liquid") {
      // jumbled, close together, always on the move: particles travel and change neighbours
      n = 20; liq = [];
      for (let i = 0; i < n; i++) liq.push({ p: new THREE.Vector3((rand() - 0.5) * 2 * BIN, 0, (rand() - 0.5) * 2 * BIN), th: rand() * 6.283, ly: i < 12 ? 0.02 : 0.054 });
      const confine = p => {
        let hit = false;
        if (Math.abs(p.x) > BIN) { p.x = Math.sign(p.x) * BIN; hit = true; }
        if (Math.abs(p.z) > BIN) { p.z = Math.sign(p.z) * BIN; hit = true; }
        if (p.y < 0.017) p.y = 0.017;
        return hit;
      };
      liq.forEach(q => { q.p.y = q.ly; });
      for (let k = 0; k < 80; k++) { separate(liq, [], 0.034, 1); liq.forEach(q => { q.p.x = Math.max(-BIN, Math.min(BIN, q.p.x)); q.p.z = Math.max(-BIN, Math.min(BIN, q.p.z)); q.p.y = q.ly; }); }
      fn = i => liq[i].p;
      step = dt => {
        wander(liq, [], dt, { speed: 0.05, d0: 0.034, confine });
        liq.forEach(q => { if (Math.random() < dt * 0.4) q.ly = q.ly < 0.04 ? 0.054 : 0.02; }); // climb over each other now and then
      };
      bondR = 0.0022; bondMax = 0.055;
    } else {
      n = 12; gas = gasCloud(n, BOX / 2 - 0.02, 0.02, BOX - 0.02, 0.25, rand);
      fn = (i) => gas.p[i];
      bondR = 0; bondMax = 0;
    }
    const mesh = new THREE.InstancedMesh(sphGeo, glow(C.bone, 0.3, { roughness: 0.35 }), n);
    mesh.frustumCulled = false;
    const maxBonds = 160;
    const bonds = new THREE.InstancedMesh(bondGeo, glow(C.blood, 0.9, { transparent: true, opacity: B.kind === "solid" ? 1 : 0.65 }), maxBonds);
    bonds.count = 0; bonds.frustumCulled = false;
    const hgeo = new THREE.BufferGeometry();
    const hpos = new Float32Array(n * 3);
    hgeo.setAttribute("position", new THREE.BufferAttribute(hpos, 3));
    const halo = new THREE.Points(hgeo, new THREE.PointsMaterial({ map: glowTex(), color: 0xf2eadb, size: 0.06, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.25 }));
    halo.frustumCulled = false; halo.renderOrder = 3;
    g.add(mesh, bonds, halo);
    root.add(g);
    return { kind: B.kind, n, fn, gas, step, mesh, bonds, bondR, bondMax, maxBonds, hgeo, hpos };
  });
  const lan = addLantern(root, 0.0, -0.45, 1.1);
  const lan2 = addLantern(root, -0.42, 0.45, 0.9);
  const mistT = mist(root, [[-0.3, 0.42, 0.4], [0.3, 0.4, 0.4], [0.0, -0.3, 0.5]]);
  const batT = bats(root, 3, 0, 0, 0.4, 0.55);
  const flyT = fireflies(root, 10, 0.5, 0.45, 0.3, 0.05, 0xffa8b0);

  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1), sc = new THREE.Vector3(), mid = new THREE.Vector3(), dir = new THREE.Vector3();
  let last = 0;
  return withIntro({
    root,
    onReset() { last = 0; },
    update(t) {
      const dt = Math.min(0.05, Math.max(0, t - last)); last = t;
      boxes.forEach(b => {
        if (b.gas) b.gas.step(dt);
        if (b.step) b.step(dt);
        const P = [];
        for (let i = 0; i < b.n; i++) {
          const p = b.fn(i, t); P.push(p); m.compose(p, q, one); b.mesh.setMatrixAt(i, m);
          b.hpos[i * 3] = p.x; b.hpos[i * 3 + 1] = p.y; b.hpos[i * 3 + 2] = p.z;
        }
        b.mesh.instanceMatrix.needsUpdate = true;
        b.hgeo.attributes.position.needsUpdate = true;
        let k = 0;
        if (b.bondMax) {
          const pulse = 1 + 0.15 * Math.sin(t * 4);
          for (let i = 0; i < b.n && k < b.maxBonds; i++) for (let j = i + 1; j < b.n && k < b.maxBonds; j++) {
            const d = P[i].distanceTo(P[j]);
            if (d > b.bondMax) continue;
            mid.addVectors(P[i], P[j]).multiplyScalar(0.5);
            dir.subVectors(P[j], P[i]).normalize();
            q.setFromUnitVectors(up, dir);
            sc.set(b.bondR * pulse, d, b.bondR * pulse);
            m.compose(mid, q, sc);
            b.bonds.setMatrixAt(k++, m);
          }
          q.identity();
        }
        b.bonds.count = k;
        b.bonds.instanceMatrix.needsUpdate = true;
      });
      lan.update(t); lan2.update(t + 2); mistT(t); batT(t); flyT(t);
    }
  });
}

// ---------- Seal 4: the witch's cauldron (heating curve) ----------
// Graph time runs 0..20 minutes; the loop takes 16 s plus a 2 s pause.
const tempAt = m => m < 2 ? -10 + 5 * m : m < 6 ? 0 : m < 14 ? (m - 6) * 12.5 : 100;
const POINTS = [["P", 1], ["Q", 4], ["R", 10], ["S", 17]];
// Base layout in px at k = 1; every size scales with k so the same drawing works small (3D panel) and large (Read graph).
const GRAPH = { w: 1024, h: 680, l: 130, r: 40, t: 100, b: 110, tMax: 20, yMin: -20, yMax: 110 };
const gx = m => GRAPH.l + (m / GRAPH.tMax) * (GRAPH.w - GRAPH.l - GRAPH.r);
const gy = T => GRAPH.h - GRAPH.b - ((T - GRAPH.yMin) / (GRAPH.yMax - GRAPH.yMin)) * (GRAPH.h - GRAPH.t - GRAPH.b);

// Draws the heating graph to a new canvas (also used by the "Read graph" pop-up in app.js).
export function heatingGraphCanvas(w = GRAPH.w, h = GRAPH.h, k = 1) {
  const L = GRAPH.l * k, R = GRAPH.r * k, T0 = GRAPH.t * k, B = GRAPH.b * k;
  const X = m => L + (m / GRAPH.tMax) * (w - L - R);
  const Y = T => h - B - ((T - GRAPH.yMin) / (GRAPH.yMax - GRAPH.yMin)) * (h - T0 - B);
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d");
  g.fillStyle = "#f6f0e4"; g.fillRect(0, 0, w, h);
  g.strokeStyle = "#ff8c32"; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10);
  g.font = `bold ${40 * k}px 'Atkinson Hyperlegible', sans-serif`; g.fillStyle = "#140f1c"; g.textAlign = "center";
  g.fillText("Heating ice in the cauldron", w / 2, 52 * k);
  g.lineWidth = 2; g.strokeStyle = "#d4c9e0"; g.font = `${30 * k}px 'IBM Plex Mono', monospace`;
  for (let T = -20; T <= 110; T += 10) {
    g.beginPath(); g.moveTo(X(0), Y(T)); g.lineTo(X(20), Y(T)); g.stroke();
    if (T % 20 === 0 || T === 100) {
      g.fillStyle = "#140f1c"; g.textAlign = "right"; g.fillText(String(T), X(0) - 14 * k, Y(T) + 10 * k);
    }
  }
  for (let m = 0; m <= 20; m += 5) {
    g.beginPath(); g.moveTo(X(m), Y(-20)); g.lineTo(X(m), Y(110)); g.stroke();
    g.fillStyle = "#140f1c"; g.textAlign = "center"; g.fillText(String(m), X(m), Y(-20) + 38 * k);
  }
  g.strokeStyle = "#140f1c"; g.lineWidth = 4;
  g.beginPath(); g.moveTo(X(0), Y(110)); g.lineTo(X(0), Y(-20)); g.lineTo(X(20), Y(-20)); g.stroke();
  g.font = `bold ${30 * k}px 'Atkinson Hyperlegible', sans-serif`;
  g.fillText("Time (minutes)", X(10), h - 22 * k);
  g.save(); g.translate(40 * k, Y(45)); g.rotate(-Math.PI / 2); g.fillText("Temperature (°C)", 0, 0); g.restore();
  g.strokeStyle = "#c2410c"; g.lineWidth = 9 * k; g.lineJoin = "round";
  g.beginPath();
  for (let m = 0; m <= 20.001; m += 0.1) { const x = X(m), y = Y(tempAt(m)); m === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
  g.stroke();
  POINTS.forEach(([Lb, m]) => {
    const x = X(m), y = Y(tempAt(m));
    g.fillStyle = "#140f1c"; g.beginPath(); g.arc(x, y, 12 * k, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#7c3aed"; g.beginPath(); g.arc(x, y - 52 * k, 26 * k, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#fff"; g.font = `bold ${36 * k}px 'Atkinson Hyperlegible', sans-serif`; g.textAlign = "center"; g.fillText(Lb, x, y - 40 * k);
  });
  return c;
}
function drawGraph() {
  const tex = new THREE.CanvasTexture(heatingGraphCanvas());
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function buildCauldron() {
  const root = new THREE.Group();
  const PW = 0.9, PH = PW * GRAPH.h / GRAPH.w;
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(PW, PH), new THREE.MeshBasicMaterial({ map: drawGraph() }));
  panel.position.set(0, 0.08 + PH / 2, -0.42);
  panel.rotation.x = -0.6; // lean back so it reads from above (phone over the card) and from the side
  // dark frame with glowing orange trim and corner studs, sitting just behind the graph
  const frame = new THREE.Mesh(new THREE.BoxGeometry(PW + 0.045, PH + 0.045, 0.012), std(0x2b2140, { roughness: 0.6, metalness: 0.3 }));
  frame.position.z = -0.008;
  const trim = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(PW + 0.045, PH + 0.045, 0.012)), new THREE.LineBasicMaterial({ color: 0xff8c32 }));
  trim.position.z = -0.008;
  panel.add(frame, trim);
  const studGeo = new THREE.SphereGeometry(0.011, 10, 8), studMat = glow(C.pumpkin, 0.9);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
    const st = new THREE.Mesh(studGeo, studMat); st.position.set(sx * (PW / 2 + 0.012), sy * (PH / 2 + 0.012), 0.0);
    panel.add(st);
  });
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.1, 0.02), std(0x3d3150));
  post.position.set(0, 0.05, -0.44);
  root.add(panel, post);
  // Dot that runs along the graph, positioned in the panel's own plane.
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 12), glow(C.slime, 1));
  const dotGlow = glowSprite(C.slime, 0.07, 0.8);
  dot.add(dotGlow);
  panel.add(dot);
  const toPanel = (m, T) => new THREE.Vector3((gx(m) / GRAPH.w - 0.5) * PW, (0.5 - gy(T) / GRAPH.h) * PH, 0.012);

  // Cauldron (lathe profile with rolled rim), handles, legs, logs and fire
  const prof = [[0, 0], [0.08, 0.003], [0.12, 0.02], [0.15, 0.05], [0.168, 0.09], [0.17, 0.12], [0.158, 0.15], [0.145, 0.165], [0.15, 0.172], [0.146, 0.178], [0.138, 0.172], [0.13, 0.16]]
    .map(([x, y]) => new THREE.Vector2(x, y));
  const iron = std(0x221c2c, { side: THREE.DoubleSide, metalness: 0.5, roughness: 0.35, emissive: 0x2a1840, emissiveIntensity: 0.35 });
  const pot = new THREE.Mesh(new THREE.LatheGeometry(prof, 48), iron);
  const cauldron = new THREE.Group();
  cauldron.add(pot);
  pot.position.y = 0.05;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.145, 0.007, 8, 48), std(0x3d3150, { metalness: 0.6, roughness: 0.3 }));
  rim.rotation.x = Math.PI / 2; rim.position.y = 0.05 + 0.176;
  cauldron.add(rim);
  [-1, 1].forEach(sx => {
    const h = new THREE.Mesh(new THREE.TorusGeometry(0.02, 0.005, 6, 14, Math.PI), iron);
    h.position.set(sx * 0.17, 0.05 + 0.13, 0); h.rotation.z = sx > 0 ? -Math.PI / 2 : Math.PI / 2;
    cauldron.add(h);
  });
  for (let i = 0; i < 3; i++) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.014, 0.06), std(0x221c2c));
    const a = i * Math.PI * 2 / 3;
    leg.position.set(Math.cos(a) * 0.1, 0.03, Math.sin(a) * 0.1);
    cauldron.add(leg);
  }
  const logMat = std(0x3a2418, { roughness: 1, emissive: 0x551100, emissiveIntensity: 0.5 });
  [0.3, 1.9].forEach(a => {
    const lg = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.18, 6), logMat);
    lg.rotation.set(Math.PI / 2, 0, a); lg.position.y = 0.012;
    cauldron.add(lg);
  });
  const flames = [];
  const flameGeo = new THREE.ConeGeometry(0.018, 0.06, 8);
  const flameMats = [glow(C.pumpkin, 1.4), glow(0xffd166, 1.4)];
  for (let i = 0; i < 7; i++) {
    const f = new THREE.Mesh(flameGeo, flameMats[i % 2]);
    const a = i * Math.PI * 2 / 7;
    f.position.set(Math.cos(a) * 0.06, 0.03, Math.sin(a) * 0.06);
    f.phase = i * 1.3;
    cauldron.add(f); flames.push(f);
  }
  const fireGlow = glowSprite(0xff8c32, 0.28, 0.6); fireGlow.position.set(0, 0.04, 0.0);
  cauldron.add(fireGlow);
  const fireFloor = floorGlow(0xff8c32, 0.3, 0.5); cauldron.add(fireFloor);
  const fireLight = new THREE.PointLight(0xff8c32, 0.6, 0.6);
  fireLight.position.set(0, 0.05, 0.1);
  cauldron.add(fireLight);
  cauldron.position.set(-0.06, 0, 0.25);
  root.add(cauldron);

  // Contents: water surface, ice cubes, bubbles, steam
  const water = new THREE.Mesh(new THREE.CircleGeometry(0.15, 40), std(C.water, { emissive: 0x0c2a3a, emissiveIntensity: 0.7, roughness: 0.1, metalness: 0.2 }));
  water.rotation.x = -Math.PI / 2;
  cauldron.add(water);
  const waterBase = new THREE.Color(C.water), waterBoil = new THREE.Color(0x3fbf8a);
  const emBase = new THREE.Color(0x0c2a3a), emBoil = new THREE.Color(0x1f7a3c);
  const iceMat = std(C.ice, { transparent: true, opacity: 0.9, roughness: 0.05, emissive: 0x4488aa, emissiveIntensity: 0.5 });
  const iceGeo = new THREE.BoxGeometry(0.05, 0.05, 0.05);
  const cubes = [];
  for (let i = 0; i < 9; i++) {
    const cube = new THREE.Mesh(iceGeo, iceMat);
    cube.home = new THREE.Vector3(((i % 3) - 1) * 0.06, 0.15 + Math.floor(i / 3) * 0.012, (Math.floor(i / 3) - 1) * 0.06);
    cube.rotation.set(i * 0.4, i * 0.9, i * 0.2);
    cauldron.add(cube); cubes.push(cube);
  }
  const iceGlow = glowSprite(0x9fe0ff, 0.26, 0.4); iceGlow.position.set(0, 0.22, 0);
  cauldron.add(iceGlow);
  const bubbleMat = new THREE.MeshStandardMaterial({ color: 0xdff4ff, transparent: true, opacity: 0.6, roughness: 0.1, emissive: 0x2f8f5a, emissiveIntensity: 0.5 });
  const bubbles = [];
  for (let i = 0; i < 22; i++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.008 + Math.random() * 0.008, 10, 8), bubbleMat);
    b.base = new THREE.Vector2((Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2);
    b.phase = Math.random();
    cauldron.add(b); bubbles.push(b);
  }
  const steam = [];
  for (let i = 0; i < 16; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(), color: 0xf4fff8, transparent: true, depthWrite: false }));
    s.base = new THREE.Vector2((Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.15);
    s.phase = Math.random();
    s.renderOrder = 2;
    cauldron.add(s); steam.push(s);
  }

  // Thermometer and read-out
  const therm = new THREE.Group();
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.1 }));
  tube.position.y = 0.15;
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.02, 16, 12), glow(C.blood, 0.8));
  bulb.position.y = 0.0;
  const bulbGlow = glowSprite(C.blood, 0.09, 0.5); bulb.add(bulbGlow);
  const fluid = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 1, 10), glow(C.blood, 0.8));
  therm.add(tube, bulb, fluid);
  const tickGeo = new THREE.BoxGeometry(0.014, 0.0025, 0.004), tickMat = new THREE.MeshBasicMaterial({ color: 0xf2eadb });
  for (let i = 0; i < 7; i++) { const tk = new THREE.Mesh(tickGeo, tickMat); tk.position.set(0.018, 0.02 + i * 0.045, 0); therm.add(tk); }
  therm.position.set(0.04, 0.12, 0.26);
  therm.rotation.z = -0.35;
  root.add(therm);
  const readout = textSprite(); readout.position.set(0.27, 0.36, 0.25);
  root.add(readout);

  const lan = addLantern(root, -0.38, 0.5, 1.1);
  const lan2 = addLantern(root, 0.4, 0.45, 0.9);
  const mistT = mist(root, [[-0.35, 0.4, 0.4], [0.3, 0.3, 0.4], [0.0, -0.1, 0.45]]);
  const batT = bats(root, 3, 0, 0.1, 0.5, 0.95);
  const flyT = fireflies(root, 10, 0.45, 0.5, 0.3, 0.05, 0xffc470);

  // ----- Jump scare: the teacher's face rises from behind the cauldron at 100 C (graph minute 14) -----
  const SCARE_AT = 14 / 20 * 16; // seconds into the loop (11.2 s)
  const scareGlow = glowSprite(0x7cff6b, 0.5, 0); scareGlow.renderOrder = 4;
  const face = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, alphaTest: 0.04 }));
  face.renderOrder = 5; face.visible = false;
  const FACE_X = -0.06, FACE_Z = 0.12, FACE_Y = 0.46, FACE_H = 0.62;
  face.position.set(FACE_X, -0.3, FACE_Z); scareGlow.position.set(FACE_X, -0.3, FACE_Z - 0.01);
  root.add(scareGlow, face);
  let faceReady = false, faceAspect = 1;
  new THREE.TextureLoader().load("img/scare.png", tex => {
    // bake a soft fade into the bottom ~15% so the shoulders never end in a hard edge
    const img = tex.image, c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const g = c.getContext("2d");
    g.drawImage(img, 0, 0);
    g.globalCompositeOperation = "destination-in";
    const gr = g.createLinearGradient(0, c.height * 0.82, 0, c.height);
    gr.addColorStop(0, "rgba(0,0,0,1)"); gr.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gr; g.fillRect(0, 0, c.width, c.height);
    const t2 = new THREE.CanvasTexture(c);
    t2.colorSpace = THREE.SRGBColorSpace;
    face.material.map = t2; face.material.needsUpdate = true;
    faceAspect = img.width / img.height;
    faceReady = true;
    tex.dispose();
  }, undefined, () => {});
  const scareLight = new THREE.PointLight(0x7cff6b, 0, 0.9);
  scareLight.position.set(FACE_X, 0.4, 0.4);
  root.add(scareLight);
  const greenC = new THREE.Color(0x7cff6b), orangeC = new THREE.Color(0xff8c32);
  const easeOutBack = x => { const c1 = 2.2; return 1 + (c1 + 1) * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  let fired = false, scareT0 = -99;
  const SCARE_LEN = 2.4;
  const reduced = () => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };

  let lastShown = "";
  const api = withIntro({
    root,
    onScare: null,
    newVisit() { fired = false; },   // a new station visit allows the scare once more
    onReset() {                      // scene clock restarted: drop any scare that was mid-flight
      scareT0 = -99; face.visible = false; scareGlow.material.opacity = 0; scareLight.intensity = 0;
    },
    update(t) {
      const c = t % 18;
      const m = Math.min(20, c / 16 * 20);
      const T = tempAt(m);
      dot.position.copy(toPanel(m, T));
      const melt = smooth((m - 2) / 4);            // 0 = all ice, 1 = all water
      const level = 0.09 + melt * 0.07;             // water rises as ice melts
      water.position.y = 0.05 + level;
      water.scale.setScalar(lerp(0.85, 0.95, melt));
      water.visible = melt > 0.02;
      const tint = smooth((m - 6) / 8) * 0.6;       // water turns a little green-witchy as it heats
      water.material.color.copy(waterBase).lerp(waterBoil, tint);
      water.material.emissive.copy(emBase).lerp(emBoil, tint);
      water.material.emissiveIntensity = 0.7 + tint * 0.4 + (m >= 14 ? 0.15 * Math.sin(t * 6) : 0);
      iceGlow.material.opacity = 0.4 * (1 - melt);
      cubes.forEach((cb, i) => {
        const s = Math.max(0.001, 1 - smooth((m - 2 - i * 0.12) / 3.6));
        cb.scale.setScalar(s);
        cb.position.set(cb.home.x, Math.max(cb.home.y - 0.03, 0.05 + level - 0.01), cb.home.z);
        cb.visible = s > 0.01;
      });
      const boil = m >= 14 ? 1 : m > 11 ? (m - 11) / 3 * 0.3 : 0;
      bubbles.forEach((b, i) => {
        const on = i < bubbles.length * boil;
        b.visible = on;
        if (!on) return;
        const k = (t * 1.4 + b.phase) % 1;
        b.position.set(b.base.x, 0.06 + k * (level - 0.01), b.base.y);
      });
      steam.forEach((s, i) => {
        const on = boil >= 1 && i < steam.length;
        s.visible = on;
        if (!on) return;
        const k = (t * 0.45 + s.phase) % 1;
        s.position.set(s.base.x + Math.sin(t + s.phase * 7) * 0.02, 0.05 + level + k * 0.3, s.base.y);
        const sz = 0.05 + k * 0.1; s.scale.set(sz, sz, 1);
        s.material.opacity = 0.4 * Math.sin(Math.PI * Math.min(1, k * 1.15));
      });
      const flick = 0.5 + 0.2 * Math.sin(t * 13) + 0.1 * Math.sin(t * 29);
      flames.forEach(f => { f.scale.y = 0.8 + 0.4 * Math.abs(Math.sin(t * 9 + f.phase)); });
      fireLight.intensity = flick;
      fireGlow.material.opacity = 0.45 + 0.3 * flick; fireFloor.material.opacity = 0.35 + 0.3 * flick;
      const h = (T + 20) / 130 * 0.27 + 0.01;
      fluid.scale.y = h; fluid.position.y = h / 2;
      const shown = `${Math.round(T)} °C`;
      if (shown !== lastShown) { readout.draw(shown); lastShown = shown; }

      // scare: fires only once per station visit, the first time the heating dot reaches 100 C (never with reduced motion)
      if (!fired && t < 18 && c >= SCARE_AT) {
        fired = true;
        if (!reduced() && c - SCARE_AT < 0.5) { scareT0 = t - (c - SCARE_AT); api.onScare && api.onScare(); }
      }
      const s = t - scareT0;
      if (faceReady && s >= 0 && s < SCARE_LEN) {
        let y, sc, rot = 0, jx = 0;
        if (s < 0.32) { const k = s / 0.32, e = easeOutBack(k); y = lerp(-0.2, FACE_Y, e); sc = lerp(0.25, 1, e); }
        else if (s < 1.82) { const w = s - 0.32; y = FACE_Y + Math.sin(w * 9) * 0.008; sc = 1 + 0.035 * Math.sin(w * 22); rot = Math.sin(w * 31) * 0.1 * (1 - w / 2.2); jx = Math.sin(w * 47) * 0.012; }
        else { const k = (s - 1.82) / 0.58, e = k * k; y = lerp(FACE_Y, -0.2, e); sc = lerp(1, 0.4, e); }
        face.visible = true;
        face.position.set(FACE_X + jx, y, FACE_Z);
        face.scale.set(FACE_H * faceAspect * sc, FACE_H * sc, 1);
        face.material.rotation = rot;
        const fl = Math.max(0, 1 - s / 0.7);
        scareGlow.position.set(FACE_X, y, FACE_Z - 0.01);
        scareGlow.scale.set(FACE_H * 1.5 * sc, FACE_H * 1.5 * sc, 1);
        scareGlow.material.color.copy(greenC).lerp(orangeC, s < 0.35 ? 0 : 1);
        scareGlow.material.opacity = 0.15 + 0.55 * fl;
        scareLight.color.copy(s < 0.2 || (s > 0.4 && s < 0.5) ? greenC : orangeC);
        scareLight.intensity = 0.6 * fl * (0.6 + 0.4 * Math.sin(s * 50));
      } else if (face.visible) {
        face.visible = false; scareGlow.material.opacity = 0; scareLight.intensity = 0;
      }
      lan.update(t); lan2.update(t + 1); mistT(t); batT(t); flyT(t);
    }
  });
  return api;
}

export const BUILDERS = { 1: buildPond, 2: buildJars, 3: buildBonds, 4: buildCauldron };

export function addLights(scene) {
  scene.add(new THREE.HemisphereLight(0xeee6ff, 0x2a2238, 1.6));
  const d = new THREE.DirectionalLight(0xffffff, 1.4);
  d.position.set(0.5, 1.5, 1);
  scene.add(d);
}
