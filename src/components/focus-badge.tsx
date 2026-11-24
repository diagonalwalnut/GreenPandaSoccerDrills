import { Badge } from "@/components/ui/badge";
import { focusLabels } from "@/data/labels";
import type { Focus } from "@/data/types";
import { cn } from "@/lib/utils";

const styles: Record<Focus, string> = {
  control: "bg-emerald-500/20 text-emerald-100 border-emerald-400/30",
  footwork: "bg-sky-500/20 text-sky-100 border-sky-400/30",
  power: "bg-amber-500/20 text-amber-100 border-amber-400/30",
};

export function FocusBadge({
  focus,
  className,
}: {
  focus: Focus;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("border font-medium", styles[focus], className)}
    >
      {focusLabels[focus]}
    </Badge>
  );
}
