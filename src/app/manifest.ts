import type { MetadataRoute } from "next";

import {
  DEFAULT_LOCALE,
  LODGING_FACTS,
  SITE_BACKGROUND_COLOR,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_THEME_COLOR,
} from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: LODGING_FACTS.descriptions[DEFAULT_LOCALE],
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: SITE_BACKGROUND_COLOR,
    theme_color: SITE_THEME_COLOR,
    lang: DEFAULT_LOCALE,
    categories: ["travel", "hospitality"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
