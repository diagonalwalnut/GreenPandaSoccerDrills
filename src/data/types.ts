export type Focus = "control" | "footwork" | "power";

export type Equipment =
  | "balls"
  | "cones"
  | "disks"
  | "poles"
  | "ladder"
  | "goals"
  | "mannequin"
  | "fence-or-wall";

export type SessionLetter = "A" | "B" | "C";

export type Drill = {
  id: string;
  name: string;
  focus: Focus;
  equipment: Equipment[];
  setup: string;
  bilateral: string;
  instructions: string[];
  cues: string[];
  progression: string;
  diagram: "ladder" | "poles" | "gates" | "goals" | "mannequin" | "open" | "wall";
};

export type SessionBlock = {
  label: string;
  minutes: number;
  drillId: string;
  notes?: string;
};

export type Session = {
  id: string;
  week: number;
  letter: SessionLetter;
  title: string;
  focus: Focus;
  summary: string;
  totalMinutes: number;
  fieldStretch?: string;
  blocks: SessionBlock[];
};

export type Week = {
  number: number;
  theme: string;
  goal: string;
  sessions: Session[];
};
