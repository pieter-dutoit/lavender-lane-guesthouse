import { HomePageContent } from "@/components/home-page-content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("home", "en-ZA");

export default function EnglishHomePage() {
  return <HomePageContent locale="en-ZA" />;
}
