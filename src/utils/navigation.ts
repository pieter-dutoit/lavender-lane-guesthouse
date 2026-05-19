import type { MainNavItem } from "@/constants/navigation";

export function isMainNavItemActive(
  href: MainNavItem["href"],
  segment: string | null,
): boolean {
  const activeSegment = href === "/" ? null : href.slice(1);

  return segment === activeSegment;
}
