import type { Session, Week } from "./types";

const sessions: Session[] = [
  // —— Week 1 ——
  {
    id: "w1a",
    week: 1,
    letter: "A",
    title: "Clean First Touches",
    focus: "control",
    summary:
      "Build soft, directional first touches with both feet before anything fancy.",
    totalMinutes: 30,
    fieldStretch: "If you have a larger field, stretch the receiving lane to 5 yd.",
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Control",
        minutes: 14,
        drillId: "first-touch-away",
        notes: "Quality over speed. Count only touches that stay in the lane.",
      },
      {
        label: "Secondary · Footwork",
        minutes: 8,
        drillId: "ladder-ball-rhythm",
        notes: "Easy ladder speed — focus on the first touch onto the ball.",
      },
      { label: "Finisher", minutes: 4, drillId: "finisher-rl-goals" },
    ],
  },
  {
    id: "w1b",
    week: 1,
    letter: "B",
    title: "Sole & Gate Control",
    focus: "footwork",
    summary: "Sole rolls and gate weaves to glue the ball to both feet.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Footwork",
        minutes: 14,
        drillId: "sole-roll-gates",
        notes: "Odd gates R sole, even gates L sole — no cheating the pattern.",
      },
      {
        label: "Secondary · Control",
        minutes: 8,
        drillId: "inside-outside-boxes",
      },
      { label: "Finisher", minutes: 4, drillId: "finisher-rl-goals" },
    ],
  },
  {
    id: "w1c",
    week: 1,
    letter: "C",
    title: "Plant Foot Foundations",
    focus: "power",
    summary:
      "Learn where the plant foot goes so power shots stay accurate with both feet.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Power",
        minutes: 14,
        drillId: "power-plant-markers",
        notes: "Alternate R/L every shot. Rest between sets — no blasting cold.",
      },
      {
        label: "Secondary · Control",
        minutes: 8,
        drillId: "mannequin-shield",
      },
      { label: "Finisher", minutes: 4, drillId: "driven-near-far" },
    ],
  },
  // —— Week 2 ——
  {
    id: "w2a",
    week: 2,
    letter: "A",
    title: "Box Touches Under Control",
    focus: "control",
    summary: "Inside/outside perimeter work that forces the weak foot to lead.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Control",
        minutes: 14,
        drillId: "inside-outside-boxes",
        notes: "Equal clockwise (R) and counterclockwise (L) laps.",
      },
      {
        label: "Secondary · Footwork",
        minutes: 8,
        drillId: "disk-quick-gates",
      },
      { label: "Finisher", minutes: 4, drillId: "finisher-rl-goals" },
    ],
  },
  {
    id: "w2b",
    week: 2,
    letter: "B",
    title: "Ladder Rhythm + Ball",
    focus: "footwork",
    summary: "Connect quick feet to a calm first touch — both lead legs.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Footwork",
        minutes: 14,
        drillId: "ladder-ball-rhythm",
        notes: "Odd reps lead R, even lead L. First touch with the opposite foot.",
      },
      {
        label: "Secondary · Control",
        minutes: 8,
        drillId: "sole-roll-gates",
      },
      {
        label: "Finisher",
        minutes: 4,
        drillId: "ladder-cut-shoot",
        notes: "Cut R / shoot L, then cut L / shoot R.",
      },
    ],
  },
  {
    id: "w2c",
    week: 2,
    letter: "C",
    title: "Near & Far Driven Shots",
    focus: "power",
    summary: "Pick a target, plant, and drive — same reps each foot.",
    totalMinutes: 30,
    fieldStretch: "On a larger field, start at 16 yd while keeping the same cues.",
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Power",
        minutes: 14,
        drillId: "driven-near-far",
        notes: "Sequence R near, L near, R far, L far.",
      },
      {
        label: "Secondary · Footwork",
        minutes: 8,
        drillId: "pole-slalom",
      },
      { label: "Finisher", minutes: 4, drillId: "finisher-rl-goals" },
    ],
  },
  // —— Week 3 ——
  {
    id: "w3a",
    week: 3,
    letter: "A",
    title: "Shield, Escape, Keep It",
    focus: "control",
    summary: "Use the mannequin to practice body shape and dual-foot escapes.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Control",
        minutes: 14,
        drillId: "mannequin-shield",
        notes: "Shield R → escape L, then shield L → escape R.",
      },
      {
        label: "Secondary · Footwork",
        minutes: 8,
        drillId: "pole-figure8",
      },
      { label: "Finisher", minutes: 4, drillId: "control-turn-shoot" },
    ],
  },
  {
    id: "w3b",
    week: 3,
    letter: "B",
    title: "Tight Pole Weaves",
    focus: "footwork",
    summary: "Smaller spaces, higher touch frequency, equal R/L starts.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Footwork",
        minutes: 14,
        drillId: "pole-slalom",
        notes: "Tighten poles to ~1.5 yd. Two runs R-start, two L-start, two mixed.",
      },
      {
        label: "Secondary · Control",
        minutes: 8,
        drillId: "first-touch-away",
      },
      { label: "Finisher", minutes: 4, drillId: "finisher-rl-goals" },
    ],
  },
  {
    id: "w3c",
    week: 3,
    letter: "C",
    title: "Finish Around the Blocker",
    focus: "power",
    summary: "Attack the mannequin at speed and finish with either foot.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Power",
        minutes: 14,
        drillId: "mannequin-blocker-finish",
        notes: "Alternate approach sides every rep. Walk-back recoveries.",
      },
      {
        label: "Secondary · Footwork",
        minutes: 8,
        drillId: "disk-quick-gates",
      },
      { label: "Finisher", minutes: 4, drillId: "driven-near-far" },
    ],
  },
  // —— Week 4 ——
  {
    id: "w4a",
    week: 4,
    letter: "A",
    title: "Receive Under Pressure Shape",
    focus: "control",
    summary: "Across-body first touches into a turn and shot pattern.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Control",
        minutes: 14,
        drillId: "control-turn-shoot",
        notes: "Receive/turn R → shoot L; then receive/turn L → shoot R.",
      },
      {
        label: "Secondary · Footwork",
        minutes: 8,
        drillId: "ladder-ball-rhythm",
      },
      { label: "Finisher", minutes: 4, drillId: "mannequin-blocker-finish" },
    ],
  },
  {
    id: "w4b",
    week: 4,
    letter: "B",
    title: "Figure-8 Foot Speed",
    focus: "footwork",
    summary: "Continuous figure-8s around poles with forced weak-foot circles.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Footwork",
        minutes: 14,
        drillId: "pole-figure8",
        notes: "Complete the single-foot circles before free figure-8 rounds.",
      },
      {
        label: "Secondary · Control",
        minutes: 8,
        drillId: "inside-outside-boxes",
      },
      {
        label: "Finisher",
        minutes: 4,
        drillId: "ladder-cut-shoot",
      },
    ],
  },
  {
    id: "w4c",
    week: 4,
    letter: "C",
    title: "Wall Combo Power",
    focus: "power",
    summary: "Give-and-go into a driven strike — mirrored patterns each foot.",
    totalMinutes: 30,
    fieldStretch: "If no fence, use a parent as a wall passer at the same distance.",
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Power",
        minutes: 14,
        drillId: "wall-pass-shoot",
        notes: "Pass R / receive L / shoot R, then the full reverse pattern.",
      },
      {
        label: "Secondary · Control",
        minutes: 8,
        drillId: "mannequin-shield",
      },
      { label: "Finisher", minutes: 4, drillId: "finisher-rl-goals" },
    ],
  },
  // —— Week 5 ——
  {
    id: "w5a",
    week: 5,
    letter: "A",
    title: "Tight Gates, Game Speed",
    focus: "control",
    summary: "Smaller gates and faster decisions while keeping both feet honest.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Control",
        minutes: 14,
        drillId: "sole-roll-gates",
        notes: "Use the progression: 1 yd gates + 180° sole turn at each end.",
      },
      {
        label: "Secondary · Power",
        minutes: 8,
        drillId: "power-plant-markers",
        notes: "Shorter set — 4 clean shots each foot focusing on plant foot.",
      },
      { label: "Finisher", minutes: 4, drillId: "finisher-rl-goals" },
    ],
  },
  {
    id: "w5b",
    week: 5,
    letter: "B",
    title: "Ladder Cut Into the Shot",
    focus: "footwork",
    summary: "Link footwork to finishing with opposite-foot shot patterns.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Footwork",
        minutes: 14,
        drillId: "ladder-cut-shoot",
        notes: "Add mannequin before the cut if space allows.",
      },
      {
        label: "Secondary · Control",
        minutes: 8,
        drillId: "disk-quick-gates",
      },
      { label: "Finisher", minutes: 4, drillId: "driven-near-far" },
    ],
  },
  {
    id: "w5c",
    week: 5,
    letter: "C",
    title: "Two-Goal Power Channel",
    focus: "power",
    summary: "Continuous driven finishing into both goals with strict R/L alternation.",
    totalMinutes: 30,
    fieldStretch: "Stretch goals toward 28–30 yd on a full field for longer run-ups.",
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Power",
        minutes: 14,
        drillId: "two-goal-channel",
        notes: "Skip a shot rather than slash — technique first under fatigue.",
      },
      {
        label: "Secondary · Footwork",
        minutes: 8,
        drillId: "pole-slalom",
      },
      { label: "Finisher", minutes: 4, drillId: "mannequin-blocker-finish" },
    ],
  },
  // —— Week 6 ——
  {
    id: "w6a",
    week: 6,
    letter: "A",
    title: "Pressure Receive Capstone",
    focus: "control",
    summary: "Week 6 control check: first touch, turn, and finish both ways.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Control",
        minutes: 14,
        drillId: "control-turn-shoot",
        notes: "Progression: two-touch max (receive-turn + shoot).",
      },
      {
        label: "Secondary · Footwork",
        minutes: 8,
        drillId: "pole-figure8",
      },
      { label: "Finisher", minutes: 4, drillId: "finisher-rl-goals" },
    ],
  },
  {
    id: "w6b",
    week: 6,
    letter: "B",
    title: "Full Footwork Circuit",
    focus: "footwork",
    summary: "Poles + ladder patterns at match tempo with equal lead feet.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Footwork",
        minutes: 14,
        drillId: "pole-slalom",
        notes: "1 yd spacing. Weak foot must take every other touch on mixed runs.",
      },
      {
        label: "Secondary · Control",
        minutes: 8,
        drillId: "first-touch-away",
      },
      { label: "Finisher", minutes: 4, drillId: "ladder-cut-shoot" },
    ],
  },
  {
    id: "w6c",
    week: 6,
    letter: "C",
    title: "Power Under the Clock",
    focus: "power",
    summary:
      "Capstone shooting: plant markers, blocker finishes, and timed R/L rounds.",
    totalMinutes: 30,
    blocks: [
      { label: "Warm-up", minutes: 4, drillId: "warmup-both-feet" },
      {
        label: "Primary · Power",
        minutes: 14,
        drillId: "power-plant-markers",
        notes: "Move back 3–4 yd on the second set if mechanics stay clean.",
      },
      {
        label: "Secondary · Power",
        minutes: 8,
        drillId: "mannequin-blocker-finish",
        notes: "Far-post only for this block.",
      },
      {
        label: "Finisher",
        minutes: 4,
        drillId: "finisher-rl-goals",
        notes: "Track makes per foot — chase equal makes, not just attempts.",
      },
    ],
  },
];

