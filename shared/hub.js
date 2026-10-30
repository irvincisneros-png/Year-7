/* Generated from hub.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* ============================================================
   Year landing hub renderer — mountYearHub(CFG)
   Reads each topic's localStorage to show real progress.
   Depends on kit.jsx (Ring, Icon*, useLocalStorage) loaded first.
   ============================================================ */
/* global React, ReactDOM, Ring, IconArrow, IconHome, IconGear, useLocalStorage */
var _React = React,
  useStateH = _React.useState,
  useEffectH = _React.useEffect,
  useMemoH = _React.useMemo;
function topicProgress(topic) {
  if (!topic.storageKey || !topic.points || !topic.points.length) return {
    done: 0,
    total: (topic.points || []).length,
    pct: 0
  };
  var prog = {};
  try {
    var raw = localStorage.getItem(topic.storageKey + ".progress");
    if (raw) prog = JSON.parse(raw);
  } catch (_unused) {}
  if (!prog || _typeof(prog) !== "object") prog = {}; // guard against a corrupted value such as "null"
  var done = topic.points.filter(function (p) {
    return prog[p];
  }).length;
  return {
    done: done,
    total: topic.points.length,
    pct: topic.points.length ? Math.round(100 * done / topic.points.length) : 0
  };
}
function YearHub(CFG) {
  return function Hub() {
    var _useLocalStorage = useLocalStorage("jsci.dark", false),
      _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
      dark = _useLocalStorage2[0],
      setDark = _useLocalStorage2[1];
    var _useLocalStorage3 = useLocalStorage("jsci.size", "md"),
      _useLocalStorage4 = _slicedToArray(_useLocalStorage3, 2),
      size = _useLocalStorage4[0],
      setSize = _useLocalStorage4[1];
    var _useLocalStorage5 = useLocalStorage("jsci.dyslexic", false),
      _useLocalStorage6 = _slicedToArray(_useLocalStorage5, 2),
      dys = _useLocalStorage6[0],
      setDys = _useLocalStorage6[1];
    var _useStateH = useStateH(false),
      _useStateH2 = _slicedToArray(_useStateH, 2),
      open = _useStateH2[0],
      setOpen = _useStateH2[1];
    useEffectH(function () {
      var r = document.documentElement;
      r.dataset.theme = dark ? "dark" : "light";
      r.dataset.size = size;
      r.dataset.dyslexic = dys ? "true" : "false";
      r.dataset.branch = "general";
    }, [dark, size, dys]);

    // close the settings popover on Escape or a click/tap outside it
    useEffectH(function () {
      if (!open) return;
      var onKey = function onKey(e) {
        if (e.key === "Escape") setOpen(false);
      };
      var onDown = function onDown(e) {
        if (!e.target.closest(".settings-pop") && !e.target.closest("[data-settings-toggle]")) setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onDown);
      document.addEventListener("touchstart", onDown);
      return function () {
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("mousedown", onDown);
        document.removeEventListener("touchstart", onDown);
      };
    }, [open]);
    var clearDevice = function clearDevice() {
      if (!confirm("Start fresh on this device?\n\nThis clears saved progress and answers for ALL topics on this computer (your display settings are kept). Use this on a shared/library computer. It can't be undone.")) return;
      try {
        Object.keys(localStorage).forEach(function (k) {
          if (/^y\d+\./.test(k)) localStorage.removeItem(k);
        });
      } catch (_unused2) {}
      window.location.reload();
    };
    var totals = useMemoH(function () {
      var done = 0,
        total = 0;
      CFG.topics.forEach(function (t) {
        var p = topicProgress(t);
        done += p.done;
        total += p.total;
      });
      return {
        done: done,
        total: total,
        pct: total ? Math.round(100 * done / total) : 0
      };
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      className: "hub"
    }, /*#__PURE__*/React.createElement("header", {
      className: "hub-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand-mark"
    }, /*#__PURE__*/React.createElement(IconHome, {
      size: 20
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "brand-title"
    }, CFG.schoolTitle || "Junior Science"), /*#__PURE__*/React.createElement("div", {
      className: "brand-sub"
    }, "Year ", CFG.year, " \xB7 NSW Stage ", CFG.stage || (CFG.year <= 8 ? 4 : 5)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("a", {
      className: "icon-btn",
      href: "/",
      "aria-label": "All year groups \u2014 Junior Science home",
      title: "All year groups",
      style: {
        width: "auto",
        padding: "0 14px",
        gap: 8,
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement(IconHome, {
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.85rem",
        fontWeight: 600
      }
    }, "All years")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "icon-btn",
      "data-settings-toggle": true,
      onClick: function onClick() {
        return setOpen(function (o) {
          return !o;
        });
      },
      "aria-label": "Display settings",
      "aria-expanded": open,
      title: "Display settings"
    }, /*#__PURE__*/React.createElement(IconGear, null)), open && /*#__PURE__*/React.createElement("div", {
      className: "settings-pop",
      role: "dialog",
      "aria-label": "Display settings"
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
    }, /*#__PURE__*/React.createElement("label", null, "Start fresh (shared computer)"), /*#__PURE__*/React.createElement("button", {
      className: "danger-btn",
      onClick: clearDevice
    }, "Clear device")))))), /*#__PURE__*/React.createElement("div", {
      className: "hub-wrap"
    }, /*#__PURE__*/React.createElement("section", {
      className: "hub-hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hub-eyebrow"
    }, "Year ", CFG.year, " Science \xB7 ", CFG.syllabus || "NSW Syllabus"), /*#__PURE__*/React.createElement("h1", null, CFG.title), /*#__PURE__*/React.createElement("p", {
      className: "hub-lede"
    }, CFG.lede), /*#__PURE__*/React.createElement("div", {
      className: "hub-meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "m"
    }, /*#__PURE__*/React.createElement("b", null, CFG.topics.length), " topics"), /*#__PURE__*/React.createElement("span", {
      className: "m"
    }, /*#__PURE__*/React.createElement("b", null, CFG.topics.reduce(function (a, t) {
      return a + (t.points ? t.points.length : 0);
    }, 0)), " sections"), totals.total > 0 && /*#__PURE__*/React.createElement("span", {
      className: "m",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Ring, {
      pct: totals.pct,
      size: 26,
      sw: 3
    }), " ", /*#__PURE__*/React.createElement("b", null, totals.pct, "%"), " complete"))), /*#__PURE__*/React.createElement("div", {
      className: "hub-section-head"
    }, /*#__PURE__*/React.createElement("h2", null, "Choose a topic"), /*#__PURE__*/React.createElement("p", null, "Four units make up your year. Jump into any one, work at your own pace, and your progress is saved automatically.")), /*#__PURE__*/React.createElement("div", {
      className: "hub-grid"
    }, CFG.topics.map(function (t) {
      var pr = topicProgress(t);
      var live = t.status !== "soon" && t.href;
      var Inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: "stripe"
      }), !live && /*#__PURE__*/React.createElement("span", {
        className: "soon-pill"
      }, "Coming soon"), /*#__PURE__*/React.createElement("div", {
        className: "hub-card-emoji"
      }, t.emoji), /*#__PURE__*/React.createElement("div", {
        className: "hub-card-num"
      }, t.kicker || "Topic " + t.n), /*#__PURE__*/React.createElement("h3", null, t.title), /*#__PURE__*/React.createElement("p", {
        className: "hub-card-blurb"
      }, t.blurb), /*#__PURE__*/React.createElement("div", {
        className: "hub-card-tags"
      }, (t.tags || []).map(function (tag) {
        return /*#__PURE__*/React.createElement("span", {
          key: tag,
          className: "chip"
        }, tag);
      })), live && t.points && t.points.length > 0 && /*#__PURE__*/React.createElement("div", {
        className: "hub-card-foot"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bar"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: pr.pct + "%"
        }
      })), /*#__PURE__*/React.createElement("span", {
        className: "pct"
      }, pr.done, "/", pr.total)), live && /*#__PURE__*/React.createElement("div", {
        className: "open-row"
      }, "Open topic ", /*#__PURE__*/React.createElement(IconArrow, {
        size: 15,
        sw: 2.5
      })));
      return live ? /*#__PURE__*/React.createElement("a", {
        key: t.title,
        className: "hub-card branch-" + (t.branch || "general"),
        href: t.href
      }, Inner) : /*#__PURE__*/React.createElement("div", {
        key: t.title,
        className: "hub-card soon branch-" + (t.branch || "general")
      }, Inner);
    })), /*#__PURE__*/React.createElement("section", {
      className: "hub-strip"
    }, /*#__PURE__*/React.createElement("h2", null, "Made for every learner"), /*#__PURE__*/React.createElement("p", {
      className: "muted",
      style: {
        margin: 0
      }
    }, "Built on the Universal Design for Learning (UDL 3.0) framework so you can learn the way that works for you."), /*#__PURE__*/React.createElement("div", {
      className: "hub-feature-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hub-feature"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fi"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v2M12 20v2M2 12h2M20 12h2"
    }))), /*#__PURE__*/React.createElement("h4", null, "See it your way"), /*#__PURE__*/React.createElement("p", null, "Switch to dark mode, bump up the text size, or turn on a high-readability font from the gear menu.")), /*#__PURE__*/React.createElement("div", {
      className: "hub-feature"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fi"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("polygon", {
      points: "5 3 19 12 5 21 5 3"
    }))), /*#__PURE__*/React.createElement("h4", null, "Learn by doing"), /*#__PURE__*/React.createElement("p", null, "Simulations, sliders and models you can tinker with turn every idea into something you can poke at.")), /*#__PURE__*/React.createElement("div", {
      className: "hub-feature"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fi"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "22 4 12 14.01 9 11.01"
    }))), /*#__PURE__*/React.createElement("h4", null, "Check as you go"), /*#__PURE__*/React.createElement("p", null, "Instant-feedback quizzes, model answers, and a progress ring that fills automatically as you work through each section.")))), /*#__PURE__*/React.createElement("footer", {
      className: "hub-footer"
    }, /*#__PURE__*/React.createElement("div", null, "Year ", CFG.year, " Science \xB7 ", CFG.syllabus || "NSW Syllabus", " \xB7 Self-paced interactive learning built on UDL 3.0 principles."), /*#__PURE__*/React.createElement("div", null, "Your progress saves automatically in this browser."))));
  };
}
function mountYearHub(CFG) {
  var Hub = YearHub(CFG);
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Hub, null));
  try {
    window.__mounted = true;
  } catch (_unused3) {}
}
window.mountYearHub = mountYearHub;
