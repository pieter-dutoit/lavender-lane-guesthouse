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

export type SiteContent = {
  bookingPlatform: BookingPlatform;
  primaryContact: ContactInfo;
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
} satisfies SiteContent;

export function getBookingPlatform(): BookingPlatform {
  return siteContent.bookingPlatform;
}

export function getPrimaryContact(): ContactInfo {
  return siteContent.primaryContact;
}
