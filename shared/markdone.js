/* ============================================================
   markdone.js — lightweight "Mark topic as done" widget
   For topics that are NOT built on the shared kit framework
   (Forces, Periodic Table, Diseases). It writes the same
   localStorage shape the year hub reads:
       localStorage["<storageKey>.progress"] = { done: true }
   so completing the topic fills its hub card + the year ring.

   Usage (in the topic's index.html, before </body>):
     <script>window.__MARKDONE_KEY = "y7.forces";</script>
     <script src="../shared/markdone.js"></script>
   ============================================================ */
(function () {
  var KEY = window.__MARKDONE_KEY;
  if (!KEY) return;
  var PKEY = KEY + ".progress";

  function isDone() {
    try { return !!(JSON.parse(localStorage.getItem(PKEY) || "{}").done); }
    catch (e) { return false; }
  }
  function setDone(v) {
    try { localStorage.setItem(PKEY, JSON.stringify(v ? { done: true } : {})); } catch (e) {}
  }

  function build() {
    if (document.getElementById("__markdone")) return;
    var wrap = document.createElement("div");
    wrap.id = "__markdone";
    wrap.style.cssText = "position:fixed;right:16px;bottom:16px;z-index:9500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;";
    var btn = document.createElement("button");
    btn.setAttribute("aria-pressed", isDone() ? "true" : "false");
    function render() {
      var done = isDone();
      btn.textContent = done ? "✓ Topic done" : "Mark topic as done";
      btn.setAttribute("aria-pressed", done ? "true" : "false");
      btn.style.cssText =
        "padding:11px 18px;border-radius:999px;border:1.5px solid #1b1a17;font-weight:700;font-size:14px;cursor:pointer;" +
        "box-shadow:0 4px 0 -2px #1b1a17,0 8px 22px rgba(27,26,23,.18);" +
        (done ? "background:#2e6837;color:#fff;" : "background:#fff;color:#1b1a17;");
    }
    btn.onclick = function () { setDone(!isDone()); render(); };
    render();
    wrap.appendChild(btn);
    document.body.appendChild(wrap);
    fitPhone();
  }

  // On phones the fixed button would sit over the text, so it shrinks and only
  // appears near the end of the page (where you'd mark the topic done anyway).
  // Some topics scroll inside their own panel rather than the page, so track
  // whichever element the student is actually scrolling.
  var scroller = null;
  function scrollable(el) {
    return el && el.scrollHeight > el.clientHeight + 40;
  }
  function findScroller() {
    if (scrollable(scroller) && document.contains(scroller)) return scroller;
    var best = document.scrollingElement || document.documentElement;
    if (!scrollable(best)) {
      var els = document.querySelectorAll("main, div, section, article");
      for (var i = 0; i < els.length; i++) {
        var oy = getComputedStyle(els[i]).overflowY;
        if ((oy === "auto" || oy === "scroll") && scrollable(els[i]) &&
            (!scrollable(best) || els[i].clientHeight > best.clientHeight)) best = els[i];
      }
    }
    return best;
  }
  function fitPhone(e) {
    var wrap = document.getElementById("__markdone");
    if (!wrap) return;
    if (e && e.target && e.target.nodeType === 1 && scrollable(e.target)) scroller = e.target;
    var phone = window.innerWidth < 700;
    var btn = wrap.firstChild;
    if (btn) { btn.style.padding = phone ? "8px 14px" : "11px 18px"; btn.style.fontSize = phone ? "13px" : "14px"; }
    wrap.style.right = phone ? "12px" : "16px";
    wrap.style.bottom = phone ? "12px" : "16px";
    var sc = findScroller();
    var nearEnd = !scrollable(sc) || sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 400;
    var show = !phone || nearEnd;
    wrap.style.opacity = show ? "1" : "0";
    wrap.style.pointerEvents = show ? "auto" : "none";
    wrap.style.transition = "opacity .2s";
    if (btn) btn.tabIndex = show ? 0 : -1;
  }
  document.addEventListener("scroll", fitPhone, { passive: true, capture: true });
  window.addEventListener("resize", fitPhone);
  setInterval(fitPhone, 1000);   // content and tabs change after load

  // Attach on several signals + a couple of delayed retries, because some
  // self-contained topics (e.g. the Forces bundle) replace the DOM after load,
  // which would otherwise wipe the button. build() is a no-op if it already exists.
  function attach() { try { build(); } catch (e) {} }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", attach);
  else attach();
  window.addEventListener("load", attach);
  setTimeout(attach, 1500);
  setTimeout(attach, 4000);
})();
