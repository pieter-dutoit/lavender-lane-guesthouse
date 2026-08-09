import type { Metadata, Viewport } from "next";

import {
  getLanguageAlternates,
  getLocalizedSeoPage,
} from "@/lib/seo/routes";
import {
  absoluteUrl,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_SOCIAL_IMAGE,
  SITE_THEME_COLOR,
} from "@/lib/seo/site";
import type { SeoLocale, SeoPageId } from "@/lib/seo/types";

const ROOT_TITLES: Record<SeoLocale, string> = {
  "en-ZA": "Affordable Accommodation In Kathu | Lavender Lane Guesthouse",
  "af-ZA": "Bekostigbare Akkommodasie In Kathu | Lavender Lane Guesthouse",
};

const TITLE_TEMPLATES: Record<SeoLocale, string> = {
  "en-ZA": `%s | ${SITE_NAME}`,
  "af-ZA": `%s | ${SITE_NAME}`,
};

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE_THEME_COLOR,
  colorScheme: "light",
};

export function createRootMetadata(locale: SeoLocale): Metadata {
  const home = getLocalizedSeoPage("home", locale);

  return {
    metadataBase: SITE_ORIGIN,
    title: {
      default: ROOT_TITLES[locale],
      template: TITLE_TEMPLATES[locale],
    },
    description: home.description,
    applicationName: SITE_NAME,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "travel",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function createPageMetadata(
  pageId: SeoPageId,
  locale: SeoLocale,
): Metadata {
  const page = getLocalizedSeoPage(pageId, locale);
  const alternateLocale = locale === "en-ZA" ? "af_ZA" : "en_ZA";
  const pageUrl = absoluteUrl(page.pathname);
  const socialImageUrl = absoluteUrl(SITE_SOCIAL_IMAGE.path);

  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    alternates: {
      canonical: pageUrl,
      languages: getLanguageAlternates(pageId),
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: page.title,
      description: page.description,
      siteName: SITE_NAME,
      locale: page.openGraphLocale,
      alternateLocale,
      images: [
        {
          url: socialImageUrl,
          width: SITE_SOCIAL_IMAGE.width,
          height: SITE_SOCIAL_IMAGE.height,
          alt: SITE_SOCIAL_IMAGE.alt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [
        {
          url: socialImageUrl,
          alt: SITE_SOCIAL_IMAGE.alt,
        },
      ],
    },
  };
}
