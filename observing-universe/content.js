/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

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

/* =====================================================================
   SECTION 1 INTERACTIVE: Scientific Inquiry Cycle Animator
   ===================================================================== */
function InquiryCycleAnim() {
  var steps = [{
    label: "Observe",
    desc: "Notice something interesting in the natural world.",
    icon: "👁️"
  }, {
    label: "Question",
    desc: "Ask a testable question: what causes this?",
    icon: "❓"
  }, {
    label: "Investigate",
    desc: "Plan and carry out an experiment or observation.",
    icon: "🔬"
  }, {
    label: "Analyse",
    desc: "Look for patterns in your data.",
    icon: "📊"
  }, {
    label: "Conclude",
    desc: "Draw evidence-based conclusions and share findings.",
    icon: "📢"
  }, {
    label: "Build knowledge",
    desc: "New knowledge is tested, refined, and extended by others.",
    icon: "🌐"
  }];
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    active = _useState2[0],
    setActive = _useState2[1];
  useEffect(function () {
    var id = setInterval(function () {
      return setActive(function (a) {
        return (a + 1) % steps.length;
      });
    }, 1800);
    return function () {
      return clearInterval(id);
    };
  }, []);
  var r = 100;
  var cx = 160,
    cy = 160;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "The scientific inquiry cycle",
    subtitle: "Watch how each step flows into the next. Tap a step to explore it.",
    takeaway: "Science is a repeating cycle that begins with observation, builds through investigation and analysis, and produces knowledge that is tested and extended by other scientists."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 320",
    width: "240",
    height: "240",
    style: {
      flexShrink: 0
    }
  }, steps.map(function (s, i) {
    var angle = i / steps.length * 2 * Math.PI - Math.PI / 2;
    var x = cx + r * Math.cos(angle);
    var y = cy + r * Math.sin(angle);
    var isActive = i === active;
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      onClick: function onClick() {
        return setActive(i);
      },
      style: {
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: y,
      r: isActive ? 26 : 20,
      fill: isActive ? "var(--accent-deep)" : "var(--accent-soft)",
      stroke: isActive ? "var(--accent-deep)" : "var(--accent-mid)",
      strokeWidth: 2,
      style: {
        transition: "all 0.3s"
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: x,
      y: y - 1,
      textAnchor: "middle",
      dominantBaseline: "middle",
      fontSize: isActive ? 16 : 13,
      fill: isActive ? "#fff" : "var(--ink)"
    }, s.icon), /*#__PURE__*/React.createElement("text", {
      x: x,
      y: y + (isActive ? 12 : 10) + 10,
      textAnchor: "middle",
      fontSize: 9,
      fill: isActive ? "var(--accent-deep)" : "var(--ink-muted)",
      fontWeight: isActive ? "700" : "400"
    }, s.label), function () {
      var a2 = (i + 1) / steps.length * 2 * Math.PI - Math.PI / 2;
      var x2 = cx + r * Math.cos(a2);
      var y2 = cy + r * Math.sin(a2);
      return /*#__PURE__*/React.createElement("line", {
        x1: x,
        y1: y,
        x2: x2,
        y2: y2,
        stroke: "var(--accent-mid)",
        strokeWidth: 1.5,
        strokeDasharray: "3,3"
      });
    }());
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 46,
    fill: "var(--surface)",
    stroke: "var(--accent-soft)",
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy - 6,
    textAnchor: "middle",
    fontSize: 11,
    fill: "var(--ink)",
    fontWeight: "700"
  }, "Science"), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 8,
    textAnchor: "middle",
    fontSize: 10,
    fill: "var(--ink-muted)"
  }, "is a cycle")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 220,
      padding: "16px 20px",
      background: "var(--accent-soft)",
      borderRadius: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 4
    }
  }, steps[active].icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: "var(--accent-deep)",
      marginBottom: 6
    }
  }, steps[active].label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--ink)"
    }
  }, steps[active].desc), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: "flex",
      gap: 6
    }
  }, steps.map(function (_, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: function onClick() {
        return setActive(i);
      },
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: i === active ? "var(--accent-deep)" : "var(--accent-soft)",
        border: "1.5px solid var(--accent-mid)",
        cursor: "pointer",
        transition: "background 0.3s"
      }
    });
  })))));
}

/* =====================================================================
   SECTION 1 INTERACTIVE: Branches of Science Sorter
   ===================================================================== */
function BranchSorter() {
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Sort the science topics",
    subtitle: "Which branch does each topic belong to? Click to assign.",
    takeaway: "Every science question fits into one or more branches, and many space science questions require biology, chemistry, physics, and geology all working together."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: [{
      id: "a",
      label: "Gravity pulling planets into orbit",
      bucket: "physics"
    }, {
      id: "b",
      label: "Chemical composition of a star",
      bucket: "chemistry"
    }, {
      id: "c",
      label: "Could microbes survive on Mars?",
      bucket: "biology"
    }, {
      id: "d",
      label: "Craters on the Moon's surface",
      bucket: "geology"
    }, {
      id: "e",
      label: "Speed of light",
      bucket: "physics"
    }, {
      id: "f",
      label: "Ice records of past climates",
      bucket: "geology"
    }],
    buckets: [{
      id: "physics",
      label: "Physics"
    }, {
      id: "chemistry",
      label: "Chemistry"
    }, {
      id: "biology",
      label: "Biology"
    }, {
      id: "geology",
      label: "Geology"
    }]
  }));
}

/* =====================================================================
   SECTION 2 INTERACTIVE: Measuring Instrument Comparison
   ===================================================================== */
function InstrumentSim() {
  var _useState3 = useState("analog"),
    _useState4 = _slicedToArray(_useState3, 2),
    type = _useState4[0],
    setType = _useState4[1];
  var _useState5 = useState(23.4),
    _useState6 = _slicedToArray(_useState5, 1),
    trueVal = _useState6[0];
  var analogRead = 23.5;
  var digitalRead = 23.4;
  var displayed = type === "analog" ? analogRead : digitalRead;
  var precision = type === "analog" ? "0.5 degrees C" : "0.1 degrees C";
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Analog vs digital thermometer",
    subtitle: "Switch between instruments and see how precision changes.",
    takeaway: "Digital instruments usually display finer precision than analog scales, which can reduce reading error when measuring the same temperature."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: [{
      value: "analog",
      label: "Analog"
    }, {
      value: "digital",
      label: "Digital"
    }],
    value: type,
    onChange: setType
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "16px 0"
    }
  }, type === "analog" ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 200",
    width: "100",
    height: "160"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "10",
    width: "40",
    height: "160",
    rx: "20",
    fill: "#e3f0ff",
    stroke: "#4a90d9",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: 10 + (1 - (analogRead - 0) / 50) * 140,
    width: "16",
    height: analogRead / 50 * 140,
    rx: "8",
    fill: "#e74c3c"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "170",
    r: "16",
    fill: "#e74c3c",
    stroke: "#4a90d9",
    strokeWidth: "2"
  }), [0, 10, 20, 30, 40, 50].map(function (v) {
    return /*#__PURE__*/React.createElement("g", {
      key: v
    }, /*#__PURE__*/React.createElement("line", {
      x1: "40",
      y1: 10 + (1 - v / 50) * 140,
      x2: "52",
      y2: 10 + (1 - v / 50) * 140,
      stroke: "#4a90d9",
      strokeWidth: v % 10 === 0 ? 2 : 1
    }), v % 10 === 0 && /*#__PURE__*/React.createElement("text", {
      x: "32",
      y: 14 + (1 - v / 50) * 140,
      textAnchor: "end",
      fontSize: "9",
      fill: "#4a90d9"
    }, v));
  }), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "195",
    textAnchor: "middle",
    fontSize: "9",
    fill: "var(--ink-muted)"
  }, "deg C")) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1a1a2e",
      color: "#0ff",
      padding: "20px 32px",
      borderRadius: 12,
      fontFamily: "monospace",
      fontSize: 36,
      fontWeight: 700,
      letterSpacing: 4,
      border: "3px solid #0ff",
      boxShadow: "0 0 20px #0ff4"
    }
  }, digitalRead.toFixed(1), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#0ff8",
      letterSpacing: 1,
      marginTop: 4
    }
  }, "deg C"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: displayed.toFixed(type === "analog" ? 1 : 1),
    label: "Reading (deg C)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: precision,
    label: "Precision"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: Math.abs(displayed - trueVal).toFixed(1),
    label: "Error from true (deg C)"
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginBottom: 0,
      marginTop: 8
    }
  }, "True temperature is ", trueVal, " degrees C. In this example, the digital thermometer has the smaller error and finer precision."));
}

/* =====================================================================
   SECTION 2 INTERACTIVE: Observation vs Inference vs Prediction
   ===================================================================== */
function ObsInferPred() {
  var scenarios = [{
    obs: "Light from a distant galaxy is shifted towards the red end of the spectrum.",
    infer: "The galaxy is moving away from us (Doppler effect).",
    pred: "More distant galaxies should show an even greater redshift."
  }, {
    obs: "A star's brightness dips slightly every 365 days.",
    infer: "A planet might be passing in front of the star, blocking some light.",
    pred: "The brightness dip should repeat every 365 days like clockwork."
  }, {
    obs: "The Moon's surface is covered in circular craters.",
    infer: "The Moon was struck many times by space rocks.",
    pred: "The craters should be deeper and wider if the impacting rock was larger."
  }];
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    idx = _useState8[0],
    setIdx = _useState8[1];
  var _useState9 = useState([false, false, false]),
    _useState0 = _slicedToArray(_useState9, 2),
    revealed = _useState0[0],
    setRevealed = _useState0[1];
  var reveal = function reveal(i) {
    return setRevealed(function (r) {
      return r.map(function (v, j) {
        return j === i ? true : v;
      });
    });
  };
  var sc = scenarios[idx];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "From observation to prediction",
    subtitle: "Reveal how scientists move from what they see to what they test.",
    takeaway: "Every scientific investigation starts with a direct observation, moves to an inference about its cause, then produces a testable prediction that can be checked with new evidence."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: scenarios.map(function (_, i) {
      return {
        value: i,
        label: "Example ".concat(i + 1)
      };
    }),
    value: idx,
    onChange: function onChange(v) {
      setIdx(Number(v));
      setRevealed([false, false, false]);
    }
  })), [{
    label: "Observation",
    val: sc.obs,
    color: "var(--accent-soft)",
    borderColor: "var(--accent-mid)"
  }, {
    label: "Inference",
    val: sc.infer,
    color: "var(--surface)",
    borderColor: "var(--accent-deep)",
    i: 1
  }, {
    label: "Testable prediction",
    val: sc.pred,
    color: "var(--accent-soft)",
    borderColor: "var(--accent-deep)",
    i: 2
  }].map(function (row, ri) {
    return /*#__PURE__*/React.createElement("div", {
      key: ri,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 110,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "chip accent",
      style: {
        fontSize: 12
      }
    }, row.label)), ri === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: row.color,
        border: "2px solid ".concat(row.borderColor),
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 14
      }
    }, row.val) : /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: row.color,
        border: "2px solid ".concat(row.borderColor),
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 14,
        cursor: "pointer",
        filter: revealed[ri] ? "none" : "blur(5px)",
        transition: "filter 0.4s",
        userSelect: revealed[ri] ? "auto" : "none"
      },
      role: "button",
      tabIndex: 0,
      onClick: function onClick() {
        return reveal(ri);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          reveal(ri);
        }
      }
    }, revealed[ri] ? row.val : "Tap to reveal"));
  }));
}

/* =====================================================================
   SECTION 3 INTERACTIVE: Solar System Model Comparison
   ===================================================================== */
