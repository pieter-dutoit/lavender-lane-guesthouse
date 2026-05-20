import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type AmenityChipProps = {
  icon: LucideIcon;
  children: ReactNode;
};

export function AmenityChip({ icon: Icon, children }: AmenityChipProps) {
  return (
    <li className="flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-sm">
      <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" />
      <span className="text-xs font-semibold text-foreground">{children}</span>
    </li>
  );
}
