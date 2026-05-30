/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp */
const { useState, useEffect, useRef, useMemo } = React;

/* =====================================================================
   SECTION 1 INTERACTIVE: Scientific Inquiry Cycle Animator
   ===================================================================== */
function InquiryCycleAnim() {
  const steps = [
    { label: "Observe", desc: "Notice something interesting in the natural world.", icon: "👁️" },
    { label: "Question", desc: "Ask a testable question: what causes this?", icon: "❓" },
    { label: "Investigate", desc: "Plan and carry out an experiment or observation.", icon: "🔬" },
    { label: "Analyse", desc: "Look for patterns in your data.", icon: "📊" },
    { label: "Conclude", desc: "Draw evidence-based conclusions and share findings.", icon: "📢" },
    { label: "Build knowledge", desc: "New knowledge is tested, refined, and extended by others.", icon: "🌐" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % steps.length), 1800);
    return () => clearInterval(id);
  }, []);
  const r = 100;
  const cx = 160, cy = 160;
  return (
    <Interactive title="The scientific inquiry cycle" subtitle="Watch how each step flows into the next. Tap a step to explore it." takeaway="Science is a repeating cycle that begins with observation, builds through investigation and analysis, and produces knowledge that is tested and extended by other scientists.">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 320 320" width="240" height="240" style={{ flexShrink: 0 }}>
          {steps.map((s, i) => {
            const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            const isActive = i === active;
            return (
              <g key={i} onClick={() => setActive(i)} style={{ cursor: "pointer" }}>
                <circle cx={x} cy={y} r={isActive ? 26 : 20}
                  fill={isActive ? "var(--accent-deep)" : "var(--accent-soft)"}
                  stroke={isActive ? "var(--accent-deep)" : "var(--accent-mid)"}
                  strokeWidth={2}
                  style={{ transition: "all 0.3s" }}
                />
                <text x={x} y={y - 1} textAnchor="middle" dominantBaseline="middle"
                  fontSize={isActive ? 16 : 13} fill={isActive ? "#fff" : "var(--ink)"}>
                  {s.icon}
                </text>
                <text x={x} y={y + (isActive ? 12 : 10) + 10} textAnchor="middle"
                  fontSize={9} fill={isActive ? "var(--accent-deep)" : "var(--ink-muted)"} fontWeight={isActive ? "700" : "400"}>
                  {s.label}
                </text>
                {i < steps.length - 1 && (() => {
                  const a2 = ((i + 1) / steps.length) * 2 * Math.PI - Math.PI / 2;
                  const x2 = cx + r * Math.cos(a2);
                  const y2 = cy + r * Math.sin(a2);
                  return <line x1={x} y1={y} x2={x2} y2={y2} stroke="var(--accent-mid)" strokeWidth={1.5} strokeDasharray="3,3" />;
                })()}
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r={46} fill="var(--surface)" stroke="var(--accent-soft)" strokeWidth={2} />
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize={11} fill="var(--ink)" fontWeight="700">Science</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize={10} fill="var(--ink-muted)">is a cycle</text>
        </svg>
        <div style={{ maxWidth: 220, padding: "16px 20px", background: "var(--accent-soft)", borderRadius: 14 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>{steps[active].icon}</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "var(--accent-deep)", marginBottom: 6 }}>{steps[active].label}</div>
          <div style={{ fontSize: 14, color: "var(--ink)" }}>{steps[active].desc}</div>
          <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
            {steps.map((_, i) => (
              <div key={i} onClick={() => setActive(i)} style={{ width: 8, height: 8, borderRadius: "50%",
                background: i === active ? "var(--accent-deep)" : "var(--accent-soft)", border: "1.5px solid var(--accent-mid)",
                cursor: "pointer", transition: "background 0.3s" }} />
            ))}
          </div>
        </div>
      </div>
    </Interactive>
  );
}

/* =====================================================================
   SECTION 1 INTERACTIVE: Branches of Science Sorter
   ===================================================================== */
function BranchSorter() {
  return (
    <Interactive title="Sort the science topics" subtitle="Which branch does each topic belong to? Click to assign." takeaway="Every science question fits into one or more branches, and many space science questions require biology, chemistry, physics, and geology all working together.">
      <MatchBuckets
        items={[
          { id: "a", label: "Gravity pulling planets into orbit", bucket: "physics" },
          { id: "b", label: "Chemical composition of a star", bucket: "chemistry" },
          { id: "c", label: "Could microbes survive on Mars?", bucket: "biology" },
          { id: "d", label: "Craters on the Moon's surface", bucket: "geology" },
          { id: "e", label: "Speed of light", bucket: "physics" },
          { id: "f", label: "Ice records of past climates", bucket: "geology" },
        ]}
        buckets={[
          { id: "physics", label: "Physics" },
          { id: "chemistry", label: "Chemistry" },
          { id: "biology", label: "Biology" },
          { id: "geology", label: "Geology" },
        ]}
      />
    </Interactive>
  );
}

/* =====================================================================
   SECTION 2 INTERACTIVE: Measuring Instrument Comparison
   ===================================================================== */
function InstrumentSim() {
  const [type, setType] = useState("analog");
  const [trueVal] = useState(23.4);
  const analogRead = 23.5;
  const digitalRead = 23.4;
  const displayed = type === "analog" ? analogRead : digitalRead;
  const precision = type === "analog" ? "0.5 degrees C" : "0.1 degrees C";
  return (
    <Interactive title="Analog vs digital thermometer" subtitle="Switch between instruments and see how precision changes." takeaway="Digital instruments give a smaller reading error and finer precision than analog instruments reading the same temperature.">
      <div className="ctrl-row">
        <SegToggle
          options={[{ value: "analog", label: "Analog" }, { value: "digital", label: "Digital" }]}
          value={type}
          onChange={setType}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}>
        {type === "analog" ? (
          <svg viewBox="0 0 120 200" width="100" height="160">
            <rect x="40" y="10" width="40" height="160" rx="20" fill="#e3f0ff" stroke="#4a90d9" strokeWidth="2"/>
            <rect x="52" y={10 + (1 - (analogRead - 0) / 50) * 140} width="16" height={(analogRead / 50) * 140}
              rx="8" fill="#e74c3c" />
            <circle cx="60" cy="170" r="16" fill="#e74c3c" stroke="#4a90d9" strokeWidth="2"/>
            {[0,10,20,30,40,50].map(v => (
              <g key={v}>
                <line x1="40" y1={10 + (1 - v/50)*140} x2="52" y2={10 + (1-v/50)*140} stroke="#4a90d9" strokeWidth={v%10===0?2:1}/>
                {v % 10 === 0 && <text x="32" y={14 + (1-v/50)*140} textAnchor="end" fontSize="9" fill="#4a90d9">{v}</text>}
              </g>
            ))}
            <text x="60" y="195" textAnchor="middle" fontSize="9" fill="var(--ink-muted)">deg C</text>
          </svg>
        ) : (
          <div style={{ background: "#1a1a2e", color: "#0ff", padding: "20px 32px", borderRadius: 12,
            fontFamily: "monospace", fontSize: 36, fontWeight: 700, letterSpacing: 4,
            border: "3px solid #0ff", boxShadow: "0 0 20px #0ff4" }}>
            {digitalRead.toFixed(1)}
            <div style={{ fontSize: 14, color: "#0ff8", letterSpacing: 1, marginTop: 4 }}>deg C</div>
          </div>
        )}
      </div>
      <div className="stat-readout">
        <Stat value={displayed.toFixed(type === "analog" ? 1 : 1)} label="Reading (deg C)" />
        <Stat value={precision} label="Precision" />
        <Stat value={Math.abs(displayed - trueVal).toFixed(1)} label="Error from true (deg C)" />
      </div>
      <p className="muted" style={{ marginBottom: 0, marginTop: 8 }}>
        True temperature is {trueVal} degrees C. Digital instruments give smaller errors and better precision.
      </p>
    </Interactive>
  );
}

/* =====================================================================
   SECTION 2 INTERACTIVE: Observation vs Inference vs Prediction
   ===================================================================== */
function ObsInferPred() {
  const scenarios = [
    {
      obs: "Light from a distant galaxy is shifted towards the red end of the spectrum.",
      infer: "The galaxy is moving away from us (Doppler effect).",
      pred: "More distant galaxies should show an even greater redshift.",
    },
    {
      obs: "A star's brightness dips slightly every 365 days.",
      infer: "A planet might be passing in front of the star, blocking some light.",
      pred: "The brightness dip should repeat every 365 days like clockwork.",
    },
    {
      obs: "The Moon's surface is covered in circular craters.",
      infer: "The Moon was struck many times by space rocks.",
      pred: "The craters should be deeper and wider if the impacting rock was larger.",
    },
  ];
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState([false, false, false]);
  const reveal = (i) => setRevealed(r => r.map((v, j) => j === i ? true : v));
  const sc = scenarios[idx];
  return (
    <Interactive title="From observation to prediction" subtitle="Reveal how scientists move from what they see to what they test." takeaway="Every scientific investigation starts with a direct observation, moves to an inference about its cause, then produces a testable prediction that can be checked with new evidence.">
      <div className="ctrl-row" style={{ marginBottom: 12 }}>
        <SegToggle
          options={scenarios.map((_, i) => ({ value: i, label: `Example ${i + 1}` }))}
          value={idx}
          onChange={v => { setIdx(Number(v)); setRevealed([false, false, false]); }}
        />
      </div>
      {[
        { label: "Observation", val: sc.obs, color: "var(--accent-soft)", borderColor: "var(--accent-mid)" },
        { label: "Inference", val: sc.infer, color: "var(--surface)", borderColor: "var(--accent-deep)", i: 1 },
        { label: "Testable prediction", val: sc.pred, color: "var(--accent-soft)", borderColor: "var(--accent-deep)", i: 2 },
      ].map((row, ri) => (
        <div key={ri} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 110, flexShrink: 0 }}>
            <span className="chip accent" style={{ fontSize: 12 }}>{row.label}</span>
          </div>
          {ri === 0 ? (
            <div style={{ flex: 1, background: row.color, border: `2px solid ${row.borderColor}`,
              borderRadius: 10, padding: "10px 14px", fontSize: 14 }}>{row.val}</div>
          ) : (
            <div style={{ flex: 1, background: row.color, border: `2px solid ${row.borderColor}`,
              borderRadius: 10, padding: "10px 14px", fontSize: 14, cursor: "pointer",
              filter: revealed[ri] ? "none" : "blur(5px)", transition: "filter 0.4s",
              userSelect: revealed[ri] ? "auto" : "none" }}
              onClick={() => reveal(ri)}>
              {revealed[ri] ? row.val : "Tap to reveal"}
            </div>
          )}
        </div>
      ))}
    </Interactive>
  );
}

