/* Generated from kit.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* ============================================================
   Junior Science — Shared Topic Framework (kit.jsx)
   Builds a full topic app from a CONFIG object.
   All components are attached to window so per-topic content
   files can use them as globals (Babel-standalone friendly).
   ============================================================ */
/* global React, ReactDOM */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo,
  useCallback = _React.useCallback,
  useContext = _React.useContext,
  useId = _React.useId;

/* ---------- persistence ---------- */
function useLocalStorage(key, initial) {
  var _useState = useState(function () {
      try {
        var raw = localStorage.getItem(key);
        return raw !== null ? JSON.parse(raw) : initial;
      } catch (_unused) {
        return initial;
      }
    }),
    _useState2 = _slicedToArray(_useState, 2),
    v = _useState2[0],
    setV = _useState2[1];
  useEffect(function () {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch (_unused2) {}
  }, [key, v]);
  return [v, setV];
}

/* Topic-wide context so leaf components (quizzes, etc.) can derive a stable
   localStorage key without every content.jsx having to pass the topic key. */
var TopicContext = React.createContext({
  skey: null
});

/* tiny stable string hash -> short base36, for per-question storage keys */
function hashStr(s) {
  s = String(s == null ? "" : s);
  var h = 0;
  for (var i = 0; i < s.length; i++) {
    h = h * 31 + s.charCodeAt(i) | 0;
  }
  return (h >>> 0).toString(36);
}
function answerKey(skey, kind, num, question) {
  return (skey || "anon") + "." + kind + "." + (num == null ? "" : num) + "." + hashStr(question);
}

/* Respect the OS "reduce motion" setting in JS-driven animations
   (a CSS media query can't stop a setInterval). content.jsx can call this. */
function useReducedMotion() {
  var _useState3 = useState(function () {
      try {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch (_unused3) {
        return false;
      }
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    reduced = _useState4[0],
    setReduced = _useState4[1];
  useEffect(function () {
    var mq;
    try {
      mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    } catch (_unused4) {
      return;
    }
    var on = function on() {
      return setReduced(mq.matches);
    };
    if (mq.addEventListener) mq.addEventListener("change", on);else mq.addListener(on);
    return function () {
      if (mq.removeEventListener) mq.removeEventListener("change", on);else mq.removeListener(on);
    };
  }, []);
  return reduced;
}

/* Per-topic quiz results (for the end-of-topic review / "redo what you got
   wrong"). Stored separately from the per-question answers so we can list
   wrong answers by section without re-rendering every question. */
function recordMCQResult(skey, qkey, ok, section) {
  if (!skey) return;
  try {
    var k = skey + ".results";
    var m = JSON.parse(localStorage.getItem(k) || "{}");
    m[qkey] = {
      ok: !!ok,
      section: section || null
    };
    localStorage.setItem(k, JSON.stringify(m));
  } catch (e) {}
}
function readMCQResults(skey) {
  try {
    return JSON.parse(localStorage.getItem(skey + ".results") || "{}");
  } catch (e) {
    return {};
  }
}
function clearMCQResults(skey, pred) {
  try {
    var k = skey + ".results";
    var m = JSON.parse(localStorage.getItem(k) || "{}");
    Object.keys(m).forEach(function (qk) {
      if (pred(m[qk], qk)) {
        delete m[qk];
      }
    });
    localStorage.setItem(k, JSON.stringify(m));
  } catch (e) {}
}

/* ---------- completion stats + downloadable certificate ---------- */
var BRANCH_ACCENT = {
  biology: "#2e7d56",
  chemistry: "#1f6f8b",
  physics: "#b9770e",
  "earth-space": "#5b53b0",
  earthspace: "#5b53b0",
  astronomy: "#5b53b0",
  environmental: "#1f8b7d",
  change: "#7a3a9b",
  general: "#475569"
};
function readAttempts(qkey) {
  try {
    return JSON.parse(localStorage.getItem(qkey + ".att") || "0") || 0;
  } catch (e) {
    return 0;
  }
}
function gatherTopicStats(skey, done, total) {
  var results = readMCQResults(skey);
  var qkeys = Object.keys(results);
  var correct = 0,
    totalAttempts = 0,
    firstTry = 0;
  qkeys.forEach(function (k) {
    var ok = !!(results[k] && results[k].ok);
    var att = readAttempts(k) || 1;
    if (ok) correct++;
    totalAttempts += att;
    if (ok && att === 1) firstTry++;
  });
  var answered = qkeys.length;
  return {
    sectionsDone: done,
    sectionsTotal: total,
    answered: answered,
    correct: correct,
    wrong: answered - correct,
    totalAttempts: totalAttempts || answered,
    firstTry: firstTry,
    accuracy: answered ? Math.round(100 * correct / answered) : 0,
    firstTryPct: answered ? Math.round(100 * firstTry / answered) : 0
  };
}
function certCode(name, skey, stats) {
  var basis = String(name || "").trim().toLowerCase() + "|" + skey + "|" + stats.sectionsDone + "/" + stats.sectionsTotal + "|" + stats.correct + "/" + stats.answered;
  var h = hashStr(basis).toUpperCase();
  var sum = 0;
  for (var i = 0; i < basis.length; i++) sum += basis.charCodeAt(i);
  var cs = (sum % 36).toString(36).toUpperCase();
  var abbr = String(skey || "whs").replace(/[^a-z0-9]/gi, "").slice(-4).toUpperCase();
  return "WHS-" + abbr + "-" + h + cs;
}
function _rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function downloadCertificatePNG(opts) {
  var W = 2000,
    H = 1414;
  var canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  var ctx = canvas.getContext("2d");
  var accent = opts.accent || "#1f6f8b";
  var ink = "#1f2933",
    soft = "#52606d",
    line = "#dce1e7";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 10;
  ctx.strokeRect(40, 40, W - 80, H - 80);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.strokeRect(70, 70, W - 140, H - 140);
  ctx.fillStyle = accent;
  ctx.fillRect(70, 70, W - 140, 16);
  // diagonal repeating watermark (harder to alter cleanly)
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = ink;
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.font = "bold 42px Helvetica, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  var unit = "WOONONA HS · VERIFIED · " + opts.code + " · ";
  var wmLine = "";
  while (wmLine.length < 130) wmLine += unit;
  for (var wy = -1500; wy <= 1500; wy += 120) ctx.fillText(wmLine, 0, wy);
  ctx.restore();
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "center";
  ctx.fillStyle = soft;
  ctx.font = "600 34px Helvetica, Arial, sans-serif";
  ctx.fillText("WOONONA HIGH SCHOOL · JUNIOR SCIENCE", W / 2, 205);
  ctx.fillStyle = ink;
  ctx.font = "bold 94px Georgia, 'Times New Roman', serif";
  ctx.fillText("Certificate of Completion", W / 2, 305);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 260, 350);
  ctx.lineTo(W / 2 + 260, 350);
  ctx.stroke();
  ctx.fillStyle = soft;
  ctx.font = "italic 38px Georgia, serif";
  ctx.fillText("This certifies that", W / 2, 445);
  ctx.fillStyle = ink;
  ctx.font = "bold 88px Georgia, serif";
  ctx.fillText(opts.name, W / 2, 545, W - 320); // maxWidth squeezes very long names to fit inside the border
  var nameW = Math.min(W - 320, Math.max(520, Math.min(W - 320, ctx.measureText(opts.name).width) + 140));
  ctx.strokeStyle = line;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - nameW / 2, 580);
  ctx.lineTo(W / 2 + nameW / 2, 580);
  ctx.stroke();
  ctx.fillStyle = soft;
  ctx.font = "36px Georgia, serif";
  ctx.fillText("has successfully completed", W / 2, 650);
  ctx.fillStyle = accent;
  ctx.font = "bold 58px Georgia, serif";
  ctx.fillText(opts.topicTitle, W / 2, 722, W - 320);
  ctx.fillStyle = soft;
  ctx.font = "32px Helvetica, Arial, sans-serif";
  ctx.fillText("Year " + opts.year + " Science" + (opts.strand ? " · " + opts.strand : ""), W / 2, 772, W - 320);
  var boxes = [[opts.stats.sectionsDone + " / " + opts.stats.sectionsTotal, "Sections completed"], [opts.stats.correct + " / " + opts.stats.answered, "Questions correct"], [String(opts.stats.totalAttempts), "Total attempts"], [opts.stats.firstTryPct + "%", "Right first try"]];
  var bw = 360,
    gap = 28,
    bh = 175;
  var bx0 = W / 2 - (boxes.length * bw + (boxes.length - 1) * gap) / 2,
    by = 835;
  for (var i = 0; i < boxes.length; i++) {
    var x = bx0 + i * (bw + gap);
    ctx.fillStyle = "#f4f6f8";
    _rr(ctx, x, by, bw, bh, 14);
    ctx.fill();
    ctx.strokeStyle = line;
    ctx.lineWidth = 2;
    _rr(ctx, x, by, bw, bh, 14);
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.font = "bold 62px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(boxes[i][0], x + bw / 2, by + 92);
    ctx.fillStyle = soft;
    ctx.font = "27px Helvetica, Arial, sans-serif";
    ctx.fillText(boxes[i][1], x + bw / 2, by + 140);
  }
  ctx.textAlign = "left";
  ctx.fillStyle = ink;
  ctx.font = "bold 34px Helvetica, Arial, sans-serif";
  ctx.fillText(opts.dateStr, 165, 1175);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(165, 1130);
  ctx.lineTo(585, 1130);
  ctx.stroke();
  ctx.fillStyle = soft;
  ctx.font = "26px Helvetica, Arial, sans-serif";
  ctx.fillText("Date of completion", 165, 1212);
  ctx.textAlign = "right";
  ctx.fillStyle = ink;
  ctx.font = "bold 30px 'Courier New', monospace";
  ctx.fillText(opts.code, W - 165, 1175);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W - 585, 1130);
  ctx.lineTo(W - 165, 1130);
  ctx.stroke();
  ctx.fillStyle = soft;
  ctx.font = "26px Helvetica, Arial, sans-serif";
  ctx.fillText("Verification code", W - 165, 1212);
  var sx = W / 2,
    sy = 1150,
    sr = 96;
  ctx.beginPath();
  ctx.arc(sx, sy, sr, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(sx, sy, sr - 13, 0, Math.PI * 2);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "bold 27px Helvetica, Arial, sans-serif";
  ctx.fillText("VERIFIED", sx, sy - 4);
  ctx.font = "bold 19px Helvetica, Arial, sans-serif";
  ctx.fillText("WHS SCIENCE", sx, sy + 26);
  var fname = String(opts.topicTitle || "topic").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() + "-certificate.png";
  function fallbackDownload() {
    try {
      var a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = fname;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        a.remove();
      }, 1500);
    } catch (e2) {
      alert("Sorry, the certificate could not be generated on this device.");
    }
  }
  try {
    canvas.toBlob(function (blob) {
      if (!blob) {
        fallbackDownload();
        return;
      }
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = fname;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        try {
          URL.revokeObjectURL(url);
          a.remove();
        } catch (e) {}
      }, 1500);
    }, "image/png");
  } catch (e) {
    fallbackDownload();
  }
}

