import { ExternalLink, Languages } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SiteHeaderMobileMenu } from "@/components/site-header-mobile-menu";
import { SiteHeaderNavLink } from "@/components/site-header-nav-link";
import { getMainNavItems } from "@/constants/navigation";
import { HEADER_LOGO_IMAGE_SIZES } from "@/constants/image-sizes";
import {
  getBookingPlatform,
  getLocalizedSiteLogoImage,
} from "@/content/localized-site-content";
import { getSiteCopy } from "@/content/site-copy";
import {
  getAlternateLocale,
  getPagePath,
  type SiteLocale,
  type SitePageKey,
} from "@/i18n/locale";

type SiteHeaderProps = {
  locale: SiteLocale;
  page: SitePageKey;
};

export function SiteHeader({ locale, page }: SiteHeaderProps) {
  const bookingPlatform = getBookingPlatform();
  const logoImage = getLocalizedSiteLogoImage(locale);
  const copy = getSiteCopy(locale);
  const navItems = getMainNavItems(locale);
  const alternateLocale = getAlternateLocale(locale);
  const alternateHref = getPagePath(alternateLocale, page);

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/40 bg-background">
      <nav
        aria-label={copy.navigation.primaryLabel}
        className="container mx-auto flex min-h-18 items-stretch justify-between gap-x-4 px-4 sm:px-6 md:min-h-16 lg:px-8"
      >
        <Link
          href={getPagePath(locale, "home")}
          className="flex shrink-0 items-center rounded-sm py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Image
            src={logoImage.src}
            alt={logoImage.alt}
            width={logoImage.width}
            height={logoImage.height}
            sizes={HEADER_LOGO_IMAGE_SIZES}
            loading="eager"
            className="h-auto w-28"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <Link
            href={alternateHref}
            hrefLang={alternateLocale}
            aria-label={copy.navigation.languageSwitchLabel}
            data-seo-event="language_switch"
            data-seo-locale={locale}
            data-seo-placement="header_mobile"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Languages aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">
              {copy.navigation.languageSwitch}
            </span>
          </Link>
          <a
            href={bookingPlatform.url}
            aria-label={copy.booking.headerAriaLabel}
            target="_blank"
            rel="noopener noreferrer"
            data-seo-event="booking_engine_click"
            data-seo-locale={locale}
            data-seo-placement="header_mobile"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-sm text-base font-extrabold text-accent transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
          >
            {copy.booking.bookNow}
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>

          <SiteHeaderMobileMenu
            navItems={navItems}
            activePage={page}
            openLabel={copy.navigation.openMenu}
            closeLabel={copy.navigation.closeMenu}
          />
        </div>

        <ul className="hidden items-stretch justify-end self-stretch gap-4 text-base font-medium text-foreground md:flex">
          {navItems.map((item) => (
            <li key={item.href} className="flex">
              <SiteHeaderNavLink
                href={item.href}
                isActive={item.page === page}
              >
                {item.label}
              </SiteHeaderNavLink>
            </li>
          ))}
          <li className="flex">
            <Link
              href={alternateHref}
              hrefLang={alternateLocale}
              aria-label={copy.navigation.languageSwitchLabel}
              data-seo-event="language_switch"
              data-seo-locale={locale}
              data-seo-placement="header_desktop"
              className="flex h-full items-center gap-1.5 border-b-2 border-transparent px-2 pt-1 font-semibold text-primary transition-colors duration-200 ease-out hover:border-secondary hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:px-3"
            >
              <Languages aria-hidden="true" className="size-4" />
              {copy.navigation.languageSwitch}
            </Link>
          </li>
          <li className="flex">
            <a
              href={bookingPlatform.url}
              aria-label={copy.booking.headerAriaLabel}
              target="_blank"
              rel="noopener noreferrer"
              data-seo-event="booking_engine_click"
              data-seo-locale={locale}
              data-seo-placement="header_desktop"
              className="flex h-full items-center gap-1.5 border-b-2 border-transparent px-2 pt-1 font-extrabold text-accent transition-colors duration-200 ease-out hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:px-3"
            >
              {copy.booking.bookNow}
              <ExternalLink aria-hidden="true" className="size-5" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
