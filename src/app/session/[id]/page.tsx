import Link from "next/link";
import { notFound } from "next/navigation";
import { DrillDetail } from "@/components/drill-detail";
import { FocusBadge } from "@/components/focus-badge";
import { SessionTimer } from "@/components/session-timer";
import { buttonVariants } from "@/components/ui/button";
import { getDrill } from "@/data/drills";
import { allSessions, getSession } from "@/data/program";
import { cn } from "@/lib/utils";
import { ArrowLeft, MapPin } from "lucide-react";

export function generateStaticParams() {
  return allSessions.map((session) => ({ id: session.id }));
}

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) notFound();

  const timerBlocks = session.blocks.map((block) => ({
    label: block.label,
    minutes: block.minutes,
  }));

  return (
    <div className="space-y-6">
      <div className="animate-rise">
        <Link
          href={`/week/${session.week}`}
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft className="size-4" /> Week {session.week}
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[color:var(--volt)] px-2.5 py-0.5 text-xs font-semibold text-[color:var(--pitch-deep)]">
            Session {session.letter}
          </span>
          <FocusBadge focus={session.focus} />
          <span className="text-xs text-white/60">{session.totalMinutes} minutes</span>
        </div>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-white">
          {session.title}
        </h1>
        <p className="mt-2 max-w-2xl text-white/75">{session.summary}</p>
        {session.fieldStretch && (
          <p className="mt-3 inline-flex items-start gap-2 rounded-xl border border-sky-400/20 bg-sky-500/10 px-3 py-2 text-sm text-sky-100">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {session.fieldStretch}
          </p>
        )}
      </div>

      <div className="animate-rise-delay-1">
        <SessionTimer blocks={timerBlocks} />
      </div>

      <div className="animate-rise-delay-2 space-y-4">
        {session.blocks.map((block) => {
          const drill = getDrill(block.drillId);
          return (
            <DrillDetail
              key={`${block.label}-${block.drillId}`}
              drill={drill}
              blockLabel={block.label}
              minutes={block.minutes}
              notes={block.notes}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 pb-4">
        <Link
          href={`/week/${session.week}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-white/20 bg-transparent text-white hover:bg-white/10",
          )}
        >
          Back to week {session.week}
        </Link>
        <Link
          href="/drills"
          className={cn(
            buttonVariants(),
            "bg-[color:var(--volt)] text-[color:var(--pitch-deep)] hover:bg-[color:var(--volt)]/90",
          )}
        >
          Drill library
        </Link>
      </div>
    </div>
  );
}
