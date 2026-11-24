"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimerBlock = {
  label: string;
  minutes: number;
};

export function SessionTimer({ blocks }: { blocks: TimerBlock[] }) {
  const totalSeconds = useMemo(
    () => blocks.reduce((sum, b) => sum + b.minutes * 60, 0),
    [blocks],
  );

  const [blockIndex, setBlockIndex] = useState(0);
  const [remaining, setRemaining] = useState(() => (blocks[0]?.minutes ?? 0) * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const current = blocks[blockIndex];

  useEffect(() => {
    if (!running || done) return;

    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev > 1) return prev - 1;
        return 0;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [running, done]);

  useEffect(() => {
    if (!running || done || remaining > 0) return;

    if (blockIndex >= blocks.length - 1) {
      setRunning(false);
      setDone(true);
      return;
    }

    const next = blockIndex + 1;
    setBlockIndex(next);
    setRemaining(blocks[next].minutes * 60);
  }, [remaining, running, done, blockIndex, blocks]);

  function reset() {
    setRunning(false);
    setDone(false);
    setBlockIndex(0);
    setRemaining((blocks[0]?.minutes ?? 0) * 60);
  }

  function skip() {
    if (blockIndex >= blocks.length - 1) {
      setRunning(false);
      setDone(true);
      setRemaining(0);
      return;
    }
    const next = blockIndex + 1;
    setBlockIndex(next);
    setRemaining(blocks[next].minutes * 60);
    setDone(false);
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const elapsedEstimate =
    blocks.slice(0, blockIndex).reduce((s, b) => s + b.minutes * 60, 0) +
    ((current?.minutes ?? 0) * 60 - remaining);
  const progress = totalSeconds ? Math.min(1, Math.max(0, elapsedEstimate / totalSeconds)) : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--chalk)]/70">
            Session timer
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-lg">
            {done ? "Session complete" : current?.label}
          </p>
        </div>
        <p className="font-mono text-3xl tabular-nums tracking-tight text-[color:var(--volt)]">
          {done ? "00:00" : `${mm}:${ss}`}
        </p>
      </div>

      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[color:var(--volt)] transition-[width] duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {blocks.map((block, i) => (
          <button
            key={`${block.label}-${i}`}
            type="button"
            onClick={() => {
              setBlockIndex(i);
              setRemaining(block.minutes * 60);
              setDone(false);
            }}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs transition-colors",
              i === blockIndex && !done
                ? "bg-[color:var(--volt)] text-[color:var(--pitch-deep)]"
                : i < blockIndex || done
                  ? "bg-white/20 text-white/80"
                  : "bg-white/10 text-white/60 hover:bg-white/15",
            )}
          >
            {block.label.split("·")[0].trim()} · {block.minutes}m
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={() => (done ? reset() : setRunning((r) => !r))}
          className="bg-[color:var(--volt)] text-[color:var(--pitch-deep)] hover:bg-[color:var(--volt)]/90"
        >
          {done ? (
            <>
              <RotateCcw className="size-4" /> Restart
            </>
          ) : running ? (
            <>
              <Pause className="size-4" /> Pause
            </>
          ) : (
            <>
              <Play className="size-4" /> Start
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={skip}
          disabled={done}
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
        >
          <SkipForward className="size-4" /> Skip block
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={reset}
          className="text-white/80 hover:bg-white/10 hover:text-white"
        >
          <RotateCcw className="size-4" /> Reset
        </Button>
      </div>
    </div>
  );
}