/* ---------- icons ---------- */
var Icon = function Icon(_ref) {
  var d = _ref.d,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 18 : _ref$size,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? "none" : _ref$fill,
    _ref$sw = _ref.sw,
    sw = _ref$sw === void 0 ? 2 : _ref$sw,
    children = _ref.children;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, d ? /*#__PURE__*/React.createElement("path", {
    d: d
  }) : children);
};
var IconCheck = function IconCheck(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }));
};
var IconX = function IconX(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
};
var IconArrow = function IconArrow(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 5 19 12 12 19"
  }));
};
var IconHome = function IconHome(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 22 9 12 15 12 15 22"
  }));
};
var IconBook = function IconBook(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
  }));
};
var IconGear = function IconGear(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H7a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
  }));
};
var IconMenu = function IconMenu(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "7",
    x2: "20",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "12",
    x2: "20",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "17",
    x2: "20",
    y2: "17"
  }));
};
var IconSearch = function IconSearch(p) {
  return /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  }));
};

/* ---------- content primitives ---------- */
/* DotPoints auto-complete: a section that contains auto-markable questions
   (MCQs) ticks itself once every one of them is answered correctly; a section
   with no such questions ticks once it has been on screen for about 6 seconds
   of reading (so fast scrolling or a tall monitor does not tick it). Students
   can still tick/untick the circle by hand. This is what fills the ring — so
   simply working through the content now advances progress (it used to require
   a manual click on every section, which left the bar stuck at 0%). */
