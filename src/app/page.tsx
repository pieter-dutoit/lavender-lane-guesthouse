import { HomeHero } from "@/components/home-hero";
import { HomeSectionNav } from "@/components/home-section-nav";
import { HomeSectionShell } from "@/components/home-section-shell";

export default function Home() {
  return (
    <main className="flex-1">
      <HomeHero />
      <HomeSectionNav />
      <HomeSectionShell id="rooms-rates" title="Rooms & Rates" />
      <HomeSectionShell id="amenities" title="Amenities" />
      <HomeSectionShell id="gallery" title="Gallery" />
      <HomeSectionShell id="contact" title="Contact" />
      <HomeSectionShell id="faqs" title="FAQs" />
    </main>
  );
}
