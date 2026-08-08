import { AboutPageContent } from "@/components/about-page-content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("about", "af-ZA");

export default function AfrikaansAboutPage() {
  return <AboutPageContent locale="af-ZA" />;
}
