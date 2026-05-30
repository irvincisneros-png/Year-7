/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp */
const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   SECTION 3.1 INTERACTIVES
   ============================================================ */

/* MRSGREN flashcard quiz */
function MrsgrenFlashcards() {
  const cards = [
    { letter: "M", name: "Movement", desc: "All living things move some part of themselves. Plants grow toward light. Animals walk, swim or fly.", example: "A sunflower turns to face the sun across the day." },
    { letter: "R", name: "Reproduction", desc: "Organisms produce offspring so the species continues. This can be sexual or asexual.", example: "A strawberry plant sends out runners that grow into new plants." },
    { letter: "S", name: "Sensitivity", desc: "Organisms detect and respond to changes in their environment, called stimuli.", example: "A moth flies toward a light source at night." },
    { letter: "G", name: "Growth", desc: "Organisms increase in size and complexity using nutrients and energy.", example: "A tadpole grows into a frog over several weeks." },
    { letter: "R2", name: "Respiration", desc: "All cells release energy from food molecules. Most use oxygen for aerobic respiration.", example: "Your muscle cells burn glucose to power every movement." },
    { letter: "E", name: "Excretion", desc: "Metabolic waste products are removed from the body. This is NOT the same as getting rid of undigested food.", example: "Your kidneys filter urea from the blood and produce urine." },
    { letter: "N", name: "Nutrition", desc: "Organisms obtain and use nutrients. Plants photosynthesise; animals eat food.", example: "A koala eats eucalyptus leaves to get energy and nutrients." },
  ];
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[idx];
  return (
    <Interactive title="MRSGREN flashcards" subtitle="Click a card to flip it. Use the arrows to move between characteristics." takeaway="All seven MRSGREN characteristics must be present for something to be classified as a living thing, and each characteristic has a specific meaning quite different from everyday language.">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div
          onClick={() => setFlipped(f => !f)}
          style={{
            width: "100%", maxWidth: 420, minHeight: 160, borderRadius: 16,
            background: flipped ? "var(--accent-deep)" : "var(--accent-soft)",
            color: flipped ? "#fff" : "var(--ink)",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "24px 28px", cursor: "pointer",
            boxShadow: "0 4px 18px rgba(0,0,0,0.10)", transition: "background 0.3s, color 0.3s",
            textAlign: "center", userSelect: "none"
          }}
        >
          {!flipped ? (
            <>
              <span style={{ fontSize: 48, fontWeight: 800, lineHeight: 1 }}>{card.letter === "R2" ? "R" : card.letter}</span>
              <span style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>{card.name}</span>
              <span style={{ fontSize: 13, marginTop: 6, opacity: 0.7 }}>Tap to reveal</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{card.name}</span>
              <span style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 10 }}>{card.desc}</span>
              <span style={{ fontSize: 13, fontStyle: "italic", opacity: 0.9 }}>{card.example}</span>
            </>
          )}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn btn-ghost" onClick={() => { setIdx(i => (i - 1 + cards.length) % cards.length); setFlipped(false); }}>
            Previous
          </button>
          <span className="muted" style={{ fontSize: 13 }}>{idx + 1} of {cards.length}</span>
          <button className="btn btn-accent" onClick={() => { setIdx(i => (i + 1) % cards.length); setFlipped(false); }}>
            Next
          </button>
        </div>
      </div>
    </Interactive>
  );
}

/* Living vs Non-living sorter */
function LivingThingsSorter() {
  return (
    <Interactive title="Living or non-living?" subtitle="Sort each item into the correct bucket by clicking it." takeaway="Some things that seem alive, like a candle flame, fail the MRSGREN test, while some living things, like viruses, are genuinely debated by scientists.">
      <MatchBuckets
        items={[
          { id: "a", label: "Mushroom", bucket: "living" },
          { id: "b", label: "Candle flame", bucket: "nonliving" },
          { id: "c", label: "River stone", bucket: "nonliving" },
          { id: "d", label: "Yeast cell", bucket: "living" },
          { id: "e", label: "Virus", bucket: "debated" },
          { id: "f", label: "Fern plant", bucket: "living" },
          { id: "g", label: "Robot vacuum", bucket: "nonliving" },
          { id: "h", label: "Amoeba", bucket: "living" },
        ]}
        buckets={[
          { id: "living", label: "Living" },
          { id: "nonliving", label: "Non-living" },
          { id: "debated", label: "Debated" },
        ]}
      />
    </Interactive>
  );
}

/* Kingdom classification sorter */
function KingdomSorter() {
  return (
    <Interactive title="Kingdom sorter" subtitle="Place each organism into its correct kingdom." takeaway="Life is divided into six kingdoms, and placing an organism in the correct one depends on its cell type, how it obtains nutrients, and its body structure.">
      <MatchBuckets
        items={[
          { id: "a", label: "Mushroom", bucket: "fungi" },
          { id: "b", label: "E. coli bacterium", bucket: "bacteria" },
          { id: "c", label: "Amoeba", bucket: "protista" },
          { id: "d", label: "Grevillea (flower)", bucket: "plantae" },
          { id: "e", label: "Saltwater crocodile", bucket: "animalia" },
          { id: "f", label: "Thermophile archaea", bucket: "archaea" },
          { id: "g", label: "Bull kelp (alga)", bucket: "protista" },
          { id: "h", label: "Red kangaroo", bucket: "animalia" },
        ]}
        buckets={[
          { id: "animalia", label: "Animalia" },
          { id: "plantae", label: "Plantae" },
          { id: "fungi", label: "Fungi" },
          { id: "protista", label: "Protista" },
          { id: "bacteria", label: "Bacteria" },
          { id: "archaea", label: "Archaea" },
        ]}
      />
    </Interactive>
  );
}

