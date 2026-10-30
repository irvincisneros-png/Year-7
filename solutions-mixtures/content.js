/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo;

/* ============================================================
   SECTION 1 INTERACTIVE: Particle State Animator
   Shows particles in solid/liquid/gas with animation
   ============================================================ */
function ParticleStateAnim() {
  var _useState = useState("solid"),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var canvasRef = useRef(null);
  var animRef = useRef(null);
  var particlesRef = useRef([]);
  var config = {
    solid: {
      speed: 0.4,
      spread: 0.12,
      colour: "#06b6d4",
      label: "Solid",
      count: 20
    },
    liquid: {
      speed: 1.4,
      spread: 0.38,
      colour: "#3b82f6",
      label: "Liquid",
      count: 18
    },
    gas: {
      speed: 3.8,
      spread: 0.95,
      colour: "#8b5cf6",
      label: "Gas",
      count: 12
    }
  };
  function initParticles(st, W, H) {
    var cfg = config[st];
    return Array.from({
      length: cfg.count
    }, function (_, i) {
      var col = i % 4;
      var row = Math.floor(i / 4);
      var baseX = st === "solid" ? W * 0.2 + col * (W * 0.15) : W * 0.1 + Math.random() * W * 0.8;
      var baseY = st === "solid" ? H * 0.2 + row * (H * 0.18) : H * 0.1 + Math.random() * H * 0.8;
      var angle = Math.random() * Math.PI * 2;
      return {
        x: baseX,
        y: baseY,
        bx: baseX,
        by: baseY,
        vx: Math.cos(angle) * cfg.speed,
        vy: Math.sin(angle) * cfg.speed,
        r: st === "gas" ? 7 : 9
      };
    });
  }
  useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var W = canvas.width;
    var H = canvas.height;
    particlesRef.current = initParticles(state, W, H);
    var ctx = canvas.getContext("2d");
    var cfg = config[state];
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(15,23,42,0.04)";
      ctx.fillRect(0, 0, W, H);
      particlesRef.current.forEach(function (p) {
        if (state === "solid") {
          p.x += (Math.random() - 0.5) * cfg.spread;
          p.y += (Math.random() - 0.5) * cfg.spread;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < p.r || p.x > W - p.r) p.vx *= -1;
          if (p.y < p.r || p.y > H - p.r) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = cfg.colour;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      if (state === "solid") {
        ctx.strokeStyle = cfg.colour + "44";
        ctx.lineWidth = 1;
        for (var i = 0; i < particlesRef.current.length; i++) {
          for (var j = i + 1; j < particlesRef.current.length; j++) {
            var a = particlesRef.current[i];
            var b = particlesRef.current[j];
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            if (Math.sqrt(dx * dx + dy * dy) < 45) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return function () {
      return cancelAnimationFrame(animRef.current);
    };
  }, [state]);
  var descriptions = {
    solid: "Particles are tightly packed in a regular pattern. They vibrate on the spot but cannot move around. This is why solids keep a fixed shape and volume.",
    liquid: "Particles are close together but can slide and roll past each other. They stay in contact but are not locked in place. Liquids take the shape of their container.",
    gas: "Particles are far apart and zoom around rapidly in all directions. The forces between them are very weak. Gases spread out to fill any container."
  };
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Particle motion in the three states",
    subtitle: "Click a state to see how particles behave.",
    takeaway: "The state of a substance depends on how its particles are arranged and how much energy they have: solid particles vibrate in fixed positions, liquid particles slide past each other, and gas particles move rapidly in all directions."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      justifyContent: "center",
      gap: "0.5rem",
      marginBottom: "0.75rem"
    }
  }, ["solid", "liquid", "gas"].map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      className: state === s ? "btn btn-accent" : "btn btn-ghost",
      onClick: function onClick() {
        return setState(s);
      },
      style: {
        textTransform: "capitalize"
      }
    }, s);
  })), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 380,
    height: 200,
    style: {
      display: "block",
      margin: "0 auto",
      borderRadius: "12px",
      background: "var(--surface-raised)",
      maxWidth: "100%"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      marginTop: "0.75rem",
      fontSize: "0.93rem"
    }
  }, descriptions[state]));
}

/* ============================================================
   SECTION 1 INTERACTIVE: Heating Curve Explorer
   ============================================================ */
function HeatingCurveExplorer() {
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    time = _useState4[0],
    setTime = _useState4[1];
  var points = [{
    t: 0,
    temp: -15
  }, {
    t: 2,
    temp: 0
  }, {
    t: 5,
    temp: 0
  }, {
    t: 7,
    temp: 40
  }, {
    t: 10,
    temp: 100
  }, {
    t: 14,
    temp: 100
  }, {
    t: 16,
    temp: 115
  }];
  function getTemp(t) {
    for (var i = 0; i < points.length - 1; i++) {
      var a = points[i];
      var b = points[i + 1];
      if (t >= a.t && t <= b.t) {
        var frac = (t - a.t) / (b.t - a.t);
        return a.temp + frac * (b.temp - a.temp);
      }
    }
    return points[points.length - 1].temp;
  }
  var temp = getTemp(time);
  function getPhaseLabel(tm) {
    var tp = getTemp(tm);
    if (tp < 0) return "Ice (solid)";
    if (tp === 0 && tm >= 2 && tm <= 5) return "Melting (solid + liquid)";
    if (tp > 0 && tp < 100) return "Liquid water";
    if (tp === 100 && tm >= 10 && tm <= 14) return "Boiling (liquid + steam)";
    return "Steam (gas)";
  }
  var phaseLabel = getPhaseLabel(time);
  var W = 340;
  var H = 160;
  var padL = 44;
  var padR = 10;
  var padT = 10;
  var padB = 32;
  var tMax = 16;
  var tmpMin = -15;
  var tmpMax = 120;
  function tx(t) {
    return padL + t / tMax * (W - padL - padR);
  }
  function ty(tp) {
    return padT + (1 - (tp - tmpMin) / (tmpMax - tmpMin)) * (H - padT - padB);
  }
  var pathD = points.map(function (p, i) {
    return "".concat(i === 0 ? "M" : "L").concat(tx(p.t).toFixed(1), ",").concat(ty(p.temp).toFixed(1));
  }).join(" ");
  var cx = tx(time);
  var cy = ty(temp);
  var phaseColour = phaseLabel.includes("Melting") ? "#f59e0b" : phaseLabel.includes("Boiling") ? "#ef4444" : phaseLabel.includes("Ice") ? "#06b6d4" : phaseLabel.includes("Steam") ? "#8b5cf6" : "#3b82f6";
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Heating curve explorer",
    subtitle: "Drag the slider to move through time and watch the temperature and phase change.",
    takeaway: "The flat sections on a heating curve show that during a change of state the temperature stays constant because the added energy breaks forces between particles rather than speeding them up."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    style: {
      maxWidth: W,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: padT,
    x2: padL,
    y2: H - padB,
    stroke: "var(--ink-muted)",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: H - padB,
    x2: W - padR,
    y2: H - padB,
    stroke: "var(--ink-muted)",
    strokeWidth: "1.2"
  }), [-10, 0, 25, 50, 75, 100].map(function (v) {
    return /*#__PURE__*/React.createElement("g", {
      key: v
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL - 4,
      y1: ty(v),
      x2: padL,
      y2: ty(v),
      stroke: "var(--ink-muted)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 6,
      y: ty(v) + 4,
      textAnchor: "end",
      fontSize: "9",
      fill: "var(--ink-muted)"
    }, v));
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 28,
    y: H / 2 + 4,
    fontSize: "9",
    fill: "var(--ink-muted)",
    transform: "rotate(-90,".concat(padL - 28, ",").concat(H / 2, ")")
  }, "Temp (\xB0C)"), /*#__PURE__*/React.createElement("text", {
    x: W / 2,
    y: H - 2,
    fontSize: "9",
    textAnchor: "middle",
    fill: "var(--ink-muted)"
  }, "Time (min)"), /*#__PURE__*/React.createElement("line", {
    x1: tx(0),
    y1: ty(0),
    x2: W - padR,
    y2: ty(0),
    stroke: "var(--ink-muted)",
    strokeWidth: "0.7",
    strokeDasharray: "3,3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: tx(0),
    y1: ty(100),
    x2: W - padR,
    y2: ty(100),
    stroke: "var(--ink-muted)",
    strokeWidth: "0.7",
    strokeDasharray: "3,3"
  }), /*#__PURE__*/React.createElement("path", {
    d: pathD,
    fill: "none",
    stroke: "var(--accent-deep)",
    strokeWidth: "2.5",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "7",
    fill: phaseColour,
    stroke: "white",
    strokeWidth: "2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Time",
    min: 0,
    max: 16,
    step: 0.1,
    value: time,
    onChange: setTime,
    unit: " min"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout",
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: temp.toFixed(0),
    label: "Temperature (\xB0C)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: phaseLabel,
    label: "Phase"
  })), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Why the flat lines?"
  }, "At 0 \xB0C and 100 \xB0C the temperature stays flat even though heat is still being added. The energy is used to overcome the forces between particles, not to speed them up."));
}

/* ============================================================
   SECTION 2 INTERACTIVE: Density Calculator
   ============================================================ */
function DensityCalc() {
  var _useState5 = useState(50),
    _useState6 = _slicedToArray(_useState5, 2),
    mass = _useState6[0],
    setMass = _useState6[1];
  var _useState7 = useState(50),
    _useState8 = _slicedToArray(_useState7, 2),
    vol = _useState8[0],
    setVol = _useState8[1];
  var density = vol > 0 ? (mass / vol).toFixed(3) : "0.000";
  var floats = mass / vol < 1.0;
  var neutral = mass === vol;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Density calculator",
    subtitle: "Enter mass and volume to calculate density and find out if it floats.",
    takeaway: "An object floats in water when its density is less than 1.00 g/mL and sinks when it is greater, because buoyancy depends on density, not just mass."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Mass",
    min: 1,
    max: 300,
    value: mass,
    onChange: setMass,
    unit: " g"
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Volume",
    min: 1,
    max: 300,
    value: vol,
    onChange: setVol,
    unit: " mL"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: density,
    label: "Density (g/mL)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: neutral ? "Hovers (same as water)" : floats ? "Floats" : "Sinks",
    label: "In water"
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginBottom: 0
    }
  }, "Water has a density of 1.00 g/mL. Any object less dense than that floats; anything denser sinks; an object with exactly the same density hovers."));
}

/* ============================================================
   SECTION 3 INTERACTIVE: Dissolving Particle Animation
   Shows sugar/salt cubes dissolving in a beaker
   ============================================================ */
