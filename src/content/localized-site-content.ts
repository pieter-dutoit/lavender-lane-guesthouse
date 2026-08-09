import "server-only";

import {
  getAboutContent,
  getBookingPlatform,
  getContacts,
  getHomeAmenities,
  getHomeFaqs,
  getHomeGalleryImages,
  getHomeHeroImage,
  getLocation,
  getPolicies,
  getPrimaryContact,
  getRoomsRatesRooms,
  getSiteLogoImage,
  getSocialLinks,
  type ContentImage,
  type RoomsRatesRoom,
} from "@/content/site-content";
import type { SiteLocale } from "@/i18n/locale";

const AFRIKAANS_IMAGE_COPY: Readonly<
  Record<string, { alt: string; caption: string }>
> = {
  "double-room-main-bed": {
    alt: "Dubbelkamerbed met wit linne en blomkussings",
    caption: "Dubbelkamerbed",
  },
  "double-room-red-throw": {
    alt: "Dubbelkamerbed met ’n rooi deken en blomkussings",
    caption: "Dubbelkamer met rooi deken",
  },
  "double-room-green": {
    alt: "Dubbelkamerbed met ’n groen deken en skoenlapperkussings",
    caption: "Dubbelkamer met groen deken",
  },
  "double-room-bed": {
    alt: "Dubbelkamerbed met bedlampies en handdoeke",
    caption: "Dubbelkamerbed met handdoeke",
  },
  "double-room-queen-green-throw": {
    alt: "Koningingrootte bed met ’n groen deken en bedlampies",
    caption: "Koningingrootte bed met groen deken",
  },
  "double-room-coffee-tea": {
    alt: "Koffie- en teeverskeidenheid in die kamer",
    caption: "Koffie en tee in die kamer",
  },
  "double-room-microwave": {
    alt: "Mikrogolfoond en kombuiskas in die kamer",
    caption: "Mikrogolfoond in die kamer",
  },
  "single-room-bed": {
    alt: "Enkelkamerbed met ’n groen deken en handdoeke",
    caption: "Enkelkamerbed",
  },
  "single-room-bedroom-amenities": {
    alt: "Enkelkamer met bedkassie, hangkas, werkstafel en kombuisgeriewe",
    caption: "Enkelkamergeriewe",
  },
  "single-room-study-desk": {
    alt: "Werkstafel en stoel in die kamer",
    caption: "Werkstafel in die kamer",
  },
  "single-room-bathroom": {
    alt: "En suite-badkamer met stort en wasbak",
    caption: "En suite-badkamer",
  },
  "family-room-beds": {
    alt: "Gesinskamer met ’n dubbelbed en enkelbed",
    caption: "Beddens in die gesinskamer",
  },
  "family-room-amenities": {
    alt: "Kombuisgeriewe met ’n ketel, mikrogolfoond en pakplek",
    caption: "Gesinskamergeriewe",
  },
  "family-room-coffee-microwave": {
    alt: "Koffiestasie en mikrogolfoond in die kamer",
    caption: "Koffiestasie en mikrogolfoond",
  },
  "twin-room-beds": {
    alt: "Kamer met twee enkelbeddens",
    caption: "Twee enkelbeddens",
  },
  "twin-room-bed-detail": {
    alt: "Twee enkelbeddens met handdoeke",
    caption: "Enkelbeddens met handdoeke",
  },
  "twin-room-desk-fridge": {
    alt: "Werkstafel, yskas en hangkas in die kamer",
    caption: "Werkstafel, yskas en hangkas",
  },
  "breakfast-area": {
    alt: "Ontbytarea met tafels, stoele en ’n bedieningsbank",
    caption: "Ontbytarea",
  },
  "breakfast-bar": {
    alt: "Ontbyttoonbank met ’n koffie- en teestasie",
    caption: "Ontbyttoonbank",
  },
  "breakfast-cereal": {
    alt: "Ontbytgraanhouers en flesse",
    caption: "Ontbytgraanstasie",
  },
  "dining-area": {
    alt: "Eetarea met tafels, stoele en sitplek",
    caption: "Eetarea",
  },
  lounge: {
    alt: "Lavender Lane se sitkamer met leersitplekke",
    caption: "Gastesitkamer",
  },
  "outdoor-dining-area": {
    alt: "Buitetafel onder ’n boom",
    caption: "Buite-eetarea",
  },
  "outdoor-seating": {
    alt: "Buitesitplek met ’n sambreel langs die tuin",
    caption: "Buitesitplek",
  },
  "patio-seating": {
    alt: "Stoele en ’n tafel op die patio met hangplante",
    caption: "Patiositplek",
  },
  patio: {
    alt: "Patio-wandelpad met plante en toegang tot die tuin",
    caption: "Patio-wandelpad",
  },
  parking: {
    alt: "Lavender Lane se parkeerarea en buitenaambord",
    caption: "Parkeerarea",
  },
  "secure-premises": {
    alt: "Lavender Lane se buitenaambord by die omheinde gastehuisperseel",
    caption: "Omheinde gastehuisperseel",
  },
  "outdoor-braai-area": {
    alt: "Buitebraai-area met ’n tafel en stoele",
    caption: "Buitebraai-area",
  },
};

