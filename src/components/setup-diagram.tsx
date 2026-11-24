import type { Drill } from "@/data/types";
import { cn } from "@/lib/utils";

type DiagramKind = Drill["diagram"];

export function SetupDiagram({
  kind,
  className,
}: {
  kind: DiagramKind;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-[color:var(--pitch-deep)] p-3",
        className,
      )}
      aria-hidden
    >
      <PitchLines />
      <svg viewBox="0 0 320 140" className="relative z-10 h-auto w-full">
        {kind === "ladder" && <LadderSvg />}
        {kind === "poles" && <PolesSvg />}
        {kind === "gates" && <GatesSvg />}
        {kind === "goals" && <GoalsSvg />}
        {kind === "mannequin" && <MannequinSvg />}
        {kind === "wall" && <WallSvg />}
        {kind === "open" && <OpenSvg />}
      </svg>
    </div>
  );
}

function PitchLines() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-30">
      <div className="absolute inset-x-4 top-1/2 h-px bg-[color:var(--chalk)]/40" />
      <div className="absolute left-1/2 top-3 bottom-3 w-px bg-[color:var(--chalk)]/25" />
      <div className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--chalk)]/30" />
    </div>
  );
}

function Player({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="7" fill="#f4f7f2" />
      <circle cy="-11" r="5" fill="#f4f7f2" />
    </g>
  );
}

function Ball({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="4" fill="#e8f56a" />;
}

function LadderSvg() {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={40 + i * 28}
          y={48}
          width={22}
          height={44}
          rx="2"
          fill="none"
          stroke="#f4f7f2"
          strokeWidth="2"
        />
      ))}
      <Ball x={230} y={70} />
      <Player x={28} y={78} />
      <path
        d="M210 70 H270"
        stroke="#e8f56a"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </g>
  );
}

function PolesSvg() {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`translate(${50 + i * 40} 40)`}>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="60"
            stroke="#f4f7f2"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cy="62" r="4" fill="#e8f56a" opacity="0.5" />
        </g>
      ))}
      <Player x={30} y={95} />
      <Ball x={42} y={100} />
    </g>
  );
}

function GatesSvg() {
  return (
    <g>
      {[
        [60, 40],
        [120, 80],
        [180, 35],
        [240, 75],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="#e8f56a" />
          <circle cx={x + 28} cy={y} r="5" fill="#e8f56a" />
        </g>
      ))}
      <Player x={40} y={100} />
      <Ball x={52} y={105} />
    </g>
  );
}

function GoalsSvg() {
  return (
    <g>
      <rect
        x="230"
        y="30"
        width="60"
        height="80"
        fill="none"
        stroke="#f4f7f2"
        strokeWidth="3"
      />
      <line x1="230" y1="30" x2="230" y2="110" stroke="#e8f56a" strokeWidth="2" />
      <Player x={90} y={85} />
      <Ball x={110} y={90} />
      <path
        d="M120 88 Q170 70 225 70"
        fill="none"
        stroke="#e8f56a"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <circle cx={118} cy={100} r="6" fill="none" stroke="#f4f7f2" strokeWidth="2" />
      <text x="112" y="103" fontSize="7" fill="#f4f7f2">
        P
      </text>
    </g>
  );
}

function MannequinSvg() {
  return (
    <g>
      <rect
        x="250"
        y="35"
        width="50"
        height="70"
        fill="none"
        stroke="#f4f7f2"
        strokeWidth="3"
      />
      <g transform="translate(170 55)">
        <rect x="-10" y="0" width="20" height="40" rx="4" fill="#f4f7f2" opacity="0.85" />
        <circle cy="-8" r="8" fill="#f4f7f2" />
      </g>
      <Player x={80} y={85} />
      <Ball x={95} y={95} />
      <path
        d="M105 90 Q140 70 155 75"
        fill="none"
        stroke="#e8f56a"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
    </g>
  );
}

function WallSvg() {
  return (
    <g>
      <rect x="20" y="20" width="14" height="100" fill="#f4f7f2" opacity="0.35" />
      <rect
        x="240"
        y="40"
        width="55"
        height="60"
        fill="none"
        stroke="#f4f7f2"
        strokeWidth="3"
      />
      <Player x={120} y={85} />
      <Ball x={90} y={70} />
      <path
        d="M100 68 L40 55 M40 55 L100 80"
        fill="none"
        stroke="#e8f56a"
        strokeWidth="2"
      />
    </g>
  );
}

function OpenSvg() {
  return (
    <g>
      <rect
        x="70"
        y="30"
        width="180"
        height="80"
        rx="8"
        fill="none"
        stroke="#f4f7f2"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <Player x={150} y={75} />
      <Ball x={165} y={85} />
    </g>
  );
}