var DotPointContext = React.createContext(null);
function DotPoint(_ref2) {
  var id = _ref2.id,
    title = _ref2.title,
    children = _ref2.children,
    progress = _ref2.progress,
    setProgress = _ref2.setProgress;
  var done = !!(progress && progress[id]);
  var toggle = function toggle() {
    return setProgress(function (p) {
      return _objectSpread(_objectSpread({}, p), {}, _defineProperty({}, id, !p[id]));
    });
  };
  var reg = useRef({}); // qkey -> true | false | null (null = present but unanswered)
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    regTick = _useState6[0],
    setRegTick = _useState6[1];
  var sectionRef = useRef(null);
  var register = useCallback(function (qkey, ok) {
    reg.current[qkey] = ok;
    setRegTick(function (t) {
      return t + 1;
    });
  }, []);
  var unregister = useCallback(function (qkey) {
    delete reg.current[qkey];
    setRegTick(function (t) {
      return t + 1;
    });
  }, []);
  var ctx = useMemo(function () {
    return {
      register: register,
      unregister: unregister
    };
  }, [register, unregister]);

  // auto-mark once every registered question is answered correctly
  useEffect(function () {
    var vals = Object.values(reg.current);
    if (vals.length && vals.every(function (v) {
      return v === true;
    })) {
      setProgress(function (p) {
        return p[id] ? p : _objectSpread(_objectSpread({}, p), {}, _defineProperty({}, id, true));
      });
    }
  }, [regTick, id, setProgress]);

  // sections with no auto-markable questions: mark done once scrolled through.
  // Uses scroll position + getBoundingClientRect rather than IntersectionObserver
  // so it works for sections TALLER than the viewport and in environments where
  // innerHeight is unreliable (falls back to a sane viewport height).
  useEffect(function () {
    // Poll the section's on-screen position on a timer rather than listening for
    // scroll events. A timer is reliable everywhere (scroll events can be missed
    // in some embedded/headless contexts, and requestAnimationFrame is paused in
    // background tabs); the check itself is a cheap getBoundingClientRect.
    var done2 = false;
    var seenMs = 0; // time the section has spent on screen
    var NEED_MS = 6000;
    var check = function check() {
      if (done2) return true;
      if (Object.keys(reg.current).length > 0) return true; // has auto-markable questions: handled above
      var el = sectionRef.current;
      if (!el) return false;
      var vh = window.innerHeight || document.documentElement.clientHeight || 800;
      var r = el.getBoundingClientRect();
      // count time while the section is in the reading zone (its top above 55%
      // of the screen and part of it still visible); ignore hidden tabs
      var visible = r.top < vh * 0.55 && r.bottom > vh * 0.15 && !document.hidden;
      if (visible) seenMs += 400;
      if (seenMs >= NEED_MS) {
        done2 = true;
        setProgress(function (p) {
          return p[id] ? p : _objectSpread(_objectSpread({}, p), {}, _defineProperty({}, id, true));
        });
        return true;
      }
      return false;
    };
    var iv = setInterval(function () {
      if (check()) clearInterval(iv);
    }, 400);
    return function () {
      clearInterval(iv);
    };
  }, [id, setProgress]);
  return /*#__PURE__*/React.createElement(DotPointContext.Provider, {
    value: ctx
  }, /*#__PURE__*/React.createElement("section", {
    className: "dot-point",
    id: "dp-" + id,
    ref: sectionRef
  }, /*#__PURE__*/React.createElement("header", {
    className: "dp-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dp-id"
  }, id), /*#__PURE__*/React.createElement("h3", {
    className: "dp-title"
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "dp-check" + (done ? " done" : ""),
    onClick: toggle,
    "aria-label": done ? "Mark as not done" : "Mark as done",
    title: done ? "Done" : "Mark as done"
  }, done && /*#__PURE__*/React.createElement(IconCheck, {
    size: 16,
    sw: 3
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dp-body"
  }, children)));
}
function Callout(_ref3) {
  var _ref3$kind = _ref3.kind,
    kind = _ref3$kind === void 0 ? "key" : _ref3$kind,
    title = _ref3.title,
    children = _ref3.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "callout " + kind
  }, title && /*#__PURE__*/React.createElement("h4", null, title), children);
}
function Figure(_ref4) {
  var num = _ref4.num,
    caption = _ref4.caption,
    src = _ref4.src,
    alt = _ref4.alt,
    children = _ref4.children,
    maxWidth = _ref4.maxWidth;
  return /*#__PURE__*/React.createElement("figure", {
    className: "figure",
    style: maxWidth ? {
      maxWidth: maxWidth,
      marginLeft: "auto",
      marginRight: "auto"
    } : undefined
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || caption,
    loading: "lazy"
  }) : children, caption && /*#__PURE__*/React.createElement("figcaption", {
    className: "figure-caption"
  }, num && /*#__PURE__*/React.createElement("strong", null, "Figure ", num, ". "), caption));
}
function Term(_ref5) {
  var children = _ref5.children,
    def = _ref5.def;
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    show = _useState8[0],
    setShow = _useState8[1];
  var ref = useRef(null);
  // useId keeps ids unique even when the same term + definition appears more than once on a page
  var popId = "term-" + useId();
  useEffect(function () {
    if (!show) return;
    var onDoc = function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    };
    var onKey = function onKey(e) {
      if (e.key === "Escape") setShow(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return function () {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [show]);
  // rendered as a button so it is keyboard-focusable and tap-toggles on touch;
  // hover still reveals the definition via CSS for mouse users.
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    ref: ref,
    className: "term" + (show ? " show" : ""),
    "aria-expanded": show,
    "aria-describedby": popId,
    onClick: function onClick() {
      return setShow(function (s) {
        return !s;
      });
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    className: "term-pop",
    id: popId,
    role: "tooltip"
  }, def));
}
function MCQ(_ref6) {
  var num = _ref6.num,
    question = _ref6.question,
    options = _ref6.options,
    correct = _ref6.correct,
    explain = _ref6.explain;
  var _useContext = useContext(TopicContext),
    skey = _useContext.skey,
    section = _useContext.section;
  var dp = useContext(DotPointContext);
  var qkey = answerKey(skey, "mcq", num, question);
  // the chosen answer is saved per question so it survives navigation / refresh
  var _useLocalStorage = useLocalStorage(qkey, null),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    chosen = _useLocalStorage2[0],
    setChosen = _useLocalStorage2[1];
  // cumulative attempts (kept across "Try again") so the certificate can show
  // how many tries it took to get everything right
  var _useLocalStorage3 = useLocalStorage(qkey + ".att", 0),
    _useLocalStorage4 = _slicedToArray(_useLocalStorage3, 2),
    attempts = _useLocalStorage4[0],
    setAttempts = _useLocalStorage4[1];
  var locked = chosen !== null;
  // tell the surrounding section whether this question is answered correctly
  useEffect(function () {
    if (!dp) return;
    dp.register(qkey, chosen === null ? null : chosen === correct);
    return function () {
      return dp.unregister(qkey);
    };
  }, [dp, qkey, chosen, correct]);
  var choose = function choose(i) {
    setChosen(i);
    setAttempts(function (a) {
      return (a || 0) + 1;
    });
    recordMCQResult(skey, qkey, i === correct, section);
  };
  var tryAgain = function tryAgain() {
    setChosen(null);
    clearMCQResults(skey, function (_, qk) {
      return qk === qkey;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "quiz-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "quiz-q"
  }, /*#__PURE__*/React.createElement("span", {
    className: "quiz-q-num"
  }, num || "?"), /*#__PURE__*/React.createElement("span", null, question)), /*#__PURE__*/React.createElement("div", {
    className: "quiz-options"
  }, options.map(function (o, i) {
    var cls = "quiz-opt";
    if (locked && i === correct) cls += " correct";else if (locked && i === chosen) cls += " wrong";
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: cls,
      onClick: function onClick() {
        return !locked && choose(i);
      },
      disabled: locked
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        opacity: 0.6,
        minWidth: 14
      }
    }, String.fromCharCode(65 + i)), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, o), locked && i === correct && /*#__PURE__*/React.createElement(IconCheck, {
      size: 16,
      sw: 2.5
    }), locked && i === chosen && i !== correct && /*#__PURE__*/React.createElement(IconX, {
      size: 16,
      sw: 2.5
    }));
  })), locked && /*#__PURE__*/React.createElement("div", {
    className: "quiz-feedback",
    role: "status",
    "aria-live": "polite"
  }, chosen === correct ? "Correct. " : "Not quite. ", explain, chosen !== correct && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "reveal-btn",
    onClick: tryAgain
  }, "Try again"))));
}
function WrittenQ(_ref7) {
  var num = _ref7.num,
    question = _ref7.question,
    model = _ref7.model;
  var _useContext2 = useContext(TopicContext),
    skey = _useContext2.skey;
  // the typed answer is saved so it is never lost on navigation / refresh
  var _useLocalStorage5 = useLocalStorage(answerKey(skey, "wq", num, question), ""),
    _useLocalStorage6 = _slicedToArray(_useLocalStorage5, 2),
    val = _useLocalStorage6[0],
    setVal = _useLocalStorage6[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    show = _useState0[0],
    setShow = _useState0[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "quiz-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "quiz-q"
  }, /*#__PURE__*/React.createElement("span", {
    className: "quiz-q-num"
  }, num || "?"), /*#__PURE__*/React.createElement("span", null, question)), /*#__PURE__*/React.createElement("textarea", {
    className: "response-box",
    value: val,
    onChange: function onChange(e) {
      return setVal(e.target.value);
    },
    placeholder: "Type your answer here\u2026",
    "aria-label": "Your answer" + (num ? " to question " + num : "")
  }), model && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "reveal-btn",
    onClick: function onClick() {
      return setShow(function (s) {
        return !s;
      });
    },
    "aria-expanded": show
  }, show ? "Hide model answer" : "Show model answer"), show && /*#__PURE__*/React.createElement("div", {
    className: "model-answer",
    role: "region",
    "aria-label": "Model answer"
  }, /*#__PURE__*/React.createElement("strong", null, "Model answer. "), model)));
}
function QGroup(_ref8) {
  var title = _ref8.title,
    children = _ref8.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "q-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "q-group-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Check yourself"), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0
    }
  }, title)), children);
}
function Interactive(_ref9) {
  var title = _ref9.title,
    subtitle = _ref9.subtitle,
    takeaway = _ref9.takeaway,
    children = _ref9.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "interactive"
  }, /*#__PURE__*/React.createElement("div", {
    className: "interactive-label"
  }, "Interactive"), title && /*#__PURE__*/React.createElement("div", {
    className: "interactive-title"
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    className: "interactive-sub"
  }, subtitle), children, takeaway && /*#__PURE__*/React.createElement("div", {
    className: "interactive-takeaway"
  }, /*#__PURE__*/React.createElement("strong", null, "What this shows. "), takeaway));
}