/* =====================================================================
   SECTION 3 INTERACTIVE: Solar System Model Comparison
   ===================================================================== */
function SolarModelSim() {
  const [model, setModel] = useState("geo");
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAngle(a => (a + 1) % 360), 40);
    return () => clearInterval(id);
  }, []);
  const toRad = d => d * Math.PI / 180;
  const earthAngle = toRad(angle);
  const moonAngle = toRad(angle * 13);
  const sunAngle = toRad(angle * 0.8);
  const cx = 160, cy = 160;
  return (
    <Interactive title="Geocentric vs heliocentric model" subtitle="Switch between models and watch the animation." takeaway="In the geocentric model everything orbits Earth, but in the heliocentric model Earth and the other planets all orbit the Sun, a change that was accepted only after new telescope evidence disproved the older idea.">
      <div className="ctrl-row" style={{ marginBottom: 12 }}>
        <SegToggle
          options={[{ value: "geo", label: "Geocentric (Earth centre)" }, { value: "helio", label: "Heliocentric (Sun centre)" }]}
          value={model}
          onChange={setModel}
        />
      </div>
      <svg viewBox="0 0 320 320" width="100%" style={{ maxWidth: 360, display: "block", margin: "0 auto" }}>
        {model === "geo" ? (
          <g>
            <circle cx={cx} cy={cy} r={90} fill="none" stroke="var(--accent-mid)" strokeWidth={1} strokeDasharray="4,4"/>
            <circle cx={cx} cy={cy} r={55} fill="none" stroke="var(--accent-mid)" strokeWidth={1} strokeDasharray="4,4"/>
            <circle cx={cx} cy={cy} r={22} fill="none" stroke="var(--accent-mid)" strokeWidth={1} strokeDasharray="4,4"/>
            <circle cx={cx} cy={cy} r={14} fill="#4a90d9" />
            <text x={cx} y={cy + 22} textAnchor="middle" fontSize={10} fill="var(--ink)" fontWeight="700">Earth</text>
            <circle cx={cx + 55 * Math.cos(sunAngle)} cy={cy + 55 * Math.sin(sunAngle)} r={16} fill="#f7b731"/>
            <text x={cx + 55 * Math.cos(sunAngle)} y={cy + 55 * Math.sin(sunAngle) + 24} textAnchor="middle" fontSize={9} fill="#f7b731">Sun</text>
            <circle cx={cx + 22 * Math.cos(moonAngle)} cy={cy + 22 * Math.sin(moonAngle)} r={7} fill="#ccc"/>
            <text x={cx + 22 * Math.cos(moonAngle)} y={cy + 22 * Math.sin(moonAngle) - 12} textAnchor="middle" fontSize={8} fill="#ccc">Moon</text>
            <circle cx={cx + 90 * Math.cos(earthAngle * 0.5)} cy={cy + 90 * Math.sin(earthAngle * 0.5)} r={8} fill="#e74c3c"/>
            <text x={cx + 90 * Math.cos(earthAngle * 0.5)} y={cy + 90 * Math.sin(earthAngle * 0.5) - 13} textAnchor="middle" fontSize={8} fill="#e74c3c">Mars</text>
          </g>
        ) : (
          <g>
            <circle cx={cx} cy={cy} r={90} fill="none" stroke="var(--accent-mid)" strokeWidth={1} strokeDasharray="4,4"/>
            <circle cx={cx} cy={cy} r={62} fill="none" stroke="var(--accent-mid)" strokeWidth={1} strokeDasharray="4,4"/>
            <circle cx={cx} cy={cy} r={35} fill="none" stroke="var(--accent-mid)" strokeWidth={1} strokeDasharray="4,4"/>
            <circle cx={cx} cy={cy} r={16} fill="#f7b731"/>
            <text x={cx} y={cy + 24} textAnchor="middle" fontSize={10} fill="#f7b731" fontWeight="700">Sun</text>
            <circle cx={cx + 62 * Math.cos(earthAngle)} cy={cy + 62 * Math.sin(earthAngle)} r={10} fill="#4a90d9"/>
            <text x={cx + 62 * Math.cos(earthAngle)} y={cy + 62 * Math.sin(earthAngle) - 15} textAnchor="middle" fontSize={9} fill="#4a90d9">Earth</text>
            <circle cx={cx + 62 * Math.cos(earthAngle) + 18 * Math.cos(moonAngle)}
              cy={cy + 62 * Math.sin(earthAngle) + 18 * Math.sin(moonAngle)} r={5} fill="#ccc"/>
            <circle cx={cx + 90 * Math.cos(earthAngle * 0.53)} cy={cy + 90 * Math.sin(earthAngle * 0.53)} r={8} fill="#e74c3c"/>
            <text x={cx + 90 * Math.cos(earthAngle * 0.53)} y={cy + 90 * Math.sin(earthAngle * 0.53) - 13} textAnchor="middle" fontSize={8} fill="#e74c3c">Mars</text>
            <circle cx={cx + 35 * Math.cos(earthAngle * 1.6)} cy={cy + 35 * Math.sin(earthAngle * 1.6)} r={6} fill="#f0a500"/>
            <text x={cx + 35 * Math.cos(earthAngle * 1.6)} y={cy + 35 * Math.sin(earthAngle * 1.6) - 10} textAnchor="middle" fontSize={8} fill="#f0a500">Venus</text>
          </g>
        )}
        <text x={cx} y={310} textAnchor="middle" fontSize={11} fill="var(--ink-muted)">
          {model === "geo" ? "Earth-centred (Ptolemy, ~150 CE)" : "Sun-centred (Copernicus, 1543 CE)"}
        </text>
      </svg>
      <Callout kind="key" title="Key difference">
        In the geocentric model everything orbits Earth. In the heliocentric model Earth and the other planets orbit the Sun. Galileo's observations of Jupiter's moons and the phases of Venus proved the geocentric model was wrong.
      </Callout>
    </Interactive>
  );
}

/* =====================================================================
   SECTION 3 INTERACTIVE: Day/Night Earth Rotation Animation
   ===================================================================== */
function DayNightSim() {
  const [paused, setPaused] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lat, setLat] = useState(-34);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setRotation(r => (r + 0.5) % 360), 30);
    return () => clearInterval(id);
  }, [paused]);
  const cx = 100, cy = 100, r = 70;
  const sunX = 240, sunY = 100;
  const lightAngle = Math.atan2(cy - sunY, cx - sunX);
  const latRad = (lat * Math.PI) / 180;
  const dotAngle = (rotation * Math.PI) / 180 + lightAngle + Math.PI;
  const dotX = cx + r * Math.cos(dotAngle) * Math.cos(latRad);
  const dotY = cy + r * (Math.sin(dotAngle) * Math.cos(latRad) * 0.3 + Math.sin(latRad) * 0.95);
  const isDay = Math.cos(dotAngle - lightAngle) > 0;
  return (
    <Interactive title="Day and night rotation" subtitle="Earth spins once every 24 hours. Watch your city move through day and night." takeaway="Day and night are caused by Earth spinning on its axis every 24 hours, so one half faces the Sun while the other half is in darkness.">
      <div className="ctrl-row">
        <Slider label="Your latitude" min={-70} max={70} step={1} value={lat} onChange={setLat} unit=" deg" />
        <button className="btn btn-ghost" onClick={() => setPaused(p => !p)}>{paused ? "Play" : "Pause"}</button>
      </div>
      <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 400, display: "block", margin: "0 auto" }}>
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe060" />
            <stop offset="60%" stopColor="#f7b731" />
            <stop offset="100%" stopColor="#e07a00" stopOpacity="0" />
          </radialGradient>
          <clipPath id="earthClip">
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
        </defs>
        <circle cx={sunX} cy={sunY} r={28} fill="url(#sunGlow)" />
        <text x={sunX} y={sunY + 38} textAnchor="middle" fontSize={10} fill="#f7b731" fontWeight="700">Sun</text>
        <line x1={sunX - 28} y1={sunY} x2={cx + r} y2={cy} stroke="#ffe06055" strokeWidth={70} />
        <circle cx={cx} cy={cy} r={r} fill="#1a3a5c" />
        <rect x={cx - r} y={cy - r} width={r} height={r * 2} fill="#4a90d9" clipPath="url(#earthClip)" opacity={0.9} />
        <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.35} fill="none" stroke="var(--accent-mid)" strokeWidth={1} strokeDasharray="3,3" opacity={0.5}/>
        <circle cx={cx} cy={cy - r} r={3} fill="var(--accent-mid)" opacity={0.7}/>
        <circle cx={cx} cy={cy + r} r={3} fill="var(--accent-mid)" opacity={0.7}/>
        <circle cx={dotX} cy={dotY} r={5} fill={isDay ? "#f7b731" : "#ccc"} stroke="#fff" strokeWidth={1.5} />
        <text x={dotX + 10} y={dotY - 8} fontSize={9} fill={isDay ? "#f7b731" : "#ccc"} fontWeight="700">
          {isDay ? "Day" : "Night"}
        </text>
        <text x={cx - 30} y={cy + r + 18} fontSize={9} fill="var(--ink-muted)" textAnchor="middle">Night side</text>
        <text x={cx + 20} y={cy + r + 18} fontSize={9} fill="#4a90d9" textAnchor="middle">Day side</text>
      </svg>
      <div className="stat-readout">
        <Stat value={isDay ? "DAY" : "NIGHT"} label={`Your location (${lat > 0 ? lat + "N" : Math.abs(lat) + "S"})`} />
        <Stat value="24 h" label="One full rotation" />
      </div>
    </Interactive>
  );
}

