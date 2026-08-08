import { HomeAmenities } from "@/components/home-amenities";
import { HomeBusinessStays } from "@/components/home-business-stays";
import { HomeContact } from "@/components/home-contact";
import { HomeFaq } from "@/components/home-faq";
import { HomeGallery } from "@/components/home-gallery";
import { HomeHero } from "@/components/home-hero";
import { HomePolicies } from "@/components/home-policies";
import { HomeRoomsRates } from "@/components/home-rooms-rates";
import { HomeSectionNav } from "@/components/home-section-nav";
import { JsonLd } from "@/components/json-ld";
import { SitePageShell } from "@/components/site-page-shell";
import type { SiteLocale } from "@/i18n/locale";
import {
  createFaqPageJsonLd,
  createPageJsonLd,
  getSeoFaqs,
} from "@/lib/seo/structured-data";

type HomePageContentProps = {
  locale: SiteLocale;
};

export function HomePageContent({ locale }: HomePageContentProps) {
  const faqs = getSeoFaqs(locale);

  return (
    <SitePageShell locale={locale} page="home">
      <main className="flex-1">
        <JsonLd id="page-json-ld" data={createPageJsonLd("home", locale)} />
        <JsonLd id="faq-json-ld" data={createFaqPageJsonLd(locale, faqs)} />
        <HomeHero locale={locale} />
        <HomeSectionNav locale={locale} />
        <HomeRoomsRates locale={locale} />
        <HomeAmenities locale={locale} />
        <HomeBusinessStays locale={locale} />
        <HomeGallery locale={locale} />
        <HomeContact locale={locale} />
        <HomePolicies locale={locale} />
        <HomeFaq locale={locale} />
      </main>
    </SitePageShell>
  );
}
