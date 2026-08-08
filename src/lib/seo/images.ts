import "server-only";

import {
  getAboutContent,
  getHomeGalleryImages,
  getHomeHeroImage,
  getRoomsRatesRooms,
} from "@/content/site-content";
import { absoluteUrl } from "@/lib/seo/site";
import type { SeoPageId } from "@/lib/seo/types";

export function getSitemapImageUrls(pageId: SeoPageId): ReadonlyArray<string> {
  if (pageId === "about") {
    return [absoluteUrl(getAboutContent().hero.image.src)];
  }

  const imagePaths = new Set<string>();
  imagePaths.add(getHomeHeroImage().src);

  for (const room of getRoomsRatesRooms()) {
    for (const image of room.galleryImages) {
      imagePaths.add(image.src);
    }
  }

  for (const image of getHomeGalleryImages()) {
    imagePaths.add(image.src);
  }

  return Array.from(imagePaths, (path) => absoluteUrl(`/${path.slice(1)}`));
}