function DissolvingSim() {
  var _useState9 = useState(20),
    _useState0 = _slicedToArray(_useState9, 2),
    temp = _useState0[0],
    setTemp = _useState0[1];
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    stirring = _useState10[0],
    setStirring = _useState10[1];
  var _useState11 = useState(0),
    _useState12 = _slicedToArray(_useState11, 2),
    elapsed = _useState12[0],
    setElapsed = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    running = _useState14[0],
    setRunning = _useState14[1];
  var timerRef = useRef(null);
  var baseRate = 1.0;
  var tempBonus = (temp - 20) / 80;
  var stirBonus = stirring ? 1.2 : 0;
  var rate = baseRate + tempBonus + stirBonus;
  var secondsToDissolve = Math.max(3, 20 / rate);
  var pct = Math.min(100, elapsed / secondsToDissolve * 100);
  var dissolved = pct >= 100;
  useEffect(function () {
    if (running && !dissolved) {
      timerRef.current = setInterval(function () {
        return setElapsed(function (e) {
          return e + 0.2;
        });
      }, 200);
    } else {
      clearInterval(timerRef.current);
    }
    return function () {
      return clearInterval(timerRef.current);
    };
  }, [running, dissolved]);
  function reset() {
    setElapsed(0);
    setRunning(false);
  }
  var cubeOpacity = Math.max(0, 1 - pct / 100);
  var particleAlpha = pct / 100;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Dissolving simulation",
    subtitle: "See how temperature and stirring affect how quickly a solute dissolves.",
    takeaway: "Increasing temperature and stirring both speed up dissolving because they increase how often water particles collide with the surface of the solute."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Water temperature",
    min: 20,
    max: 100,
    step: 5,
    value: temp,
    onChange: function onChange(v) {
      setTemp(v);
      reset();
    },
    unit: " \xB0C"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      gap: "0.75rem",
      margin: "0.5rem 0"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: stirring,
    onChange: function onChange(e) {
      setStirring(e.target.checked);
      reset();
    }
  }), /*#__PURE__*/React.createElement("span", null, "Stirring")), /*#__PURE__*/React.createElement("button", {
    className: running ? "btn btn-ghost" : "btn btn-accent",
    onClick: function onClick() {
      return setRunning(function (r) {
        return !r;
      });
    }
  }, running ? "Pause" : "Start dissolving"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: reset
  }, "Reset")), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 220 160",
    width: "100%",
    style: {
      maxWidth: 260,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "beakerClip"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "30",
    width: "160",
    height: "120",
    rx: "4"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "30",
    width: "160",
    height: "120",
    rx: "6",
    fill: "none",
    stroke: "var(--ink-muted)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: 30 + 120 * (1 - 0.7),
    width: "156",
    height: 120 * 0.7,
    rx: "4",
    fill: temp > 60 ? "#fde68a" : "#bfdbfe",
    opacity: "0.35",
    clipPath: "url(#beakerClip)"
  }), Array.from({
    length: 16
  }).map(function (_, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: 55 + i % 8 * 18,
      cy: 60 + Math.floor(i / 8) * 20,
      r: "5",
      fill: "#06b6d4",
      opacity: particleAlpha * 0.7 + 0.1,
      style: {
        transition: "opacity 0.3s"
      }
    });
  }), /*#__PURE__*/React.createElement("rect", {
    x: "85",
    y: "88",
    width: "50",
    height: "32",
    rx: "4",
    fill: "#fbbf24",
    opacity: cubeOpacity
  }), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "108",
    textAnchor: "middle",
    fontSize: "9",
    fill: "#78350f",
    opacity: cubeOpacity
  }, "solute"), temp > 60 && running && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "60",
    y1: "30",
    x2: "50",
    y2: "14",
    stroke: "#ef4444",
    strokeWidth: "1.5",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "100",
    y1: "30",
    x2: "95",
    y2: "12",
    stroke: "#ef4444",
    strokeWidth: "1.5",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "140",
    y1: "30",
    x2: "148",
    y2: "14",
    stroke: "#ef4444",
    strokeWidth: "1.5",
    opacity: "0.6"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: pct.toFixed(0) + "%",
    label: "Dissolved"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: dissolved ? "Fully dissolved" : "Dissolving...",
    label: "Status"
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      fontSize: "0.88rem",
      marginBottom: 0
    }
  }, "Hot water and stirring both speed up dissolving. The particles have more energy and collide with the solute more often."));
}

/* ============================================================
   SECTION 3 INTERACTIVE: Solubility vs Temperature Graph
   ============================================================ */
function SolubilityGraph() {
  var _useState15 = useState("kno3"),
    _useState16 = _slicedToArray(_useState15, 2),
    solute = _useState16[0],
    setSolute = _useState16[1];
  var _useState17 = useState(20),
    _useState18 = _slicedToArray(_useState17, 2),
    temp = _useState18[0],
    setTemp = _useState18[1];
  var solutes = {
    kno3: {
      label: "Potassium nitrate (KNO3)",
      colour: "#f59e0b",
      data: [[0, 13], [20, 31], [40, 64], [60, 110], [80, 169], [100, 246]]
    },
    nacl: {
      label: "Salt (NaCl)",
      colour: "#06b6d4",
      data: [[0, 35.6], [20, 36], [40, 36.6], [60, 37.3], [80, 38.4], [100, 39.2]]
    },
    sugar: {
      label: "Sugar (sucrose)",
      colour: "#8b5cf6",
      data: [[0, 179], [20, 204], [40, 238], [60, 287], [80, 362], [100, 487]]
    }
  };
  var chosen = solutes[solute];
  function interpolate(data, t) {
    for (var i = 0; i < data.length - 1; i++) {
      if (t >= data[i][0] && t <= data[i + 1][0]) {
        var frac = (t - data[i][0]) / (data[i + 1][0] - data[i][0]);
        return data[i][1] + frac * (data[i + 1][1] - data[i][1]);
      }
    }
    return data[data.length - 1][1];
  }
  var solubility = interpolate(chosen.data, temp).toFixed(1);
  var W = 340;
  var H = 180;
  var padL = 50;
  var padR = 15;
  var padT = 15;
  var padB = 32;
  function px(t) {
    return padL + t / 100 * (W - padL - padR);
  }
  function py(s) {
    return padT + (1 - s / 520) * (H - padT - padB);
  }
  function makePath(data) {
    return data.map(function (pt, i) {
      return "".concat(i === 0 ? "M" : "L").concat(px(pt[0]).toFixed(1), ",").concat(py(pt[1]).toFixed(1));
    }).join(" ");
  }
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Solubility vs temperature",
    subtitle: "Select a solute and drag the temperature slider to read off solubility.",
    takeaway: "For most solid solutes, solubility increases with temperature, but the effect is dramatic for some substances (like potassium nitrate) and barely noticeable for others (like salt)."
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: [{
      value: "kno3",
      label: "KNO3"
    }, {
      value: "nacl",
      label: "NaCl"
    }, {
      value: "sugar",
      label: "Sugar"
    }],
    value: solute,
    onChange: setSolute
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    style: {
      maxWidth: W,
      display: "block",
      margin: "0.5rem auto 0"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: padT,
    x2: padL,
    y2: H - padB,
    stroke: "var(--ink-muted)",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: H - padB,
    x2: W - padR,
    y2: H - padB,
    stroke: "var(--ink-muted)",
    strokeWidth: "1.2"
  }), [0, 100, 200, 300, 400, 500].map(function (v) {
    return /*#__PURE__*/React.createElement("g", {
      key: v
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL - 4,
      y1: py(v),
      x2: padL,
      y2: py(v),
      stroke: "var(--ink-muted)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 6,
      y: py(v) + 4,
      textAnchor: "end",
      fontSize: "9",
      fill: "var(--ink-muted)"
    }, v));
  }), [0, 20, 40, 60, 80, 100].map(function (v) {
    return /*#__PURE__*/React.createElement("g", {
      key: v
    }, /*#__PURE__*/React.createElement("line", {
      x1: px(v),
      y1: H - padB,
      x2: px(v),
      y2: H - padB + 4,
      stroke: "var(--ink-muted)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: px(v),
      y: H - padB + 14,
      textAnchor: "middle",
      fontSize: "9",
      fill: "var(--ink-muted)"
    }, v));
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 38,
    y: H / 2,
    fontSize: "9",
    fill: "var(--ink-muted)",
    transform: "rotate(-90,".concat(padL - 38, ",").concat(H / 2, ")")
  }, "g per 100 mL"), /*#__PURE__*/React.createElement("text", {
    x: W / 2,
    y: H - 2,
    textAnchor: "middle",
    fontSize: "9",
    fill: "var(--ink-muted)"
  }, "Temperature (\xB0C)"), Object.entries(solutes).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      s = _ref2[1];
    return /*#__PURE__*/React.createElement("path", {
      key: key,
      d: makePath(s.data),
      fill: "none",
      stroke: s.colour,
      strokeWidth: key === solute ? 2.5 : 1.2,
      opacity: key === solute ? 1 : 0.3,
      strokeLinejoin: "round"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: px(temp),
    y1: padT,
    x2: px(temp),
    y2: H - padB,
    stroke: chosen.colour,
    strokeWidth: "1.5",
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: px(temp),
    cy: py(parseFloat(solubility)),
    r: "7",
    fill: chosen.colour,
    stroke: "white",
    strokeWidth: "2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      marginTop: "0.25rem"
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Temperature",
    min: 0,
    max: 100,
    step: 5,
    value: temp,
    onChange: setTemp,
    unit: " \xB0C"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: solubility,
    label: "Solubility (g per 100 mL)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "".concat(temp, " \xB0C"),
    label: "Temperature"
  })));
}

/* ============================================================
   SECTION 3 INTERACTIVE: Concentration Types Matcher
   ============================================================ */
function ConcentrationMatcher() {
  var items = [{
    id: "a",
    label: "A pinch of salt in 1 L of water",
    bucket: "dilute"
  }, {
    id: "b",
    label: "100 g sugar per 100 mL water (below max)",
    bucket: "concentrated"
  }, {
    id: "c",
    label: "36 g salt in 100 mL at 20 °C (no more dissolves)",
    bucket: "saturated"
  }, {
    id: "d",
    label: "Honey left to crystallise in a jar",
    bucket: "supersaturated"
  }, {
    id: "e",
    label: "A lightly coloured sports drink",
    bucket: "dilute"
  }, {
    id: "f",
    label: "Salt water used to pickle food",
    bucket: "concentrated"
  }];
  var buckets = [{
    id: "dilute",
    label: "Dilute"
  }, {
    id: "concentrated",
    label: "Concentrated"
  }, {
    id: "saturated",
    label: "Saturated"
  }, {
    id: "supersaturated",
    label: "Supersaturated"
  }];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Classify the solutions",
    subtitle: "Drag each scenario into the correct category.",
    takeaway: "Dilute and concentrated describe how much solute is present, while saturated means no more solute can dissolve at that temperature, and supersaturated holds more than the normal maximum."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: items,
    buckets: buckets
  }));
}

/* ============================================================
   SECTION 4 INTERACTIVE: Separation Technique Picker
   User picks the right technique for a given mixture
   ============================================================ */
