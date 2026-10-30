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

/* ============================================================
   SECTION 3.1 INTERACTIVES
   ============================================================ */

/* MRSGREN flashcard quiz */
function MrsgrenFlashcards() {
  var cards = [{
    letter: "M",
    name: "Movement",
    desc: "All living things move some part of themselves. Plants grow toward light. Animals walk, swim or fly.",
    example: "A sunflower turns to face the sun across the day."
  }, {
    letter: "R",
    name: "Reproduction",
    desc: "Organisms produce offspring so the species continues. This can be sexual or asexual.",
    example: "A strawberry plant sends out runners that grow into new plants."
  }, {
    letter: "S",
    name: "Sensitivity",
    desc: "Organisms detect and respond to changes in their environment, called stimuli.",
    example: "A moth flies toward a light source at night."
  }, {
    letter: "G",
    name: "Growth",
    desc: "Organisms increase in size and complexity using nutrients and energy.",
    example: "A tadpole grows into a frog over several weeks."
  }, {
    letter: "R2",
    name: "Respiration",
    desc: "All cells release energy from food molecules. Most use oxygen for aerobic respiration.",
    example: "Your muscle cells break down glucose to power every movement."
  }, {
    letter: "E",
    name: "Excretion",
    desc: "Metabolic waste products are removed from the body. This is NOT the same as getting rid of undigested food.",
    example: "Your kidneys filter urea from the blood and produce urine."
  }, {
    letter: "N",
    name: "Nutrition",
    desc: "Organisms obtain and use nutrients. Plants photosynthesise; animals eat food.",
    example: "A koala eats eucalyptus leaves to get energy and nutrients."
  }];
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    idx = _useState2[0],
    setIdx = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    flipped = _useState4[0],
    setFlipped = _useState4[1];
  var card = cards[idx];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "MRSGREN flashcards",
    subtitle: "Click a card to flip it. Use the arrows to move between characteristics.",
    takeaway: "All seven MRSGREN characteristics must be present for something to be classified as a living thing, and each characteristic has a specific meaning quite different from everyday language."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setFlipped(function (f) {
        return !f;
      });
    },
    role: "button",
    tabIndex: 0,
    "aria-label": "Flashcard: " + card.name + ". Press to flip.",
    onKeyDown: function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setFlipped(function (f) {
          return !f;
        });
      }
    },
    style: {
      width: "100%",
      maxWidth: 420,
      minHeight: 160,
      borderRadius: 16,
      background: flipped ? "var(--accent-deep)" : "var(--accent-soft)",
      color: flipped ? "#fff" : "var(--ink)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 28px",
      cursor: "pointer",
      boxShadow: "0 4px 18px rgba(0,0,0,0.10)",
      transition: "background 0.3s, color 0.3s",
      textAlign: "center",
      userSelect: "none"
    }
  }, !flipped ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 48,
      fontWeight: 800,
      lineHeight: 1
    }
  }, card.letter === "R2" ? "R" : card.letter), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      marginTop: 8
    }
  }, card.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      marginTop: 6,
      opacity: 0.7
    }
  }, "Tap to reveal")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 8
    }
  }, card.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, card.desc), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontStyle: "italic",
      opacity: 0.9
    }
  }, card.example))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: function onClick() {
      setIdx(function (i) {
        return (i - 1 + cards.length) % cards.length;
      });
      setFlipped(false);
    }
  }, "Previous"), /*#__PURE__*/React.createElement("span", {
    className: "muted",
    style: {
      fontSize: 13
    }
  }, idx + 1, " of ", cards.length), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: function onClick() {
      setIdx(function (i) {
        return (i + 1) % cards.length;
      });
      setFlipped(false);
    }
  }, "Next"))));
}

/* Living vs Non-living sorter */
function LivingThingsSorter() {
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Living or non-living?",
    subtitle: "Sort each item into the correct bucket by clicking it.",
    takeaway: "Some things that seem alive, like a candle flame, fail the MRSGREN test, while some living things, like viruses, are genuinely debated by scientists."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: [{
      id: "a",
      label: "Mushroom",
      bucket: "living"
    }, {
      id: "b",
      label: "Candle flame",
      bucket: "nonliving"
    }, {
      id: "c",
      label: "River stone",
      bucket: "nonliving"
    }, {
      id: "d",
      label: "Yeast cell",
      bucket: "living"
    }, {
      id: "e",
      label: "Virus",
      bucket: "debated"
    }, {
      id: "f",
      label: "Fern plant",
      bucket: "living"
    }, {
      id: "g",
      label: "Robot vacuum",
      bucket: "nonliving"
    }, {
      id: "h",
      label: "Amoeba",
      bucket: "living"
    }],
    buckets: [{
      id: "living",
      label: "Living"
    }, {
      id: "nonliving",
      label: "Non-living"
    }, {
      id: "debated",
      label: "Debated"
    }]
  }));
}

/* Kingdom classification sorter */
function KingdomSorter() {
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Kingdom sorter",
    subtitle: "Place each organism into its correct kingdom.",
    takeaway: "Life is divided into six kingdoms, and placing an organism in the correct one depends on its cell type, how it obtains nutrients, and its body structure."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: [{
      id: "a",
      label: "Mushroom",
      bucket: "fungi"
    }, {
      id: "b",
      label: "E. coli bacterium",
      bucket: "bacteria"
    }, {
      id: "c",
      label: "Amoeba",
      bucket: "protista"
    }, {
      id: "d",
      label: "Grevillea (flower)",
      bucket: "plantae"
    }, {
      id: "e",
      label: "Saltwater crocodile",
      bucket: "animalia"
    }, {
      id: "f",
      label: "Thermophile archaea",
      bucket: "archaea"
    }, {
      id: "g",
      label: "Bull kelp (alga)",
      bucket: "protista"
    }, {
      id: "h",
      label: "Red kangaroo",
      bucket: "animalia"
    }],
    buckets: [{
      id: "animalia",
      label: "Animalia"
    }, {
      id: "plantae",
      label: "Plantae"
    }, {
      id: "fungi",
      label: "Fungi"
    }, {
      id: "protista",
      label: "Protista"
    }, {
      id: "bacteria",
      label: "Bacteria"
    }, {
      id: "archaea",
      label: "Archaea"
    }]
  }));
}

/* Dichotomous key interactive for Australian invertebrates */
function DichotomousKeyGame() {
  var creatures = [{
    id: "bee",
    name: "Honeybee",
    clues: {
      legs: 6,
      wings: true,
      segments: 3,
      antennae: 2
    },
    path: ["step1a", "step2a"],
    answer: "Class Insecta (winged insect)"
  }, {
    id: "spider",
    name: "Huntsman spider",
    clues: {
      legs: 8,
      wings: false,
      segments: 2,
      antennae: 0
    },
    path: ["step1b", "step3a"],
    answer: "Class Arachnida"
  }, {
    id: "centipede",
    name: "Giant centipede",
    clues: {
      legs: "30+",
      wings: false,
      segments: "many",
      pairsPerSegment: 1
    },
    path: ["step1b", "step3b", "step4a"],
    answer: "Class Chilopoda (centipede)"
  }, {
    id: "millipede",
    name: "Pill millipede",
    clues: {
      legs: "20+",
      wings: false,
      segments: "many",
      pairsPerSegment: 2
    },
    path: ["step1b", "step3b", "step4b"],
    answer: "Class Diplopoda (millipede)"
  }, {
    id: "ant",
    name: "Bull ant",
    clues: {
      legs: 6,
      wings: false,
      segments: 3,
      antennae: 2
    },
    path: ["step1a", "step2b"],
    answer: "Class Insecta (wingless insect)"
  }];
  var steps = {
    start: {
      question: "Step 1: How many legs does the organism have?",
      options: [{
        label: "Exactly 6 legs",
        next: "step2"
      }, {
        label: "More than 6 legs",
        next: "step3"
      }]
    },
    step2: {
      question: "Step 2: Does the organism have visible wings?",
      options: [{
        label: "Yes, has wings",
        result: "Class Insecta (winged insect)"
      }, {
        label: "No wings",
        result: "Class Insecta (wingless insect)"
      }]
    },
    step3: {
      question: "Step 3: How many legs does it have?",
      options: [{
        label: "Exactly 8 legs",
        result: "Class Arachnida"
      }, {
        label: "10 or more legs",
        next: "step4"
      }]
    },
    step4: {
      question: "Step 4: How many pairs of legs per body segment?",
      options: [{
        label: "One pair per segment",
        result: "Class Chilopoda (centipede)"
      }, {
        label: "Two pairs per segment",
        result: "Class Diplopoda (millipede)"
      }]
    }
  };
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    currentCreature = _useState6[0],
    setCurrentCreature = _useState6[1];
  var _useState7 = useState("start"),
    _useState8 = _slicedToArray(_useState7, 2),
    step = _useState8[0],
    setStep = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    result = _useState0[0],
    setResult = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    correct = _useState10[0],
    setCorrect = _useState10[1];
  function pickCreature() {
    var c = creatures[Math.floor(Math.random() * creatures.length)];
    setCurrentCreature(c);
    setStep("start");
    setResult(null);
    setCorrect(null);
  }
  function choose(option) {
    if (option.result) {
      var isCorrect = currentCreature && option.result === currentCreature.answer;
      setResult(option.result);
      setCorrect(isCorrect);
    } else if (option.next) {
      setStep(option.next);
    }
  }
  var currentStep = steps[step];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Dichotomous key challenge",
    subtitle: "Pick a mystery Australian invertebrate and use the key to identify it.",
    takeaway: "A dichotomous key identifies unknown organisms by working through a series of paired questions, so one wrong observation at any step leads to a wrong answer at the end."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, !currentCreature ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 12
    }
  }, "Click the button to get a mystery invertebrate to identify."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: pickCreature
  }, "Start identification")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "14px 18px",
      background: "var(--accent-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, "Mystery organism:"), " ", currentCreature.name, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 13
    },
    className: "muted"
  }, "Legs: ", currentCreature.clues.legs, currentCreature.clues.wings !== undefined && " | Wings: " + (currentCreature.clues.wings ? "yes" : "no"), currentCreature.clues.pairsPerSegment && " | Leg pairs per segment: " + currentCreature.clues.pairsPerSegment)), !result ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 600,
      marginBottom: 10
    }
  }, currentStep.question), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, currentStep.options.map(function (opt, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "btn btn-ghost",
      style: {
        textAlign: "left",
        justifyContent: "flex-start"
      },
      onClick: function onClick() {
        return choose(opt);
      }
    }, opt.label);
  }))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Callout, {
    kind: correct ? "success" : "warn",
    title: correct ? "Correct identification!" : "Not quite right"
  }, "You identified: ", /*#__PURE__*/React.createElement("strong", null, result), ".", !correct && /*#__PURE__*/React.createElement("span", null, " The correct answer was: ", /*#__PURE__*/React.createElement("strong", null, currentCreature.answer), ". Check your observations and try another.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    style: {
      marginTop: 12
    },
    onClick: pickCreature
  }, "Try another")))));
}