function SolarModelSim() {
  var _useState1 = useState("geo"),
    _useState10 = _slicedToArray(_useState1, 2),
    model = _useState10[0],
    setModel = _useState10[1];
  var _useState11 = useState(0),
    _useState12 = _slicedToArray(_useState11, 2),
    angle = _useState12[0],
    setAngle = _useState12[1];
  useEffect(function () {
    var id = setInterval(function () {
      return setAngle(function (a) {
        return (a + 1) % 360;
      });
    }, 40);
    return function () {
      return clearInterval(id);
    };
  }, []);
  var toRad = function toRad(d) {
    return d * Math.PI / 180;
  };
  var earthAngle = toRad(angle);
  var moonAngle = toRad(angle * 13);
  var sunAngle = toRad(angle * 0.8);
  var cx = 160,
    cy = 160;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Geocentric vs heliocentric model",
    subtitle: "Switch between models and watch the animation.",
    takeaway: "In the geocentric model everything orbits Earth, but in the heliocentric model Earth and the other planets all orbit the Sun, a change that was accepted only after new telescope evidence disproved the older idea."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: [{
      value: "geo",
      label: "Geocentric (Earth centre)"
    }, {
      value: "helio",
      label: "Heliocentric (Sun centre)"
    }],
    value: model,
    onChange: setModel
  })), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 320",
    width: "100%",
    style: {
      maxWidth: 360,
      display: "block",
      margin: "0 auto"
    }
  }, model === "geo" ? /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 90,
    fill: "none",
    stroke: "var(--accent-mid)",
    strokeWidth: 1,
    strokeDasharray: "4,4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 55,
    fill: "none",
    stroke: "var(--accent-mid)",
    strokeWidth: 1,
    strokeDasharray: "4,4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 22,
    fill: "none",
    stroke: "var(--accent-mid)",
    strokeWidth: 1,
    strokeDasharray: "4,4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 14,
    fill: "#4a90d9"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 22,
    textAnchor: "middle",
    fontSize: 10,
    fill: "var(--ink)",
    fontWeight: "700"
  }, "Earth"), /*#__PURE__*/React.createElement("circle", {
    cx: cx + 55 * Math.cos(sunAngle),
    cy: cy + 55 * Math.sin(sunAngle),
    r: 16,
    fill: "#f7b731"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 55 * Math.cos(sunAngle),
    y: cy + 55 * Math.sin(sunAngle) + 24,
    textAnchor: "middle",
    fontSize: 9,
    fill: "#f7b731"
  }, "Sun"), /*#__PURE__*/React.createElement("circle", {
    cx: cx + 22 * Math.cos(moonAngle),
    cy: cy + 22 * Math.sin(moonAngle),
    r: 7,
    fill: "#ccc"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 22 * Math.cos(moonAngle),
    y: cy + 22 * Math.sin(moonAngle) - 12,
    textAnchor: "middle",
    fontSize: 8,
    fill: "#ccc"
  }, "Moon"), /*#__PURE__*/React.createElement("circle", {
    cx: cx + 90 * Math.cos(earthAngle * 0.5),
    cy: cy + 90 * Math.sin(earthAngle * 0.5),
    r: 8,
    fill: "#e74c3c"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 90 * Math.cos(earthAngle * 0.5),
    y: cy + 90 * Math.sin(earthAngle * 0.5) - 13,
    textAnchor: "middle",
    fontSize: 8,
    fill: "#e74c3c"
  }, "Mars")) : /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 90,
    fill: "none",
    stroke: "var(--accent-mid)",
    strokeWidth: 1,
    strokeDasharray: "4,4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 62,
    fill: "none",
    stroke: "var(--accent-mid)",
    strokeWidth: 1,
    strokeDasharray: "4,4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 35,
    fill: "none",
    stroke: "var(--accent-mid)",
    strokeWidth: 1,
    strokeDasharray: "4,4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 16,
    fill: "#f7b731"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 24,
    textAnchor: "middle",
    fontSize: 10,
    fill: "#f7b731",
    fontWeight: "700"
  }, "Sun"), /*#__PURE__*/React.createElement("circle", {
    cx: cx + 62 * Math.cos(earthAngle),
    cy: cy + 62 * Math.sin(earthAngle),
    r: 10,
    fill: "#4a90d9"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 62 * Math.cos(earthAngle),
    y: cy + 62 * Math.sin(earthAngle) - 15,
    textAnchor: "middle",
    fontSize: 9,
    fill: "#4a90d9"
  }, "Earth"), /*#__PURE__*/React.createElement("circle", {
    cx: cx + 62 * Math.cos(earthAngle) + 18 * Math.cos(moonAngle),
    cy: cy + 62 * Math.sin(earthAngle) + 18 * Math.sin(moonAngle),
    r: 5,
    fill: "#ccc"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx + 90 * Math.cos(earthAngle * 0.53),
    cy: cy + 90 * Math.sin(earthAngle * 0.53),
    r: 8,
    fill: "#e74c3c"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 90 * Math.cos(earthAngle * 0.53),
    y: cy + 90 * Math.sin(earthAngle * 0.53) - 13,
    textAnchor: "middle",
    fontSize: 8,
    fill: "#e74c3c"
  }, "Mars"), /*#__PURE__*/React.createElement("circle", {
    cx: cx + 35 * Math.cos(earthAngle * 1.6),
    cy: cy + 35 * Math.sin(earthAngle * 1.6),
    r: 6,
    fill: "#f0a500"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 35 * Math.cos(earthAngle * 1.6),
    y: cy + 35 * Math.sin(earthAngle * 1.6) - 10,
    textAnchor: "middle",
    fontSize: 8,
    fill: "#f0a500"
  }, "Venus")), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: 310,
    textAnchor: "middle",
    fontSize: 11,
    fill: "var(--ink-muted)"
  }, model === "geo" ? "Earth-centred (Ptolemy, ~150 CE)" : "Sun-centred (Copernicus, 1543 CE)")), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Key difference"
  }, "In the geocentric model everything orbits Earth. In the heliocentric model Earth and the other planets orbit the Sun. Galileo's observations of Jupiter's moons and the phases of Venus proved the geocentric model was wrong."));
}

/* =====================================================================
   SECTION 3 INTERACTIVE: Day/Night Earth Rotation Animation
   ===================================================================== */
function DayNightSim() {
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    paused = _useState14[0],
    setPaused = _useState14[1];
  var _useState15 = useState(0),
    _useState16 = _slicedToArray(_useState15, 2),
    rotation = _useState16[0],
    setRotation = _useState16[1];
  var _useState17 = useState(-34),
    _useState18 = _slicedToArray(_useState17, 2),
    lat = _useState18[0],
    setLat = _useState18[1];
  useEffect(function () {
    if (paused) return;
    var id = setInterval(function () {
      return setRotation(function (r) {
        return (r + 0.5) % 360;
      });
    }, 30);
    return function () {
      return clearInterval(id);
    };
  }, [paused]);
  var cx = 100,
    cy = 100,
    r = 70;
  var sunX = 240,
    sunY = 100;
  var lightAngle = Math.atan2(cy - sunY, cx - sunX);
  var latRad = lat * Math.PI / 180;
  var dotAngle = rotation * Math.PI / 180 + lightAngle + Math.PI;
  var dotX = cx + r * Math.cos(dotAngle) * Math.cos(latRad);
  var dotY = cy - r * (Math.sin(latRad) * 0.95) + r * Math.sin(dotAngle) * Math.cos(latRad) * 0.3;
  var isDay = Math.cos(dotAngle - lightAngle) < 0; /* lightAngle points from the Sun to Earth, so the day side faces the opposite way */
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Day and night rotation",
    subtitle: "Earth spins once every 24 hours. Watch your city move through day and night.",
    takeaway: "Day and night are caused by Earth spinning on its axis every 24 hours, so one half faces the Sun while the other half is in darkness."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Your latitude",
    min: -70,
    max: 70,
    step: 1,
    value: lat,
    onChange: setLat,
    unit: " deg"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: function onClick() {
      return setPaused(function (p) {
        return !p;
      });
    }
  }, paused ? "Play" : "Pause")), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 300 200",
    width: "100%",
    style: {
      maxWidth: 400,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "sunGlow",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#ffe060"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "#f7b731"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#e07a00",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "earthClip"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: sunX,
    cy: sunY,
    r: 28,
    fill: "url(#sunGlow)"
  }), /*#__PURE__*/React.createElement("text", {
    x: sunX,
    y: sunY + 38,
    textAnchor: "middle",
    fontSize: 10,
    fill: "#f7b731",
    fontWeight: "700"
  }, "Sun"), /*#__PURE__*/React.createElement("line", {
    x1: sunX - 28,
    y1: sunY,
    x2: cx + r,
    y2: cy,
    stroke: "#ffe06055",
    strokeWidth: 70
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r,
    fill: "#1a3a5c"
  }), /*#__PURE__*/React.createElement("rect", {
    x: cx,
    y: cy - r,
    width: r,
    height: r * 2,
    fill: "#4a90d9",
    clipPath: "url(#earthClip)",
    opacity: 0.9
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: cx,
    cy: cy,
    rx: r,
    ry: r * 0.35,
    fill: "none",
    stroke: "var(--accent-mid)",
    strokeWidth: 1,
    strokeDasharray: "3,3",
    opacity: 0.5
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy - r,
    r: 3,
    fill: "var(--accent-mid)",
    opacity: 0.7
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy + r,
    r: 3,
    fill: "var(--accent-mid)",
    opacity: 0.7
  }), /*#__PURE__*/React.createElement("circle", {
    cx: dotX,
    cy: dotY,
    r: 5,
    fill: isDay ? "#f7b731" : "#ccc",
    stroke: "#fff",
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement("text", {
    x: dotX + 10,
    y: dotY - 8,
    fontSize: 9,
    fill: isDay ? "#f7b731" : "#ccc",
    fontWeight: "700"
  }, isDay ? "Day" : "Night"), /*#__PURE__*/React.createElement("text", {
    x: cx - 30,
    y: cy + r + 18,
    fontSize: 9,
    fill: "var(--ink-muted)",
    textAnchor: "middle"
  }, "Night side"), /*#__PURE__*/React.createElement("text", {
    x: cx + 20,
    y: cy + r + 18,
    fontSize: 9,
    fill: "#4a90d9",
    textAnchor: "middle"
  }, "Day side")), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: isDay ? "DAY" : "NIGHT",
    label: "Your location (".concat(lat > 0 ? lat + "N" : lat < 0 ? Math.abs(lat) + "S" : "equator", ")")
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "24 h",
    label: "One full rotation"
  })));
}

/* =====================================================================
   SECTION 3 INTERACTIVE: Seasons Axial Tilt Model
   ===================================================================== */
