import "server-only";

import type { SiteLocale } from "@/i18n/locale";

type LocalizedSiteCopy = {
  navigation: {
    primaryLabel: string;
    home: string;
    about: string;
    roomsRates: string;
    amenities: string;
    gallery: string;
    contact: string;
    policies: string;
    faqs: string;
    guesthouseSections: string;
    openMenu: string;
    closeMenu: string;
    languageSwitch: string;
    languageSwitchLabel: string;
  };
  booking: {
    bookNow: string;
    bookOnline: string;
    checkAvailability: string;
    opensPlatform: string;
    headerAriaLabel: string;
  };
  home: {
    hero: {
      title: string;
      label: string;
      directions: string;
      lead: string;
      description: string;
      bookingPrompt: string;
      callAriaLabel: string;
      emailAriaLabel: string;
    };
    rooms: {
      label: string;
      title: string;
      description: string;
      roomsAvailable: (count: number) => string;
      capacity: string;
      sleepsPeople: (count: number) => string;
      bedCount: (quantity: number, bedName: string) => string;
      features: string;
      amenities: ReadonlyArray<string>;
      from: string;
      perNightBreakfast: string;
    };
    amenities: {
      label: string;
      title: string;
      description: string;
    };
    gallery: {
      label: string;
      title: string;
      description: string;
    };
    contact: {
      label: string;
      title: string;
      description: string;
    };
    policies: {
      label: string;
      title: string;
      description: string;
    };
    faq: {
      label: string;
      title: string;
      description: string;
    };
  };
  contact: {
    information: string;
    address: string;
    directions: string;
    followUs: string;
    location: string;
    mapTitle: string;
  };
  footer: {
    quickLinks: string;
    connect: string;
    copyright: string;
  };
};