/* Australian adaptations explorer */
function AdaptationsExplorer() {
  var organisms = [{
    name: "Thorny devil",
    habitat: "Desert",
    adaptations: [{
      type: "Structural",
      desc: "Microscopic channels between scales collect dew and channel it to the mouth."
    }, {
      type: "Behavioural",
      desc: "Lies still at dawn to collect moisture from mist before daytime heat arrives."
    }]
  }, {
    name: "Bilby",
    habitat: "Arid scrubland",
    adaptations: [{
      type: "Structural",
      desc: "Large ears filled with blood vessels radiate excess body heat."
    }, {
      type: "Behavioural",
      desc: "Nocturnal: shelters in cool burrows during the day, when the ground surface can be hotter than 50 °C."
    }]
  }, {
    name: "Banksia",
    habitat: "Fire-prone woodland",
    adaptations: [{
      type: "Physiological",
      desc: "Serotinous cones stay sealed until fire heat melts a resin seal, then release seeds."
    }, {
      type: "Structural",
      desc: "Thick, corky bark insulates the living tissue beneath from fire damage."
    }]
  }, {
    name: "Platypus",
    habitat: "Freshwater streams",
    adaptations: [{
      type: "Structural",
      desc: "Bill contains about 40,000 electroreceptors that detect electric fields of prey in murky water."
    }, {
      type: "Physiological",
      desc: "Red blood cells packed with haemoglobin allow breath-holding for up to 140 seconds."
    }]
  }];
  var _useState11 = useState(0),
    _useState12 = _slicedToArray(_useState11, 2),
    selected = _useState12[0],
    setSelected = _useState12[1];
  var org = organisms[selected];
  var typeColour = {
    Structural: "var(--accent-deep)",
    Physiological: "#7c3aed",
    Behavioural: "#d97706"
  };
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Australian adaptations explorer",
    subtitle: "Choose an organism to see how it survives its habitat.",
    takeaway: "Adaptations can be structural, physiological, or behavioural, and each feature of an organism directly reflects the challenges of its particular habitat."
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg-toggle",
    style: {
      marginBottom: 16
    }
  }, organisms.map(function (o, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "itab" + (selected === i ? " active" : ""),
      onClick: function onClick() {
        return setSelected(i);
      }
    }, o.name);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--accent-soft)",
      borderRadius: 12,
      padding: "16px 18px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16
    }
  }, org.name), /*#__PURE__*/React.createElement("div", {
    className: "muted",
    style: {
      fontSize: 13
    }
  }, "Habitat: ", org.habitat)), org.adaptations.map(function (a, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "card",
      style: {
        marginBottom: 10,
        borderLeft: "4px solid " + (typeColour[a.type] || "var(--accent-deep)"),
        padding: "12px 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 13,
        color: typeColour[a.type] || "var(--accent-deep)"
      }
    }, a.type), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "4px 0 0"
      }
    }, a.desc));
  }));
}

/* ============================================================
   SECTION 3.2 INTERACTIVES
   ============================================================ */

/* Clickable plant cell diagram */
function PlantCellDiagram() {
  var _useState13 = useState(null),
    _useState14 = _slicedToArray(_useState13, 2),
    active = _useState14[0],
    setActive = _useState14[1];
  var organelles = [{
    id: "wall",
    label: "Cell wall",
    cx: 240,
    cy: 62,
    desc: "Made of cellulose. Provides rigid structural support and prevents the cell from bursting. Found in plant cells but not animal cells."
  }, {
    id: "membrane",
    label: "Cell membrane",
    cx: 240,
    cy: 306,
    desc: "A thin, flexible layer that controls what enters and leaves the cell. Found in ALL cells."
  }, {
    id: "nucleus",
    label: "Nucleus",
    cx: 148,
    cy: 168,
    desc: "The control centre of the cell. Contains DNA, which carries instructions for all cell activities."
  }, {
    id: "vacuole",
    label: "Large vacuole",
    cx: 240,
    cy: 240,
    desc: "Stores water and waste. Creates turgor pressure to keep the cell firm and the plant upright."
  }, {
    id: "chloroplast",
    label: "Chloroplast",
    cx: 320,
    cy: 195,
    desc: "The site of photosynthesis. Contains chlorophyll (green pigment) that absorbs light energy. Found in plant cells (and algae) but not animal cells."
  }, {
    id: "mitochondria",
    label: "Mitochondria",
    cx: 160,
    cy: 280,
    desc: "The powerhouse. Carries out aerobic respiration to release energy (ATP) from glucose."
  }, {
    id: "cytoplasm",
    label: "Cytoplasm",
    cx: 310,
    cy: 290,
    desc: "Gel-like fluid filling the cell. The medium for most chemical reactions. Suspends all organelles."
  }];
  var info = active ? organelles.find(function (o) {
    return o.id === active;
  }) : null;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Clickable plant cell",
    subtitle: "Tap any labelled part to learn what it does.",
    takeaway: "Plant cells have three structures not found in animal cells: a cellulose cell wall, chloroplasts for photosynthesis, and a large central vacuole for water storage and support."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 480 380",
    width: "100%",
    style: {
      maxWidth: 480,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "60",
    width: "360",
    height: "260",
    rx: "22",
    fill: "none",
    stroke: "#86efac",
    strokeWidth: "10"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "72",
    y: "72",
    width: "336",
    height: "236",
    rx: "16",
    fill: "#d1fae5",
    stroke: "#34d399",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "238",
    cy: "220",
    rx: "90",
    ry: "75",
    fill: "#a7f3d0",
    stroke: "#10b981",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "238",
    y: "224",
    textAnchor: "middle",
    fontSize: "11",
    fill: "#065f46",
    fontWeight: "600"
  }, "Vacuole"), /*#__PURE__*/React.createElement("ellipse", {
    cx: "148",
    cy: "168",
    rx: "38",
    ry: "30",
    fill: "#6ee7b7",
    stroke: "#059669",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "148",
    y: "172",
    textAnchor: "middle",
    fontSize: "11",
    fill: "#064e3b",
    fontWeight: "600"
  }, "Nucleus"), [[300, 140], [340, 170], [305, 200]].map(function (_ref, i) {
    var _ref2 = _slicedToArray(_ref, 2),
      cx = _ref2[0],
      cy = _ref2[1];
    return /*#__PURE__*/React.createElement("ellipse", {
      key: i,
      cx: cx,
      cy: cy,
      rx: "20",
      ry: "11",
      fill: "#4ade80",
      stroke: "#16a34a",
      strokeWidth: "1.5"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "336",
    y: "142",
    fontSize: "10",
    fill: "#14532d",
    fontWeight: "600"
  }, "Chloroplasts"), [[130, 260], [160, 270], [190, 258]].map(function (_ref3, i) {
    var _ref4 = _slicedToArray(_ref3, 2),
      cx = _ref4[0],
      cy = _ref4[1];
    return /*#__PURE__*/React.createElement("ellipse", {
      key: i,
      cx: cx,
      cy: cy,
      rx: "16",
      ry: "9",
      fill: "#fde68a",
      stroke: "#d97706",
      strokeWidth: "1.5"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "120",
    y: "292",
    fontSize: "10",
    fill: "#92400e",
    fontWeight: "600"
  }, "Mitochondria"), organelles.map(function (o) {
    return /*#__PURE__*/React.createElement("circle", {
      key: o.id,
      cx: o.cx,
      cy: o.cy,
      r: 18,
      fill: active === o.id ? "rgba(5,150,105,0.25)" : "rgba(5,150,105,0.08)",
      stroke: active === o.id ? "#059669" : "#34d399",
      strokeWidth: active === o.id ? 2.5 : 1.5,
      style: {
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setActive(active === o.id ? null : o.id);
      }
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "240",
    y: "350",
    textAnchor: "middle",
    fontSize: "12",
    fill: "var(--ink-muted)",
    fontWeight: "500"
  }, "Tap a hotspot to learn more")), info && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      background: "var(--accent-soft)",
      padding: "14px 18px",
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 4
    }
  }, info.label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, info.desc)), !info && /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      textAlign: "center",
      fontSize: 13
    }
  }, "Click any hotspot on the diagram above.")));
}

