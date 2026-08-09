import "server-only";

type AbsoluteHttpUrl = `http://${string}` | `https://${string}`;
type LocalImageSrc = `/media/${string}`;

type SiteImage = {
  src: LocalImageSrc;
  alt: string;
};

type SiteLogoImage = SiteImage & {
  width: number;
  height: number;
};

export type ContentImage = SiteImage & {
  id: string;
  caption: string;
};

function createContentImage(
  id: string,
  src: LocalImageSrc,
  alt: string,
  caption = alt,
): ContentImage {
  return {
    id,
    src,
    alt,
    caption,
  };
}

type BookingPlatform = {
  name: string;
  url: AbsoluteHttpUrl;
};

type ContactInfo = {
  phone: string;
  email: string;
};

type SocialLink = {
  name: string;
  link: string;
};

type LocationInfo = {
  city: string;
  province: string;
  formattedAddress: string;
  mapsLink: AbsoluteHttpUrl;
  mapsEmbedSrc: AbsoluteHttpUrl;
};

type PolicyInfo = {
  title: string;
  description: string;
};

type RoomsRatesBed = {
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

type HomeAmenity = {
  slug: HomeAmenitySlug;
  name: string;
};

type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type AboutHighlightSlug =
  | "modern-rooms"
  | "friendly-staff"
  | "complimentary-amenities"
  | "prime-location";

type AboutHighlight = {
  slug: AboutHighlightSlug;
  title: string;
  description: string;
};

type AboutTeamMember = {
  name: string;
  role: string;
};

type AboutContent = {
  hero: {
    label: string;
    title: string;
    description: string;
    image: SiteImage;
  };
  overview: {
    label: string;
    title: string;
    description: string;
    highlights: ReadonlyArray<AboutHighlight>;
  };
  story: {
    label: string;
    title: string;
    paragraphs: ReadonlyArray<string>;
  };
  team: {
    label: string;
    title: string;
    description: string;
    members: ReadonlyArray<AboutTeamMember>;
  };
  contact: {
    label: string;
    title: string;
    description: string;
  };
};

type SiteContent = {
  siteLogoImage: SiteLogoImage;
  homeHeroImage: SiteImage;
  about: AboutContent;
  bookingPlatform: BookingPlatform;
  primaryContact: ContactInfo;
  contacts: ReadonlyArray<ContactInfo>;
  socialLinks: ReadonlyArray<SocialLink>;
  location: LocationInfo;
  policies: ReadonlyArray<PolicyInfo>;
  roomsRatesRooms: ReadonlyArray<RoomsRatesRoom>;
  homeAmenities: ReadonlyArray<HomeAmenity>;
  homeGalleryImages: ReadonlyArray<ContentImage>;
  homeFaqs: ReadonlyArray<HomeFaqItem>;
};

const contacts = [
  {
    email: "info@lavenderlanekathu.co.za",
    phone: "067 355 8676",
  },
] satisfies ReadonlyArray<ContactInfo>;

const siteContent = {
  siteLogoImage: {
    src: "/media/lavender-lane-logo.png",
    alt: "Lavender Lane Guesthouse logo",
    width: 506,
    height: 247,
  },
  homeHeroImage: {
    src: "/media/lavender-lane-kathu-hero.jpg",
    alt: "Double bed in a Lavender Lane Guesthouse room",
  },
  about: {
    hero: {
      label: "Lavender Lane Guesthouse",
      title: "About Lavender Lane",
      description: "Your home away from home in the heart of Kathu.",
      image: {
        src: "/media/lavender-lane-secure-premises.jpg",
        alt: "Lavender Lane Guesthouse exterior sign",
      },
    },
    overview: {
      label: "Overview",
      title: "Experience Comfort & Hospitality",
      description:
        "Situated at 17 Nieshout Street in Kathu, Lavender Lane offers a perfect blend of comfort and friendly service.",
      highlights: [
        {
          slug: "modern-rooms",
          title: "Modern Rooms",
          description:
            "15 tastefully decorated rooms with a contemporary design.",
        },
        {
          slug: "friendly-staff",
          title: "Friendly Staff",
          description:
            "A welcoming team with more than 20 years of hospitality experience.",
        },
        {
          slug: "complimentary-amenities",
          title: "Complimentary Amenities",
          description:
            "Free Wi-Fi, coffee and tea stations, and daily room cleaning.",
        },
        {
          slug: "prime-location",
          title: "Prime Location",
          description:
            "Conveniently located in central Kathu for business or leisure stays.",
        },
      ],
    },
    story: {
      label: "About Us",
      title: "Our Story",
      paragraphs: [
        "Lavender Lane was born out of a passion for hospitality and a desire to create a welcoming space for travellers in Kathu. Our guesthouse has been thoughtfully designed to provide a comfortable and memorable stay for all our guests.",
        "With 15 beautifully appointed rooms, including a family room and 2 twin rooms, we cater to a variety of needs. Each room is equipped with modern amenities to make your stay as comfortable as possible.",
        "Our team, with more than 20 years of experience in the hospitality industry, is dedicated to making your stay exceptional. From the moment you arrive until your departure, we strive to offer personalised service that will make you feel truly at home.",
      ],
    },
    team: {
      label: "Who We Are",
      title: "Meet Our Team",
      description: "The heart of Lavender Lane’s hospitality.",
      members: [
        {
          name: "Mienie du Toit",
          role: "Owner",
        },
        {
          name: "Madeleine de Waal",
          role: "Owner",
        },
        {
          name: "Izandri Janse van Vuuren",
          role: "Administration",
        },
      ],
    },
    contact: {
      label: "Come Stay With Us",
      title: "Let’s Plan Your Visit",
      description:
        "Questions about our rooms, amenities, or Kathu? Our team is ready to help you feel at home before you arrive.",
    },
  },
  bookingPlatform: {
    name: "NightsBridge",
    url: "https://book.nightsbridge.com/38107",
  },
  primaryContact: contacts[0],
  contacts,
  socialLinks: [
    {
      name: "Instagram",
      link: "https://www.instagram.com/lavenderlanekathu/",
    },
  ],
  location: {
    city: "Kathu",
    province: "Northern Cape",
    formattedAddress:
      "17 Nieshout Street, Kathu, Northern Cape, South Africa, 8446",
    mapsLink: "https://maps.app.goo.gl/KR5bnydJB9HdNGMs8",
    mapsEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.7135455567986!2d23.052124!3d-27.6952471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9e412976e47095%3A0xef41f10a6cf9bd04!2sLavender%20Lane!5e0!3m2!1sen!2sza!4v1779262689596!5m2!1sen!2sza",
  },
  policies: [
    {
      title: "Check-In",
      description: "From 14:00 by arrangement",
    },
    {
      title: "Check-Out",
      description: "By 10:00",
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
        createContentImage(
          "double-room-main-bed",
          "/media/room-double-bed.jpg",
          "Double room bed with white linen and floral cushions",
          "Double room bed",
        ),
        createContentImage(
          "double-room-red-throw",
          "/media/double-room-red-throw.jpg",
          "Double room bed with a red throw and floral cushions",
          "Double room with red throw",
        ),
      ],
      galleryImages: [
        createContentImage(
          "double-room-main-bed",
          "/media/room-double-bed.jpg",
          "Double room bed with white linen and floral cushions",
          "Double room bed",
        ),
        createContentImage(
          "double-room-red-throw",
          "/media/double-room-red-throw.jpg",
          "Double room bed with a red throw and floral cushions",
          "Double room with red throw",
        ),
        createContentImage(
          "double-room-green",
          "/media/double-room-green.jpg",
          "Double room bed with a green throw and butterfly cushions",
          "Double room with green throw",
        ),
        createContentImage(
          "double-room-bed",
          "/media/double-room-bed.jpg",
          "Double room bed with bedside lamps and towels",
          "Double room bed with towels",
        ),
        createContentImage(
          "double-room-queen-green-throw",
          "/media/queen-room-bed-green-throw.jpg",
          "Queen room bed with a green throw and bedside lamps",
          "Queen room bed with green throw",
        ),
        createContentImage(
          "double-room-coffee-tea",
          "/media/room-coffee-and-tea.jpg",
          "In-room coffee and tea selection",
          "Coffee and tea selection",
        ),
        createContentImage(
          "double-room-microwave",
          "/media/room-microwave.jpg",
          "In-room microwave and kitchenette cupboard",
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
        createContentImage(
          "single-room-bed",
          "/media/single-room.jpg",
          "Single room bed with a green throw and towels",
          "Single room bed",
        ),
        createContentImage(
          "single-room-bedroom-amenities",
          "/media/bedroom-amenities.jpg",
          "Single room with bedside table, wardrobe, desk, and kitchenette",
          "Single room amenities",
        ),
      ],
      galleryImages: [
        createContentImage(
          "single-room-bed",
          "/media/single-room.jpg",
          "Single room bed with a green throw and towels",
          "Single room bed",
        ),
        createContentImage(
          "single-room-bedroom-amenities",
          "/media/bedroom-amenities.jpg",
          "Single room with bedside table, wardrobe, desk, and kitchenette",
          "Single room amenities",
        ),
        createContentImage(
          "single-room-study-desk",
          "/media/room-study-desk.jpg",
          "In-room study desk and chair",
          "Room study desk",
        ),
        createContentImage(
          "single-room-bathroom",
          "/media/bathroom.jpg",
          "En-suite bathroom with shower and vanity",
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
        createContentImage(
          "family-room-beds",
          "/media/family-room.jpg",
          "Family room with a double bed and single bed",
          "Family room beds",
        ),
        createContentImage(
          "family-room-amenities",
          "/media/room-amenities.jpg",
          "Room kitchenette amenities with kettle, microwave, and storage",
          "Family room amenities",
        ),
      ],
      galleryImages: [
        createContentImage(
          "family-room-beds",
          "/media/family-room.jpg",
          "Family room with a double bed and single bed",
          "Family room beds",
        ),
        createContentImage(
          "family-room-amenities",
          "/media/room-amenities.jpg",
          "Room kitchenette amenities with kettle, microwave, and storage",
          "Family room amenities",
        ),
        createContentImage(
          "family-room-coffee-microwave",
          "/media/room-amenities-coffee-microwave.jpg",
          "Room coffee station and microwave",
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
        createContentImage(
          "twin-room-beds",
          "/media/twin-room.jpg",
          "Twin room with two single beds",
          "Twin room beds",
        ),
        createContentImage(
          "twin-room-bed-detail",
          "/media/twin-room-beds.jpg",
          "Twin room beds with towels",
          "Twin room beds with towels",
        ),
      ],
      galleryImages: [
        createContentImage(
          "twin-room-beds",
          "/media/twin-room.jpg",
          "Twin room with two single beds",
          "Twin room beds",
        ),
        createContentImage(
          "twin-room-bed-detail",
          "/media/twin-room-beds.jpg",
          "Twin room beds with towels",
          "Twin room beds with towels",
        ),
        createContentImage(
          "twin-room-desk-fridge",
          "/media/room-desk-and-fridge.jpg",
          "In-room desk, fridge, and wardrobe",
          "Desk, fridge, and wardrobe",
        ),
      ],
    },
  ],
  homeAmenities: [
    {
      slug: "breakfast",
      name: "Breakfast Included",
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
    createContentImage(
      "breakfast-area",
      "/media/breakfast-area.jpg",
      "Breakfast area with tables, chairs, and serving counter",
      "Breakfast area",
    ),
    createContentImage(
      "breakfast-bar",
      "/media/breakfast-bar.jpg",
      "Breakfast bar with coffee and tea station",
      "Breakfast bar",
    ),
    createContentImage(
      "breakfast-cereal",
      "/media/breakfast-cereal.jpg",
      "Breakfast cereal dispensers and jars",
      "Breakfast cereal station",
    ),
    createContentImage(
      "dining-area",
      "/media/dining-area.jpg",
      "Dining area with tables, chairs, and lounge seating",
      "Dining area",
    ),
    createContentImage(
      "lounge",
      "/media/lavender-lane-lounge.jpg",
      "Lavender Lane lounge with leather seating",
      "Guest lounge",
    ),
    createContentImage(
      "outdoor-dining-area",
      "/media/lavender-lane-outdoor-dining-area.jpg",
      "Outdoor dining table under a tree",
      "Outdoor dining area",
    ),
    createContentImage(
      "outdoor-seating",
      "/media/lavender-lane-outdoor-seating.jpg",
      "Outdoor seating with umbrella beside the garden",
      "Outdoor seating",
    ),
    createContentImage(
      "patio-seating",
      "/media/lavender-lane-patio-seating.jpg",
      "Patio seating with table and hanging plants",
      "Patio seating",
    ),
    createContentImage(
      "patio",
      "/media/patio.jpg",
      "Patio walkway with plants and garden access",
      "Patio walkway",
    ),
    createContentImage(
      "parking",
      "/media/lavender-lane-parking.jpg",
      "Lavender Lane parking area and exterior signage",
      "Parking area",
    ),
    createContentImage(
      "secure-premises",
      "/media/lavender-lane-secure-premises.jpg",
      "Lavender Lane exterior sign at the gated guesthouse premises",
      "Gated guesthouse premises",
    ),
    createContentImage(
      "outdoor-braai-area",
      "/media/outdoor-braai-area.jpg",
      "Outdoor braai area with table and chairs",
      "Outdoor braai area",
    ),
  ],
  homeFaqs: [
    {
      id: "location",
      question: "Where is Lavender Lane Guesthouse located in Kathu?",
      answer:
        "Lavender Lane Guesthouse is at 17 Nieshout Street, Kathu, Northern Cape, South Africa, 8446. Our central Kathu location is convenient for business travel, overnight stops, and guests visiting the surrounding Northern Cape area.",
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
        "Check-in is available from 14:00 by arrangement, and check-out is by 10:00. Contact us before your stay to arrange your arrival.",
    },
    {
      id: "room-amenities",
      question: "Do the rooms have Wi-Fi, air conditioning and DStv?",
      answer:
        "Yes. Rooms include free Wi-Fi, air conditioning, DStv, a work desk, fridge, microwave, kettle, and practical kitchenette-style conveniences for short or longer stays.",
    },
    {
      id: "breakfast",
      question: "Is breakfast included in the room rate?",
      answer:
        "Yes. Breakfast is included in the current direct rates for all four room types. Lunch packs and dinner vouchers can also be arranged at an additional price on request.",
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
        "Lavender Lane uses full solar backup to continue normal guesthouse operations during load-shedding. Borehole water also supports a reliable water supply during your stay.",
    },
    {
      id: "business-travel",
      question: "Is Lavender Lane suitable for business travellers?",
      answer:
        "Yes. Business guests have free Wi-Fi, in-room work desks, air-conditioned rooms, twin rooms for colleagues, laundry services, lunch packs, off-street parking, and a central Kathu location.",
    },
    {
      id: "pets",
      question: "Are pets allowed?",
      answer:
        "Pets may stay by prior arrangement. Please contact us before booking so we can confirm the details for your stay.",
    },
  ],
} satisfies SiteContent;

export function getSiteLogoImage(): SiteLogoImage {
  return siteContent.siteLogoImage;
}

export function getHomeHeroImage(): SiteImage {
  return siteContent.homeHeroImage;
}

export function getAboutContent(): AboutContent {
  return siteContent.about;
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

export function getHomeGalleryImages(): ReadonlyArray<ContentImage> {
  return siteContent.homeGalleryImages;
}

export function getHomeFaqs(): ReadonlyArray<HomeFaqItem> {
  return siteContent.homeFaqs;
}