/* =====================================================================
   SECTION 3 INTERACTIVE: Seasons Axial Tilt Model
   ===================================================================== */
function SeasonsSim() {
  const [pos, setPos] = useState(0);
  const positions = [
    { label: "Dec (Aust. summer)", shem: "Summer", nhem: "Winter", desc: "Southern Hemisphere tilts towards the Sun. More direct sunlight, longer days." },
    { label: "Mar (autumn)", shem: "Autumn", nhem: "Spring", desc: "Neither hemisphere tilts towards the Sun. Days and nights are about equal." },
    { label: "Jun (Aust. winter)", shem: "Winter", nhem: "Summer", desc: "Southern Hemisphere tilts away from the Sun. Less direct sunlight, shorter days." },
    { label: "Sep (spring)", shem: "Spring", nhem: "Autumn", desc: "Neither hemisphere tilts towards the Sun. Days and nights are about equal." },
  ];
  const p = positions[pos];
  const earthPositions = [
    { x: 250, y: 120 }, { x: 120, y: 210 }, { x: 0, y: 120 }, { x: 120, y: 30 },
  ];
  const ep = earthPositions[pos];
  const tiltDir = [1, 0, -1, 0][pos];
  return (
    <Interactive title="Why do we have seasons?" subtitle="Move Earth around its orbit and watch how the tilt affects sunlight." takeaway="Seasons are caused by Earth's 23.5-degree axial tilt, which means each hemisphere takes turns leaning towards the Sun and receiving more direct sunlight — not by how close Earth is to the Sun.">
      <div className="ctrl-row">
        <SegToggle
          options={positions.map((p, i) => ({ value: i, label: p.label }))}
          value={pos}
          onChange={v => setPos(Number(v))}
        />
      </div>
      <svg viewBox="0 0 280 240" width="100%" style={{ maxWidth: 380, display: "block", margin: "8px auto" }}>
        <circle cx={140} cy={120} r={28} fill="url(#sunGlow2)" />
        <text x={140} y={155} textAnchor="middle" fontSize={10} fill="#f7b731" fontWeight="700">Sun</text>
        <defs>
          <radialGradient id="sunGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe060"/>
            <stop offset="100%" stopColor="#f7b731"/>
          </radialGradient>
        </defs>
        <ellipse cx={140} cy={120} rx={110} ry={90} fill="none" stroke="var(--accent-mid)" strokeWidth={1} strokeDasharray="5,5"/>
        {earthPositions.map((ep2, i) => (
          <circle key={i} cx={ep2.x + 10} cy={ep2.y} r={i === pos ? 14 : 10}
            fill={i === pos ? "#4a90d9" : "var(--accent-soft)"}
            stroke={i === pos ? "#2c5f8a" : "var(--accent-mid)"} strokeWidth={2} opacity={i === pos ? 1 : 0.5}/>
        ))}
        <line
          x1={ep.x + 10} y1={ep.y - 18}
          x2={ep.x + 10 + tiltDir * 8} y2={ep.y + 18}
          stroke="#fff" strokeWidth={2.5} />
        <text x={ep.x + 10} y={ep.y - 26} textAnchor="middle" fontSize={8} fill="#fff">N</text>
        <text x={ep.x + 10} y={ep.y + 32} textAnchor="middle" fontSize={8} fill="#ccc">S</text>
        <text x={ep.x + 10} y={ep.y + 48} textAnchor="middle" fontSize={9} fill="#4a90d9" fontWeight="700">Earth</text>
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
        <div style={{ background: "#ff634722", borderRadius: 10, padding: "10px 14px", borderLeft: "4px solid #ff6347" }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#ff6347" }}>Southern Hemisphere</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{p.shem}</div>
        </div>
        <div style={{ background: "#4a90d922", borderRadius: 10, padding: "10px 14px", borderLeft: "4px solid #4a90d9" }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#4a90d9" }}>Northern Hemisphere</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{p.nhem}</div>
        </div>
      </div>
      <p style={{ marginTop: 10, fontSize: 14, color: "var(--ink)" }}>{p.desc}</p>
      <Callout kind="fact" title="Earth's axial tilt">
        Earth is tilted at 23.5 degrees. This tilt does not change direction as Earth orbits the Sun, so each hemisphere takes turns being tilted towards the Sun. That is what causes seasons, not Earth's distance from the Sun.
      </Callout>
    </Interactive>
  );
}

/* =====================================================================
   SECTION 4 INTERACTIVE: Moon Phase Visualiser
   ===================================================================== */
function MoonPhaseSim() {
  const [day, setDay] = useState(0);
  const phases = [
    { name: "New Moon", day: 0, lit: 0, side: "none" },
    { name: "Waxing Crescent", day: 3.7, lit: 0.25, side: "right" },
    { name: "First Quarter", day: 7.4, lit: 0.5, side: "right" },
    { name: "Waxing Gibbous", day: 11.1, lit: 0.75, side: "right" },
    { name: "Full Moon", day: 14.8, lit: 1, side: "full" },
    { name: "Waning Gibbous", day: 18.5, lit: 0.75, side: "left" },
    { name: "Last Quarter", day: 22.1, lit: 0.5, side: "left" },
    { name: "Waning Crescent", day: 25.8, lit: 0.25, side: "left" },
  ];
  const phase = phases.reduce((best, p) => Math.abs(p.day - day) < Math.abs(best.day - day) ? p : best, phases[0]);
  const moonAngle = (day / 29.5) * 2 * Math.PI;
  const cx = 140, cy = 100, orbitR = 70;
  const moonX = cx + orbitR * Math.sin(moonAngle);
  const moonY = cy - orbitR * Math.cos(moonAngle) * 0.38;
  function MoonFace({ x, y, r, litFrac, side }) {
    if (side === "none") return <circle cx={x} cy={y} r={r} fill="#333" stroke="#666" strokeWidth={1}/>;
    if (side === "full") return <circle cx={x} cy={y} r={r} fill="#e8e0c8" stroke="#ccc" strokeWidth={1}/>;
    const lit = Math.max(0.05, litFrac);
    const rx2 = r * Math.abs(2 * lit - 1);
    const sweep = lit < 0.5 ? (side === "right" ? 1 : 0) : (side === "right" ? 0 : 1);
    const d = `M ${x} ${y - r} A ${r} ${r} 0 1 ${side === "right" ? 1 : 0} ${x} ${y + r} A ${rx2} ${r} 0 1 ${sweep} ${x} ${y - r} Z`;
    return (
      <g>
        <circle cx={x} cy={y} r={r} fill="#333" stroke="#666" strokeWidth={1}/>
        <path d={d} fill="#e8e0c8"/>
      </g>
    );
  }
  return (
    <Interactive title="Moon phase visualiser" subtitle="Drag the slider through the lunar month and watch the Moon's appearance change." takeaway="The Moon's phases are caused by the changing angle between the Sun, Moon, and Earth as the Moon orbits Earth roughly every 29.5 days, so we see different amounts of the sunlit half.">
      <Slider label="Day in lunar cycle" min={0} max={29} step={0.5} value={day} onChange={setDay} unit=" days" />
      <svg viewBox="0 0 280 220" width="100%" style={{ maxWidth: 380, display: "block", margin: "0 auto" }}>
        <circle cx={cx} cy={cy} r={18} fill="#f7b731" />
        <text x={cx} y={cy + 28} textAnchor="middle" fontSize={9} fill="#f7b731" fontWeight="700">Sun</text>
        <ellipse cx={cx} cy={cy} rx={orbitR} ry={orbitR * 0.38} fill="none" stroke="var(--accent-mid)" strokeWidth={1} strokeDasharray="3,3"/>
        <circle cx={cx} cy={cy} r={9} fill="#4a90d9"/>
        <text x={cx + 14} y={cy + 4} fontSize={9} fill="#4a90d9">Earth</text>
        <MoonFace x={moonX} y={moonY} r={11} litFrac={phase.lit} side={phase.side}/>
        <text x={moonX} y={moonY - 18} textAnchor="middle" fontSize={8} fill="var(--ink)">{phase.name}</text>
        <line x1={cx + 18} y1={cy} x2={cx + 80} y2={cy} stroke="#f7b73133" strokeWidth={40}/>
        <text x={140} y={190} textAnchor="middle" fontSize={10} fill="var(--ink-muted)">Lunar cycle: approximately 29.5 days</text>
        <text x={140} y={205} textAnchor="middle" fontSize={9} fill="var(--accent-deep)">Day {day.toFixed(1)}: {phase.name}</text>
      </svg>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 6 }}>
        {phases.map((p, i) => (
          <button key={i} className={`btn ${phase.name === p.name ? "btn-accent" : "btn-ghost"}`}
            style={{ fontSize: 11, padding: "4px 10px" }}
            onClick={() => setDay(p.day)}>
            {p.name}
          </button>
        ))}
      </div>
    </Interactive>
  );
}

/* =====================================================================
   SECTION 4 INTERACTIVE: Eclipse Aligner
   ===================================================================== */
