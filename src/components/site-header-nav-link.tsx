import Link from "next/link";

import type { MainNavItem } from "@/constants/navigation";

type SiteHeaderNavLinkProps = {
  href: MainNavItem["href"];
  isActive: boolean;
  children: React.ReactNode;
};

export function SiteHeaderNavLink({
  href,
  isActive,
  children,
}: SiteHeaderNavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`flex h-full items-center border-b-2 px-2 pt-1 font-semibold transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:px-3 ${
        isActive
          ? "border-accent text-foreground hover:border-accent"
          : "border-transparent hover:border-gray-200 hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