const SITE_COPY = {
  "en-ZA": {
    navigation: {
      primaryLabel: "Primary",
      home: "Home",
      about: "About Us",
      roomsRates: "Rooms & Rates",
      amenities: "Amenities",
      gallery: "Gallery",
      contact: "Contact",
      policies: "Policies",
      faqs: "FAQs",
      guesthouseSections: "Guesthouse sections",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      languageSwitch: "Afrikaans",
      languageSwitchLabel: "View this page in Afrikaans",
    },
    booking: {
      bookNow: "Book now",
      bookOnline: "Book Online",
      checkAvailability: "Check availability",
      opensPlatform: "Opens NightsBridge",
      headerAriaLabel: "Book now on NightsBridge",
    },
    home: {
      hero: {
        title: "Lavender Lane Guesthouse",
        label: "Central, Business-Ready Bed And Breakfast",
        directions: "Get directions",
        lead: "Comfortable rooms from R750, with breakfast included.",
        description:
          "Stay centrally in Kathu with solar backup, free Wi-Fi, daily-cleaned rooms and practical support for business, contractor and overnight stays.",
        bookingPrompt: "Book online, or contact us directly.",
        callAriaLabel: "Call Lavender Lane Guesthouse",
        emailAriaLabel: "Email Lavender Lane Guesthouse",
      },
      rooms: {
        label: "Stay, Work, Recharge",
        title: "Rooms & Rates",
        description:
          "Choose a single, double, twin or family room. Current direct rates include breakfast and start at R750 per night.",
        roomsAvailable: (count) =>
          `${count} ${count === 1 ? "room" : "rooms"} of this type.`,
        capacity: "Capacity",
        sleepsPeople: (count) =>
          `Sleeps ${count} ${count === 1 ? "person" : "people"}`,
        bedCount: (quantity, bedName) =>
          `${quantity} × ${bedName} ${quantity === 1 ? "bed" : "beds"}`,
        features: "Features & Amenities",
        amenities: [
          "Free Wi-Fi",
          "Air conditioning",
          "Coffee & tea station",
          "Fridge",
          "Microwave",
          "Work desk",
          "DStv",
          "En-suite shower",
          "Garden access",
        ],
        from: "from",
        perNightBreakfast: "per night, breakfast included",
      },
      amenities: {
        label: "Comfort Without Compromise",
        title: "Breakfast, Solar Power & Amenities",
        description:
          "Breakfast is included, full solar backup keeps normal operations running during outages, and every stay includes free Wi-Fi and daily room cleaning. Laundry and meal arrangements are also available.",
      },
      gallery: {
        label: "A Look Around",
        title: "Guesthouse Gallery",
        description:
          "See our real rooms, breakfast and shared areas, outdoor spaces, off-street parking and gated guesthouse premises.",
      },
      contact: {
        label: "Get In Touch",
        title: "Contact & Location",
        description:
          "Contact us directly for bookings, availability, group stays or help planning your visit to Kathu.",
      },
      policies: {
        label: "Good To Know",
        title: "Stay Policies",
        description:
          "Check-in is available from 14:00 by arrangement, checkout is by 10:00, and pets may stay by prior arrangement.",
      },
      faq: {
        label: "Lavender Lane FAQs",
        title: "Frequently Asked Questions",
        description:
          "Straightforward answers about our Kathu accommodation, room rates, included breakfast, solar operation, parking, pets and arrival times.",
      },
    },
    contact: {
      information: "Contact Information",
      address: "Address",
      directions: "Get Directions",
      followUs: "Follow Us",
      location: "Location",
      mapTitle: "Lavender Lane Guesthouse map location",
    },
    footer: {
      quickLinks: "Quick Links",
      connect: "Connect With Us",
      copyright: "All rights reserved.",
    },
  },
  "af-ZA": {
    navigation: {
      primaryLabel: "Hoofnavigasie",
      home: "Tuis",
      about: "Oor Ons",
      roomsRates: "Kamers En Tariewe",
      amenities: "Geriewe",
      gallery: "Galery",
      contact: "Kontak",
      policies: "Beleide",
      faqs: "Gereelde Vrae",
      guesthouseSections: "Gastehuisafdelings",
      openMenu: "Maak kieslys oop",
      closeMenu: "Maak kieslys toe",
      languageSwitch: "English",
      languageSwitchLabel: "Bekyk hierdie bladsy in Engels",
    },
    booking: {
      bookNow: "Bespreek nou",
      bookOnline: "Bespreek aanlyn",
      checkAvailability: "Gaan beskikbaarheid na",
      opensPlatform: "Maak NightsBridge oop",
      headerAriaLabel: "Bespreek nou op NightsBridge",
    },
    home: {
      hero: {
        title: "Lavender Lane Gastehuis",
        label: "Sentrale Bed-En-Ontbyt, Toegerus Vir Sakereisigers",
        directions: "Kry aanwysings",
        lead: "Gerieflike kamers vanaf R750, met ontbyt ingesluit.",
        description:
          "Bly sentraal in Kathu met ’n sonkrag stelsel, gratis internet, kamers wat daagliks skoongemaak word en praktiese ondersteuning vir sake-, kontrakteur- en oornagverblyf.",
        bookingPrompt: "Bespreek aanlyn of kontak ons direk.",
        callAriaLabel: "Bel Lavender Lane Guesthouse",
        emailAriaLabel: "E-pos Lavender Lane Guesthouse",
      },
      rooms: {
        label: "Bly, Werk, Herlaai",
        title: "Kamers En Tariewe",
        description:
          "Kies ’n enkelkamer, dubbelkamer, kamer met twee enkelbeddens of gesinskamer. Huidige direkte tariewe sluit ontbyt in en begin by R750 per nag.",
        roomsAvailable: (count) =>
          `${count} ${count === 1 ? "kamer" : "kamers"} van hierdie tipe.`,
        capacity: "Kapasiteit",
        sleepsPeople: (count) =>
          `Slaapplek vir ${count} ${count === 1 ? "persoon" : "persone"}`,
        bedCount: (quantity, bedName) =>
          `${quantity} × ${bedName}${quantity === 1 ? "bed" : "beddens"}`,
        features: "Kenmerke En Geriewe",
        amenities: [
          "Gratis Wi-Fi",
          "Lugversorging",
          "Koffie- en teestasie",
          "Yskas",
          "Mikrogolfoond",
          "Werkstafel",
          "DStv",
          "En suite-badkamer met stort",
          "Toegang tot die tuin",
        ],
        from: "vanaf",
        perNightBreakfast: "per nag, ontbyt ingesluit",
      },
      amenities: {
        label: "Gerief Sonder Kompromie",
        title: "Ontbyt, Sonkrag En Geriewe",
        description:
          "Ontbyt is ingesluit, ’n volledige sonkrag-rugsteunstelsel hou normale bedrywighede tydens kragonderbrekings aan die gang, en elke verblyf sluit gratis Wi-Fi en daaglikse kamerskoonmaak in. Wasgoed- en maaltydreëlings is ook beskikbaar.",
      },
      gallery: {
        label: "Kyk Gerus Rond",
        title: "Galery",
        description:
          "Bekyk ons werklike kamers, ontbyt- en gedeelde ruimtes, buiteruimtes, parkeerarea en omheinde gastehuisperseel.",
      },
      contact: {
        label: "Kontak Ons",
        title: "Kontakbesonderhede En Ligging",
        description:
          "Kontak ons direk vir besprekings, beskikbaarheid, groepverblyf of hulp om jou besoek aan Kathu te beplan.",
      },
      policies: {
        label: "Goed Om Te Weet",
        title: "Verblyfbeleide",
        description:
          "Inklok is vanaf 14:00 volgens reëling beskikbaar, uitklok is teen 10:00, en troeteldiere kan volgens voorafreëling saamkom.",
      },
      faq: {
        label: "Lavender Lane Se Gereelde Vrae",
        title: "Gereelde Vrae",
        description:
          "Duidelike antwoorde oor ons verblyf in Kathu, kamertariewe, ingeslote ontbyt, sonkrag, parkering, troeteldiere en aankomstye.",
      },
    },
    contact: {
      information: "Kontakbesonderhede",
      address: "Adres",
      directions: "Kry aanwysings",
      followUs: "Volg Ons",
      location: "Ligging",
      mapTitle: "Lavender Lane Guesthouse se ligging op die kaart",
    },
    footer: {
      quickLinks: "Vinnige Skakels",
      connect: "Skakel Met Ons",
      copyright: "Alle regte voorbehou.",
    },
  },
} satisfies Record<SiteLocale, LocalizedSiteCopy>;

export function getSiteCopy(locale: SiteLocale): LocalizedSiteCopy {
  return SITE_COPY[locale];
}