function localizeImage(image: ContentImage, locale: SiteLocale): ContentImage {
  if (locale === "en-ZA") {
    return image;
  }

  const translated = AFRIKAANS_IMAGE_COPY[image.id];

  return translated ? { ...image, ...translated } : image;
}

export function getLocalizedSiteLogoImage(locale: SiteLocale) {
  const image = getSiteLogoImage();

  return locale === "af-ZA"
    ? { ...image, alt: "Lavender Lane Guesthouse-logo" }
    : image;
}

export function getLocalizedHomeHeroImage(locale: SiteLocale) {
  const image = getHomeHeroImage();

  return locale === "af-ZA"
    ? {
        ...image,
        alt: "Dubbelbed in ’n kamer by Lavender Lane Guesthouse",
      }
    : image;
}

export function getLocalizedAboutContent(
  locale: SiteLocale,
): ReturnType<typeof getAboutContent> {
  const content = getAboutContent();

  if (locale === "en-ZA") {
    return content;
  }

  return {
    hero: {
      ...content.hero,
      label: "Lavender Lane Guesthouse",
      title: "Oor Lavender Lane",
      description: "Jou tuiste weg van die huis.",
      image: {
        ...content.hero.image,
        alt: "Lavender Lane Guesthouse se buitenaambord",
      },
    },
    overview: {
      ...content.overview,
      label: "Oorsig",
      title: "Gerief & Gasvryheid In Kathu",
      description:
        "Lavender Lane is by Nieshoutstraat 17 in Kathu en kombineer gemaklike verblyf met vriendelike, praktiese diens.",
      highlights: [
        {
          slug: "modern-rooms",
          title: "Moderne Kamers",
          description:
            "15 smaakvol ingerigte kamers met alles wat jy vir ’n gemaklike verblyf nodig het.",
        },
        {
          slug: "friendly-staff",
          title: "Vriendelike Span",
          description:
            "’n Verwelkomende span met meer as 20 jaar se ervaring in gasvryheid.",
        },
        {
          slug: "complimentary-amenities",
          title: "Ingeslote Geriewe",
          description:
            "Gratis Wi-Fi, koffie- en tee-stasies, ontbyt en daaglikse kamerskoonmaak.",
        },
        {
          slug: "prime-location",
          title: "Sentrale Ligging",
          description:
            "Gerieflik geleë in sentraal Kathu vir sake- of ontspanningsverblyf.",
        },
      ],
    },
    story: {
      label: "Oor Ons",
      title: "Ons Verhaal",
      paragraphs: [
        "Lavender Lane het ontstaan uit ’n liefde vir gasvryheid en die wens om ’n verwelkomende plek vir reisigers in Kathu te skep. Ons gastehuis is sorgvuldig ingerig om elke gas ’n gemaklike en aangename verblyf te bied.",
        "Met 15 kamers — waaronder ’n gesinskamer en twee kamers met enkelbeddens — kan ons verskillende reisbehoeftes akkommodeer. Elke kamer het praktiese, moderne geriewe vir ’n gemaklike besoek.",
        "Ons span het meer as 20 jaar se ervaring in die gasvryheidsbedryf en is daarop ingestel om jou verblyf besonders te maak. Van aankoms tot vertrek bied ons persoonlike diens sodat jy werklik tuis kan voel.",
      ],
    },
    team: {
      label: "Wie Ons Is",
      title: "Ontmoet Ons Span",
      description: "Die hart van Lavender Lane se gasvryheid.",
      members: content.team.members.map((member) => ({
        ...member,
        role: member.role === "Owner" ? "Eienaar" : "Administrasie",
      })),
    },
    contact: {
      label: "Kom Kuier By Ons",
      title: "Kom Ons Beplan Jou Besoek",
      description:
        "Het jy vrae oor ons kamers, geriewe of Kathu? Ons span help graag sodat jy reeds voor aankoms tuis kan voel.",
    },
  };
}

