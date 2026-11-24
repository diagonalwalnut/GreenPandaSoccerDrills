import { SetupDiagram } from "@/components/setup-diagram";
import { FocusBadge } from "@/components/focus-badge";
import { equipmentLabels } from "@/data/labels";
import type { Drill } from "@/data/types";
import { ArrowLeftRight, Lightbulb, ListOrdered, Wrench } from "lucide-react";

export function DrillDetail({
  drill,
  blockLabel,
  minutes,
  notes,
}: {
  drill: Drill;
  blockLabel?: string;
  minutes?: number;
  notes?: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
      <div className="border-b border-white/10 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          {blockLabel && (
            <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--chalk)]/70">
              {blockLabel}
              {minutes != null ? ` · ${minutes} min` : ""}
            </span>
          )}
          <FocusBadge focus={drill.focus} />
        </div>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-white">
          {drill.name}
        </h3>
        {notes && (
          <p className="mt-2 rounded-lg bg-[color:var(--volt)]/15 px-3 py-2 text-sm text-[color:var(--volt)]">
            {notes}
          </p>
        )}
      </div>

      <SetupDiagram kind={drill.diagram} className="mx-4 mt-4 sm:mx-5" />

      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
        <InfoBlock icon={<Wrench className="size-4" />} title="Setup">
          <p>{drill.setup}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {drill.equipment.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80"
              >
                {equipmentLabels[item]}
              </span>
            ))}
          </div>
        </InfoBlock>

        <InfoBlock
          icon={<ArrowLeftRight className="size-4" />}
          title="Both feet"
        >
          <p>{drill.bilateral}</p>
        </InfoBlock>

        <InfoBlock
          icon={<ListOrdered className="size-4" />}
          title="How to run it"
          className="sm:col-span-2"
        >
          <ol className="list-decimal space-y-1.5 pl-4">
            {drill.instructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </InfoBlock>

        <InfoBlock icon={<Lightbulb className="size-4" />} title="Coaching cues">
          <ul className="space-y-1.5">
            {drill.cues.map((cue) => (
              <li key={cue} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[color:var(--volt)]" />
                <span>{cue}</span>
              </li>
            ))}
          </ul>
        </InfoBlock>

        <InfoBlock title="Make it harder">
          <p>{drill.progression}</p>
        </InfoBlock>
      </div>
    </article>
  );
}

function InfoBlock({
  title,
  children,
  icon,
  className,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h4 className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[color:var(--chalk)]/75">
        {icon}
        {title}
      </h4>
      <div className="text-sm leading-relaxed text-white/85">{children}</div>
    </div>
  );
}
