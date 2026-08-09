import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { SectionHeader } from "@/components/section-header";
import {
  getContacts,
  getLocalizedLocation,
  getSocialLinks,
} from "@/content/localized-site-content";
import { getSiteCopy } from "@/content/site-copy";
import type { SiteLocale } from "@/i18n/locale";
import { getEmailHref, getTelephoneHref } from "@/utils/contact-links";
import { joinClasses } from "@/utils/join-classes";

type ContactSectionProps = {
  sectionId: string;
  headingId: string;
  label: string;
  title: string;
  description: string;
  locale: SiteLocale;
  showMap?: boolean;
};

export function ContactSection({
  sectionId,
  headingId,
  label,
  title,
  description,
  locale,
  showMap = true,
}: ContactSectionProps) {
  const contacts = getContacts();
  const location = getLocalizedLocation(locale);
  const socialLinks = getSocialLinks();
  const { contact } = getSiteCopy(locale);

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-full border-b border-secondary/30 py-8 lg:py-16"
    >
      <div
        id={sectionId}
        className="absolute -mt-32 scroll-mt-32 md:-mt-36 md:scroll-mt-36 lg:-mt-40 lg:scroll-mt-40"
      />

      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId={headingId}
          label={label}
          title={title}
          description={description}
        />

        <div
          className={joinClasses(
            "grid grid-cols-1 gap-8",
            showMap && "md:grid-cols-2",
          )}
        >
          <div className="rounded-lg border border-secondary/50 bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-primary">
              {contact.information}
            </h3>
            <ul className="mt-2 text-sm">
              {contacts.map((contact) => (
                <li key={contact.email} className="space-y-2">
                  <a
                    href={getEmailHref(contact.email)}
                    data-seo-event="email_click"
                    data-seo-locale={locale}
                    data-seo-placement="contact_section"
                    className="flex touch-manipulation items-center gap-2 text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <Mail aria-hidden="true" className="size-4 text-primary" />
                    <span className="break-all">{contact.email}</span>
                  </a>
                  <a
                    href={getTelephoneHref(contact.phone)}
                    data-seo-event="phone_click"
                    data-seo-locale={locale}
                    data-seo-placement="contact_section"
                    className="flex touch-manipulation items-center gap-2 text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <Phone
                      aria-hidden="true"
                      className="size-4 text-primary"
                    />
                    <span>{contact.phone}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-primary">
              {contact.address}
            </h3>
            <address className="mt-2 flex flex-col gap-4 text-sm not-italic text-foreground">
              <p>{location.formattedAddress}</p>
              <a
                href={location.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                data-seo-event="directions_click"
                data-seo-locale={locale}
                data-seo-placement="contact_section"
                className="inline-flex w-fit touch-manipulation items-center gap-1 font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <MapPin aria-hidden="true" className="size-4" />
                {contact.directions}
                <ExternalLink aria-hidden="true" className="size-3" />
              </a>
            </address>

            {socialLinks.length > 0 ? (
              <>
                <h3 className="mt-6 text-lg font-semibold text-primary">
                  {contact.followUs}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-3 text-sm">
                  {socialLinks.map((social) => (
                    <li key={social.link}>
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex touch-manipulation items-center gap-2 font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      >
                        <ExternalLink aria-hidden="true" className="size-4" />
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {showMap ? (
            <div className="rounded-lg border border-secondary/50 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-primary">
                {contact.location}
              </h3>
              <div className="mt-4 overflow-hidden rounded-lg border border-secondary/50 bg-secondary/15">
                <iframe
                  title={contact.mapTitle}
                  src={location.mapsEmbedSrc}
                  width="600"
                  height="350"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="min-h-80 w-full border-0"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
