import type { MetadataRoute } from "next";

import { getSitemapImageUrls } from "@/lib/seo/images";
import { getLanguageAlternates, SEO_ROUTES } from "@/lib/seo/routes";
import { absoluteUrl, SITE_LOCALES } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return SEO_ROUTES.flatMap((route) => {
    const languages = getLanguageAlternates(route.id);
    const images = getSitemapImageUrls(route.id);

    return SITE_LOCALES.map((locale) => ({
      url: absoluteUrl(route.pages[locale].pathname),
      alternates: {
        languages,
      },
      images: [...images],
    }));
  });
}
