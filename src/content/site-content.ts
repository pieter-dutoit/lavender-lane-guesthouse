import "server-only";

type AbsoluteHttpUrl = `http://${string}` | `https://${string}`;

export type BookingPlatform = {
  name: string;
  url: AbsoluteHttpUrl;
};

export type SiteContent = {
  bookingPlatform: BookingPlatform;
};

const siteContent = {
  bookingPlatform: {
    name: "NightsBridge",
    url: "https://book.nightsbridge.com/38107",
  },
} satisfies SiteContent;

export function getBookingPlatform(): BookingPlatform {
  return siteContent.bookingPlatform;
}