/* Dichotomous key interactive for Australian invertebrates */
function DichotomousKeyGame() {
  const creatures = [
    {
      id: "bee",
      name: "Honeybee",
      clues: { legs: 6, wings: true, segments: 3, antennae: 2 },
      path: ["step1a", "step2a"],
      answer: "Class Insecta (winged insect)",
    },
    {
      id: "spider",
      name: "Huntsman spider",
      clues: { legs: 8, wings: false, segments: 2, antennae: 0 },
      path: ["step1b", "step3a"],
      answer: "Class Arachnida",
    },
    {
      id: "centipede",
      name: "Giant centipede",
      clues: { legs: "30+", wings: false, segments: "many", pairsPerSegment: 1 },
      path: ["step1b", "step3b", "step4a"],
      answer: "Class Chilopoda (centipede)",
    },
    {
      id: "millipede",
      name: "Pill millipede",
      clues: { legs: "20+", wings: false, segments: "many", pairsPerSegment: 2 },
      path: ["step1b", "step3b", "step4b"],
      answer: "Class Diplopoda (millipede)",
    },
    {
      id: "ant",
      name: "Bull ant",
      clues: { legs: 6, wings: false, segments: 3, antennae: 2 },
      path: ["step1a", "step2b"],
      answer: "Class Insecta (wingless insect)",
    },
  ];

  const steps = {
    start: {
      question: "Step 1: How many legs does the organism have?",
      options: [
        { label: "Exactly 6 legs", next: "step2" },
        { label: "More than 6 legs", next: "step3" },
      ],
    },
    step2: {
      question: "Step 2: Does the organism have visible wings?",
      options: [
        { label: "Yes, has wings", result: "Class Insecta (winged insect)" },
        { label: "No wings", result: "Class Insecta (wingless insect)" },
      ],
    },
    step3: {
      question: "Step 3: How many legs does it have?",
      options: [
        { label: "Exactly 8 legs", result: "Class Arachnida" },
        { label: "10 or more legs", next: "step4" },
      ],
    },
    step4: {
      question: "Step 4: How many pairs of legs per body segment?",
      options: [
        { label: "One pair per segment", result: "Class Chilopoda (centipede)" },
        { label: "Two pairs per segment", result: "Class Diplopoda (millipede)" },
      ],
    },
  };

  const [currentCreature, setCurrentCreature] = useState(null);
  const [step, setStep] = useState("start");
  const [result, setResult] = useState(null);
  const [correct, setCorrect] = useState(null);

  function pickCreature() {
    const c = creatures[Math.floor(Math.random() * creatures.length)];
    setCurrentCreature(c);
    setStep("start");
    setResult(null);
    setCorrect(null);
  }

  function choose(option) {
    if (option.result) {
      const isCorrect = currentCreature && option.result === currentCreature.answer;
      setResult(option.result);
      setCorrect(isCorrect);
    } else if (option.next) {
      setStep(option.next);
    }
  }

  const currentStep = steps[step];

  return (
    <Interactive title="Dichotomous key challenge" subtitle="Pick a mystery Australian invertebrate and use the key to identify it." takeaway="A dichotomous key identifies unknown organisms by working through a series of paired questions, so one wrong observation at any step leads to a wrong answer at the end.">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {!currentCreature ? (
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: 12 }}>Click the button to get a mystery invertebrate to identify.</p>
            <button className="btn btn-accent" onClick={pickCreature}>Start identification</button>
          </div>
        ) : (
          <>
            <div className="card" style={{ padding: "14px 18px", background: "var(--accent-soft)" }}>
              <span style={{ fontWeight: 700 }}>Mystery organism:</span> {currentCreature.name}
              <div style={{ marginTop: 6, fontSize: 13 }} className="muted">
                Legs: {currentCreature.clues.legs}
                {currentCreature.clues.wings !== undefined && (" | Wings: " + (currentCreature.clues.wings ? "yes" : "no"))}
                {currentCreature.clues.pairsPerSegment && (" | Leg pairs per segment: " + currentCreature.clues.pairsPerSegment)}
              </div>
            </div>
            {!result ? (
              <div>
                <p style={{ fontWeight: 600, marginBottom: 10 }}>{currentStep.question}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {currentStep.options.map((opt, i) => (
                    <button key={i} className="btn btn-ghost" style={{ textAlign: "left", justifyContent: "flex-start" }} onClick={() => choose(opt)}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <Callout kind={correct ? "success" : "warn"} title={correct ? "Correct identification!" : "Not quite right"}>
                  You identified: <strong>{result}</strong>.
                  {!correct && <span> The correct answer was: <strong>{currentCreature.answer}</strong>. Go back and try the key again.</span>}
                </Callout>
                <button className="btn btn-accent" style={{ marginTop: 12 }} onClick={pickCreature}>Try another</button>
              </div>
            )}
          </>
        )}
      </div>
    </Interactive>
  );
}

/* Australian adaptations explorer */
function AdaptationsExplorer() {
  const organisms = [
    {
      name: "Thorny devil",
      habitat: "Desert",
      adaptations: [
        { type: "Structural", desc: "Microscopic channels between scales collect dew and channel it to the mouth." },
        { type: "Behavioural", desc: "Lies still at dawn to collect moisture from mist before daytime heat arrives." },
      ],
    },
    {
      name: "Bilby",
      habitat: "Arid scrubland",
      adaptations: [
        { type: "Structural", desc: "Large ears filled with blood vessels radiate excess body heat." },
        { type: "Behavioural", desc: "Nocturnal: shelters in burrows during the day to avoid 50+ degree temperatures." },
      ],
    },
    {
      name: "Banksia",
      habitat: "Fire-prone woodland",
      adaptations: [
        { type: "Physiological", desc: "Serotinous cones stay sealed until fire heat melts a resin seal, then release seeds." },
        { type: "Structural", desc: "Thick, corky bark insulates the living tissue beneath from fire damage." },
      ],
    },
    {
      name: "Platypus",
      habitat: "Freshwater streams",
      adaptations: [
        { type: "Structural", desc: "Bill contains about 40,000 electroreceptors that detect electric fields of prey in murky water." },
        { type: "Physiological", desc: "Red blood cells packed with haemoglobin allow breath-holding for up to 140 seconds." },
      ],
    },
  ];
  const [selected, setSelected] = useState(0);
  const org = organisms[selected];
  const typeColour = { Structural: "var(--accent-deep)", Physiological: "#7c3aed", Behavioural: "#d97706" };
  return (
    <Interactive title="Australian adaptations explorer" subtitle="Choose an organism to see how it survives its habitat." takeaway="Adaptations can be structural, physiological, or behavioural, and each feature of an organism directly reflects the challenges of its particular habitat.">
      <div className="seg-toggle" style={{ marginBottom: 16 }}>
        {organisms.map((o, i) => (
          <button key={i} className={"itab" + (selected === i ? " active" : "")} onClick={() => setSelected(i)}>{o.name}</button>
        ))}
      </div>
      <div style={{ background: "var(--accent-soft)", borderRadius: 12, padding: "16px 18px", marginBottom: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{org.name}</div>
        <div className="muted" style={{ fontSize: 13 }}>Habitat: {org.habitat}</div>
      </div>
      {org.adaptations.map((a, i) => (
        <div key={i} className="card" style={{ marginBottom: 10, borderLeft: "4px solid " + (typeColour[a.type] || "var(--accent-deep)"), padding: "12px 16px" }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: typeColour[a.type] || "var(--accent-deep)" }}>{a.type}</span>
          <p style={{ margin: "4px 0 0" }}>{a.desc}</p>
        </div>
      ))}
    </Interactive>
  );
}

/* ============================================================
   SECTION 3.2 INTERACTIVES
   ============================================================ */

/* Clickable plant cell diagram */
function PlantCellDiagram() {
  const [active, setActive] = useState(null);
  const organelles = [
    { id: "wall", label: "Cell wall", cx: 240, cy: 148, desc: "Made of cellulose. Provides rigid structural support and prevents the cell from bursting. ONLY in plant cells." },
    { id: "membrane", label: "Cell membrane", cx: 240, cy: 164, desc: "A thin, flexible layer that controls what enters and leaves the cell. Found in ALL cells." },
    { id: "nucleus", label: "Nucleus", cx: 148, cy: 210, desc: "The control centre of the cell. Contains DNA, which carries instructions for all cell activities." },
    { id: "vacuole", label: "Large vacuole", cx: 240, cy: 240, desc: "Stores water and waste. Creates turgor pressure to keep the cell firm and the plant upright." },
    { id: "chloroplast", label: "Chloroplast", cx: 320, cy: 195, desc: "The site of photosynthesis. Contains chlorophyll (green pigment) that absorbs light energy. ONLY in plant cells." },
    { id: "mitochondria", label: "Mitochondria", cx: 160, cy: 280, desc: "The powerhouse. Carries out aerobic respiration to release energy (ATP) from glucose." },
    { id: "cytoplasm", label: "Cytoplasm", cx: 310, cy: 290, desc: "Gel-like fluid filling the cell. The medium for most chemical reactions. Suspends all organelles." },
  ];
  const info = active ? organelles.find(o => o.id === active) : null;
  return (
    <Interactive title="Clickable plant cell" subtitle="Tap any labelled part to learn what it does." takeaway="Plant cells have three structures not found in animal cells: a cellulose cell wall, chloroplasts for photosynthesis, and a large central vacuole for water storage and support.">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <svg viewBox="0 0 480 380" width="100%" style={{ maxWidth: 480, display: "block", margin: "0 auto" }}>
          {/* Cell wall outer */}
          <rect x="60" y="60" width="360" height="260" rx="22" fill="none" stroke="#86efac" strokeWidth="10"/>
          {/* Cell membrane inner */}
          <rect x="72" y="72" width="336" height="236" rx="16" fill="#d1fae5" stroke="#34d399" strokeWidth="3"/>
          {/* Vacuole */}
          <ellipse cx="238" cy="220" rx="90" ry="75" fill="#a7f3d0" stroke="#10b981" strokeWidth="2"/>
          <text x="238" y="224" textAnchor="middle" fontSize="11" fill="#065f46" fontWeight="600">Vacuole</text>
          {/* Nucleus */}
          <ellipse cx="148" cy="168" rx="38" ry="30" fill="#6ee7b7" stroke="#059669" strokeWidth="2"/>
          <text x="148" y="172" textAnchor="middle" fontSize="11" fill="#064e3b" fontWeight="600">Nucleus</text>
          {/* Chloroplasts */}
          {[[300,140],[340,170],[305,200]].map(([cx,cy],i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="20" ry="11" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5"/>
          ))}
          <text x="336" y="142" fontSize="10" fill="#14532d" fontWeight="600">Chloroplasts</text>
          {/* Mitochondria */}
          {[[130,260],[160,270],[190,258]].map(([cx,cy],i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="16" ry="9" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
          ))}
          <text x="120" y="292" fontSize="10" fill="#92400e" fontWeight="600">Mitochondria</text>
          {/* Clickable hotspots */}
          {organelles.map(o => (
            <circle
              key={o.id}
              cx={o.cx} cy={o.cy} r={18}
              fill={active === o.id ? "rgba(5,150,105,0.25)" : "rgba(5,150,105,0.08)"}
              stroke={active === o.id ? "#059669" : "#34d399"}
              strokeWidth={active === o.id ? 2.5 : 1.5}
              style={{ cursor: "pointer" }}
              onClick={() => setActive(active === o.id ? null : o.id)}
            />
          ))}
          <text x="240" y="350" textAnchor="middle" fontSize="12" fill="var(--muted)" fontWeight="500">Tap a hotspot to learn more</text>
        </svg>
        {info && (
          <div className="card" style={{ background: "var(--accent-soft)", padding: "14px 18px", borderRadius: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{info.label}</div>
            <p style={{ margin: 0 }}>{info.desc}</p>
          </div>
        )}
        {!info && (
          <p className="muted" style={{ textAlign: "center", fontSize: 13 }}>Click any hotspot on the diagram above.</p>
        )}
      </div>
    </Interactive>
  );
}

/* Clickable animal cell diagram */
function AnimalCellDiagram() {
  const [active, setActive] = useState(null);
  const organelles = [
    { id: "membrane", label: "Cell membrane", cx: 240, cy: 100, desc: "Controls entry and exit of substances. In animal cells this is the outermost layer (no cell wall outside it)." },
    { id: "nucleus", label: "Nucleus", cx: 240, cy: 185, desc: "Contains DNA and acts as the control centre. Usually sits near the centre of an animal cell." },
    { id: "cytoplasm", label: "Cytoplasm", cx: 140, cy: 240, desc: "Fills most of the cell. The site of many reactions. Organelles float in cytoplasm." },
    { id: "mitochondria", label: "Mitochondria", cx: 330, cy: 215, desc: "Releases energy via aerobic respiration. Animal cells can have thousands of mitochondria." },
    { id: "ribosome", label: "Ribosomes", cx: 160, cy: 155, desc: "Tiny structures that make proteins using instructions from DNA. Found throughout the cytoplasm." },
  ];
  const info = active ? organelles.find(o => o.id === active) : null;
  return (
    <Interactive title="Clickable animal cell" subtitle="Tap any part to discover its function. Notice what is missing compared to a plant cell." takeaway="Animal cells share a membrane, cytoplasm, nucleus, and mitochondria with plant cells but lack a cell wall, chloroplasts, and a large central vacuole.">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <svg viewBox="0 0 480 340" width="100%" style={{ maxWidth: 480, display: "block", margin: "0 auto" }}>
          {/* Cell membrane (irregular shape) */}
          <ellipse cx="240" cy="185" rx="155" ry="130" fill="#fef3c7" stroke="#f59e0b" strokeWidth="4"/>
          {/* Nucleus */}
          <ellipse cx="240" cy="185" rx="48" ry="40" fill="#fde68a" stroke="#d97706" strokeWidth="2.5"/>
          <text x="240" y="189" textAnchor="middle" fontSize="12" fill="#78350f" fontWeight="700">Nucleus</text>
          {/* Mitochondria */}
          {[[320,155],[340,195],[315,235]].map(([cx,cy],i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="19" ry="10" fill="#fcd34d" stroke="#b45309" strokeWidth="1.5"/>
          ))}
          <text x="345" y="152" fontSize="10" fill="#78350f" fontWeight="600">Mitochondria</text>
          {/* Ribosomes (dots) */}
          {[[155,155],[175,140],[195,160],[140,175],[165,195]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r={4} fill="#f97316"/>
          ))}
          <text x="120" y="138" fontSize="10" fill="#9a3412" fontWeight="600">Ribosomes</text>
          {/* Cytoplasm label */}
          <text x="150" y="260" fontSize="11" fill="#92400e">Cytoplasm</text>
          {/* Hotspots */}
          {organelles.map(o => (
            <circle
              key={o.id}
              cx={o.cx} cy={o.cy} r={18}
              fill={active === o.id ? "rgba(217,119,6,0.25)" : "rgba(217,119,6,0.08)"}
              stroke={active === o.id ? "#d97706" : "#f59e0b"}
              strokeWidth={active === o.id ? 2.5 : 1.5}
              style={{ cursor: "pointer" }}
              onClick={() => setActive(active === o.id ? null : o.id)}
            />
          ))}
          <text x="240" y="328" textAnchor="middle" fontSize="12" fill="var(--muted)">Tap a hotspot</text>
        </svg>
        {info && (
          <div className="card" style={{ background: "#fef9c3", padding: "14px 18px", borderRadius: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{info.label}</div>
            <p style={{ margin: 0 }}>{info.desc}</p>
          </div>
        )}
        {!info && (
          <p className="muted" style={{ textAlign: "center", fontSize: 13 }}>Click any hotspot on the diagram above.</p>
        )}
      </div>
    </Interactive>
  );
}

/* Virtual microscope zoom sim */
function VirtualMicroscope() {
  const [cellType, setCellType] = useState("plant");
  const [magnification, setMagnification] = useState(40);
  const cells = {
    plant: {
      label: "Onion epidermal cell",
      colour: "#bbf7d0",
      borderCol: "#16a34a",
      wallCol: "#4ade80",
      hasWall: true,
      hasChloroplast: false,
      hasVacuole: true,
      desc: "Rectangular cells with visible cell walls. No chloroplasts (non-green tissue). Large vacuoles visible at high power.",
    },
    animal: {
      label: "Human cheek cell",
      colour: "#fef3c7",
      borderCol: "#f59e0b",
      hasWall: false,
      hasChloroplast: false,
      hasVacuole: false,
      desc: "Irregular/oval cells with no cell wall. Nucleus stained dark. No large vacuole.",
    },
    bacteria: {
      label: "Bacteria (rod-shaped)",
      colour: "#e0e7ff",
      borderCol: "#6366f1",
      hasWall: true,
      hasChloroplast: false,
      hasVacuole: false,
      tiny: true,
      desc: "Very tiny cells. No visible nucleus (prokaryotic). Simple rod shapes visible at highest magnification.",
    },
    yeast: {
      label: "Yeast cell",
      colour: "#fae8ff",
      borderCol: "#a855f7",
      hasWall: true,
      hasChloroplast: false,
      hasVacuole: false,
      desc: "Oval cells with a cell wall. Nucleus visible after staining. May show budding (small daughter cell attached).",
    },
  };
  const cell = cells[cellType];
  const scale = magnification / 400;
  const cellW = cell.tiny ? 18 : 60;
  const cellH = cell.tiny ? 10 : (cellType === "plant" ? 46 : 50);
  const cols = cell.tiny ? 16 : 5;
  const rows = cell.tiny ? 12 : 3;
  const padding = cell.tiny ? 8 : 18;
  const totalW = cols * (cellW + padding);
  const totalH = rows * (cellH + padding);
  const gridX = 240 - totalW / 2;
  const gridY = 190 - totalH / 2;

  return (
    <Interactive title="Virtual microscope" subtitle="Choose a cell type and adjust the magnification to explore what you would see." takeaway="Increasing magnification reveals more detail inside cells, and each cell type (plant, animal, bacterium, yeast) has distinctive features that let you identify it under a microscope.">
      <div className="ctrl-row" style={{ marginBottom: 12 }}>
        {Object.keys(cells).map(k => (
          <button key={k} className={"btn " + (cellType === k ? "btn-accent" : "btn-ghost")} onClick={() => setCellType(k)}>
            {cells[k].label}
          </button>
        ))}
      </div>
      <Slider label="Magnification" min={40} max={400} step={40} value={magnification} onChange={setMagnification} unit="x"/>
      <svg viewBox="0 0 480 380" width="100%" style={{ maxWidth: 480, display: "block", margin: "0 auto", borderRadius: 12, background: "#e8f5e9", border: "2px solid #a7f3d0" }}>
        {/* Microscope field of view circle */}
        <defs>
          <clipPath id="fov">
            <circle cx="240" cy="190" r="170"/>
          </clipPath>
          <radialGradient id="vignette">
            <stop offset="75%" stopColor="transparent"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.45)"/>
          </radialGradient>
        </defs>
        <rect width="480" height="380" fill="#1a1a2e"/>
        <g clipPath="url(#fov)">
          <rect x="70" y="20" width="340" height="340" fill="#f8fffe"/>
          {/* Draw cells */}
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: cols }).map((_, col) => {
              const x = gridX + col * (cellW + padding);
              const y = gridY + row * (cellH + padding);
              const rx = cellType === "plant" ? 3 : cellType === "bacteria" ? 3 : 14;
              return (
                <g key={`${row}-${col}`}>
                  {cell.hasWall && (
                    <rect x={x - 2} y={y - 2} width={cellW + 4} height={cellH + 4} rx={rx + 2} fill={cell.wallCol || cell.borderCol} opacity={0.8}/>
                  )}
                  <rect x={x} y={y} width={cellW} height={cellH} rx={rx} fill={cell.colour} stroke={cell.borderCol} strokeWidth={1.5} opacity={0.95}/>
                  {/* Nucleus */}
                  {!cell.tiny && magnification >= 100 && (
                    <ellipse cx={x + cellW / 2} cy={y + cellH / 2} rx={cellW * 0.18} ry={cellH * 0.20} fill={cell.borderCol} opacity={0.55}/>
                  )}
                  {/* Vacuole in plant */}
                  {cell.hasVacuole && magnification >= 200 && (
                    <rect x={x + cellW * 0.25} y={y + cellH * 0.28} width={cellW * 0.5} height={cellH * 0.44} rx={4} fill="white" opacity={0.65}/>
                  )}
                  {/* Budding yeast */}
                  {cellType === "yeast" && col % 3 === 0 && magnification >= 200 && (
                    <ellipse cx={x + cellW + 6} cy={y + cellH * 0.3} rx={9} ry={7} fill={cell.colour} stroke={cell.borderCol} strokeWidth={1.2}/>
                  )}
                </g>
              );
            })
          )}
        </g>
        {/* Vignette */}
        <circle cx="240" cy="190" r="170" fill="url(#vignette)"/>
        {/* Lens edge */}
        <circle cx="240" cy="190" r="170" fill="none" stroke="#555" strokeWidth="8"/>
        <text x="240" y="378" textAnchor="middle" fontSize="13" fill="#aaa">{magnification}x total magnification</text>
      </svg>
      <div className="card" style={{ marginTop: 12, padding: "12px 16px", background: "var(--accent-soft)" }}>
        <strong>{cell.label}</strong>: {cell.desc}
      </div>
    </Interactive>
  );
}