/* Clickable animal cell diagram */
function AnimalCellDiagram() {
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    active = _useState16[0],
    setActive = _useState16[1];
  var organelles = [{
    id: "membrane",
    label: "Cell membrane",
    cx: 240,
    cy: 57,
    desc: "Controls entry and exit of substances. In animal cells this is the outermost layer (no cell wall outside it)."
  }, {
    id: "nucleus",
    label: "Nucleus",
    cx: 240,
    cy: 185,
    desc: "Contains DNA and acts as the control centre. Usually sits near the centre of an animal cell."
  }, {
    id: "cytoplasm",
    label: "Cytoplasm",
    cx: 140,
    cy: 240,
    desc: "Fills most of the cell. The site of many reactions. Organelles float in cytoplasm."
  }, {
    id: "mitochondria",
    label: "Mitochondria",
    cx: 330,
    cy: 215,
    desc: "Releases energy via aerobic respiration. Animal cells can have thousands of mitochondria."
  }, {
    id: "ribosome",
    label: "Ribosomes",
    cx: 160,
    cy: 155,
    desc: "Tiny structures that make proteins using instructions from DNA. Found throughout the cytoplasm."
  }];
  var info = active ? organelles.find(function (o) {
    return o.id === active;
  }) : null;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Clickable animal cell",
    subtitle: "Tap any part to discover its function. Notice what is missing compared to a plant cell.",
    takeaway: "Animal cells share a membrane, cytoplasm, nucleus, and mitochondria with plant cells but lack a cell wall, chloroplasts, and a large central vacuole."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 480 340",
    width: "100%",
    style: {
      maxWidth: 480,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "240",
    cy: "185",
    rx: "155",
    ry: "130",
    fill: "#fef3c7",
    stroke: "#f59e0b",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "240",
    cy: "185",
    rx: "48",
    ry: "40",
    fill: "#fde68a",
    stroke: "#d97706",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "240",
    y: "189",
    textAnchor: "middle",
    fontSize: "12",
    fill: "#78350f",
    fontWeight: "700"
  }, "Nucleus"), [[320, 155], [340, 195], [315, 235]].map(function (_ref5, i) {
    var _ref6 = _slicedToArray(_ref5, 2),
      cx = _ref6[0],
      cy = _ref6[1];
    return /*#__PURE__*/React.createElement("ellipse", {
      key: i,
      cx: cx,
      cy: cy,
      rx: "19",
      ry: "10",
      fill: "#fcd34d",
      stroke: "#b45309",
      strokeWidth: "1.5"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "322",
    y: "138",
    textAnchor: "middle",
    fontSize: "10",
    fill: "#78350f",
    fontWeight: "600"
  }, "Mitochondria"), [[155, 155], [175, 140], [195, 160], [140, 175], [165, 195]].map(function (_ref7, i) {
    var _ref8 = _slicedToArray(_ref7, 2),
      cx = _ref8[0],
      cy = _ref8[1];
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: cx,
      cy: cy,
      r: 4,
      fill: "#f97316"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "120",
    y: "138",
    fontSize: "10",
    fill: "#9a3412",
    fontWeight: "600"
  }, "Ribosomes"), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "260",
    fontSize: "11",
    fill: "#92400e"
  }, "Cytoplasm"), organelles.map(function (o) {
    return /*#__PURE__*/React.createElement("circle", {
      key: o.id,
      cx: o.cx,
      cy: o.cy,
      r: 18,
      fill: active === o.id ? "rgba(217,119,6,0.25)" : "rgba(217,119,6,0.08)",
      stroke: active === o.id ? "#d97706" : "#f59e0b",
      strokeWidth: active === o.id ? 2.5 : 1.5,
      style: {
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setActive(active === o.id ? null : o.id);
      }
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "240",
    y: "328",
    textAnchor: "middle",
    fontSize: "12",
    fill: "var(--ink-muted)"
  }, "Tap a hotspot")), info && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      background: "#fef9c3",
      padding: "14px 18px",
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 4
    }
  }, info.label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, info.desc)), !info && /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      textAlign: "center",
      fontSize: 13
    }
  }, "Click any hotspot on the diagram above.")));
}

/* Virtual microscope zoom sim */
function VirtualMicroscope() {
  var _useState17 = useState("plant"),
    _useState18 = _slicedToArray(_useState17, 2),
    cellType = _useState18[0],
    setCellType = _useState18[1];
  var _useState19 = useState(40),
    _useState20 = _slicedToArray(_useState19, 2),
    magnification = _useState20[0],
    setMagnification = _useState20[1];
  var cells = {
    plant: {
      label: "Onion epidermal cell",
      colour: "#bbf7d0",
      borderCol: "#16a34a",
      wallCol: "#4ade80",
      hasWall: true,
      hasChloroplast: false,
      hasVacuole: true,
      desc: "Rectangular cells with visible cell walls. No chloroplasts (non-green tissue). Large vacuoles visible at high power."
    },
    animal: {
      label: "Human cheek cell",
      colour: "#fef3c7",
      borderCol: "#f59e0b",
      hasWall: false,
      hasChloroplast: false,
      hasVacuole: false,
      desc: "Irregular/oval cells with no cell wall. Nucleus stained dark. No large vacuole."
    },
    bacteria: {
      label: "Bacteria (rod-shaped)",
      colour: "#e0e7ff",
      borderCol: "#6366f1",
      hasWall: true,
      hasChloroplast: false,
      hasVacuole: false,
      tiny: true,
      desc: "Very tiny cells. No visible nucleus (prokaryotic). Simple rod shapes visible at highest magnification."
    },
    yeast: {
      label: "Yeast cell",
      colour: "#fae8ff",
      borderCol: "#a855f7",
      hasWall: true,
      hasChloroplast: false,
      hasVacuole: false,
      desc: "Oval cells with a cell wall. Nucleus visible after staining. May show budding (small daughter cell attached)."
    }
  };
  var cell = cells[cellType];
  var scale = magnification / 400;
  var cellW = cell.tiny ? 18 : 60;
  var cellH = cell.tiny ? 10 : cellType === "plant" ? 46 : 50;
  var cols = cell.tiny ? 16 : 5;
  var rows = cell.tiny ? 12 : 3;
  var padding = cell.tiny ? 8 : 18;
  var totalW = cols * (cellW + padding);
  var totalH = rows * (cellH + padding);
  var gridX = 240 - totalW / 2;
  var gridY = 190 - totalH / 2;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Virtual microscope",
    subtitle: "Choose a cell type and adjust the magnification to explore what you would see.",
    takeaway: "Increasing magnification reveals more detail inside cells, and each cell type (plant, animal, bacterium, yeast) has distinctive features that let you identify it under a microscope."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      marginBottom: 12
    }
  }, Object.keys(cells).map(function (k) {
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      className: "btn " + (cellType === k ? "btn-accent" : "btn-ghost"),
      onClick: function onClick() {
        return setCellType(k);
      }
    }, cells[k].label);
  })), /*#__PURE__*/React.createElement(Slider, {
    label: "Magnification",
    min: 40,
    max: 400,
    step: 40,
    value: magnification,
    onChange: setMagnification,
    unit: "x"
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 480 380",
    width: "100%",
    style: {
      maxWidth: 480,
      display: "block",
      margin: "0 auto",
      borderRadius: 12,
      background: "#e8f5e9",
      border: "2px solid #a7f3d0"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "fov"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "240",
    cy: "190",
    r: "170"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "vignette"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "75%",
    stopColor: "transparent"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(0,0,0,0.45)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "480",
    height: "380",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#fov)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "70",
    y: "20",
    width: "340",
    height: "340",
    fill: "#f8fffe"
  }), Array.from({
    length: rows
  }).map(function (_, row) {
    return Array.from({
      length: cols
    }).map(function (_, col) {
      var x = gridX + col * (cellW + padding);
      var y = gridY + row * (cellH + padding);
      var rx = cellType === "plant" ? 3 : cellType === "bacteria" ? 3 : 14;
      return /*#__PURE__*/React.createElement("g", {
        key: "".concat(row, "-").concat(col)
      }, cell.hasWall && /*#__PURE__*/React.createElement("rect", {
        x: x - 2,
        y: y - 2,
        width: cellW + 4,
        height: cellH + 4,
        rx: rx + 2,
        fill: cell.wallCol || cell.borderCol,
        opacity: 0.8
      }), /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: y,
        width: cellW,
        height: cellH,
        rx: rx,
        fill: cell.colour,
        stroke: cell.borderCol,
        strokeWidth: 1.5,
        opacity: 0.95
      }), !cell.tiny && magnification >= 100 && /*#__PURE__*/React.createElement("ellipse", {
        cx: x + cellW / 2,
        cy: y + cellH / 2,
        rx: cellW * 0.18,
        ry: cellH * 0.20,
        fill: cell.borderCol,
        opacity: 0.55
      }), cell.hasVacuole && magnification >= 200 && /*#__PURE__*/React.createElement("rect", {
        x: x + cellW * 0.25,
        y: y + cellH * 0.28,
        width: cellW * 0.5,
        height: cellH * 0.44,
        rx: 4,
        fill: "white",
        opacity: 0.65
      }), cellType === "yeast" && col % 3 === 0 && magnification >= 200 && /*#__PURE__*/React.createElement("ellipse", {
        cx: x + cellW + 6,
        cy: y + cellH * 0.3,
        rx: 9,
        ry: 7,
        fill: cell.colour,
        stroke: cell.borderCol,
        strokeWidth: 1.2
      }));
    });
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "240",
    cy: "190",
    r: "170",
    fill: "url(#vignette)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "240",
    cy: "190",
    r: "170",
    fill: "none",
    stroke: "#555",
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("text", {
    x: "240",
    y: "378",
    textAnchor: "middle",
    fontSize: "13",
    fill: "#aaa"
  }, magnification, "x total magnification")), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginTop: 12,
      padding: "12px 16px",
      background: "var(--accent-soft)"
    }
  }, /*#__PURE__*/React.createElement("strong", null, cell.label), ": ", cell.desc));
}

