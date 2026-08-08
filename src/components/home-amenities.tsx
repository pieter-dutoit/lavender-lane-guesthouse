import {
  AirVent,
  CircleParking,
  Droplet,
  EggFried,
  FlameKindling,
  Microwave,
  ShieldCheck,
  Sofa,
  Sparkles,
  Sun,
  Ticket,
  Tv,
  Utensils,
  WashingMachine,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/section-header";
import {
  getLocalizedHomeAmenities,
} from "@/content/localized-site-content";
import { getSiteCopy } from "@/content/site-copy";
import type { HomeAmenitySlug } from "@/content/site-content";
import type { SiteLocale } from "@/i18n/locale";

const HOME_AMENITY_ICONS: Record<HomeAmenitySlug, LucideIcon> = {
  breakfast: EggFried,
  "lunch-packs": Utensils,
  "dinner-vouchers": Ticket,
  "braai-area": FlameKindling,
  "indoor-ourdoor-lounges": Sofa,
  "solar-power-no-load-shedding": Sun,
  "borehole-water": Droplet,
  "free-wifi": Wifi,
  "air-conditioning": AirVent,
  dstv: Tv,
  kitchenette: Microwave,
  "laundry-services": WashingMachine,
  "daily-room-cleaning": Sparkles,
  "off-street-parking": CircleParking,
  "secure-premises": ShieldCheck,
};

type HomeAmenitiesProps = {
  locale: SiteLocale;
};

export function HomeAmenities({ locale }: HomeAmenitiesProps) {
  const amenities = getLocalizedHomeAmenities(locale);
  const copy = getSiteCopy(locale);

  return (
    <section
      aria-labelledby="amenities-heading"
      className="relative w-full border-b border-secondary/30 py-8 lg:py-16"
    >
      <div id="amenities" className="absolute -mt-32 md:-mt-36 lg:-mt-40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 rounded-lg border border-secondary/50 bg-secondary/15 p-6 sm:p-8 lg:p-10">
          <SectionHeader
            align="center"
            className="mx-auto max-w-2xl"
            headingId="amenities-heading"
            label={copy.home.amenities.label}
            title={copy.home.amenities.title}
            description={copy.home.amenities.description}
          />

          <ul className="mx-auto flex max-w-5xl flex-wrap-reverse justify-center gap-6 lg:gap-8">
            {amenities.map((amenity) => {
              const Icon = HOME_AMENITY_ICONS[amenity.slug];

              return (
                <li
                  key={amenity.slug}
                  className="flex w-26 flex-col items-center text-center"
                >
                  <div className="flex flex-col items-center transition-transform duration-150 ease-in-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100">
                    <Icon aria-hidden="true" className="size-7 text-primary" />
                    <span className="mt-2 text-xs font-semibold text-primary">
                      {amenity.name}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
