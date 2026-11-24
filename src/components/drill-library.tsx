"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DrillDetail } from "@/components/drill-detail";
import { FocusBadge } from "@/components/focus-badge";
import { Button } from "@/components/ui/button";
import { drills } from "@/data/drills";
import { equipmentLabels, focusLabels } from "@/data/labels";
import type { Equipment, Focus } from "@/data/types";
import { cn } from "@/lib/utils";

const focuses: Array<Focus | "all"> = ["all", "control", "footwork", "power"];

const equipmentFilters: Equipment[] = [
  "ladder",
  "poles",
  "goals",
  "mannequin",
  "disks",
  "cones",
  "fence-or-wall",
];

export function DrillLibrary() {
  const [focus, setFocus] = useState<Focus | "all">("all");
  const [equipment, setEquipment] = useState<Equipment | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(drills[0]?.id ?? null);

  const filtered = useMemo(() => {
    return drills.filter((drill) => {
      if (focus !== "all" && drill.focus !== focus) return false;
      if (equipment !== "all" && !drill.equipment.includes(equipment)) return false;
      return true;
    });
  }, [focus, equipment]);

  const selected =
    filtered.find((d) => d.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {focuses.map((f) => (
          <Button
            key={f}
            type="button"
            size="sm"
            variant={focus === f ? "default" : "outline"}
            onClick={() => setFocus(f)}
            className={cn(
              focus === f
                ? "bg-[color:var(--volt)] text-[color:var(--pitch-deep)] hover:bg-[color:var(--volt)]/90"
                : "border-white/20 bg-transparent text-white hover:bg-white/10",
            )}
          >
            {f === "all" ? "All focuses" : focusLabels[f]}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={equipment === "all" ? "default" : "outline"}
          onClick={() => setEquipment("all")}
          className={cn(
            equipment === "all"
              ? "bg-white text-[color:var(--pitch-deep)]"
              : "border-white/20 bg-transparent text-white hover:bg-white/10",
          )}
        >
          Any gear
        </Button>
        {equipmentFilters.map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={equipment === item ? "default" : "outline"}
            onClick={() => setEquipment(item)}
            className={cn(
              equipment === item
                ? "bg-white text-[color:var(--pitch-deep)]"
                : "border-white/20 bg-transparent text-white hover:bg-white/10",
            )}
          >
            {equipmentLabels[item]}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-2">
          {filtered.length === 0 && (
            <p className="p-3 text-sm text-white/70">No drills match these filters.</p>
          )}
          {filtered.map((drill) => (
            <button
              key={drill.id}
              type="button"
              onClick={() => setSelectedId(drill.id)}
              className={cn(
                "rounded-xl px-3 py-3 text-left transition-colors",
                selected?.id === drill.id
                  ? "bg-white/15 text-white"
                  : "text-white/80 hover:bg-white/10",
              )}
            >
              <div className="mb-1">
                <FocusBadge focus={drill.focus} />
              </div>
              <p className="font-medium leading-snug">{drill.name}</p>
            </button>
          ))}
        </div>

        <div>
          {selected ? (
            <DrillDetail drill={selected} />
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 p-8 text-center text-white/70">
              Pick a drill to see setup, cues, and both-feet protocol.
            </div>
          )}
          <p className="mt-4 text-center text-sm text-white/60">
            Looking for the weekly plan?{" "}
            <Link href="/" className="text-[color:var(--volt)] underline-offset-2 hover:underline">
              Back to the program
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