function SeparationPicker() {
  var scenarios = [{
    id: 0,
    mix: "Salt dissolved in water",
    correct: "evaporation",
    hint: "Salt is soluble. You need to remove the water to get the salt back."
  }, {
    id: 1,
    mix: "Sand and water",
    correct: "filtration",
    hint: "Sand is insoluble and won't pass through filter paper."
  }, {
    id: 2,
    mix: "Iron filings and sand",
    correct: "magnetism",
    hint: "Iron is magnetic; sand is not."
  }, {
    id: 3,
    mix: "Ethanol and water (different boiling points)",
    correct: "distillation",
    hint: "Ethanol boils at 78 °C, water at 100 °C. Distillation uses this difference."
  }, {
    id: 4,
    mix: "Coloured dyes in black ink",
    correct: "chromatography",
    hint: "Different dyes travel different distances up the paper."
  }, {
    id: 5,
    mix: "Gravel mixed with fine sand",
    correct: "sieving",
    hint: "The particles are different sizes. A sieve lets the fine sand through but holds the gravel."
  }];
  var techniques = ["evaporation", "filtration", "magnetism", "distillation", "chromatography", "sieving"];
  var _useState19 = useState(0),
    _useState20 = _slicedToArray(_useState19, 2),
    idx = _useState20[0],
    setIdx = _useState20[1];
  var _useState21 = useState(null),
    _useState22 = _slicedToArray(_useState21, 2),
    chosen = _useState22[0],
    setChosen = _useState22[1];
  var _useState23 = useState(0),
    _useState24 = _slicedToArray(_useState23, 2),
    score = _useState24[0],
    setScore = _useState24[1];
  var _useState25 = useState(false),
    _useState26 = _slicedToArray(_useState25, 2),
    done = _useState26[0],
    setDone = _useState26[1];
  var scenario = scenarios[idx];
  var isCorrect = chosen === scenario.correct;
  function pick(tech) {
    if (chosen !== null) return;
    setChosen(tech);
    if (tech === scenario.correct) setScore(function (s) {
      return s + 1;
    });
  }
  function next() {
    if (idx + 1 >= scenarios.length) {
      setDone(true);
    } else {
      setIdx(function (i) {
        return i + 1;
      });
      setChosen(null);
    }
  }
  function restart() {
    setIdx(0);
    setChosen(null);
    setScore(0);
    setDone(false);
  }
  if (done) {
    return /*#__PURE__*/React.createElement(Interactive, {
      title: "Separation technique picker",
      subtitle: "How well did you go?",
      takeaway: "The right separation technique for any mixture depends on the physical difference between the components, such as particle size, solubility, boiling point, or magnetic properties."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "2.5rem",
        fontWeight: 800,
        color: "var(--accent-deep)"
      }
    }, score, " / ", scenarios.length), /*#__PURE__*/React.createElement("p", null, score === scenarios.length ? "Perfect! You matched every technique!" : "Good effort! Review the ones you missed."), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-accent",
      onClick: restart
    }, "Try again")));
  }
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Separation technique picker",
    subtitle: "Question ".concat(idx + 1, " of ").concat(scenarios.length, ". Pick the best technique."),
    takeaway: "The right separation technique for any mixture depends on the physical difference between the components, such as particle size, solubility, boiling point, or magnetic properties."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      borderRadius: "10px",
      padding: "0.85rem 1rem",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 600
    }
  }, "Mixture: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-deep)"
    }
  }, scenario.mix))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "0.5rem",
      marginBottom: "0.75rem"
    }
  }, techniques.map(function (t) {
    var bg = "var(--surface-raised)";
    if (chosen !== null) {
      if (t === scenario.correct) bg = "#bbf7d0";else if (t === chosen && !isCorrect) bg = "#fecaca";
    }
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: function onClick() {
        return pick(t);
      },
      style: {
        padding: "0.5rem 0.25rem",
        borderRadius: "8px",
        border: "1.5px solid var(--border)",
        background: bg,
        cursor: chosen ? "default" : "pointer",
        fontWeight: 600,
        fontSize: "0.85rem",
        textTransform: "capitalize",
        transition: "background 0.3s"
      }
    }, t);
  })), chosen !== null && /*#__PURE__*/React.createElement(Callout, {
    kind: isCorrect ? "success" : "warn",
    title: isCorrect ? "Correct!" : "Not quite"
  }, scenario.hint), chosen !== null && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: next,
    style: {
      marginTop: "0.5rem"
    }
  }, idx + 1 >= scenarios.length ? "See results" : "Next question"), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      fontSize: "0.82rem",
      marginTop: "0.5rem",
      marginBottom: 0
    }
  }, "Score so far: ", score, " / ", idx + (chosen !== null ? 1 : 0)));
}

/* ============================================================
   SECTION 4 INTERACTIVE: Chromatography Simulation
   ============================================================ */
function ChromatographySim() {
  var _useState27 = useState(0),
    _useState28 = _slicedToArray(_useState27, 2),
    solvent = _useState28[0],
    setSolvent = _useState28[1];
  var _useState29 = useState(false),
    _useState30 = _slicedToArray(_useState29, 2),
    running = _useState30[0],
    setRunning = _useState30[1];
  var animRef = useRef(null);
  var dyes = [{
    label: "Yellow",
    colour: "#fbbf24",
    rf: 0.82
  }, {
    label: "Blue",
    colour: "#3b82f6",
    rf: 0.54
  }, {
    label: "Red",
    colour: "#ef4444",
    rf: 0.38
  }, {
    label: "Green",
    colour: "#22c55e",
    rf: 0.67
  }];
  var paperH = 200;
  var baselineY = 180;
  var frontY = 10;
  useEffect(function () {
    if (!running) {
      cancelAnimationFrame(animRef.current);
      return;
    }
    if (solvent >= 1) {
      setRunning(false);
      return;
    }
    animRef.current = requestAnimationFrame(function () {
      return setSolvent(function (s) {
        return Math.min(1, s + 0.005);
      });
    });
    return function () {
      return cancelAnimationFrame(animRef.current);
    };
  }, [running, solvent]);
  var solventPixel = baselineY - solvent * (baselineY - frontY);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Paper chromatography simulation",
    subtitle: "Watch the dyes separate as the solvent travels up the paper.",
    takeaway: "In chromatography, different substances travel different distances up the paper because they have different solubilities in the solvent, and each substance's Rf value can be used to identify it."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      marginBottom: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: running ? "btn btn-ghost" : "btn btn-accent",
    onClick: function onClick() {
      return setRunning(function (r) {
        return !r;
      });
    }
  }, running ? "Pause" : "Run chromatography"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: function onClick() {
      setSolvent(0);
      setRunning(false);
    }
  }, "Reset")), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 260 220",
    width: "100%",
    style: {
      maxWidth: 280,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "10",
    width: "140",
    height: "200",
    rx: "4",
    fill: "#fef9c3",
    stroke: "#d97706",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: solventPixel,
    width: "140",
    height: 220 - solventPixel,
    rx: "0",
    fill: "#bfdbfe",
    opacity: "0.45"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "60",
    y1: baselineY,
    x2: "200",
    y2: baselineY,
    stroke: "#92400e",
    strokeWidth: "1.5",
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "46",
    y: baselineY + 4,
    textAnchor: "end",
    fontSize: "9",
    fill: "#92400e"
  }, "start"), solvent > 0.05 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "60",
    y1: solventPixel,
    x2: "200",
    y2: solventPixel,
    stroke: "#3b82f6",
    strokeWidth: "1.2",
    strokeDasharray: "3,2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "46",
    y: solventPixel + 4,
    textAnchor: "end",
    fontSize: "8",
    fill: "#3b82f6"
  }, "front")), dyes.map(function (dye, i) {
    var xBase = 82 + i * 30;
    var dyeY = baselineY - solvent * dye.rf * (baselineY - frontY);
    return /*#__PURE__*/React.createElement("g", {
      key: dye.label
    }, /*#__PURE__*/React.createElement("circle", {
      cx: xBase,
      cy: baselineY,
      r: "7",
      fill: dye.colour,
      opacity: "0.9"
    }), solvent > 0.05 && /*#__PURE__*/React.createElement("ellipse", {
      cx: xBase,
      cy: dyeY,
      rx: "7",
      ry: "5",
      fill: dye.colour,
      opacity: "0.85"
    }), /*#__PURE__*/React.createElement("text", {
      x: xBase,
      y: baselineY + 14,
      textAnchor: "middle",
      fontSize: "8",
      fill: dye.colour
    }, dye.label), solvent >= 0.95 && /*#__PURE__*/React.createElement("text", {
      x: xBase,
      y: dyeY - 8,
      textAnchor: "middle",
      fontSize: "7.5",
      fill: "var(--ink)"
    }, "Rf=", dye.rf));
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      textAlign: "center",
      fontSize: "0.88rem",
      marginBottom: 0
    }
  }, "Each dye has its own characteristic Rf value (how far it travels compared to the solvent front). This helps identify the dye."));
}

/* ============================================================
   SECTION 5 INTERACTIVE: Water Pollution Treatment Builder
   User sequences treatment steps for a polluted water sample
   ============================================================ */
function PollutionTreatment() {
  var allSteps = [{
    id: "screen",
    label: "Screening",
    removes: "Large debris",
    icon: "1"
  }, {
    id: "settle",
    label: "Sedimentation",
    removes: "Heavy particles",
    icon: "2"
  }, {
    id: "filter",
    label: "Filtration",
    removes: "Fine solids",
    icon: "3"
  }, {
    id: "carbon",
    label: "Activated carbon",
    removes: "Dissolved organics + odour",
    icon: "4"
  }, {
    id: "disinfect",
    label: "Disinfection (UV/Cl)",
    removes: "Bacteria and viruses",
    icon: "5"
  }];
  var _useState31 = useState([]),
    _useState32 = _slicedToArray(_useState31, 2),
    placed = _useState32[0],
    setPlaced = _useState32[1];
  var _useState33 = useState(false),
    _useState34 = _slicedToArray(_useState33, 2),
    checked = _useState34[0],
    setChecked = _useState34[1];
  var correct = ["screen", "settle", "filter", "carbon", "disinfect"];
  function toggle(id) {
    if (placed.includes(id)) {
      setPlaced(placed.filter(function (x) {
        return x !== id;
      }));
    } else {
      setPlaced([].concat(_toConsumableArray(placed), [id]));
    }
    setChecked(false);
  }
  function check() {
    setChecked(true);
  }
  function reset() {
    setPlaced([]);
    setChecked(false);
  }
  var orderedPlaced = placed;
  var allCorrect = placed.length === correct.length && placed.every(function (id, i) {
    return id === correct[i];
  });
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Build a water treatment plant",
    subtitle: "Select the steps in the right order to clean polluted water.",
    takeaway: "Real water treatment uses a sequence of steps because each technique targets a different type of pollutant: physical filtration removes solids, activated carbon removes dissolved organics, and disinfection kills microbes."
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "0.9rem"
    }
  }, "Click the steps in the correct treatment order, then press Check."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginBottom: "0.75rem"
    }
  }, allSteps.map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: function onClick() {
        return toggle(s.id);
      },
      style: {
        padding: "0.45rem 0.8rem",
        borderRadius: "8px",
        border: "1.5px solid var(--border)",
        background: placed.includes(s.id) ? "var(--accent-soft)" : "var(--surface-raised)",
        fontWeight: placed.includes(s.id) ? 700 : 400,
        cursor: "pointer",
        fontSize: "0.88rem"
      }
    }, placed.includes(s.id) ? "".concat(orderedPlaced.indexOf(s.id) + 1, ". ") : "", s.label);
  })), placed.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
      flexWrap: "wrap",
      marginBottom: "0.5rem"
    }
  }, orderedPlaced.map(function (id, i) {
    var step = allSteps.find(function (s) {
      return s.id === id;
    });
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: id
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        background: "var(--accent-deep)",
        color: "white",
        borderRadius: "6px",
        padding: "0.2rem 0.6rem",
        fontSize: "0.85rem",
        fontWeight: 700
      }
    }, step.label), i < orderedPlaced.length - 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ink-muted)"
      }
    }, "\u2192"));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: check,
    disabled: placed.length === 0
  }, "Check"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: reset
  }, "Reset")), checked && /*#__PURE__*/React.createElement(Callout, {
    kind: allCorrect ? "success" : "warn",
    title: allCorrect ? "Correct order!" : "Not quite right"
  }, allCorrect ? "Great work! Screening, sedimentation and filtration remove physical particles. Activated carbon removes dissolved organics. Disinfection kills microbes." : "The correct order is: Screening, then Sedimentation, then Filtration, then Activated carbon, then Disinfection. Each step targets a different type of pollutant."));
}

/* ============================================================
   SECTION 1: Properties of Matter
   ============================================================ */
