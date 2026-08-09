import "server-only";

import type {
  AboutPage,
  BedAndBreakfastLeaf,
  FAQPage,
  Graph,
  HotelRoomLeaf,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

import {
  getLocalizedAboutContent,
  getLocalizedHomeAmenities,
  getLocalizedHomeFaqs,
  getLocalizedRoomsRatesRooms,
} from "@/content/localized-site-content";
import {
  getAboutContent,
  getRoomsRatesRooms,
  type HomeAmenitySlug,
} from "@/content/site-content";
import { getLocalizedSeoPage } from "@/lib/seo/routes";
import {
  absoluteUrl,
  LODGING_FACTS,
  SITE_LOCALES,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_SOCIAL_IMAGE_PATH,
} from "@/lib/seo/site";
import type { SeoFaqItem, SeoLocale, SeoPageId } from "@/lib/seo/types";

type RoomNode = HotelRoomLeaf & {
  "@id": string;
};

type StructuredDataCopy = {
  petsAllowed: string;
  occupancyUnit: string;
  amenities: Record<
    "breakfast" | "solar" | "parking" | "gated",
    { name: string; description: string }
  >;
};

const HOME_URL = absoluteUrl("/");
const WEBSITE_ID = `${HOME_URL}#website`;
const LODGING_BUSINESS_ID = `${HOME_URL}#lodging-business`;

const STRUCTURED_DATA_COPY = {
  "en-ZA": {
    petsAllowed: "Pets by prior arrangement",
    occupancyUnit: "person",
    amenities: {
      breakfast: {
        name: "Breakfast included",
        description: "Breakfast is included in every current direct room rate.",
      },
      solar: {
        name: "Solar backup",
        description:
          "Solar backup keeps normal guesthouse operations running during load-shedding.",
      },
      parking: {
        name: "Off-street parking outside the gated accommodation area",
        description:
          "Guest parking is off-street and is not inside the gated accommodation area.",
      },
      gated: {
        name: "Gated guesthouse accommodation premises",
        description:
          "The guesthouse accommodation premises are gated; the guest parking area is not gated.",
      },
    },
  },
  "af-ZA": {
    petsAllowed: "Troeteldiere volgens voorafreëling",
    occupancyUnit: "persoon",
    amenities: {
      breakfast: {
        name: "Ontbyt ingesluit",
        description: "Ontbyt is by elke huidige direkte kamertarief ingesluit.",
      },
      solar: {
        name: "Sonkrag stelsel",
        description:
          "Sonkrag-stelsel hou normale gastehuisbedrywighede tydens beurtkrag aan die gang.",
      },
      parking: {
        name: "Parkering van die straat af, buite die omheinde verblyfarea",
        description:
          "Gasteparkeerplek is van die straat af en is nie binne die omheinde verblyfarea nie.",
      },
      gated: {
        name: "Omheinde gastehuisperseel",
        description:
          "Die gastehuisperseel is omhein; die gasteparkeerarea is nie omhein nie.",
      },
    },
  },
} satisfies Record<SeoLocale, StructuredDataCopy>;

function createEntityId(fragment: string): string {
  return `${HOME_URL}#${fragment}`;
}

function createRoomSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getRoomId(name: string): string {
  return createEntityId(`room-${createRoomSlug(name)}`);
}

function getBusinessImageUrls(): ReadonlyArray<string> {
  const imageUrls = new Set<string>([
    absoluteUrl(SITE_SOCIAL_IMAGE_PATH),
    absoluteUrl(getAboutContent().hero.image.src),
  ]);

  for (const room of getRoomsRatesRooms()) {
    for (const image of room.featuredImages) {
      imageUrls.add(absoluteUrl(image.src));
    }
  }

  return [...imageUrls];
}

function getRoomPriceRange(): string {
  const rates = getRoomsRatesRooms().map((room) => room.basePrice);
  const minimumRate = Math.min(...rates);
  const maximumRate = Math.max(...rates);

  return `R${minimumRate}-R${maximumRate}`;
}

function createRoomNodes(locale: SeoLocale): ReadonlyArray<RoomNode> {
  const sourceRooms = getRoomsRatesRooms();
  const localizedRooms = getLocalizedRoomsRatesRooms(locale);
  const copy = STRUCTURED_DATA_COPY[locale];

  return localizedRooms.map((room, index) => {
    const sourceRoom = sourceRooms[index];
    const sourceName = sourceRoom?.name ?? room.name;

    return {
      "@type": "HotelRoom",
      "@id": getRoomId(sourceName),
      name: room.name,
      description: room.description,
      url: LODGING_FACTS.bookingUrl,
      image: room.featuredImages.map((image) => absoluteUrl(image.src)),
      numberOfRooms: room.count,
      occupancy: {
        "@type": "QuantitativeValue",
        value: room.sleepsAdults + room.sleepsChildren,
        unitCode: "C62",
        unitText: copy.occupancyUnit,
      },
      bed: room.beds.map((bed) => ({
        "@type": "BedDetails",
        numberOfBeds: bed.quantity,
        typeOfBed: bed.name,
      })),
      containedInPlace: {
        "@id": LODGING_BUSINESS_ID,
      },
    };
  });
}

function getAmenityCopy(
  locale: SeoLocale,
  slug: HomeAmenitySlug,
  fallbackName: string,
) {
  const copy = STRUCTURED_DATA_COPY[locale].amenities;

  if (slug === "breakfast") {
    return copy.breakfast;
  }

  if (slug === "solar-power-no-load-shedding") {
    return copy.solar;
  }

  if (slug === "off-street-parking") {
    return copy.parking;
  }

  if (slug === "secure-premises") {
    return copy.gated;
  }

  return { name: fallbackName, description: fallbackName };
}

export function createSiteJsonLd(locale: SeoLocale): Graph {
  const roomNodes = createRoomNodes(locale);

  const website: WebSite = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: HOME_URL,
    name: SITE_NAME,
    description: LODGING_FACTS.descriptions[locale],
    inLanguage: SITE_LOCALES,
    publisher: {
      "@id": LODGING_BUSINESS_ID,
    },
  };

  const lodgingBusiness: BedAndBreakfastLeaf = {
    "@type": "BedAndBreakfast",
    "@id": LODGING_BUSINESS_ID,
    name: SITE_NAME,
    description: LODGING_FACTS.descriptions[locale],
    url: HOME_URL,
    email: LODGING_FACTS.email,
    telephone: LODGING_FACTS.telephone,
    image: getBusinessImageUrls(),
    logo: absoluteUrl(SITE_LOGO_PATH),
    sameAs: LODGING_FACTS.sameAs,
    address: {
      "@type": "PostalAddress",
      ...LODGING_FACTS.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...LODGING_FACTS.geo,
    },
    hasMap: LODGING_FACTS.mapUrl,
    priceRange: getRoomPriceRange(),
    currenciesAccepted: LODGING_FACTS.priceCurrency,
    checkinTime: LODGING_FACTS.checkinTime,
    checkoutTime: LODGING_FACTS.checkoutTime,
    petsAllowed: STRUCTURED_DATA_COPY[locale].petsAllowed,
    numberOfRooms: LODGING_FACTS.numberOfRooms,
    availableLanguage: SITE_LOCALES,
    amenityFeature: getLocalizedHomeAmenities(locale).map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      ...getAmenityCopy(locale, amenity.slug, amenity.name),
      value: true,
    })),
    containsPlace: roomNodes.map((room) => ({
      "@id": room["@id"],
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, lodgingBusiness, ...roomNodes],
  };
}