/* Photosynthesis / Respiration equation builder */
function EnergyEquationSim() {
  const [mode, setMode] = useState("resp");
  const resp = {
    title: "Cellular respiration (in mitochondria)",
    reactants: ["Glucose", "Oxygen"],
    products: ["Carbon dioxide", "Water", "Energy (ATP)"],
    colour: "#f59e0b",
    organelle: "Mitochondria",
    where: "All living eukaryotic cells",
    when: "Continuously, day and night",
  };
  const photo = {
    title: "Photosynthesis (in chloroplasts)",
    reactants: ["Carbon dioxide", "Water", "Light energy"],
    products: ["Glucose", "Oxygen"],
    colour: "#22c55e",
    organelle: "Chloroplasts",
    where: "Plant cells and algae only",
    when: "Only when light is available",
  };
  const eq = mode === "resp" ? resp : photo;
  return (
    <Interactive title="Photosynthesis vs respiration" subtitle="Switch between the two processes to compare organelle, reactants, and products." takeaway="Photosynthesis and cellular respiration are essentially opposite reactions: photosynthesis builds glucose from carbon dioxide and water using light, while respiration breaks glucose down to release energy as ATP.">
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 16 }}>
        <button className={"btn " + (mode === "resp" ? "btn-accent" : "btn-ghost")} onClick={() => setMode("resp")}>Respiration</button>
        <button className={"btn " + (mode === "photo" ? "btn-accent" : "btn-ghost")} onClick={() => setMode("photo")}>Photosynthesis</button>
      </div>
      <div style={{ fontWeight: 700, fontSize: 15, textAlign: "center", marginBottom: 14, color: eq.colour }}>{eq.title}</div>
      <svg viewBox="0 0 480 90" width="100%" style={{ maxWidth: 480, display: "block", margin: "0 auto 12px" }}>
        {eq.reactants.map((r, i) => (
          <g key={r} transform={`translate(${i * (eq.reactants.length > 2 ? 110 : 140) + 20}, 10)`}>
            <rect width="95" height="44" rx="10" fill={eq.colour + "33"} stroke={eq.colour} strokeWidth="2"/>
            <text x="47" y="27" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{r}</text>
          </g>
        ))}
        <text x="240" y="38" textAnchor="middle" fontSize="24" fill="var(--ink)">&#x2192;</text>
        {eq.products.map((p, i) => (
          <g key={p} transform={`translate(${260 + i * (eq.products.length > 2 ? 73 : 100)}, 10)`}>
            <rect width="68" height="44" rx="10" fill={eq.colour + "22"} stroke={eq.colour} strokeWidth="1.5}"/>
            <text x="34" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)">{p}</text>
          </g>
        ))}
      </svg>
      <div className="grid-3" style={{ gap: 10 }}>
        <div className="card" style={{ padding: "10px 12px", textAlign: "center" }}>
          <div className="muted" style={{ fontSize: 11 }}>Organelle</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{eq.organelle}</div>
        </div>
        <div className="card" style={{ padding: "10px 12px", textAlign: "center" }}>
          <div className="muted" style={{ fontSize: 11 }}>Where</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{eq.where}</div>
        </div>
        <div className="card" style={{ padding: "10px 12px", textAlign: "center" }}>
          <div className="muted" style={{ fontSize: 11 }}>When</div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{eq.when}</div>
        </div>
      </div>
    </Interactive>
  );
}