const weekMeta: { number: number; theme: string; goal: string }[] = [
  {
    number: 1,
    theme: "Clean Contact",
    goal: "Soft first touches and a reliable plant foot on both sides.",
  },
  {
    number: 2,
    theme: "Rhythm & Targets",
    goal: "Connect footwork rhythm to accurate driven shots with each foot.",
  },
  {
    number: 3,
    theme: "Tight Spaces",
    goal: "Keep the ball under pressure from poles and the mannequin.",
  },
  {
    number: 4,
    theme: "Turn & Strike",
    goal: "Receive, turn past a blocker, and finish with the opposite foot.",
  },
  {
    number: 5,
    theme: "Game-Speed Power",
    goal: "Add pace without losing weak-foot quality or plant-foot discipline.",
  },
  {
    number: 6,
    theme: "Capstone Dual Foot",
    goal: "Prove equal R/L volume under time pressure in control, footwork, and finishing.",
  },
];

export const weeks: Week[] = weekMeta.map((meta) => ({
  ...meta,
  sessions: sessions.filter((s) => s.week === meta.number),
}));

export const allSessions = sessions;

export function getWeek(n: number): Week | undefined {
  return weeks.find((w) => w.number === n);
}

export function getSession(id: string): Session | undefined {
  return sessions.find((s) => s.id === id);
}

export const programIntro = {
  name: "Panda Soccer Labs Backyard Program",
  player: "Competitive U12 · 6 years playing",
  duration: "6 weeks",
  sessionsPerWeek: "3 sessions (A/B/C) · ~30 minutes each",
  twoDayRule:
    "If you only have 2 days, do Session A then B and skip C that week. Do not skip A.",
  principles: [
    "Every drill trains the right and left — alternate reps; never burn out the strong foot first.",
    "Power comes from plant foot, hips, and a locked ankle — not wild swinging.",
    "Use your gear: balls, cones/disks, 6 poles, ladder, two 12×6 goals, and the mannequin.",
    "Backyard first; use field-stretch notes when you have more space.",
  ],
};
