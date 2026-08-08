import type { SiteLocale } from "@/i18n/locale";

export type Locale = SiteLocale;

export type SeoLocale = Locale;

export type OpenGraphLocale = "en_ZA" | "af_ZA";

export type PageKey = "home" | "about";

export type SeoPageId = PageKey;

export type SeoPathname = "/" | "/about" | "/af" | "/af/about";

export type LocalizedContent = {
  pathname: SeoPathname;
  title: string;
  description: string;
  openGraphLocale: OpenGraphLocale;
};

export type LocalizedSeoPage = LocalizedContent;

export type SeoPageDefinition = {
  id: PageKey;
  pages: Record<Locale, LocalizedContent>;
};

export type SeoRoute = SeoPageDefinition;

export type SiteFacts = {
  bookingUrl: `https://${string}`;
  email: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  mapUrl: `https://${string}`;
  sameAs: ReadonlyArray<`https://${string}`>;
  checkinTime: string;
  checkoutTime: string;
  numberOfRooms: number;
  priceCurrency: string;
  priceRange: string;
  descriptions: Record<Locale, string>;
};

export type SeoFaqItem = {
  question: string;
  answer: string;
};
