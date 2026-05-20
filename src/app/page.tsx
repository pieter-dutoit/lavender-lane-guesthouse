import { HomeHero } from "@/components/home-hero";
import { HomeAmenities } from "@/components/home-amenities";
import { HomeRoomsRates } from "@/components/home-rooms-rates";
import { HomeSectionNav } from "@/components/home-section-nav";
import { HomeSectionShell } from "@/components/home-section-shell";

export default function Home() {
  return (
    <main className="flex-1">
      <HomeHero />
      <HomeSectionNav />
      <HomeRoomsRates />
      <HomeAmenities />
      <HomeSectionShell id="gallery" title="Gallery" />
      <HomeSectionShell id="contact" title="Contact" />
      <HomeSectionShell id="faqs" title="FAQs" />
    </main>
  );
}
