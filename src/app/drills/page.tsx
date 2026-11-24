import { DrillLibrary } from "@/components/drill-library";

export default function DrillsPage() {
  return (
    <div className="space-y-6">
      <div className="animate-rise">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--volt)]">
          Reference
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-white">
          Drill library
        </h1>
        <p className="mt-2 max-w-2xl text-white/75">
          Every drill lists gear, a both-feet protocol, coaching cues, and a harder
          progression. Filter by focus or equipment before you head outside.
        </p>
      </div>
      <div className="animate-rise-delay-1">
        <DrillLibrary />
      </div>
    </div>
  );
}