/* Specialised cells matcher */
function SpecialisedCellMatcher() {
  return (
    <Interactive title="Match specialised cells to their function" subtitle="Click each cell to place it in the right bucket." takeaway="In multicellular organisms, each specialised cell type has a unique structure that suits it perfectly for its one job, from carrying oxygen to transmitting nerve signals.">
      <MatchBuckets
        items={[
          { id: "a", label: "Red blood cell", bucket: "transport" },
          { id: "b", label: "Neuron", bucket: "signal" },
          { id: "c", label: "Muscle cell", bucket: "movement" },
          { id: "d", label: "Root hair cell", bucket: "absorption" },
          { id: "e", label: "Guard cell", bucket: "regulation" },
          { id: "f", label: "Sperm cell", bucket: "reproduction" },
          { id: "g", label: "Palisade cell", bucket: "photosynthesis" },
        ]}
        buckets={[
          { id: "transport", label: "Transport oxygen" },
          { id: "signal", label: "Send signals" },
          { id: "movement", label: "Movement" },
          { id: "absorption", label: "Water absorption" },
          { id: "regulation", label: "Regulate stomata" },
          { id: "reproduction", label: "Reproduction" },
          { id: "photosynthesis", label: "Photosynthesis" },
        ]}
      />
    </Interactive>
  );
}

/* Tissues to organs organiser */
function TissueOrganSVG() {
  const levels = ["Cell", "Tissue", "Organ", "Organ system", "Organism"];
  const examples = ["Palisade cell", "Mesophyll tissue", "Leaf", "Shoot system", "Eucalyptus tree"];
  const colours = ["#bbf7d0", "#6ee7b7", "#34d399", "#10b981", "#059669"];
  return (
    <Figure num="1" caption="Organisation of a multicellular organism: from a single cell up to the whole organism.">
      <svg viewBox="0 0 560 100" width="100%" style={{ maxWidth: 560 }}>
        {levels.map((l, i) => (
          <g key={l} transform={`translate(${i * 112 + 6}, 8)`}>
            <rect width="100" height="56" rx="10" fill={colours[i]} stroke="#065f46" strokeWidth="1.5"/>
            <text x="50" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#064e3b">{l}</text>
            <text x="50" y="42" textAnchor="middle" fontSize="10" fill="#065f46">{examples[i]}</text>
            {i < levels.length - 1 && (
              <text x="108" y="34" textAnchor="middle" fontSize="18" fill="#059669">›</text>
            )}
          </g>
        ))}
      </svg>
    </Figure>
  );
}

/* ============================================================
   SECTION 3.3 INTERACTIVES
   ============================================================ */

