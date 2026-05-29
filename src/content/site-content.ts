import "server-only";

import { siteData } from "@/content/site-data";

type AbsoluteHttpUrl = `http://${string}` | `https://${string}`;

const DEFAULT_R2_BUCKET_URL =
  "https://pub-0f026b3e7ada40e1abeb4ecc6c3619e5.r2.dev";

const r2BucketUrl =
  process.env.NEXT_PUBLIC_R2_BUCKET_URL ?? DEFAULT_R2_BUCKET_URL;

function isAbsoluteHttpUrl(value: string): value is AbsoluteHttpUrl {
  return value.startsWith("http://") || value.startsWith("https://");
}

function getR2ImageSrc(path: string): AbsoluteHttpUrl {
  const bucketUrl = `${r2BucketUrl.replace(/\/+$/, "")}/`;
  const src = new URL(path, bucketUrl).href;

  if (!isAbsoluteHttpUrl(src)) {
    throw new Error(`Invalid R2 image URL: ${src}`);
  }

  return src;
}

export type SiteImage = {
  src: AbsoluteHttpUrl;
  alt: string;
  width: number;
  height: number;
};

export type ContentImage = SiteImage & {
  id: string;
  caption: string;
};

export type HomeGalleryImageCategory =
  | "breakfast"
  | "common-area"
  | "outdoor"
  | "parking"
  | "security"
  | "braai";

export type HomeGalleryImage = ContentImage & {
  category: HomeGalleryImageCategory;
};

function createR2Image(
  id: string,
  path: string,
  alt: string,
  width: number,
  height: number,
  caption = alt,
): ContentImage {
  return {
    id,
    src: getR2ImageSrc(path),
    alt,
    width,
    height,
    caption,
  };
}

function createHomeGalleryImage(
  category: HomeGalleryImageCategory,
  id: string,
  path: string,
  alt: string,
  width: number,
  height: number,
  caption = alt,
): HomeGalleryImage {
  return {
    ...createR2Image(id, path, alt, width, height, caption),
    category,
  };
}

export type BookingPlatform = {
  name: string;
  url: AbsoluteHttpUrl;
};

export type ContactInfo = {
  phone: string;
  email: string;
  position?: string;
};

export type SocialLink = {
  name: string;
  link: string;
};

export type LocationInfo = {
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  formattedAddress: string;
  mapsLink: AbsoluteHttpUrl;
  mapsEmbedSrc: AbsoluteHttpUrl;
};

export type PolicyInfo = {
  title: string;
  description: string;
};

export type RoomsRatesBed = {
  name: string;
  quantity: number;
};

export type RoomsRatesRoom = {
  name: string;
  description: string;
  count: number;
  basePrice: number;
  sleepsAdults: number;
  sleepsChildren: number;
  beds: ReadonlyArray<RoomsRatesBed>;
  featuredImages: readonly [ContentImage, ContentImage];
  galleryImages: ReadonlyArray<ContentImage>;
};

export type HomeAmenitySlug =
  | "breakfast"
  | "lunch-packs"
  | "dinner-vouchers"
  | "braai-area"
  | "indoor-ourdoor-lounges"
  | "solar-power-no-load-shedding"
  | "borehole-water"
  | "free-wifi"
  | "air-conditioning"
  | "dstv"
  | "kitchenette"
  | "laundry-services"
  | "daily-room-cleaning"
  | "off-street-parking"
  | "secure-premises";

export type HomeAmenity = {
  slug: HomeAmenitySlug;
  name: string;
};

export type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SiteContent = {
  siteLogoImage: SiteImage;
  homeHeroImage: SiteImage;
  bookingPlatform: BookingPlatform;
  primaryContact: ContactInfo;
  contacts: ReadonlyArray<ContactInfo>;
  socialLinks: ReadonlyArray<SocialLink>;
  location: LocationInfo;
  policies: ReadonlyArray<PolicyInfo>;
  roomsRatesRooms: ReadonlyArray<RoomsRatesRoom>;
  homeAmenities: ReadonlyArray<HomeAmenity>;
  homeGalleryImages: ReadonlyArray<HomeGalleryImage>;
  homeFaqs: ReadonlyArray<HomeFaqItem>;
};

