import { HomeFaqAccordion } from "@/components/home-faq-accordion";
import { SectionHeader } from "@/components/section-header";
import { getHomeFaqs } from "@/content/site-content";

export function HomeFaq() {
  const faqs = getHomeFaqs();

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
          label="Lavender Lane FAQs"
          title="Frequently Asked Questions"
          description="Helpful answers for guests planning accommodation in Kathu, from room options and meals to off-street parking, gated premises, and reliable power."
        />

        <div className="w-full">
          <HomeFaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
