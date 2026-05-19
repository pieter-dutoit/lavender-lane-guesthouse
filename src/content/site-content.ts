import "server-only";

type AbsoluteHttpUrl = `http://${string}` | `https://${string}`;

export type BookingPlatform = {
  name: string;
  url: AbsoluteHttpUrl;
};

export type ContactInfo = {
  phone: string;
  email: string;
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
};

export type SiteContent = {
  bookingPlatform: BookingPlatform;
  primaryContact: ContactInfo;
  roomsRatesRooms: ReadonlyArray<RoomsRatesRoom>;
};

const siteContent = {
  bookingPlatform: {
    name: "NightsBridge",
    url: "https://book.nightsbridge.com/38107",
  },
  primaryContact: {
    phone: "067 355 8676",
    email: "info@lavenderlanekathu.co.za",
  },
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
    },
  ],
} satisfies SiteContent;

export function getBookingPlatform(): BookingPlatform {
  return siteContent.bookingPlatform;
}

export function getPrimaryContact(): ContactInfo {
  return siteContent.primaryContact;
}

export function getRoomsRatesRooms(): ReadonlyArray<RoomsRatesRoom> {
  return siteContent.roomsRatesRooms;
}