/* Platypus classification hierarchy */
function PlatypusClassificationSVG() {
  const ranks = [
    { rank: "Kingdom", value: "Animalia", colour: "#bbf7d0" },
    { rank: "Phylum", value: "Chordata", colour: "#6ee7b7" },
    { rank: "Class", value: "Mammalia", colour: "#34d399" },
    { rank: "Order", value: "Monotremata", colour: "#10b981" },
    { rank: "Family", value: "Ornithorhynchidae", colour: "#059669" },
    { rank: "Genus", value: "Ornithorhynchus", colour: "#047857" },
    { rank: "Species", value: "anatinus", colour: "#065f46" },
  ];
  return (
    <Figure num="2" caption="The full seven-rank classification of the platypus (Ornithorhynchus anatinus).">
      <svg viewBox="0 0 440 280" width="100%" style={{ maxWidth: 440 }}>
        {ranks.map((r, i) => {
          const w = 380 - i * 44;
          const x = (440 - w) / 2;
          const y = i * 36 + 8;
          return (
            <g key={r.rank}>
              <rect x={x} y={y} width={w} height="30" rx="8" fill={r.colour}/>
              <text x="50" y={y + 20} fontSize="11" fontWeight="700" fill="#064e3b">{r.rank}</text>
              <text x={440 - 12} y={y + 20} textAnchor="end" fontSize="11" fill="#064e3b" fontStyle={i >= 5 ? "italic" : "normal"}>
                {i >= 5 ? r.value : r.value}
              </text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

/* Research organism classification builder */
function ClassificationBuilder() {
  const presets = {
    platypus: { kingdom: "Animalia", phylum: "Chordata", cls: "Mammalia", order: "Monotremata", family: "Ornithorhynchidae", genus: "Ornithorhynchus", species: "anatinus" },
    cat: { kingdom: "Animalia", phylum: "Chordata", cls: "Mammalia", order: "Carnivora", family: "Felidae", genus: "Felis", species: "catus" },
    human: { kingdom: "Animalia", phylum: "Chordata", cls: "Mammalia", order: "Primates", family: "Hominidae", genus: "Homo", species: "sapiens" },
  };
  const [preset, setPreset] = useState("platypus");
  const p = presets[preset];
  const ranks = [
    ["Kingdom", p.kingdom],
    ["Phylum", p.phylum],
    ["Class", p.cls],
    ["Order", p.order],
    ["Family", p.family],
    ["Genus", p.genus],
    ["Species", p.species],
  ];
  const widths = [380, 340, 300, 260, 220, 180, 140];
  return (
    <Interactive title="Classification hierarchy explorer" subtitle="Switch organism to compare their ranks. Notice where they share levels and where they split apart." takeaway="The seven-rank classification hierarchy goes from the broadest group (Kingdom) down to the most specific (Species), and organisms that share lower ranks are more closely related.">
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 16 }}>
        {Object.keys(presets).map(k => (
          <button key={k} className={"btn " + (preset === k ? "btn-accent" : "btn-ghost")} onClick={() => setPreset(k)}>
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 420 260" width="100%" style={{ maxWidth: 420, display: "block", margin: "0 auto" }}>
        {ranks.map(([rank, value], i) => {
          const w = widths[i];
          const x = (420 - w) / 2;
          const y = i * 34 + 4;
          const alpha = 1 - i * 0.08;
          return (
            <g key={rank}>
              <rect x={x} y={y} width={w} height="28" rx="7" fill={"rgba(16,185,129," + (0.18 + (7 - i) * 0.08) + ")"} stroke="#10b981" strokeWidth="1.2"/>
              <text x={x + 8} y={y + 19} fontSize="11" fontWeight="700" fill="#064e3b">{rank}</text>
              <text x={x + w - 8} y={y + 19} textAnchor="end" fontSize="11" fill="#064e3b" fontStyle={i >= 5 ? "italic" : "normal"}>{value}</text>
            </g>
          );
        })}
      </svg>
      <p className="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 8 }}>
        Mnemonic: Kings Play Chess On Fine Green Silk
      </p>
    </Interactive>
  );
}

/* ============================================================
   SECTION COMPONENTS
   ============================================================ */

function Section31({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">3.1 Classification of Living Things</div>
        <h1>Grouping the living world</h1>
        <p className="lead">From microscopic bacteria to giant blue whales, scientists use a clever system to sort, name, and study every living thing on Earth.</p>
      </div>

      <Figure src="img/classify.png" caption="Living things can be sorted into groups by the features they share." />
      <DotPoint id="3.1.1" title="Characteristics of living things" progress={progress} setProgress={setProgress}>
        <p>How do you know if something is alive? Scientists use a set of seven key characteristics. If something has all seven, it is living. The easiest way to remember them is the mnemonic <Term def="Movement, Reproduction, Sensitivity, Growth, Respiration, Excretion, Nutrition">MRSGREN</Term>.</p>
        <p>Think about a fire: it moves, it uses fuel, and it grows. But it cannot reproduce on its own, it has no sensitivity to changes around it, and it does not grow in the biological sense. Fire is not alive. A tricky case is a <Term def="A tiny particle of genetic material surrounded by a protein coat; can only reproduce inside a living host cell">virus</Term>: it can reproduce, but only by hijacking a living cell, and it has no <Term def="All of the chemical reactions that keep a cell alive, including releasing energy from food">metabolism</Term> of its own. Most scientists say viruses are not truly alive.</p>
        <Callout kind="key" title="MRSGREN">
          Movement, Reproduction, Sensitivity, Growth, Respiration, Excretion, Nutrition. All seven must be present for something to be classified as alive.
        </Callout>
        <MrsgrenFlashcards/>
        <LivingThingsSorter/>
        <QGroup title="Check yourself">
          <MCQ num={1} question="Which characteristic of living things does a plant show when it grows toward a light source?" options={["Nutrition", "Sensitivity", "Excretion", "Reproduction"]} correct={1} explain="Growing toward light is a response to a stimulus (light), so it shows sensitivity. It also involves movement, but sensitivity is the best match here."/>
          <WrittenQ num={2} question="A student says a car is alive because it moves and uses fuel. Which three MRSGREN characteristics does a car clearly lack? Explain each." model="A car cannot reproduce, it does not grow in the biological sense, and it has no sensitivity to stimuli on its own. It also does not carry out cellular respiration, excretion of metabolic waste, or obtain nutrition for growth."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.1.2" title="Why classification matters" progress={progress} setProgress={setProgress}>
        <p>There are an estimated 8.7 million species on Earth, and scientists discover new ones every year. Without a <Term def="A system for grouping organisms based on shared characteristics and evolutionary relationships">classification</Term> system, communicating about all these organisms would be chaotic. Imagine if each country used a different name for the same animal!</p>
        <p>Classification helps in medicine (identifying which organism causes a disease), conservation (tracking endangered species), agriculture (understanding pest relationships), and ecology (mapping food webs). When scientists find a new antibiotic-producing fungus, they use classification to find its relatives and predict what useful chemicals it might make.</p>
        <Callout kind="fact" title="Did you know?">
          When DNA analysis became possible in the 1990s, many organisms were completely reclassified. Whales turned out to be more closely related to hippos than to other hoofed animals.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={3} question="A new fungus is found in a Queensland rainforest. What is the first benefit of classifying it?" options={["Predicting its properties by comparing it to known relatives", "Giving it an English common name", "Deciding whether to eat it", "Measuring its size"]} correct={0} explain="By placing it in a group with known relatives, scientists can immediately predict its likely chemicals, behaviour, and biology. Classification lets you predict first, investigate second."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.1.3" title="Binomial naming and the classification hierarchy" progress={progress} setProgress={setProgress}>
        <p>In 1758, Swedish naturalist <Term def="The scientist who invented the binomial naming system in 1758">Carl Linnaeus</Term> gave every species a two-part Latin name, called a <Term def="The scientific naming system giving every species a unique two-part name (genus + species)">binomial name</Term>. The first part is the genus (always capitalised), and the second part is the species (always lowercase). Both parts are written in italics or underlined when handwritten. So the domestic cat is written <em>Felis catus</em> and the grey wolf is <em>Canis lupus</em>.</p>
        <p>Organisms are grouped in a hierarchy of seven ranks from broadest to narrowest: <Term def="The broadest rank in classification">Kingdom</Term>, <Term def="Second rank; groups animals with the same body plan">Phylum</Term>, Class, Order, Family, <Term def="The second-to-last rank; organisms in the same genus are closely related">Genus</Term>, and <Term def="The most specific rank; members of the same species can interbreed">Species</Term>. The mnemonic to remember the order is: Kings Play Chess On Fine Green Silk. As you go down the hierarchy, organisms share more and more features.</p>
        <Callout kind="tip" title="Writing binomial names correctly">
          Always capitalise the genus, always lowercase the species, always italicise (or underline if handwriting). Example: <em>Homo sapiens</em>, not "homo Sapiens" or "Homo Sapiens".
        </Callout>
        <ClassificationBuilder/>
        <KingdomSorter/>
        <QGroup title="Check yourself">
          <MCQ num={4} question="A student writes the wolf's scientific name as canis lupus (not italicised). How many errors has the student made?" options={["One error (should be italicised)", "Two errors (Canis should be capitalised, and both words should be italicised)", "Three errors", "No errors"]} correct={1} explain="There are two errors: (1) the genus name Canis must start with a capital letter, and (2) the whole name must be italicised when typed (or underlined when handwritten)."/>
          <WrittenQ num={5} question="Two animals share the same genus but different species names. What can you say about how closely related they are compared with two animals that share only the same family?" model="Two organisms in the same genus are more closely related: they share a more recent common ancestor and have more features in common. Two organisms that share only the same family differ at the genus level too, meaning they have diverged further in evolutionary history."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.1.4" title="Comparing structural features across organism groups" progress={progress} setProgress={setProgress}>
        <p>Classification is based on what scientists can observe. By comparing <Term def="Physical features of an organism's body used to compare and classify it">structural features</Term> such as number of legs, body segments, skin type, and reproductive structures, you can work out which organisms are closely related. Features shared because of a common ancestor are called <Term def="Structures in different species that share a common evolutionary origin, even if they look different today">homologous structures</Term>. For example, your arm, a bat's wing, and a whale's flipper all share the same basic bone arrangement.</p>
        <p>Among the <Term def="The animal phylum with an exoskeleton, jointed limbs, and segmented body">arthropods</Term>, you can identify four groups by counting legs and segments: insects (6 legs, 3 body regions), arachnids (8 legs, 2 body regions, no antennae), crustaceans (10 or more legs, 2 pairs of antennae), and myriapods (many legs, one pair of antennae).</p>
        <Callout kind="key" title="Arthropod ID shortcut">
          6 legs = insect. 8 legs, no antennae = arachnid. 10+ legs, 2 pairs of antennae = crustacean. Many legs per segment = myriapod.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={6} question="You find a bush invertebrate with 8 legs and no antennae. Which class does it belong to?" options={["Insecta", "Arachnida", "Crustacean", "Myriapoda"]} correct={1} explain="8 legs and no antennae are the defining features of Arachnida (spiders, scorpions, mites, ticks)."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.1.5" title="Adaptations in Australian habitats" progress={progress} setProgress={setProgress}>
        <p>Australia has some of the most unique habitats on Earth: arid deserts, tropical rainforests, fire-prone woodlands, and kelp forests. The organisms that live there have evolved <Term def="An inherited feature or behaviour that improves an organism's chance of surviving and reproducing in its environment">adaptations</Term> to suit their conditions. There are three types: <Term def="A physical body feature that aids survival, such as a thick coat or a long beak">structural</Term>, <Term def="An internal body process that aids survival, such as producing concentrated urine">physiological</Term>, and <Term def="A way of acting that aids survival, such as being nocturnal">behavioural</Term> adaptations.</p>
        <p>Australia has been isolated from other continents for about 45 million years. This has allowed a huge number of <Term def="Species found only in one place and nowhere else in the world">endemic species</Term> to evolve, including most of our marsupials. Many of these species have fascinating adaptations to Australia's harsh conditions.</p>
        <AdaptationsExplorer/>
        <Callout kind="fact" title="Banksia and fire">
          Some Banksia cones stay sealed for years. They only open after a bushfire heats them enough to melt the resin seal. This means seeds are released right after a fire, when nutrients from ash are available and competition from other plants is low.
        </Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={7} question="Explain the difference between a structural adaptation and a behavioural adaptation. Give one example of each from an Australian desert animal." model="A structural adaptation is a physical body feature, for example the bilby's large ears filled with blood vessels that radiate excess heat. A behavioural adaptation is a way of acting, for example the bilby is nocturnal and shelters in burrows during the hottest part of the day to avoid extreme temperatures."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.1.6" title="Dichotomous keys" progress={progress} setProgress={setProgress}>
        <p>A <Term def="A tool for identifying unknown organisms by working through a series of paired statements, choosing one option at each step">dichotomous key</Term> works by offering you two choices at each step. You pick the one that matches your organism, and it leads you to the next step until you reach an identification. The word "dichotomous" comes from Greek meaning "divided into two". Keys can be written as numbered couplets or drawn as branching tree diagrams.</p>
        <p>Keys only work if your observations are careful and accurate. Making a wrong choice at step 1 will lead you to a completely wrong answer at the end. Always double-check your observation before choosing. Common features used in Australian invertebrate keys include number of legs, presence of wings, number of antennae, body segments, and type of mouthparts.</p>
        <DichotomousKeyGame/>
        <Callout kind="warn" title="Accuracy matters">
          One wrong observation ruins the whole key result. Always count carefully. If you get an odd result, go back to step 1 and start again.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={8} question="A student uses a dichotomous key and gets the result 'centipede', but the organism actually has two pairs of legs per body segment. What went wrong and what is the correct answer?" options={["The student miscounted body segments; it is actually a millipede", "The student miscounted leg pairs per segment; the correct answer is millipede (Diplopoda)", "The student used the wrong key; it is actually an insect", "No error; centipedes can have two pairs per segment"]} correct={1} explain="Centipedes have one pair of legs per segment; millipedes have two pairs. The error was misidentifying how many leg pairs were present. The correct identification is millipede (Class Diplopoda)."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.1.7" title="Aboriginal and Torres Strait Islander classification systems" progress={progress} setProgress={setProgress}>
        <p>For at least 60,000 years, <Term def="The knowledge, practices and beliefs about the natural environment developed by Aboriginal and Torres Strait Islander peoples over many thousands of years">Aboriginal and Torres Strait Islander peoples</Term> have developed detailed systems for organising the living world. Rather than focusing purely on physical similarity, these systems group organisms by their <em>uses</em> (food, medicine, tools, ceremony), their <em>form</em>, and their <em>function</em> in the ecosystem and in cultural life. This knowledge is closely tied to Country and to the spiritual relationships between people and nature.</p>
        <p>Plant and animal names in many Indigenous languages often encode ecological information: a name might reflect when a plant flowers, what it can be used for, or which habitat it grows in. This knowledge, called <Term def="Detailed knowledge of the environment built up over thousands of years and passed on through oral tradition and practice">Traditional Ecological Knowledge (TEK)</Term>, is now recognised by scientists as a valuable complement to Western science. Modern conservation managers increasingly work with Aboriginal communities to incorporate TEK into land management, including traditional fire-stick farming practices that maintain biodiversity.</p>
        <Callout kind="key" title="Two valid systems">
          The Linnaean system groups organisms by physical features and evolutionary relationships, and works globally. Indigenous classification systems group organisms by use, form, function, and relationship to Country, and encode detailed local ecological knowledge. Both are valid and useful ways of organising knowledge about the living world.
        </Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={9} question="Describe one way that Traditional Ecological Knowledge could help modern conservation scientists protect a threatened Australian species." model="Aboriginal and Torres Strait Islander communities have observed species over many generations and can identify long-term changes in population size, behaviour, or habitat that short-term scientific studies would miss. For example, traditional fire management knowledge has helped conservation managers restore habitat for fire-adapted species by reintroducing controlled burning practices."/>
        </QGroup>
      </DotPoint>
    </>
  );
}

function Section32({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">3.2 Cells</div>
        <h1>The building blocks of life</h1>
        <p className="lead">Every living thing, from a single bacterium to your own body, is built from cells. Explore what is inside them and how they work.</p>
      </div>

      <Figure src="img/cell.png" caption="A plant cell and an animal cell compared." />
      <DotPoint id="3.2.1" title="Cell theory" progress={progress} setProgress={setProgress}>
        <p><Term def="The three foundational statements of biology: all living things are made of cells; the cell is the basic unit of life; all cells come from pre-existing cells">Cell theory</Term> is one of the most important ideas in all of biology. It has three parts: (1) all living things are made of one or more cells, (2) the cell is the basic structural and functional unit of life, and (3) all cells come from pre-existing cells. That third statement was a big deal because it overturned the old idea of <Term def="The mistaken idea that life could arise spontaneously from non-living matter">spontaneous generation</Term>, which claimed that maggots could appear from nothing in rotting meat.</p>
        <p>Cell theory was built up slowly over about 200 years as microscopes improved. In 1665, <Term def="English scientist who first described cells when examining cork under a microscope in 1665">Robert Hooke</Term> looked at cork under a microscope and called the tiny compartments he saw "cells". In the 1670s, <Term def="Dutch scientist who used improved microscopes to observe living single-celled organisms">Anton van Leeuwenhoek</Term> spotted living single-celled organisms in pond water for the first time. In 1838 and 1839, <Term def="Botanist who proposed in 1838 that all plants are made of cells">Matthias Schleiden</Term> and <Term def="Zoologist who proposed in 1839 that all animals are made of cells">Theodor Schwann</Term> independently concluded that all organisms are made of cells. Then in 1855, <Term def="Scientist who completed cell theory in 1855 by stating all cells come from pre-existing cells">Rudolf Virchow</Term> added the third statement.</p>
        <Callout kind="key" title="The three statements of cell theory">
          1. All living things are made of one or more cells. 2. The cell is the basic unit of life. 3. All cells come from pre-existing cells.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={1} question="Which scientist completed cell theory in 1855 by stating that all cells come from pre-existing cells?" options={["Robert Hooke", "Matthias Schleiden", "Theodor Schwann", "Rudolf Virchow"]} correct={3} explain="Rudolf Virchow added the third and final statement of cell theory in 1855, overturning the idea of spontaneous generation."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.2" title="Cell structures common to plant and animal cells" progress={progress} setProgress={setProgress}>
        <p>Both plant and animal cells are <Term def="Cells that have a membrane-bound nucleus and other membrane-bound organelles">eukaryotic</Term>, meaning they both have a membrane-bound nucleus and a range of other specialised structures called <Term def="Specialised structures inside a cell that carry out specific functions, like 'little organs'">organelles</Term>. The structures found in both cell types include the <Term def="A thin, flexible layer surrounding every cell that controls what enters and leaves">cell membrane</Term>, <Term def="The gel-like fluid filling the cell that suspends organelles and is the site of many reactions">cytoplasm</Term>, <Term def="The organelle containing DNA that controls all cell activities">nucleus</Term>, <Term def="Organelles that release energy from glucose through aerobic respiration">mitochondria</Term>, and <Term def="Tiny organelles that make proteins using instructions from DNA">ribosomes</Term>.</p>
        <p>However, plant cells have three extra structures that animal cells do not have: a <Term def="A rigid layer outside the cell membrane in plant cells, made of cellulose, that provides structural support">cell wall</Term> made of cellulose, <Term def="Organelles in plant cells that carry out photosynthesis and contain the green pigment chlorophyll">chloroplasts</Term>, and a <Term def="A large fluid-filled structure in plant cells that stores water and creates turgor pressure">large central vacuole</Term>. These extra structures reflect the plant's lifestyle: it is stationary, makes its own food using light, and needs support to stay upright.</p>
        <PlantCellDiagram/>
        <AnimalCellDiagram/>
        <QGroup title="Check yourself">
          <MCQ num={2} question="Which set of structures are found in plant cells but NOT in typical animal cells?" options={["Cell membrane, cytoplasm, nucleus", "Cell wall, chloroplasts, large central vacuole", "Mitochondria, ribosomes, cell membrane", "Nucleus, vacuole, mitochondria"]} correct={1} explain="Cell wall (cellulose), chloroplasts, and large central vacuole are the three plant-only structures. Animal cells have all the others."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.3" title="Functions of key cell structures" progress={progress} setProgress={setProgress}>
        <p>Every structure in a cell has a specific job. The <Term def="A thin phospholipid layer surrounding every cell that acts as a selective barrier">cell membrane</Term> acts like a selective gate, letting in oxygen and glucose while letting out waste like carbon dioxide. The <Term def="Gel-like fluid filling the cell; site of many chemical reactions; suspends organelles">cytoplasm</Term> is the medium where most reactions happen. The <Term def="The control centre of the cell; contains DNA and directs all activities including growth and reproduction">nucleus</Term> is the control centre, holding the DNA instructions for everything the cell does.</p>
        <p><Term def="Organelles that carry out aerobic respiration; release energy as ATP from glucose">Mitochondria</Term> are the powerhouses of the cell. They take in glucose and oxygen, and release energy in a usable form called <Term def="Adenosine triphosphate; the energy currency used to power all cell activities">ATP</Term>. You can think of ATP as a rechargeable battery that powers all cell work. <Term def="Organelles in plant cells that carry out photosynthesis; contain chlorophyll which absorbs light energy">Chloroplasts</Term> are only in plant cells. They capture light energy and use it to build glucose from carbon dioxide and water, a process called <Term def="The process by which plants use light energy, carbon dioxide and water to make glucose and oxygen">photosynthesis</Term>.</p>
        <Callout kind="key" title="Structure = function">
          In biology, a cell's shape and contents always match its job. Lots of mitochondria = lots of energy needed. Lots of chloroplasts = makes lots of food via photosynthesis.
        </Callout>
        <EnergyEquationSim/>
        <QGroup title="Check yourself">
          <MCQ num={3} question="A muscle cell needs a huge amount of energy to contract. Which organelle would you expect to find in very large numbers in a muscle cell?" options={["Chloroplasts", "Cell wall", "Mitochondria", "Large central vacuole"]} correct={2} explain="Mitochondria produce ATP through aerobic respiration. More mitochondria means more ATP, which is exactly what an energy-demanding muscle cell needs."/>
          <WrittenQ num={4} question="Explain how the nucleus and mitochondria work together to allow a cell to carry out aerobic respiration." model="The nucleus contains DNA with instructions for making enzymes. These instructions are sent to ribosomes, which make the enzymes. The enzymes then work inside the mitochondria to carry out the reactions of aerobic respiration, releasing ATP from glucose. Without the nucleus providing instructions, the mitochondria could not make the proteins they need to function."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.4" title="Comparing plant and animal cells" progress={progress} setProgress={setProgress}>
        <p>Under a microscope, plant and animal cells look quite different. Plant cells are usually <Term def="Having a boxy, right-angled shape, like a rectangle in 2D cross-section">rectangular</Term> because their rigid cellulose wall holds them in that shape. The large central vacuole pushes the cytoplasm and nucleus to the edges of the cell. Animal cells are more irregular in shape, rounded or stretched, with the nucleus usually sitting in the centre.</p>
        <p>Plant cells in green parts of the plant (like leaves) have a green tint from their chloroplasts. Root cells, however, have no chloroplasts because they are underground and receive no light. The large central vacuole in a turgid plant cell pushes outward against the cell wall, creating <Term def="The pressure exerted by the vacuole against the cell wall, keeping the cell rigid and the plant upright">turgor pressure</Term>, which is what keeps plants standing upright. When a plant wilts, it is because the vacuoles have lost water and turgor pressure has dropped.</p>
        <QGroup title="Check yourself">
          <MCQ num={5} question="A scientist views a cell under the microscope: it is rectangular, has a large clear space in the middle, and no visible chloroplasts. Could this be a plant cell?" options={["No, plant cells always have chloroplasts", "No, plant cells are never rectangular", "Yes, root cells and storage cells are plant cells without chloroplasts", "Yes, but only if the cell wall is stained"]} correct={2} explain="Not all plant cells have chloroplasts. Only cells in green parts of the plant have them. Root cells, storage cells, and many others are plant cells that lack chloroplasts but still have a cell wall and vacuole."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.5" title="Observing cells with microscopes" progress={progress} setProgress={setProgress}>
        <p>The compound microscope magnifies specimens by passing light through a series of lenses. Total magnification = eyepiece lens magnification x objective lens magnification. A 10x eyepiece with a 40x objective gives 400x total magnification. To prepare a <Term def="A microscope slide where a sample is placed in a drop of water and covered with a coverslip">wet mount slide</Term>, you place your sample in a drop of water on a glass slide, then lower a coverslip slowly to avoid trapping air bubbles.</p>
        <p>Stains make structures easier to see. <Term def="A yellow-brown stain that makes cell walls and starch visible in plant cells">Iodine solution</Term> is used for plant cells, while <Term def="A blue stain that makes the nucleus of animal and fungal cells visible">methylene blue</Term> is used for animal and fungal cells. Scientific drawings of cells must be in pencil, with clear outlines, ruled label lines, a title, and the magnification stated. Never shade or add artistic detail. Only draw what you actually see.</p>
        <VirtualMicroscope/>
        <Callout kind="tip" title="Biological drawing rules">
          Pencil only. Clear, single outlines. No shading. Label lines with a ruler. Write labels horizontally. Include a title and magnification. Only draw what you observe.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={6} question="You use a microscope with a 10x eyepiece and a 40x objective. What is the total magnification?" options={["40x", "50x", "400x", "4000x"]} correct={2} explain="Total magnification = eyepiece x objective = 10 x 40 = 400x."/>
          <WrittenQ num={7} question="Describe two visible differences between an onion epidermal cell (plant) and a human cheek cell (animal) when viewed under the microscope." model="1. Onion cells have a visible cell wall, giving them a rectangular shape with straight edges. Cheek cells have no cell wall and appear irregular or rounded. 2. Onion cells have a large central vacuole (a clear space in the middle), which cheek cells lack. The nucleus in cheek cells is more prominent and central, whereas in plant cells it is pushed to the edge by the vacuole."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.6" title="Respiration and photosynthesis in organelles" progress={progress} setProgress={setProgress}>
        <p><Term def="The process that releases energy from glucose in the mitochondria: glucose + oxygen produces carbon dioxide + water + ATP">Cellular respiration</Term> and <Term def="The process in chloroplasts that uses light energy to convert carbon dioxide and water into glucose and oxygen">photosynthesis</Term> are the two most important energy processes in biology. They are essentially opposite reactions. Photosynthesis builds glucose from carbon dioxide and water using light energy. Respiration breaks glucose down to release that stored energy as ATP. Together they form a continuous energy cycle that drives almost all life on Earth.</p>
        <p>Mitochondria have a special internal structure: the inner membrane is folded into finger-like projections called <Term def="Folds of the inner mitochondrial membrane that increase surface area for aerobic respiration">cristae</Term>, which greatly increase the surface area available for respiration reactions. Chloroplasts have stacks of flattened membranes called <Term def="Stacks of flattened membrane discs inside chloroplasts where chlorophyll is held and light reactions occur">thylakoids</Term>, where the green pigment <Term def="The green pigment in chloroplasts that absorbs light energy for photosynthesis">chlorophyll</Term> sits and absorbs light. At night, plants cannot photosynthesise but they keep on respiring, using the glucose stored from the day's photosynthesis.</p>
        <Callout kind="key" title="Word equations">
          Respiration: glucose + oxygen produces carbon dioxide + water + energy. Photosynthesis: carbon dioxide + water produces glucose + oxygen (needs light).
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={8} question="Where exactly does photosynthesis take place inside a plant cell?" options={["In the mitochondria", "In the nucleus", "In the chloroplasts", "In the vacuole"]} correct={2} explain="Photosynthesis takes place in the chloroplasts, where the green pigment chlorophyll absorbs light energy to power the reactions."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.7" title="Drawing single-celled organisms" progress={progress} setProgress={setProgress}>
        <p>Many organisms consist of just one cell that does everything a living thing needs to do. These <Term def="Organisms whose entire body is a single cell that carries out all life processes">unicellular organisms</Term> include bacteria (<Term def="Organisms whose cells lack a membrane-bound nucleus">prokaryotes</Term>) and a range of eukaryotic organisms called <Term def="A diverse group of mostly single-celled eukaryotic organisms including Amoeba, Paramecium, Euglena, and algae">protists</Term>. Despite being tiny, they can be surprisingly complex inside.</p>
        <p>Common examples you might view under a microscope include: <Term def="A protist that moves using pseudopodia (false feet) and has no fixed shape">Amoeba</Term> (irregular shape, moves by flowing pseudopodia), <Term def="A slipper-shaped protist covered in cilia for swimming">Paramecium</Term> (slipper shape, covered in cilia), <Term def="A protist with both a flagellum and chloroplasts; can photosynthesize or feed as an animal depending on light">Euglena</Term> (has both a flagellum and chloroplasts), and yeast (oval fungal cells that bud off daughter cells). When drawing them, follow all the rules of biological drawing. Because they move quickly, you may need to use a still image or slow the sample by adding a drop of methyl cellulose.</p>
        <Callout kind="fact" title="Euglena: both plant and animal?">
          Euglena has chloroplasts like a plant AND can feed on organic matter like an animal. Scientists call this mixotrophic nutrition. It shows that the line between kingdoms is not always sharp.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={9} question="An Amoeba moves by extending temporary projections of cytoplasm. What are these projections called?" options={["Cilia", "Flagella", "Pseudopodia", "Axons"]} correct={2} explain="Pseudopodia (meaning 'false feet') are temporary extensions of cytoplasm that an Amoeba uses to move and to engulf food."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.8" title="Specialised cells in multicellular organisms" progress={progress} setProgress={setProgress}>
        <p>In a <Term def="An organism whose body is made of many specialised cells working together">multicellular organism</Term>, cells can divide the labour among themselves. Each cell type becomes highly efficient at one job, allowing the whole organism to be far more complex than any single cell could be. This is called <Term def="The process by which cells in a multicellular organism develop different structures and functions">cell specialisation</Term>. The trade-off is that specialised cells cannot survive alone; they depend on other cell types to do the jobs they have given up.</p>
        <p>Specialised cells are grouped into <Term def="A group of similar cells working together to perform a specific function">tissues</Term>, tissues are organised into <Term def="A structure made of several tissue types working together to perform a complex function">organs</Term>, and organs that work together form <Term def="A group of organs that cooperate to carry out a major body function">organ systems</Term>. All cells in the same organism contain identical DNA. The difference between, say, a muscle cell and a nerve cell is not what DNA they have, but which genes are switched on during development.</p>
        <TissueOrganSVG/>
        <SpecialisedCellMatcher/>
        <QGroup title="Check yourself">
          <MCQ num={10} question="Why does a red blood cell have no nucleus?" options={["Nuclei are only needed in plant cells", "Losing the nucleus makes more room for haemoglobin, increasing its oxygen-carrying capacity", "Red blood cells are prokaryotic", "The nucleus is stored in plasma instead"]} correct={1} explain="Red blood cells sacrifice their nucleus during development to pack in more haemoglobin. This maximises the amount of oxygen each cell can carry, but means the cell cannot repair itself or reproduce."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.9" title="Cells in tissues and organs" progress={progress} setProgress={setProgress}>
        <p>The arrangement of cells in a tissue directly reflects the tissue's function. In a leaf, the <Term def="Tightly packed, column-shaped cells just below the upper leaf surface, packed with chloroplasts for maximum photosynthesis">palisade mesophyll</Term> cells are tall and tightly packed near the top surface to capture as much light as possible. Below them, the <Term def="Loosely arranged cells with large air spaces between them, allowing gas exchange to support photosynthesis">spongy mesophyll</Term> cells sit in a loose network with large air spaces, allowing carbon dioxide to diffuse in and oxygen to diffuse out.</p>
        <p>An organ is made of multiple tissue types working together. The leaf is an organ containing epidermal tissue (protection), mesophyll tissue (photosynthesis), vascular tissue (transport of water and glucose), and guard cells (gas exchange control). The human heart contains cardiac muscle tissue, connective tissue, nervous tissue, and epithelial tissue, all cooperating to pump blood continuously throughout your life.</p>
        <QGroup title="Check yourself">
          <WrittenQ num={11} question="Explain how the arrangement of palisade and spongy mesophyll tissue in a leaf allows photosynthesis to work efficiently." model="Palisade cells are tightly packed near the upper leaf surface, where they receive the most direct light. Their many chloroplasts absorb this light for photosynthesis. The loosely packed spongy mesophyll below creates air spaces connected to the stomata, allowing carbon dioxide to diffuse from outside the leaf to the palisade cells, and oxygen produced by photosynthesis to diffuse out. The two layers work together: palisade for light capture and spongy for gas exchange."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.10" title="Structure and function in specialised cells" progress={progress} setProgress={setProgress}>
        <p>A core principle of biology is that <Term def="The idea that the specific physical features of a cell directly allow it to carry out its particular function">structure determines function</Term>. Look at any specialised cell and you can predict its job from its shape and contents. A <Term def="A male reproductive cell with a long flagellum, mitochondria-rich mid-piece, and DNA-packed head, designed to swim to an egg">sperm cell</Term> has a streamlined head packed with DNA, a mid-section loaded with mitochondria, and a long <Term def="A whip-like extension of a cell used for movement">flagellum</Term> for swimming. Every feature serves its purpose: the shape cuts through fluid, the mitochondria power the flagellum, and the head delivers DNA to the egg.</p>
        <p>A red blood cell is a biconcave disc with no nucleus and is packed with <Term def="The oxygen-carrying protein in red blood cells">haemoglobin</Term>. The indented shape increases surface area for oxygen to diffuse in and out, and the lack of a nucleus leaves more room for haemoglobin. Intestinal epithelial cells have tiny finger-like projections called <Term def="Tiny finger-like projections on the surface of intestinal cells that increase surface area for nutrient absorption">microvilli</Term> that increase their absorption surface area by up to 600 times.</p>
        <Callout kind="key" title="Structure tells you the function">
          Many mitochondria means high energy demand. Long thin extension means high surface area for absorption. Biconcave disc shape means designed for carrying gases. You can read a cell's job from how it looks.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={12} question="A root hair cell has a long, thin extension projecting into the soil. How does this structural feature help the cell do its job?" options={["It allows the cell to photosynthesize underground", "It greatly increases surface area, speeding up absorption of water and minerals from soil", "It helps the cell produce more mitochondria", "It protects the cell from predators"]} correct={1} explain="The long thin extension dramatically increases the surface area of the cell membrane in contact with soil water. More surface area means faster absorption of water and dissolved mineral ions by diffusion and active transport."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="3.2.11" title="Observing specialised cells on prepared slides" progress={progress} setProgress={setProgress}>
        <p>Prepared slides are made by professional laboratories: tissue is fixed (preserved), sliced into very thin sections, mounted on glass, and stained. A common stain is <Term def="A two-colour stain used on prepared slides: haematoxylin stains nuclei purple-blue and eosin stains cytoplasm pink">haematoxylin and eosin (H and E)</Term>, which colours the nucleus purple-blue and the cytoplasm pink. Unlike fresh wet mounts, prepared slides are permanent and can be reused, making them ideal for comparing multiple cell types.</p>
        <p>When you examine a prepared slide, record: the shape and size of cells, the appearance and position of the nucleus, any specialised visible structures (striations in muscle, long axons in nerve cells, or chloroplasts in plant sections), and how cells are arranged relative to each other. Then you can link what you see to structure-function relationships.</p>
        <Callout kind="tip" title="Identifying cell types from a slide">
          Rectangular cells with thick borders = plant cells. Striped long fibres = muscle tissue. Branching extensions = neurons. Tiny dots with no visible nucleus = bacteria.
        </Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={13} question="You observe a prepared slide showing long, cylindrical cells with a striped pattern across them. What cell type is this, and what causes the striped pattern?" model="These are skeletal or cardiac muscle cells. The striped (striated) pattern is caused by the regular, repeating arrangement of the contractile proteins actin and myosin inside the cell. These proteins are organised into overlapping bands that give the cell its characteristic striped appearance under the microscope."/>
        </QGroup>
      </DotPoint>
    </>
  );
}

function Section33({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">3.3 Cells and Classification in Context</div>
        <h1>Putting it all together</h1>
        <p className="lead">Apply everything you have learned to a real organism. The platypus is one of the most extraordinary animals on Earth and a perfect case study.</p>
      </div>

      <Figure src="img/aussie-organism.png" caption="The platypus — a uniquely Australian mammal." maxWidth="380px" />
      <DotPoint id="3.3.1" title="Researching an organism to connect cells and classification" progress={progress} setProgress={setProgress}>
        <p>A complete understanding of any organism means knowing its classification (kingdom to species), its cell type and organelles, and how it demonstrates all seven characteristics of living things. Choosing an Australian organism lets you also explore adaptations and Indigenous classification. The <Term def="An Australian egg-laying mammal (monotreme) with electroreceptors in its bill for detecting prey">platypus</Term> (<em>Ornithorhynchus anatinus</em>) is an ideal case study. When the first preserved specimen arrived in England in 1799, scientists thought it was a fake taxidermist creation. It was just too unusual to believe.</p>
        <p>The platypus is a <Term def="An egg-laying mammal; the only two Australian monotremes are the platypus and the echidna">monotreme</Term>, an egg-laying mammal. Despite laying eggs, it is clearly a mammal: it has fur, is warm-blooded, has three middle ear bones, and the female feeds her young on milk. Its cells are eukaryotic animal cells with a cell membrane, nucleus, mitochondria, and ribosomes, but no cell wall, no chloroplasts, and no large vacuole. The bill contains about 40,000 <Term def="Sensory cells that detect electric fields; the platypus uses them to find prey in murky water">electroreceptors</Term>, the most sensitive electric-field detection system known in any mammal.</p>
        <PlatypusClassificationSVG/>
        <Callout kind="fact" title="Diving on a breath">
          A platypus can hold its breath for 30 to 140 seconds while hunting underwater, using electroreception to locate worms, yabbies, and insect larvae even in pitch-dark, murky water with its eyes and ears closed.
        </Callout>
        <ClassificationBuilder/>
        <QGroup title="Check yourself">
          <MCQ num={14} question="The platypus lays eggs, yet it is classified as a mammal. Which feature is most important for placing it in Class Mammalia?" options={["Laying eggs", "Having a duck-like bill", "Having fur and producing milk for young", "Living near water"]} correct={2} explain="Classification is based on a combination of features. The platypus shares the key mammalian features: fur, warm-bloodedness, three middle ear bones, and milk production. Egg-laying is a primitive ancestral feature retained from early mammals."/>
          <WrittenQ num={15} question="Using MRSGREN, give one specific piece of evidence for each characteristic of living things in the platypus." model="Movement: swims with front webbed feet, walks on land. Reproduction: lays 1 to 3 soft-shelled eggs; female secretes milk through skin patches for young. Sensitivity: bill contains 40,000 electroreceptors that detect electric fields of prey. Growth: hatchlings (1.5 cm) grow to adults (30 to 60 cm) over about 12 months. Respiration: aerobic; breathes at the surface; mitochondria in muscle cells release ATP from glucose. Excretion: kidneys produce urine and remove urea; CO2 exhaled through lungs. Nutrition: carnivorous; dives to find invertebrates using electroreception."/>
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   MOUNT
   ============================================================ */
mountTopicApp({
  year: 7,
  topicTitle: "Cells and Classification",
  branch: "biology",
  heroImage: "img/hero.png",
  strand: "Stage 4 · NSW Science",
  accent: "emerald",
  storageKey: "y7.cellsclassification",
  hubHref: "../",
  intro: "All living things are made of cells, and scientists have developed clever ways to sort and name every species on Earth. In this topic you will explore what cells look like and how they work, use microscopes to observe different cell types, and learn how to classify living things from bacteria to blue whales using the same system scientists use worldwide.",
  glossary: {
    "cell": "The smallest unit of life; the basic structural and functional unit of all living things.",
    "cell theory": "Three foundational statements: all living things are made of cells; cells are the basic unit of life; all cells come from pre-existing cells.",
    "organelle": "A specialised structure inside a cell that carries out a specific function, like a 'little organ'.",
    "nucleus": "The organelle that contains DNA and acts as the control centre of the cell.",
    "cell membrane": "A thin, flexible phospholipid layer surrounding every cell that controls what enters and exits.",
    "cell wall": "A rigid layer outside the cell membrane in plant cells, made of cellulose, providing structural support.",
    "chloroplast": "An organelle in plant cells where photosynthesis takes place; contains the green pigment chlorophyll.",
    "mitochondria": "Organelles that carry out aerobic cellular respiration, releasing energy (ATP) from glucose.",
    "cytoplasm": "The gel-like fluid inside a cell that suspends organelles and is the site of many chemical reactions.",
    "photosynthesis": "The process in chloroplasts by which plants convert carbon dioxide and water into glucose and oxygen using light energy.",
    "cellular respiration": "The process in mitochondria that releases energy (ATP) from glucose by reacting it with oxygen.",
    "eukaryotic": "Describes cells that have a membrane-bound nucleus and other membrane-bound organelles (plants, animals, fungi, protists).",
    "prokaryotic": "Describes cells that lack a membrane-bound nucleus (bacteria and archaea).",
    "classification": "The process of grouping organisms based on shared characteristics and evolutionary relationships.",
    "binomial name": "A unique two-part scientific name for a species: genus (capitalised) + species (lowercase), both italicised.",
    "MRSGREN": "A mnemonic for the seven characteristics of living things: Movement, Reproduction, Sensitivity, Growth, Respiration, Excretion, Nutrition.",
    "adaptation": "An inherited feature or behaviour that improves an organism's chance of survival and reproduction in its environment.",
    "dichotomous key": "A tool for identifying organisms by working through a series of paired statements, each offering two choices.",
    "specialised cell": "A cell that has developed a unique structure to efficiently carry out one specific function in a multicellular organism.",
    "tissue": "A group of similar cells working together to carry out a specific function.",
    "organ": "A structure made of several tissue types working together to perform a complex function.",
    "unicellular": "Describes an organism whose entire body consists of a single cell (e.g. Amoeba, Paramecium, bacteria).",
    "multicellular": "Describes an organism whose body is made of many cells, often specialised for different functions.",
    "turgor pressure": "The pressure exerted by the vacuole pushing against the cell wall in plant cells, keeping the plant firm and upright.",
    "Traditional Ecological Knowledge (TEK)": "Detailed knowledge of the environment developed over thousands of years by Aboriginal and Torres Strait Islander peoples.",
    "haemoglobin": "The oxygen-carrying protein found in red blood cells.",
    "homologous structures": "Structures in different species that share a common evolutionary origin, even if they look different or do different jobs.",
    "endemic species": "Species found only in one particular place and nowhere else in the world.",
    "turgor": "Firmness in plant cells caused by the vacuole pushing water against the cell wall.",
    "stain": "A dye used in microscopy to increase contrast and make cell structures more visible (e.g. iodine for plant cells, methylene blue for animal cells).",
  },
  sections: [
    {
      id: "3.1",
      label: "Classification",
      accent: "emerald",
      blurb: "Sort, name, and study the diversity of life on Earth.",
      points: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5", "3.1.6", "3.1.7"],
      render: (p) => <Section31 {...p}/>,
    },
    {
      id: "3.2",
      label: "Cells",
      accent: "teal",
      blurb: "Explore the structure and function of life's building blocks.",
      points: ["3.2.1", "3.2.2", "3.2.3", "3.2.4", "3.2.5", "3.2.6", "3.2.7", "3.2.8", "3.2.9", "3.2.10", "3.2.11"],
      render: (p) => <Section32 {...p}/>,
    },
    {
      id: "3.3",
      label: "In Context",
      accent: "green",
      blurb: "Apply cells and classification to a real Australian organism.",
      points: ["3.3.1"],
      render: (p) => <Section33 {...p}/>,
    },
  ],
});