/* ---------- interactive building blocks ---------- */
function Slider(_ref0) {
  var label = _ref0.label,
    min = _ref0.min,
    max = _ref0.max,
    _ref0$step = _ref0.step,
    step = _ref0$step === void 0 ? 1 : _ref0$step,
    value = _ref0.value,
    _onChange = _ref0.onChange,
    _ref0$unit = _ref0.unit,
    unit = _ref0$unit === void 0 ? "" : _ref0$unit,
    fmt = _ref0.fmt;
  var sid = "sl-" + useId();
  return /*#__PURE__*/React.createElement("div", {
    className: "ctrl"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: sid
  }, label, /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, fmt ? fmt(value) : value, unit)), /*#__PURE__*/React.createElement("input", {
    id: sid,
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: function onChange(e) {
      return _onChange(parseFloat(e.target.value));
    }
  }));
}
function SegToggle(_ref1) {
  var options = _ref1.options,
    value = _ref1.value,
    onChange = _ref1.onChange;
  return /*#__PURE__*/React.createElement("div", {
    className: "seg-toggle"
  }, options.map(function (o) {
    var val = _typeof(o) === "object" ? o.value : o;
    var lab = _typeof(o) === "object" ? o.label : o;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      type: "button",
      className: value === val ? "on" : "",
      "aria-pressed": value === val,
      onClick: function onClick() {
        return onChange(val);
      }
    }, lab);
  }));
}
function Stat(_ref10) {
  var value = _ref10.value,
    label = _ref10.label;
  return /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-val"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, label));
}
function Reveal(_ref11) {
  var children = _ref11.children,
    _ref11$label = _ref11.label,
    label = _ref11$label === void 0 ? "Reveal hidden answer" : _ref11$label;
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    shown = _useState10[0],
    setShown = _useState10[1];
  // a real button so it is keyboard-focusable and operable with Enter/Space
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "reveal-blur" + (shown ? " shown" : ""),
    onClick: function onClick() {
      return setShown(true);
    },
    "aria-expanded": shown,
    "aria-label": shown ? undefined : label
  }, children);
}
function FlipCard(_ref12) {
  var front = _ref12.front,
    back = _ref12.back;
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    f = _useState12[0],
    setF = _useState12[1];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "card",
    style: {
      cursor: "pointer",
      minHeight: 90,
      textAlign: "left",
      width: "100%"
    },
    "aria-pressed": f,
    onClick: function onClick() {
      return setF(function (v) {
        return !v;
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "0.7rem",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--ink-muted)",
      marginBottom: 6
    }
  }, f ? "Answer" : "Tap to flip"), /*#__PURE__*/React.createElement("div", null, f ? back : front));
}
/* drag-to-bucket matching: items = [{id,label,bucket}], buckets=[{id,label}] */
function MatchBuckets(_ref13) {
  var items = _ref13.items,
    buckets = _ref13.buckets;
  var _useState13 = useState({}),
    _useState14 = _slicedToArray(_useState13, 2),
    placed = _useState14[0],
    setPlaced = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    drag = _useState16[0],
    setDrag = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    over = _useState18[0],
    setOver = _useState18[1];
  var allPlaced = items.every(function (it) {
    return placed[it.id];
  });
  var allCorrect = allPlaced && items.every(function (it) {
    return placed[it.id] === it.bucket;
  });
  var drop = function drop(b) {
    if (drag) {
      setPlaced(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, _defineProperty({}, drag, b));
      });
      setDrag(null);
      setOver(null);
    }
  };
  // keyboard: Enter / Space act like a click on chips and drop zones
  var keyAct = function keyAct(fn) {
    return function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fn(e);
      }
    };
  };
  var pick = function pick(id) {
    return setDrag(function (d) {
      return d === id ? null : id;
    });
  };
  var unplace = function unplace(id) {
    return setPlaced(function (p) {
      var n = _objectSpread({}, p);
      delete n[id];
      return n;
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      marginBottom: 14
    }
  }, items.filter(function (it) {
    return !placed[it.id];
  }).map(function (it) {
    return /*#__PURE__*/React.createElement("span", {
      key: it.id,
      className: "drag-chip",
      draggable: true,
      role: "button",
      tabIndex: 0,
      "aria-pressed": drag === it.id,
      "aria-label": it.label + (drag === it.id ? " (selected, now choose a group)" : ". Press Enter to pick up, then choose a group."),
      onDragStart: function onDragStart() {
        return setDrag(it.id);
      },
      onDragEnd: function onDragEnd() {
        setDrag(null);
        setOver(null);
      },
      onClick: function onClick() {
        return pick(it.id);
      },
      onKeyDown: keyAct(function () {
        return pick(it.id);
      }),
      style: drag === it.id ? {
        borderColor: "var(--accent)",
        boxShadow: "var(--shadow-2)"
      } : {}
    }, it.label);
  }), allPlaced && /*#__PURE__*/React.createElement("span", {
    className: "chip ok"
  }, "All placed")), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, buckets.map(function (b) {
    return /*#__PURE__*/React.createElement("div", {
      key: b.id,
      className: "drop-zone" + (over === b.id ? " over" : ""),
      role: "group",
      "aria-label": "Group: " + b.label,
      tabIndex: drag ? 0 : undefined,
      onDragOver: function onDragOver(e) {
        e.preventDefault();
        setOver(b.id);
      },
      onDragLeave: function onDragLeave() {
        return setOver(null);
      },
      onDrop: function onDrop() {
        return drop(b.id);
      },
      onClick: function onClick() {
        return drag && drop(b.id);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.target === e.currentTarget) keyAct(function () {
          return drop(b.id);
        })(e);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        marginBottom: 8
      }
    }, b.label), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, items.filter(function (it) {
      return placed[it.id] === b.id;
    }).map(function (it) {
      var ok = it.bucket === b.id;
      return /*#__PURE__*/React.createElement("span", {
        key: it.id,
        className: "drag-chip",
        role: "button",
        tabIndex: 0,
        "aria-label": it.label + (ok ? ", correct" : ", incorrect") + ". Press Enter to move it back.",
        style: {
          borderColor: ok ? "var(--green-deep)" : "var(--red)",
          background: ok ? "var(--green-soft)" : "var(--red-soft)"
        },
        onClick: function onClick(e) {
          e.stopPropagation();
          unplace(it.id);
        },
        onKeyDown: function onKeyDown(e) {
          e.stopPropagation();
          keyAct(function () {
            return unplace(it.id);
          })(e);
        }
      }, it.label, " ", ok ? "✓" : "✕");
    })));
  })), allPlaced && /*#__PURE__*/React.createElement("div", {
    className: "quiz-feedback",
    role: "status",
    "aria-live": "polite",
    style: {
      marginTop: 12
    }
  }, allCorrect ? "Every item is in the right place. Well done." : "Some items are misplaced. Tap a placed chip to send it back and try again."));
}

/* ---------- progress ring ---------- */
function Ring(_ref14) {
  var pct = _ref14.pct,
    _ref14$size = _ref14.size,
    size = _ref14$size === void 0 ? 22 : _ref14$size,
    _ref14$sw = _ref14.sw,
    sw = _ref14$sw === void 0 ? 2.5 : _ref14$sw,
    _ref14$stroke = _ref14.stroke,
    stroke = _ref14$stroke === void 0 ? "var(--accent)" : _ref14$stroke;
  var r = (size - sw) / 2 - 0.5,
    c = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 ".concat(size, " ").concat(size),
    "aria-hidden": "true",
    focusable: "false"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--border)",
    strokeWidth: sw
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: stroke,
    strokeWidth: sw,
    strokeDasharray: "".concat(pct / 100 * c, " ").concat(c),
    transform: "rotate(-90 ".concat(size / 2, " ").concat(size / 2, ")"),
    strokeLinecap: "round"
  }));
}

