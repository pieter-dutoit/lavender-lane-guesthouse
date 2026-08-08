import { HomeHero } from "@/components/home-hero";
import { HomeAmenities } from "@/components/home-amenities";
import { HomeContact } from "@/components/home-contact";
import { HomeFaq } from "@/components/home-faq";
import { HomeGallery } from "@/components/home-gallery";
import { HomePolicies } from "@/components/home-policies";
import { HomeRoomsRates } from "@/components/home-rooms-rates";
import { HomeSectionNav } from "@/components/home-section-nav";

export default function Home() {
  return (
    <main className="flex-1">
      <HomeHero />
      <HomeSectionNav />
      <HomeRoomsRates />
      <HomeAmenities />
      <HomeGallery />
      <HomeContact />
      <HomePolicies />
      <HomeFaq />
    </main>
  );
}