function SeasonsSim() {
  var _useState19 = useState(0),
    _useState20 = _slicedToArray(_useState19, 2),
    pos = _useState20[0],
    setPos = _useState20[1];
  var positions = [{
    label: "Dec (Aust. summer)",
    shem: "Summer",
    nhem: "Winter",
    desc: "Southern Hemisphere tilts towards the Sun. More direct sunlight, longer days."
  }, {
    label: "Mar (autumn)",
    shem: "Autumn",
    nhem: "Spring",
    desc: "Neither hemisphere tilts towards the Sun. Days and nights are about equal."
  }, {
    label: "Jun (Aust. winter)",
    shem: "Winter",
    nhem: "Summer",
    desc: "Southern Hemisphere tilts away from the Sun. Less direct sunlight, shorter days."
  }, {
    label: "Sep (spring)",
    shem: "Spring",
    nhem: "Autumn",
    desc: "Neither hemisphere tilts towards the Sun. Days and nights are about equal."
  }];
  var p = positions[pos];
  var earthPositions = [{
    x: 250,
    y: 120
  }, {
    x: 120,
    y: 210
  }, {
    x: 0,
    y: 120
  }, {
    x: 120,
    y: 30
  }];
  var ep = earthPositions[pos];
  var tiltDir = -1; /* Earth's axis points the same way in space all year */
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Why do we have seasons?",
    subtitle: "Move Earth around its orbit and watch how the tilt affects sunlight.",
    takeaway: "Seasons are caused by Earth's 23.5-degree axial tilt, which means each hemisphere takes turns leaning towards the Sun and receiving more direct sunlight \u2014 not by how close Earth is to the Sun."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: positions.map(function (p, i) {
      return {
        value: i,
        label: p.label
      };
    }),
    value: pos,
    onChange: function onChange(v) {
      return setPos(Number(v));
    }
  })), /*#__PURE__*/React.createElement("svg", {
    viewBox: "-12 0 304 262",
    width: "100%",
    style: {
      maxWidth: 380,
      display: "block",
      margin: "8px auto"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: 140,
    cy: 120,
    r: 28,
    fill: "url(#sunGlow2)"
  }), /*#__PURE__*/React.createElement("text", {
    x: 140,
    y: 155,
    textAnchor: "middle",
    fontSize: 10,
    fill: "#f7b731",
    fontWeight: "700"
  }, "Sun"), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "sunGlow2",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#ffe060"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#f7b731"
  }))), /*#__PURE__*/React.createElement("ellipse", {
    cx: 140,
    cy: 120,
    rx: 110,
    ry: 90,
    fill: "none",
    stroke: "var(--accent-mid)",
    strokeWidth: 1,
    strokeDasharray: "5,5"
  }), earthPositions.map(function (ep2, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: ep2.x + 10,
      cy: ep2.y,
      r: i === pos ? 14 : 10,
      fill: i === pos ? "#4a90d9" : "var(--accent-soft)",
      stroke: i === pos ? "#2c5f8a" : "var(--accent-mid)",
      strokeWidth: 2,
      opacity: i === pos ? 1 : 0.5
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: ep.x + 10,
    y1: ep.y - 18,
    x2: ep.x + 10 + tiltDir * 8,
    y2: ep.y + 18,
    stroke: "#fff",
    strokeWidth: 2.5
  }), /*#__PURE__*/React.createElement("text", {
    x: ep.x + 10,
    y: ep.y - 26,
    textAnchor: "middle",
    fontSize: 8,
    fill: "#fff"
  }, "N"), /*#__PURE__*/React.createElement("text", {
    x: ep.x + 10,
    y: ep.y + 32,
    textAnchor: "middle",
    fontSize: 8,
    fill: "#ccc"
  }, "S"), /*#__PURE__*/React.createElement("text", {
    x: ep.x + 10,
    y: ep.y + 48,
    textAnchor: "middle",
    fontSize: 9,
    fill: "#4a90d9",
    fontWeight: "700"
  }, "Earth")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#ff634722",
      borderRadius: 10,
      padding: "10px 14px",
      borderLeft: "4px solid #ff6347"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: "#ff6347"
    }
  }, "Southern Hemisphere"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, p.shem)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#4a90d922",
      borderRadius: 10,
      padding: "10px 14px",
      borderLeft: "4px solid #4a90d9"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: "#4a90d9"
    }
  }, "Northern Hemisphere"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, p.nhem))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 14,
      color: "var(--ink)"
    }
  }, p.desc), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Earth's axial tilt"
  }, "Earth is tilted at 23.5 degrees. This tilt does not change direction as Earth orbits the Sun, so each hemisphere takes turns being tilted towards the Sun. That is what causes seasons, not Earth's distance from the Sun."));
}

/* =====================================================================
   SECTION 4 INTERACTIVE: Moon Phase Visualiser
   ===================================================================== */
function MoonPhaseSim() {
  var _useState21 = useState(0),
    _useState22 = _slicedToArray(_useState21, 2),
    day = _useState22[0],
    setDay = _useState22[1];
  var phases = [{
    name: "New Moon",
    day: 0,
    lit: 0,
    side: "none"
  }, {
    name: "Waxing Crescent",
    day: 3.7,
    lit: 0.25,
    side: "left"
  }, {
    name: "First Quarter",
    day: 7.4,
    lit: 0.5,
    side: "left"
  }, {
    name: "Waxing Gibbous",
    day: 11.1,
    lit: 0.75,
    side: "left"
  }, {
    name: "Full Moon",
    day: 14.8,
    lit: 1,
    side: "full"
  }, {
    name: "Waning Gibbous",
    day: 18.5,
    lit: 0.75,
    side: "right"
  }, {
    name: "Last Quarter",
    day: 22.1,
    lit: 0.5,
    side: "right"
  }, {
    name: "Waning Crescent",
    day: 25.8,
    lit: 0.25,
    side: "right"
  }];
  var cycDist = function cycDist(p) {
    var d = Math.abs(p.day - day);
    return Math.min(d, 29.5 - d);
  };
  var phase = phases.reduce(function (best, p) {
    return cycDist(p) < cycDist(best) ? p : best;
  }, phases[0]);
  var moonAngle = day / 29.5 * 2 * Math.PI;
  var cx = 150,
    cy = 100,
    orbitR = 70,
    sunX = 30;
  /* new Moon sits between Earth and the Sun (Sun on the left); full Moon is on the far side */
  var moonX = cx - orbitR * Math.cos(moonAngle);
  var moonY = cy + orbitR * Math.sin(moonAngle) * 0.38;
  function MoonFace(_ref) {
    var x = _ref.x,
      y = _ref.y,
      r = _ref.r,
      litFrac = _ref.litFrac,
      side = _ref.side;
    if (side === "none") return /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: y,
      r: r,
      fill: "#333",
      stroke: "#666",
      strokeWidth: 1
    });
    if (side === "full") return /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: y,
      r: r,
      fill: "#e8e0c8",
      stroke: "#ccc",
      strokeWidth: 1
    });
    var lit = Math.max(0.05, litFrac);
    var rx2 = r * Math.abs(2 * lit - 1);
    var sweep = lit < 0.5 ? side === "right" ? 0 : 1 : side === "right" ? 1 : 0;
    var d = "M ".concat(x, " ").concat(y - r, " A ").concat(r, " ").concat(r, " 0 1 ").concat(side === "right" ? 1 : 0, " ").concat(x, " ").concat(y + r, " A ").concat(rx2, " ").concat(r, " 0 1 ").concat(sweep, " ").concat(x, " ").concat(y - r, " Z");
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: y,
      r: r,
      fill: "#333",
      stroke: "#666",
      strokeWidth: 1
    }), /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "#e8e0c8"
    }));
  }
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Moon phase visualiser",
    subtitle: "Drag the slider through the lunar month and watch the Moon's appearance change. Phases are drawn as seen from Australia.",
    takeaway: "The Moon's phases are caused by the changing angle between the Sun, Moon, and Earth as the Moon orbits Earth, so we see different amounts of the sunlit half. The cycle of phases repeats roughly every 29.5 days."
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Day in lunar cycle",
    min: 0,
    max: 29,
    step: 0.5,
    value: day,
    onChange: setDay,
    unit: " days"
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 280 220",
    width: "100%",
    style: {
      maxWidth: 380,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: sunX,
    cy: cy,
    r: 18,
    fill: "#f7b731"
  }), /*#__PURE__*/React.createElement("text", {
    x: sunX,
    y: cy + 32,
    textAnchor: "middle",
    fontSize: 9,
    fill: "#f7b731",
    fontWeight: "700"
  }, "Sun"), /*#__PURE__*/React.createElement("ellipse", {
    cx: cx,
    cy: cy,
    rx: orbitR,
    ry: orbitR * 0.38,
    fill: "none",
    stroke: "var(--accent-mid)",
    strokeWidth: 1,
    strokeDasharray: "3,3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 9,
    fill: "#4a90d9"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 14,
    y: cy + 4,
    fontSize: 9,
    fill: "#4a90d9"
  }, "Earth"), /*#__PURE__*/React.createElement(MoonFace, {
    x: moonX,
    y: moonY,
    r: 11,
    litFrac: phase.lit,
    side: phase.side
  }), /*#__PURE__*/React.createElement("text", {
    x: moonX,
    y: moonY - 18,
    textAnchor: "middle",
    fontSize: 8,
    fill: "var(--ink)"
  }, phase.name), /*#__PURE__*/React.createElement("text", {
    x: 140,
    y: 190,
    textAnchor: "middle",
    fontSize: 10,
    fill: "var(--ink-muted)"
  }, "Lunar cycle: approximately 29.5 days"), /*#__PURE__*/React.createElement("text", {
    x: 140,
    y: 205,
    textAnchor: "middle",
    fontSize: 9,
    fill: "var(--accent-deep)"
  }, "Day ", day.toFixed(1), ": ", phase.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center",
      marginTop: 6
    }
  }, phases.map(function (p, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "btn ".concat(phase.name === p.name ? "btn-accent" : "btn-ghost"),
      style: {
        fontSize: 11,
        padding: "4px 10px"
      },
      onClick: function onClick() {
        return setDay(p.day);
      }
    }, p.name);
  })));
}

/* =====================================================================
   SECTION 4 INTERACTIVE: Eclipse Aligner
   ===================================================================== */
function EclipseAligner() {
  var _useState23 = useState(20),
    _useState24 = _slicedToArray(_useState23, 2),
    moonOffset = _useState24[0],
    setMoonOffset = _useState24[1];
  var cx = 180,
    cy = 100;
  var sunX = 30,
    sunY = 100;
  var moonX = cx + moonOffset - 10;
  /* In line with the Sun and Earth for a solar (<= 6) or lunar (>= 26) eclipse; otherwise the Moon passes above the line (tilted orbit) */
  var moonY = moonOffset <= 6 || moonOffset >= 26 ? 100 : 100 - 50 * Math.sqrt(Math.sin(Math.PI * (moonOffset - 6) / 20));
  var solarEclipse = moonOffset < 6;
  var lunarEclipse = moonOffset > 26;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Eclipse aligner",
    subtitle: "Slide the Moon into perfect alignment to cause an eclipse. Watch the shadow form.",
    takeaway: "Eclipses only happen when the Sun, Earth, and Moon line up precisely, which is rare because the Moon's orbit is tilted about 5 degrees so most new and full Moons pass above or below the shadow."
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Moon's orbital position",
    min: -30,
    max: 60,
    step: 1,
    value: moonOffset,
    onChange: setMoonOffset
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 340 200",
    width: "100%",
    style: {
      maxWidth: 420,
      display: "block",
      margin: "8px auto"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "sunGlowE",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#ffe060"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "80%",
    stopColor: "#f7b731"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#f7b73100"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: sunX + 30,
    cy: sunY,
    r: 32,
    fill: "url(#sunGlowE)"
  }), /*#__PURE__*/React.createElement("text", {
    x: sunX + 30,
    y: sunY + 46,
    textAnchor: "middle",
    fontSize: 9,
    fill: "#f7b731",
    fontWeight: "700"
  }, "Sun"), solarEclipse && /*#__PURE__*/React.createElement("ellipse", {
    cx: cx - 40,
    cy: cy,
    rx: 90,
    ry: 20,
    fill: "#33333355"
  }), lunarEclipse && /*#__PURE__*/React.createElement("ellipse", {
    cx: cx + 80,
    cy: cy,
    rx: 90,
    ry: 20,
    fill: "#33333366"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 20,
    fill: "#4a90d9",
    stroke: "#2c5f8a",
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 32,
    textAnchor: "middle",
    fontSize: 9,
    fill: "#4a90d9",
    fontWeight: "700"
  }, "Earth"), /*#__PURE__*/React.createElement("circle", {
    cx: moonX,
    cy: moonY,
    r: 10,
    fill: solarEclipse || lunarEclipse ? "#222" : "#ccc",
    stroke: "#999",
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement("text", {
    x: moonX,
    y: moonY - 17,
    textAnchor: "middle",
    fontSize: 8,
    fill: "var(--ink-muted)"
  }, "Moon"), solarEclipse && /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 170,
    textAnchor: "middle",
    fontSize: 10,
    fill: "var(--ink)",
    fontWeight: "700"
  }, "Solar eclipse! Moon blocks sunlight from Earth."), lunarEclipse && /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 170,
    textAnchor: "middle",
    fontSize: 10,
    fill: "var(--ink)",
    fontWeight: "700"
  }, "Lunar eclipse! Earth blocks sunlight from Moon."), !solarEclipse && !lunarEclipse && /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: 170,
    textAnchor: "middle",
    fontSize: 10,
    fill: "var(--ink-muted)"
  }, "No eclipse. The Moon is tilted off the shadow line.")), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Why not every month?"
  }, "The Moon's orbit is tilted about 5 degrees compared to Earth's orbit around the Sun. So most new and full Moons, the Moon passes just above or below the shadow line and no eclipse happens."));
}

