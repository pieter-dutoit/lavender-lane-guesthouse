import { HomeFaqAccordion } from "@/components/home-faq-accordion";
import { SectionHeader } from "@/components/section-header";
import { getLocalizedHomeFaqs } from "@/content/localized-site-content";
import { getSiteCopy } from "@/content/site-copy";
import type { SiteLocale } from "@/i18n/locale";

type HomeFaqProps = {
  locale: SiteLocale;
};

export function HomeFaq({ locale }: HomeFaqProps) {
  const faqs = getLocalizedHomeFaqs(locale);
  const copy = getSiteCopy(locale).home.faq;

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="faqs-heading"
      className="relative w-full border-b border-secondary/30 py-8 lg:py-16"
    >
      <div id="faqs" className="absolute -mt-32 md:-mt-36 lg:-mt-40" />

      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="faqs-heading"
          label={copy.label}
          title={copy.title}
          description={copy.description}
        />

        <div className="w-full">
          <HomeFaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
