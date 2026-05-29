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
        (done ? "background:#3f8a4a;color:#fff;" : "background:#fff;color:#1b1a17;");
    }
    btn.onclick = function () { setDone(!isDone()); render(); };
    render();
    wrap.appendChild(btn);
    document.body.appendChild(wrap);
  }

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