export function getLocalizedLocation(locale: SiteLocale) {
  const location = getLocation();

  return locale === "af-ZA"
    ? {
        ...location,
        province: "Noord-Kaap",
      }
    : location;
}

export function getLocalizedPolicies(locale: SiteLocale) {
  const policies = getPolicies();

  if (locale === "en-ZA") {
    return policies;
  }

  return [
    { title: "Inklok", description: "Vanaf 14:00 volgens reëling" },
    { title: "Uitklok", description: "Teen 10:00" },
  ];
}

export function getLocalizedRoomsRatesRooms(
  locale: SiteLocale,
): ReadonlyArray<RoomsRatesRoom> {
  const rooms = getRoomsRatesRooms();

  if (locale === "en-ZA") {
    return rooms;
  }

  const translations = [
    {
      name: "Dubbelkamer",
      description:
        "’n Ruim kamer met ’n dubbelbed vir ’n gemaklike verblyf. Dit sluit lugversorging, ’n TV met DStv, Wi-Fi, ’n yskas, mikrogolfoond, ketel en werkstafel in.",
      bedNames: ["dubbel"],
    },
    {
      name: "Enkelkamer",
      description:
        "’n Gerieflike keuse met ’n driekwartbed vir alleenreisigers. Dit sluit lugversorging, ’n TV met DStv, Wi-Fi, ’n yskas, mikrogolfoond, ketel en werkstafel in.",
      bedNames: ["driekwart"],
    },
    {
      name: "Gesinskamer",
      description:
        "Ideaal vir ’n klein gesin, met ’n dubbelbed en enkelbed. Die kamer het lugversorging, ’n TV met DStv, Wi-Fi, ’n yskas, mikrogolfoond, ketel en werkstafel.",
      bedNames: ["dubbel", "enkel"],
    },
    {
      name: "Kamer Met Twee Enkelbeddens",
      description:
        "’n Gemaklike kamer met twee enkelbeddens, ideaal vir kollegas of vriende. Dit sluit lugversorging, ’n TV met DStv, Wi-Fi, ’n yskas, mikrogolfoond, ketel en werkstafel in.",
      bedNames: ["enkel"],
    },
  ] satisfies ReadonlyArray<{
    name: string;
    description: string;
    bedNames: ReadonlyArray<string>;
  }>;

  return rooms.map((room, roomIndex) => {
    const translation = translations[roomIndex];

    return {
      ...room,
      name: translation.name,
      description: translation.description,
      beds: room.beds.map((bed, bedIndex) => ({
        ...bed,
        name: translation.bedNames[bedIndex] ?? bed.name,
      })),
      featuredImages: [
        localizeImage(room.featuredImages[0], locale),
        localizeImage(room.featuredImages[1], locale),
      ],
      galleryImages: room.galleryImages.map((image) =>
        localizeImage(image, locale),
      ),
    };
  });
}