/* Photosynthesis / Respiration equation builder */
function EnergyEquationSim() {
  var _useState21 = useState("resp"),
    _useState22 = _slicedToArray(_useState21, 2),
    mode = _useState22[0],
    setMode = _useState22[1];
  var resp = {
    title: "Cellular respiration (in mitochondria)",
    reactants: ["Glucose", "Oxygen"],
    products: ["Carbon dioxide", "Water", "Energy (ATP)"],
    colour: "#f59e0b",
    organelle: "Mitochondria",
    where: "All living cells",
    when: "Continuously, day and night"
  };
  var photo = {
    title: "Photosynthesis (in chloroplasts)",
    reactants: ["Carbon dioxide", "Water", "Light energy"],
    products: ["Glucose", "Oxygen"],
    colour: "#22c55e",
    organelle: "Chloroplasts",
    where: "Cells with chloroplasts (plants and algae)",
    when: "Only when light is available"
  };
  var eq = mode === "resp" ? resp : photo;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Photosynthesis vs respiration",
    subtitle: "Switch between the two processes to compare organelle, reactants, and products.",
    takeaway: "Photosynthesis and cellular respiration are essentially opposite reactions: photosynthesis builds glucose from carbon dioxide and water using light, while respiration breaks glucose down to release energy as ATP."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn " + (mode === "resp" ? "btn-accent" : "btn-ghost"),
    onClick: function onClick() {
      return setMode("resp");
    }
  }, "Respiration"), /*#__PURE__*/React.createElement("button", {
    className: "btn " + (mode === "photo" ? "btn-accent" : "btn-ghost"),
    onClick: function onClick() {
      return setMode("photo");
    }
  }, "Photosynthesis")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      textAlign: "center",
      marginBottom: 14,
      color: eq.colour
    }
  }, eq.title), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 480 64",
    width: "100%",
    style: {
      maxWidth: 480,
      display: "block",
      margin: "0 auto 12px"
    },
    role: "img",
    "aria-label": eq.reactants.join(" + ") + " react to make " + eq.products.join(" + ")
  }, [[eq.reactants, 0, "33"], [eq.products, 258, "22"]].map(function (_ref9, side) {
    var _ref0 = _slicedToArray(_ref9, 3),
      items = _ref0[0],
      x0 = _ref0[1],
      alpha = _ref0[2];
    var gap = 16,
      zone = 222;
    var w = Math.min(100, (zone - (items.length - 1) * gap) / items.length);
    var start = x0 + (zone - (items.length * w + (items.length - 1) * gap)) / 2;
    return items.map(function (label, k) {
      var x = start + k * (w + gap);
      var lines = w < 90 && label.includes(" ") ? label.split(" ") : [label];
      return /*#__PURE__*/React.createElement("g", {
        key: side + label
      }, /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: "8",
        width: w,
        height: "44",
        rx: "10",
        fill: eq.colour + alpha,
        stroke: eq.colour,
        strokeWidth: "2"
      }), lines.map(function (ln, li) {
        return /*#__PURE__*/React.createElement("text", {
          key: li,
          x: x + w / 2,
          y: (lines.length === 1 ? 34 : 27) + li * 13,
          textAnchor: "middle",
          fontSize: "11",
          fontWeight: "700",
          fill: "var(--ink)"
        }, ln);
      }), k < items.length - 1 && /*#__PURE__*/React.createElement("text", {
        x: x + w + gap / 2,
        y: "35",
        textAnchor: "middle",
        fontSize: "14",
        fontWeight: "700",
        fill: "var(--ink)"
      }, "+"));
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "240",
    y: "37",
    textAnchor: "middle",
    fontSize: "24",
    fill: "var(--ink)"
  }, "\u2192")), /*#__PURE__*/React.createElement("div", {
    className: "grid-3",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "10px 12px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "muted",
    style: {
      fontSize: 11
    }
  }, "Organelle"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, eq.organelle)), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "10px 12px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "muted",
    style: {
      fontSize: 11
    }
  }, "Where"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, eq.where)), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "10px 12px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "muted",
    style: {
      fontSize: 11
    }
  }, "When"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, eq.when))));
}

/* Specialised cells matcher */
function SpecialisedCellMatcher() {
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Match specialised cells to their function",
    subtitle: "Click each cell to place it in the right bucket.",
    takeaway: "In multicellular organisms, each specialised cell type has a unique structure that suits it perfectly for its one job, from carrying oxygen to transmitting nerve signals."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: [{
      id: "a",
      label: "Red blood cell",
      bucket: "transport"
    }, {
      id: "b",
      label: "Neuron",
      bucket: "signal"
    }, {
      id: "c",
      label: "Muscle cell",
      bucket: "movement"
    }, {
      id: "d",
      label: "Root hair cell",
      bucket: "absorption"
    }, {
      id: "e",
      label: "Guard cell",
      bucket: "regulation"
    }, {
      id: "f",
      label: "Sperm cell",
      bucket: "reproduction"
    }, {
      id: "g",
      label: "Palisade cell",
      bucket: "photosynthesis"
    }],
    buckets: [{
      id: "transport",
      label: "Transport oxygen"
    }, {
      id: "signal",
      label: "Send signals"
    }, {
      id: "movement",
      label: "Movement"
    }, {
      id: "absorption",
      label: "Water absorption"
    }, {
      id: "regulation",
      label: "Regulate stomata"
    }, {
      id: "reproduction",
      label: "Reproduction"
    }, {
      id: "photosynthesis",
      label: "Photosynthesis"
    }]
  }));
}

/* Tissues to organs organiser */
function TissueOrganSVG() {
  var levels = ["Cell", "Tissue", "Organ", "Organ system", "Organism"];
  var examples = ["Palisade cell", "Mesophyll tissue", "Leaf", "Shoot system", "Eucalyptus tree"];
  var colours = ["#bbf7d0", "#6ee7b7", "#34d399", "#10b981", "#059669"];
  return /*#__PURE__*/React.createElement(Figure, {
    num: "1",
    caption: "Organisation of a multicellular organism: from a single cell up to the whole organism."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 560 72",
    width: "100%",
    style: {
      maxWidth: 560
    },
    role: "img",
    "aria-label": "Cell, then tissue, then organ, then organ system, then organism: palisade cell, mesophyll tissue, leaf, shoot system, eucalyptus tree."
  }, levels.map(function (l, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: l,
      transform: "translate(".concat(i * 112 + 6, ", 8)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "100",
      height: "56",
      rx: "10",
      fill: colours[i],
      stroke: "#065f46",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "50",
      y: "24",
      textAnchor: "middle",
      fontSize: "12",
      fontWeight: "700",
      fill: i >= 3 ? "#ffffff" : "#064e3b"
    }, l), /*#__PURE__*/React.createElement("text", {
      x: "50",
      y: "42",
      textAnchor: "middle",
      fontSize: "10",
      fill: i >= 3 ? "#ffffff" : "#065f46"
    }, examples[i]), i < levels.length - 1 && /*#__PURE__*/React.createElement("text", {
      x: "108",
      y: "34",
      textAnchor: "middle",
      fontSize: "18",
      fill: "#059669"
    }, "\u203A"));
  })));
}

/* ============================================================
   SECTION 3.3 INTERACTIVES
   ============================================================ */

/* Platypus classification hierarchy */
function PlatypusClassificationSVG() {
  var ranks = [{
    rank: "Kingdom",
    value: "Animalia",
    colour: "#bbf7d0"
  }, {
    rank: "Phylum",
    value: "Chordata",
    colour: "#6ee7b7"
  }, {
    rank: "Class",
    value: "Mammalia",
    colour: "#34d399"
  }, {
    rank: "Order",
    value: "Monotremata",
    colour: "#10b981"
  }, {
    rank: "Family",
    value: "Ornithorhynchidae",
    colour: "#059669"
  }, {
    rank: "Genus",
    value: "Ornithorhynchus",
    colour: "#047857"
  }, {
    rank: "Species",
    value: "anatinus",
    colour: "#065f46"
  }];
  return /*#__PURE__*/React.createElement(Figure, {
    num: "2",
    caption: "The full seven-rank classification of the platypus (Ornithorhynchus anatinus)."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 440 280",
    width: "100%",
    style: {
      maxWidth: 440
    }
  }, ranks.map(function (r, i) {
    var w = 380 - i * 44;
    var x = (440 - w) / 2;
    var y = i * 36 + 8;
    return /*#__PURE__*/React.createElement("g", {
      key: r.rank
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: w,
      height: "30",
      rx: "8",
      fill: r.colour
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 10,
      y: y + 20,
      fontSize: "11",
      fontWeight: "700",
      fill: i >= 4 ? "#fff" : "#064e3b"
    }, r.rank), /*#__PURE__*/React.createElement("text", {
      x: x + w - 10,
      y: y + 20,
      textAnchor: "end",
      fontSize: "11",
      fill: i >= 4 ? "#fff" : "#064e3b",
      fontStyle: i >= 5 ? "italic" : "normal"
    }, i >= 5 ? r.value : r.value));
  })));
}

/* Research organism classification builder */
function ClassificationBuilder() {
  var presets = {
    platypus: {
      kingdom: "Animalia",
      phylum: "Chordata",
      cls: "Mammalia",
      order: "Monotremata",
      family: "Ornithorhynchidae",
      genus: "Ornithorhynchus",
      species: "anatinus"
    },
    cat: {
      kingdom: "Animalia",
      phylum: "Chordata",
      cls: "Mammalia",
      order: "Carnivora",
      family: "Felidae",
      genus: "Felis",
      species: "catus"
    },
    human: {
      kingdom: "Animalia",
      phylum: "Chordata",
      cls: "Mammalia",
      order: "Primates",
      family: "Hominidae",
      genus: "Homo",
      species: "sapiens"
    }
  };
  var _useState23 = useState("platypus"),
    _useState24 = _slicedToArray(_useState23, 2),
    preset = _useState24[0],
    setPreset = _useState24[1];
  var p = presets[preset];
  var ranks = [["Kingdom", p.kingdom], ["Phylum", p.phylum], ["Class", p.cls], ["Order", p.order], ["Family", p.family], ["Genus", p.genus], ["Species", p.species]];
  var widths = [380, 340, 300, 260, 220, 180, 140];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Classification hierarchy explorer",
    subtitle: "Switch organism to compare their ranks. Notice where they share levels and where they split apart.",
    takeaway: "The seven-rank classification hierarchy goes from the broadest group (Kingdom) down to the most specific (Species), and organisms that share lower ranks are more closely related."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 10,
      marginBottom: 16
    }
  }, Object.keys(presets).map(function (k) {
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      className: "btn " + (preset === k ? "btn-accent" : "btn-ghost"),
      onClick: function onClick() {
        return setPreset(k);
      }
    }, k.charAt(0).toUpperCase() + k.slice(1));
  })), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 420 260",
    width: "100%",
    style: {
      maxWidth: 420,
      display: "block",
      margin: "0 auto"
    }
  }, ranks.map(function (_ref1, i) {
    var _ref10 = _slicedToArray(_ref1, 2),
      rank = _ref10[0],
      value = _ref10[1];
    var w = widths[i];
    var x = (420 - w) / 2;
    var y = i * 34 + 4;
    /* opaque tints (emerald mixed with white) so the dark-green text stays readable in dark mode */
    var a = 0.18 + (7 - i) * 0.08;
    var mix = function mix(c) {
      return Math.round(255 * (1 - a) + c * a);
    };
    return /*#__PURE__*/React.createElement("g", {
      key: rank
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: w,
      height: "28",
      rx: "7",
      fill: "rgb(".concat(mix(16), ",").concat(mix(185), ",").concat(mix(129), ")"),
      stroke: "#10b981",
      strokeWidth: "1.2"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 8,
      y: y + 19,
      fontSize: "11",
      fontWeight: "700",
      fill: "#064e3b"
    }, rank), /*#__PURE__*/React.createElement("text", {
      x: x + w - 8,
      y: y + 19,
      textAnchor: "end",
      fontSize: "11",
      fill: "#064e3b",
      fontStyle: i >= 5 ? "italic" : "normal"
    }, value));
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      textAlign: "center",
      fontSize: 12,
      marginTop: 8
    }
  }, "Mnemonic: Kings Play Chess On Fine Green Silk"));
}

