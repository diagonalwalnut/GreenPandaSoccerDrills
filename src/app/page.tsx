import Link from "next/link";
import { FocusBadge } from "@/components/focus-badge";
import { buttonVariants } from "@/components/ui/button";
import { programIntro, weeks } from "@/data/program";
import { cn } from "@/lib/utils";
import { ArrowRight, CalendarDays, Footprints, Target, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-6 sm:p-8">
        <div className="animate-pulse-soft pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-[color:var(--volt)]/20 blur-3xl" />
        <div className="animate-rise relative">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--volt)]">
            {programIntro.player}
          </p>
          <h1 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-[0.95] text-white sm:text-5xl">
            Panda
            <span className="block text-[color:var(--volt)]">Soccer Labs</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80">
            A 6-week backyard program that fixes ball control and footwork while
            building age-safe shooting power — with equal work for the right and
            left foot in every drill.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/week/1"
              className={cn(
                buttonVariants(),
                "bg-[color:var(--volt)] text-[color:var(--pitch-deep)] hover:bg-[color:var(--volt)]/90",
              )}
            >
              Start Week 1 <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/drills"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-white/20 bg-transparent text-white hover:bg-white/10",
              )}
            >
              Browse drills
            </Link>
          </div>
        </div>
      </section>

      <section className="animate-rise-delay-1 grid gap-3 sm:grid-cols-3">
        <Stat
          icon={<CalendarDays className="size-4" />}
          label="Schedule"
          value="3× 30 min / week"
          detail={programIntro.twoDayRule}
        />
        <Stat
          icon={<Footprints className="size-4" />}
          label="Rule"
          value="Both feet always"
          detail="Alternate R/L reps — never all strong foot first."
        />
        <Stat
          icon={<Zap className="size-4" />}
          label="Power focus"
          value="Plant · hip · ankle"
          detail="Technique before max effort. Rest between power sets."
        />
      </section>

      <section className="animate-rise-delay-2 space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-white">
              Six-week arc
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Tap a week to see Sessions A, B, and C.
            </p>
          </div>
          <Target className="size-5 text-[color:var(--volt)]" />
        </div>

        <div className="grid gap-3">
          {weeks.map((week, index) => (
            <Link
              key={week.number}
              href={`/week/${week.number}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--volt)]/40 hover:bg-white/10"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--chalk)]/70">
                    Week {week.number}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-white group-hover:text-[color:var(--volt)]">
                    {week.theme}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-white/75">{week.goal}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {week.sessions.map((session) => (
                    <FocusBadge key={session.id} focus={session.focus} />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-white">
          How to use this
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          {programIntro.principles.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[color:var(--volt)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="mb-2 flex items-center gap-2 text-[color:var(--volt)]">
        {icon}
        <span className="text-xs uppercase tracking-[0.16em] text-[color:var(--chalk)]/70">
          {label}
        </span>
      </div>
      <p className="font-[family-name:var(--font-display)] text-xl text-white">
        {value}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-white/65">{detail}</p>
    </div>
  );
}
