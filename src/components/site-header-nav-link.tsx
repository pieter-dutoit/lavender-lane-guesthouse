"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import type { MainNavItem } from "@/constants/navigation";
import { isMainNavItemActive } from "@/utils/navigation";

type SiteHeaderNavLinkProps = {
  href: MainNavItem["href"];
  children: React.ReactNode;
};

export function SiteHeaderNavLink({ href, children }: SiteHeaderNavLinkProps) {
  const segment = useSelectedLayoutSegment();
  const isActive = isMainNavItemActive(href, segment);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`pt-1 font-semibold flex h-full items-center border-b-2 px-2 transition-colors duration-200 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-3 ${
        isActive
          ? "border-primary text-foreground hover:border-primary"
          : "border-transparent hover:border-gray-200 hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