/* ============================================================
   SECTION COMPONENTS
   ============================================================ */

function Section31(_ref11) {
  var progress = _ref11.progress,
    setProgress = _ref11.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "3.1 Classification of Living Things"), /*#__PURE__*/React.createElement("h1", null, "Grouping the living world"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "From microscopic bacteria to giant blue whales, scientists use a clever system to sort, name, and study every living thing on Earth.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/classify.png",
    caption: "Living things can be sorted into groups by the features they share."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.1",
    title: "Characteristics of living things",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "How do you know if something is alive? Scientists use a set of seven key characteristics. If something has all seven, it is living. The easiest way to remember them is the mnemonic ", /*#__PURE__*/React.createElement(Term, {
    def: "Movement, Reproduction, Sensitivity, Growth, Respiration, Excretion, Nutrition"
  }, "MRSGREN"), "."), /*#__PURE__*/React.createElement("p", null, "Think about a fire: it moves, it uses fuel, and it seems to grow. But it cannot reproduce on its own, it has no sensitivity to changes around it, and it does not grow in the biological sense. Fire is not alive. A tricky case is a ", /*#__PURE__*/React.createElement(Term, {
    def: "A tiny particle of genetic material surrounded by a protein coat; can only reproduce inside a living host cell"
  }, "virus"), ": it can reproduce, but only by hijacking a living cell, and it has no ", /*#__PURE__*/React.createElement(Term, {
    def: "All of the chemical reactions that keep a cell alive, including releasing energy from food"
  }, "metabolism"), " of its own. Most scientists say viruses are not truly alive."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "MRSGREN"
  }, "Movement, Reproduction, Sensitivity, Growth, Respiration, Excretion, Nutrition. All seven must be present for something to be classified as alive."), /*#__PURE__*/React.createElement(MrsgrenFlashcards, null), /*#__PURE__*/React.createElement(LivingThingsSorter, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "Which characteristic of living things does a plant show when it grows toward a light source?",
    options: ["Nutrition", "Sensitivity", "Excretion", "Reproduction"],
    correct: 1,
    explain: "Growing toward light is a response to a stimulus (light), so it shows sensitivity. It also involves movement, but sensitivity is the best match here."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 2,
    question: "A student says a car is alive because it moves and uses fuel. Which three MRSGREN characteristics does a car clearly lack? Explain each.",
    model: "A car cannot reproduce, it does not grow in the biological sense, and it has no sensitivity to stimuli on its own. It also does not carry out cellular respiration, excretion of metabolic waste, or obtain nutrition for growth."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.2",
    title: "Why classification matters",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "There are an estimated 8.7 million species on Earth, and scientists discover new ones every year. Without a ", /*#__PURE__*/React.createElement(Term, {
    def: "A system for grouping organisms based on shared characteristics and evolutionary relationships"
  }, "classification"), " system, communicating about all these organisms would be chaotic. Imagine if each country used a different name for the same animal!"), /*#__PURE__*/React.createElement("p", null, "Classification helps in medicine (identifying which organism causes a disease), conservation (tracking endangered species), agriculture (understanding pest relationships), and ecology (mapping food webs). When scientists find a new antibiotic-producing fungus, they use classification to find its relatives and predict what useful chemicals it might make."), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Did you know?"
  }, "When DNA analysis became possible in the 1990s, many organisms were completely reclassified. Whales turned out to be more closely related to hippos than to other hoofed animals."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "A new fungus is found in a Queensland rainforest. What is the first benefit of classifying it?",
    options: ["Predicting its properties by comparing it to known relatives", "Giving it an English common name", "Deciding whether to eat it", "Measuring its size"],
    correct: 0,
    explain: "By placing it in a group with known relatives, scientists can immediately predict its likely chemicals, behaviour, and biology. Classification lets you predict first, investigate second."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.3",
    title: "Binomial naming and the classification hierarchy",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "In 1758, Swedish naturalist ", /*#__PURE__*/React.createElement(Term, {
    def: "The scientist who invented the binomial naming system in 1758"
  }, "Carl Linnaeus"), " gave every species a two-part Latin name, called a ", /*#__PURE__*/React.createElement(Term, {
    def: "The scientific naming system giving every species a unique two-part name (genus + species)"
  }, "binomial name"), ". The first part is the genus (always capitalised), and the second part is the species (always lowercase). Both parts are written in italics or underlined when handwritten. So the domestic cat is written ", /*#__PURE__*/React.createElement("em", null, "Felis catus"), " and the grey wolf is ", /*#__PURE__*/React.createElement("em", null, "Canis lupus"), "."), /*#__PURE__*/React.createElement("p", null, "Organisms are grouped in a hierarchy of seven ranks from broadest to narrowest: ", /*#__PURE__*/React.createElement(Term, {
    def: "The broadest rank in classification"
  }, "Kingdom"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "Second rank; groups animals with the same body plan"
  }, "Phylum"), ", Class, Order, Family, ", /*#__PURE__*/React.createElement(Term, {
    def: "The second-to-last rank; organisms in the same genus are closely related"
  }, "Genus"), ", and ", /*#__PURE__*/React.createElement(Term, {
    def: "The most specific rank; members of the same species can interbreed"
  }, "Species"), ". The mnemonic to remember the order is: Kings Play Chess On Fine Green Silk. As you go down the hierarchy, organisms share more and more features."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Writing binomial names correctly"
  }, "Always capitalise the genus, always lowercase the species, always italicise (or underline if handwriting). Example: ", /*#__PURE__*/React.createElement("em", null, "Homo sapiens"), ", not \"homo Sapiens\" or \"Homo Sapiens\"."), /*#__PURE__*/React.createElement(ClassificationBuilder, null), /*#__PURE__*/React.createElement(KingdomSorter, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 4,
    question: "A student writes the wolf's scientific name as canis lupus (not italicised). How many errors has the student made?",
    options: ["One error (should be italicised)", "Two errors (Canis should be capitalised, and both words should be italicised)", "Three errors", "No errors"],
    correct: 1,
    explain: "There are two errors: (1) the genus name Canis must start with a capital letter, and (2) the whole name must be italicised when typed (or underlined when handwritten)."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 5,
    question: "Two animals share the same genus but different species names. What can you say about how closely related they are compared with two animals that share only the same family?",
    model: "Two organisms in the same genus are more closely related: they share a more recent common ancestor and have more features in common. Two organisms that share only the same family differ at the genus level too, meaning they have diverged further in evolutionary history."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.4",
    title: "Comparing structural features across organism groups",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Classification is based on what scientists can observe. By comparing ", /*#__PURE__*/React.createElement(Term, {
    def: "Physical features of an organism's body used to compare and classify it"
  }, "structural features"), " such as number of legs, body segments, skin type, and reproductive structures, you can work out which organisms are closely related. Features shared because of a common ancestor are called ", /*#__PURE__*/React.createElement(Term, {
    def: "Structures in different species that share a common evolutionary origin, even if they look different today"
  }, "homologous structures"), ". For example, your arm, a bat's wing, and a whale's flipper all share the same basic bone arrangement."), /*#__PURE__*/React.createElement("p", null, "Among the ", /*#__PURE__*/React.createElement(Term, {
    def: "The animal phylum with an exoskeleton, jointed limbs, and segmented body"
  }, "arthropods"), ", you can identify four groups by counting legs and segments: insects (6 legs, 3 body regions), arachnids (8 legs, 2 body regions, no antennae), crustaceans (10 or more legs, 2 pairs of antennae), and myriapods (many legs, one pair of antennae)."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Arthropod ID shortcut"
  }, "6 legs = insect. 8 legs, no antennae = arachnid. 10+ legs, 2 pairs of antennae = crustacean. Many legs, 1 pair of antennae = myriapod."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: "You find a bush invertebrate with 8 legs and no antennae. Which class does it belong to?",
    options: ["Insecta", "Arachnida", "Crustacea", "Myriapoda"],
    correct: 1,
    explain: "8 legs and no antennae are the defining features of Arachnida (spiders, scorpions, mites, ticks)."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.5",
    title: "Adaptations in Australian habitats",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Australia has some of the most unique habitats on Earth: arid deserts, tropical rainforests, fire-prone woodlands, and kelp forests. The organisms that live there have evolved ", /*#__PURE__*/React.createElement(Term, {
    def: "An inherited feature or behaviour that improves an organism's chance of surviving and reproducing in its environment"
  }, "adaptations"), " to suit their conditions. There are three types: ", /*#__PURE__*/React.createElement(Term, {
    def: "A physical body feature that aids survival, such as a thick coat or a long beak"
  }, "structural"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "An internal body process that aids survival, such as producing concentrated urine"
  }, "physiological"), ", and ", /*#__PURE__*/React.createElement(Term, {
    def: "A way of acting that aids survival, such as being nocturnal"
  }, "behavioural"), " adaptations."), /*#__PURE__*/React.createElement("p", null, "Australia has been isolated from other continents for about 45 million years. This has allowed a huge number of ", /*#__PURE__*/React.createElement(Term, {
    def: "Species found only in one place and nowhere else in the world"
  }, "endemic species"), " to evolve, including most of our marsupials. Many of these species have fascinating adaptations to Australia's harsh conditions."), /*#__PURE__*/React.createElement(AdaptationsExplorer, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Banksia and fire"
  }, "Some Banksia cones stay sealed for years. They only open after a bushfire heats them enough to melt the resin seal. This means seeds are released right after a fire, when nutrients from ash are available and competition from other plants is low."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 7,
    question: "Explain the difference between a structural adaptation and a behavioural adaptation. Give one example of each from an Australian desert animal.",
    model: "A structural adaptation is a physical body feature, for example the bilby's large ears filled with blood vessels that radiate excess heat. A behavioural adaptation is a way of acting, for example the bilby is nocturnal and shelters in burrows during the hottest part of the day to avoid extreme temperatures."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.6",
    title: "Dichotomous keys",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A tool for identifying unknown organisms by working through a series of paired statements, choosing one option at each step"
  }, "dichotomous key"), " works by offering you two choices at each step. You pick the one that matches your organism, and it leads you to the next step until you reach an identification. The word \"dichotomous\" comes from Greek meaning \"divided into two\". Keys can be written as numbered couplets or drawn as branching tree diagrams."), /*#__PURE__*/React.createElement("p", null, "Keys only work if your observations are careful and accurate. Making a wrong choice at step 1 will lead you to a completely wrong answer at the end. Always double-check your observation before choosing. Common features used in Australian invertebrate keys include number of legs, presence of wings, number of antennae, body segments, and type of mouthparts."), /*#__PURE__*/React.createElement(DichotomousKeyGame, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Accuracy matters"
  }, "One wrong observation ruins the whole key result. Always count carefully. If you get an odd result, go back to step 1 and start again."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 8,
    question: "A student uses a dichotomous key and gets the result 'centipede', but the organism actually has two pairs of legs per body segment. What went wrong and what is the correct answer?",
    options: ["The student miscounted body segments; it is actually a millipede", "The student miscounted leg pairs per segment; the correct answer is millipede (Diplopoda)", "The student used the wrong key; it is actually an insect", "No error; centipedes can have two pairs per segment"],
    correct: 1,
    explain: "Centipedes have one pair of legs per segment; millipedes have two pairs. The error was misidentifying how many leg pairs were present. The correct identification is millipede (Class Diplopoda)."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.1.7",
    title: "Aboriginal and Torres Strait Islander classification systems",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "For at least 60,000 years, ", /*#__PURE__*/React.createElement(Term, {
    def: "The knowledge, practices and beliefs about the natural environment developed by Aboriginal and Torres Strait Islander peoples over many thousands of years"
  }, "Aboriginal and Torres Strait Islander peoples"), " have developed detailed systems for organising the living world. Rather than focusing purely on physical similarity, these systems group organisms by their ", /*#__PURE__*/React.createElement("em", null, "uses"), " (food, medicine, tools, ceremony), their ", /*#__PURE__*/React.createElement("em", null, "form"), ", and their ", /*#__PURE__*/React.createElement("em", null, "function"), " in the ecosystem and in cultural life. This knowledge is closely tied to Country and to the spiritual relationships between people and nature."), /*#__PURE__*/React.createElement("p", null, "Plant and animal names in many Indigenous languages often encode ecological information: a name might reflect when a plant flowers, what it can be used for, or which habitat it grows in. This knowledge, called ", /*#__PURE__*/React.createElement(Term, {
    def: "Detailed knowledge of the environment built up over thousands of years and passed on through oral tradition and practice"
  }, "Traditional Ecological Knowledge (TEK)"), ", is now recognised by scientists as a valuable complement to Western science. Modern conservation managers increasingly work with Aboriginal communities to incorporate TEK into land management, including traditional fire-stick farming practices that maintain biodiversity."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Two valid systems"
  }, "The Linnaean system groups organisms by physical features and evolutionary relationships, and works globally. Indigenous classification systems group organisms by use, form, function, and relationship to Country, and encode detailed local ecological knowledge. Both are valid and useful ways of organising knowledge about the living world."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 9,
    question: "Describe one way that Traditional Ecological Knowledge could help modern conservation scientists protect a threatened Australian species.",
    model: "Aboriginal and Torres Strait Islander communities have observed species over many generations and can identify long-term changes in population size, behaviour, or habitat that short-term scientific studies would miss. For example, traditional fire management knowledge has helped conservation managers restore habitat for fire-adapted species by reintroducing controlled burning practices."
  }))));
}
function Section32(_ref12) {
  var progress = _ref12.progress,
    setProgress = _ref12.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "3.2 Cells"), /*#__PURE__*/React.createElement("h1", null, "The building blocks of life"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Every living thing, from a single bacterium to your own body, is built from cells. Explore what is inside them and how they work.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/cell.png",
    caption: "A plant cell (left) with its cell wall, chloroplasts and large vacuole, beside an animal cell (right), which has none of these."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.1",
    title: "Cell theory",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The three foundational statements of biology: all living things are made of cells; the cell is the basic unit of life; all cells come from pre-existing cells"
  }, "Cell theory"), " is one of the most important ideas in all of biology. It has three parts: (1) all living things are made of one or more cells, (2) the cell is the basic structural and functional unit of life, and (3) all cells come from pre-existing cells. That third statement was a big deal because it overturned the old idea of ", /*#__PURE__*/React.createElement(Term, {
    def: "The mistaken idea that life could arise spontaneously from non-living matter"
  }, "spontaneous generation"), ", which claimed that maggots could appear from nothing in rotting meat."), /*#__PURE__*/React.createElement("p", null, "Cell theory was built up slowly over about 200 years as microscopes improved. In 1665, ", /*#__PURE__*/React.createElement(Term, {
    def: "English scientist who first described cells when examining cork under a microscope in 1665"
  }, "Robert Hooke"), " looked at cork under a microscope and called the tiny compartments he saw \"cells\". In the 1670s, ", /*#__PURE__*/React.createElement(Term, {
    def: "Dutch scientist who used improved microscopes to observe living single-celled organisms"
  }, "Anton van Leeuwenhoek"), " spotted living single-celled organisms in pond water for the first time. In 1838 and 1839, ", /*#__PURE__*/React.createElement(Term, {
    def: "Botanist who proposed in 1838 that all plants are made of cells"
  }, "Matthias Schleiden"), " and ", /*#__PURE__*/React.createElement(Term, {
    def: "Zoologist who proposed in 1839 that all animals are made of cells"
  }, "Theodor Schwann"), " independently concluded that all organisms are made of cells. Then in 1855, ", /*#__PURE__*/React.createElement(Term, {
    def: "Scientist who completed cell theory in 1855 by stating all cells come from pre-existing cells"
  }, "Rudolf Virchow"), " added the third statement."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "The three statements of cell theory"
  }, "1. All living things are made of one or more cells. 2. The cell is the basic unit of life. 3. All cells come from pre-existing cells."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "Which scientist completed cell theory in 1855 by stating that all cells come from pre-existing cells?",
    options: ["Robert Hooke", "Matthias Schleiden", "Theodor Schwann", "Rudolf Virchow"],
    correct: 3,
    explain: "Rudolf Virchow added the third and final statement of cell theory in 1855, overturning the idea of spontaneous generation."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.2",
    title: "Cell structures common to plant and animal cells",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Both plant and animal cells are ", /*#__PURE__*/React.createElement(Term, {
    def: "Cells that have a membrane-bound nucleus and other membrane-bound organelles"
  }, "eukaryotic"), ", meaning they both have a membrane-bound nucleus and a range of other specialised structures called ", /*#__PURE__*/React.createElement(Term, {
    def: "Specialised structures inside a cell that carry out specific functions, like 'little organs'"
  }, "organelles"), ". The structures found in both cell types include the ", /*#__PURE__*/React.createElement(Term, {
    def: "A thin, flexible layer surrounding every cell that controls what enters and leaves"
  }, "cell membrane"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "The gel-like fluid filling the cell that suspends organelles and is the site of many reactions"
  }, "cytoplasm"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "The organelle containing DNA that controls all cell activities"
  }, "nucleus"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "Organelles that release energy from glucose through aerobic respiration"
  }, "mitochondria"), ", and ", /*#__PURE__*/React.createElement(Term, {
    def: "Tiny organelles that make proteins using instructions from DNA"
  }, "ribosomes"), "."), /*#__PURE__*/React.createElement("p", null, "However, plant cells have three extra structures that animal cells do not have: a ", /*#__PURE__*/React.createElement(Term, {
    def: "A rigid layer outside the cell membrane in plant cells, made of cellulose, that provides structural support"
  }, "cell wall"), " made of cellulose, ", /*#__PURE__*/React.createElement(Term, {
    def: "Organelles in plant cells that carry out photosynthesis and contain the green pigment chlorophyll"
  }, "chloroplasts"), ", and a ", /*#__PURE__*/React.createElement(Term, {
    def: "A large fluid-filled structure in plant cells that stores water and creates turgor pressure"
  }, "large central vacuole"), ". These extra structures reflect the plant's lifestyle: it is stationary, makes its own food using light, and needs support to stay upright."), /*#__PURE__*/React.createElement(PlantCellDiagram, null), /*#__PURE__*/React.createElement(AnimalCellDiagram, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 2,
    question: "Which set of structures are found in plant cells but NOT in typical animal cells?",
    options: ["Cell membrane, cytoplasm, nucleus", "Cell wall, chloroplasts, large central vacuole", "Mitochondria, ribosomes, cell membrane", "Nucleus, vacuole, mitochondria"],
    correct: 1,
    explain: "Cell wall (cellulose), chloroplasts, and large central vacuole are the three plant-only structures. Animal cells have all the others."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.3",
    title: "Functions of key cell structures",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Every structure in a cell has a specific job. The ", /*#__PURE__*/React.createElement(Term, {
    def: "A thin phospholipid layer surrounding every cell that acts as a selective barrier"
  }, "cell membrane"), " acts like a selective gate, letting in oxygen and glucose while letting out waste like carbon dioxide. The ", /*#__PURE__*/React.createElement(Term, {
    def: "Gel-like fluid filling the cell; site of many chemical reactions; suspends organelles"
  }, "cytoplasm"), " is the medium where most reactions happen. The ", /*#__PURE__*/React.createElement(Term, {
    def: "The control centre of the cell; contains DNA and directs all activities including growth and reproduction"
  }, "nucleus"), " is the control centre, holding the DNA instructions for everything the cell does."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "Organelles that carry out aerobic respiration; release energy as ATP from glucose"
  }, "Mitochondria"), " are the powerhouses of the cell. They take in glucose and oxygen, and release energy in a usable form called ", /*#__PURE__*/React.createElement(Term, {
    def: "Adenosine triphosphate; the energy currency used to power all cell activities"
  }, "ATP"), ". You can think of ATP as a rechargeable battery that powers all cell work. ", /*#__PURE__*/React.createElement(Term, {
    def: "Organelles in plant cells that carry out photosynthesis; contain chlorophyll which absorbs light energy"
  }, "Chloroplasts"), " are found in plant cells and algae, but not in animal cells. They capture light energy and use it to build glucose from carbon dioxide and water, a process called ", /*#__PURE__*/React.createElement(Term, {
    def: "The process by which plants use light energy, carbon dioxide and water to make glucose and oxygen"
  }, "photosynthesis"), "."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Structure = function"
  }, "In biology, a cell's shape and contents always match its job. Lots of mitochondria = lots of energy needed. Lots of chloroplasts = makes lots of food via photosynthesis."), /*#__PURE__*/React.createElement(EnergyEquationSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "A muscle cell needs a huge amount of energy to contract. Which organelle would you expect to find in very large numbers in a muscle cell?",
    options: ["Chloroplasts", "Cell wall", "Mitochondria", "Large central vacuole"],
    correct: 2,
    explain: "Mitochondria produce ATP through aerobic respiration. More mitochondria means more ATP, which is exactly what an energy-demanding muscle cell needs."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "Explain how the nucleus and mitochondria work together to allow a cell to carry out aerobic respiration.",
    model: "The nucleus contains DNA with instructions for making enzymes. These instructions are sent to ribosomes, which make the enzymes. The enzymes then work inside the mitochondria to carry out the reactions of aerobic respiration, releasing ATP from glucose. Without the nucleus providing instructions, the mitochondria could not make the proteins they need to function."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.4",
    title: "Comparing plant and animal cells",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Under a microscope, plant and animal cells look quite different. Plant cells are usually ", /*#__PURE__*/React.createElement(Term, {
    def: "Having a boxy, right-angled shape, like a rectangle in 2D cross-section"
  }, "rectangular"), " because their rigid cellulose wall holds them in that shape. The large central vacuole pushes the cytoplasm and nucleus to the edges of the cell. Animal cells are more irregular in shape, rounded or stretched, with the nucleus usually sitting in the centre."), /*#__PURE__*/React.createElement("p", null, "Plant cells in green parts of the plant (like leaves) have a green tint from their chloroplasts. Root cells, however, have no chloroplasts because they are underground and receive no light. The large central vacuole in a turgid plant cell pushes outward against the cell wall, creating ", /*#__PURE__*/React.createElement(Term, {
    def: "The pressure exerted by the vacuole against the cell wall, keeping the cell rigid and the plant upright"
  }, "turgor pressure"), ", which is what keeps plants standing upright. When a plant wilts, it is because the vacuoles have lost water and turgor pressure has dropped."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "A scientist views a cell under the microscope: it is rectangular, has a large clear space in the middle, and no visible chloroplasts. Could this be a plant cell?",
    options: ["No, plant cells always have chloroplasts", "No, plant cells are never rectangular", "Yes, root cells and storage cells are plant cells without chloroplasts", "Yes, but only if the cell wall is stained"],
    correct: 2,
    explain: "Not all plant cells have chloroplasts. Only cells in green parts of the plant have them. Root cells, storage cells, and many others are plant cells that lack chloroplasts but still have a cell wall and vacuole."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.5",
    title: "Observing cells with microscopes",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The compound microscope magnifies specimens by passing light through a series of lenses. Total magnification = eyepiece lens magnification x objective lens magnification. A 10x eyepiece with a 40x objective gives 400x total magnification. To prepare a ", /*#__PURE__*/React.createElement(Term, {
    def: "A microscope slide where a sample is placed in a drop of water and covered with a coverslip"
  }, "wet mount slide"), ", you place your sample in a drop of water on a glass slide, then lower a coverslip slowly to avoid trapping air bubbles."), /*#__PURE__*/React.createElement("p", null, "Stains make structures easier to see. ", /*#__PURE__*/React.createElement(Term, {
    def: "A yellow-brown stain that makes the nucleus and starch grains easier to see in plant cells"
  }, "Iodine solution"), " is used for plant cells, while ", /*#__PURE__*/React.createElement(Term, {
    def: "A blue stain that makes the nucleus of animal and fungal cells visible"
  }, "methylene blue"), " is used for animal and fungal cells. Scientific drawings of cells must be in pencil, with clear outlines, ruled label lines, a title, and the magnification stated. Never shade or add artistic detail. Only draw what you actually see."), /*#__PURE__*/React.createElement(VirtualMicroscope, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Biological drawing rules"
  }, "Pencil only. Clear, single outlines. No shading. Label lines with a ruler. Write labels horizontally. Include a title and magnification. Only draw what you observe."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: "You use a microscope with a 10x eyepiece and a 40x objective. What is the total magnification?",
    options: ["40x", "50x", "400x", "4000x"],
    correct: 2,
    explain: "Total magnification = eyepiece x objective = 10 x 40 = 400x."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 7,
    question: "Describe two visible differences between an onion epidermal cell (plant) and a human cheek cell (animal) when viewed under the microscope.",
    model: "1. Onion cells have a visible cell wall, giving them a rectangular shape with straight edges. Cheek cells have no cell wall and appear irregular or rounded. 2. Onion cells have a large central vacuole (a clear space in the middle), which cheek cells lack. The nucleus in cheek cells is more prominent and central, whereas in plant cells it is pushed to the edge by the vacuole."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.6",
    title: "Respiration and photosynthesis in organelles",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The process that releases energy from glucose in the mitochondria: glucose + oxygen produces carbon dioxide + water + ATP"
  }, "Cellular respiration"), " and ", /*#__PURE__*/React.createElement(Term, {
    def: "The process in chloroplasts that uses light energy to convert carbon dioxide and water into glucose and oxygen"
  }, "photosynthesis"), " are the two most important energy processes in biology. They are essentially opposite reactions. Photosynthesis builds glucose from carbon dioxide and water using light energy. Respiration breaks glucose down to release that stored energy as ATP. Together they form a continuous energy cycle that drives almost all life on Earth."), /*#__PURE__*/React.createElement("p", null, "Mitochondria have a special internal structure: the inner membrane is folded into finger-like projections called ", /*#__PURE__*/React.createElement(Term, {
    def: "Folds of the inner mitochondrial membrane that increase surface area for aerobic respiration"
  }, "cristae"), ", which greatly increase the surface area available for respiration reactions. Chloroplasts have stacks of flattened membranes called ", /*#__PURE__*/React.createElement(Term, {
    def: "Stacks of flattened membrane discs inside chloroplasts where chlorophyll is held and light reactions occur"
  }, "thylakoids"), ", where the green pigment ", /*#__PURE__*/React.createElement(Term, {
    def: "The green pigment in chloroplasts that absorbs light energy for photosynthesis"
  }, "chlorophyll"), " sits and absorbs light. At night, plants cannot photosynthesise but they keep on respiring, using the glucose stored from the day's photosynthesis."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Word equations"
  }, "Respiration: glucose + oxygen produces carbon dioxide + water + energy. Photosynthesis: carbon dioxide + water produces glucose + oxygen (needs light)."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 8,
    question: "Where exactly does photosynthesis take place inside a plant cell?",
    options: ["In the mitochondria", "In the nucleus", "In the chloroplasts", "In the vacuole"],
    correct: 2,
    explain: "Photosynthesis takes place in the chloroplasts, where the green pigment chlorophyll absorbs light energy to power the reactions."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.7",
    title: "Drawing single-celled organisms",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Many organisms consist of just one cell that does everything a living thing needs to do. These ", /*#__PURE__*/React.createElement(Term, {
    def: "Organisms whose entire body is a single cell that carries out all life processes"
  }, "unicellular organisms"), " include bacteria (", /*#__PURE__*/React.createElement(Term, {
    def: "Organisms whose cells lack a membrane-bound nucleus"
  }, "prokaryotes"), ") and a range of eukaryotic organisms called ", /*#__PURE__*/React.createElement(Term, {
    def: "A diverse group of mostly single-celled eukaryotic organisms including Amoeba, Paramecium, Euglena, and algae"
  }, "protists"), ". Despite being tiny, they can be surprisingly complex inside."), /*#__PURE__*/React.createElement("p", null, "Common examples you might view under a microscope include: ", /*#__PURE__*/React.createElement(Term, {
    def: "A protist that moves using pseudopodia (false feet) and has no fixed shape"
  }, "Amoeba"), " (irregular shape, moves by flowing pseudopodia), ", /*#__PURE__*/React.createElement(Term, {
    def: "A slipper-shaped protist covered in cilia for swimming"
  }, "Paramecium"), " (slipper shape, covered in cilia), ", /*#__PURE__*/React.createElement(Term, {
    def: "A protist with both a flagellum and chloroplasts; can photosynthesise or feed as an animal depending on light"
  }, "Euglena"), " (has both a flagellum and chloroplasts), and yeast (oval fungal cells that bud off daughter cells). When drawing them, follow all the rules of biological drawing. Because they move quickly, you may need to use a still image or slow the sample by adding a drop of methyl cellulose."), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Euglena: both plant and animal?"
  }, "Euglena has chloroplasts like a plant AND can feed on organic matter like an animal. Scientists call this mixotrophic nutrition. It shows that the line between kingdoms is not always sharp."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 9,
    question: "An Amoeba moves by extending temporary projections of cytoplasm. What are these projections called?",
    options: ["Cilia", "Flagella", "Pseudopodia", "Axons"],
    correct: 2,
    explain: "Pseudopodia (meaning 'false feet') are temporary extensions of cytoplasm that an Amoeba uses to move and to engulf food."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.8",
    title: "Specialised cells in multicellular organisms",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "In a ", /*#__PURE__*/React.createElement(Term, {
    def: "An organism whose body is made of many specialised cells working together"
  }, "multicellular organism"), ", cells can divide the labour among themselves. Each cell type becomes highly efficient at one job, allowing the whole organism to be far more complex than any single cell could be. This is called ", /*#__PURE__*/React.createElement(Term, {
    def: "The process by which cells in a multicellular organism develop different structures and functions"
  }, "cell specialisation"), ". The trade-off is that specialised cells cannot survive alone; they depend on other cell types to do the jobs they have given up."), /*#__PURE__*/React.createElement("p", null, "Specialised cells are grouped into ", /*#__PURE__*/React.createElement(Term, {
    def: "A group of similar cells working together to perform a specific function"
  }, "tissues"), ", tissues are organised into ", /*#__PURE__*/React.createElement(Term, {
    def: "A structure made of several tissue types working together to perform a complex function"
  }, "organs"), ", and organs that work together form ", /*#__PURE__*/React.createElement(Term, {
    def: "A group of organs that cooperate to carry out a major body function"
  }, "organ systems"), ". Almost every body cell in an organism contains the same DNA (red blood cells, which lose their nucleus, are an exception). The difference between, say, a muscle cell and a nerve cell is not what DNA they have, but which genes are switched on during development."), /*#__PURE__*/React.createElement(TissueOrganSVG, null), /*#__PURE__*/React.createElement(SpecialisedCellMatcher, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 10,
    question: "Why does a red blood cell have no nucleus?",
    options: ["Nuclei are only needed in plant cells", "Losing the nucleus makes more room for haemoglobin, increasing its oxygen-carrying capacity", "Red blood cells are prokaryotic", "The nucleus is stored in plasma instead"],
    correct: 1,
    explain: "Red blood cells sacrifice their nucleus during development to pack in more haemoglobin. This maximises the amount of oxygen each cell can carry, but means the cell cannot repair itself or reproduce."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.9",
    title: "Cells in tissues and organs",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The arrangement of cells in a tissue directly reflects the tissue's function. In a leaf, the ", /*#__PURE__*/React.createElement(Term, {
    def: "Tightly packed, column-shaped cells just below the upper leaf surface, packed with chloroplasts for maximum photosynthesis"
  }, "palisade mesophyll"), " cells are tall and tightly packed near the top surface to capture as much light as possible. Below them, the ", /*#__PURE__*/React.createElement(Term, {
    def: "Loosely arranged cells with large air spaces between them, allowing gas exchange to support photosynthesis"
  }, "spongy mesophyll"), " cells sit in a loose network with large air spaces, allowing carbon dioxide to diffuse in and oxygen to diffuse out."), /*#__PURE__*/React.createElement("p", null, "An organ is made of multiple tissue types working together. The leaf is an organ containing epidermal tissue (protection), mesophyll tissue (photosynthesis), vascular tissue (transport of water and glucose), and guard cells (gas exchange control). The human heart contains cardiac muscle tissue, connective tissue, nervous tissue, and epithelial tissue, all cooperating to pump blood continuously throughout your life."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 11,
    question: "Explain how the arrangement of palisade and spongy mesophyll tissue in a leaf allows photosynthesis to work efficiently.",
    model: "Palisade cells are tightly packed near the upper leaf surface, where they receive the most direct light. Their many chloroplasts absorb this light for photosynthesis. The loosely packed spongy mesophyll below creates air spaces connected to the stomata, allowing carbon dioxide to diffuse from outside the leaf to the palisade cells, and oxygen produced by photosynthesis to diffuse out. The two layers work together: palisade for light capture and spongy for gas exchange."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.10",
    title: "Structure and function in specialised cells",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A core principle of biology is that ", /*#__PURE__*/React.createElement(Term, {
    def: "The idea that the specific physical features of a cell directly allow it to carry out its particular function"
  }, "structure determines function"), ". Look at any specialised cell and you can predict its job from its shape and contents. A ", /*#__PURE__*/React.createElement(Term, {
    def: "A male reproductive cell with a long flagellum, mitochondria-rich mid-piece, and DNA-packed head, designed to swim to an egg"
  }, "sperm cell"), " has a streamlined head packed with DNA, a mid-section loaded with mitochondria, and a long ", /*#__PURE__*/React.createElement(Term, {
    def: "A whip-like extension of a cell used for movement"
  }, "flagellum"), " for swimming. Every feature serves its purpose: the shape cuts through fluid, the mitochondria power the flagellum, and the head delivers DNA to the egg."), /*#__PURE__*/React.createElement("p", null, "A red blood cell is a biconcave disc with no nucleus and is packed with ", /*#__PURE__*/React.createElement(Term, {
    def: "The oxygen-carrying protein in red blood cells"
  }, "haemoglobin"), ". The indented shape increases surface area for oxygen to diffuse in and out, and the lack of a nucleus leaves more room for haemoglobin. Intestinal epithelial cells have tiny finger-like projections called ", /*#__PURE__*/React.createElement(Term, {
    def: "Tiny finger-like projections on the surface of intestinal cells that increase surface area for nutrient absorption"
  }, "microvilli"), " that greatly increase their surface area for absorbing nutrients."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Structure tells you the function"
  }, "Many mitochondria means high energy demand. Long thin extension means high surface area for absorption. Biconcave disc shape means designed for carrying gases. You can read a cell's job from how it looks."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 12,
    question: "A root hair cell has a long, thin extension projecting into the soil. How does this structural feature help the cell do its job?",
    options: ["It allows the cell to photosynthesise underground", "It greatly increases surface area, speeding up absorption of water and minerals from soil", "It helps the cell produce more mitochondria", "It protects the cell from predators"],
    correct: 1,
    explain: "The long thin extension dramatically increases the surface area of the cell membrane in contact with soil water. More surface area means faster absorption of water and dissolved mineral ions by diffusion and active transport."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.2.11",
    title: "Observing specialised cells on prepared slides",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Prepared slides are made by professional laboratories: tissue is fixed (preserved), sliced into very thin sections, mounted on glass, and stained. A common stain is ", /*#__PURE__*/React.createElement(Term, {
    def: "A two-colour stain used on prepared slides: haematoxylin stains nuclei purple-blue and eosin stains cytoplasm pink"
  }, "haematoxylin and eosin (H and E)"), ", which colours the nucleus purple-blue and the cytoplasm pink. Unlike fresh wet mounts, prepared slides are permanent and can be reused, making them ideal for comparing multiple cell types."), /*#__PURE__*/React.createElement("p", null, "When you examine a prepared slide, record: the shape and size of cells, the appearance and position of the nucleus, any specialised visible structures (striations in muscle, long axons in nerve cells, or chloroplasts in plant sections), and how cells are arranged relative to each other. Then you can link what you see to structure-function relationships."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Identifying cell types from a slide"
  }, "Rectangular cells with thick borders = plant cells. Striped long fibres = muscle tissue. Branching extensions = neurons. Tiny dots with no visible nucleus = bacteria."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 13,
    question: "You observe a prepared slide showing long, cylindrical cells with a striped pattern across them. What cell type is this, and what causes the striped pattern?",
    model: "These are skeletal or cardiac muscle cells. The striped (striated) pattern is caused by the regular, repeating arrangement of the contractile proteins actin and myosin inside the cell. These proteins are organised into overlapping bands that give the cell its characteristic striped appearance under the microscope."
  }))));
}
function Section33(_ref13) {
  var progress = _ref13.progress,
    setProgress = _ref13.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "3.3 Cells and Classification in Context"), /*#__PURE__*/React.createElement("h1", null, "Putting it all together"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Apply everything you have learned to a real organism. The platypus is one of the most extraordinary animals on Earth and a perfect case study.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/aussie-organism.png",
    caption: "The platypus \u2014 a uniquely Australian mammal.",
    maxWidth: "380px"
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "3.3.1",
    title: "Researching an organism to connect cells and classification",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A complete understanding of any organism means knowing its classification (kingdom to species), its cell type and organelles, and how it demonstrates all seven characteristics of living things. Choosing an Australian organism lets you also explore adaptations and Indigenous classification. The ", /*#__PURE__*/React.createElement(Term, {
    def: "An Australian egg-laying mammal (monotreme) with electroreceptors in its bill for detecting prey"
  }, "platypus"), " (", /*#__PURE__*/React.createElement("em", null, "Ornithorhynchus anatinus"), ") is an ideal case study. When the first preserved specimen arrived in England in 1799, scientists thought it was a fake taxidermist creation. It was just too unusual to believe."), /*#__PURE__*/React.createElement("p", null, "The platypus is a ", /*#__PURE__*/React.createElement(Term, {
    def: "An egg-laying mammal; the only two Australian monotremes are the platypus and the echidna"
  }, "monotreme"), ", an egg-laying mammal. Despite laying eggs, it is clearly a mammal: it has fur, is warm-blooded, has three middle ear bones, and the female feeds her young on milk. Its cells are eukaryotic animal cells with a cell membrane, nucleus, mitochondria, and ribosomes, but no cell wall, no chloroplasts, and no large vacuole. The bill contains about 40,000 ", /*#__PURE__*/React.createElement(Term, {
    def: "Sensory cells that detect electric fields; the platypus uses them to find prey in murky water"
  }, "electroreceptors"), ", the most sensitive electric-field detection system known in any mammal."), /*#__PURE__*/React.createElement(PlatypusClassificationSVG, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Diving on a breath"
  }, "A platypus can hold its breath for 30 to 140 seconds while hunting underwater, using electroreception to locate worms, yabbies, and insect larvae even in pitch-dark, murky water with its eyes and ears closed."), /*#__PURE__*/React.createElement(ClassificationBuilder, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 14,
    question: "The platypus lays eggs, yet it is classified as a mammal. Which feature is most important for placing it in Class Mammalia?",
    options: ["Laying eggs", "Having a duck-like bill", "Having fur and producing milk for young", "Living near water"],
    correct: 2,
    explain: "Classification is based on a combination of features. The platypus shares the key mammalian features: fur, warm-bloodedness, three middle ear bones, and milk production. Egg-laying is a primitive ancestral feature retained from early mammals."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 15,
    question: "Using MRSGREN, give one specific piece of evidence for each characteristic of living things in the platypus.",
    model: "Movement: swims with front webbed feet, walks on land. Reproduction: lays 1 to 3 soft-shelled eggs; female secretes milk through skin patches for young. Sensitivity: bill contains 40,000 electroreceptors that detect electric fields of prey. Growth: hatchlings (1.5 cm) grow to adults (30 to 60 cm) over about 12 months. Respiration: aerobic; breathes at the surface; mitochondria in muscle cells release ATP from glucose. Excretion: kidneys produce urine and remove urea; CO2 exhaled through lungs. Nutrition: carnivorous; dives to find invertebrates using electroreception."
  }))));
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
    "stain": "A dye used in microscopy to increase contrast and make cell structures more visible (e.g. iodine for plant cells, methylene blue for animal cells)."
  },
  sections: [{
    id: "3.1",
    label: "Classification",
    accent: "emerald",
    blurb: "Sort, name, and study the diversity of life on Earth.",
    points: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5", "3.1.6", "3.1.7"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section31, p);
    }
  }, {
    id: "3.2",
    label: "Cells",
    accent: "teal",
    blurb: "Explore the structure and function of life's building blocks.",
    points: ["3.2.1", "3.2.2", "3.2.3", "3.2.4", "3.2.5", "3.2.6", "3.2.7", "3.2.8", "3.2.9", "3.2.10", "3.2.11"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section32, p);
    }
  }, {
    id: "3.3",
    label: "In Context",
    accent: "green",
    blurb: "Apply cells and classification to a real Australian organism.",
    points: ["3.3.1"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section33, p);
    }
  }]
});