function EclipseAligner() {
  const [moonOffset, setMoonOffset] = useState(20);
  const cx = 180, cy = 100;
  const sunX = 30, sunY = 100;
  const moonX = cx + moonOffset - 10;
  const moonY = 100 + (moonOffset < 5 ? 0 : moonOffset > 15 ? 0 : (moonOffset - 10) * 3);
  const aligned = Math.abs(moonOffset - 0) < 8 || Math.abs(moonOffset - 30) < 8;
  const solarEclipse = moonOffset < 6;
  const lunarEclipse = moonOffset > 26;
  return (
    <Interactive title="Eclipse aligner" subtitle="Slide the Moon into perfect alignment to cause an eclipse. Watch the shadow form." takeaway="Eclipses only happen when the Sun, Earth, and Moon line up precisely, which is rare because the Moon's orbit is tilted about 5 degrees so most new and full Moons pass above or below the shadow.">
      <Slider label="Moon's orbital position" min={-30} max={60} step={1} value={moonOffset} onChange={setMoonOffset} />
      <svg viewBox="0 0 340 200" width="100%" style={{ maxWidth: 420, display: "block", margin: "8px auto" }}>
        <defs>
          <radialGradient id="sunGlowE" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe060"/>
            <stop offset="80%" stopColor="#f7b731"/>
            <stop offset="100%" stopColor="#f7b73100"/>
          </radialGradient>
        </defs>
        <circle cx={sunX + 30} cy={sunY} r={32} fill="url(#sunGlowE)"/>
        <text x={sunX + 30} y={sunY + 46} textAnchor="middle" fontSize={9} fill="#f7b731" fontWeight="700">Sun</text>
        {solarEclipse && (
          <ellipse cx={cx - 40} cy={cy} rx={90} ry={20} fill="#33333355" />
        )}
        {lunarEclipse && (
          <ellipse cx={cx + 80} cy={cy} rx={90} ry={20} fill="#33333366" />
        )}
        <circle cx={cx} cy={cy} r={20} fill="#4a90d9" stroke="#2c5f8a" strokeWidth={2}/>
        <text x={cx} y={cy + 32} textAnchor="middle" fontSize={9} fill="#4a90d9" fontWeight="700">Earth</text>
        <circle cx={moonX} cy={moonY} r={10} fill={solarEclipse || lunarEclipse ? "#222" : "#ccc"} stroke="#999" strokeWidth={1.5}/>
        <text x={moonX} y={moonY - 17} textAnchor="middle" fontSize={8} fill="var(--ink-muted)">Moon</text>
        {solarEclipse && (
          <text x={cx - 20} y={170} textAnchor="middle" fontSize={10} fill="var(--ink)" fontWeight="700">Solar eclipse! Moon blocks sunlight from Earth.</text>
        )}
        {lunarEclipse && (
          <text x={cx + 80} y={170} textAnchor="middle" fontSize={10} fill="var(--ink)" fontWeight="700">Lunar eclipse! Earth blocks sunlight from Moon.</text>
        )}
        {!solarEclipse && !lunarEclipse && (
          <text x={cx} y={170} textAnchor="middle" fontSize={10} fill="var(--ink-muted)">No eclipse. The Moon is tilted off the shadow line.</text>
        )}
      </svg>
      <Callout kind="key" title="Why not every month?">
        The Moon's orbit is tilted about 5 degrees compared to Earth's orbit around the Sun. So most new and full Moons, the Moon passes just above or below the shadow line and no eclipse happens.
      </Callout>
    </Interactive>
  );
}

/* =====================================================================
   SECTION 5 INTERACTIVE: Indigenous Sky Calendar
   ===================================================================== */
function SkyCalendarSim() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const events = [
    { month: 3, label: "Emu in the Sky", desc: "The Emu in the Sky lies flat near the horizon. Emu eggs are ready to collect.", group: "Many groups (southern Australia)", color: "#8B4513" },
    { month: 4, label: "Pleiades rise (Karakarook)", desc: "The Boorong people know it is eel harvesting season and cold, wet weather is coming.", group: "Boorong, Victoria", color: "#1a6b8a" },
    { month: 4, label: "Pleiades (Torres Strait)", desc: "Torres Strait Islander peoples know the trade wind season is beginning.", group: "Torres Strait", color: "#2a8a4a" },
    { month: 10, label: "Kambarang season", desc: "Noongar people of south-west WA know wildflowers are blooming and the warm, dry season is arriving.", group: "Noongar, WA", color: "#c2783c" },
    { month: 11, label: "Birak season begins", desc: "Noongar people know hot, dry weather with sea breezes is approaching.", group: "Noongar, WA", color: "#e05a2b" },
  ];
  const [active, setActive] = useState(null);
  return (
    <Interactive title="Indigenous sky calendar" subtitle="Click a month to see which astronomical signals Aboriginal and Torres Strait Islander peoples used." takeaway="Aboriginal and Torres Strait Islander peoples used predictable changes in the night sky, such as the rising of star clusters and the shape of the Milky Way, as a reliable calendar to signal seasons, food availability, and ecological events.">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 14 }}>
        {months.map((m, i) => {
          const ev = events.find(e => e.month === i);
          return (
            <button key={i}
              className={`btn ${active === i ? "btn-accent" : ev ? "btn-ghost" : "btn-ghost"}`}
              style={{ minWidth: 44, fontSize: 12, padding: "6px 8px",
                background: active === i ? "var(--accent-deep)" : ev ? "var(--accent-soft)" : undefined,
                borderColor: ev ? ev.color : undefined, color: active === i ? "#fff" : undefined }}
              onClick={() => setActive(active === i ? null : i)}>
              {m}
            </button>
          );
        })}
      </div>
      {active !== null && (() => {
        const ev = events.find(e => e.month === active);
        return ev ? (
          <div style={{ background: "var(--accent-soft)", borderRadius: 12, padding: "14px 16px", borderLeft: `4px solid ${ev.color}` }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: ev.color }}>{ev.label}</div>
            <div style={{ fontSize: 13, marginBottom: 6 }}>{ev.desc}</div>
            <div className="chip" style={{ fontSize: 11 }}>{ev.group}</div>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", borderRadius: 12, padding: "14px 16px", color: "var(--ink-muted)", fontSize: 13 }}>
            No specific event recorded for {months[active]} in this example set.
          </div>
        );
      })()}
      <p className="muted" style={{ marginTop: 10, marginBottom: 0, fontSize: 12 }}>
        This is a simplified sample. Indigenous astronomical knowledge is vast, diverse, and belongs to specific communities.
      </p>
    </Interactive>
  );
}

/* =====================================================================
   SECTION 6 INTERACTIVE: JWST vs Hubble Capability Comparison
   ===================================================================== */
function TelescopeCompare() {
  const [selected, setSelected] = useState("jwst");
  const scopes = {
    eye: { name: "Unaided eye", mirror: "~0.007 m (pupil)", wavelength: "Visible only", location: "Your head", limit: "~mag 6", discovery: "Moon phases, bright planets, ~5,000 stars", color: "#8B6914" },
    hubble: { name: "Hubble Space Telescope", mirror: "2.4 m", wavelength: "Visible + UV + near-IR", location: "570 km above Earth", limit: "~mag 31", discovery: "Dark energy, Hubble constant, thousands of galaxies", color: "#2c5f8a" },
    jwst: { name: "James Webb Space Telescope", mirror: "6.5 m", wavelength: "Primarily infrared", location: "1.5 million km from Earth (L2)", limit: "~mag 34 (infrared)", discovery: "Earliest galaxies, exoplanet atmospheres, hidden star birth", color: "#6c2a8a" },
  };
  const sc = scopes[selected];
  const mirrorSizes = { eye: 5, hubble: 40, jwst: 90 };
  return (
    <Interactive title="Telescope capability explorer" subtitle="Compare what each tool can see. Select an instrument below." takeaway="Larger mirrors and the ability to detect infrared light let the JWST see far fainter and more distant objects than either the unaided eye or the Hubble Space Telescope.">
      <div className="ctrl-row" style={{ marginBottom: 12 }}>
        <SegToggle
          options={[{ value: "eye", label: "Unaided eye" }, { value: "hubble", label: "Hubble" }, { value: "jwst", label: "JWST" }]}
          value={selected}
          onChange={setSelected}
        />
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
        <svg viewBox="0 0 120 120" width="100" height="100">
          <circle cx={60} cy={60} r={mirrorSizes[selected]} fill={sc.color} opacity={0.7}/>
          <circle cx={60} cy={60} r={mirrorSizes[selected]} fill="none" stroke={sc.color} strokeWidth={2}/>
          <text x={60} y={65} textAnchor="middle" fontSize={10} fill="#fff" fontWeight="700">{sc.mirror}</text>
          <text x={60} y={108} textAnchor="middle" fontSize={9} fill="var(--ink-muted)">Mirror size</text>
        </svg>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: sc.color, marginBottom: 8 }}>{sc.name}</div>
          {[
            { label: "Mirror diameter", val: sc.mirror },
            { label: "Light detected", val: sc.wavelength },
            { label: "Location", val: sc.location },
            { label: "Faintest objects", val: sc.limit },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 13 }}>
              <span style={{ color: "var(--ink-muted)", minWidth: 130 }}>{row.label}:</span>
              <span style={{ fontWeight: 600 }}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>
      <Callout kind="success" title="Key discoveries">
        {sc.discovery}
      </Callout>
    </Interactive>
  );
}

/* =====================================================================
   SECTIONS
   ===================================================================== */

