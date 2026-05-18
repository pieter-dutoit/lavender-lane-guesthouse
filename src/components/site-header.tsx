import Image from "next/image";
import Link from "next/link";

import { MAIN_NAV_ITEMS } from "@/constants/navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-secondary/40 bg-background">
      <nav
        aria-label="Primary"
        className="container mx-auto flex min-h-16 items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="flex shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Image
            src="/Lavender Lane Logo.webp"
            alt="Lavender Lane Guesthouse"
            width={350}
            height={171}
            sizes="(max-width: 640px) 112px, 136px"
            loading="eager"
            className="h-auto w-28 sm:w-34"
          />
        </Link>

        <ul className="flex items-center gap-2 text-sm font-medium text-foreground sm:gap-4">
          {MAIN_NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-sm px-2 py-1.5 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-3"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
