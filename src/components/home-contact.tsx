import { ContactSection } from "@/components/contact-section";
import { getSiteCopy } from "@/content/site-copy";
import type { SiteLocale } from "@/i18n/locale";

type HomeContactProps = {
  locale: SiteLocale;
};

export function HomeContact({ locale }: HomeContactProps) {
  const copy = getSiteCopy(locale).home.contact;

  return (
    <ContactSection
      sectionId="contact"
      headingId="contact-heading"
      label={copy.label}
      title={copy.title}
      description={copy.description}
      locale={locale}
    />
  );
}
