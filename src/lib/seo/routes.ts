import { absoluteUrl } from "@/lib/seo/site";
import type {
  LocalizedSeoPage,
  SeoLocale,
  SeoPageId,
  SeoRoute,
} from "@/lib/seo/types";

export const SEO_ROUTES: ReadonlyArray<SeoRoute> = [
  {
    id: "home",
    pages: {
      "en-ZA": {
        pathname: "/",
        title: "Affordable Accommodation in Kathu | Lavender Lane Guesthouse",
        description:
          "Book comfortable, affordable accommodation in central Kathu, Northern Cape, with breakfast included, full solar backup, free Wi-Fi, laundry and rooms from R750.",
        openGraphLocale: "en_ZA",
      },
      "af-ZA": {
        pathname: "/af",
        title: "Bekostigbare Akkommodasie in Kathu | Lavender Lane Guesthouse",
        description:
          "Bespreek gerieflike, bekostigbare verblyf in sentraal Kathu, Noord-Kaap, met ontbyt ingesluit, volledige sonkrag-rugsteun, gratis Wi-Fi, wasgoeddiens en kamers vanaf R750.",
        openGraphLocale: "af_ZA",
      },
    },
  },
  {
    id: "about",
    pages: {
      "en-ZA": {
        pathname: "/about",
        title: "About Lavender Lane Guesthouse | Kathu, Northern Cape",
        description:
          "Learn about Lavender Lane Guesthouse, our 15 comfortable rooms and a hospitality team with more than 20 years’ experience in Kathu, Northern Cape.",
        openGraphLocale: "en_ZA",
      },
      "af-ZA": {
        pathname: "/af/about",
        title: "Oor Lavender Lane Guesthouse | Kathu, Noord-Kaap",
        description:
          "Lees meer oor Lavender Lane Guesthouse, ons 15 gerieflike kamers en ’n gasvryheidspan met meer as 20 jaar se ervaring in Kathu, Noord-Kaap.",
        openGraphLocale: "af_ZA",
      },
    },
  },
];

export function getSeoRoute(pageId: SeoPageId): SeoRoute {
  const route = SEO_ROUTES.find((candidate) => candidate.id === pageId);

  if (!route) {
    throw new Error(`Missing SEO route configuration for ${pageId}`);
  }

  return route;
}

export function getLocalizedSeoPage(
  pageId: SeoPageId,
  locale: SeoLocale,
): LocalizedSeoPage {
  return getSeoRoute(pageId).pages[locale];
}

export function getLanguageAlternates(
  pageId: SeoPageId,
): Record<SeoLocale | "x-default", string> {
  const route = getSeoRoute(pageId);

  return {
    "en-ZA": absoluteUrl(route.pages["en-ZA"].pathname),
    "af-ZA": absoluteUrl(route.pages["af-ZA"].pathname),
    "x-default": absoluteUrl(route.pages["en-ZA"].pathname),
  };
}