function Section1({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">1.1 Nature of Science</div>
        <h1>How science builds knowledge</h1>
        <p className="lead">Science is our most powerful tool for understanding the universe. Find out how it actually works.</p>
      </div>

      <DotPoint id="1.1.1" title="The purpose of science" progress={progress} setProgress={setProgress}>
        <p>Have you ever wondered why the Moon changes shape, or why stars twinkle? Science gives us a way to find out. The purpose of science is to build reliable <Term def="Knowledge supported by evidence that can be tested and checked by others.">knowledge</Term> about the natural world and the universe through <Term def="Watching and recording natural phenomena carefully.">observation</Term>, <Term def="Designing a test to check whether an explanation is correct.">experimentation</Term>, and <Term def="Looking for patterns and drawing conclusions from data.">analysis</Term>.</p>
        <p>Unlike guesses or opinions, scientific knowledge is constantly tested against evidence. If better evidence comes along, the knowledge gets updated. That self-correcting quality is what makes science so trustworthy. In astronomy, because scientists cannot land on distant stars, almost everything we know comes from carefully studying light and other signals that reach us from space.</p>
        <Callout kind="key" title="Science in a nutshell">
          Observe carefully. Ask a testable question. Design an investigation. Collect and analyse data. Share findings with other scientists so they can check and build on the work.
        </Callout>
        <InquiryCycleAnim />
        <QGroup title="Check yourself">
          <MCQ num={1} question="What is the main purpose of science?" options={["To prove that experts are always right","To build reliable knowledge through evidence","To invent new technology","To answer every possible question"]} correct={1} explain="Science builds reliable knowledge using evidence from observation and experiment. It cannot answer every question, especially questions about values." />
          <WrittenQ num={2} question="Give one reason why scientific knowledge is considered more reliable than personal opinion." model="Scientific knowledge is tested against evidence by many independent scientists, and it is revised when new evidence shows it is wrong. Personal opinion does not have to be tested or revised." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.1.2" title="Branches of science and interdisciplinary thinking" progress={progress} setProgress={setProgress}>
        <p>Science is organised into broad branches. <Term def="The study of living things, their structure, function, and interactions.">Biology</Term> explores living organisms. <Term def="The study of matter, its properties, and chemical reactions.">Chemistry</Term> investigates matter and its changes. <Term def="The study of energy, forces, and fundamental laws of nature.">Physics</Term> covers forces, motion, light, and gravity. <Term def="The study of Earth's structure, history, and the processes that shape it.">Geology</Term> studies rocks, minerals, and Earth's history.</p>
        <p>Modern science rarely stays inside just one branch. Understanding whether life could exist on Mars requires biology (what conditions life needs), chemistry (what molecules are present), physics (radiation and temperature), and geology (is there liquid water or rock that could shelter microbes?). When scientists combine more than one branch, we call it <Term def="Drawing on knowledge and methods from more than one scientific branch to tackle a problem.">interdisciplinary</Term> science.</p>
        <Figure caption="The four major science branches and how space science draws on all of them.">
          <svg viewBox="0 0 560 100" width="100%" style={{ maxWidth: 560 }}>
            {[["Biology","Living things","#27ae60"],["Chemistry","Matter","#8e44ad"],["Physics","Energy","#2980b9"],["Geology","Earth history","#c0392b"]].map(([name, sub, color], i) => (
              <g key={name} transform={`translate(${i * 140 + 4}, 10)`}>
                <rect width={128} height={60} rx={12} fill={color + "22"} stroke={color} strokeWidth={2}/>
                <text x={64} y={26} textAnchor="middle" fontSize={13} fontWeight="700" fill={color}>{name}</text>
                <text x={64} y={46} textAnchor="middle" fontSize={11} fill="var(--ink)">{sub}</text>
                {i < 3 && <text x={140} y={34} textAnchor="middle" fontSize={18} fill="var(--accent-deep)">+</text>}
              </g>
            ))}
            <text x={280} y={92} textAnchor="middle" fontSize={11} fill="var(--ink-muted)">Space science draws on all four branches.</text>
          </svg>
        </Figure>
        <BranchSorter />
        <QGroup title="Check yourself">
          <MCQ num={3} question="A scientist asks: 'Could microscopic life survive in the icy ocean of Jupiter's moon Europa?' Which branches of science does this question draw on?" options={["Only biology","Only physics and chemistry","Biology, chemistry, physics, and geology","Only geology"]} correct={2} explain="Understanding a potential habitat requires biology (life's needs), chemistry (what molecules exist), physics (heat sources and pressure), and geology (the structure of the icy crust)." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.1.3" title="Science is collaborative" progress={progress} setProgress={setProgress}>
        <p>Almost all important modern science is done by teams. Scientists share their work in <Term def="A research paper checked by independent experts before it is published.">peer-reviewed publications</Term> so others can check, challenge, and build on it. This sharing is what makes science <Term def="Each new discovery adds to a growing store of knowledge, building on what came before.">cumulative</Term>: every generation of scientists stands on the shoulders of the ones before.</p>
        <p>When Edwin Hubble showed that galaxies are moving away from each other, he was building on Einstein's equations and earlier measurements by other astronomers. The James Webb Space Telescope needed engineers and scientists from the United States, Europe, and Canada working together for decades. No single person could have built it alone.</p>
        <Callout kind="fact" title="Giant collaborative science">
          The International Space Station has been lived in continuously since 2000. It involves space agencies from 15 countries and thousands of scientists and engineers.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={4} question="Why is peer review important in science?" options={["It helps scientists keep their discoveries secret","It lets independent experts check for errors before findings are accepted","It proves that all scientific results are correct","It gives scientists extra funding"]} correct={1} explain="Peer review means independent experts check the methods and conclusions of a study before it is published, reducing errors and increasing confidence in the results." />
          <WrittenQ num={5} question="Explain why the JWST required international collaboration rather than a single country building it alone." model="The cost and technical complexity of the JWST were too large for any single country or agency. Collaboration allowed NASA, ESA, and CSA to share costs, combine technical expertise, and contribute different instruments and systems." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.1.4" title="Scientific theories and laws" progress={progress} setProgress={setProgress}>
        <p>In everyday conversation, a "theory" often means a guess. In science, it means something much stronger. A <Term def="A well-tested explanation for a wide range of related observations, supported by substantial evidence.">scientific theory</Term> is a robust, widely accepted explanation backed by years of testing by many scientists. The Big Bang theory and the theory of evolution are two examples.</p>
        <p>A <Term def="A precise statement, often mathematical, describing a pattern in nature under specific conditions.">scientific law</Term> is different: it describes what happens reliably but does not explain why. Newton's Law of Universal Gravitation tells us exactly how strongly two masses attract each other. It does not explain what gravity actually is at a deeper level, but it is so precise that it can predict exactly where a spacecraft will be years into the future.</p>
        <Callout kind="warn" title="Theory does not mean guess">
          Never confuse the everyday meaning of "theory" with the scientific meaning. A scientific theory has survived thousands of tests by independent scientists. It is far more reliable than a guess.
        </Callout>
        <Figure caption="From observation to theory: how evidence accumulates over time.">
          <svg viewBox="0 0 560 66" width="100%" style={{ maxWidth: 560 }}>
            {["Many observations","Hypothesis","Repeated tests","Evidence grows","Theory formed","New predictions"].map((s, i) => (
              <g key={s} transform={`translate(${i * 94 + 2}, 8)`}>
                <rect width={86} height={40} rx={9} fill="var(--accent-soft)" stroke="var(--accent-deep)" strokeWidth={1.5}/>
                <text x={43} y={24} textAnchor="middle" fontSize={10} fill="var(--ink)">{s}</text>
                {i < 5 && <text x={93} y={24} textAnchor="middle" fontSize={16} fill="var(--accent-deep)">›</text>}
              </g>
            ))}
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <MCQ num={6} question="Which statement correctly describes a scientific theory?" options={["A guess that has not been tested yet","A precise mathematical description of a pattern","A well-tested explanation supported by substantial evidence","A law that cannot be changed"]} correct={2} explain="A scientific theory is a well-tested explanation for a wide range of observations. It is not a guess, and it can be revised if new evidence demands it." />
        </QGroup>
      </DotPoint>
    </>
  );
}