const siteContent = {
  siteLogoImage: createR2Image(
    "site-logo",
    "Lavender Lane Logo.png",
    "Lavender Lane Guesthouse logo",
    506,
    247,
  ),
  homeHeroImage: {
    src: getR2ImageSrc("lavender-lane-kathu-hero.jpg"),
    alt: "Double bed in a Lavender Lane Guesthouse room",
    width: 2612,
    height: 1960,
  },
  bookingPlatform: {
    name: "NightsBridge",
    url: "https://book.nightsbridge.com/38107",
  },
  primaryContact: siteData.contacts[0],
  contacts: siteData.contacts,
  socialLinks: siteData.socials.map(({ name, link }) => ({
    name,
    link,
  })),
  location: {
    street: "17 Nieshout St",
    city: "Kathu",
    province: "Northern Cape",
    country: "South Africa",
    postalCode: "8446",
    formattedAddress:
      "17 Nieshout St, Kathu, Northern Cape, South Africa, 8446",
    mapsLink: "https://maps.app.goo.gl/1JEfwGthJcXdqvhH7",
    mapsEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.7135455567986!2d23.052124!3d-27.6952471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9e412976e47095%3A0xef41f10a6cf9bd04!2sLavender%20Lane!5e0!3m2!1sen!2sza!4v1779262689596!5m2!1sen!2sza",
  },
  policies: [
    {
      title: "Check-in",
      description: "From 2:00 PM",
    },
    {
      title: "Check-out",
      description: "By 10:00 AM",
    },
  ],
  roomsRatesRooms: [
    {
      name: "Double Room",
      description:
        "A spacious room with a double bed, designed for comfort. Includes aircon, TV with DStv, Wi-Fi, a fridge, microwave, kettle, and a work desk.",
      count: 10,
      basePrice: 800,
      sleepsAdults: 2,
      sleepsChildren: 0,
      beds: [
        {
          name: "Double",
          quantity: 1,
        },
      ],
      featuredImages: [
        createR2Image(
          "double-room-main-bed",
          "Room Double Bed.jpg",
          "Double room bed with white linen and floral cushions",
          2342,
          1523,
          "Double room bed",
        ),
        createR2Image(
          "double-room-red-throw",
          "Double Room Red Throw.jpg",
          "Double room bed with a red throw and floral cushions",
          1463,
          1097,
          "Double room with red throw",
        ),
      ],
      galleryImages: [
        createR2Image(
          "double-room-main-bed",
          "Room Double Bed.jpg",
          "Double room bed with white linen and floral cushions",
          2342,
          1523,
          "Double room bed",
        ),
        createR2Image(
          "double-room-red-throw",
          "Double Room Red Throw.jpg",
          "Double room bed with a red throw and floral cushions",
          1463,
          1097,
          "Double room with red throw",
        ),
        createR2Image(
          "double-room-green",
          "Double Room Green.jpg",
          "Double room bed with a green throw and butterfly cushions",
          1200,
          900,
          "Double room with green throw",
        ),
        createR2Image(
          "double-room-bed",
          "Double room bed.jpg",
          "Double room bed with bedside lamps and towels",
          1600,
          1200,
          "Double room bed with towels",
        ),
        createR2Image(
          "double-room-queen-green-throw",
          "Queen room bed green throw.jpg",
          "Queen room bed with a green throw and bedside lamps",
          966,
          724,
          "Queen room bed with green throw",
        ),
        createR2Image(
          "double-room-coffee-tea",
          "Room coffee and tea.jpg",
          "In-room coffee and tea selection",
          3398,
          2265,
          "Coffee and tea selection",
        ),
        createR2Image(
          "double-room-microwave",
          "Room microwave.jpg",
          "In-room microwave and kitchenette cupboard",
          3600,
          2400,
          "In-room microwave",
        ),
      ],
    },
    {
      name: "Single Room",
      description:
        "A cozy option with a three-quarter bed, perfect for solo travelers. Includes aircon, TV with DStv, Wi-Fi, a fridge, microwave, kettle, and a work desk.",
      count: 2,
      basePrice: 750,
      sleepsAdults: 1,
      sleepsChildren: 0,
      beds: [
        {
          name: "Three-Quarter",
          quantity: 1,
        },
      ],
      featuredImages: [
        createR2Image(
          "single-room-bed",
          "Single room.jpg",
          "Single room bed with a green throw and towels",
          1125,
          844,
          "Single room bed",
        ),
        createR2Image(
          "single-room-bedroom-amenities",
          "Bedroom amenities.jpg",
          "Single room with bedside table, wardrobe, desk, and kitchenette",
          2944,
          1962,
          "Single room amenities",
        ),
      ],
      galleryImages: [
        createR2Image(
          "single-room-bed",
          "Single room.jpg",
          "Single room bed with a green throw and towels",
          1125,
          844,
          "Single room bed",
        ),
        createR2Image(
          "single-room-bedroom-amenities",
          "Bedroom amenities.jpg",
          "Single room with bedside table, wardrobe, desk, and kitchenette",
          2944,
          1962,
          "Single room amenities",
        ),
        createR2Image(
          "single-room-study-desk",
          "Room Study Desk.jpg",
          "In-room study desk and chair",
          2031,
          3047,
          "Room study desk",
        ),
        createR2Image(
          "single-room-bathroom",
          "Bathroom.jpg",
          "En-suite bathroom with shower and vanity",
          1157,
          1543,
          "En-suite bathroom",
        ),
      ],
    },
    {
      name: "Family Room",
      description:
        "Perfect for small families, this room features a double bed and a single bed. Equipped with aircon, TV with DStv, Wi-Fi, a fridge, microwave, kettle, and a work desk.",
      count: 1,
      basePrice: 800,
      sleepsAdults: 2,
      sleepsChildren: 1,
      beds: [
        {
          name: "Double",
          quantity: 1,
        },
        {
          name: "Single",
          quantity: 1,
        },
      ],
      featuredImages: [
        createR2Image(
          "family-room-beds",
          "Family Room.jpg",
          "Family room with a double bed and single bed",
          1540,
          1155,
          "Family room beds",
        ),
        createR2Image(
          "family-room-amenities",
          "Room amenities.jpg",
          "Room kitchenette amenities with kettle, microwave, and storage",
          2191,
          3287,
          "Family room amenities",
        ),
      ],
      galleryImages: [
        createR2Image(
          "family-room-beds",
          "Family Room.jpg",
          "Family room with a double bed and single bed",
          1540,
          1155,
          "Family room beds",
        ),
        createR2Image(
          "family-room-amenities",
          "Room amenities.jpg",
          "Room kitchenette amenities with kettle, microwave, and storage",
          2191,
          3287,
          "Family room amenities",
        ),
        createR2Image(
          "family-room-coffee-microwave",
          "Room amentities coffee microwave.jpg",
          "Room coffee station and microwave",
          2400,
          3600,
          "Coffee station and microwave",
        ),
      ],
    },
    {
      name: "Twin Room",
      description:
        "A comfortable room with two single beds, ideal for colleagues or friends. Includes aircon, TV with DStv, Wi-Fi, a fridge, microwave, kettle, and a work desk.",
      count: 2,
      basePrice: 800,
      sleepsAdults: 2,
      sleepsChildren: 0,
      beds: [
        {
          name: "Single",
          quantity: 2,
        },
      ],
      featuredImages: [
        createR2Image(
          "twin-room-beds",
          "Twin Room.jpg",
          "Twin room with two single beds",
          3294,
          2193,
          "Twin room beds",
        ),
        createR2Image(
          "twin-room-bed-detail",
          "Twin room beds.jpg",
          "Twin room beds with towels",
          1024,
          768,
          "Twin room beds with towels",
        ),
      ],
      galleryImages: [
        createR2Image(
          "twin-room-beds",
          "Twin Room.jpg",
          "Twin room with two single beds",
          3294,
          2193,
          "Twin room beds",
        ),
        createR2Image(
          "twin-room-bed-detail",
          "Twin room beds.jpg",
          "Twin room beds with towels",
          1024,
          768,
          "Twin room beds with towels",
        ),
        createR2Image(
          "twin-room-desk-fridge",
          "Room desk and fridge.jpg",
          "In-room desk, fridge, and wardrobe",
          2400,
          3600,
          "Desk, fridge, and wardrobe",
        ),
      ],
    },
  ],
  homeAmenities: [
    {
      slug: "breakfast",
      name: "Free Breakfast",
    },
    {
      slug: "lunch-packs",
      name: "Lunch Packs (Price on request)",
    },
    {
      slug: "dinner-vouchers",
      name: "Dinner Vouchers (Price on request)",
    },
    {
      slug: "braai-area",
      name: "Braai Area",
    },
    {
      slug: "indoor-ourdoor-lounges",
      name: "Indoor & Outdoor Lounges",
    },
    {
      slug: "solar-power-no-load-shedding",
      name: "Solar Power & No Load-shedding",
    },
    {
      slug: "borehole-water",
      name: "Borehole Water",
    },
    {
      slug: "free-wifi",
      name: "Free WiFi",
    },
    {
      slug: "air-conditioning",
      name: "Air Conditioning",
    },
    {
      slug: "dstv",
      name: "DSTV",
    },
    {
      slug: "kitchenette",
      name: "Kitchenette",
    },
    {
      slug: "laundry-services",
      name: "Laundry Services",
    },
    {
      slug: "daily-room-cleaning",
      name: "Daily Room Cleaning",
    },
    {
      slug: "off-street-parking",
      name: "Off-Street Parking",
    },
    {
      slug: "secure-premises",
      name: "Gated Premises",
    },
  ],
  homeGalleryImages: [
    createHomeGalleryImage(
      "breakfast",
      "breakfast-area",
      "Breakfast area.jpg",
      "Breakfast area with tables, chairs, and serving counter",
      3163,
      2109,
      "Breakfast area",
    ),
    createHomeGalleryImage(
      "breakfast",
      "breakfast-bar",
      "Breakfast bar.jpg",
      "Breakfast bar with coffee and tea station",
      3517,
      2345,
      "Breakfast bar",
    ),
    createHomeGalleryImage(
      "breakfast",
      "breakfast-cereal",
      "Breakfast cereal.jpg",
      "Breakfast cereal dispensers and jars",
      3278,
      2185,
      "Breakfast cereal station",
    ),
    createHomeGalleryImage(
      "common-area",
      "dining-area",
      "Dining Area.jpg",
      "Dining area with tables, chairs, and lounge seating",
      3420,
      2280,
      "Dining area",
    ),
    createHomeGalleryImage(
      "common-area",
      "lounge",
      "Lavender Lane Lounge.jpg",
      "Lavender Lane lounge with leather seating",
      1478,
      1108,
      "Guest lounge",
    ),
    createHomeGalleryImage(
      "outdoor",
      "outdoor-dining-area",
      "Lavender Lane Outdoor Dining Area.jpg",
      "Outdoor dining table under a tree",
      768,
      1024,
      "Outdoor dining area",
    ),
    createHomeGalleryImage(
      "outdoor",
      "outdoor-seating",
      "Lavender Lane Outdoor Seating.jpg",
      "Outdoor seating with umbrella beside the garden",
      1024,
      768,
      "Outdoor seating",
    ),
    createHomeGalleryImage(
      "outdoor",
      "patio-seating",
      "Lavender Lane Patio Seating.jpg",
      "Patio seating with table and hanging plants",
      1148,
      1464,
      "Patio seating",
    ),
    createHomeGalleryImage(
      "outdoor",
      "patio",
      "Patio.jpg",
      "Patio walkway with plants and garden access",
      3600,
      2400,
      "Patio walkway",
    ),
    createHomeGalleryImage(
      "parking",
      "parking",
      "Lavender Lane Parking.jpg",
      "Lavender Lane parking area and exterior signage",
      898,
      674,
      "Parking area",
    ),
    createHomeGalleryImage(
      "security",
      "secure-premises",
      "Lavender Lane Secure Premises.jpg",
      "Lavender Lane exterior sign at the secure premises",
      1385,
      1038,
      "Secure premises",
    ),
    createHomeGalleryImage(
      "braai",
      "outdoor-braai-area",
      "Outdoor Braai Area.jpg",
      "Outdoor braai area with table and chairs",
      962,
      721,
      "Outdoor braai area",
    ),
  ],
  homeFaqs: [
    {
      id: "location",
      question: "Where is Lavender Lane Guesthouse located in Kathu?",
      answer:
        "Lavender Lane Guesthouse is at 17 Nieshout St, Kathu, Northern Cape, South Africa, 8446. Our central Kathu location is convenient for business travel, overnight stops, and guests visiting the surrounding Northern Cape area.",
    },
    {
      id: "room-types",
      question: "What room types can I book?",
      answer:
        "You can book Double Rooms, Single Rooms, a Family Room, and Twin Rooms. There are 15 rooms in total, with options for solo travellers, couples, colleagues sharing, and small families.",
    },
    {
      id: "check-in-check-out",
      question: "What time is check-in and check-out?",
      answer:
        "Check-in is from 2:00 PM and check-out is by 10:00 AM. If you need help with arrival details, contact reception before your stay.",
    },
    {
      id: "room-amenities",
      question: "Do the rooms have Wi-Fi, air conditioning and DStv?",
      answer:
        "Yes. Rooms include free Wi-Fi, air conditioning, DStv, a work desk, fridge, microwave, kettle, and practical kitchenette-style conveniences for short or longer stays.",
    },
    {
      id: "breakfast",
      question: "Is breakfast available?",
      answer:
        "Yes. Breakfast is available for guests, and our amenities also include lunch packs and dinner voucher options when you need meals arranged around your schedule.",
    },
    {
      id: "meals",
      question: "Can I arrange lunch packs or dinner options?",
      answer:
        "Yes. Lunch packs can be arranged through reception, and dinner vouchers are available on request for local Kathu restaurants.",
    },
    {
      id: "parking",
      question: "Is there off-street parking?",
      answer:
        "Yes. Lavender Lane offers off-street parking for guests. Please note that the parking area is not gated, while the rest of the property is gated.",
    },
    {
      id: "load-shedding",
      question: "Will load-shedding affect my stay?",
      answer:
        "Lavender Lane has solar power for no load-shedding interruptions, plus borehole water for a reliable water supply during your stay.",
    },
    {
      id: "business-travel",
      question: "Is Lavender Lane suitable for business travellers?",
      answer:
        "Yes. Business guests have free Wi-Fi, in-room work desks, air-conditioned rooms, twin rooms for colleagues, laundry services, lunch packs, off-street parking, and a central Kathu location.",
    },
  ],
} satisfies SiteContent;