/* ============================================================ App shell */
function buildApp(CFG) {
  var SECTIONS = CFG.sections;
  var ALL_POINTS = SECTIONS.flatMap(function (s) {
    return s.points || [];
  });
  var SKEY = CFG.storageKey;
  function CompletionPanel(_ref15) {
    var progress = _ref15.progress;
    var _useLocalStorage7 = useLocalStorage("jsci.studentname", ""),
      _useLocalStorage8 = _slicedToArray(_useLocalStorage7, 2),
      name = _useLocalStorage8[0],
      setName = _useLocalStorage8[1];
    var done = ALL_POINTS.filter(function (p) {
      return progress[p];
    }).length;
    var total = ALL_POINTS.length;
    if (!total || done < total) return null; // only when the topic is 100% complete
    var stats = gatherTopicStats(SKEY, done, total);
    if (!stats.answered) return /*#__PURE__*/React.createElement("section", {
      style: {
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        borderLeft: "5px solid var(--accent)"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: "1.2rem"
      }
    }, "Almost there \u2014 answer the quizzes"), /*#__PURE__*/React.createElement("p", {
      className: "muted",
      style: {
        margin: "4px 0 0",
        fontSize: "0.92rem"
      }
    }, "You've been through every section. Answer the quiz questions to unlock your certificate.")));
    var make = function make() {
      var nm = (name || "").trim();
      if (!nm) {
        alert("Please type your name so it can appear on the certificate.");
        return;
      }
      var now = new Date();
      var dateStr = now.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      var accent = BRANCH_ACCENT[CFG.branch] || BRANCH_ACCENT.general;
      downloadCertificatePNG({
        name: nm,
        code: certCode(nm, SKEY, stats),
        stats: stats,
        topicTitle: CFG.topicTitle,
        year: CFG.year,
        strand: CFG.strand,
        dateStr: dateStr,
        accent: accent
      });
    };
    return /*#__PURE__*/React.createElement("section", {
      style: {
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        borderLeft: "5px solid var(--accent)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "row",
      style: {
        alignItems: "center",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 42,
        lineHeight: 1
      }
    }, "\uD83C\uDF93"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: "1.3rem"
      }
    }, "Topic complete \u2014 get your certificate"), /*#__PURE__*/React.createElement("p", {
      className: "muted",
      style: {
        margin: "4px 0 0",
        fontSize: "0.92rem"
      }
    }, "You've finished all ", total, " sections. Download a certificate (PNG image, watermarked, with a verification code) as proof of work \u2014 it shows your quiz score and how many attempts it took."))), /*#__PURE__*/React.createElement("div", {
      className: "row",
      style: {
        marginTop: 14,
        gap: 10,
        alignItems: "center",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("input", {
      className: "gloss-search",
      style: {
        maxWidth: 320,
        margin: 0
      },
      placeholder: "Type your full name",
      value: name,
      onChange: function onChange(e) {
        return setName(e.target.value);
      },
      "aria-label": "Your name for the certificate"
    }), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-accent",
      onClick: make
    }, "Download certificate (PNG)"))));
  }
  function Home(_ref16) {
    var progress = _ref16.progress,
      goTo = _ref16.goTo;
    var done = ALL_POINTS.filter(function (p) {
      return progress[p];
    }).length;
    var pct = ALL_POINTS.length ? Math.round(100 * done / ALL_POINTS.length) : 0;
    var cont = useMemo(function () {
      var ip = SECTIONS.find(function (s) {
        var d = (s.points || []).filter(function (p) {
          return progress[p];
        }).length;
        return d > 0 && d < s.points.length;
      });
      if (ip) return ip;
      return SECTIONS.find(function (s) {
        return (s.points || []).every(function (p) {
          return !progress[p];
        });
      }) || SECTIONS[0];
    }, [progress]);
    var ctaLabel = done === 0 ? "Start learning" : done === ALL_POINTS.length ? "Review everything" : "Continue where you left off";
    return /*#__PURE__*/React.createElement("div", {
      className: "fade-in"
    }, /*#__PURE__*/React.createElement("section", {
      className: "topic-head",
      style: {
        marginBottom: 28
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, "Year ", CFG.year, " Science \xB7 ", CFG.strand || "NSW Syllabus"), /*#__PURE__*/React.createElement("h1", null, CFG.topicTitle), /*#__PURE__*/React.createElement("p", {
      className: "lead"
    }, CFG.intro), CFG.heroImage && /*#__PURE__*/React.createElement("img", {
      src: CFG.heroImage,
      alt: CFG.topicTitle,
      loading: "lazy",
      style: {
        width: "100%",
        display: "block",
        marginTop: 20,
        borderRadius: 14,
        border: "2px solid var(--border-strong)",
        boxShadow: "6px 6px 0 var(--border-strong)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "row",
      style: {
        marginTop: 22,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-accent",
      onClick: function onClick() {
        return goTo(cont.id);
      }
    }, ctaLabel, " ", /*#__PURE__*/React.createElement(IconArrow, {
      size: 16,
      sw: 2.5
    })), CFG.hubHref && /*#__PURE__*/React.createElement("a", {
      className: "btn btn-ghost",
      href: CFG.hubHref
    }, "\u2190 All Year ", CFG.year, " topics"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-ghost",
      href: "/"
    }, "\u2302 All year groups"), /*#__PURE__*/React.createElement("div", {
      className: "spacer"
    }), /*#__PURE__*/React.createElement("div", {
      className: "row",
      style: {
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Ring, {
      pct: pct,
      size: 46,
      sw: 5
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700
      }
    }, done, " of ", ALL_POINTS.length), /*#__PURE__*/React.createElement("div", {
      className: "muted",
      style: {
        fontSize: "0.8rem"
      }
    }, "sections complete"))))), /*#__PURE__*/React.createElement("div", {
      className: "grid-2"
    }, SECTIONS.map(function (s) {
      var d = (s.points || []).filter(function (p) {
        return progress[p];
      }).length;
      var sp = s.points && s.points.length ? Math.round(100 * d / s.points.length) : 0;
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        className: "card",
        style: {
          textAlign: "left",
          cursor: "pointer",
          borderLeft: "5px solid var(--accent)",
          display: "flex",
          flexDirection: "column",
          gap: 8
        },
        onClick: function onClick() {
          return goTo(s.id);
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "between"
      }, /*#__PURE__*/React.createElement("span", {
        className: "chip accent"
      }, s.id), /*#__PURE__*/React.createElement("span", {
        className: "muted",
        style: {
          fontSize: "0.8rem",
          fontVariantNumeric: "tabular-nums"
        }
      }, d, "/", (s.points || []).length)), /*#__PURE__*/React.createElement("h3", {
        style: {
          fontSize: "1.3rem"
        }
      }, s.label), s.blurb && /*#__PURE__*/React.createElement("p", {
        className: "muted",
        style: {
          fontSize: "0.92rem",
          margin: 0
        }
      }, s.blurb), /*#__PURE__*/React.createElement("div", {
        className: "progressbar",
        style: {
          marginTop: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: sp + "%",
          background: "var(--accent)"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "var(--accent-deep)",
          fontWeight: 600,
          fontSize: "0.88rem",
          marginTop: 4
        }
      }, "Open section ", /*#__PURE__*/React.createElement(IconArrow, {
        size: 14,
        sw: 2.5
      })));
    })), function () {
      var r = readMCQResults(SKEY);
      var vals = Object.values(r);
      if (!vals.length) return null;
      var answered = vals.length;
      var ok = vals.filter(function (v) {
        return v && v.ok;
      }).length;
      var wrong = answered - ok;
      return /*#__PURE__*/React.createElement("section", {
        style: {
          marginTop: 30
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "card between",
        style: {
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
        style: {
          fontSize: "1.2rem",
          margin: 0
        }
      }, "Your quiz results"), /*#__PURE__*/React.createElement("p", {
        className: "muted",
        style: {
          margin: "4px 0 0",
          fontSize: "0.92rem"
        }
      }, ok, " of ", answered, " correct", wrong > 0 ? " \xB7 ".concat(wrong, " to revisit") : "", ".")), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-accent",
        onClick: function onClick() {
          return goTo("review");
        }
      }, "Review", wrong > 0 ? " (".concat(wrong, ")") : "", " ", /*#__PURE__*/React.createElement(IconArrow, {
        size: 15,
        sw: 2.5
      }))));
    }(), /*#__PURE__*/React.createElement(CompletionPanel, {
      progress: progress
    }), /*#__PURE__*/React.createElement("section", {
      style: {
        marginTop: 32
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        marginBottom: 6
      }
    }, "How to use this site"), /*#__PURE__*/React.createElement("p", {
      className: "muted"
    }, "Read a little, play a little, then check yourself. Everything saves automatically in this browser."), /*#__PURE__*/React.createElement("div", {
      className: "grid-3",
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("h4", null, "1 \xB7 Explore"), /*#__PURE__*/React.createElement("p", {
      className: "muted",
      style: {
        margin: 0,
        fontSize: "0.9rem"
      }
    }, "Open any section from the tabs at the top. Read the short explanations and hover highlighted words for definitions.")), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("h4", null, "2 \xB7 Play"), /*#__PURE__*/React.createElement("p", {
      className: "muted",
      style: {
        margin: 0,
        fontSize: "0.9rem"
      }
    }, "Every section has simulations and models you can change. Move sliders, drag things, watch what happens.")), /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("h4", null, "3 \xB7 Check as you go"), /*#__PURE__*/React.createElement("p", {
      className: "muted",
      style: {
        margin: 0,
        fontSize: "0.9rem"
      }
    }, "Answer the questions for instant feedback \u2014 your progress ring fills automatically as you work through each section.")))));
  }
  function TopicNav(_ref17) {
    var id = _ref17.id,
      goTo = _ref17.goTo;
    var i = SECTIONS.findIndex(function (s) {
      return s.id === id;
    });
    var prev = i > 0 ? SECTIONS[i - 1] : null,
      next = i < SECTIONS.length - 1 ? SECTIONS[i + 1] : null;
    return /*#__PURE__*/React.createElement("nav", {
      className: "topic-nav"
    }, prev ? /*#__PURE__*/React.createElement("button", {
      className: "topic-nav-btn prev",
      onClick: function onClick() {
        return goTo(prev.id);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "topic-nav-dir"
    }, "\u2190 Previous"), /*#__PURE__*/React.createElement("span", {
      className: "topic-nav-id"
    }, prev.id), /*#__PURE__*/React.createElement("span", {
      className: "topic-nav-label"
    }, prev.label)) : /*#__PURE__*/React.createElement("div", null), next ? /*#__PURE__*/React.createElement("button", {
      className: "topic-nav-btn next",
      onClick: function onClick() {
        return goTo(next.id);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "topic-nav-dir"
    }, "Next \u2192"), /*#__PURE__*/React.createElement("span", {
      className: "topic-nav-id"
    }, next.id), /*#__PURE__*/React.createElement("span", {
      className: "topic-nav-label"
    }, next.label)) : /*#__PURE__*/React.createElement("div", null));
  }
  function GlossaryModal(_ref18) {
    var onClose = _ref18.onClose;
    var _useState19 = useState(""),
      _useState20 = _slicedToArray(_useState19, 2),
      q = _useState20[0],
      setQ = _useState20[1];
    var modalRef = useRef(null);
    var lastFocused = useRef(null);
    var entries = useMemo(function () {
      var all = Object.entries(CFG.glossary || {}).sort(function (a, b) {
        return a[0].localeCompare(b[0]);
      });
      if (!q.trim()) return all;
      var n = q.toLowerCase();
      return all.filter(function (_ref19) {
        var _ref20 = _slicedToArray(_ref19, 2),
          t = _ref20[0],
          d = _ref20[1];
        return t.toLowerCase().includes(n) || String(d).toLowerCase().includes(n);
      });
    }, [q]);
    // remember the opener once and return focus to it when the modal closes
    useEffect(function () {
      lastFocused.current = document.activeElement;
      return function () {
        try {
          lastFocused.current && lastFocused.current.focus();
        } catch (_unused5) {}
      };
    }, []);
    // onClose is a fresh function every parent render, so keep it in a ref and
    // register the key handler only once
    var closeRef = useRef(onClose);
    closeRef.current = onClose;
    useEffect(function () {
      var onKey = function onKey(e) {
        if (e.key === "Escape") {
          closeRef.current();
          return;
        }
        if (e.key === "Tab" && modalRef.current) {
          // simple focus trap
          var f = modalRef.current.querySelectorAll('button, input, [href], textarea, [tabindex]:not([tabindex="-1"])');
          if (!f.length) return;
          var first = f[0],
            last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", onKey);
      return function () {
        return document.removeEventListener("keydown", onKey);
      };
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-scrim",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal",
      ref: modalRef,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Glossary",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "1.4rem"
      }
    }, "Glossary"), /*#__PURE__*/React.createElement("button", {
      className: "icon-btn",
      onClick: onClose,
      "aria-label": "Close glossary"
    }, /*#__PURE__*/React.createElement(IconX, null))), /*#__PURE__*/React.createElement("input", {
      className: "gloss-search",
      placeholder: "Search terms\u2026",
      value: q,
      onChange: function onChange(e) {
        return setQ(e.target.value);
      },
      autoFocus: true
    }), /*#__PURE__*/React.createElement("dl", {
      className: "gloss-list"
    }, entries.map(function (_ref21) {
      var _ref22 = _slicedToArray(_ref21, 2),
        t = _ref22[0],
        d = _ref22[1];
      return /*#__PURE__*/React.createElement("div", {
        className: "gloss-entry",
        key: t
      }, /*#__PURE__*/React.createElement("dt", null, t), /*#__PURE__*/React.createElement("dd", null, d));
    }), !entries.length && /*#__PURE__*/React.createElement("p", {
      className: "muted center",
      style: {
        padding: 20
      }
    }, "No matches."))));
  }
  function SearchModal(_ref23) {
    var onClose = _ref23.onClose,
      goTo = _ref23.goTo;
    var _useState21 = useState(""),
      _useState22 = _slicedToArray(_useState21, 2),
      q = _useState22[0],
      setQ = _useState22[1];
    var modalRef = useRef(null);
    var lastFocused = useRef(null);
    // remember the opener once and return focus to it when the modal closes
    useEffect(function () {
      lastFocused.current = document.activeElement;
      return function () {
        try {
          lastFocused.current && lastFocused.current.focus();
        } catch (_unused6) {}
      };
    }, []);
    // onClose is a fresh function every parent render, so keep it in a ref and
    // register the key handler only once
    var closeRef = useRef(onClose);
    closeRef.current = onClose;
    useEffect(function () {
      var onKey = function onKey(e) {
        if (e.key === "Escape") {
          closeRef.current();
          return;
        }
        if (e.key === "Tab" && modalRef.current) {
          var f = modalRef.current.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])');
          if (!f.length) return;
          var first = f[0],
            last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", onKey);
      return function () {
        return document.removeEventListener("keydown", onKey);
      };
    }, []);
    var n = q.trim().toLowerCase();
    var secHits = !n ? [] : SECTIONS.filter(function (s) {
      return ((s.label || "") + " " + (s.blurb || "") + " " + s.id).toLowerCase().includes(n);
    });
    var glossHits = !n ? [] : Object.entries(CFG.glossary || {}).filter(function (_ref24) {
      var _ref25 = _slicedToArray(_ref24, 2),
        t = _ref25[0],
        d = _ref25[1];
      return (t + " " + d).toLowerCase().includes(n);
    }).slice(0, 10);
    var go = function go(id) {
      onClose();
      goTo(id);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-scrim",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal",
      ref: modalRef,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Search this topic",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-header"
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "1.4rem"
      }
    }, "Search this topic"), /*#__PURE__*/React.createElement("button", {
      className: "icon-btn",
      onClick: onClose,
      "aria-label": "Close search"
    }, /*#__PURE__*/React.createElement(IconX, null))), /*#__PURE__*/React.createElement("input", {
      className: "gloss-search",
      placeholder: "Search section topics and key terms\u2026",
      value: q,
      onChange: function onChange(e) {
        return setQ(e.target.value);
      },
      autoFocus: true
    }), /*#__PURE__*/React.createElement("div", {
      className: "gloss-list"
    }, !n && /*#__PURE__*/React.createElement("p", {
      className: "muted",
      style: {
        padding: "4px 2px"
      }
    }, "Type to search section topics and glossary terms."), n && !secHits.length && !glossHits.length && /*#__PURE__*/React.createElement("p", {
      className: "muted center",
      style: {
        padding: 20
      }
    }, "No matches."), secHits.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "search-group-h"
    }, "Sections"), secHits.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        className: "search-hit",
        onClick: function onClick() {
          return go(s.id);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "chip accent"
      }, s.id), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, s.label), s.blurb ? /*#__PURE__*/React.createElement("span", {
        className: "muted"
      }, " \u2014 ", s.blurb) : null));
    })), glossHits.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "search-group-h"
    }, "Key terms"), /*#__PURE__*/React.createElement("dl", {
      style: {
        margin: 0
      }
    }, glossHits.map(function (_ref26) {
      var _ref27 = _slicedToArray(_ref26, 2),
        t = _ref27[0],
        d = _ref27[1];
      return /*#__PURE__*/React.createElement("div", {
        className: "gloss-entry",
        key: t
      }, /*#__PURE__*/React.createElement("dt", null, t), /*#__PURE__*/React.createElement("dd", null, d));
    }))))));
  }
  function Review(_ref28) {
    var goTo = _ref28.goTo;
    var results = readMCQResults(SKEY);
    var entries = Object.entries(results);
    var answered = entries.length;
    var correct = entries.filter(function (_ref29) {
      var _ref30 = _slicedToArray(_ref29, 2),
        v = _ref30[1];
      return v && v.ok;
    }).length;
    var wrong = entries.filter(function (_ref31) {
      var _ref32 = _slicedToArray(_ref31, 2),
        v = _ref32[1];
      return v && v.ok === false;
    });
    var bySection = {};
    wrong.forEach(function (_ref33) {
      var _ref34 = _slicedToArray(_ref33, 2),
        k = _ref34[0],
        v = _ref34[1];
      var sid = v.section || "?";
      (bySection[sid] = bySection[sid] || []).push(k);
    });
    var sectionLabel = function sectionLabel(id) {
      var s = SECTIONS.find(function (x) {
        return x.id === id;
      });
      return s ? s.label : id;
    };
    var retrySection = function retrySection(sid) {
      (bySection[sid] || []).forEach(function (k) {
        try {
          localStorage.removeItem(k);
        } catch (_unused7) {}
      });
      clearMCQResults(SKEY, function (v) {
        return (v.section || "?") === sid && v.ok === false;
      });
      if (SECTIONS.find(function (x) {
        return x.id === sid;
      })) goTo(sid);else goTo("home");
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "fade-in"
    }, /*#__PURE__*/React.createElement("section", {
      className: "topic-head",
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, "Check your understanding"), /*#__PURE__*/React.createElement("h1", null, "Review"), /*#__PURE__*/React.createElement("p", {
      className: "lead"
    }, answered === 0 ? "You haven't answered any quiz questions yet. Work through the sections and your results will show up here." : "You've answered ".concat(answered, " quiz question").concat(answered === 1 ? "" : "s", " \u2014 ").concat(correct, " correct.")), /*#__PURE__*/React.createElement("div", {
      className: "row",
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost",
      onClick: function onClick() {
        return goTo("home");
      }
    }, "\u2190 Back to overview"))), wrong.length === 0 ? answered > 0 && /*#__PURE__*/React.createElement(Callout, {
      kind: "success",
      title: "Nothing to review"
    }, "Nice work \u2014 you've answered every question correctly so far.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
      style: {
        marginBottom: 6
      }
    }, "Questions to revisit"), /*#__PURE__*/React.createElement("p", {
      className: "muted"
    }, "These are the sections where you got a question wrong. Retry resets those questions so you can have another go."), /*#__PURE__*/React.createElement("div", {
      className: "col",
      style: {
        marginTop: 14
      }
    }, Object.keys(bySection).map(function (sid) {
      return /*#__PURE__*/React.createElement("div", {
        key: sid,
        className: "card between"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700
        }
      }, sectionLabel(sid)), /*#__PURE__*/React.createElement("div", {
        className: "muted",
        style: {
          fontSize: "0.86rem"
        }
      }, bySection[sid].length, " to revisit")), /*#__PURE__*/React.createElement("div", {
        className: "row",
        style: {
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-ghost btn-sm",
        onClick: function onClick() {
          return goTo(sid);
        }
      }, "Go to section"), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-accent btn-sm",
        onClick: function onClick() {
          return retrySection(sid);
        }
      }, "Retry these ", /*#__PURE__*/React.createElement(IconArrow, {
        size: 14,
        sw: 2.5
      }))));
    }))));
  }
  return function App() {
    var _useLocalStorage9 = useLocalStorage(SKEY + ".progress", {}),
      _useLocalStorage0 = _slicedToArray(_useLocalStorage9, 2),
      progressRaw = _useLocalStorage0[0],
      setProgress = _useLocalStorage0[1];
    var progress = progressRaw && _typeof(progressRaw) === "object" ? progressRaw : {}; // guard against a corrupted stored value
    var _useLocalStorage1 = useLocalStorage("jsci.size", "md"),
      _useLocalStorage10 = _slicedToArray(_useLocalStorage1, 2),
      size = _useLocalStorage10[0],
      setSize = _useLocalStorage10[1];
    var _useLocalStorage11 = useLocalStorage("jsci.dark", false),
      _useLocalStorage12 = _slicedToArray(_useLocalStorage11, 2),
      dark = _useLocalStorage12[0],
      setDark = _useLocalStorage12[1];
    var _useLocalStorage13 = useLocalStorage("jsci.dyslexic", false),
      _useLocalStorage14 = _slicedToArray(_useLocalStorage13, 2),
      dys = _useLocalStorage14[0],
      setDys = _useLocalStorage14[1];
    var _useState23 = useState("home"),
      _useState24 = _slicedToArray(_useState23, 2),
      view = _useState24[0],
      setView = _useState24[1];
    var _useState25 = useState(false),
      _useState26 = _slicedToArray(_useState25, 2),
      setOpen = _useState26[0],
      setSetOpen = _useState26[1];
    var _useState27 = useState(false),
      _useState28 = _slicedToArray(_useState27, 2),
      glOpen = _useState28[0],
      setGlOpen = _useState28[1];
    var _useState29 = useState(false),
      _useState30 = _slicedToArray(_useState29, 2),
      searchOpen = _useState30[0],
      setSearchOpen = _useState30[1];
    var _useState31 = useState(false),
      _useState32 = _slicedToArray(_useState31, 2),
      mob = _useState32[0],
      setMob = _useState32[1];
    var scroller = useRef(null);
    useEffect(function () {
      var r = document.documentElement;
      r.dataset.theme = dark ? "dark" : "light";
      r.dataset.size = size;
      r.dataset.dyslexic = dys ? "true" : "false";
      r.dataset.branch = CFG.branch || "general";
    }, [dark, size, dys]);
    useEffect(function () {
      var fromHash = function fromHash() {
        var h = decodeURIComponent(window.location.hash.replace("#", ""));
        if (!h || h === "home") {
          setView("home");
          return;
        }
        if (h === "review" || SECTIONS.find(function (s) {
          return s.id === h;
        })) setView(h);
      };
      fromHash();
      window.addEventListener("hashchange", fromHash);
      return function () {
        return window.removeEventListener("hashchange", fromHash);
      };
    }, []);
    useEffect(function () {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
      setMob(false);
    }, [view]);

    // close the settings popover on Escape or a click/tap outside it
    useEffect(function () {
      if (!setOpen) return;
      var onKey = function onKey(e) {
        if (e.key === "Escape") setSetOpen(false);
      };
      var onDown = function onDown(e) {
        if (!e.target.closest(".settings-pop") && !e.target.closest("[data-settings-toggle]")) setSetOpen(false);
      };
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onDown);
      document.addEventListener("touchstart", onDown);
      return function () {
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("mousedown", onDown);
        document.removeEventListener("touchstart", onDown);
      };
    }, [setOpen]);
    var clearProgress = function clearProgress() {
      if (!confirm("Reset all progress and saved answers for this topic?")) return;
      try {
        localStorage.setItem(SKEY + ".progress", "{}");
        Object.keys(localStorage).forEach(function (k) {
          if (k.indexOf(SKEY + ".mcq.") === 0 || k.indexOf(SKEY + ".wq.") === 0 || k === SKEY + ".results") localStorage.removeItem(k);
        });
        // .att attempt counters share the .mcq key prefix, so they are cleared above
      } catch (_unused8) {}
      // reload so answered quizzes / typed answers already on screen reset too
      // (their state lives in memory, not just in localStorage)
      location.reload();
    };

    // Carry progress between devices: export every key for this topic as a
    // shareable code, and import it back. No account / server needed.
    var exportProgress = function exportProgress() {
      try {
        var data = {};
        Object.keys(localStorage).forEach(function (k) {
          if (k.indexOf(SKEY) === 0) data[k] = localStorage.getItem(k);
        });
        var code = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
        try {
          if (navigator.clipboard) navigator.clipboard.writeText(code);
        } catch (_unused9) {}
        window.prompt("Your progress code (copied to clipboard). On another device, choose “Load progress code” and paste it.", code);
      } catch (e) {
        alert("Sorry, a progress code could not be created on this device.");
      }
    };
    var importProgress = function importProgress() {
      var code = window.prompt("Paste your progress code here:");
      if (!code) return;
      try {
        var data = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
        Object.keys(data).forEach(function (k) {
          if (k.indexOf(SKEY) === 0) localStorage.setItem(k, data[k]);
        });
        alert("Progress loaded. The page will now reload.");
        location.reload();
      } catch (e) {
        alert("That code didn't look right — please check you copied all of it and try again.");
      }
    };

    // Shared/library computer: wipe saved progress + answers for EVERY topic on
    // this device so the next student starts clean. Keeps display settings.
    // No accounts, no passwords — just clears this browser's local data.
    var clearDevice = function clearDevice() {
      if (!confirm("Start fresh on this device?\n\nThis clears saved progress and answers for ALL topics on this computer (your display settings are kept). Use this on a shared/library computer. It can't be undone.")) return;
      try {
        Object.keys(localStorage).forEach(function (k) {
          if (/^y\d+\./.test(k)) localStorage.removeItem(k);
        });
      } catch (_unused0) {}
      location.reload();
    };
    var goTo = function goTo(id) {
      window.location.hash = id;
      setView(id);
    };
    var done = ALL_POINTS.filter(function (p) {
      return progress[p];
    }).length;
    var pct = ALL_POINTS.length ? Math.round(100 * done / ALL_POINTS.length) : 0;
    var sec = SECTIONS.find(function (s) {
      return s.id === view;
    });
    var ctxVal = useMemo(function () {
      return {
        skey: SKEY,
        section: view
      };
    }, [view]);
    return /*#__PURE__*/React.createElement(TopicContext.Provider, {
      value: ctxVal
    }, /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("header", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, CFG.hubHref ? /*#__PURE__*/React.createElement("a", {
      className: "brand-mark",
      href: CFG.hubHref,
      "aria-label": "All Year " + CFG.year + " topics"
    }, (CFG.topicTitle || "?").trim().charAt(0).toUpperCase()) : /*#__PURE__*/React.createElement("button", {
      className: "brand-mark",
      onClick: function onClick() {
        return goTo("home");
      },
      "aria-label": "Home"
    }, (CFG.topicTitle || "?").trim().charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "brand-title"
    }, CFG.topicTitle), /*#__PURE__*/React.createElement("div", {
      className: "brand-sub"
    }, "Year ", CFG.year, " notebook"))), /*#__PURE__*/React.createElement("nav", {
      className: "tabs",
      "aria-label": "Sections"
    }, /*#__PURE__*/React.createElement("button", {
      className: "tab" + (view === "home" ? " active" : ""),
      "aria-current": view === "home" ? "page" : undefined,
      onClick: function onClick() {
        return goTo("home");
      }
    }, /*#__PURE__*/React.createElement(IconHome, {
      size: 15
    }), /*#__PURE__*/React.createElement("span", null, "Overview")), SECTIONS.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        className: "tab" + (view === s.id ? " active" : ""),
        "aria-current": view === s.id ? "page" : undefined,
        onClick: function onClick() {
          return goTo(s.id);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "tab-id"
      }, s.id), /*#__PURE__*/React.createElement("span", null, s.label), /*#__PURE__*/React.createElement("span", {
        className: "tab-progress"
      }, (s.points || []).filter(function (p) {
        return progress[p];
      }).length, "/", (s.points || []).length));
    })), /*#__PURE__*/React.createElement("div", {
      className: "topbar-actions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-chip",
      title: "".concat(done, " of ").concat(ALL_POINTS.length, " complete")
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-ring"
    }, /*#__PURE__*/React.createElement(Ring, {
      pct: pct
    })), /*#__PURE__*/React.createElement("span", {
      className: "progress-text"
    }, pct, "%")), /*#__PURE__*/React.createElement("button", {
      className: "icon-btn",
      onClick: function onClick() {
        return setSearchOpen(true);
      },
      "aria-label": "Search this topic",
      title: "Search"
    }, /*#__PURE__*/React.createElement(IconSearch, null)), CFG.glossary && /*#__PURE__*/React.createElement("button", {
      className: "icon-btn",
      onClick: function onClick() {
        return setGlOpen(true);
      },
      "aria-label": "Glossary",
      title: "Glossary"
    }, /*#__PURE__*/React.createElement(IconBook, null)), /*#__PURE__*/React.createElement("button", {
      className: "icon-btn",
      "data-settings-toggle": true,
      onClick: function onClick() {
        return setSetOpen(function (o) {
          return !o;
        });
      },
      "aria-label": "Reading settings",
      "aria-expanded": setOpen,
      title: "Reading settings"
    }, /*#__PURE__*/React.createElement(IconGear, null)), /*#__PURE__*/React.createElement("button", {
      className: "icon-btn mobile-only",
      onClick: function onClick() {
        return setMob(function (m) {
          return !m;
        });
      },
      "aria-label": "Menu"
    }, /*#__PURE__*/React.createElement(IconMenu, null)), setOpen && /*#__PURE__*/React.createElement("div", {
      className: "settings-pop",
      role: "dialog",
      "aria-label": "Reading settings"
    }, /*#__PURE__*/React.createElement("div", {
      className: "settings-row"
    }, /*#__PURE__*/React.createElement("label", null, "Theme"), /*#__PURE__*/React.createElement("div", {
      className: "seg"
    }, /*#__PURE__*/React.createElement("button", {
      className: !dark ? "on" : "",
      onClick: function onClick() {
        return setDark(false);
      }
    }, "Light"), /*#__PURE__*/React.createElement("button", {
      className: dark ? "on" : "",
      onClick: function onClick() {
        return setDark(true);
      }
    }, "Dark"))), /*#__PURE__*/React.createElement("div", {
      className: "settings-row"
    }, /*#__PURE__*/React.createElement("label", null, "Text size"), /*#__PURE__*/React.createElement("div", {
      className: "seg"
    }, ["sm", "md", "lg", "xl"].map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s,
        className: size === s ? "on" : "",
        onClick: function onClick() {
          return setSize(s);
        },
        style: {
          fontSize: {
            sm: 11,
            md: 13,
            lg: 15,
            xl: 17
          }[s]
        }
      }, "A");
    }))), /*#__PURE__*/React.createElement("div", {
      className: "settings-row"
    }, /*#__PURE__*/React.createElement("label", null, "Readable font"), /*#__PURE__*/React.createElement("div", {
      className: "seg"
    }, /*#__PURE__*/React.createElement("button", {
      className: !dys ? "on" : "",
      onClick: function onClick() {
        return setDys(false);
      }
    }, "Default"), /*#__PURE__*/React.createElement("button", {
      className: dys ? "on" : "",
      onClick: function onClick() {
        return setDys(true);
      }
    }, "Hyperlegible"))), /*#__PURE__*/React.createElement("div", {
      className: "settings-row"
    }, /*#__PURE__*/React.createElement("label", null, "Print this topic"), /*#__PURE__*/React.createElement("button", {
      className: "ghost-btn",
      onClick: function onClick() {
        return window.print();
      }
    }, "Print")), /*#__PURE__*/React.createElement("div", {
      className: "settings-row"
    }, /*#__PURE__*/React.createElement("label", null, "Save progress code"), /*#__PURE__*/React.createElement("button", {
      className: "ghost-btn",
      onClick: exportProgress
    }, "Copy")), /*#__PURE__*/React.createElement("div", {
      className: "settings-row"
    }, /*#__PURE__*/React.createElement("label", null, "Load progress code"), /*#__PURE__*/React.createElement("button", {
      className: "ghost-btn",
      onClick: importProgress
    }, "Paste")), /*#__PURE__*/React.createElement("div", {
      className: "settings-row"
    }, /*#__PURE__*/React.createElement("label", null, "Reset progress"), /*#__PURE__*/React.createElement("button", {
      className: "danger-btn",
      onClick: clearProgress
    }, "Reset")), /*#__PURE__*/React.createElement("div", {
      className: "settings-row"
    }, /*#__PURE__*/React.createElement("label", null, "Start fresh (shared computer)"), /*#__PURE__*/React.createElement("button", {
      className: "danger-btn",
      onClick: clearDevice
    }, "Clear device"))))), mob && /*#__PURE__*/React.createElement("div", {
      className: "mobile-drawer",
      onClick: function onClick() {
        return setMob(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mobile-drawer-inner",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "mobile-tab" + (view === "home" ? " active" : ""),
      onClick: function onClick() {
        return goTo("home");
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "tab-id"
    }, "\u2302"), /*#__PURE__*/React.createElement("span", {
      className: "tab-label"
    }, "Overview")), SECTIONS.map(function (s) {
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        className: "mobile-tab" + (view === s.id ? " active" : ""),
        onClick: function onClick() {
          return goTo(s.id);
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "tab-id"
      }, s.id), /*#__PURE__*/React.createElement("span", {
        className: "tab-label"
      }, s.label), /*#__PURE__*/React.createElement("span", {
        className: "tab-progress"
      }, (s.points || []).filter(function (p) {
        return progress[p];
      }).length, "/", (s.points || []).length));
    }), CFG.hubHref && /*#__PURE__*/React.createElement("a", {
      className: "mobile-tab",
      href: CFG.hubHref,
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "tab-id"
    }, "\u21A9"), /*#__PURE__*/React.createElement("span", {
      className: "tab-label"
    }, "All Year ", CFG.year, " topics")), /*#__PURE__*/React.createElement("a", {
      className: "mobile-tab",
      href: "/"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tab-id"
    }, "\u2302"), /*#__PURE__*/React.createElement("span", {
      className: "tab-label"
    }, "All year groups")))), /*#__PURE__*/React.createElement("main", {
      className: "main-scroll",
      ref: scroller
    }, /*#__PURE__*/React.createElement("div", {
      className: "content-wrap"
    }, view === "home" && /*#__PURE__*/React.createElement(Home, {
      progress: progress,
      goTo: goTo
    }), view === "review" && /*#__PURE__*/React.createElement(Review, {
      goTo: goTo
    }), sec && /*#__PURE__*/React.createElement("div", {
      className: "fade-in"
    }, sec.render({
      progress: progress,
      setProgress: setProgress
    })), sec && /*#__PURE__*/React.createElement(TopicNav, {
      id: view,
      goTo: goTo
    }), /*#__PURE__*/React.createElement("footer", {
      className: "site-footer"
    }, /*#__PURE__*/React.createElement("div", null, "Year ", CFG.year, " Science \xB7 ", CFG.topicTitle, " \xB7 Built for self-paced learning with UDL 3.0 principles: multiple means of representation, engagement, and action and expression."), /*#__PURE__*/React.createElement("div", null, "Your progress saves automatically in this browser. Use the gear icon for dark mode, larger text, or a more readable font.")))), glOpen && /*#__PURE__*/React.createElement(GlossaryModal, {
      onClose: function onClose() {
        return setGlOpen(false);
      }
    }), searchOpen && /*#__PURE__*/React.createElement(SearchModal, {
      onClose: function onClose() {
        return setSearchOpen(false);
      },
      goTo: goTo
    })));
  };
}
function mountTopicApp(CFG) {
  var App = buildApp(CFG);
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
  try {
    window.__mounted = true;
  } catch (_unused1) {}
}
Object.assign(window, {
  useLocalStorage: useLocalStorage,
  useReducedMotion: useReducedMotion,
  TopicContext: TopicContext,
  hashStr: hashStr,
  answerKey: answerKey,
  Icon: Icon,
  IconCheck: IconCheck,
  IconX: IconX,
  IconArrow: IconArrow,
  IconHome: IconHome,
  IconBook: IconBook,
  IconGear: IconGear,
  IconMenu: IconMenu,
  DotPoint: DotPoint,
  Callout: Callout,
  Figure: Figure,
  Term: Term,
  MCQ: MCQ,
  WrittenQ: WrittenQ,
  QGroup: QGroup,
  Interactive: Interactive,
  Slider: Slider,
  SegToggle: SegToggle,
  Stat: Stat,
  Reveal: Reveal,
  FlipCard: FlipCard,
  MatchBuckets: MatchBuckets,
  Ring: Ring,
  buildApp: buildApp,
  mountTopicApp: mountTopicApp
});
