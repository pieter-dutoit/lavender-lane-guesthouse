import { ExternalLink, Lock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import {
  getBookingPlatform,
  getLocalizedHomeHeroImage,
  getLocalizedLocation,
  getPrimaryContact,
} from "@/content/localized-site-content";
import { getSiteCopy } from "@/content/site-copy";
import { HOME_HERO_IMAGE_SIZES } from "@/constants/image-sizes";
import type { SiteLocale } from "@/i18n/locale";
import { getEmailHref, getTelephoneHref } from "@/utils/contact-links";

type HomeHeroProps = {
  locale: SiteLocale;
};

export function HomeHero({ locale }: HomeHeroProps) {
  const bookingPlatform = getBookingPlatform();
  const contact = getPrimaryContact();
  const heroImage = getLocalizedHomeHeroImage(locale);
  const location = getLocalizedLocation(locale);
  const copy = getSiteCopy(locale);

  return (
    <section className="relative overflow-hidden bg-[#edece8]">
      <div className="relative aspect-20/9 w-full bg-[#edece8] sm:absolute sm:inset-y-0 sm:right-0 sm:left-[40vw] sm:aspect-auto sm:h-full">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          preload
          sizes={HOME_HERO_IMAGE_SIZES}
          className="object-cover object-right"
          fetchPriority="high"
        />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#edece8_0%,rgb(247_244_237_/_0.96)_16%,rgb(247_244_237_/_0.68)_32%,rgb(247_244_237_/_0)_56%)] sm:block" />
      </div>

      <div className="container relative z-10 mx-auto grid w-full grid-cols-1 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-2xl flex-col gap-6 py-10 sm:py-20 md:gap-8 md:py-24 lg:py-32">
          <div>
            <h1 className="max-w-[20ch] text-4xl font-semibold text-balance text-primary md:text-5xl lg:text-6xl">
              {copy.home.hero.title}
            </h1>
            <p className="mt-2 text-xs font-extrabold text-primary/70 md:text-sm">
              {copy.home.hero.label}
            </p>
            <a
              href={location.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              data-seo-event="directions_click"
              data-seo-locale={locale}
              data-seo-placement="hero"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              <span>
                {location.city}, {location.province}
              </span>
              <strong className="font-bold">
                ({copy.home.hero.directions})
              </strong>
            </a>
          </div>

          <p className="max-w-[45ch] text-sm leading-6 text-foreground md:text-base md:leading-normal">
            <strong>{copy.home.hero.lead}</strong> <br />
            {copy.home.hero.description}
          </p>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-extrabold text-primary md:text-xl">
              {copy.home.hero.bookingPrompt}
            </p>
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex flex-col items-start">
                <a
                  href={bookingPlatform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-seo-event="booking_engine_click"
                  data-seo-locale={locale}
                  data-seo-placement="hero"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-base font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {copy.booking.bookOnline}
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
                <em className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                  <Lock aria-hidden="true" className="size-3" />
                  <strong className="font-semibold">
                    {copy.booking.opensPlatform}
                  </strong>
                </em>
              </div>

              <a
                href={getTelephoneHref(contact.phone)}
                data-seo-event="phone_click"
                data-seo-locale={locale}
                data-seo-placement="hero"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-secondary bg-background px-4 py-2 text-base font-semibold text-primary shadow-sm transition-colors hover:bg-secondary/30 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Phone aria-hidden="true" className="size-4" />
                <span>{contact.phone}</span>
              </a>
              <a
                href={getEmailHref(contact.email)}
                data-seo-event="email_click"
                data-seo-locale={locale}
                data-seo-placement="hero"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-secondary bg-background px-4 py-2 text-base font-semibold text-primary shadow-sm transition-colors hover:bg-secondary/30 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                <span className="break-all">{contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