function Section2({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">1.2 Practice of Science</div>
        <h1>Doing science: skills and tools</h1>
        <p className="lead">Science is a set of skills and habits. Learn the tools scientists use to make reliable measurements and draw honest conclusions.</p>
      </div>

      <DotPoint id="1.2.1" title="Working scientifically" progress={progress} setProgress={setProgress}>
        <p>Scientists do not just wander around hoping to discover things. They follow a set of practices called the <Term def="The six key processes NSW scientists use: questioning, planning, conducting, processing, problem-solving, and communicating.">Working Scientifically processes</Term>. The six processes are: questioning and predicting; planning investigations; conducting investigations; processing and analysing data; problem-solving; and communicating.</p>
        <p>These processes do not always happen in a neat line. A surprising result might send you back to redesign your experiment. New data might raise fresh questions. That is completely normal. The key thing is being systematic and honest at each step.</p>
        <Callout kind="tip" title="Working Scientifically in astronomy">
          When studying the night sky you cannot run a controlled experiment on a star. Astronomers use systematic observation instead, recording data carefully over long periods so patterns emerge.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={7} question="A student gets a result that contradicts their hypothesis. What should they do next?" options={["Ignore the result and report the original hypothesis","Use problem-solving to figure out why and consider redesigning the investigation","Report the result as an error","Stop the investigation immediately"]} correct={1} explain="An unexpected result is not a failure. Scientists use problem-solving to decide whether there was an error or whether the hypothesis needs to be revised." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.2.2" title="Analog and digital measuring instruments" progress={progress} setProgress={setProgress}>
        <p><Term def="Instruments that display values on a continuous scale or dial, like a ruler or mercury thermometer.">Analog instruments</Term> show measurements using a dial or scale, for example a ruler or mercury thermometer. <Term def="Instruments that display measurements as numbers on a screen, like a digital thermometer or GPS device.">Digital instruments</Term> show a precise number on a screen, like a digital thermometer or GPS device.</p>
        <p>Three things matter when choosing an instrument. The <Term def="The minimum to maximum values an instrument can reliably measure.">range</Term> tells you the largest and smallest values it can handle. The <Term def="The smallest change in a quantity an instrument can detect.">sensitivity</Term> tells you the smallest change it can pick up. The <Term def="How close a measurement is to the true value of what you are measuring.">accuracy</Term> tells you how close it gets to the true value. Telescopes use digital <Term def="A highly sensitive digital image sensor used in telescopes to detect very faint light.">CCD detectors</Term> because they are far more sensitive than the human eye, letting astronomers see objects billions of times fainter than we can without a telescope.</p>
        <InstrumentSim />
        <QGroup title="Check yourself">
          <MCQ num={8} question="A digital thermometer reads 23.1, 23.1, and 23.0 degrees C in three tests. Which word best describes these results?" options={["Accurate","Precise","Inaccurate","Random"]} correct={1} explain="The results are very consistent with each other, so they are precise. Precision does not guarantee accuracy. If the thermometer is not calibrated correctly, all three values could be wrong by the same amount." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.2.3" title="Senses vs instruments" progress={progress} setProgress={setProgress}>
        <p>Your senses are always with you and need no power, but they have important limits. Senses cannot detect <Term def="Radiation outside the visible spectrum, such as ultraviolet, infrared, and radio waves.">electromagnetic radiation</Term> outside the visible range. They give no precise number. And two people can look at the same star and disagree on its colour or brightness because perception varies from person to person.</p>
        <p>Scientific instruments produce <Term def="Giving the same result each time when measuring the same quantity under the same conditions.">reliable</Term> and objective measurements. A photometer can measure a star's brightness to within 0.001 magnitudes. No human eye could do that. In astronomy, digital detectors replaced photographic film in the 1980s because they are enormously more sensitive and produce consistent, quantitative data.</p>
        <Callout kind="key" title="Reliability means consistency">
          An instrument is reliable if it gives the same result every time you measure the same thing under the same conditions. Human observations are less reliable because mood, fatigue, and expectations affect what we notice.
        </Callout>
        <Figure caption="Comparing senses and instruments across four key qualities.">
          <svg viewBox="0 0 520 120" width="100%" style={{ maxWidth: 520 }}>
            {[["Range","Limited to visible","Far beyond human senses"],["Precision","Estimates only","Precise numbers"],["Reliability","Variable","High when calibrated"],["Objectivity","Subjective","Independent of observer"]].map(([feat, sense, instr], i) => (
              <g key={feat} transform={`translate(0, ${i * 26 + 8})`}>
                <text x={110} y={14} textAnchor="end" fontSize={11} fill="var(--ink)" fontWeight="700">{feat}</text>
                <rect x={118} y={2} width={160} height={18} rx={5} fill="#f7b73122" stroke="#f7b731" strokeWidth={1.5}/>
                <text x={198} y={14} textAnchor="middle" fontSize={10} fill="var(--ink)">{sense}</text>
                <rect x={290} y={2} width={220} height={18} rx={5} fill="var(--accent-soft)" stroke="var(--accent-deep)" strokeWidth={1.5}/>
                <text x={400} y={14} textAnchor="middle" fontSize={10} fill="var(--ink)">{instr}</text>
              </g>
            ))}
            <text x={198} y={118} textAnchor="middle" fontSize={10} fill="#f7b731" fontWeight="700">Human senses</text>
            <text x={400} y={118} textAnchor="middle" fontSize={10} fill="var(--accent-deep)" fontWeight="700">Scientific instruments</text>
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <MCQ num={9} question="Why did astronomers switch from photographic film to digital CCD detectors?" options={["CCD detectors are cheaper","CCDs are far more sensitive and produce quantitative digital data","Film can see infrared light that CCDs cannot","CCDs make prettier pictures"]} correct={1} explain="CCD detectors are enormously more sensitive than film, have a wider dynamic range, and produce digital data that computers can directly analyse. They detect much fainter objects than film ever could." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.2.4" title="Observation, inference, and prediction" progress={progress} setProgress={setProgress}>
        <p>An <Term def="A direct measurement or description of something detected by senses or instruments.">observation</Term> is simply what you detect directly. An <Term def="A logical conclusion drawn from one or more observations, going beyond what was directly measured.">inference</Term> is an explanation you work out from those observations. A <Term def="A specific statement about what will happen under new conditions, based on an inference, which can be tested.">testable prediction</Term> is a specific claim about what will happen next, which you can check.</p>
        <p>Here is a real example. Astronomers noticed that light from distant galaxies is shifted towards the red end of the spectrum. They inferred that these galaxies are moving away from us (the <Term def="The change in frequency of a wave caused by relative motion between the source and the observer.">Doppler effect</Term> stretches light from a receding source). They predicted that more distant galaxies should show a greater redshift. When they measured it, they confirmed the prediction. This led directly to the discovery that the universe is expanding.</p>
        <ObsInferPred />
        <QGroup title="Check yourself">
          <WrittenQ num={10} question="A student observes that a star appears to dim slightly every 365 days like clockwork. Write an inference and a testable prediction based on this observation." model="Inference: a planet is probably orbiting the star and passing in front of it, blocking some light (this is called the transit method). Testable prediction: the brightness should dip by the same amount every 365 days. Longer telescope observations should confirm the regular pattern and allow us to estimate the planet's size from how much light is blocked." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.2.5" title="Systematic observation and controlled experiments" progress={progress} setProgress={setProgress}>
        <p>Scientists choose their research method based on the type of question. A <Term def="An investigation where one variable is deliberately changed, one is measured, and all others are kept the same.">controlled experiment</Term> works when you can deliberately change one thing at a time in a lab. The variable you change is called the <Term def="The variable deliberately changed by the scientist.">independent variable</Term>. The variable you measure is the <Term def="The variable measured to see the effect of changing the independent variable.">dependent variable</Term>. All other factors you keep the same are <Term def="Variables kept constant in an experiment so they do not affect the result.">controlled variables</Term>.</p>
        <p><Term def="Recording observations using a consistent method at regular intervals over a long period.">Systematic observation</Term> is used when you cannot control the thing you are studying. Astronomers cannot change how a star behaves, so they watch and record it consistently over time. Long-term sunspot records dating back to 1610 revealed an approximately 11-year solar cycle that no single short experiment could have found.</p>
        <Callout kind="tip" title="Seasons investigation">
          A lamp-and-card experiment where you change the angle of a light beam models how seasons work on Earth. The angle of the lamp is the independent variable. The temperature rise of the card is the dependent variable. The distance from lamp to card must be kept constant as a controlled variable.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={11} question="In an investigation testing how the angle of sunlight affects surface temperature, which is the independent variable?" options={["The temperature rise of the card","The distance from the lamp to the card","The angle of the lamp to the card surface","The room temperature"]} correct={2} explain="The independent variable is the one you deliberately change. In this investigation, you change the angle of the lamp. You measure the temperature rise, which is the dependent variable." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.2.6" title="Conducting safe investigations" progress={progress} setProgress={setProgress}>
        <p>Before any investigation you need to identify hazards and manage them. Following the method step by step makes your investigation <Term def="Able to be repeated by another scientist using the same method and obtaining similar results.">reproducible</Term>. Only change one variable at a time in a fair test, or you will not be able to tell which change caused which effect.</p>
        <p>A sunlight angle investigation models how Earth's seasons work. When the lamp is directly above the card (90 degrees), the light is concentrated on a small area and the card heats up most. At a lower angle (say 30 degrees) the same light energy is spread over a larger area, so each bit of surface gets less energy and heats up less. On Earth, this is exactly what happens at different latitudes and at different times of year.</p>
        <Callout kind="warn" title="Fair test">
          Only one variable should change at a time. If you accidentally move the lamp closer while also changing the angle, you will not know which change caused the result.
        </Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={12} question="Why does sunlight at a low angle (near the horizon in winter) warm the ground less than sunlight at a high angle (overhead in summer)?" model="At a low angle, the same amount of light energy is spread over a much larger surface area. Each square metre of ground receives less energy, so it heats up less. At a high angle, the energy is concentrated on a smaller area, delivering more energy per square metre and heating the surface more effectively." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.2.7" title="Observing change over time" progress={progress} setProgress={setProgress}>
        <p>A single measurement is like one frame of a film. You need a series of measurements to see the story. Tracking the Moon's phases over four weeks, recording the Moon's shape each clear night, reveals the approximately 29.5-day <Term def="The time for the Moon to complete one full sequence of phases from new Moon back to new Moon.">lunar cycle</Term>.</p>
        <p>To make reliable observations over time, use the same method and instrument each time, record the date and time, and organise your data in a table. Then graph the results to spot the pattern. Consistent long-term records like this led to the discovery of the 11-year sunspot cycle, something no short experiment could have revealed.</p>
        <Callout kind="tip" title="Moon phase journal">
          On each clear night, sketch the lit shape of the Moon and shade the dark part. After four weeks you will be able to see the whole cycle laid out in order. The interval between two full Moons gives you the cycle length.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={13} question="Why are a series of observations over time more useful than a single observation?" options={["They are easier to record","They reveal patterns, trends, and cycles that a single measurement cannot show","They are more accurate","They require less equipment"]} correct={1} explain="A single observation captures one moment. A series of observations shows how something changes, revealing patterns (like the lunar phase cycle) or trends (like cooling over time)." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.2.8" title="Graphs, trends, and conclusions" progress={progress} setProgress={setProgress}>
        <p>Once you have data, you need to display it clearly. Use a <Term def="A graph where both axes are continuous and numerical, used to show change over time or relationships between variables.">line graph</Term> when both variables are continuous numbers (like temperature over time). Use a <Term def="A graph where one axis has categories, used to compare groups.">bar chart</Term> when one axis has separate categories (like comparing orbital periods of different planets). A conclusion must stick to what the data actually shows, nothing more.</p>
        <p>Graphs reveal <Term def="A general, consistent direction of change in data, such as a steady increase or decrease.">trends</Term> and <Term def="A consistent link between two variables shown in data.">relationships</Term>. Plotting the orbital period of each planet against its distance from the Sun reveals that planets further away take much longer to complete one orbit. This relationship is known as Kepler's third law.</p>
        <Figure caption="Orbital periods of six planets (inner to outer solar system).">
          <svg viewBox="0 0 540 180" width="100%" style={{ maxWidth: 540 }}>
            {(() => {
              const data = [["Mercury",0.24,"#aaa"],["Venus",0.62,"#e2b97e"],["Earth",1.0,"#4a90d9"],["Mars",1.88,"#e74c3c"],["Jupiter",11.86,"#f0a500"],["Saturn",29.46,"#c2a060"]];
              const maxV = 30;
              const barW = 68, gap = 14, h = 120;
              return data.map(([name, val, color], i) => {
                const barH = (val / maxV) * h;
                return (
                  <g key={name} transform={`translate(${i * (barW + gap) + 18}, 10)`}>
                    <rect y={h - barH} width={barW} height={barH} rx={5} fill={color} opacity={0.85}/>
                    <text x={barW / 2} y={h - barH - 6} textAnchor="middle" fontSize={10} fill="var(--ink)" fontWeight="700">{val}</text>
                    <text x={barW / 2} y={h + 14} textAnchor="middle" fontSize={10} fill="var(--ink)">{name}</text>
                    <text x={barW / 2} y={h + 26} textAnchor="middle" fontSize={8} fill="var(--ink-muted)">Earth years</text>
                  </g>
                );
              });
            })()}
            <text x={270} y={170} textAnchor="middle" fontSize={10} fill="var(--ink-muted)">Planets further from the Sun take much longer to complete one orbit.</text>
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <MCQ num={14} question="A scientist graphs temperature against time as a beaker of water cools. Which type of graph is most appropriate?" options={["Pie chart","Bar chart","Line graph","Scatter diagram with no line"]} correct={2} explain="A line graph is used when both variables are continuous numbers and you want to show how one changes as the other changes. Temperature and time are both continuous, so a line graph is correct." />
        </QGroup>
      </DotPoint>
    </>
  );
}