export function getSiteLogoImage(): SiteImage {
  return siteContent.siteLogoImage;
}

export function getHomeHeroImage(): SiteImage {
  return siteContent.homeHeroImage;
}

export function getBookingPlatform(): BookingPlatform {
  return siteContent.bookingPlatform;
}

export function getPrimaryContact(): ContactInfo {
  return siteContent.primaryContact;
}

export function getContacts(): ReadonlyArray<ContactInfo> {
  return siteContent.contacts;
}

export function getSocialLinks(): ReadonlyArray<SocialLink> {
  return siteContent.socialLinks;
}

export function getLocation(): LocationInfo {
  return siteContent.location;
}

export function getPolicies(): ReadonlyArray<PolicyInfo> {
  return siteContent.policies;
}

export function getRoomsRatesRooms(): ReadonlyArray<RoomsRatesRoom> {
  return siteContent.roomsRatesRooms;
}

export function getHomeAmenities(): ReadonlyArray<HomeAmenity> {
  return siteContent.homeAmenities;
}

export function getHomeGalleryImages(): ReadonlyArray<HomeGalleryImage> {
  return siteContent.homeGalleryImages;
}

export function getHomeFaqs(): ReadonlyArray<HomeFaqItem> {
  return siteContent.homeFaqs;
}
