import type { Metadata } from "next";

import { AboutContact } from "@/components/about-contact";
import { AboutHero } from "@/components/about-hero";
import { AboutOverview } from "@/components/about-overview";
import { AboutStory } from "@/components/about-story";
import { AboutTeam } from "@/components/about-team";

export const metadata: Metadata = {
  title: "About Lavender Lane Guesthouse",
  description:
    "Learn about Lavender Lane Guesthouse in Kathu, our 15 comfortable rooms, experienced hospitality team, and welcoming service.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />
      <AboutOverview />
      <AboutStory />
      <AboutTeam />
      <AboutContact />
    </main>
  );
}
