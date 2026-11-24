import type { Equipment, Focus } from "./types";

export const focusLabels: Record<Focus, string> = {
  control: "Control",
  footwork: "Footwork",
  power: "Power Finish",
};

export const focusShort: Record<Focus, string> = {
  control: "Control",
  footwork: "Footwork",
  power: "Power",
};

export const equipmentLabels: Record<Equipment, string> = {
  balls: "Balls",
  cones: "Cones",
  disks: "Flat disks",
  poles: "Agility poles",
  ladder: "Agility ladder",
  goals: "Small goals",
  mannequin: "Mannequin",
  "fence-or-wall": "Fence / wall",
};