/* =====================================================================
   SECTION 5 INTERACTIVE: Indigenous Sky Calendar
   ===================================================================== */
function SkyCalendarSim() {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var events = [{
    month: 3,
    label: "Emu in the Sky",
    desc: "The Emu in the Sky lies flat near the horizon. Emu eggs are ready to collect.",
    group: "Many groups (southern Australia)",
    color: "#8B4513"
  }, {
    month: 4,
    label: "Pleiades rise (Karakarook)",
    desc: "The Boorong people know it is eel harvesting season and cold, wet weather is coming.",
    group: "Boorong, Victoria",
    color: "#1a6b8a"
  }, {
    month: 4,
    label: "Pleiades (Torres Strait)",
    desc: "Torres Strait Islander peoples know the trade wind season is beginning.",
    group: "Torres Strait",
    color: "#2a8a4a"
  }, {
    month: 10,
    label: "Kambarang season",
    desc: "Noongar people of south-west WA know wildflowers are blooming and the warm, dry season is arriving.",
    group: "Noongar, WA",
    color: "#c2783c"
  }, {
    month: 11,
    label: "Birak season begins",
    desc: "Noongar people know hot, dry weather with sea breezes is approaching.",
    group: "Noongar, WA",
    color: "#e05a2b"
  }];
  var _useState25 = useState(null),
    _useState26 = _slicedToArray(_useState25, 2),
    active = _useState26[0],
    setActive = _useState26[1];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Indigenous sky calendar",
    subtitle: "Click a month to see which astronomical signals Aboriginal and Torres Strait Islander peoples used.",
    takeaway: "Aboriginal and Torres Strait Islander peoples used predictable changes in the night sky, such as the rising of star clusters and the shape of the Milky Way, as a reliable calendar to signal seasons, food availability, and ecological events."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      justifyContent: "center",
      marginBottom: 14
    }
  }, months.map(function (m, i) {
    var ev = events.find(function (e) {
      return e.month === i;
    });
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "btn ".concat(active === i ? "btn-accent" : ev ? "btn-ghost" : "btn-ghost"),
      style: {
        minWidth: 44,
        fontSize: 12,
        padding: "6px 8px",
        background: active === i ? "var(--accent-deep)" : ev ? "var(--accent-soft)" : undefined,
        borderColor: ev ? ev.color : undefined,
        color: active === i ? "#fff" : undefined
      },
      onClick: function onClick() {
        return setActive(active === i ? null : i);
      }
    }, m);
  })), active !== null && function () {
    var ev = events.find(function (e) {
      return e.month === active;
    });
    return ev ? /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--accent-soft)",
        borderRadius: 12,
        padding: "14px 16px",
        borderLeft: "4px solid ".concat(ev.color)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        marginBottom: 4,
        color: ev.color
      }
    }, ev.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        marginBottom: 6
      }
    }, ev.desc), /*#__PURE__*/React.createElement("div", {
      className: "chip",
      style: {
        fontSize: 11
      }
    }, ev.group)) : /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface)",
        borderRadius: 12,
        padding: "14px 16px",
        color: "var(--ink-muted)",
        fontSize: 13
      }
    }, "No specific event recorded for ", months[active], " in this example set.");
  }(), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginTop: 10,
      marginBottom: 0,
      fontSize: 12
    }
  }, "This is a simplified sample. Indigenous astronomical knowledge is vast, diverse, and belongs to specific communities."));
}

/* =====================================================================
   SECTION 6 INTERACTIVE: JWST vs Hubble Capability Comparison
   ===================================================================== */
function TelescopeCompare() {
  var _useState27 = useState("jwst"),
    _useState28 = _slicedToArray(_useState27, 2),
    selected = _useState28[0],
    setSelected = _useState28[1];
  var scopes = {
    eye: {
      name: "Unaided eye",
      mirror: "~0.007 m (pupil)",
      wavelength: "Visible only",
      location: "Your head",
      limit: "~mag 6",
      discovery: "Moon phases, bright planets, ~5,000 stars",
      color: "#8B6914"
    },
    hubble: {
      name: "Hubble Space Telescope",
      mirror: "2.4 m",
      wavelength: "Visible + UV + near-IR",
      location: "570 km above Earth",
      limit: "~mag 31",
      discovery: "Dark energy, Hubble constant, thousands of galaxies",
      color: "#2c5f8a"
    },
    jwst: {
      name: "James Webb Space Telescope",
      mirror: "6.5 m",
      wavelength: "Primarily infrared",
      location: "1.5 million km from Earth (L2)",
      limit: "~mag 34 (infrared)",
      discovery: "Earliest galaxies, exoplanet atmospheres, hidden star birth",
      color: "#6c2a8a"
    }
  };
  var sc = scopes[selected];
  var mirrorSizes = {
    eye: 2,
    hubble: 20,
    jwst: 54
  };
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Telescope capability explorer",
    subtitle: "Compare what each tool can see. Select an instrument below.",
    takeaway: "Larger mirrors and the ability to detect infrared light let the JWST see far fainter and more distant objects than either the unaided eye or the Hubble Space Telescope."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: [{
      value: "eye",
      label: "Unaided eye"
    }, {
      value: "hubble",
      label: "Hubble"
    }, {
      value: "jwst",
      label: "JWST"
    }],
    value: selected,
    onChange: setSelected
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    width: "100",
    height: "100"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: 60,
    cy: 60,
    r: mirrorSizes[selected],
    fill: sc.color,
    opacity: 0.7
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 60,
    cy: 60,
    r: mirrorSizes[selected],
    fill: "none",
    stroke: sc.color,
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("text", {
    x: 60,
    y: 65,
    textAnchor: "middle",
    fontSize: 10,
    fill: "var(--ink)",
    fontWeight: "700"
  }, sc.mirror), /*#__PURE__*/React.createElement("text", {
    x: 60,
    y: 108,
    textAnchor: "middle",
    fontSize: 9,
    fill: "var(--ink-muted)"
  }, "Mirror size")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 180
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: sc.color,
      marginBottom: 8
    }
  }, sc.name), [{
    label: "Mirror diameter",
    val: sc.mirror
  }, {
    label: "Light detected",
    val: sc.wavelength
  }, {
    label: "Location",
    val: sc.location
  }, {
    label: "Faintest objects",
    val: sc.limit
  }].map(function (row) {
    return /*#__PURE__*/React.createElement("div", {
      key: row.label,
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 5,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ink-muted)",
        minWidth: 130
      }
    }, row.label, ":"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600
      }
    }, row.val));
  }))), /*#__PURE__*/React.createElement(Callout, {
    kind: "success",
    title: "Key discoveries"
  }, sc.discovery));
}

/* =====================================================================
   SECTIONS
   ===================================================================== */