function Section1(_ref3) {
  var progress = _ref3.progress,
    setProgress = _ref3.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "4.1 Properties of Matter"), /*#__PURE__*/React.createElement("h1", null, "States of matter and heating curves"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Everything around you is made of tiny particles. Whether something is solid, liquid or gas depends on how those particles are arranged and how much energy they have.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/states.png",
    caption: "The same substance as a solid, a liquid and a gas \u2014 particles packed, looser, then spread out."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.1.1",
    title: "The three states of matter",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "All matter is made of tiny particles. Depending on how those particles are arranged and how much energy they have, a substance can exist as a ", /*#__PURE__*/React.createElement(Term, {
    def: "A state of matter where particles are packed closely in a fixed arrangement and vibrate on the spot."
  }, "solid"), ", a ", /*#__PURE__*/React.createElement(Term, {
    def: "A state of matter where particles are close together but can slide past each other, taking the shape of any container."
  }, "liquid"), " or a ", /*#__PURE__*/React.createElement(Term, {
    def: "A state of matter where particles are far apart, moving rapidly in all directions, and spreading to fill any container."
  }, "gas"), ". These are the three states of matter."), /*#__PURE__*/React.createElement("p", null, "Water is special because it naturally exists in all three states at temperatures common on Earth. Ice is found in glaciers and the polar ice caps. Liquid water covers more than 70 percent of Earth's surface in oceans, rivers and lakes. Water vapour is a gas in the atmosphere that forms clouds and drives the water cycle."), /*#__PURE__*/React.createElement(ParticleStateAnim, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "One substance, three states"
  }, "The water molecules in ice, liquid water and water vapour are identical. Only their arrangement and movement change. This shows that physical properties depend on particle behaviour, not particle identity."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Water in all three states: ice (solid) at the poles, liquid water in oceans, and water vapour (gas) in the atmosphere."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 480 90",
    width: "100%",
    style: {
      maxWidth: 480
    }
  }, [["Solid (Ice)", "#bfdbfe", "#1d4ed8", "Particles closely packed\nregular pattern, vibrate"], ["Liquid (Water)", "#93c5fd", "#1e40af", "Particles close but free\nto slide past each other"], ["Gas (Water Vapour)", "#dbeafe", "#3b82f6", "Particles far apart\nmoving rapidly in all directions"]].map(function (_ref4, i) {
    var _ref5 = _slicedToArray(_ref4, 4),
      label = _ref5[0],
      fill = _ref5[1],
      stroke = _ref5[2],
      desc = _ref5[3];
    return /*#__PURE__*/React.createElement("g", {
      key: label,
      transform: "translate(".concat(i * 162 + 4, ", 4)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "152",
      height: "82",
      rx: "10",
      fill: fill,
      stroke: stroke,
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "76",
      y: "20",
      textAnchor: "middle",
      fontSize: "11",
      fontWeight: "700",
      fill: stroke
    }, label), desc.split("\n").map(function (line, j) {
      return /*#__PURE__*/React.createElement("text", {
        key: j,
        x: "76",
        y: 35 + j * 14,
        textAnchor: "middle",
        fontSize: "9.5",
        fill: "#1e3a8a"
      }, line);
    }), label.startsWith("Solid") && [20, 40, 60, 80, 100, 120, 30, 50, 70, 90, 110].map(function (x, k) {
      return /*#__PURE__*/React.createElement("circle", {
        key: k,
        cx: x % 132 + 10,
        cy: Math.floor(k / 6) === 0 ? 60 : 72,
        r: "4",
        fill: stroke,
        opacity: "0.7"
      });
    }), label.startsWith("Liquid") && Array.from({
      length: 14
    }).map(function (_, k) {
      return /*#__PURE__*/React.createElement("circle", {
        key: k,
        cx: 12 + k % 7 * 20 + (Math.floor(k / 7) === 1 ? 10 : 0),
        cy: 58 + Math.floor(k / 7) * 14,
        r: "4.5",
        fill: stroke,
        opacity: "0.6"
      });
    }), label.startsWith("Gas") && Array.from({
      length: 7
    }).map(function (_, k) {
      return /*#__PURE__*/React.createElement("circle", {
        key: k,
        cx: 18 + k % 4 * 38,
        cy: 54 + Math.floor(k / 4) * 22,
        r: "4",
        fill: stroke,
        opacity: "0.5"
      });
    }));
  }))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "What are the three states of matter?",
    options: ["Solid, liquid, plasma", "Solid, liquid, gas", "Element, compound, mixture", "Hot, cold, warm"],
    correct: 1,
    explain: "The three states of matter are solid, liquid and gas. Plasma is sometimes called a fourth state but is not covered at Year 7 level."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 2,
    question: "Water exists in all three states on Earth. Give one location where you would find each state.",
    model: "Solid: glaciers or polar ice caps. Liquid: oceans, rivers or lakes. Gas: water vapour in the atmosphere or inside clouds."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.1.2",
    title: "Heating curves and changes of state",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "When you add heat to a substance, its temperature usually rises. But at certain temperatures something different happens: the temperature stops rising even though heat is still being added. These are called ", /*#__PURE__*/React.createElement(Term, {
    def: "Points where a substance changes from one state to another, such as melting or boiling. The temperature stays constant during the change."
  }, "changes of state"), "."), /*#__PURE__*/React.createElement("p", null, "For water, the ", /*#__PURE__*/React.createElement(Term, {
    def: "The temperature at which a solid turns into a liquid (0 \xB0C for water at normal atmospheric pressure)."
  }, "melting point"), " is 0 degrees Celsius and the ", /*#__PURE__*/React.createElement(Term, {
    def: "The temperature at which a liquid turns into a gas throughout its volume (100 \xB0C for water at normal atmospheric pressure)."
  }, "boiling point"), " is 100 degrees Celsius. During a change of state, the energy being added breaks the forces holding particles together rather than speeding the particles up. This is why the temperature stays flat."), /*#__PURE__*/React.createElement(HeatingCurveExplorer, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Reading heating curves"
  }, "A flat section (plateau) on a heating curve always means a change of state is happening. Two flat sections on a water curve: one at 0 \xB0C (melting) and one at 100 \xB0C (boiling)."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "Why does the temperature stay constant during melting?",
    options: ["The Bunsen burner turns off automatically", "Energy is used to break forces between particles, not to speed them up", "The thermometer is broken", "The water is too cold to melt"],
    correct: 1,
    explain: "During a change of state, the added energy overcomes the attractive forces holding particles in the solid lattice. This uses all the energy, so the temperature stays flat."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.1.3",
    title: "Particle theory and changes of state",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "We use ", /*#__PURE__*/React.createElement(Term, {
    def: "A scientific model that explains the behaviour of matter by describing the movement and arrangement of tiny particles."
  }, "particle theory"), " to explain what happens during each change of state. In a solid, particles vibrate in fixed positions. When enough energy is added, they break free of their fixed positions and the solid ", /*#__PURE__*/React.createElement(Term, {
    def: "Changes from solid to liquid by absorbing energy. Particles gain enough energy to break out of their fixed arrangement."
  }, "melts"), " into a liquid. Liquid particles can move past each other. When they gain enough energy to escape all attraction, they become a gas through ", /*#__PURE__*/React.createElement(Term, {
    def: "Change from liquid to gas. Happens at the surface at any temperature (evaporation) or throughout the liquid at boiling point."
  }, "evaporation or boiling"), "."), /*#__PURE__*/React.createElement("p", null, "The reverse changes also have names: liquid to solid is ", /*#__PURE__*/React.createElement(Term, {
    def: "Change from liquid to solid by releasing energy. Also called solidification."
  }, "freezing"), ", gas to liquid is ", /*#__PURE__*/React.createElement(Term, {
    def: "Change from gas to liquid by releasing energy. Water vapour in clouds condenses into rain drops."
  }, "condensation"), ", and the rare direct change from solid to gas (skipping liquid) is ", /*#__PURE__*/React.createElement(Term, {
    def: "Direct change from solid to gas without passing through the liquid state. Dry ice (solid carbon dioxide) does this at room temperature."
  }, "sublimation"), "."), /*#__PURE__*/React.createElement(Figure, {
    caption: "The names of the main changes of state and the direction of energy flow."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 440 140",
    width: "100%",
    style: {
      maxWidth: 440
    }
  }, [["SOLID", 30, 55], ["LIQUID", 170, 55], ["GAS", 320, 55]].map(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 3),
      label = _ref7[0],
      x = _ref7[1],
      y = _ref7[2];
    return /*#__PURE__*/React.createElement("g", {
      key: label
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: "90",
      height: "40",
      rx: "10",
      fill: "var(--accent-soft)",
      stroke: "var(--accent-deep)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 45,
      y: y + 25,
      textAnchor: "middle",
      fontWeight: "700",
      fontSize: "13",
      fill: "var(--ink)"
    }, label));
  }), [[120, 68, 165, 68, "Melting (+E)", 6, true], [165, 82, 120, 82, "Freezing (-E)", -6, false], [260, 68, 315, 68, "Boiling (+E)", 6, true], [315, 82, 260, 82, "Condensation (-E)", -6, false], [120, 42, 315, 42, "Sublimation (+E)", 6, true]].map(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 7),
      x1 = _ref9[0],
      y1 = _ref9[1],
      x2 = _ref9[2],
      y2 = _ref9[3],
      label = _ref9[4],
      dy = _ref9[5],
      forward = _ref9[6];
    return /*#__PURE__*/React.createElement("g", {
      key: label
    }, /*#__PURE__*/React.createElement("line", {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: forward ? "#06b6d4" : "#f59e0b",
      strokeWidth: "1.5",
      markerEnd: "url(#arr".concat(forward ? "f" : "r", ")")
    }), /*#__PURE__*/React.createElement("text", {
      x: (x1 + x2) / 2,
      y: y1 + dy,
      textAnchor: "middle",
      fontSize: "8.5",
      fill: forward ? "#0e7490" : "#92400e"
    }, label));
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "arrf",
    markerWidth: "6",
    markerHeight: "6",
    refX: "5",
    refY: "3",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L6,3 L0,6 Z",
    fill: "#06b6d4"
  })), /*#__PURE__*/React.createElement("marker", {
    id: "arrr",
    markerWidth: "6",
    markerHeight: "6",
    refX: "5",
    refY: "3",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L6,3 L0,6 Z",
    fill: "#f59e0b"
  }))))), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Dry ice"
  }, "Dry ice is solid carbon dioxide. It sublimates directly from solid to gas at -78 \xB0C, skipping the liquid stage completely. That's why it produces that cool smoky fog effect!")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.1.4",
    title: "Properties of solids, liquids and gases",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The differences we see between solids, liquids and gases come from the strength of ", /*#__PURE__*/React.createElement(Term, {
    def: "The attractive pulling forces between neighbouring particles. Strong in solids, moderate in liquids, very weak in gases."
  }, "inter-particle forces"), ". In solids, these forces are very strong, so particles stay in fixed positions. That's why solids have a definite shape and volume."), /*#__PURE__*/React.createElement("p", null, "In liquids, forces are weaker. Particles can flow past each other, so liquids take the shape of their container but keep a definite volume. In gases, forces are almost negligible. Particles zoom around in all directions, spreading out to fill any container. This also means gases can be ", /*#__PURE__*/React.createElement(Term, {
    def: "Squeezed into a smaller volume. Gases can be compressed because there is lots of empty space between particles. Solids and liquids cannot."
  }, "compressed"), ", unlike solids and liquids."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Comparing the properties of solids, liquids and gases."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 480 100",
    width: "100%",
    style: {
      maxWidth: 480
    }
  }, [["Property", "Solid", "Liquid", "Gas"], ["Shape", "Fixed", "Container's shape", "Fills container"], ["Volume", "Fixed", "Fixed", "No fixed volume"], ["Compressible?", "No", "No", "Yes"], ["Flows?", "No", "Yes", "Yes"]].map(function (row, ri) {
    return row.map(function (cell, ci) {
      return /*#__PURE__*/React.createElement("text", {
        key: "".concat(ri).concat(ci),
        x: ci === 0 ? 8 : 130 + (ci - 1) * 115,
        y: 14 + ri * 17,
        fontSize: ri === 0 ? "10" : "9.5",
        fontWeight: ri === 0 || ci === 0 ? "700" : "400",
        fill: ri === 0 ? "var(--accent-deep)" : "var(--ink)"
      }, cell);
    });
  }))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 4,
    question: "Why can gases be compressed but solids cannot?",
    options: ["Gas particles are lighter than solid particles", "Gas particles are far apart with lots of empty space between them", "Solid particles move too fast to compress", "Gas particles have no attractive forces at all"],
    correct: 1,
    explain: "Gas particles have huge empty spaces between them, so they can be pushed closer together. Solid particles are already tightly packed, so there is almost no space left to compress."
  }))));
}

