import {
  BriefcaseBusiness,
  MapPin,
  ShieldCheck,
  Sun,
  type LucideIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/section-header";
import { getSiteCopy } from "@/content/site-copy";
import type { SiteLocale } from "@/i18n/locale";

const BUSINESS_CARD_ICONS: ReadonlyArray<LucideIcon> = [
  Sun,
  BriefcaseBusiness,
  MapPin,
];

type HomeBusinessStaysProps = {
  locale: SiteLocale;
};

export function HomeBusinessStays({ locale }: HomeBusinessStaysProps) {
  const { business } = getSiteCopy(locale).home;

  return (
    <section
      aria-labelledby="business-stays-heading"
      className="w-full border-b border-secondary/30 bg-secondary/10 py-8 lg:py-16"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          className="mx-auto max-w-3xl"
          headingId="business-stays-heading"
          label={business.label}
          title={business.title}
          description={business.description}
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {business.cards.map((card, index) => {
            const Icon = BUSINESS_CARD_ICONS[index];

            return Icon ? (
              <li
                key={card.title}
                className="rounded-lg border border-secondary/50 bg-white p-6 shadow-sm"
              >
                <Icon aria-hidden="true" className="size-7 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-foreground">
                  {card.description}
                </p>
              </li>
            ) : null;
          })}
        </ul>

        <p className="mx-auto flex max-w-3xl items-start gap-3 rounded-lg border border-secondary/50 bg-white px-5 py-4 text-sm leading-relaxed text-foreground shadow-sm">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-primary"
          />
          <span>{business.securityNote}</span>
        </p>
      </div>
    </section>
  );
}
