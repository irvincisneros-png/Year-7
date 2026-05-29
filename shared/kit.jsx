/* ============================================================
   Junior Science — Shared Topic Framework (kit.jsx)
   Builds a full topic app from a CONFIG object.
   All components are attached to window so per-topic content
   files can use them as globals (Babel-standalone friendly).
   ============================================================ */
/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo, useCallback, useContext } = React;

/* ---------- persistence ---------- */
function useLocalStorage(key, initial) {
  const [v, setV] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw !== null ? JSON.parse(raw) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

/* Topic-wide context so leaf components (quizzes, etc.) can derive a stable
   localStorage key without every content.jsx having to pass the topic key. */
const TopicContext = React.createContext({ skey: null });

/* tiny stable string hash -> short base36, for per-question storage keys */
function hashStr(s) {
  s = String(s == null ? "" : s);
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
  return (h >>> 0).toString(36);
}
function answerKey(skey, kind, num, question) {
  return (skey || "anon") + "." + kind + "." + (num == null ? "" : num) + "." + hashStr(question);
}

/* Respect the OS "reduce motion" setting in JS-driven animations
   (a CSS media query can't stop a setInterval). content.jsx can call this. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { return false; }
  });
  useEffect(() => {
    let mq;
    try { mq = window.matchMedia("(prefers-reduced-motion: reduce)"); } catch { return; }
    const on = () => setReduced(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", on); else mq.addListener(on);
    return () => { if (mq.removeEventListener) mq.removeEventListener("change", on); else mq.removeListener(on); };
  }, []);
  return reduced;
}

/* ---------- icons ---------- */
const Icon = ({ d, size = 18, fill = "none", sw = 2, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d ? <path d={d}/> : children}</svg>
);
const IconCheck = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>;
const IconX = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
const IconArrow = (p) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Icon>;
const IconHome = (p) => <Icon {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>;
const IconBook = (p) => <Icon {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></Icon>;
const IconGear = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H7a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>;
const IconMenu = (p) => <Icon {...p}><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></Icon>;

/* ---------- content primitives ---------- */
function DotPoint({ id, title, children, progress, setProgress }) {
  const done = !!(progress && progress[id]);
  const toggle = () => setProgress(p => ({ ...p, [id]: !p[id] }));
  return (
    <section className="dot-point" id={"dp-" + id}>
      <header className="dp-header">
        <span className="dp-id">{id}</span>
        <h3 className="dp-title">{title}</h3>
        <button className={"dp-check" + (done ? " done" : "")} onClick={toggle}
          aria-label={done ? "Mark as not done" : "Mark as done"} title={done ? "Done" : "Mark as done"}>
          {done && <IconCheck size={16} sw={3}/>}
        </button>
      </header>
      <div className="dp-body">{children}</div>
    </section>
  );
}

function Callout({ kind = "key", title, children }) {
  return <div className={"callout " + kind}>{title && <h4>{title}</h4>}{children}</div>;
}

function Figure({ num, caption, src, alt, children, maxWidth }) {
  return (
    <figure className="figure" style={maxWidth ? { maxWidth, marginLeft: "auto", marginRight: "auto" } : undefined}>
      {src ? <img src={src} alt={alt || caption} loading="lazy"/> : children}
      {caption && <figcaption className="figure-caption">{num && <strong>Figure {num}. </strong>}{caption}</figcaption>}
    </figure>
  );
}

function Term({ children, def }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const popId = useMemo(() => "term-" + hashStr(String(def) + String(children)), [def, children]);
  useEffect(() => {
    if (!show) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setShow(false); };
    const onKey = (e) => { if (e.key === "Escape") setShow(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("touchstart", onDoc); document.removeEventListener("keydown", onKey); };
  }, [show]);
  // rendered as a button so it is keyboard-focusable and tap-toggles on touch;
  // hover still reveals the definition via CSS for mouse users.
  return (
    <button type="button" ref={ref} className={"term" + (show ? " show" : "")}
      aria-expanded={show} aria-describedby={popId} onClick={() => setShow(s => !s)}>
      {children}<span className="term-pop" id={popId} role="tooltip">{def}</span>
    </button>
  );
}

function MCQ({ num, question, options, correct, explain }) {
  const { skey } = useContext(TopicContext);
  // the chosen answer is saved per question so it survives navigation / refresh
  const [chosen, setChosen] = useLocalStorage(answerKey(skey, "mcq", num, question), null);
  const locked = chosen !== null;
  return (
    <div className="quiz-card">
      <div className="quiz-q"><span className="quiz-q-num">{num || "?"}</span><span>{question}</span></div>
      <div className="quiz-options">
        {options.map((o, i) => {
          let cls = "quiz-opt";
          if (locked && i === correct) cls += " correct";
          else if (locked && i === chosen) cls += " wrong";
          return (
            <button key={i} className={cls} onClick={() => !locked && setChosen(i)} disabled={locked}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.6, minWidth: 14 }}>{String.fromCharCode(65 + i)}</span>
              <span style={{ flex: 1 }}>{o}</span>
              {locked && i === correct && <IconCheck size={16} sw={2.5}/>}
              {locked && i === chosen && i !== correct && <IconX size={16} sw={2.5}/>}
            </button>
          );
        })}
      </div>
      {locked && (
        <div className="quiz-feedback" role="status" aria-live="polite">
          {chosen === correct ? "Correct. " : "Not quite. "}{explain}
          {chosen !== correct && (
            <div style={{ marginTop: 10 }}>
              <button className="reveal-btn" onClick={() => setChosen(null)}>Try again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function WrittenQ({ num, question, model }) {
  const { skey } = useContext(TopicContext);
  // the typed answer is saved so it is never lost on navigation / refresh
  const [val, setVal] = useLocalStorage(answerKey(skey, "wq", num, question), "");
  const [show, setShow] = useState(false);
  return (
    <div className="quiz-card">
      <div className="quiz-q"><span className="quiz-q-num">{num || "?"}</span><span>{question}</span></div>
      <textarea className="response-box" value={val} onChange={e => setVal(e.target.value)} placeholder="Type your answer here…"/>
      {model && <>
        <button className="reveal-btn" onClick={() => setShow(s => !s)} aria-expanded={show}>{show ? "Hide model answer" : "Show model answer"}</button>
        {show && <div className="model-answer" role="region" aria-label="Model answer"><strong>Model answer. </strong>{model}</div>}
      </>}
    </div>
  );
}

function QGroup({ title, children }) {
  return (
    <div className="q-group">
      <div className="q-group-title"><span className="kicker">Check yourself</span><h4 style={{ margin: 0 }}>{title}</h4></div>
      {children}
    </div>
  );
}

function Interactive({ title, subtitle, children }) {
  return (
    <div className="interactive">
      <div className="interactive-label">Interactive</div>
      {title && <div className="interactive-title">{title}</div>}
      {subtitle && <div className="interactive-sub">{subtitle}</div>}
      {children}
    </div>
  );
}

/* ---------- interactive building blocks ---------- */
function Slider({ label, min, max, step = 1, value, onChange, unit = "", fmt }) {
  return (
    <div className="ctrl">
      <label>{label}<span className="val">{fmt ? fmt(value) : value}{unit}</span></label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(parseFloat(e.target.value))}/>
    </div>
  );
}
function SegToggle({ options, value, onChange }) {
  return (
    <div className="seg-toggle">
      {options.map(o => {
        const val = typeof o === "object" ? o.value : o;
        const lab = typeof o === "object" ? o.label : o;
        return <button key={val} className={value === val ? "on" : ""} onClick={() => onChange(val)}>{lab}</button>;
      })}
    </div>
  );
}
function Stat({ value, label }) {
  return <div className="stat"><div className="stat-val">{value}</div><div className="stat-label">{label}</div></div>;
}
function Reveal({ children, label = "Reveal hidden answer" }) {
  const [shown, setShown] = useState(false);
  // a real button so it is keyboard-focusable and operable with Enter/Space
  return (
    <button type="button" className={"reveal-blur" + (shown ? " shown" : "")}
      onClick={() => setShown(true)} aria-expanded={shown} aria-label={shown ? undefined : label}>
      {children}
    </button>
  );
}
function FlipCard({ front, back }) {
  const [f, setF] = useState(false);
  return (
    <button className="card" style={{ cursor: "pointer", minHeight: 90, textAlign: "left", width: "100%" }} onClick={() => setF(v => !v)}>
      <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-muted)", marginBottom: 6 }}>{f ? "Answer" : "Tap to flip"}</div>
      <div>{f ? back : front}</div>
    </button>
  );
}
/* drag-to-bucket matching: items = [{id,label,bucket}], buckets=[{id,label}] */
function MatchBuckets({ items, buckets }) {
  const [placed, setPlaced] = useState({});
  const [drag, setDrag] = useState(null);
  const [over, setOver] = useState(null);
  const allPlaced = items.every(it => placed[it.id]);
  const allCorrect = allPlaced && items.every(it => placed[it.id] === it.bucket);
  const drop = (b) => { if (drag) { setPlaced(p => ({ ...p, [drag]: b })); setDrag(null); setOver(null); } };
  return (
    <div>
      <div className="row" style={{ marginBottom: 14 }}>
        {items.filter(it => !placed[it.id]).map(it => (
          <span key={it.id} className="drag-chip" draggable onDragStart={() => setDrag(it.id)} onClick={() => setDrag(drag === it.id ? null : it.id)} style={drag === it.id ? { borderColor: "var(--accent)", boxShadow: "var(--shadow-2)" } : {}}>{it.label}</span>
        ))}
        {items.every(it => placed[it.id]) && <span className="chip ok">All placed</span>}
      </div>
      <div className="grid-2">
        {buckets.map(b => (
          <div key={b.id} className={"drop-zone" + (over === b.id ? " over" : "")}
            onDragOver={e => { e.preventDefault(); setOver(b.id); }} onDragLeave={() => setOver(null)} onDrop={() => drop(b.id)} onClick={() => drag && drop(b.id)}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{b.label}</div>
            <div className="row">
              {items.filter(it => placed[it.id] === b.id).map(it => {
                const ok = it.bucket === b.id;
                return <span key={it.id} className="drag-chip" style={{ borderColor: ok ? "var(--green-deep)" : "var(--red)", background: ok ? "var(--green-soft)" : "var(--red-soft)" }} onClick={() => setPlaced(p => { const n = { ...p }; delete n[it.id]; return n; })}>{it.label} {ok ? "✓" : "✕"}</span>;
              })}
            </div>
          </div>
        ))}
      </div>
      {allPlaced && <div className="quiz-feedback" style={{ marginTop: 12 }}>{allCorrect ? "Every item is in the right place. Well done." : "Some items are misplaced. Tap a placed chip to send it back and try again."}</div>}
    </div>
  );
}

/* ---------- progress ring ---------- */
function Ring({ pct, size = 22, sw = 2.5, stroke = "var(--accent)" }) {
  const r = (size - sw) / 2 - 0.5, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth={sw}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={stroke} strokeWidth={sw}
        strokeDasharray={`${(pct/100)*c} ${c}`} transform={`rotate(-90 ${size/2} ${size/2})`} strokeLinecap="round"/>
    </svg>
  );
}

/* ============================================================ App shell */
function buildApp(CFG) {
  const SECTIONS = CFG.sections;
  const ALL_POINTS = SECTIONS.flatMap(s => s.points || []);
  const SKEY = CFG.storageKey;

  function Home({ progress, goTo }) {
    const done = ALL_POINTS.filter(p => progress[p]).length;
    const pct = ALL_POINTS.length ? Math.round(100 * done / ALL_POINTS.length) : 0;
    const cont = useMemo(() => {
      const ip = SECTIONS.find(s => { const d = (s.points||[]).filter(p => progress[p]).length; return d > 0 && d < s.points.length; });
      if (ip) return ip;
      return SECTIONS.find(s => (s.points||[]).every(p => !progress[p])) || SECTIONS[0];
    }, [progress]);
    const ctaLabel = done === 0 ? "Start learning" : done === ALL_POINTS.length ? "Review everything" : "Continue where you left off";
    return (
      <div className="fade-in">
        <section className="topic-head" style={{ marginBottom: 28 }}>
          <div className="eyebrow">Year {CFG.year} Science · {CFG.strand || "NSW Syllabus"}</div>
          <h1>{CFG.topicTitle}</h1>
          <p className="lead">{CFG.intro}</p>
          {CFG.heroImage && (
            <img src={CFG.heroImage} alt={CFG.topicTitle} loading="lazy"
              style={{ width: "100%", display: "block", marginTop: 20, borderRadius: 14, border: "2px solid var(--border-strong)", boxShadow: "6px 6px 0 var(--border-strong)" }} />
          )}
          <div className="row" style={{ marginTop: 22, alignItems: "center" }}>
            <button className="btn btn-accent" onClick={() => goTo(cont.id)}>{ctaLabel} <IconArrow size={16} sw={2.5}/></button>
            {CFG.hubHref && <a className="btn btn-ghost" href={CFG.hubHref}>← All Year {CFG.year} topics</a>}
            <div className="spacer"/>
            <div className="row" style={{ alignItems: "center", gap: 10 }}>
              <Ring pct={pct} size={46} sw={5}/>
              <div><div style={{ fontWeight: 700 }}>{done} of {ALL_POINTS.length}</div><div className="muted" style={{ fontSize: "0.8rem" }}>sections complete</div></div>
            </div>
          </div>
        </section>

        <div className="grid-2">
          {SECTIONS.map(s => {
            const d = (s.points||[]).filter(p => progress[p]).length;
            const sp = s.points && s.points.length ? Math.round(100 * d / s.points.length) : 0;
            return (
              <button key={s.id} className={"card accent-" + (s.accent || CFG.accent)} style={{ textAlign: "left", cursor: "pointer", borderLeft: "5px solid var(--accent)", display: "flex", flexDirection: "column", gap: 8 }} onClick={() => goTo(s.id)}>
                <div className="between"><span className="chip accent">{s.id}</span><span className="muted" style={{ fontSize: "0.8rem", fontVariantNumeric: "tabular-nums" }}>{d}/{(s.points||[]).length}</span></div>
                <h3 style={{ fontSize: "1.3rem" }}>{s.label}</h3>
                {s.blurb && <p className="muted" style={{ fontSize: "0.92rem", margin: 0 }}>{s.blurb}</p>}
                <div className="progressbar" style={{ marginTop: 4 }}><div style={{ width: sp + "%", background: "var(--accent)" }}/></div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent-deep)", fontWeight: 600, fontSize: "0.88rem", marginTop: 4 }}>Open section <IconArrow size={14} sw={2.5}/></div>
              </button>
            );
          })}
        </div>

        <section style={{ marginTop: 32 }}>
          <h2 style={{ marginBottom: 6 }}>How to use this site</h2>
          <p className="muted">Read a little, play a little, then check yourself. Everything saves automatically in this browser.</p>
          <div className="grid-3" style={{ marginTop: 14 }}>
            <div className="card"><h4>1 · Explore</h4><p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>Open any section from the tabs at the top. Read the short explanations and hover highlighted words for definitions.</p></div>
            <div className="card"><h4>2 · Play</h4><p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>Every section has simulations and models you can change. Move sliders, drag things, watch what happens.</p></div>
            <div className="card"><h4>3 · Check + tick off</h4><p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>Answer the questions for instant feedback, then tick the circle on each section to fill your progress ring.</p></div>
          </div>
        </section>
      </div>
    );
  }

  function TopicNav({ id, goTo }) {
    const i = SECTIONS.findIndex(s => s.id === id);
    const prev = i > 0 ? SECTIONS[i-1] : null, next = i < SECTIONS.length-1 ? SECTIONS[i+1] : null;
    return (
      <nav className="topic-nav">
        {prev ? <button className="topic-nav-btn prev" onClick={() => goTo(prev.id)}><span className="topic-nav-dir">← Previous</span><span className="topic-nav-id">{prev.id}</span><span className="topic-nav-label">{prev.label}</span></button> : <div/>}
        {next ? <button className="topic-nav-btn next" onClick={() => goTo(next.id)}><span className="topic-nav-dir">Next →</span><span className="topic-nav-id">{next.id}</span><span className="topic-nav-label">{next.label}</span></button> : <div/>}
      </nav>
    );
  }

  function GlossaryModal({ onClose }) {
    const [q, setQ] = useState("");
    const modalRef = useRef(null);
    const lastFocused = useRef(null);
    const entries = useMemo(() => {
      const all = Object.entries(CFG.glossary || {}).sort((a, b) => a[0].localeCompare(b[0]));
      if (!q.trim()) return all;
      const n = q.toLowerCase();
      return all.filter(([t, d]) => t.toLowerCase().includes(n) || String(d).toLowerCase().includes(n));
    }, [q]);
    useEffect(() => {
      lastFocused.current = document.activeElement;
      const onKey = (e) => {
        if (e.key === "Escape") { onClose(); return; }
        if (e.key === "Tab" && modalRef.current) {
          // simple focus trap
          const f = modalRef.current.querySelectorAll('button, input, [href], textarea, [tabindex]:not([tabindex="-1"])');
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        try { lastFocused.current && lastFocused.current.focus(); } catch {}
      };
    }, [onClose]);
    return (
      <div className="modal-scrim" onClick={onClose}>
        <div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-label="Glossary" onClick={e => e.stopPropagation()}>
          <div className="modal-header"><h2 style={{ fontSize: "1.4rem" }}>Glossary</h2><button className="icon-btn" onClick={onClose} aria-label="Close glossary"><IconX/></button></div>
          <input className="gloss-search" placeholder="Search terms…" value={q} onChange={e => setQ(e.target.value)} autoFocus/>
          <dl className="gloss-list">
            {entries.map(([t, d]) => <div className="gloss-entry" key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
            {!entries.length && <p className="muted center" style={{ padding: 20 }}>No matches.</p>}
          </dl>
        </div>
      </div>
    );
  }

  return function App() {
    const [progress, setProgress] = useLocalStorage(SKEY + ".progress", {});
    const [size, setSize] = useLocalStorage("jsci.size", "md");
    const [dark, setDark] = useLocalStorage("jsci.dark", false);
    const [dys, setDys] = useLocalStorage("jsci.dyslexic", false);
    const [view, setView] = useState("home");
    const [setOpen, setSetOpen] = useState(false);
    const [glOpen, setGlOpen] = useState(false);
    const [mob, setMob] = useState(false);
    const scroller = useRef(null);

    useEffect(() => {
      const r = document.documentElement;
      r.dataset.theme = dark ? "dark" : "light";
      r.dataset.size = size;
      r.dataset.dyslexic = dys ? "true" : "false";
    }, [dark, size, dys]);

    useEffect(() => {
      const fromHash = () => {
        const h = decodeURIComponent(window.location.hash.replace("#", ""));
        if (!h || h === "home") { setView("home"); return; }
        if (SECTIONS.find(s => s.id === h)) setView(h);
      };
      fromHash();
      window.addEventListener("hashchange", fromHash);
      return () => window.removeEventListener("hashchange", fromHash);
    }, []);
    useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); setMob(false); }, [view]);

    // close the settings popover on Escape or a click/tap outside it
    useEffect(() => {
      if (!setOpen) return;
      const onKey = (e) => { if (e.key === "Escape") setSetOpen(false); };
      const onDown = (e) => { if (!e.target.closest(".settings-pop") && !e.target.closest("[data-settings-toggle]")) setSetOpen(false); };
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onDown);
      document.addEventListener("touchstart", onDown);
      return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); document.removeEventListener("touchstart", onDown); };
    }, [setOpen]);

    const clearProgress = () => {
      if (!confirm("Reset all progress and saved answers for this topic?")) return;
      setProgress({});
      try {
        Object.keys(localStorage).forEach(k => {
          if (k.indexOf(SKEY + ".mcq.") === 0 || k.indexOf(SKEY + ".wq.") === 0) localStorage.removeItem(k);
        });
      } catch {}
    };

    const goTo = (id) => { window.location.hash = id; setView(id); };
    const done = ALL_POINTS.filter(p => progress[p]).length;
    const pct = ALL_POINTS.length ? Math.round(100 * done / ALL_POINTS.length) : 0;
    const sec = SECTIONS.find(s => s.id === view);
    const ctxVal = useMemo(() => ({ skey: SKEY }), []);

    return (
      <TopicContext.Provider value={ctxVal}>
      <div className={"app accent-" + ((sec && sec.accent) || CFG.accent)}>
        <header className="topbar">
          <div className="brand">
            {CFG.hubHref
              ? <a className="brand-mark" href={CFG.hubHref} aria-label={"All Year " + CFG.year + " topics"}>{(CFG.topicTitle || "?").trim().charAt(0).toUpperCase()}</a>
              : <button className="brand-mark" onClick={() => goTo("home")} aria-label="Home">{(CFG.topicTitle || "?").trim().charAt(0).toUpperCase()}</button>}
            <div><div className="brand-title">{CFG.topicTitle}</div><div className="brand-sub">Year {CFG.year} notebook</div></div>
          </div>
          <nav className="tabs" aria-label="Sections">
            <button className={"tab" + (view === "home" ? " active" : "")} onClick={() => goTo("home")}><IconHome size={15}/><span>Overview</span></button>
            {SECTIONS.map(s => (
              <button key={s.id} className={"tab accent-" + (s.accent || CFG.accent) + (view === s.id ? " active" : "")} onClick={() => goTo(s.id)}>
                <span className="tab-id">{s.id}</span><span>{s.label}</span>
                <span className="tab-progress">{(s.points||[]).filter(p => progress[p]).length}/{(s.points||[]).length}</span>
              </button>
            ))}
          </nav>
          <div className="topbar-actions">
            <div className="progress-chip" title={`${done} of ${ALL_POINTS.length} complete`}><div className="progress-ring"><Ring pct={pct}/></div><span className="progress-text">{pct}%</span></div>
            {CFG.glossary && <button className="icon-btn" onClick={() => setGlOpen(true)} aria-label="Glossary" title="Glossary"><IconBook/></button>}
            <button className="icon-btn" data-settings-toggle onClick={() => setSetOpen(o => !o)} aria-label="Reading settings" aria-expanded={setOpen} title="Reading settings"><IconGear/></button>
            <button className="icon-btn mobile-only" onClick={() => setMob(m => !m)} aria-label="Menu"><IconMenu/></button>
            {setOpen && (
              <div className="settings-pop" role="dialog" aria-label="Reading settings">
                <div className="settings-row"><label>Theme</label><div className="seg"><button className={!dark ? "on" : ""} onClick={() => setDark(false)}>Light</button><button className={dark ? "on" : ""} onClick={() => setDark(true)}>Dark</button></div></div>
                <div className="settings-row"><label>Text size</label><div className="seg">{["sm","md","lg","xl"].map(s => <button key={s} className={size === s ? "on" : ""} onClick={() => setSize(s)} style={{ fontSize: { sm: 11, md: 13, lg: 15, xl: 17 }[s] }}>A</button>)}</div></div>
                <div className="settings-row"><label>Readable font</label><div className="seg"><button className={!dys ? "on" : ""} onClick={() => setDys(false)}>Default</button><button className={dys ? "on" : ""} onClick={() => setDys(true)}>Hyperlegible</button></div></div>
                <div className="settings-row"><label>Print this topic</label><button className="ghost-btn" onClick={() => window.print()}>Print</button></div>
                <div className="settings-row"><label>Reset progress</label><button className="danger-btn" onClick={clearProgress}>Reset</button></div>
              </div>
            )}
          </div>
        </header>

        {mob && (
          <div className="mobile-drawer" onClick={() => setMob(false)}>
            <div className="mobile-drawer-inner" onClick={e => e.stopPropagation()}>
              <button className={"mobile-tab" + (view === "home" ? " active" : "")} onClick={() => goTo("home")}><span className="tab-id">⌂</span><span className="tab-label">Overview</span></button>
              {SECTIONS.map(s => <button key={s.id} className={"mobile-tab accent-" + (s.accent || CFG.accent) + (view === s.id ? " active" : "")} onClick={() => goTo(s.id)}><span className="tab-id">{s.id}</span><span className="tab-label">{s.label}</span><span className="tab-progress">{(s.points||[]).filter(p => progress[p]).length}/{(s.points||[]).length}</span></button>)}
              {CFG.hubHref && <a className="mobile-tab" href={CFG.hubHref} style={{ marginTop: 8 }}><span className="tab-id">↩</span><span className="tab-label">All Year {CFG.year} topics</span></a>}
            </div>
          </div>
        )}

        <main className="main-scroll" ref={scroller}>
          <div className="content-wrap">
            {view === "home" && <Home progress={progress} goTo={goTo}/>}
            {sec && <div className="fade-in">{sec.render({ progress, setProgress })}</div>}
            {sec && <TopicNav id={view} goTo={goTo}/>}
            <footer className="site-footer">
              <div>Year {CFG.year} Science · {CFG.topicTitle} · Built for self-paced learning with UDL 3.0 principles: multiple means of representation, engagement, and action and expression.</div>
              <div>Your progress saves automatically in this browser. Use the gear icon for dark mode, larger text, or a more readable font.</div>
            </footer>
          </div>
        </main>

        {glOpen && <GlossaryModal onClose={() => setGlOpen(false)}/>}
      </div>
      </TopicContext.Provider>
    );
  };
}

function mountTopicApp(CFG) {
  const App = buildApp(CFG);
  ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
  try { window.__mounted = true; } catch {}
}

Object.assign(window, {
  useLocalStorage, useReducedMotion, TopicContext, hashStr, answerKey,
  Icon, IconCheck, IconX, IconArrow, IconHome, IconBook, IconGear, IconMenu,
  DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
  Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring,
  buildApp, mountTopicApp,
});
