import { ContactSection } from "@/components/contact-section";
import { getAboutContent } from "@/content/site-content";

export function AboutContact() {
  const { contact } = getAboutContent();

  return (
    <ContactSection
      sectionId="about-contact"
      headingId="about-contact-heading"
      label={contact.label}
      title={contact.title}
      description={contact.description}
    />
  );
}