/* ============================================================
   SECTION 2: Properties of Water
   ============================================================ */
function Section2(_ref0) {
  var progress = _ref0.progress,
    setProgress = _ref0.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "4.2 Properties of Water"), /*#__PURE__*/React.createElement("h1", null, "Density, buoyancy and surface tension"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Water has some surprising properties that set it apart from most other substances. Understanding these helps explain everything from why ships float to why ice forms on top of ponds.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/water.png",
    caption: "Surface tension lets a water strider rest on top of the water."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.2.1",
    title: "Density, buoyancy and surface tension",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The amount of mass packed into a given volume. Formula: density = mass divided by volume (rho = m/v). Units: g/mL or kg per cubic metre."
  }, "Density"), " tells you how much mass is packed into a volume of space. Water has a density of about 1.00 g/mL. Interestingly, ice is less dense than liquid water (about 0.917 g/mL) because water molecules form a more open, hexagonal crystal pattern when they freeze. This is why ice floats on water, which is crucial for life in frozen lakes: the ice acts like a lid, keeping the liquid water underneath from freezing solid."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The upward force exerted by a fluid on an object that is partially or fully submerged. An object floats when buoyant force equals its weight."
  }, "Buoyancy"), " is the upward push a fluid gives an object. An object floats when it is less dense than the fluid. If it is denser, it sinks. ", /*#__PURE__*/React.createElement(Term, {
    def: "A property of liquid surfaces where surface molecules experience a net inward pull, creating a thin 'skin' that resists being broken."
  }, "Surface tension"), " is a special property of water where the surface behaves like a thin elastic skin. This lets insects like water striders walk on water and helps water form round droplets."), /*#__PURE__*/React.createElement(DensityCalc, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Density vs weight"
  }, "A huge ship can float even though it is made of steel! This is because the ship's hull traps a large volume of air, making the average density of the whole ship less than water. Buoyancy depends on density, not weight alone."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "Why does ice float on liquid water?",
    options: ["Ice has a higher density than liquid water", "Ice is colder so it rises to the top", "Ice is less dense than liquid water", "Ice is lighter because it contains no minerals"],
    correct: 2,
    explain: "Ice (0.917 g/mL) is less dense than liquid water (1.00 g/mL) because water molecules form an open hexagonal lattice when frozen, taking up more space for the same mass."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.2.3",
    title: "Calculating density using rho = m/v",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "You can calculate the density of any substance using the formula: ", /*#__PURE__*/React.createElement("strong", null, "density = mass / volume"), " (written as rho = m/v). In the lab, mass is measured in grams using an electronic balance, and volume is measured in millilitres (mL) or cubic centimetres (cm cubed). These give density in g/mL or g per cm cubed."), /*#__PURE__*/React.createElement("p", null, "For regular-shaped objects (like a cube), you can calculate volume using geometry: V = length x width x height. For irregular-shaped objects (like a pebble), you use the ", /*#__PURE__*/React.createElement(Term, {
    def: "A method to measure the volume of an irregular object by lowering it into a measuring cylinder of water and measuring how much the water level rises."
  }, "water displacement method"), ": lower the object into a measuring cylinder of water and read how much the water level rises. That rise equals the object's volume."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Using water displacement to measure the volume of an irregular object."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 260 130",
    width: "100%",
    style: {
      maxWidth: 260
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "10",
    width: "80",
    height: "110",
    rx: "8",
    fill: "none",
    stroke: "var(--ink-muted)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "60",
    width: "76",
    height: "58",
    rx: "4",
    fill: "#bfdbfe",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "60",
    width: "76",
    height: "58",
    rx: "4",
    fill: "none",
    stroke: "#3b82f6",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "55",
    textAnchor: "middle",
    fontSize: "9",
    fill: "var(--ink-muted)"
  }, "50 mL"), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "60",
    x2: "100",
    y2: "60",
    stroke: "var(--ink-muted)",
    strokeWidth: "0.8",
    strokeDasharray: "3,2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "150",
    y: "10",
    width: "80",
    height: "110",
    rx: "8",
    fill: "none",
    stroke: "var(--ink-muted)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "152",
    y: "45",
    width: "76",
    height: "73",
    rx: "4",
    fill: "#bfdbfe",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "152",
    y: "45",
    width: "76",
    height: "73",
    rx: "4",
    fill: "none",
    stroke: "#3b82f6",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "190",
    cy: "80",
    rx: "16",
    ry: "12",
    fill: "#94a3b8",
    opacity: "0.8"
  }), /*#__PURE__*/React.createElement("text", {
    x: "190",
    y: "55",
    textAnchor: "middle",
    fontSize: "9",
    fill: "#3b82f6"
  }, "65 mL"), /*#__PURE__*/React.createElement("line", {
    x1: "150",
    y1: "45",
    x2: "230",
    y2: "45",
    stroke: "#3b82f6",
    strokeWidth: "0.8",
    strokeDasharray: "3,2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "130",
    y: "90",
    textAnchor: "middle",
    fontSize: "22",
    fill: "var(--ink-muted)"
  }, "+"), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "128",
    textAnchor: "middle",
    fontSize: "9",
    fill: "var(--ink-muted)"
  }, "Before: 50 mL"), /*#__PURE__*/React.createElement("text", {
    x: "190",
    y: "128",
    textAnchor: "middle",
    fontSize: "9",
    fill: "var(--ink-muted)"
  }, "After: 65 mL = Vol 15 mL"))), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Worked example"
  }, "A rock has a mass of 54 g. When placed in a measuring cylinder, the water level rises from 50 mL to 70 mL. Volume = 70 - 50 = 20 mL. Density = 54 / 20 = 2.70 g/mL. That matches aluminium!"), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 6,
    question: "A student places a small object into a measuring cylinder. The water level rises from 30 mL to 42 mL. The object has a mass of 38 g. Calculate the density of the object.",
    model: "Volume = 42 - 30 = 12 mL. Density = mass / volume = 38 / 12 = 3.17 g/mL. This is denser than water so the object would sink."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.2.2",
    title: "Measuring and comparing density in the laboratory",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "When you measure density in the lab, you compare your result with published SI data. The published density of pure water at room temperature is 1.00 g/mL. To get an accurate reading from a measuring cylinder, always read the bottom of the curved water surface (called the ", /*#__PURE__*/React.createElement(Term, {
    def: "The curved surface of a liquid in a narrow container. Always read the bottom of the meniscus at eye level to avoid parallax error."
  }, "meniscus"), ") with your eye level with the markings."), /*#__PURE__*/React.createElement("p", null, "A small difference between your measured and published values is expected. This is called ", /*#__PURE__*/React.createElement(Term, {
    def: "The natural uncertainty in a measurement due to the limits of the equipment or the measuring technique."
  }, "measurement uncertainty"), " and can come from impurities in your sample, temperature differences, or reading the scale at an angle (parallax error)."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Published densities of common substances compared to water."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 130",
    width: "100%",
    style: {
      maxWidth: 400
    }
  }, [["Water", 1.00, "#06b6d4"], ["Ice", 0.917, "#93c5fd"], ["Veg. oil", 0.92, "#fbbf24"], ["Ethanol", 0.79, "#a78bfa"], ["Aluminium", 2.70, "#94a3b8"]].map(function (_ref1, i) {
    var _ref10 = _slicedToArray(_ref1, 3),
      name = _ref10[0],
      val = _ref10[1],
      col = _ref10[2];
    var barW = Math.min(val / 3 * 240, 240);
    return /*#__PURE__*/React.createElement("g", {
      key: name,
      transform: "translate(0,".concat(i * 24, ")")
    }, /*#__PURE__*/React.createElement("text", {
      x: "2",
      y: "16",
      fontSize: "10",
      fill: "var(--ink)"
    }, name), /*#__PURE__*/React.createElement("rect", {
      x: "80",
      y: "4",
      width: barW,
      height: "16",
      rx: "4",
      fill: col,
      opacity: "0.8"
    }), /*#__PURE__*/React.createElement("text", {
      x: 84 + barW,
      y: "16",
      fontSize: "9.5",
      fill: "var(--ink-muted)"
    }, val, " g/mL"));
  }), /*#__PURE__*/React.createElement("line", {
    x1: 80 + 240 / 3,
    y1: 0,
    x2: 80 + 240 / 3,
    y2: 125,
    stroke: "#ef4444",
    strokeWidth: "1.2",
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: 80 + 240 / 3 + 2,
    y: 10,
    fontSize: "9",
    fill: "#ef4444"
  }, "Water = 1.00"))), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Float or sink?"
  }, "If density is less than 1.00 g/mL, the object floats in water. If density is greater than 1.00 g/mL, it sinks. You can see from the chart that oil and ice both float, while aluminium sinks.")));
}

/* ============================================================
   SECTION 3: Solutions
   ============================================================ */
