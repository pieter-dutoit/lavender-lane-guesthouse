import { HomePageContent } from "@/components/home-page-content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("home", "af-ZA");

export default function AfrikaansHomePage() {
  return <HomePageContent locale="af-ZA" />;
}
