import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { SiteHeaderMobileMenu } from "@/components/site-header-mobile-menu";
import { SiteHeaderNavLink } from "@/components/site-header-nav-link";
import { getBookingPlatform } from "@/content/site-content";

export function SiteHeader() {
  const bookingPlatform = getBookingPlatform();

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/40 bg-background">
      <nav
        aria-label="Primary"
        className="container mx-auto flex min-h-18 items-stretch justify-between gap-x-4 px-4 sm:px-6 md:min-h-16 lg:px-8"
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
            sizes="112px"
            loading="eager"
            className="h-auto w-28"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <a
            href={bookingPlatform.url}
            aria-label={`Book now on ${bookingPlatform.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-sm text-base font-extrabold text-accent transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
          >
            Book now
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>

          <SiteHeaderMobileMenu navItems={MAIN_NAV_ITEMS} />
        </div>

        <ul className="hidden items-stretch justify-end self-stretch gap-4 text-base font-medium text-foreground md:flex">
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
              className="pt-1 flex h-full items-center gap-1.5 border-b-2 border-transparent px-2 font-extrabold text-accent transition-colors duration-200 ease-out motion-reduce:transition-none hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-3"
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
