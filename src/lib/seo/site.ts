import type { SeoLocale, SiteFacts } from "@/lib/seo/types";

export const SITE_ORIGIN = new URL("https://lavenderlanekathu.co.za");

export const SITE_NAME = "Lavender Lane Guesthouse";
export const SITE_SHORT_NAME = "Lavender Lane";

export const SITE_LOCALES: ReadonlyArray<SeoLocale> = ["en-ZA", "af-ZA"];

export const DEFAULT_LOCALE: SeoLocale = "en-ZA";

export const SITE_THEME_COLOR = "#1f6f6a";
export const SITE_BACKGROUND_COLOR = "#ffffff";

export const SITE_LOGO_PATH = "/media/lavender-lane-logo.png";
export const SITE_SOCIAL_IMAGE_PATH = "/media/lavender-lane-social.jpg";

export const SITE_SOCIAL_IMAGE = {
  path: SITE_SOCIAL_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "Lavender Lane Guesthouse accommodation in Kathu, Northern Cape",
} satisfies {
  path: `/${string}`;
  width: number;
  height: number;
  alt: string;
};

export const LODGING_FACTS = {
  bookingUrl: "https://book.nightsbridge.com/38107",
  email: "info@lavenderlanekathu.co.za",
  telephone: "+27 67 355 8676",
  address: {
    streetAddress: "17 Nieshout Street",
    addressLocality: "Kathu",
    addressRegion: "Northern Cape",
    postalCode: "8446",
    addressCountry: "ZA",
  },
  geo: {
    latitude: -27.6952471,
    longitude: 23.052124,
  },
  mapUrl: "https://maps.app.goo.gl/KR5bnydJB9HdNGMs8",
  sameAs: [
    "https://maps.app.goo.gl/KR5bnydJB9HdNGMs8",
    "https://www.instagram.com/lavenderlanekathu/",
    "https://www.booking.com/hotel/za/lavender-lane-guesthouse.html",
    "https://www.lekkeslaap.co.za/accommodation/lavender-lane-guest-house-64",
  ],
  checkinTime: "14:00",
  checkoutTime: "10:00",
  numberOfRooms: 15,
  priceCurrency: "ZAR",
  priceRange: "R750-R800",
  descriptions: {
    "en-ZA":
      "Affordable, business-ready accommodation in central Kathu with breakfast included, full solar backup, free Wi-Fi, laundry and daily-cleaned rooms.",
    "af-ZA":
      "Bekostigbare, sakereed verblyf in sentraal Kathu met ontbyt ingesluit, volledige sonkrag-rugsteun, gratis Wi-Fi, wasgoeddiens en kamers wat daagliks skoongemaak word.",
  },
} satisfies SiteFacts;

export function absoluteUrl(pathname: `/${string}`): string {
  return new URL(pathname, SITE_ORIGIN).toString();
}
