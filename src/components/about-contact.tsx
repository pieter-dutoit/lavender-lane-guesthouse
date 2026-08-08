import { ContactSection } from "@/components/contact-section";
import { getLocalizedAboutContent } from "@/content/localized-site-content";
import type { SiteLocale } from "@/i18n/locale";

type AboutContactProps = {
  locale: SiteLocale;
};

export function AboutContact({ locale }: AboutContactProps) {
  const { contact } = getLocalizedAboutContent(locale);

  return (
    <ContactSection
      sectionId="about-contact"
      headingId="about-contact-heading"
      label={contact.label}
      title={contact.title}
      description={contact.description}
      locale={locale}
    />
  );
}
