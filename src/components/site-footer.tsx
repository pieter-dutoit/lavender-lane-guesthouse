import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { HashLink } from "@/components/hash-link";
import { SeoAnalyticsSettingsButton } from "@/components/seo-analytics-settings-button";
import { getFooterNavItems } from "@/constants/navigation";
import {
  getContacts,
  getLocalizedLocation,
  getSocialLinks,
} from "@/content/localized-site-content";
import { getSiteCopy } from "@/content/site-copy";
import {
  getAlternateLocale,
  getPagePath,
  type SiteLocale,
  type SitePageKey,
} from "@/i18n/locale";
import { getEmailHref, getTelephoneHref } from "@/utils/contact-links";
import { getGoogleAnalyticsId } from "@/utils/seo-analytics";

const COPYRIGHT_YEAR = 2026;

function hasRealHash(href: string) {
  const hashIndex = href.indexOf("#");

  return hashIndex !== -1 && hashIndex < href.length - 1;
}

type SiteFooterProps = {
  locale: SiteLocale;
  page: SitePageKey;
};

export function SiteFooter({ locale, page }: SiteFooterProps) {
  const contacts = getContacts();
  const location = getLocalizedLocation(locale);
  const socialLinks = getSocialLinks();
  const footerNavItems = getFooterNavItems(locale);
  const copy = getSiteCopy(locale);
  const measurementId = getGoogleAnalyticsId();
  const alternateLocale = getAlternateLocale(locale);
  const alternateHref = getPagePath(alternateLocale, page);

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          <section aria-labelledby="footer-contact-heading">
            <h2
              id="footer-contact-heading"
              className="text-xl font-bold text-white"
            >
              Lavender Lane Guesthouse
            </h2>

            <address className="mt-6 flex flex-col gap-5 text-base not-italic text-neutral-200">
              <p>{location.formattedAddress}</p>
              <a
                href={location.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                data-seo-event="directions_click"
                data-seo-locale={locale}
                data-seo-placement="footer"
                className="inline-flex w-fit items-center gap-2 font-medium text-secondary underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              >
                <MapPin aria-hidden="true" className="size-5 shrink-0" />
                {copy.contact.directions}
                <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
              </a>

              <ul className="flex flex-col gap-4">
                {contacts.map((contact) => (
                  <li key={contact.email} className="flex flex-col gap-4">
                    <a
                      href={getEmailHref(contact.email)}
                      data-seo-event="email_click"
                      data-seo-locale={locale}
                      data-seo-placement="footer"
                      className="inline-flex w-fit items-center gap-3 text-neutral-100 transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                    >
                      <Mail
                        aria-hidden="true"
                        className="size-5 shrink-0 text-neutral-100"
                      />
                      <span className="break-all">{contact.email}</span>
                    </a>
                    <a
                      href={getTelephoneHref(contact.phone)}
                      data-seo-event="phone_click"
                      data-seo-locale={locale}
                      data-seo-placement="footer"
                      className="inline-flex w-fit items-center gap-3 text-neutral-100 transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                    >
                      <Phone
                        aria-hidden="true"
                        className="size-5 shrink-0 text-neutral-100"
                      />
                      <span>{contact.phone}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </section>

          <nav aria-labelledby="footer-quick-links-heading">
            <h2
              id="footer-quick-links-heading"
              className="text-xl font-bold text-white"
            >
              {copy.footer.quickLinks}
            </h2>
            <ul className="mt-6 flex flex-col gap-3 text-base">
              {footerNavItems.map((item) => {
                const LinkComponent = hasRealHash(item.href) ? HashLink : Link;

                return (
                  <li key={item.href}>
                    <LinkComponent
                      href={item.href}
                      className="inline-flex w-fit text-neutral-100 transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                    >
                      {item.label}
                    </LinkComponent>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-8">
            {socialLinks.length > 0 ? (
              <section aria-labelledby="footer-social-heading">
                <h2
                  id="footer-social-heading"
                  className="text-xl font-bold text-white"
                >
                  {copy.footer.connect}
                </h2>
                <ul className="mt-6 flex flex-col gap-3 text-base">
                  {socialLinks.map((social) => (
                    <li key={social.link}>
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 font-medium text-secondary underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                      >
                        {social.name}
                        <ExternalLink
                          aria-hidden="true"
                          className="size-4 shrink-0"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section aria-labelledby="footer-settings-heading">
              <h2
                id="footer-settings-heading"
                className="text-xl font-bold text-white"
              >
                {copy.footer.siteSettings}
              </h2>
              <ul className="mt-6 flex flex-col gap-3 text-base">
                {measurementId ? (
                  <li>
                    <SeoAnalyticsSettingsButton
                      measurementId={measurementId}
                      locale={locale}
                      label={copy.footer.analytics}
                      className="inline-flex text-base"
                    />
                  </li>
                ) : null}
                <li>
                  <Link
                    href={alternateHref}
                    hrefLang={alternateLocale}
                    data-seo-event="language_switch"
                    data-seo-locale={locale}
                    data-seo-placement="footer"
                    className="inline-flex w-fit text-neutral-300 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                  >
                    {copy.footer.languageSwitch}
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-300/70 pt-8 text-center text-base text-neutral-300">
          <p>
            &copy; {COPYRIGHT_YEAR} Lavender Lane Guesthouse. {copy.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
