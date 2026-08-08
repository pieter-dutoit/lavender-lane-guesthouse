import {
  BedDouble,
  Coffee,
  HeartHandshake,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/section-header";
import {
  getAboutContent,
  type AboutHighlightSlug,
} from "@/content/site-content";

const ABOUT_HIGHLIGHT_ICONS: Record<AboutHighlightSlug, LucideIcon> = {
  "modern-rooms": BedDouble,
  "friendly-staff": HeartHandshake,
  "complimentary-amenities": Coffee,
  "prime-location": MapPin,
};

export function AboutOverview() {
  const { overview } = getAboutContent();

  return (
    <section
      aria-labelledby="about-overview-heading"
      className="w-full border-b border-secondary/30 py-10 lg:py-16"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          className="mx-auto max-w-2xl"
          headingId="about-overview-heading"
          label={overview.label}
          title={overview.title}
          description={overview.description}
        />

        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 py-2 sm:grid-cols-2 lg:grid-cols-4">
          {overview.highlights.map((highlight) => {
            const Icon = ABOUT_HIGHLIGHT_ICONS[highlight.slug];

            return (
              <li
                key={highlight.slug}
                className="flex flex-col items-center px-4 text-center"
              >
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-secondary/20 text-primary">
                  <Icon aria-hidden="true" className="size-7" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-primary">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-foreground">
                  {highlight.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
