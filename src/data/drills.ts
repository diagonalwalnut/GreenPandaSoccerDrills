import type { Drill } from "./types";

export const drills: Drill[] = [
  {
    id: "warmup-both-feet",
    name: "Both-Feet Ball Warm-Up",
    focus: "control",
    equipment: ["balls", "disks"],
    setup:
      "Mark a 8×8 yd box with flat disks. One ball at your feet. Optional second ball nearby for quick switches.",
    bilateral:
      "Alternate feet every 8–10 touches. Never finish a pattern on only the strong foot.",
    instructions: [
      "Jog in place with light toe taps on top of the ball (R then L).",
      "Inside-inside rolls across the body: R push left, L push right.",
      "Outside cut + sole drag: 4 R, 4 L, keep the ball inside the box.",
      "Finish with open-and-close hips while rolling the ball in a figure-8 around both feet.",
    ],
    cues: [
      "Soft ankles — the ball should stay glued, not bounce away.",
      "Eyes up every 3–4 touches.",
      "Knees bent; stay on the balls of your feet.",
    ],
    progression: "Shrink the box to 6×6 and add a 1-touch turn every 8 seconds.",
    diagram: "open",
  },
  {
    id: "sole-roll-gates",
    name: "Sole-Roll Gate Weave",
    focus: "control",
    equipment: ["balls", "disks", "cones"],
    setup:
      "Build 4–5 gates with flat disks or cones, 1.5 yd wide, staggered in a shallow zigzag across the yard.",
    bilateral:
      "Pass through odd gates with the right sole, even gates with the left sole. Reverse the pattern on the way back.",
    instructions: [
      "Start at the first gate. Sole-roll the ball forward through the gate.",
      "Take one inside touch to set for the next gate.",
      "Keep the ball under the body — no big pushes.",
      "Complete 4 lengths. Rest 20 seconds between lengths.",
    ],
    cues: [
      "Weight over the ball; plant foot close.",
      "Sole contact near the middle of the ball.",
      "Quiet upper body — let the feet do the work.",
    ],
    progression: "Tighten gates to 1 yd and add a 180° sole turn at the end of each length.",
    diagram: "gates",
  },
  {
    id: "inside-outside-boxes",
    name: "Inside–Outside Box Touches",
    focus: "control",
    equipment: ["balls", "cones"],
    setup: "Four cones in a 4×4 yd square. Ball starts at one corner.",
    bilateral:
      "Clockwise lap: right foot only on inside/outside. Counterclockwise lap: left foot only. Equal laps each way.",
    instructions: [
      "Dribble the perimeter using inside then outside of the working foot.",
      "At each corner, take a sharp cut with the same foot.",
      "Do 2 clockwise (R) then 2 counterclockwise (L).",
      "Then mix: one touch inside R, one touch outside L, around the box twice.",
    ],
    cues: [
      "Push the ball just far enough to stay in stride.",
      "Plant foot points where you want to go next.",
      "Stay low through the corner cuts.",
    ],
    progression: "Add a cone in the center — visit the center before each corner.",
    diagram: "gates",
  },
  {
    id: "first-touch-away",
    name: "First Touch Across Body",
    focus: "control",
    equipment: ["balls", "cones", "fence-or-wall"],
    setup:
      "Stand 6–8 yd from a fence/wall (or toss to yourself). Place two cones 3 yd apart as a receiving lane.",
    bilateral:
      "Receive with the foot farthest from the bounce (across body). Alternate: bounce to R side → L foot receive, then bounce to L side → R foot receive.",
    instructions: [
      "Play the ball off the fence/wall or self-toss with a bounce.",
      "Take the first touch across the body into the open lane.",
      "Second touch sets; third touch passes back into the wall/fence.",
      "10 quality reps each receiving foot.",
    ],
    cues: [
      "Cushion — don’t stab at the ball.",
      "Open hips early so the touch has a direction.",
      "First touch should kill the bounce and move you forward.",
    ],
    progression: "Force a one-touch redirect into a cone gate 4 yd away before playing back.",
    diagram: "wall",
  },
  {
    id: "mannequin-shield",
    name: "Mannequin Shield & Escape",
    focus: "control",
    equipment: ["balls", "mannequin", "disks"],
    setup:
      "Place the mannequin in the middle of a 6×6 yd ring of disks. Ball starts at your feet beside the mannequin.",
    bilateral:
      "Shield with the right shoulder/hip for 8 seconds, escape with a left-foot touch. Then reverse: shield left, escape right.",
    instructions: [
      "Body between ball and mannequin. Soft sole or inside touches to keep the ball alive.",
      "On “escape,” roll or cut away and accelerate 3 yd past a disk gate.",
      "Reset and switch sides. 6 escapes each way.",
    ],
    cues: [
      "Wide base, low center of gravity.",
      "Feel the mannequin with your back/hip — don’t watch the ball the whole time.",
      "Escape touch goes into space, not into the mannequin.",
    ],
    progression: "Add a second gate and choose the escape based on a parent’s call (left/right).",
    diagram: "mannequin",
  },
  {
    id: "ladder-ball-rhythm",
    name: "Ladder + Ball Rhythm",
    focus: "footwork",
    equipment: ["ladder", "balls"],
    setup: "Agility ladder flat on grass. Ball waiting 1 yd past the last rung.",
    bilateral:
      "Odd reps lead with the right foot into the ladder; even reps lead with the left. At the ball, first touch with the opposite foot from your lead.",
    instructions: [
      "Quick feet through the ladder (in-in / out-out or one-in-each).",
      "Exit onto the ball with a controlled first touch forward.",
      "Dribble 5 yd, turn, jog back. 6 total reps.",
    ],
    cues: [
      "Light, quiet feet in the ladder — don’t stomp.",
      "Eyes up as you exit onto the ball.",
      "First touch after the ladder must be soft enough to keep possession.",
    ],
    progression: "Place a cone gate 3 yd past the ladder; first touch must split the gate.",
    diagram: "ladder",
  },
  {
    id: "pole-slalom",
    name: "Six-Pole Slalom",
    focus: "footwork",
    equipment: ["poles", "balls"],
    setup: "Set 6 agility poles in a straight line, 1.5–2 yd apart.",
    bilateral:
      "First two runs: start with a right-foot touch into the first gap. Next two runs: start with left. Final two: free choice but every other touch must be the weak foot.",
    instructions: [
      "Weave through poles with small touches — inside and outside of both feet.",
      "Keep the ball close; hips stay square to the line as much as possible.",
      "At the end, accelerate 5 yd, turn, and weave back.",
      "Rest 30 seconds every 2 runs.",
    ],
    cues: [
      "Touch frequency over speed for the first runs.",
      "Use the outside of the foot to “pull” around the pole.",
      "Don’t lean into poles — stay balanced over the ball.",
    ],
    progression: "Tighten spacing to 1 yd and add a 1-touch turn at the end before the return weave.",
    diagram: "poles",
  },
  {
    id: "pole-figure8",
    name: "Pole Figure-8 Dual Foot",
    focus: "footwork",
    equipment: ["poles", "balls"],
    setup: "Two poles 3 yd apart (use more poles as gates if you want a longer runway).",
    bilateral:
      "Circle the right pole with right-foot only touches, then the left pole with left-foot only. Then continuous figure-8 using both.",
    instructions: [
      "Complete 4 circles on the R pole (R foot), 4 on the L pole (L foot).",
      "Then figure-8 continuously for 45 seconds.",
      "Rest 20 seconds. Repeat for 3 rounds.",
    ],
    cues: [
      "Stay on the outside of each pole — don’t cut the corner early.",
      "Shoulders quiet; feet busy.",
      "Change of pace as you exit the turn.",
    ],
    progression: "Add a third pole and run a continuous clover pattern.",
    diagram: "poles",
  },
  {
    id: "disk-quick-gates",
    name: "Quick-Gate Combinations",
    focus: "footwork",
    equipment: ["disks", "balls", "cones"],
    setup:
      "Scatter 6–8 flat disks as mini-gates (pairs 1 yd apart) in a 10×10 yd area.",
    bilateral:
      "Call a pattern: R-R-L or L-L-R through successive gates. Switch pattern every minute so both feet get equal volume.",
    instructions: [
      "Dribble freely and pass through as many gates as possible in 60 seconds.",
      "Each gate entry must match the called foot sequence.",
      "Do 4 rounds with 30 seconds rest.",
    ],
    cues: [
      "Scan before you commit to a gate.",
      "Small touches set up the next gate.",
      "Plant foot next to the ball before a sharp cut.",
    ],
    progression: "Parent points to the next gate — no free choice; react and go.",
    diagram: "gates",
  },
  {
    id: "ladder-cut-shoot",
    name: "Ladder Exit → Cut → Shot",
    focus: "footwork",
    equipment: ["ladder", "balls", "goals", "disks"],
    setup:
      "Ladder leading toward a small goal 12–15 yd away. Place a disk cut-marker 3 yd after the ladder.",
    bilateral:
      "Rep 1: exit ladder, cut with right, shoot with left. Rep 2: cut left, shoot right. Alternate for all reps.",
    instructions: [
      "Quick feet through ladder, explode to the cut disk.",
      "Take the cut touch, then drive a controlled shot on goal.",
      "Collect the ball, jog back. 8 total reps (4 each pattern).",
    ],
    cues: [
      "Don’t rush the cut — set the plant foot.",
      "Shot is about clean contact first, then power.",
      "Head steady; eyes on the ball at contact.",
    ],
    progression: "Add the mannequin just before the cut so the touch must go around it.",
    diagram: "ladder",
  },
  {
    id: "power-plant-markers",
    name: "Plant-Foot Power Shots",
    focus: "power",
    equipment: ["balls", "goals", "disks"],
    setup:
      "One 12×6 goal. Place a plant-foot disk 6–8 inches beside where the ball will sit. Balls lined up 12–16 yd out.",
    bilateral:
      "Alternate every shot: right-foot strike / left-foot strike. Equal number. Never batch all strong-foot shots first.",
    instructions: [
      "Short angled approach (not straight on).",
      "Plant foot lands on/near the disk, toes toward the far post.",
      "Strike through the middle of the ball with the laces; ankle locked.",
      "Follow through toward the target. 5 shots each foot, rest 45 seconds, then another set of 5 each.",
    ],
    cues: [
      "Power comes from hip rotation and a firm plant — not a wild leg swing.",
      "Ankle locked like a hammer; toes down slightly.",
      "Land on the shooting foot after contact when possible.",
    ],
    progression: "Move back 3–4 yd and keep the same clean mechanics before adding speed.",
    diagram: "goals",
  },
  {
    id: "driven-near-far",
    name: "Driven Near / Far Post",
    focus: "power",
    equipment: ["balls", "goals", "cones"],
    setup:
      "Aim at one small goal. Mark near-post and far-post targets with cones or disks inside/just outside the posts.",
    bilateral:
      "Sequence: R near, L near, R far, L far — repeat. Same volume each foot and each target.",
    instructions: [
      "From 10–14 yd, take a 2–3 step approach.",
      "Drive the ball (laces or firm inside) at the called target.",
      "Focus on hitting the target before max power. 12 total shots.",
    ],
    cues: [
      "Pick the target before the run-up.",
      "Plant foot aims where you want the ball to go.",
      "Chest over the ball for a driven shot that stays down.",
    ],
    progression: "Time limit: shoot within 3 seconds of a parent’s “go.”",
    diagram: "goals",
  },
  {
    id: "mannequin-blocker-finish",
    name: "Mannequin Blocker Finishes",
    focus: "power",
    equipment: ["balls", "goals", "mannequin", "disks"],
    setup:
      "Place the mannequin 6–8 yd in front of a small goal, slightly off center. Ball starts 4 yd wider than the mannequin.",
    bilateral:
      "Attack from the right side finishing with the right, then from the left side finishing with the left. Alternate sides each rep.",
    instructions: [
      "Dribble at game speed toward the mannequin.",
      "Take a touch around it (outside or sole), then shoot first or second touch on goal.",
      "8 reps (4 each side). Walk back recoveries between shots.",
    ],
    cues: [
      "Sell the approach — don’t slow down early.",
      "The touch past the mannequin sets the shot angle.",
      "Head up for a split second to pick near or far post.",
    ],
    progression: "Must finish far post only; near-post counts as a miss for this set.",
    diagram: "mannequin",
  },
  {
    id: "two-goal-channel",
    name: "Two-Goal Power Channel",
    focus: "power",
    equipment: ["balls", "goals", "cones"],
    setup:
      "Set both 12×6 goals facing each other 20–24 yd apart (or as far as the yard allows). Cone channel down the middle.",
    bilateral:
      "Odd trips: right-foot shot into the far goal. Even trips: left-foot shot. Turn and attack the opposite goal immediately.",
    instructions: [
      "Dribble through the channel, plant, and drive a shot.",
      "Collect a rebound or spare ball and attack the other goal.",
      "Continuous for 3 minutes, then 60 seconds rest. 2 rounds.",
    ],
    cues: [
      "Quality contact every shot — skip a shot rather than slash wildly.",
      "Reset your plant foot every strike.",
      "Breathe between goals; don’t sprint into poor technique.",
    ],
    progression: "On a larger field, stretch goals to 30 yd and take one setup touch before shooting.",
    diagram: "goals",
  },
  {
    id: "wall-pass-shoot",
    name: "Wall Combo → Strike",
    focus: "power",
    equipment: ["balls", "goals", "fence-or-wall", "disks"],
    setup:
      "Fence/wall to one side, small goal ahead. Disk marks for the give-and-go start spot ~12 yd from goal.",
    bilateral:
      "Pass with right, receive with left, shoot with right — then reverse: pass L, receive R, shoot L.",
    instructions: [
      "Play into the wall/fence, take the return across the body, strike on goal.",
      "6 combos each pattern. Rest as needed to keep technique sharp.",
    ],
    cues: [
      "The receive sets the power shot — don’t stop the ball dead under your feet.",
      "Step into the strike; hips through the ball.",
      "Ankle firm at contact.",
    ],
    progression: "One-touch finish off the wall return when the bounce is friendly.",
    diagram: "wall",
  },
  {
    id: "finisher-rl-goals",
    name: "R/L Rapid Small-Goal Finisher",
    focus: "power",
    equipment: ["balls", "goals", "mannequin"],
    setup:
      "Two small goals side by side or angled. Mannequin optional between them as a visual blocker. Balls at a central cone 8–10 yd out.",
    bilateral:
      "Strict alternate: right-foot shot, left-foot shot, repeat. Count only clean contacts that are on frame.",
    instructions: [
      "On “go,” strike R then immediately set and strike L.",
      "Continue for 60–75 seconds. Rest 45 seconds. 3 rounds.",
      "Track makes with each foot — aim for equal makes, not just equal attempts.",
    ],
    cues: [
      "Reset plant foot every shot.",
      "Stay under control — this is accuracy under fatigue.",
      "Weak foot: slightly closer plant and shorter backswing if needed.",
    ],
    progression: "Must hit opposite goal from the shooting foot’s side (cross-body finishes).",
    diagram: "goals",
  },
  {
    id: "control-turn-shoot",
    name: "Receive, Turn, Drive",
    focus: "control",
    equipment: ["balls", "goals", "cones", "mannequin"],
    setup:
      "Parent/self toss or fence bounce from behind. Mannequin in front as a passive defender. Goal 12 yd ahead.",
    bilateral:
      "Receive and turn with right into a left-foot shot; then receive/turn with left into a right-foot shot.",
    instructions: [
      "Check away, show for the ball, take a directional first touch past the mannequin.",
      "Second touch shoots with the opposite foot.",
      "8 total reps (4 each pattern).",
    ],
    cues: [
      "First touch has a purpose — past the mannequin into the shooting lane.",
      "Open body on the turn.",
      "Shoot early before the window closes.",
    ],
    progression: "Limit to two touches total (receive-turn + shoot).",
    diagram: "mannequin",
  },
  {
    id: "cooldown-touches",
    name: "Easy Both-Feet Cool-Down",
    focus: "control",
    equipment: ["balls"],
    setup: "Open space, one ball.",
    bilateral: "Continuous gentle touches alternating R and L until the timer ends.",
    instructions: [
      "Slow toe taps, inside rolls, and light juggles (thighs/feet) for recovery.",
      "Stretch calves, quads, and hip flexors for 20–30 seconds each side after the ball work.",
    ],
    cues: [
      "Breathing slows down — this is not another intense set.",
      "Check in on the weak foot: does it feel more natural than at the start?",
    ],
    progression: "Add 10 controlled juggles each foot without a catch.",
    diagram: "open",
  },
];

export const drillMap = Object.fromEntries(drills.map((d) => [d.id, d])) as Record<
  string,
  Drill
>;

export function getDrill(id: string): Drill {
  const drill = drillMap[id];
  if (!drill) {
    throw new Error(`Unknown drill: ${id}`);
  }
  return drill;
}