function Section3({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">1.3 Space Science</div>
        <h1>The Sun, Earth, Moon, and beyond</h1>
        <p className="lead">Our place in the solar system explains almost everything we see in the sky.</p>
      </div>

      <Figure src="img/earth-sun.png" caption="Earth orbits the Sun with its axis tilted — one half in daylight, the other in night." />
      <DotPoint id="1.3.1" title="Historical solar system models" progress={progress} setProgress={setProgress}>
        <p>For over 1,400 years, almost everyone believed Earth sat at the centre of the universe. This was the <Term def="The Earth-centred model of the solar system, developed by Ptolemy around 150 CE.">geocentric model</Term>, developed by the Greek philosopher Ptolemy. It matched everyday experience (the sky looks like it moves around a stationary Earth) and was supported by the Church. But it needed very complicated additions called <Term def="Small circular paths added to orbits in the geocentric model to explain why planets sometimes appear to move backwards in the sky.">epicycles</Term> to explain why planets occasionally appear to move backwards.</p>
        <p>In 1543, the Polish astronomer <Term def="The astronomer who proposed the first widely accepted Sun-centred model of the solar system in 1543.">Nicolaus Copernicus</Term> proposed the <Term def="The Sun-centred model of the solar system.">heliocentric model</Term>, placing the Sun at the centre. Galileo used a telescope in 1609 to find moons orbiting Jupiter (proving not everything circles Earth) and phases of Venus (only possible if Venus orbits the Sun). Johannes Kepler showed the orbits are ellipses, not circles. Isaac Newton then explained why: <Term def="The force of attraction between any two objects that have mass.">gravity</Term>.</p>
        <SolarModelSim />
        <Callout kind="key" title="Science changes with evidence">
          The geocentric model was replaced not because someone decided to, but because new observations (telescopes) revealed facts the old model could not explain. This is how science is supposed to work.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={15} question="Which observation by Galileo most directly disproved the geocentric model?" options={["Sunspots on the surface of the Sun","Mountains on the Moon","Moons orbiting Jupiter","The Milky Way is made of stars"]} correct={2} explain="The geocentric model said everything orbits Earth. Galileo saw four moons clearly orbiting Jupiter, proving that not all objects orbit Earth. This directly contradicted the central assumption of the geocentric model." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.3.2" title="Day, night, seasons, and tides" progress={progress} setProgress={setProgress}>
        <p>Most of the most familiar sky events come from the relative positions and movements of the Sun, Earth, and Moon. <Term def="The daily cycle of light and darkness caused by Earth rotating on its axis once every approximately 24 hours.">Day and night</Term> happen because Earth spins on its axis every 24 hours. The half facing the Sun has day; the other half has night.</p>
        <p><Term def="The yearly cycle of changing temperatures and day lengths caused by Earth's axial tilt as it orbits the Sun.">Seasons</Term> are caused by Earth's <Term def="The 23.5-degree lean of Earth's rotational axis relative to the plane of its orbit around the Sun.">axial tilt</Term> of 23.5 degrees. As Earth orbits the Sun, the Southern Hemisphere leans towards the Sun during December to February (our summer), and away during June to August (our winter). It is NOT caused by how close Earth is to the Sun. In fact Earth is slightly closer to the Sun in January.</p>
        <p><Term def="The regular rise and fall of sea levels caused mainly by the Moon's gravitational pull on Earth's oceans.">Tides</Term> are caused mainly by the Moon's gravity pulling on Earth's oceans, creating two bulges of water. Spring tides (the strongest) happen at new Moon and full Moon when the Sun and Moon align. Neap tides (the weakest) happen at quarter Moons when they are at right angles.</p>
        <DayNightSim />
        <SeasonsSim />
        <QGroup title="Check yourself">
          <MCQ num={16} question="Australia has summer in December. What is the correct explanation?" options={["Earth is closer to the Sun in December","The Southern Hemisphere is tilted towards the Sun in December","Earth rotates faster in December","The Moon is full in December"]} correct={1} explain="Australia has summer in December because the Southern Hemisphere is tilted towards the Sun at that point in Earth's orbit, receiving more direct sunlight for longer each day. Distance from the Sun does not cause the seasons." />
          <WrittenQ num={17} question="Explain why there are two high tides each day in most coastal places." model="The Moon's gravity pulls the ocean on the side of Earth closest to the Moon into a bulge (high tide). At the same time, on the opposite side, Earth is pulled towards the Moon more than the water there, so the water is left behind creating a second bulge. As Earth rotates in 24 hours, any coastal location passes through both bulges, giving two high tides per day." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.3.3" title="Lunar phases and eclipses" progress={progress} setProgress={setProgress}>
        <p>The Moon does not produce its own light. It reflects sunlight. As the Moon orbits Earth over about 29.5 days, we see different amounts of the sunlit half, giving us the familiar cycle of <Term def="The changing appearance of the Moon's lit surface as seen from Earth during its 29.5-day orbit.">lunar phases</Term>: new Moon, waxing crescent, first quarter, waxing gibbous, full Moon, waning gibbous, last quarter, waning crescent.</p>
        <p>A <Term def="An event where the Moon passes directly between the Sun and Earth, blocking sunlight from reaching part of Earth.">solar eclipse</Term> happens at new Moon when the Moon lines up perfectly between the Sun and Earth, casting a shadow on Earth. Observers inside the <Term def="The central, darkest part of a shadow where the light source is completely blocked.">umbra</Term> see a total eclipse. A <Term def="An event where Earth passes between the Sun and the Moon, casting Earth's shadow on the Moon.">lunar eclipse</Term> happens at full Moon when Earth's shadow falls on the Moon. The Moon turns reddish because Earth's atmosphere bends red light into the shadow, just like a sunset glow. Eclipses do not happen every month because the Moon's orbit is tilted about 5 degrees from Earth's orbital plane.</p>
        <MoonPhaseSim />
        <EclipseAligner />
        <QGroup title="Check yourself">
          <MCQ num={18} question="Why does the Moon appear reddish-orange during a total lunar eclipse?" options={["The Moon's own rock reflects red light","The Sun's light is filtered through Earth's atmosphere before reaching the Moon","The Moon is covered in red dust","The Moon is moving very fast"]} correct={1} explain="During a total lunar eclipse, no direct sunlight reaches the Moon because Earth is in the way. However, Earth's atmosphere bends some sunlight around Earth's edge, and this bent light is enriched in red wavelengths (like a sunset). This red light falls on the Moon." />
          <WrittenQ num={19} question="Why do we not see a solar eclipse every new Moon and a lunar eclipse every full Moon?" model="The Moon's orbit is tilted about 5 degrees compared to the plane of Earth's orbit around the Sun. This means at most new Moons the Moon passes slightly above or below the line between Earth and the Sun, and no eclipse occurs. Eclipses only happen when a new or full Moon coincides with the Moon being very near one of the two points where its orbit crosses Earth's orbital plane." />
        </QGroup>
      </DotPoint>
    </>
  );
}

