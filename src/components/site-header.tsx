import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { SiteHeaderNavLink } from "@/components/site-header-nav-link";
import { getBookingPlatform } from "@/content/site-content";

export function SiteHeader() {
  const bookingPlatform = getBookingPlatform();

  return (
    <header className="border-b border-secondary/40 bg-background">
      <nav
        aria-label="Primary"
        className="container mx-auto flex min-h-16 flex-wrap items-stretch justify-between gap-x-4 px-4 sm:flex-nowrap sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-sm py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Image
            src="/Lavender Lane Logo.webp"
            alt="Lavender Lane Guesthouse"
            width={350}
            height={171}
            sizes="(max-width: 640px) 112px, 120px"
            loading="eager"
            className="h-auto w-28 sm:w-30"
          />
        </Link>

        <ul className="flex w-full justify-end self-stretch items-stretch gap-2 text-base font-medium text-foreground sm:w-auto sm:gap-4">
          {MAIN_NAV_ITEMS.map((item) => (
            <li key={item.href} className="flex">
              <SiteHeaderNavLink href={item.href}>
                {item.label}
              </SiteHeaderNavLink>
            </li>
          ))}
          <li className="flex">
            <a
              href={bookingPlatform.url}
              aria-label={`Book now on ${bookingPlatform.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-1 flex h-full items-center gap-1.5 border-b-2 border-transparent px-2 font-extrabold text-primary transition-colors duration-200 ease-out motion-reduce:transition-none hover:border-gray-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-3"
            >
              Book Now
              <ExternalLink aria-hidden="true" className="size-5" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