function Section3(_ref11) {
  var progress = _ref11.progress,
    setProgress = _ref11.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "4.3 Solutions"), /*#__PURE__*/React.createElement("h1", null, "Dissolving, solubility and concentration"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "When you stir sugar into tea, it disappears into the liquid. But where does it go? In this section you will find out what really happens when a substance dissolves.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.3.1",
    title: "Solutions, solutes and solvents",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "When you stir salt into water, the salt crystals gradually disappear and the mixture becomes clear and uniform. The salt has dissolved. The resulting mixture is called a ", /*#__PURE__*/React.createElement(Term, {
    def: "A homogeneous mixture formed when a solute dissolves evenly throughout a solvent."
  }, "solution"), ". The substance that dissolves (salt) is the ", /*#__PURE__*/React.createElement(Term, {
    def: "The substance that dissolves in a solvent to form a solution."
  }, "solute"), ". The substance it dissolves in (water) is the ", /*#__PURE__*/React.createElement(Term, {
    def: "The substance in which the solute dissolves. Water is the most common solvent."
  }, "solvent"), "."), /*#__PURE__*/React.createElement("p", null, "Not everything dissolves in water. A substance that dissolves is ", /*#__PURE__*/React.createElement(Term, {
    def: "Able to dissolve in a given solvent."
  }, "soluble"), "; one that does not dissolve is ", /*#__PURE__*/React.createElement(Term, {
    def: "Not able to dissolve in a given solvent."
  }, "insoluble"), ". Sand, chalk and most oils are insoluble in water. Water is often called the \"universal solvent\" because it dissolves more substances than any other common liquid, though no solvent dissolves everything."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Common substances classified as soluble or insoluble in water."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 420 110",
    width: "100%",
    style: {
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "200",
    height: "102",
    rx: "10",
    fill: "#dcfce7",
    stroke: "#16a34a",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "214",
    y: "4",
    width: "200",
    height: "102",
    rx: "10",
    fill: "#fee2e2",
    stroke: "#dc2626",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "104",
    y: "22",
    textAnchor: "middle",
    fontWeight: "700",
    fontSize: "12",
    fill: "#15803d"
  }, "Soluble in water"), /*#__PURE__*/React.createElement("text", {
    x: "314",
    y: "22",
    textAnchor: "middle",
    fontWeight: "700",
    fontSize: "12",
    fill: "#b91c1c"
  }, "Insoluble in water"), ["Salt (NaCl)", "Sugar (sucrose)", "Copper sulfate"].map(function (s, i) {
    return /*#__PURE__*/React.createElement("text", {
      key: s,
      x: "104",
      y: 38 + i * 18,
      textAnchor: "middle",
      fontSize: "10.5",
      fill: "#166534"
    }, s);
  }), ["Sand", "Chalk", "Vegetable oil"].map(function (s, i) {
    return /*#__PURE__*/React.createElement("text", {
      key: s,
      x: "314",
      y: 38 + i * 18,
      textAnchor: "middle",
      fontSize: "10.5",
      fill: "#991b1b"
    }, s);
  }))), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Solutions are homogeneous"
  }, "A solution looks clear and uniform because the solute particles are evenly spread throughout the solvent. You cannot see individual solute particles. This is different from a mixture like muddy water, where you can see the particles."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 7,
    question: "In a solution of sugar dissolved in water, what is the solute?",
    options: ["Water", "Sugar", "The solution itself", "The glass"],
    correct: 1,
    explain: "The solute is the substance that dissolves. Sugar dissolves in water, so sugar is the solute. Water is the solvent."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.3.2",
    title: "Measuring solubility",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The maximum mass of a solute that can dissolve in 100 mL of solvent at a specific temperature. Measured in g per 100 mL."
  }, "Solubility"), " tells you the maximum amount of a solute that can dissolve in a given volume of solvent at a specific temperature. It is usually measured in grams per 100 mL of water at a stated temperature. Different solutes have very different solubilities: at 20 degrees Celsius, sugar dissolves up to about 204 g per 100 mL, while salt only dissolves up to about 36 g per 100 mL."), /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A solution that contains the maximum amount of dissolved solute at a given temperature. No more solute will dissolve."
  }, "saturated solution"), " is one where no more solute will dissolve at that temperature. You know it's saturated when undissolved solid sits at the bottom even after thorough stirring. When presenting solubility data, scientists use bar charts to compare different solutes at the same temperature, and line graphs to show how solubility changes with temperature for one solute."), /*#__PURE__*/React.createElement(SolubilityGraph, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Sugar vs salt"
  }, "Sugar (sucrose) is about 5 to 6 times more soluble than salt at 20 \xB0C. That's why you can make very sweet drinks, but a glass of water can only hold so much salt before it becomes saturated."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 8,
    question: "A student adds 30 g of salt to 100 mL of water at 20 \xB0C. The solubility of salt at 20 \xB0C is 36 g per 100 mL. Is this solution saturated?",
    options: ["Yes, it is saturated", "No, it is unsaturated because more salt could still dissolve", "Yes, because any salt was added", "No, because salt does not dissolve"],
    correct: 1,
    explain: "The solution contains 30 g but could hold up to 36 g at 20 \xB0C. Since less than the maximum is dissolved, the solution is unsaturated. More salt could still dissolve."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.3.3",
    title: "How temperature affects solubility",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "For most solid solutes, solubility increases as temperature rises. Hot water particles move faster and with more energy, so they can pull more solute particles into solution before reaching saturation. Potassium nitrate is a dramatic example: its solubility jumps from about 13 g per 100 mL at 0 \xB0C to over 240 g per 100 mL at 100 \xB0C."), /*#__PURE__*/React.createElement("p", null, "Gases behave the opposite way: they become less soluble in warmer water. That's why bubbles appear on the inside of a saucepan before the water even boils. Dissolved oxygen escapes as the water heats up. This matters in aquatic ecosystems: warmer rivers contain less dissolved oxygen, which can stress fish and other aquatic creatures."), /*#__PURE__*/React.createElement(DissolvingSim, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Watch out for gases in warm water"
  }, "Warm soft drinks fizz more when you open them because CO2 gas is less soluble at warm temperatures. Cold drinks keep more CO2 dissolved, so they stay fizzy longer.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.3.4",
    title: "Particle theory and solutions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Particle theory helps us picture what happens when a solute dissolves. Before dissolving, the solute particles are held together in an ordered cluster. When placed in water, the water molecules attract the outer solute particles and pull them away one at a time. Each separated solute particle becomes surrounded by a shell of water molecules, a process called ", /*#__PURE__*/React.createElement(Term, {
    def: "The process where solvent molecules surround and separate individual solute particles, stabilising them in solution."
  }, "hydration"), " (or solvation). The hydrated particles then spread evenly throughout the water."), /*#__PURE__*/React.createElement("p", null, "Particle theory also explains saturation. At the point of saturation, solute particles are dissolving into the solution at exactly the same rate as they are leaving the solution and returning to the solid. This balance is called ", /*#__PURE__*/React.createElement(Term, {
    def: "A state where two opposing processes happen at exactly the same rate, resulting in no net change."
  }, "dynamic equilibrium"), ". Adding more solute at this point does not increase the concentration. Stirring, crushing the solute into smaller pieces, or heating the water can all speed up dissolving because they increase how often water molecules collide with the solute surface."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Why stirring works"
  }, "Stirring moves fresh unsaturated water into contact with the undissolved solute. This replaces the concentrated water right next to the solute and brings in more water molecules to attract solute particles."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Particle-level model of a solute dissolving in water."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 460 80",
    width: "100%",
    style: {
      maxWidth: 460
    }
  }, [["Solid solute", "Ordered lattice of\nsolute particles", ["s", "s", "s", "s", "s", "s"]], ["Water added", "Water molecules\nattract surface\nparticles", ["w", "w", "s", "s", "w", "w"]], ["Dissolving", "Particles pulled\naway one by one", ["w", "w", "w", "w", "s", "w"]], ["Solution", "Solute surrounded\nby water shells", ["w", "s", "w", "s", "w", "s"]]].map(function (_ref12, i) {
    var _ref13 = _slicedToArray(_ref12, 3),
      title = _ref13[0],
      desc = _ref13[1],
      dots = _ref13[2];
    return /*#__PURE__*/React.createElement("g", {
      key: title,
      transform: "translate(".concat(i * 116, ",0)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "110",
      height: "78",
      rx: "8",
      fill: "var(--surface-raised)",
      stroke: "var(--border)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "55",
      y: "14",
      textAnchor: "middle",
      fontWeight: "700",
      fontSize: "9.5",
      fill: "var(--accent-deep)"
    }, title), dots.map(function (d, j) {
      return /*#__PURE__*/React.createElement("circle", {
        key: j,
        cx: 18 + j % 3 * 28,
        cy: 30 + Math.floor(j / 3) * 20,
        r: "8",
        fill: d === "s" ? "#06b6d4" : "#e0f2fe",
        stroke: d === "s" ? "#0e7490" : "#bfdbfe",
        strokeWidth: "1"
      });
    }), desc.split("\n").map(function (line, j) {
      return /*#__PURE__*/React.createElement("text", {
        key: j,
        x: "55",
        y: 66 + j * 11,
        textAnchor: "middle",
        fontSize: "7.5",
        fill: "var(--ink-muted)"
      }, line);
    }), i < 3 && /*#__PURE__*/React.createElement("text", {
      x: "115",
      y: "40",
      fontSize: "16",
      fill: "var(--ink-muted)"
    }, "\u203A"));
  })))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.3.5",
    title: "Dilute, concentrated, saturated and supersaturated solutions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Scientists use specific terms to describe how much solute is in a solution. A ", /*#__PURE__*/React.createElement(Term, {
    def: "A solution that contains a small amount of solute per volume of solvent."
  }, "dilute"), " solution has very little solute; a ", /*#__PURE__*/React.createElement(Term, {
    def: "A solution that contains a large amount of solute per volume of solvent."
  }, "concentrated"), " solution has a lot. These are relative terms with no precise numerical boundary."), /*#__PURE__*/React.createElement("p", null, "A saturated solution has reached its maximum for that temperature. Any extra solute you add just sits undissolved. A ", /*#__PURE__*/React.createElement(Term, {
    def: "An unstable solution that contains more dissolved solute than the saturation point normally allows. Achieved by dissolving solute at high temperature then cooling carefully."
  }, "supersaturated"), " solution is unusual and unstable: it holds more solute than it should at that temperature. This happens when a saturated hot solution is cooled very slowly without stirring. If disturbed by a vibration or a tiny seed crystal, the excess solute suddenly crystallises out. Honey that has crystallised in a jar is a real-life example of this."), /*#__PURE__*/React.createElement(ConcentrationMatcher, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Hand warmers use supersaturation!"
  }, "Reusable hand warmers contain a supersaturated sodium acetate solution. When you click the metal disc inside, it triggers rapid crystallisation, releasing heat. You can recharge it by boiling it to re-dissolve all the crystals."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 9,
    question: "Can a dilute solution also be saturated? Explain your answer with an example.",
    model: "Yes. A substance with very low solubility forms a saturated solution at a very low concentration. For example, calcium carbonate has a solubility of about 0.001 g per 100 mL, so its saturated solution is extremely dilute. Even though there is very little solute, no more can dissolve, so it is saturated."
  }))));
}

/* ============================================================
   SECTION 4: Separating Mixtures
   ============================================================ */