export function createPageJsonLd(
  pageId: SeoPageId,
  locale: SeoLocale,
): WithContext<WebPage | AboutPage> {
  const page = getLocalizedSeoPage(pageId, locale);
  const pageUrl = absoluteUrl(page.pathname);

  if (pageId === "about") {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: locale,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": LODGING_BUSINESS_ID,
      },
      mainEntity: {
        "@id": LODGING_BUSINESS_ID,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(getLocalizedAboutContent(locale).hero.image.src),
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: locale,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": LODGING_BUSINESS_ID,
    },
    mainEntity: {
      "@id": LODGING_BUSINESS_ID,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE_SOCIAL_IMAGE_PATH),
    },
  };
}

export function getSeoFaqs(locale: SeoLocale): ReadonlyArray<SeoFaqItem> {
  return getLocalizedHomeFaqs(locale).map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
}

export function createFaqPageJsonLd(
  locale: SeoLocale,
  faqs: ReadonlyArray<SeoFaqItem>,
): WithContext<FAQPage> {
  const page = getLocalizedSeoPage("home", locale);
  const pageUrl = absoluteUrl(page.pathname);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: `${pageUrl}#faqs`,
    name: `${page.title} FAQs`,
    inLanguage: locale,
    isPartOf: {
      "@id": `${pageUrl}#webpage`,
    },
    about: {
      "@id": LODGING_BUSINESS_ID,
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
