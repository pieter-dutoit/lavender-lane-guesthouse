import { AboutContact } from "@/components/about-contact";
import { AboutHero } from "@/components/about-hero";
import { AboutOverview } from "@/components/about-overview";
import { AboutStory } from "@/components/about-story";
import { AboutTeam } from "@/components/about-team";
import { JsonLd } from "@/components/json-ld";
import { SitePageShell } from "@/components/site-page-shell";
import type { SiteLocale } from "@/i18n/locale";
import { createPageJsonLd } from "@/lib/seo/structured-data";

type AboutPageContentProps = {
  locale: SiteLocale;
};

export function AboutPageContent({ locale }: AboutPageContentProps) {
  return (
    <SitePageShell locale={locale} page="about">
      <main className="flex-1">
        <JsonLd id="page-json-ld" data={createPageJsonLd("about", locale)} />
        <AboutHero locale={locale} />
        <AboutOverview locale={locale} />
        <AboutStory locale={locale} />
        <AboutTeam locale={locale} />
        <AboutContact locale={locale} />
      </main>
    </SitePageShell>
  );
}