function Section4({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">1.4 Aboriginal and Torres Strait Islander Peoples' Astronomy</div>
        <h1>The sky as a living calendar</h1>
        <p className="lead">Aboriginal and Torres Strait Islander peoples developed some of the world's oldest and most detailed astronomical knowledge systems.</p>
      </div>

      <Figure src="img/sky-knowledge.png" caption="The Emu in the Sky — a dark-cloud constellation in the Milky Way, central to Aboriginal astronomy." />
      <DotPoint id="1.4.1" title="Moon phases and tides: two knowledge systems" progress={progress} setProgress={setProgress}>
        <p>Aboriginal and Torres Strait Islander peoples across Australia carefully observed the Moon's phases over tens of thousands of years and connected them to practical predictions about tides. The <Term def="An Aboriginal people of Arnhem Land, Northern Territory, with extensive astronomical and ecological knowledge.">Yolngu</Term> people of Arnhem Land describe the Moon filling with water as it waxes (grows) and emptying as it wanes (shrinks), producing a predictable tidal cycle. Coastal communities used this knowledge to plan fishing trips, shellfish gathering, and access to tidal rock platforms.</p>
        <p>Modern science explains the same patterns through the Moon's <Term def="The force of attraction between objects with mass. The Moon's gravity creates tidal bulges in Earth's oceans.">gravitational pull</Term> on Earth's oceans. The strongest tides (<Term def="The strongest tides, occurring at new Moon and full Moon when the Sun and Moon are aligned.">spring tides</Term>) occur at new Moon and full Moon. The weakest tides (<Term def="Relatively weak tides occurring at first and last quarter Moon when the Sun and Moon are at right angles.">neap tides</Term>) occur at quarter phases. Both knowledge systems reach the same practical result: the Moon's phase accurately predicts tidal strength.</p>
        <Callout kind="key" title="Two routes to the same knowledge">
          The Yolngu and modern science arrived at the same accurate tidal predictions from the same natural observations. Both systems are based on systematic observation tested over time. The mechanism described is different, but the practical outcome is identical.
        </Callout>
        <Figure caption="Moon phases and their connection to tidal strength: two perspectives.">
          <svg viewBox="0 0 540 100" width="100%" style={{ maxWidth: 540 }}>
            {[["New Moon","Spring tide","high","#333"],["First Quarter","Neap tide","moderate","#888"],["Full Moon","Spring tide","high","#e8e0c8"],["Last Quarter","Neap tide","moderate","#888"]].map(([phase, tide, level, color], i) => (
              <g key={phase} transform={`translate(${i * 136 + 4}, 10)`}>
                <circle cx={65} cy={30} r={20} fill={color} stroke="var(--accent-mid)" strokeWidth={2}/>
                <text x={65} y={35} textAnchor="middle" fontSize={9} fill={color === "#333" ? "#ccc" : "var(--ink)"}>{phase}</text>
                <text x={65} y={66} textAnchor="middle" fontSize={10} fill="var(--accent-deep)" fontWeight="700">{tide}</text>
                <text x={65} y={82} textAnchor="middle" fontSize={9} fill="var(--ink-muted)">Tidal range: {level}</text>
              </g>
            ))}
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <MCQ num={20} question="Which statement best describes the relationship between Indigenous and scientific knowledge of Moon phases and tides?" options={["Indigenous knowledge is wrong because it does not use science","Both knowledge systems accurately predict tidal patterns from the same observations","Scientific knowledge is less useful than Indigenous knowledge for fishing","The two systems have nothing in common"]} correct={1} explain="Both systems arrived at accurate predictions by observing the same Moon. They use different frameworks to explain the mechanism, but both produce reliable practical predictions about tidal patterns." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.4.2" title="Stars as weather and seasonal indicators" progress={progress} setProgress={setProgress}>
        <p>Because Earth orbits the Sun each year, different stars appear in the night sky at different times of year. Aboriginal and Torres Strait Islander peoples used this predictable <Term def="The regular seasonal changes in which stars are visible in the night sky, caused by Earth's orbit around the Sun.">stellar calendar</Term> to predict weather events and plan resource activities with remarkable accuracy.</p>
        <p>The <Term def="A group of Aboriginal people of north-western Victoria with deep astronomical knowledge.">Boorong</Term> people of Victoria called the Pleiades star cluster <Term def="The Boorong name for the Pleiades star cluster, whose appearance signals the eel harvesting season.">Karakarook</Term>. When Karakarook rose in the evening sky, the eel harvesting season began and cold, wet weather was approaching. Many groups across Australia also recognised the <Term def="A dark constellation formed by the dust lanes in the Milky Way, shaped like an emu and used as a seasonal indicator by many Aboriginal groups.">Emu in the Sky</Term>, a shape formed not by bright stars but by the dark dust clouds within the Milky Way. When the Emu lies flat near the horizon, emus are sitting on their nests and eggs are ready to collect.</p>
        <Callout kind="fact" title="Dark constellations">
          Western astronomy traces constellations by connecting bright stars. Many Aboriginal and Torres Strait Islander groups also use "dark constellations" formed by the dark gaps between the stars in the Milky Way. The Emu in the Sky is one of the most famous examples.
        </Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={21} question="Explain why a star's position in the night sky can be used to predict the season, even though the star itself is billions of kilometres away and has nothing to do with Earth's weather." model="As Earth orbits the Sun over one year, different stars appear in the night sky because we are facing different directions in space each night. The same star appears in the same position in the sky at the same time each year because Earth's orbit is regular and predictable. Because seasons are also caused by Earth's orbit, a star's appearance is reliably correlated with the season, making it an accurate seasonal calendar even though the star is not the cause of the season." />
        </QGroup>
      </DotPoint>

      <DotPoint id="1.4.3" title="A complete seasonal knowledge system" progress={progress} setProgress={setProgress}>
        <p>Aboriginal and Torres Strait Islander peoples developed complete systems that linked astronomical observations to animal behaviour, plant cycles, and tidal changes. The <Term def="An Aboriginal people of south-western Western Australia who recognise six seasons in their ecological calendar.">Noongar</Term> people of south-western Western Australia recognised six seasons rather than the four seasons used in Europe. Each Noongar season is defined by a combination of temperature, rainfall, wind, plant flowering, animal behaviour, and astronomical signals.</p>
        <p>In Torres Strait, the rising of the Pleiades in May signals the start of the trade wind season, changing when and where communities fish. The <Term def="An Aboriginal people of western New South Wales who used stars to predict waterhole levels.">Barkandji</Term> people of western New South Wales used star positions to predict when waterholes would be full enough for large gatherings. These are not isolated observations. They are interconnected systems of knowledge that connected the sky to life on the ground across an entire continent for tens of thousands of years.</p>
        <SkyCalendarSim />
        <Callout kind="key" title="Why this matters">
          Indigenous astronomical knowledge systems represent tens of thousands of years of careful, systematic observation tested against real-world outcomes. Acknowledging these systems respects Australia's First Peoples and preserves knowledge of enormous scientific and cultural value.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={22} question="Why might the Noongar six-season calendar be more useful for managing food resources in south-western Australia than the European four-season calendar?" options={["Because it is older","Because six seasons match local ecological and weather patterns more precisely than four seasons designed for northern Europe","Because it uses more scientific language","Because it is endorsed by government agencies"]} correct={1} explain="The European four-season calendar was designed for northern European conditions and is based on astronomical divisions. The Noongar calendar is based on the specific local ecology of south-western Australia, providing finer distinctions that match local food availability and weather patterns more accurately." />
        </QGroup>
      </DotPoint>
    </>
  );
}

function Section5({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">1.5 Observing the Universe: In Context</div>
        <h1>A new window on the universe</h1>
        <p className="lead">The James Webb Space Telescope is the most powerful eye we have ever pointed at the cosmos. Find out what it can see and what it has already discovered.</p>
      </div>

      <Figure src="img/jwst.png" caption="The James Webb Space Telescope and its golden hexagonal mirror." />
      <DotPoint id="1.5.1" title="The James Webb Space Telescope" progress={progress} setProgress={setProgress}>
        <p>The <Term def="The most powerful space telescope ever built, launched on 25 December 2021, observing primarily in infrared light.">James Webb Space Telescope (JWST)</Term> was launched on 25 December 2021. It is the result of decades of work by engineers and scientists from three space agencies: NASA (United States), ESA (European Space Agency), and CSA (Canadian Space Agency). Its mirror is 6.5 metres across, nearly three times the size of the <Term def="A space telescope launched in 1990 that observes in visible and ultraviolet light, orbiting 570 km above Earth.">Hubble Space Telescope's</Term> mirror. This gives it far greater <Term def="The ability of a telescope to collect light from faint objects. Larger mirrors gather more light.">light-gathering power</Term>.</p>
        <p>The JWST observes mainly in <Term def="Electromagnetic radiation with wavelengths longer than visible light but shorter than radio waves. Felt as heat.">infrared light</Term>. This lets it see through the dust clouds that block ordinary visible light, revealing hidden star-forming regions and very distant galaxies. It is parked at a special gravitational balance point called <Term def="The second Lagrange point, approximately 1.5 million km from Earth, where the telescope stays in sync with Earth's orbit while remaining on the night side.">Lagrange point L2</Term>, about 1.5 million kilometres from Earth. A five-layer sunshield the size of a tennis court keeps its instruments cold enough to detect the faint infrared glow of the most distant galaxies ever observed.</p>
        <TelescopeCompare />
        <Callout kind="success" title="JWST discoveries so far">
          The JWST has observed galaxies that formed only 200 to 300 million years after the Big Bang, detected carbon dioxide in the atmosphere of a planet orbiting another star (a world first), and revealed star-forming regions hidden behind thick dust clouds in stunning detail.
        </Callout>
        <Figure caption="How the JWST followed the Working Scientifically processes.">
          <svg viewBox="0 0 560 70" width="100%" style={{ maxWidth: 560 }}>
            {["Question","Plan","Conduct","Process","Discover","Communicate"].map((s, i) => (
              <g key={s} transform={`translate(${i * 94 + 2}, 8)`}>
                <rect width={88} height={40} rx={9} fill="var(--accent-soft)" stroke="var(--accent-deep)" strokeWidth={1.5}/>
                <text x={44} y={24} textAnchor="middle" fontSize={10} fill="var(--ink)">{s}</text>
                {i < 5 && <text x={95} y={24} textAnchor="middle" fontSize={16} fill="var(--accent-deep)">›</text>}
              </g>
            ))}
            <text x={280} y={66} textAnchor="middle" fontSize={9} fill="var(--ink-muted)">Every JWST observation follows these Working Scientifically steps.</text>
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <MCQ num={23} question="Why does the JWST observe in infrared light rather than visible light?" options={["Infrared cameras are cheaper to build","Infrared light can pass through dust clouds and is emitted by very distant galaxies","Visible light is blocked by the sunshield","Hubble already covers visible light, so there is no point repeating it"]} correct={1} explain="Infrared light passes through dust clouds that block visible light, allowing JWST to see hidden star-forming regions. Also, the expansion of the universe stretches light from very distant galaxies into infrared wavelengths, so observing infrared lets JWST see the earliest galaxies." />
          <WrittenQ num={24} question="Explain how the JWST demonstrates three key principles of the nature and practice of science covered in this topic." model="1. Collaborative science: the JWST was built by NASA, ESA, and CSA together, involving thousands of scientists and engineers. 2. Science builds on previous work: the JWST was designed specifically to answer questions Hubble raised but could not fully answer. It used decades of improved mirror technology and infrared detector design. 3. Instruments extend human senses: the JWST detects infrared radiation invisible to the human eye and records data from objects billions of times too faint to see without a telescope." />
        </QGroup>
      </DotPoint>
    </>
  );
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
    "Doppler effect": "The change in frequency of a wave caused by relative motion between the source and the observer.",
  },
  sections: [
    {
      id: "1.1",
      label: "Nature of Science",
      accent: "amber",
      blurb: "What science is and how it builds knowledge.",
      points: ["1.1.1", "1.1.2", "1.1.3", "1.1.4"],
      render: (p) => <Section1 {...p} />,
    },
    {
      id: "1.2",
      label: "Practice of Science",
      accent: "orange",
      blurb: "The skills and tools scientists use in investigations.",
      points: ["1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5", "1.2.6", "1.2.7", "1.2.8"],
      render: (p) => <Section2 {...p} />,
    },
    {
      id: "1.3",
      label: "Space Science",
      accent: "amber",
      blurb: "Solar system models, day and night, seasons, tides, lunar phases, and eclipses.",
      points: ["1.3.1", "1.3.2", "1.3.3"],
      render: (p) => <Section3 {...p} />,
    },
    {
      id: "1.4",
      label: "Indigenous Astronomy",
      accent: "orange",
      blurb: "Aboriginal and Torres Strait Islander astronomical knowledge systems.",
      points: ["1.4.1", "1.4.2", "1.4.3"],
      render: (p) => <Section4 {...p} />,
    },
    {
      id: "1.5",
      label: "In Context: JWST",
      accent: "amber",
      blurb: "How the James Webb Space Telescope expanded our knowledge of the universe.",
      points: ["1.5.1"],
      render: (p) => <Section5 {...p} />,
    },
  ],
});