export function getLocalizedHomeAmenities(locale: SiteLocale) {
  const amenities = getHomeAmenities();

  if (locale === "en-ZA") {
    return amenities;
  }

  const names: Record<(typeof amenities)[number]["slug"], string> = {
    breakfast: "Ontbyt ingesluit",
    "lunch-packs": "Kospakkies (prys op aanvraag)",
    "dinner-vouchers": "Aandete-bewyse (prys op aanvraag)",
    "braai-area": "Braai-area",
    "indoor-ourdoor-lounges": "Binne- en buitesitareas",
    "solar-power-no-load-shedding":
      "Sonkrag & normale werking tydens beurtkrag",
    "borehole-water": "Boorgatwater",
    "free-wifi": "Gratis Wi-Fi",
    "air-conditioning": "Lugversorging",
    dstv: "DStv",
    kitchenette: "Kombuisgeriewe",
    "laundry-services": "Wasgoeddiens",
    "daily-room-cleaning": "Daaglikse kamerskoonmaak",
    "off-street-parking": "Parkering van die straat af",
    "secure-premises": "Omheinde verblyfperseel",
  };

  return amenities.map((amenity) => ({
    ...amenity,
    name: names[amenity.slug],
  }));
}

export function getLocalizedHomeGalleryImages(locale: SiteLocale) {
  return getHomeGalleryImages().map((image) => localizeImage(image, locale));
}

export function getLocalizedHomeFaqs(locale: SiteLocale) {
  const faqs = getHomeFaqs();

  if (locale === "en-ZA") {
    return faqs;
  }

  return [
    {
      id: "location",
      question: "Waar in Kathu is Lavender Lane Guesthouse?",
      answer:
        "Lavender Lane Guesthouse is by 17 Nieshout Street, Kathu, Northern Cape, South Africa, 8446. Ons sentrale ligging is gerieflik vir sakereise, oornagverblyf en besoeke aan die omliggende Noord-Kaap.",
    },
    {
      id: "room-types",
      question: "Watter kamertipes kan ek bespreek?",
      answer:
        "Jy kan ’n dubbelkamer, enkelkamer, gesinskamer of kamer met twee enkelbeddens bespreek. Daar is altesaam 15 kamers vir alleenreisigers, paartjies, kollegas wat deel en klein gesinne.",
    },
    {
      id: "check-in-check-out",
      question: "Hoe laat is inklok en uitklok?",
      answer:
        "Inklok is vanaf 14:00 volgens reëling beskikbaar, en uitklok is teen 10:00. Kontak ons voor jou verblyf om jou aankoms te reël.",
    },
    {
      id: "room-amenities",
      question: "Het die kamers Wi-Fi, lugversorging en DStv?",
      answer:
        "Ja. Kamers sluit gratis Wi-Fi, lugversorging, DStv, ’n werkstafel, yskas, mikrogolfoond, ketel en praktiese kombuisgeriewe vir korter of langer verblyf in.",
    },
    {
      id: "breakfast",
      question: "Is ontbyt by die kamertarief ingesluit?",
      answer:
        "Ja. Ontbyt is by die huidige direkte tariewe vir al vier kamertipes ingesluit. Kospakkies en aandete-bewyse kan teen ’n bykomende prys op aanvraag gereël word.",
    },
    {
      id: "meals",
      question: "Kan ek kospakkies of aandete-opsies reël?",
      answer:
        "Ja. Kospakkies kan deur ontvangs gereël word, en aandete-bewyse vir plaaslike Kathu-restaurante is op aanvraag beskikbaar.",
    },
    {
      id: "parking",
      question: "Is daar parkeerplek van die straat af?",
      answer:
        "Ja. Lavender Lane bied parkeerplek van die straat af vir gaste. Let asseblief daarop dat die parkeerarea nie omhein is nie, terwyl die res van die perseel wel omhein is.",
    },
    {
      id: "load-shedding",
      question: "Sal beurtkrag my verblyf beïnvloed?",
      answer:
        "Lavender Lane gebruik volle sonkrag-rugsteun om normale gastehuisbedrywighede tydens beurtkrag voort te sit. Boorgatwater help ook om ’n betroubare watertoevoer tydens jou verblyf te ondersteun.",
    },
    {
      id: "business-travel",
      question: "Is Lavender Lane geskik vir sakereisigers?",
      answer:
        "Ja. Sakegaste het gratis Wi-Fi, werktafels in die kamers, lugversorging, kamers met enkelbeddens vir kollegas, wasgoeddiens, kospakkies, parkering van die straat af en ’n sentrale ligging in Kathu.",
    },
  ];
}

export { getBookingPlatform, getContacts, getPrimaryContact, getSocialLinks };
