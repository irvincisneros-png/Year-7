/* ============================================================
   Year landing hub renderer — mountYearHub(CFG)
   Reads each topic's localStorage to show real progress.
   Depends on kit.jsx (Ring, Icon*, useLocalStorage) loaded first.
   ============================================================ */
/* global React, ReactDOM, Ring, IconArrow, IconHome, IconGear, useLocalStorage */
const { useState: useStateH, useEffect: useEffectH, useMemo: useMemoH } = React;

function topicProgress(topic) {
  if (!topic.storageKey || !topic.points || !topic.points.length) return { done: 0, total: (topic.points||[]).length, pct: 0 };
  let prog = {};
  try { const raw = localStorage.getItem(topic.storageKey + ".progress"); if (raw) prog = JSON.parse(raw); } catch {}
  const done = topic.points.filter(p => prog[p]).length;
  return { done, total: topic.points.length, pct: topic.points.length ? Math.round(100 * done / topic.points.length) : 0 };
}

function YearHub(CFG) {
  return function Hub() {
    const [dark, setDark] = useLocalStorage("jsci.dark", false);
    const [size, setSize] = useLocalStorage("jsci.size", "md");
    const [dys, setDys] = useLocalStorage("jsci.dyslexic", false);
    const [open, setOpen] = useStateH(false);
    useEffectH(() => {
      const r = document.documentElement;
      r.dataset.theme = dark ? "dark" : "light"; r.dataset.size = size; r.dataset.dyslexic = dys ? "true" : "false";
    }, [dark, size, dys]);

    const totals = useMemoH(() => {
      let done = 0, total = 0;
      CFG.topics.forEach(t => { const p = topicProgress(t); done += p.done; total += p.total; });
      return { done, total, pct: total ? Math.round(100 * done / total) : 0 };
    }, []);

    return (
      <div className={"hub accent-" + CFG.accent}>
        <header className="hub-top">
          <div className="brand">
            <div className="brand-mark"><IconHome size={20}/></div>
            <div><div className="brand-title">{CFG.schoolTitle || "Junior Science"}</div><div className="brand-sub">Year {CFG.year} · NSW Stage {CFG.stage || (CFG.year <= 8 ? 4 : 5)}</div></div>
          </div>
          <div style={{ position: "relative" }}>
            <button className="icon-btn" onClick={() => setOpen(o => !o)} aria-label="Display settings" title="Display settings"><IconGear/></button>
            {open && (
              <div className="settings-pop" onMouseLeave={() => setOpen(false)}>
                <div className="settings-row"><label>Theme</label><div className="seg"><button className={!dark ? "on" : ""} onClick={() => setDark(false)}>Light</button><button className={dark ? "on" : ""} onClick={() => setDark(true)}>Dark</button></div></div>
                <div className="settings-row"><label>Text size</label><div className="seg">{["sm","md","lg","xl"].map(s => <button key={s} className={size === s ? "on" : ""} onClick={() => setSize(s)} style={{ fontSize: { sm: 11, md: 13, lg: 15, xl: 17 }[s] }}>A</button>)}</div></div>
                <div className="settings-row"><label>Readable font</label><div className="seg"><button className={!dys ? "on" : ""} onClick={() => setDys(false)}>Default</button><button className={dys ? "on" : ""} onClick={() => setDys(true)}>Hyperlegible</button></div></div>
              </div>
            )}
          </div>
        </header>

        <div className="hub-wrap">
          <section className="hub-hero">
            <div className="hub-eyebrow">Year {CFG.year} Science · {CFG.syllabus || "NSW Syllabus"}</div>
            <h1>{CFG.title}</h1>
            <p className="hub-lede">{CFG.lede}</p>
            <div className="hub-meta">
              <span className="m"><b>{CFG.topics.length}</b> topics</span>
              <span className="m"><b>{CFG.topics.reduce((a, t) => a + (t.points ? t.points.length : 0), 0)}</b> sections</span>
              {totals.total > 0 && <span className="m" style={{ display: "flex", alignItems: "center", gap: 8 }}><Ring pct={totals.pct} size={26} sw={3}/> <b>{totals.pct}%</b> complete</span>}
            </div>
          </section>

          <div className="hub-section-head">
            <h2>Choose a topic</h2>
            <p>Four units make up your year. Jump into any one, work at your own pace, and your progress is saved automatically.</p>
          </div>

          <div className="hub-grid">
            {CFG.topics.map(t => {
              const pr = topicProgress(t);
              const live = t.status !== "soon" && t.href;
              const Inner = (
                <>
                  <span className="stripe"/>
                  {!live && <span className="soon-pill">Coming soon</span>}
                  <div className="hub-card-emoji">{t.emoji}</div>
                  <div className="hub-card-num">{t.kicker || ("Topic " + t.n)}</div>
                  <h3>{t.title}</h3>
                  <p className="hub-card-blurb">{t.blurb}</p>
                  <div className="hub-card-tags">{(t.tags || []).map(tag => <span key={tag} className="chip">{tag}</span>)}</div>
                  {live && t.points && t.points.length > 0 && (
                    <div className="hub-card-foot"><div className="bar"><div style={{ width: pr.pct + "%" }}/></div><span className="pct">{pr.done}/{pr.total}</span></div>
                  )}
                  {live && <div className="open-row">Open topic <IconArrow size={15} sw={2.5}/></div>}
                </>
              );
              return live
                ? <a key={t.title} className={"hub-card accent-" + (t.accent || CFG.accent)} href={t.href}>{Inner}</a>
                : <div key={t.title} className={"hub-card soon accent-" + (t.accent || CFG.accent)}>{Inner}</div>;
            })}
          </div>

          <section className="hub-strip">
            <h2>Made for every learner</h2>
            <p className="muted" style={{ margin: 0 }}>Built on the Universal Design for Learning (UDL 3.0) framework so you can learn the way that works for you.</p>
            <div className="hub-feature-grid">
              <div className="hub-feature"><div className="fi"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg></div><h4>See it your way</h4><p>Switch to dark mode, bump up the text size, or turn on a high-readability font from the gear menu.</p></div>
              <div className="hub-feature"><div className="fi"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg></div><h4>Learn by doing</h4><p>Simulations, sliders and models you can tinker with turn every idea into something you can poke at.</p></div>
              <div className="hub-feature"><div className="fi"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><h4>Check as you go</h4><p>Instant-feedback quizzes, model answers, and a progress ring that fills as you tick off each section.</p></div>
            </div>
          </section>

          <footer className="hub-footer">
            <div>Year {CFG.year} Science · {CFG.syllabus || "NSW Syllabus"} · Self-paced interactive learning built on UDL 3.0 principles.</div>
            <div>Your progress saves automatically in this browser.</div>
          </footer>
        </div>
      </div>
    );
  };
}

function mountYearHub(CFG) {
  const Hub = YearHub(CFG);
  ReactDOM.createRoot(document.getElementById("root")).render(<Hub/>);
}
window.mountYearHub = mountYearHub;
