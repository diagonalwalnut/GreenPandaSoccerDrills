import Link from "next/link";
import { notFound } from "next/navigation";
import { FocusBadge } from "@/components/focus-badge";
import { buttonVariants } from "@/components/ui/button";
import { getWeek, weeks } from "@/data/program";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";

export function generateStaticParams() {
  return weeks.map((week) => ({ week: String(week.number) }));
}

export default async function WeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week: weekParam } = await params;
  const weekNumber = Number(weekParam);
  const week = getWeek(weekNumber);
  if (!week) notFound();

  const prev = weekNumber > 1 ? weekNumber - 1 : null;
  const next = weekNumber < 6 ? weekNumber + 1 : null;

  return (
    <div className="space-y-6">
      <div className="animate-rise">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft className="size-4" /> Program overview
        </Link>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[color:var(--volt)]">
          Week {week.number} of 6
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-white">
          {week.theme}
        </h1>
        <p className="mt-2 max-w-2xl text-white/75">{week.goal}</p>
        <p className="mt-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/70">
          Ideal: Sessions A, B, and C this week. Only two days? Do A then B and
          skip C.
        </p>
      </div>

      <div className="animate-rise-delay-1 grid gap-3">
        {week.sessions.map((session) => (
          <Link
            key={session.id}
            href={`/session/${session.id}`}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-0.5 hover:border-[color:var(--volt)]/40 hover:bg-white/10"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[color:var(--volt)] px-2.5 py-0.5 text-xs font-semibold text-[color:var(--pitch-deep)]">
                Session {session.letter}
              </span>
              <FocusBadge focus={session.focus} />
              <span className="inline-flex items-center gap-1 text-xs text-white/60">
                <Clock3 className="size-3.5" /> {session.totalMinutes} min
              </span>
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-white group-hover:text-[color:var(--volt)]">
              {session.title}
            </h2>
            <p className="mt-1 text-sm text-white/75">{session.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {session.blocks.map((block) => (
                <span
                  key={block.label}
                  className="rounded-full bg-black/30 px-2.5 py-1 text-xs text-white/70"
                >
                  {block.label.split("·")[0].trim()} {block.minutes}m
                </span>
              ))}
            </div>
            <p className="mt-4 inline-flex items-center gap-1 text-sm text-[color:var(--volt)]">
              Open session <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Link
            href={`/week/${prev}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-white/20 bg-transparent text-white hover:bg-white/10",
            )}
          >
            <ArrowLeft className="size-4" /> Week {prev}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/week/${next}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-white/20 bg-transparent text-white hover:bg-white/10",
            )}
          >
            Week {next} <ArrowRight className="size-4" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
