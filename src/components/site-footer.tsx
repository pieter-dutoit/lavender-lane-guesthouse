import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { FOOTER_NAV_ITEMS } from "@/constants/navigation";
import {
  getContacts,
  getLocation,
  getSocialLinks,
} from "@/content/site-content";
import { getEmailHref, getTelephoneHref } from "@/utils/contact-links";

const COPYRIGHT_YEAR = 2026;

export function SiteFooter() {
  const contacts = getContacts();
  const location = getLocation();
  const socialLinks = getSocialLinks();

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
                className="inline-flex w-fit items-center gap-2 font-medium text-secondary underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              >
                <MapPin aria-hidden="true" className="size-5 shrink-0" />
                Get Directions
                <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
              </a>

              <ul className="flex flex-col gap-4">
                {contacts.map((contact) => (
                  <li key={contact.email} className="flex flex-col gap-4">
                    <a
                      href={getEmailHref(contact.email)}
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
              Quick Links
            </h2>
            <ul className="mt-6 flex flex-col gap-3 text-base">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex w-fit text-neutral-100 transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {socialLinks.length > 0 ? (
            <section aria-labelledby="footer-social-heading">
              <h2
                id="footer-social-heading"
                className="text-xl font-bold text-white"
              >
                Connect With Us
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
        </div>

        <div className="mt-12 border-t border-neutral-300/70 pt-8 text-center text-base text-neutral-300">
          <p>
            &copy; {COPYRIGHT_YEAR} Lavender Lane Guesthouse. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