function Section1(_ref2) {
  var progress = _ref2.progress,
    setProgress = _ref2.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "1.1 Nature of Science"), /*#__PURE__*/React.createElement("h1", null, "How science builds knowledge"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Science is our most powerful tool for understanding the universe. Find out how it actually works.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.1.1",
    title: "The purpose of science",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Have you ever wondered why the Moon changes shape, or why stars twinkle? Science gives us a way to find out. The purpose of science is to build reliable ", /*#__PURE__*/React.createElement(Term, {
    def: "Knowledge supported by evidence that can be tested and checked by others."
  }, "knowledge"), " about the natural world and the universe through ", /*#__PURE__*/React.createElement(Term, {
    def: "Watching and recording natural phenomena carefully."
  }, "observation"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "Designing a test to check whether an explanation is correct."
  }, "experimentation"), ", and ", /*#__PURE__*/React.createElement(Term, {
    def: "Looking for patterns and drawing conclusions from data."
  }, "analysis"), "."), /*#__PURE__*/React.createElement("p", null, "Unlike guesses or opinions, scientific knowledge is constantly tested against evidence. If better evidence comes along, the knowledge gets updated. That self-correcting quality is what makes science so trustworthy. In astronomy, because scientists cannot land on distant stars, almost everything we know comes from carefully studying light and other signals that reach us from space."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Science in a nutshell"
  }, "Observe carefully. Ask a testable question. Design an investigation. Collect and analyse data. Share findings with other scientists so they can check and build on the work."), /*#__PURE__*/React.createElement(InquiryCycleAnim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "What is the main purpose of science?",
    options: ["To prove that experts are always right", "To build reliable knowledge through evidence", "To invent new technology", "To answer every possible question"],
    correct: 1,
    explain: "Science builds reliable knowledge using evidence from observation and experiment. It cannot answer every question, especially questions about values."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 2,
    question: "Give one reason why scientific knowledge is considered more reliable than personal opinion.",
    model: "Scientific knowledge is tested against evidence by many independent scientists, and it is revised when new evidence shows it is wrong. Personal opinion does not have to be tested or revised."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.1.2",
    title: "Branches of science and interdisciplinary thinking",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Science is organised into broad branches. ", /*#__PURE__*/React.createElement(Term, {
    def: "The study of living things, their structure, function, and interactions."
  }, "Biology"), " explores living organisms. ", /*#__PURE__*/React.createElement(Term, {
    def: "The study of matter, its properties, and chemical reactions."
  }, "Chemistry"), " investigates matter and its changes. ", /*#__PURE__*/React.createElement(Term, {
    def: "The study of energy, forces, and fundamental laws of nature."
  }, "Physics"), " covers forces, motion, light, and gravity. ", /*#__PURE__*/React.createElement(Term, {
    def: "The study of Earth's structure, history, and the processes that shape it."
  }, "Geology"), " studies rocks, minerals, and Earth's history."), /*#__PURE__*/React.createElement("p", null, "Modern science rarely stays inside just one branch. Understanding whether life could exist on Mars requires biology (what conditions life needs), chemistry (what molecules are present), physics (radiation and temperature), and geology (is there liquid water or rock that could shelter microbes?). When scientists combine more than one branch, we call it ", /*#__PURE__*/React.createElement(Term, {
    def: "Drawing on knowledge and methods from more than one scientific branch to tackle a problem."
  }, "interdisciplinary"), " science."), /*#__PURE__*/React.createElement(Figure, {
    caption: "The four major science branches and how space science draws on all of them."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 560 100",
    width: "100%",
    style: {
      maxWidth: 560
    }
  }, [["Biology", "Living things", "#27ae60"], ["Chemistry", "Matter", "#8e44ad"], ["Physics", "Energy", "#2980b9"], ["Geology", "Earth history", "#c0392b"]].map(function (_ref3, i) {
    var _ref4 = _slicedToArray(_ref3, 3),
      name = _ref4[0],
      sub = _ref4[1],
      color = _ref4[2];
    return /*#__PURE__*/React.createElement("g", {
      key: name,
      transform: "translate(".concat(i * 140 + 4, ", 10)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: 128,
      height: 60,
      rx: 12,
      fill: color + "22",
      stroke: color,
      strokeWidth: 2
    }), /*#__PURE__*/React.createElement("text", {
      x: 64,
      y: 26,
      textAnchor: "middle",
      fontSize: 13,
      fontWeight: "700",
      fill: color
    }, name), /*#__PURE__*/React.createElement("text", {
      x: 64,
      y: 46,
      textAnchor: "middle",
      fontSize: 11,
      fill: "var(--ink)"
    }, sub), i < 3 && /*#__PURE__*/React.createElement("text", {
      x: 140,
      y: 34,
      textAnchor: "middle",
      fontSize: 18,
      fill: "var(--accent-deep)"
    }, "+"));
  }), /*#__PURE__*/React.createElement("text", {
    x: 280,
    y: 92,
    textAnchor: "middle",
    fontSize: 11,
    fill: "var(--ink-muted)"
  }, "Space science draws on all four branches."))), /*#__PURE__*/React.createElement(BranchSorter, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "A scientist asks: 'Could microscopic life survive in the icy ocean of Jupiter's moon Europa?' Which branches of science does this question draw on?",
    options: ["Only biology", "Only physics and chemistry", "Biology, chemistry, physics, and geology", "Only geology"],
    correct: 2,
    explain: "Understanding a potential habitat requires biology (life's needs), chemistry (what molecules exist), physics (heat sources and pressure), and geology (the structure of the icy crust)."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.1.3",
    title: "Science is collaborative",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Almost all important modern science is done by teams. Scientists share their work in ", /*#__PURE__*/React.createElement(Term, {
    def: "A research paper checked by independent experts before it is published."
  }, "peer-reviewed publications"), " so others can check, challenge, and build on it. This sharing is what makes science ", /*#__PURE__*/React.createElement(Term, {
    def: "Each new discovery adds to a growing store of knowledge, building on what came before."
  }, "cumulative"), ": every generation of scientists stands on the shoulders of the ones before."), /*#__PURE__*/React.createElement("p", null, "When Edwin Hubble showed that galaxies are moving away from each other, he was building on Einstein's equations and earlier measurements by other astronomers. The James Webb Space Telescope needed engineers and scientists from the United States, Europe, and Canada working together for decades. No single person could have built it alone."), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Giant collaborative science"
  }, "The International Space Station has been lived in continuously since 2000. It involves space agencies from 15 countries and thousands of scientists and engineers."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 4,
    question: "Why is peer review important in science?",
    options: ["It helps scientists keep their discoveries secret", "It lets independent experts check for errors before findings are accepted", "It proves that all scientific results are correct", "It gives scientists extra funding"],
    correct: 1,
    explain: "Peer review means independent experts check the methods and conclusions of a study before it is published, reducing errors and increasing confidence in the results."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 5,
    question: "Explain why the JWST required international collaboration rather than a single country building it alone.",
    model: "The cost and technical complexity of the JWST were too large for any single country or agency. Collaboration allowed NASA, ESA, and CSA to share costs, combine technical expertise, and contribute different instruments and systems."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.1.4",
    title: "Scientific theories and laws",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "In everyday conversation, a \"theory\" often means a guess. In science, it means something much stronger. A ", /*#__PURE__*/React.createElement(Term, {
    def: "A well-tested explanation for a wide range of related observations, supported by substantial evidence."
  }, "scientific theory"), " is a robust, widely accepted explanation backed by years of testing by many scientists. The Big Bang theory and the theory of evolution are two examples."), /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A precise statement, often mathematical, describing a pattern in nature under specific conditions."
  }, "scientific law"), " is different: it describes what happens reliably but does not explain why. Newton's Law of Universal Gravitation tells us exactly how strongly two masses attract each other. It does not explain what gravity actually is at a deeper level, but it is so precise that it can predict exactly where a spacecraft will be years into the future."), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Theory does not mean guess"
  }, "Never confuse the everyday meaning of \"theory\" with the scientific meaning. A scientific theory has survived thousands of tests by independent scientists. It is far more reliable than a guess."), /*#__PURE__*/React.createElement(Figure, {
    caption: "From observation to theory: how evidence accumulates over time."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 560 66",
    width: "100%",
    style: {
      maxWidth: 560
    }
  }, ["Many observations", "Hypothesis", "Repeated tests", "Evidence grows", "Theory formed", "New predictions"].map(function (s, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: s,
      transform: "translate(".concat(i * 94 + 2, ", 8)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: 86,
      height: 40,
      rx: 9,
      fill: "var(--accent-soft)",
      stroke: "var(--accent-deep)",
      strokeWidth: 1.5
    }), /*#__PURE__*/React.createElement("text", {
      x: 43,
      y: 24,
      textAnchor: "middle",
      fontSize: 10,
      fill: "var(--ink)"
    }, s), i < 5 && /*#__PURE__*/React.createElement("text", {
      x: 93,
      y: 24,
      textAnchor: "middle",
      fontSize: 16,
      fill: "var(--accent-deep)"
    }, "\u203A"));
  }))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: "Which statement correctly describes a scientific theory?",
    options: ["A guess that has not been tested yet", "A precise mathematical description of a pattern", "A well-tested explanation supported by substantial evidence", "A law that cannot be changed"],
    correct: 2,
    explain: "A scientific theory is a well-tested explanation for a wide range of observations. It is not a guess, and it can be revised if new evidence demands it."
  }))));
}
function Section2(_ref5) {
  var progress = _ref5.progress,
    setProgress = _ref5.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "1.2 Practice of Science"), /*#__PURE__*/React.createElement("h1", null, "Doing science: skills and tools"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Science is a set of skills and habits. Learn the tools scientists use to make reliable measurements and draw honest conclusions.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.2.1",
    title: "Working scientifically",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Scientists do not just wander around hoping to discover things. They follow a set of practices called the ", /*#__PURE__*/React.createElement(Term, {
    def: "The six key processes NSW scientists use: questioning, planning, conducting, processing, problem-solving, and communicating."
  }, "Working Scientifically processes"), ". The six processes are: questioning and predicting; planning investigations; conducting investigations; processing and analysing data; problem-solving; and communicating."), /*#__PURE__*/React.createElement("p", null, "These processes do not always happen in a neat line. A surprising result might send you back to redesign your experiment. New data might raise fresh questions. That is completely normal. The key thing is being systematic and honest at each step."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Working Scientifically in astronomy"
  }, "When studying the night sky you cannot run a controlled experiment on a star. Astronomers use systematic observation instead, recording data carefully over long periods so patterns emerge."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 7,
    question: "A student gets a result that contradicts their hypothesis. What should they do next?",
    options: ["Ignore the result and report the original hypothesis", "Use problem-solving to figure out why and consider redesigning the investigation", "Report the result as an error", "Stop the investigation immediately"],
    correct: 1,
    explain: "An unexpected result is not a failure. Scientists use problem-solving to decide whether there was an error or whether the hypothesis needs to be revised."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.2.2",
    title: "Analog and digital measuring instruments",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "Instruments that display values on a continuous scale or dial, like a ruler or mercury thermometer."
  }, "Analog instruments"), " show measurements using a dial or scale, for example a ruler or mercury thermometer. ", /*#__PURE__*/React.createElement(Term, {
    def: "Instruments that display measurements as numbers on a screen, like a digital thermometer or GPS device."
  }, "Digital instruments"), " show a precise number on a screen, like a digital thermometer or GPS device."), /*#__PURE__*/React.createElement("p", null, "Three things matter when choosing an instrument. The ", /*#__PURE__*/React.createElement(Term, {
    def: "The minimum to maximum values an instrument can reliably measure."
  }, "range"), " tells you the largest and smallest values it can handle. The ", /*#__PURE__*/React.createElement(Term, {
    def: "The smallest change in a quantity an instrument can detect."
  }, "sensitivity"), " tells you the smallest change it can pick up. The ", /*#__PURE__*/React.createElement(Term, {
    def: "How close a measurement is to the true value of what you are measuring."
  }, "accuracy"), " tells you how close it gets to the true value. Telescopes use digital ", /*#__PURE__*/React.createElement(Term, {
    def: "A highly sensitive digital image sensor used in telescopes to detect very faint light."
  }, "CCD detectors"), " because they are far more sensitive than the human eye, letting astronomers see objects billions of times fainter than we can without a telescope."), /*#__PURE__*/React.createElement(InstrumentSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 8,
    question: "A digital thermometer reads 23.1, 23.1, and 23.0 degrees C in three tests. Which word best describes these results?",
    options: ["Accurate", "Precise", "Inaccurate", "Random"],
    correct: 1,
    explain: "The results are very consistent with each other, so they are precise. Precision does not guarantee accuracy. If the thermometer is not calibrated correctly, all three values could be wrong by the same amount."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.2.3",
    title: "Senses vs instruments",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Your senses are always with you and need no power, but they have important limits. Senses cannot detect ", /*#__PURE__*/React.createElement(Term, {
    def: "Waves of energy that include radio waves, infrared, visible light and ultraviolet. Human senses can only detect the visible part."
  }, "electromagnetic radiation"), " outside the visible range. They give no precise number. And two people can look at the same star and disagree on its colour or brightness because perception varies from person to person."), /*#__PURE__*/React.createElement("p", null, "Scientific instruments produce ", /*#__PURE__*/React.createElement(Term, {
    def: "Giving the same result each time when measuring the same quantity under the same conditions."
  }, "reliable"), " and objective measurements. A photometer can measure a star's brightness to within 0.001 magnitudes. No human eye could do that. In astronomy, digital detectors began replacing photographic film in the 1980s because they are enormously more sensitive and produce consistent, quantitative data."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Reliability means consistency"
  }, "An instrument is reliable if it gives the same result every time you measure the same thing under the same conditions. Human observations are less reliable because mood, fatigue, and expectations affect what we notice."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Comparing senses and instruments across four key qualities."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 520 120",
    width: "100%",
    style: {
      maxWidth: 520
    }
  }, [["Range", "Limited to visible", "Far beyond human senses"], ["Precision", "Estimates only", "Precise numbers"], ["Reliability", "Variable", "High when calibrated"], ["Objectivity", "Subjective", "Independent of observer"]].map(function (_ref6, i) {
    var _ref7 = _slicedToArray(_ref6, 3),
      feat = _ref7[0],
      sense = _ref7[1],
      instr = _ref7[2];
    return /*#__PURE__*/React.createElement("g", {
      key: feat,
      transform: "translate(0, ".concat(i * 26 + 8, ")")
    }, /*#__PURE__*/React.createElement("text", {
      x: 110,
      y: 14,
      textAnchor: "end",
      fontSize: 11,
      fill: "var(--ink)",
      fontWeight: "700"
    }, feat), /*#__PURE__*/React.createElement("rect", {
      x: 118,
      y: 2,
      width: 160,
      height: 18,
      rx: 5,
      fill: "#f7b73122",
      stroke: "#f7b731",
      strokeWidth: 1.5
    }), /*#__PURE__*/React.createElement("text", {
      x: 198,
      y: 14,
      textAnchor: "middle",
      fontSize: 10,
      fill: "var(--ink)"
    }, sense), /*#__PURE__*/React.createElement("rect", {
      x: 290,
      y: 2,
      width: 220,
      height: 18,
      rx: 5,
      fill: "var(--accent-soft)",
      stroke: "var(--accent-deep)",
      strokeWidth: 1.5
    }), /*#__PURE__*/React.createElement("text", {
      x: 400,
      y: 14,
      textAnchor: "middle",
      fontSize: 10,
      fill: "var(--ink)"
    }, instr));
  }), /*#__PURE__*/React.createElement("text", {
    x: 198,
    y: 118,
    textAnchor: "middle",
    fontSize: 10,
    fill: "#f7b731",
    fontWeight: "700"
  }, "Human senses"), /*#__PURE__*/React.createElement("text", {
    x: 400,
    y: 118,
    textAnchor: "middle",
    fontSize: 10,
    fill: "var(--accent-deep)",
    fontWeight: "700"
  }, "Scientific instruments"))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 9,
    question: "Why did astronomers switch from photographic film to digital CCD detectors?",
    options: ["CCD detectors are cheaper", "CCDs are far more sensitive and produce quantitative digital data", "Film can see infrared light that CCDs cannot", "CCDs make prettier pictures"],
    correct: 1,
    explain: "CCD detectors are enormously more sensitive than film, have a wider dynamic range, and produce digital data that computers can directly analyse. They detect much fainter objects than film ever could."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.2.4",
    title: "Observation, inference, and prediction",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "An ", /*#__PURE__*/React.createElement(Term, {
    def: "A direct measurement or description of something detected by senses or instruments."
  }, "observation"), " is simply what you detect directly. An ", /*#__PURE__*/React.createElement(Term, {
    def: "A logical conclusion drawn from one or more observations, going beyond what was directly measured."
  }, "inference"), " is an explanation you work out from those observations. A ", /*#__PURE__*/React.createElement(Term, {
    def: "A specific statement about what will happen under new conditions, based on an inference, which can be tested."
  }, "testable prediction"), " is a specific claim about what will happen next, which you can check."), /*#__PURE__*/React.createElement("p", null, "Here is a real example. Astronomers noticed that light from distant galaxies is shifted towards the red end of the spectrum. They inferred that these galaxies are moving away from us (the ", /*#__PURE__*/React.createElement(Term, {
    def: "The change in frequency of a wave caused by relative motion between the source and the observer."
  }, "Doppler effect"), " stretches light from a receding source). They predicted that more distant galaxies should show a greater redshift. When they measured it, they confirmed the prediction. This led directly to the discovery that the universe is expanding."), /*#__PURE__*/React.createElement(ObsInferPred, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 10,
    question: "A student observes that a star appears to dim slightly every 365 days like clockwork. Write an inference and a testable prediction based on this observation.",
    model: "Inference: a planet is probably orbiting the star and passing in front of it, blocking some light (this is called the transit method). Testable prediction: the brightness should dip by the same amount every 365 days. Longer telescope observations should confirm the regular pattern and allow us to estimate the planet's size from how much light is blocked."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.2.5",
    title: "Systematic observation and controlled experiments",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Scientists choose their research method based on the type of question. A ", /*#__PURE__*/React.createElement(Term, {
    def: "An investigation where one variable is deliberately changed, one is measured, and all others are kept the same."
  }, "controlled experiment"), " works when you can deliberately change one thing at a time in a lab. The variable you change is called the ", /*#__PURE__*/React.createElement(Term, {
    def: "The variable deliberately changed by the scientist."
  }, "independent variable"), ". The variable you measure is the ", /*#__PURE__*/React.createElement(Term, {
    def: "The variable measured to see the effect of changing the independent variable."
  }, "dependent variable"), ". All other factors you keep the same are ", /*#__PURE__*/React.createElement(Term, {
    def: "Variables kept constant in an experiment so they do not affect the result."
  }, "controlled variables"), "."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "Recording observations using a consistent method at regular intervals over a long period."
  }, "Systematic observation"), " is used when you cannot control the thing you are studying. Astronomers cannot change how a star behaves, so they watch and record it consistently over time. Long-term sunspot records dating back to 1610 revealed an approximately 11-year solar cycle that no single short experiment could have found."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Seasons investigation"
  }, "A lamp-and-card experiment where you change the angle of a light beam models how seasons work on Earth. The angle of the lamp is the independent variable. The temperature rise of the card is the dependent variable. The distance from lamp to card must be kept constant as a controlled variable."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 11,
    question: "In an investigation testing how the angle of sunlight affects surface temperature, which is the independent variable?",
    options: ["The temperature rise of the card", "The distance from the lamp to the card", "The angle of the lamp to the card surface", "The room temperature"],
    correct: 2,
    explain: "The independent variable is the one you deliberately change. In this investigation, you change the angle of the lamp. You measure the temperature rise, which is the dependent variable."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.2.6",
    title: "Conducting safe investigations",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Before any investigation you need to identify hazards and manage them. Following the method step by step makes your investigation ", /*#__PURE__*/React.createElement(Term, {
    def: "Able to be repeated by another scientist using the same method and obtaining similar results."
  }, "reproducible"), ". Only change one variable at a time in a fair test, or you will not be able to tell which change caused which effect."), /*#__PURE__*/React.createElement("p", null, "A sunlight angle investigation models how Earth's seasons work. When the lamp is directly above the card (90 degrees), the light is concentrated on a small area and the card heats up most. At a lower angle (say 30 degrees) the same light energy is spread over a larger area, so each bit of surface gets less energy and heats up less. On Earth, this is exactly what happens at different latitudes and at different times of year."), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Fair test"
  }, "Only one variable should change at a time. If you accidentally move the lamp closer while also changing the angle, you will not know which change caused the result."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 12,
    question: "Why does sunlight at a low angle (near the horizon in winter) warm the ground less than sunlight at a high angle (overhead in summer)?",
    model: "At a low angle, the same amount of light energy is spread over a much larger surface area. Each square metre of ground receives less energy, so it heats up less. At a high angle, the energy is concentrated on a smaller area, delivering more energy per square metre and heating the surface more effectively."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.2.7",
    title: "Observing change over time",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A single measurement is like one frame of a film. You need a series of measurements to see the story. Tracking the Moon's phases over four weeks, recording the Moon's shape each clear night, reveals the approximately 29.5-day ", /*#__PURE__*/React.createElement(Term, {
    def: "The time for the Moon to complete one full sequence of phases from new Moon back to new Moon."
  }, "lunar cycle"), "."), /*#__PURE__*/React.createElement("p", null, "To make reliable observations over time, use the same method and instrument each time, record the date and time, and organise your data in a table. Then graph the results to spot the pattern. Consistent long-term records like this led to the discovery of the 11-year sunspot cycle, something no short experiment could have revealed."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Moon phase journal"
  }, "On each clear night, sketch the lit shape of the Moon and shade the dark part. After four weeks you will be able to see the whole cycle laid out in order. The interval between two full Moons gives you the cycle length."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 13,
    question: "Why are a series of observations over time more useful than a single observation?",
    options: ["They are easier to record", "They reveal patterns, trends, and cycles that a single measurement cannot show", "They are more accurate", "They require less equipment"],
    correct: 1,
    explain: "A single observation captures one moment. A series of observations shows how something changes, revealing patterns (like the lunar phase cycle) or trends (like cooling over time)."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.2.8",
    title: "Graphs, trends, and conclusions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Once you have data, you need to display it clearly. Use a ", /*#__PURE__*/React.createElement(Term, {
    def: "A graph where both axes are continuous and numerical, used to show change over time or relationships between variables."
  }, "line graph"), " when both variables are continuous numbers (like temperature over time). Use a ", /*#__PURE__*/React.createElement(Term, {
    def: "A graph where one axis has categories, used to compare groups."
  }, "bar chart"), " when one axis has separate categories (like comparing orbital periods of different planets). A conclusion must stick to what the data actually shows, nothing more."), /*#__PURE__*/React.createElement("p", null, "Graphs reveal ", /*#__PURE__*/React.createElement(Term, {
    def: "A general, consistent direction of change in data, such as a steady increase or decrease."
  }, "trends"), " and ", /*#__PURE__*/React.createElement(Term, {
    def: "A consistent link between two variables shown in data."
  }, "relationships"), ". Plotting the orbital period of each planet against its distance from the Sun reveals that planets further away take much longer to complete one orbit. This relationship is known as Kepler's third law."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Orbital periods of six planets (inner to outer solar system)."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 540 180",
    width: "100%",
    style: {
      maxWidth: 540
    }
  }, function () {
    var data = [["Mercury", 0.24, "#aaa"], ["Venus", 0.62, "#e2b97e"], ["Earth", 1.0, "#4a90d9"], ["Mars", 1.88, "#e74c3c"], ["Jupiter", 11.86, "#f0a500"], ["Saturn", 29.46, "#c2a060"]];
    var maxV = 30;
    var barW = 68,
      gap = 14,
      h = 120;
    return data.map(function (_ref8, i) {
      var _ref9 = _slicedToArray(_ref8, 3),
        name = _ref9[0],
        val = _ref9[1],
        color = _ref9[2];
      var barH = val / maxV * h;
      return /*#__PURE__*/React.createElement("g", {
        key: name,
        transform: "translate(".concat(i * (barW + gap) + 18, ", 10)")
      }, /*#__PURE__*/React.createElement("rect", {
        y: h - barH,
        width: barW,
        height: barH,
        rx: 5,
        fill: color,
        opacity: 0.85
      }), /*#__PURE__*/React.createElement("text", {
        x: barW / 2,
        y: h - barH - 6,
        textAnchor: "middle",
        fontSize: 10,
        fill: "var(--ink)",
        fontWeight: "700"
      }, val), /*#__PURE__*/React.createElement("text", {
        x: barW / 2,
        y: h + 14,
        textAnchor: "middle",
        fontSize: 10,
        fill: "var(--ink)"
      }, name), /*#__PURE__*/React.createElement("text", {
        x: barW / 2,
        y: h + 26,
        textAnchor: "middle",
        fontSize: 8,
        fill: "var(--ink-muted)"
      }, "Earth years"));
    });
  }(), /*#__PURE__*/React.createElement("text", {
    x: 270,
    y: 170,
    textAnchor: "middle",
    fontSize: 10,
    fill: "var(--ink-muted)"
  }, "Planets further from the Sun take much longer to complete one orbit."))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 14,
    question: "A scientist graphs temperature against time as a beaker of water cools. Which type of graph is most appropriate?",
    options: ["Pie chart", "Bar chart", "Line graph", "Scatter diagram with no line"],
    correct: 2,
    explain: "A line graph is used when both variables are continuous numbers and you want to show how one changes as the other changes. Temperature and time are both continuous, so a line graph is correct."
  }))));
}
function Section3(_ref0) {
  var progress = _ref0.progress,
    setProgress = _ref0.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "1.3 Space Science"), /*#__PURE__*/React.createElement("h1", null, "The Sun, Earth, Moon, and beyond"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Our place in the solar system explains almost everything we see in the sky.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/earth-sun.png",
    caption: "Earth orbits the Sun with its axis tilted \u2014 one half in daylight, the other in night."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.3.1",
    title: "Historical solar system models",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "For over 1,400 years, almost everyone believed Earth sat at the centre of the universe. This was the ", /*#__PURE__*/React.createElement(Term, {
    def: "The Earth-centred model of the solar system, developed by Ptolemy around 150 CE."
  }, "geocentric model"), ", developed by the Greek philosopher Ptolemy. It matched everyday experience (the sky looks like it moves around a stationary Earth) and was supported by the Church. But it needed very complicated additions called ", /*#__PURE__*/React.createElement(Term, {
    def: "Small circular paths added to orbits in the geocentric model to explain why planets sometimes appear to move backwards in the sky."
  }, "epicycles"), " to explain why planets occasionally appear to move backwards."), /*#__PURE__*/React.createElement("p", null, "In 1543, the Polish astronomer ", /*#__PURE__*/React.createElement(Term, {
    def: "The astronomer who proposed a Sun-centred model of the solar system in 1543, which later became widely accepted."
  }, "Nicolaus Copernicus"), " proposed the ", /*#__PURE__*/React.createElement(Term, {
    def: "The Sun-centred model of the solar system."
  }, "heliocentric model"), ", placing the Sun at the centre. Galileo used a telescope in 1609 to find moons orbiting Jupiter (proving not everything circles Earth) and phases of Venus (only possible if Venus orbits the Sun). Johannes Kepler showed the orbits are ellipses, not circles. Isaac Newton then explained why: ", /*#__PURE__*/React.createElement(Term, {
    def: "The force of attraction between any two objects that have mass."
  }, "gravity"), "."), /*#__PURE__*/React.createElement(SolarModelSim, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Science changes with evidence"
  }, "The geocentric model was replaced not because someone decided to, but because new observations (telescopes) revealed facts the old model could not explain. This is how science is supposed to work."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 15,
    question: "Which observation by Galileo most directly disproved the geocentric model?",
    options: ["Sunspots on the surface of the Sun", "Mountains on the Moon", "Moons orbiting Jupiter", "The Milky Way is made of stars"],
    correct: 2,
    explain: "The geocentric model said everything orbits Earth. Galileo saw four moons clearly orbiting Jupiter, proving that not all objects orbit Earth. This directly contradicted the central assumption of the geocentric model."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.3.2",
    title: "Day, night, seasons, and tides",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Most familiar sky events come from the relative positions and movements of the Sun, Earth, and Moon. ", /*#__PURE__*/React.createElement(Term, {
    def: "The daily cycle of light and darkness caused by Earth rotating on its axis once every approximately 24 hours."
  }, "Day and night"), " happen because Earth spins on its axis every 24 hours. The half facing the Sun has day; the other half has night."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The yearly cycle of changing temperatures and day lengths caused by Earth's axial tilt as it orbits the Sun."
  }, "Seasons"), " are caused by Earth's ", /*#__PURE__*/React.createElement(Term, {
    def: "The 23.5-degree lean of Earth's rotational axis relative to the plane of its orbit around the Sun."
  }, "axial tilt"), " of 23.5 degrees. As Earth orbits the Sun, the Southern Hemisphere leans towards the Sun during December to February (our summer), and away during June to August (our winter). It is NOT caused by how close Earth is to the Sun. In fact Earth is slightly closer to the Sun in January."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The regular rise and fall of sea levels caused mainly by the Moon's gravitational pull on Earth's oceans."
  }, "Tides"), " are caused mainly by the Moon's gravity pulling on Earth's oceans, creating two bulges of water. Spring tides (the strongest) happen at new Moon and full Moon when the Sun and Moon align. Neap tides (the weakest) happen at quarter Moons when they are at right angles."), /*#__PURE__*/React.createElement(DayNightSim, null), /*#__PURE__*/React.createElement(SeasonsSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 16,
    question: "Australia has summer in December. What is the correct explanation?",
    options: ["Earth is closer to the Sun in December", "The Southern Hemisphere is tilted towards the Sun in December", "Earth rotates faster in December", "The Moon is full in December"],
    correct: 1,
    explain: "Australia has summer in December because the Southern Hemisphere is tilted towards the Sun at that point in Earth's orbit, receiving more direct sunlight for longer each day. Distance from the Sun does not cause the seasons."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 17,
    question: "Explain why there are two high tides each day in most coastal places.",
    model: "The Moon's gravity pulls the ocean on the side of Earth closest to the Moon into a bulge (high tide). At the same time, on the opposite side, Earth is pulled towards the Moon more than the water there, so the water is left behind creating a second bulge. As Earth rotates in 24 hours, any coastal location passes through both bulges, giving two high tides per day."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.3.3",
    title: "Lunar phases and eclipses",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The Moon does not produce its own light. It reflects sunlight. As the Moon orbits Earth, we see different amounts of its sunlit half. The cycle repeats about every 29.5 days, giving us the familiar sequence of ", /*#__PURE__*/React.createElement(Term, {
    def: "The changing appearance of the Moon's lit surface as seen from Earth over its 29.5-day cycle."
  }, "lunar phases"), ": new Moon, waxing crescent, first quarter, waxing gibbous, full Moon, waning gibbous, last quarter, waning crescent."), /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "An event where the Moon passes directly between the Sun and Earth, blocking sunlight from reaching part of Earth."
  }, "solar eclipse"), " happens at new Moon when the Moon lines up perfectly between the Sun and Earth, casting a shadow on Earth. Observers inside the ", /*#__PURE__*/React.createElement(Term, {
    def: "The central, darkest part of a shadow where the light source is completely blocked."
  }, "umbra"), " see a total eclipse. A ", /*#__PURE__*/React.createElement(Term, {
    def: "An event where Earth passes between the Sun and the Moon, casting Earth's shadow on the Moon."
  }, "lunar eclipse"), " happens at full Moon when Earth's shadow falls on the Moon. The Moon turns reddish because Earth's atmosphere bends red light into the shadow, just like a sunset glow. Eclipses do not happen every month because the Moon's orbit is tilted about 5 degrees from Earth's orbital plane."), /*#__PURE__*/React.createElement(MoonPhaseSim, null), /*#__PURE__*/React.createElement(EclipseAligner, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 18,
    question: "Why does the Moon appear reddish-orange during a total lunar eclipse?",
    options: ["The Moon's own rock reflects red light", "The Sun's light is filtered through Earth's atmosphere before reaching the Moon", "The Moon is covered in red dust", "The Moon is moving very fast"],
    correct: 1,
    explain: "During a total lunar eclipse, no direct sunlight reaches the Moon because Earth is in the way. However, Earth's atmosphere bends some sunlight around Earth's edge, and this bent light is enriched in red wavelengths (like a sunset). This red light falls on the Moon."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 19,
    question: "Why do we not see a solar eclipse every new Moon and a lunar eclipse every full Moon?",
    model: "The Moon's orbit is tilted about 5 degrees compared to the plane of Earth's orbit around the Sun. This means at most new Moons the Moon passes slightly above or below the line between Earth and the Sun, and no eclipse occurs. Eclipses only happen when a new or full Moon coincides with the Moon being very near one of the two points where its orbit crosses Earth's orbital plane."
  }))));
}
function Section4(_ref1) {
  var progress = _ref1.progress,
    setProgress = _ref1.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "1.4 Aboriginal and Torres Strait Islander Peoples' Astronomy"), /*#__PURE__*/React.createElement("h1", null, "The sky as a living calendar"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Aboriginal and Torres Strait Islander peoples developed some of the world's oldest and most detailed astronomical knowledge systems.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/sky-knowledge.png",
    caption: "The Emu in the Sky \u2014 a dark-cloud constellation in the Milky Way, central to Aboriginal astronomy."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.4.1",
    title: "Moon phases and tides: two knowledge systems",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Aboriginal and Torres Strait Islander peoples across Australia carefully observed the Moon's phases over tens of thousands of years and connected them to practical predictions about tides. The ", /*#__PURE__*/React.createElement(Term, {
    def: "An Aboriginal people of Arnhem Land, Northern Territory, with extensive astronomical and ecological knowledge."
  }, "Yolngu"), " people of Arnhem Land describe the Moon filling with water as it waxes (grows) and emptying as it wanes (shrinks), producing a predictable tidal cycle. Coastal communities used this knowledge to plan fishing trips, shellfish gathering, and access to tidal rock platforms."), /*#__PURE__*/React.createElement("p", null, "Modern science explains the same patterns through the Moon's ", /*#__PURE__*/React.createElement(Term, {
    def: "The force of attraction between objects with mass. The Moon's gravity creates tidal bulges in Earth's oceans."
  }, "gravitational pull"), " on Earth's oceans. The strongest tides (", /*#__PURE__*/React.createElement(Term, {
    def: "The strongest tides, occurring at new Moon and full Moon when the Sun and Moon are aligned."
  }, "spring tides"), ") occur at new Moon and full Moon. The weakest tides (", /*#__PURE__*/React.createElement(Term, {
    def: "Relatively weak tides occurring at first and last quarter Moon when the Sun and Moon are at right angles."
  }, "neap tides"), ") occur at quarter phases. Both knowledge systems reach the same practical result: the Moon's phase accurately predicts tidal strength."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Two routes to the same knowledge"
  }, "The Yolngu and modern science arrived at the same accurate tidal predictions from the same natural observations. Both systems are based on systematic observation tested over time. The mechanism described is different, but the practical outcome is identical."), /*#__PURE__*/React.createElement(Figure, {
    caption: "Moon phases and their connection to tidal strength: two perspectives."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 540 100",
    width: "100%",
    style: {
      maxWidth: 540
    }
  }, [["New Moon", "Spring tide", "high", "#333"], ["First Quarter", "Neap tide", "moderate", "#888"], ["Full Moon", "Spring tide", "high", "#e8e0c8"], ["Last Quarter", "Neap tide", "moderate", "#888"]].map(function (_ref10, i) {
    var _ref11 = _slicedToArray(_ref10, 4),
      phase = _ref11[0],
      tide = _ref11[1],
      level = _ref11[2],
      color = _ref11[3];
    return /*#__PURE__*/React.createElement("g", {
      key: phase,
      transform: "translate(".concat(i * 136 + 4, ", 10)")
    }, /*#__PURE__*/React.createElement("circle", {
      cx: 65,
      cy: 30,
      r: 20,
      fill: color,
      stroke: "var(--accent-mid)",
      strokeWidth: 2
    }), /*#__PURE__*/React.createElement("text", {
      x: 65,
      y: 35,
      textAnchor: "middle",
      fontSize: 9,
      fill: color === "#333" ? "#ccc" : "var(--ink)"
    }, phase), /*#__PURE__*/React.createElement("text", {
      x: 65,
      y: 66,
      textAnchor: "middle",
      fontSize: 10,
      fill: "var(--accent-deep)",
      fontWeight: "700"
    }, tide), /*#__PURE__*/React.createElement("text", {
      x: 65,
      y: 82,
      textAnchor: "middle",
      fontSize: 9,
      fill: "var(--ink-muted)"
    }, "Tidal range: ", level));
  }))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 20,
    question: "Which statement best describes the relationship between Indigenous and scientific knowledge of Moon phases and tides?",
    options: ["Indigenous knowledge is wrong because it does not use science", "Both knowledge systems accurately predict tidal patterns from the same observations", "Scientific knowledge is less useful than Indigenous knowledge for fishing", "The two systems have nothing in common"],
    correct: 1,
    explain: "Both systems arrived at accurate predictions by observing the same Moon. They use different frameworks to explain the mechanism, but both produce reliable practical predictions about tidal patterns."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.4.2",
    title: "Stars as weather and seasonal indicators",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Because Earth orbits the Sun each year, different stars appear in the night sky at different times of year. Aboriginal and Torres Strait Islander peoples used this predictable ", /*#__PURE__*/React.createElement(Term, {
    def: "The regular seasonal changes in which stars are visible in the night sky, caused by Earth's orbit around the Sun."
  }, "stellar calendar"), " to predict weather events and plan resource activities with remarkable accuracy."), /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "A group of Aboriginal people of north-western Victoria with deep astronomical knowledge."
  }, "Boorong"), " people of Victoria called the Pleiades star cluster ", /*#__PURE__*/React.createElement(Term, {
    def: "The Boorong name for the Pleiades star cluster, whose appearance signals the eel harvesting season."
  }, "Karakarook"), ". When Karakarook rose in the evening sky, the eel harvesting season began and cold, wet weather was approaching. Many groups across Australia also recognised the ", /*#__PURE__*/React.createElement(Term, {
    def: "A dark constellation formed by the dust lanes in the Milky Way, shaped like an emu and used as a seasonal indicator by many Aboriginal groups."
  }, "Emu in the Sky"), ", a shape formed not by bright stars but by the dark dust clouds within the Milky Way. When the Emu lies flat near the horizon, emus are sitting on their nests and eggs are ready to collect."), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Dark constellations"
  }, "Western astronomy traces constellations by connecting bright stars. Many Aboriginal and Torres Strait Islander groups also use \"dark constellations\" formed by the dark gaps between the stars in the Milky Way. The Emu in the Sky is one of the most famous examples."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 21,
    question: "Explain why a star's position in the night sky can be used to predict the season, even though the star itself is billions of kilometres away and has nothing to do with Earth's weather.",
    model: "As Earth orbits the Sun over one year, different stars appear in the night sky because we are facing different directions in space each night. The same star appears in the same position in the sky at the same time each year because Earth's orbit is regular and predictable. Because seasons are also caused by Earth's orbit, a star's appearance is reliably correlated with the season, making it an accurate seasonal calendar even though the star is not the cause of the season."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.4.3",
    title: "A complete seasonal knowledge system",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Aboriginal and Torres Strait Islander peoples developed complete systems that linked astronomical observations to animal behaviour, plant cycles, and tidal changes. The ", /*#__PURE__*/React.createElement(Term, {
    def: "An Aboriginal people of south-western Western Australia who recognise six seasons in their ecological calendar."
  }, "Noongar"), " people of south-western Western Australia recognised six seasons rather than the four seasons used in Europe. Each Noongar season is defined by a combination of temperature, rainfall, wind, plant flowering, animal behaviour, and astronomical signals."), /*#__PURE__*/React.createElement("p", null, "In Torres Strait, the rising of the Pleiades in May signals the start of the trade wind season, changing when and where communities fish. The ", /*#__PURE__*/React.createElement(Term, {
    def: "An Aboriginal people of western New South Wales who used stars to predict waterhole levels."
  }, "Barkandji"), " people of western New South Wales used star positions to predict when waterholes would be full enough for large gatherings. These are not isolated observations. They are interconnected systems of knowledge that connected the sky to life on the ground across an entire continent for tens of thousands of years."), /*#__PURE__*/React.createElement(SkyCalendarSim, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Why this matters"
  }, "Indigenous astronomical knowledge systems represent tens of thousands of years of careful, systematic observation tested against real-world outcomes. Acknowledging these systems respects Australia's First Peoples and preserves knowledge of enormous scientific and cultural value."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 22,
    question: "Why might the Noongar six-season calendar be more useful for managing food resources in south-western Australia than the European four-season calendar?",
    options: ["Because it is older", "Because six seasons match local ecological and weather patterns more precisely than four seasons designed for northern Europe", "Because it uses more scientific language", "Because it is endorsed by government agencies"],
    correct: 1,
    explain: "The European four-season calendar was designed for northern European conditions and is based on astronomical divisions. The Noongar calendar is based on the specific local ecology of south-western Australia, providing finer distinctions that match local food availability and weather patterns more accurately."
  }))));
}
function Section5(_ref12) {
  var progress = _ref12.progress,
    setProgress = _ref12.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "1.5 Observing the Universe: In Context"), /*#__PURE__*/React.createElement("h1", null, "A new window on the universe"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "The James Webb Space Telescope is the most powerful eye we have ever pointed at the cosmos. Find out what it can see and what it has already discovered.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/jwst.png",
    caption: "The James Webb Space Telescope and its golden hexagonal mirror."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "1.5.1",
    title: "The James Webb Space Telescope",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The most powerful space telescope ever built, launched on 25 December 2021, observing primarily in infrared light."
  }, "James Webb Space Telescope (JWST)"), " was launched on 25 December 2021. It is the result of decades of work by engineers and scientists from three space agencies: NASA (United States), ESA (European Space Agency), and CSA (Canadian Space Agency). Its mirror is 6.5 metres across, nearly three times the size of the ", /*#__PURE__*/React.createElement(Term, {
    def: "A space telescope launched in 1990 that observes in visible and ultraviolet light, orbiting 570 km above Earth."
  }, "Hubble Space Telescope's"), " mirror. This gives it far greater ", /*#__PURE__*/React.createElement(Term, {
    def: "The ability of a telescope to collect light from faint objects. Larger mirrors gather more light."
  }, "light-gathering power"), "."), /*#__PURE__*/React.createElement("p", null, "The JWST observes mainly in ", /*#__PURE__*/React.createElement(Term, {
    def: "Electromagnetic radiation with wavelengths longer than visible light but shorter than radio waves. Felt as heat."
  }, "infrared light"), ". This lets it see through the dust clouds that block ordinary visible light, revealing hidden star-forming regions and very distant galaxies. It is parked at a special gravitational balance point called ", /*#__PURE__*/React.createElement(Term, {
    def: "The second Lagrange point, approximately 1.5 million km from Earth, where the telescope stays in sync with Earth's orbit while remaining on the night side."
  }, "Lagrange point L2"), ", about 1.5 million kilometres from Earth. A five-layer sunshield the size of a tennis court keeps its instruments cold enough to detect the faint infrared glow of the most distant galaxies ever observed."), /*#__PURE__*/React.createElement(TelescopeCompare, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "success",
    title: "JWST discoveries so far"
  }, "The JWST has observed galaxies that formed only 200 to 300 million years after the Big Bang, detected carbon dioxide in the atmosphere of a planet orbiting another star (a world first), and revealed star-forming regions hidden behind thick dust clouds in stunning detail."), /*#__PURE__*/React.createElement(Figure, {
    caption: "How the JWST followed the Working Scientifically processes."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 560 70",
    width: "100%",
    style: {
      maxWidth: 560
    }
  }, ["Question", "Plan", "Conduct", "Process", "Discover", "Communicate"].map(function (s, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: s,
      transform: "translate(".concat(i * 94 + 2, ", 8)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: 88,
      height: 40,
      rx: 9,
      fill: "var(--accent-soft)",
      stroke: "var(--accent-deep)",
      strokeWidth: 1.5
    }), /*#__PURE__*/React.createElement("text", {
      x: 44,
      y: 24,
      textAnchor: "middle",
      fontSize: 10,
      fill: "var(--ink)"
    }, s), i < 5 && /*#__PURE__*/React.createElement("text", {
      x: 95,
      y: 24,
      textAnchor: "middle",
      fontSize: 16,
      fill: "var(--accent-deep)"
    }, "\u203A"));
  }), /*#__PURE__*/React.createElement("text", {
    x: 280,
    y: 66,
    textAnchor: "middle",
    fontSize: 9,
    fill: "var(--ink-muted)"
  }, "Every JWST observation follows these Working Scientifically steps."))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 23,
    question: "Why does the JWST observe in infrared light rather than visible light?",
    options: ["Infrared cameras are cheaper to build", "Infrared light can pass through dust clouds and is emitted by very distant galaxies", "Visible light is blocked by the sunshield", "Hubble already covers visible light, so there is no point repeating it"],
    correct: 1,
    explain: "Infrared light passes through dust clouds that block visible light, allowing JWST to see hidden star-forming regions. Also, the expansion of the universe stretches light from very distant galaxies into infrared wavelengths, so observing infrared lets JWST see the earliest galaxies."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 24,
    question: "Explain how the JWST demonstrates three key principles of the nature and practice of science covered in this topic.",
    model: "1. Collaborative science: the JWST was built by NASA, ESA, and CSA together, involving thousands of scientists and engineers. 2. Science builds on previous work: the JWST was designed specifically to answer questions Hubble raised but could not fully answer. It used decades of improved mirror technology and infrared detector design. 3. Instruments extend human senses: the JWST detects infrared radiation invisible to the human eye and records data from objects billions of times too faint to see without a telescope."
  }))));
}

