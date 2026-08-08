import { AboutPageContent } from "@/components/about-page-content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("about", "en-ZA");

export default function EnglishAboutPage() {
  return <AboutPageContent locale="en-ZA" />;
}