function Section4(_ref14) {
  var progress = _ref14.progress,
    setProgress = _ref14.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "4.4 Separating Mixtures"), /*#__PURE__*/React.createElement("h1", null, "Pure substances, mixtures and separation techniques"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Mixtures can be separated because each component keeps its own physical properties. Choosing the right technique depends on knowing those differences.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/separating.png",
    caption: "Filtration separates an insoluble solid from a liquid."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.4.1",
    title: "Atoms, compounds and mixtures",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "At the smallest level, all matter is made of ", /*#__PURE__*/React.createElement(Term, {
    def: "The smallest particle of an element that has the chemical properties of that element. Cannot be broken down further by ordinary chemical means."
  }, "atoms"), ". When atoms of two or more different elements are chemically bonded together in fixed ratios, they form a ", /*#__PURE__*/React.createElement(Term, {
    def: "A pure substance made of two or more different elements chemically bonded in fixed ratios. Has new properties different from the original elements."
  }, "compound"), ". Water (H2O) is a compound of hydrogen and oxygen. Importantly, the properties of a compound are completely different from those of its component elements: hydrogen burns, oxygen supports fire, but together they form water, which puts out fires!"), /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "Two or more substances physically combined but NOT chemically bonded. Each substance keeps its own properties. No fixed ratio. Can be separated by physical means."
  }, "mixture"), " is formed when two or more substances are physically combined without any chemical bonding. The key difference: in a compound, properties change and you need a chemical reaction to separate the elements; in a mixture, each component keeps its own properties and can be separated by physical methods like filtering or evaporation."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Comparing elements, compounds and mixtures using particle diagrams."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 420 110",
    width: "100%",
    style: {
      maxWidth: 420
    }
  }, [{
    title: "Element (e.g. iron)",
    dots: Array(9).fill("iron"),
    colour: "#94a3b8"
  }, {
    title: "Compound (e.g. water)",
    dots: Array(6).fill("water"),
    colour2: "#3b82f6",
    colour: "#60a5fa"
  }, {
    title: "Mixture (e.g. seawater)",
    dots: ["water", "water", "salt", "water", "salt", "water", "water", "salt", "water"],
    colours: ["#60a5fa", "#60a5fa", "#fbbf24", "#60a5fa", "#fbbf24", "#60a5fa", "#60a5fa", "#fbbf24", "#60a5fa"]
  }].map(function (_ref15, i) {
    var title = _ref15.title,
      dots = _ref15.dots,
      colour = _ref15.colour,
      colours = _ref15.colours;
    return /*#__PURE__*/React.createElement("g", {
      key: title,
      transform: "translate(".concat(i * 142, ",0)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "135",
      height: "108",
      rx: "10",
      fill: "var(--surface-raised)",
      stroke: "var(--border)",
      strokeWidth: "1.2"
    }), /*#__PURE__*/React.createElement("text", {
      x: "67",
      y: "16",
      textAnchor: "middle",
      fontWeight: "700",
      fontSize: "9.5",
      fill: "var(--accent-deep)"
    }, title), dots.map(function (d, j) {
      return /*#__PURE__*/React.createElement("circle", {
        key: j,
        cx: 18 + j % 3 * 34,
        cy: 30 + Math.floor(j / 3) * 24,
        r: d === "salt" ? 7 : 8,
        fill: colours ? colours[j] : colour,
        stroke: colours ? colours[j] === "#fbbf24" ? "#d97706" : "#2563eb" : "#475569",
        strokeWidth: "1.2"
      });
    }), /*#__PURE__*/React.createElement("text", {
      x: "67",
      y: "104",
      textAnchor: "middle",
      fontSize: "8",
      fill: "var(--ink-muted)"
    }, i === 0 ? "One type of atom" : i === 1 ? "Bonded, fixed ratio" : "Mixed, not bonded"));
  }))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 10,
    question: "Which of the following is a compound?",
    options: ["Air", "Salt water", "Water (H2O)", "Iron filings"],
    correct: 2,
    explain: "Water (H2O) is a compound because hydrogen and oxygen atoms are chemically bonded together in a fixed ratio of 2:1. Air is a mixture, salt water is a mixture, and iron filings are an element."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.4.2",
    title: "Classifying matter as pure or impure",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Scientists sort all matter into ", /*#__PURE__*/React.createElement(Term, {
    def: "Contains only one type of particle. Either an element (one type of atom) or a compound (one type of molecule). Has a sharp, precise melting point."
  }, "pure substances"), " and ", /*#__PURE__*/React.createElement(Term, {
    def: "Contains two or more substances physically combined. Also called a mixture. Melts over a range of temperatures, not at a single fixed point."
  }, "impure substances (mixtures)"), ". A pure substance can be an element (all one type of atom, like pure gold) or a compound (atoms bonded in a fixed ratio, like water). Pure substances have consistent properties and a sharp, precise melting point."), /*#__PURE__*/React.createElement("p", null, "Mixtures are either ", /*#__PURE__*/React.createElement(Term, {
    def: "A mixture where composition is uniform throughout. A solution is a good example. You cannot see separate components."
  }, "homogeneous"), " (uniform composition throughout, like air or salt solution) or ", /*#__PURE__*/React.createElement(Term, {
    def: "A mixture where composition is not uniform. You can see visibly different components, like soil or salad."
  }, "heterogeneous"), " (non-uniform, like soil or salad). One clue for purity is the melting point: a pure substance melts at a single exact temperature, while a mixture melts over a range of temperatures."), /*#__PURE__*/React.createElement(Interactive, {
    title: "Classify that material",
    subtitle: "For each material, think: is it pure or a mixture? Homogeneous or heterogeneous?",
    takeaway: "Pure substances (elements and compounds) have a single uniform composition, while mixtures can be homogeneous (looking uniform, like salt water) or heterogeneous (visibly different parts, like soil)."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: [{
      id: "a",
      label: "Distilled water",
      bucket: "pure"
    }, {
      id: "b",
      label: "Salt water (brine)",
      bucket: "homogeneous"
    }, {
      id: "c",
      label: "Granite rock",
      bucket: "heterogeneous"
    }, {
      id: "d",
      label: "Pure gold",
      bucket: "pure"
    }, {
      id: "e",
      label: "Air",
      bucket: "homogeneous"
    }, {
      id: "f",
      label: "Soil",
      bucket: "heterogeneous"
    }],
    buckets: [{
      id: "pure",
      label: "Pure substance"
    }, {
      id: "homogeneous",
      label: "Homogeneous mixture"
    }, {
      id: "heterogeneous",
      label: "Heterogeneous mixture"
    }]
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.4.3",
    title: "Physical properties used in separation",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Every separation technique works by exploiting a difference in physical properties between the components of a mixture. The table below shows the main techniques and what property they rely on. No chemical change occurs: each component keeps its identity throughout."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Six separation techniques, the property each exploits, and an example."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 480 170",
    width: "100%",
    style: {
      maxWidth: 480
    }
  }, [["Technique", "Property exploited", "Example"], ["Filtration", "Particle size", "Sand from water"], ["Evaporation", "Boiling point (solvent)", "Salt from salt water"], ["Distillation", "Different boiling points", "Ethanol from water"], ["Magnetism", "Magnetic attraction", "Iron filings from sand"], ["Chromatography", "Solubility + surface attraction", "Dyes in ink"], ["Sieving", "Particle size (larger)", "Gravel from fine sand"]].map(function (row, ri) {
    return /*#__PURE__*/React.createElement("g", {
      key: ri,
      transform: "translate(0,".concat(ri * 24, ")")
    }, /*#__PURE__*/React.createElement("rect", {
      x: "0",
      y: "0",
      width: "480",
      height: "23",
      rx: "3",
      fill: ri === 0 ? "var(--accent-soft)" : ri % 2 === 0 ? "var(--surface)" : "var(--surface-raised)"
    }), row.map(function (cell, ci) {
      return /*#__PURE__*/React.createElement("text", {
        key: ci,
        x: ci === 0 ? 6 : ci === 1 ? 152 : 305,
        y: "16",
        fontSize: ri === 0 ? "10" : "9.5",
        fontWeight: ri === 0 ? "700" : "400",
        fill: ri === 0 ? "var(--accent-deep)" : "var(--ink)"
      }, cell);
    }));
  }))), /*#__PURE__*/React.createElement(SeparationPicker, null)), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.4.4",
    title: "Separation techniques in practice",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "In a filtration experiment, the solid that stays on the filter paper is called the ", /*#__PURE__*/React.createElement(Term, {
    def: "The solid material trapped on filter paper during filtration. It is insoluble in the solvent."
  }, "residue"), ". The liquid that passes through is called the ", /*#__PURE__*/React.createElement(Term, {
    def: "The liquid that passes through filter paper during filtration. It contains the solvent and any dissolved (soluble) components."
  }, "filtrate"), ". To separate a mixture of salt and sand from water, you would: first, stir the mixture in water to dissolve the salt (sand stays insoluble); then filter to collect the sand as the residue; then gently heat the filtrate to evaporate the water, leaving the salt behind."), /*#__PURE__*/React.createElement("p", null, "In ", /*#__PURE__*/React.createElement(Term, {
    def: "A separation technique where a mixture of liquids with different boiling points is separated by heating and collecting the vapour of each component as it boils off."
  }, "distillation"), ", the mixture is heated in a flask. The component with the lower boiling point vaporises first, travels through a condenser tube, and is collected as a liquid. This lets you collect both the pure solvent and the dissolved solid. Chromatography separates substances by how strongly they are attracted to a surface and how soluble they are in the moving solvent."), /*#__PURE__*/React.createElement(ChromatographySim, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "The Rf value in chromatography"
  }, "Rf = distance the spot moved / distance the solvent front moved. Every substance has its own characteristic Rf value in a given solvent. This is how scientists identify unknown substances."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 11,
    question: "In a filtration experiment separating sand from salt water, what is found in the filtrate?",
    options: ["Sand only", "Salt solution (salt dissolved in water)", "Sand and salt together", "Only water"],
    correct: 1,
    explain: "Sand is insoluble and is trapped as the residue on the filter paper. Salt has dissolved in the water, so the filtrate (the liquid that passes through) is a salt solution."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 12,
    question: "A student has a mixture of iron filings, sand and salt in water. Describe the steps they would follow to separate all three components.",
    model: "Step 1: Use a magnet to remove the iron filings (magnetic separation). Step 2: Filter the remaining mixture to collect the sand as the residue on the filter paper. Step 3: Gently heat the filtrate (salt solution) to evaporate the water, leaving the salt as a dry residue in the evaporating dish."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.4.5",
    title: "First Nations separation techniques",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Aboriginal and Torres Strait Islander Peoples developed deep and sophisticated knowledge of natural materials over tens of thousands of years. This knowledge includes many effective separation techniques, developed in response to the environments, plants and materials of their Country. Scientists today recognise that these Indigenous knowledge systems are a rich and valid body of knowledge."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "A traditional technique where wind or breath is used to separate lighter husks and chaff from heavier grain or seeds. Exploits differences in density and air resistance."
  }, "Winnowing"), " uses wind to separate lighter husks from heavier seeds, exploiting density and air resistance differences, just as a modern air separator does. ", /*#__PURE__*/React.createElement(Term, {
    def: "A traditional technique where water is used to wash out toxic or bitter soluble compounds from plant foods such as cycad nuts, making them safe to eat. Exploits solubility."
  }, "Leaching"), " uses water to wash soluble toxins from plant foods like cycad nuts: the toxic compounds dissolve and are washed away, while the nutritious starchy parts remain. Basket sieving with woven grass or bark separates particles by size, just like modern sieving."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Science is not only Western"
  }, "These techniques are based on careful observation and testing over thousands of years. They demonstrate the same scientific thinking as laboratory methods: understanding physical properties and using them to separate useful materials from unwanted ones."), /*#__PURE__*/React.createElement(Interactive, {
    title: "Match the traditional technique to its scientific principle",
    subtitle: "Drag each technique to the property it exploits.",
    takeaway: "Traditional separation techniques like winnowing, leaching, and basket sieving rely on exactly the same physical properties (density, solubility, particle size) as modern laboratory methods."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: [{
      id: "a",
      label: "Winnowing (blowing husks from grain)",
      bucket: "density"
    }, {
      id: "b",
      label: "Leaching cycad nuts in running water",
      bucket: "solubility"
    }, {
      id: "c",
      label: "Woven basket sieving of seeds",
      bucket: "particle_size"
    }],
    buckets: [{
      id: "density",
      label: "Density / air resistance"
    }, {
      id: "solubility",
      label: "Solubility"
    }, {
      id: "particle_size",
      label: "Particle size"
    }]
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.4.6",
    title: "Industrial separation: fractional distillation",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Many industries depend on large-scale separation of mixtures. One of the most important is ", /*#__PURE__*/React.createElement(Term, {
    def: "An industrial process that separates a mixture of liquids with different boiling points by heating the mixture in a tall tower and collecting each component as it condenses at its own temperature level."
  }, "fractional distillation"), ", used to separate crude oil into useful products. Crude oil is a complex mixture of hundreds of different hydrocarbons with different boiling points. When heated in a fractionating tower, each component vaporises and condenses at its own temperature level. Products collected include petrol, kerosene (jet fuel), diesel, lubricating oils and bitumen."), /*#__PURE__*/React.createElement("p", null, "Other important industrial separation processes include: water treatment plants (using sedimentation, filtration and disinfection); the sugar industry (using evaporation and crystallisation to extract pure sugar from sugarcane juice); and desalination plants (which force seawater through membranes to produce fresh drinking water). All of these use the same physical principles you study in the laboratory, just scaled up enormously."), /*#__PURE__*/React.createElement(Figure, {
    caption: "How a fractionating tower works to separate crude oil."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 350 200",
    width: "100%",
    style: {
      maxWidth: 370
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "110",
    y: "20",
    width: "80",
    height: "160",
    rx: "6",
    fill: "var(--surface-raised)",
    stroke: "var(--accent-deep)",
    strokeWidth: "2"
  }), [[30, "#ef4444", "Petrol / gases (low BP)"], [60, "#f59e0b", "Naphtha"], [90, "#22c55e", "Kerosene / jet fuel"], [120, "#3b82f6", "Diesel"], [150, "#8b5cf6", "Lubricating oils"]].map(function (_ref16) {
    var _ref17 = _slicedToArray(_ref16, 3),
      y = _ref17[0],
      col = _ref17[1],
      label = _ref17[2];
    return /*#__PURE__*/React.createElement("g", {
      key: label
    }, /*#__PURE__*/React.createElement("line", {
      x1: "190",
      y1: y,
      x2: "220",
      y2: y,
      stroke: col,
      strokeWidth: "2.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "220",
      cy: y,
      r: "5",
      fill: col
    }), /*#__PURE__*/React.createElement("text", {
      x: "228",
      y: y + 4,
      fontSize: "9",
      fill: col
    }, label));
  }), /*#__PURE__*/React.createElement("rect", {
    x: "80",
    y: "170",
    width: "140",
    height: "26",
    rx: "6",
    fill: "#fbbf24",
    opacity: "0.8"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "187",
    textAnchor: "middle",
    fontSize: "9",
    fill: "#78350f"
  }, "Crude oil heated (350 \xB0C)"), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "34",
    textAnchor: "middle",
    fontSize: "8.5",
    fill: "var(--ink-muted)"
  }, "cooler at top"), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "162",
    textAnchor: "middle",
    fontSize: "8.5",
    fill: "var(--ink-muted)"
  }, "hotter at bottom"), [40, 70, 100, 130, 160].map(function (y) {
    return /*#__PURE__*/React.createElement("line", {
      key: y,
      x1: "112",
      y1: y,
      x2: "188",
      y2: y,
      stroke: "var(--border)",
      strokeWidth: "0.8",
      strokeDasharray: "4,3"
    });
  }))), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Same principle, bigger scale"
  }, "Fractional distillation in a refinery uses exactly the same idea as a school lab distillation: different substances boil at different temperatures. The tower is just much taller and separates many more fractions at once.")));
}

