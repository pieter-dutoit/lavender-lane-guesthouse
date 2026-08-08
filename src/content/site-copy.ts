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
    business: {
      label: string;
      title: string;
      description: string;
      cards: ReadonlyArray<{
        title: string;
        description: string;
      }>;
      securityNote: string;
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
        title: "Affordable Guesthouse Accommodation in Kathu, Northern Cape",
        label: "Central, business-ready bed and breakfast",
        directions: "Get directions",
        lead: "Comfortable rooms from R750, with breakfast included.",
        description:
          "Stay centrally in Kathu with full solar backup, free Wi-Fi, daily-cleaned rooms and practical support for business, contractor and overnight stays.",
        bookingPrompt: "Book online, or contact us directly.",
        callAriaLabel: "Call Lavender Lane Guesthouse",
        emailAriaLabel: "Email Lavender Lane Guesthouse",
      },
      rooms: {
        label: "Stay, Work, Recharge",
        title: "15 Rooms & Direct Rates",
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
        title: "Breakfast, Solar Power & Practical Amenities",
        description:
          "Breakfast is included, full solar backup keeps normal operations running during outages, and every stay includes free Wi-Fi and daily room cleaning. Laundry and meal arrangements are also available.",
      },
      business: {
        label: "Built for Productive Stays",
        title: "Business-ready accommodation in central Kathu",
        description:
          "A reliable, well-located base for consultants, contractors, project teams and colleagues working in Kathu or around Sishen.",
        cards: [
          {
            title: "Work without interruption",
            description:
              "Full solar backup keeps the guesthouse operating normally during load-shedding, with free Wi-Fi, in-room desks and air conditioning.",
          },
          {
            title: "Keep longer stays simple",
            description:
              "Breakfast is included in every direct room rate. Laundry, daily room cleaning, lunch packs and dinner vouchers help make work trips manageable.",
          },
          {
            title: "Stay close to Kathu essentials",
            description:
              "Approximate driving distances are 3.2 km to Kathu Village Mall, 3.9 km to Sishen Golf Course, 8.1 km to Sishen Mine and 10.6 km to Sishen Airport. Routes can vary; contact our team for current guidance.",
          },
        ],
        securityNote:
          "The guesthouse accommodation premises are gated. Guest parking is off-street and outside the gated accommodation area.",
      },
      gallery: {
        label: "A Look Around",
        title: "Guesthouse Gallery",
        description:
          "See our real rooms, breakfast and shared areas, outdoor spaces, off-street parking and gated guesthouse premises.",
      },
      contact: {
        label: "Get in Touch",
        title: "Contact & Location",
        description:
          "Contact us directly for bookings, availability, group stays or help planning your visit to Kathu.",
      },
      policies: {
        label: "Good to Know",
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
      about: "Oor ons",
      roomsRates: "Kamers en tariewe",
      amenities: "Geriewe",
      gallery: "Galery",
      contact: "Kontak",
      policies: "Beleide",
      faqs: "Gereelde vrae",
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
        title: "Bekostigbare gastehuisverblyf in Kathu, Noord-Kaap",
        label: "Sentrale bed-en-ontbyt, toegerus vir sakereisigers",
        directions: "Kry aanwysings",
        lead: "Gerieflike kamers vanaf R750, met ontbyt ingesluit.",
        description:
          "Bly sentraal in Kathu met ’n volledige sonkrag-rugsteunstelsel, gratis Wi-Fi, kamers wat daagliks skoongemaak word en praktiese ondersteuning vir sake-, kontrakteur- en oornagverblyf.",
        bookingPrompt: "Bespreek aanlyn of kontak ons direk.",
        callAriaLabel: "Bel Lavender Lane Guesthouse",
        emailAriaLabel: "E-pos Lavender Lane Guesthouse",
      },
      rooms: {
        label: "Bly, werk, herlaai",
        title: "15 kamers en direkte tariewe",
        description:
          "Kies ’n enkelkamer, dubbelkamer, kamer met twee enkelbeddens of gesinskamer. Huidige direkte tariewe sluit ontbyt in en begin by R750 per nag.",
        roomsAvailable: (count) =>
          `${count} ${count === 1 ? "kamer" : "kamers"} van hierdie tipe.`,
        capacity: "Kapasiteit",
        sleepsPeople: (count) =>
          `Slaapplek vir ${count} ${count === 1 ? "persoon" : "persone"}`,
        bedCount: (quantity, bedName) =>
          `${quantity} × ${bedName}${quantity === 1 ? "bed" : "beddens"}`,
        features: "Kenmerke en geriewe",
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
        label: "Gerief sonder kompromie",
        title: "Ontbyt, sonkrag en praktiese geriewe",
        description:
          "Ontbyt is ingesluit, ’n volledige sonkrag-rugsteunstelsel hou normale bedrywighede tydens kragonderbrekings aan die gang, en elke verblyf sluit gratis Wi-Fi en daaglikse kamerskoonmaak in. Wasgoed- en maaltydreëlings is ook beskikbaar.",
      },
      business: {
        label: "Vir produktiewe verblyf",
        title: "Sakereed verblyf in sentrale Kathu",
        description:
          "’n Betroubare, goed geleë basis vir konsultante, kontrakteurs, projekspanne en kollegas wat in Kathu of die Sishen-omgewing werk.",
        cards: [
          {
            title: "Werk sonder onderbrekings",
            description:
              "’n Volledige sonkrag-rugsteunstelsel laat die gastehuis normaal funksioneer tydens beurtkrag, met gratis Wi-Fi, werktafels in die kamers en lugversorging.",
          },
          {
            title: "Maak langer verblyf eenvoudig",
            description:
              "Ontbyt is by elke direkte kamertarief ingesluit. Wasgoeddiens, daaglikse kamerskoonmaak, kospakkies en aandetebewyse help om werksreise makliker te maak.",
          },
          {
            title: "Bly naby Kathu se belangrikste plekke",
            description:
              "Geskatte ry-afstande is 3,2 km na Kathu Village Mall, 3,9 km na Sishen Golf Course, 8,1 km na Sishen Mine en 10,6 km na Sishen Airport. Roetes kan verskil; kontak ons span vir huidige aanwysings.",
          },
        ],
        securityNote:
          "Die gastehuisperseel is omhein. Gasteparkeerplek is van die straat af, maar buite die omheinde verblyfarea.",
      },
      gallery: {
        label: "Kyk gerus rond",
        title: "Gastehuisgalery",
        description:
          "Bekyk ons werklike kamers, ontbyt- en gedeelde ruimtes, buiteruimtes, parkeerarea en omheinde gastehuisperseel.",
      },
      contact: {
        label: "Kontak ons",
        title: "Kontakbesonderhede en ligging",
        description:
          "Kontak ons direk vir besprekings, beskikbaarheid, groepverblyf of hulp om jou besoek aan Kathu te beplan.",
      },
      policies: {
        label: "Goed om te weet",
        title: "Verblyfbeleide",
        description:
          "Inklok is vanaf 14:00 volgens reëling beskikbaar, uitklok is teen 10:00, en troeteldiere kan volgens voorafreëling saamkom.",
      },
      faq: {
        label: "Lavender Lane se gereelde vrae",
        title: "Gereelde vrae",
        description:
          "Duidelike antwoorde oor ons verblyf in Kathu, kamertariewe, ingeslote ontbyt, sonkrag, parkering, troeteldiere en aankomstye.",
      },
    },
    contact: {
      information: "Kontakbesonderhede",
      address: "Adres",
      directions: "Kry aanwysings",
      followUs: "Volg ons",
      location: "Ligging",
      mapTitle: "Lavender Lane Guesthouse se ligging op die kaart",
    },
    footer: {
      quickLinks: "Vinnige skakels",
      connect: "Skakel met ons",
      copyright: "Alle regte voorbehou.",
    },
  },
} satisfies Record<SiteLocale, LocalizedSiteCopy>;

export function getSiteCopy(locale: SiteLocale): LocalizedSiteCopy {
  return SITE_COPY[locale];
}
