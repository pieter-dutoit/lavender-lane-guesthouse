import { ExternalLink, Lock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import {
  getBookingPlatform,
  getHomeHeroImage,
  getLocation,
  getPrimaryContact,
} from "@/content/site-content";
import { HOME_HERO_IMAGE_SIZES } from "@/constants/image-sizes";
import { getEmailHref, getTelephoneHref } from "@/utils/contact-links";

export function HomeHero() {
  const bookingPlatform = getBookingPlatform();
  const contact = getPrimaryContact();
  const heroImage = getHomeHeroImage();
  const location = getLocation();

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
        />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#edece8_0%,rgb(247_244_237_/_0.96)_16%,rgb(247_244_237_/_0.68)_32%,rgb(247_244_237_/_0)_56%)] sm:block" />
      </div>

      <div className="container relative z-10 mx-auto grid w-full grid-cols-1 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-2xl flex-col gap-6 py-10 sm:py-20 md:gap-8 md:py-24 lg:py-32">
          <div>
            <h1 className="text-4xl font-semibold text-primary md:text-5xl lg:text-6xl max-w-[15ch]">
              Lavender Lane Guesthouse
            </h1>
            <p className="mt-2 text-xs font-extrabold text-primary/70 md:text-sm">
              Accommodation in Kathu, Northern Cape
            </p>
            <a
              href={location.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              <span>
                {location.city}, {location.province}
              </span>
              <strong className="font-bold">(Get Directions)</strong>
            </a>
          </div>

          <p className="max-w-[45ch] text-sm leading-6 text-foreground md:text-base md:leading-normal">
            <strong>Your Home Away From Home.</strong> <br />
            Experience a relaxing and comfortable stay at our centrally located
            bed &amp; breakfast in Kathu.
          </p>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-extrabold text-primary md:text-xl">
              Book online, or contact us directly.
            </p>
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex flex-col items-start">
                <a
                  href={bookingPlatform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-base font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Book Online
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
                <em className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                  <Lock aria-hidden="true" className="size-3" />
                  Opens{" "}
                  <strong className="font-semibold">
                    {bookingPlatform.name}
                  </strong>
                </em>
              </div>

              <a
                href={getTelephoneHref(contact.phone)}
                aria-label="Call Lavender Lane Guesthouse"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-secondary bg-background px-4 py-2 text-base font-semibold text-primary shadow-sm transition-colors hover:bg-secondary/30 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Phone aria-hidden="true" className="size-4" />
                <span>{contact.phone}</span>
              </a>
              <a
                href={getEmailHref(contact.email)}
                aria-label="Email Lavender Lane Guesthouse"
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