/* ============================================================
   SECTION 5: Solutions and Mixtures in Context
   ============================================================ */
function Section5(_ref18) {
  var progress = _ref18.progress,
    setProgress = _ref18.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "4.5 Solutions and Mixtures in Context"), /*#__PURE__*/React.createElement("h1", null, "Water pollution and treatment"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Now you know how solutions and mixtures work, you can apply that understanding to one of the most important real-world challenges: cleaning polluted water.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "4.5.1",
    title: "Modelling water pollution and designing a treatment",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The introduction of harmful substances into a water body (river, lake, ocean or groundwater) in amounts that damage the ecosystem or make the water unsafe."
  }, "Water pollution"), " happens when harmful substances enter a water body. Pollutants can be physical (sand, silt, litter), chemical (fertilisers, heavy metal ions, oil, pesticides) or biological (excess bacteria or algae). Sources include agricultural runoff, industrial discharge, urban runoff from roads and drains, and sewage discharge."), /*#__PURE__*/React.createElement("p", null, "Removing pollutants requires choosing the right technique for each type. Insoluble solids can be removed by sedimentation and filtration because they are too large to pass through a filter and dense enough to settle. Oil floating on the surface can be skimmed or absorbed by booms, exploiting the density difference between oil and water. Dissolved chemical pollutants like fertilisers are much harder to remove because their particles are small enough to pass through any filter. These require activated carbon, chemical treatment, or reverse osmosis."), /*#__PURE__*/React.createElement(PollutionTreatment, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Filtration alone is not enough"
  }, "A physical filter can only remove particles that are larger than its pores. Dissolved pollutants (like fertilisers or dissolved heavy metals) have particles far too small to be trapped. Real water treatment plants use a sequence of techniques to tackle every type of pollutant."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Stages of a water treatment plant and the physical property each step exploits."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 480 70",
    width: "100%",
    style: {
      maxWidth: 480
    }
  }, [["Screening", "Large debris\n(particle size)"], ["Sedimentation", "Heavy particles\n(density)"], ["Filtration", "Fine solids\n(particle size)"], ["Activated carbon", "Dissolved organics\n(adsorption)"], ["Disinfection", "Bacteria/viruses\n(chemical/UV)"]].map(function (_ref19, i) {
    var _ref20 = _slicedToArray(_ref19, 2),
      step = _ref20[0],
      desc = _ref20[1];
    return /*#__PURE__*/React.createElement("g", {
      key: step,
      transform: "translate(".concat(i * 96 + 2, ",0)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "90",
      height: "66",
      rx: "8",
      fill: i % 2 === 0 ? "var(--accent-soft)" : "var(--surface-raised)",
      stroke: "var(--accent-deep)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "45",
      y: "18",
      textAnchor: "middle",
      fontWeight: "700",
      fontSize: "9.5",
      fill: "var(--accent-deep)"
    }, step), desc.split("\n").map(function (line, j) {
      return /*#__PURE__*/React.createElement("text", {
        key: j,
        x: "45",
        y: 32 + j * 14,
        textAnchor: "middle",
        fontSize: "8.5",
        fill: "var(--ink)"
      }, line);
    }), i < 4 && /*#__PURE__*/React.createElement("text", {
      x: "95",
      y: "36",
      fontSize: "14",
      fill: "var(--ink-muted)"
    }, "\u203A"));
  }))), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "The Darling River fish kills"
  }, "In 2018 to 2019, millions of fish died in the Darling River near Menindee in NSW. Drought and very low river flows, combined with excess nutrients (including dissolved fertilisers from agricultural runoff), caused a massive algal bloom. When the algae died, bacteria consumed them and used up almost all the dissolved oxygen in the water, suffocating the fish."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 13,
    question: "Which type of water pollutant CANNOT be removed by physical filtration?",
    options: ["Sand and silt particles", "Dissolved fertiliser (nitrate ions)", "Leaves and large debris", "Soil particles"],
    correct: 1,
    explain: "Dissolved fertiliser (nitrate ions) consists of particles far too small to be trapped by filter paper. Filtration only removes insoluble particles that are larger than the pores of the filter. Sand, leaves and soil are all insoluble and large enough to be filtered out."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 14,
    question: "A river near a farm shows an algal bloom and many dead fish downstream. Explain how dissolved fertilisers from the farm could cause this outcome, linking to the concepts of solubility and dissolved oxygen.",
    model: "Fertilisers contain soluble nutrients like nitrates and phosphates. These dissolve in rainwater runoff and flow into the river (they form a solution). In the river, excess nutrients cause algae to grow rapidly. When the algae die, bacteria decompose them, consuming large amounts of dissolved oxygen. Hot weather further reduces the solubility of oxygen in the water. With very little dissolved oxygen remaining, the fish cannot breathe and die."
  }))));
}

/* ============================================================
   MOUNT THE APP
   ============================================================ */
mountTopicApp({
  year: 7,
  topicTitle: "Solutions and Mixtures",
  branch: "chemistry",
  heroImage: "img/hero.png",
  strand: "Stage 4 · NSW Science",
  accent: "cyan",
  storageKey: "y7.solutions",
  hubHref: "../",
  intro: "Everything around you is made of particles arranged in different ways. In this topic you will explore the three states of matter, the unusual properties of water, how solutions form and behave, and how scientists use physical properties to separate mixtures. From dissolving sugar in your tea to cleaning polluted rivers, solutions and mixtures are everywhere.",
  glossary: {
    "atom": "The smallest particle of an element that has the chemical properties of that element.",
    "boiling point": "The temperature at which a liquid turns into a gas throughout its volume (100 °C for water at normal pressure).",
    "chromatography": "A separation technique that separates substances based on how strongly they attract to a surface and how soluble they are in a moving solvent.",
    "compound": "A pure substance made of two or more different elements chemically bonded in fixed ratios. Has new properties different from the original elements.",
    "concentrated solution": "A solution that contains a large amount of solute per volume of solvent.",
    "condensation": "The change of state from gas to liquid, releasing energy.",
    "density": "The mass of a substance per unit volume. Formula: density = mass divided by volume (rho = m/v). Units: g/mL.",
    "dilute solution": "A solution that contains a small amount of solute per volume of solvent.",
    "distillation": "A separation technique that separates two liquids with different boiling points by heating the mixture and collecting each component as it vaporises.",
    "dynamic equilibrium": "A state where two opposing processes occur at exactly the same rate, so there is no net change.",
    "evaporation": "The change from liquid to gas at the surface of a liquid. Used as a separation technique to remove a solvent and leave a dissolved solid.",
    "filtration": "A separation technique that separates an insoluble solid from a liquid using filter paper with tiny pores.",
    "filtrate": "The liquid that passes through filter paper during filtration.",
    "fractional distillation": "An industrial separation technique that separates a mixture of liquids with different boiling points by collecting each fraction at a different level in a tall tower.",
    "hydration": "The process where water molecules surround and separate individual solute particles, stabilising them in solution.",
    "insoluble": "Not able to dissolve in a given solvent.",
    "inter-particle forces": "The attractive forces between neighbouring particles. Strong in solids, moderate in liquids, very weak in gases.",
    "leaching": "A traditional separation technique using water to wash soluble toxins from plant foods, exploiting solubility.",
    "melting point": "The temperature at which a solid turns into a liquid (0 °C for water at normal pressure).",
    "mixture": "Two or more substances physically combined but not chemically bonded. Each substance keeps its own properties and can be separated by physical means.",
    "particle theory": "A scientific model explaining the behaviour of matter by describing the movement and arrangement of tiny particles.",
    "residue": "The solid material trapped on filter paper during filtration.",
    "saturated solution": "A solution that contains the maximum amount of dissolved solute possible at a given temperature.",
    "solubility": "The maximum mass of solute that can dissolve in 100 mL of solvent at a specific temperature (g per 100 mL).",
    "soluble": "Able to dissolve in a given solvent.",
    "solute": "The substance that dissolves in a solvent to form a solution.",
    "solution": "A homogeneous mixture formed when a solute dissolves evenly throughout a solvent.",
    "solvent": "The substance in which the solute dissolves. Water is the most common solvent.",
    "sublimation": "The direct change from solid to gas without passing through the liquid state.",
    "supersaturated solution": "An unstable solution that contains more dissolved solute than the normal saturation point allows at that temperature.",
    "winnowing": "A traditional separation technique using wind or breath to separate lighter husks from heavier grain, exploiting density differences."
  },
  sections: [{
    id: "4.1",
    label: "Properties of Matter",
    accent: "cyan",
    blurb: "The three states of matter, changes of state and particle theory.",
    points: ["4.1.1", "4.1.2", "4.1.3", "4.1.4"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section1, p);
    }
  }, {
    id: "4.2",
    label: "Properties of Water",
    accent: "blue",
    blurb: "Density, buoyancy, surface tension and calculating density.",
    points: ["4.2.1", "4.2.3", "4.2.2"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section2, p);
    }
  }, {
    id: "4.3",
    label: "Solutions",
    accent: "teal",
    blurb: "Solutes, solvents, solubility, concentration and particle models.",
    points: ["4.3.1", "4.3.2", "4.3.3", "4.3.4", "4.3.5"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section3, p);
    }
  }, {
    id: "4.4",
    label: "Separating Mixtures",
    accent: "violet",
    blurb: "Pure substances vs mixtures, separation techniques and Indigenous knowledge.",
    points: ["4.4.1", "4.4.2", "4.4.3", "4.4.4", "4.4.5", "4.4.6"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section4, p);
    }
  }, {
    id: "4.5",
    label: "In Context",
    accent: "green",
    blurb: "Water pollution: modelling, designing treatment and real-world applications.",
    points: ["4.5.1"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section5, p);
    }
  }]
});