/* =====================================================================
   MOUNT
   ===================================================================== */
mountTopicApp({
  year: 7,
  topicTitle: "Observing the Universe",
  branch: "earth-space",
  heroImage: "img/hero.png",
  strand: "Stage 4 · NSW Science",
  accent: "amber",
  storageKey: "y7.universe",
  hubHref: "../",
  intro: "Look up on a clear night and you are doing what humans have done for tens of thousands of years: observing the universe. In this topic you will find out how science builds knowledge through observation and experiment, how our view of the solar system changed as evidence grew, why we have day, night, seasons, and tides, what the Moon's phases really are, how Aboriginal and Torres Strait Islander peoples used the sky as a living calendar, and how the James Webb Space Telescope has opened a brand-new window on the cosmos.",
  glossary: {
    "observation": "A direct measurement or description of something detected by senses or instruments.",
    "inference": "A logical conclusion drawn from one or more observations, going beyond what was directly measured.",
    "testable prediction": "A specific statement about what will happen under new conditions, which can be checked by observation or experiment.",
    "scientific theory": "A well-tested explanation for a wide range of observations, supported by substantial evidence from many scientists.",
    "scientific law": "A precise description of a pattern in nature, often expressed as a mathematical equation.",
    "peer review": "The checking of a scientist's work by independent experts before it is published.",
    "geocentric model": "The Earth-centred model of the solar system, proposed by Ptolemy around 150 CE.",
    "heliocentric model": "The Sun-centred model of the solar system, proposed by Copernicus in 1543.",
    "axial tilt": "The 23.5-degree lean of Earth's rotational axis relative to its orbit around the Sun.",
    "lunar phase": "The changing apparent shape of the Moon's lit surface as seen from Earth over 29.5 days.",
    "spring tide": "The strongest tidal cycle, occurring at new Moon and full Moon when the Sun and Moon are aligned.",
    "neap tide": "A relatively weak tidal cycle, occurring at first and last quarter Moon.",
    "solar eclipse": "An event where the Moon passes between the Sun and Earth, blocking sunlight from reaching part of Earth.",
    "lunar eclipse": "An event where Earth passes between the Sun and the Moon, casting Earth's shadow on the Moon.",
    "umbra": "The central, darkest part of a shadow where the light source is completely blocked.",
    "CCD detector": "A highly sensitive digital image sensor used in telescopes to detect very faint light.",
    "range (instrument)": "The minimum to maximum values an instrument can reliably measure.",
    "sensitivity (instrument)": "The smallest change in a quantity an instrument can detect.",
    "accuracy": "How close a measured value is to the true value of what is being measured.",
    "reliability": "The consistency of a measurement: giving the same result when the same quantity is measured repeatedly.",
    "independent variable": "The variable deliberately changed by the scientist in a controlled experiment.",
    "dependent variable": "The variable measured to see the effect of the independent variable.",
    "controlled variable": "A variable kept constant in an experiment so it does not affect the result.",
    "systematic observation": "Carefully recording observations using a consistent method at regular intervals over time.",
    "Yolngu": "An Aboriginal people of Arnhem Land, NT, with extensive astronomical and tidal knowledge.",
    "Emu in the Sky": "A dark constellation formed by dust lanes in the Milky Way, used as a seasonal indicator by many Aboriginal groups.",
    "James Webb Space Telescope": "The most powerful space telescope ever built, launched in 2021, observing primarily in infrared.",
    "infrared light": "Electromagnetic radiation with wavelengths longer than visible light, used by the JWST to see through dust.",
    "Lagrange point L2": "A gravitational balance point about 1.5 million km from Earth where the JWST orbits.",
    "Doppler effect": "The change in frequency of a wave caused by relative motion between the source and the observer."
  },
  sections: [{
    id: "1.1",
    label: "Nature of Science",
    accent: "amber",
    blurb: "What science is and how it builds knowledge.",
    points: ["1.1.1", "1.1.2", "1.1.3", "1.1.4"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section1, p);
    }
  }, {
    id: "1.2",
    label: "Practice of Science",
    accent: "orange",
    blurb: "The skills and tools scientists use in investigations.",
    points: ["1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5", "1.2.6", "1.2.7", "1.2.8"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section2, p);
    }
  }, {
    id: "1.3",
    label: "Space Science",
    accent: "amber",
    blurb: "Solar system models, day and night, seasons, tides, lunar phases, and eclipses.",
    points: ["1.3.1", "1.3.2", "1.3.3"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section3, p);
    }
  }, {
    id: "1.4",
    label: "Indigenous Astronomy",
    accent: "orange",
    blurb: "Aboriginal and Torres Strait Islander astronomical knowledge systems.",
    points: ["1.4.1", "1.4.2", "1.4.3"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section4, p);
    }
  }, {
    id: "1.5",
    label: "In Context: JWST",
    accent: "amber",
    blurb: "How the James Webb Space Telescope expanded our knowledge of the universe.",
    points: ["1.5.1"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section5, p);
    }
  }]
});
