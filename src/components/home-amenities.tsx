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
import { getHomeAmenities, type HomeAmenitySlug } from "@/content/site-content";

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

export function HomeAmenities() {
  const amenities = getHomeAmenities();

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
            label="Stay in Comfort"
            title="Facilities & Amenities"
            description="Enjoy breakfast options, reliable power, free Wi-Fi, secure parking, and practical in-room comforts for business or leisure travel."
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
