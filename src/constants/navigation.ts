export type MainNavItem = {
  label: string;
  href: "/" | "/about";
};

export const MAIN_NAV_ITEMS: ReadonlyArray<MainNavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
];

type FooterNavItem = {
  label: string;
  href:
    | "/"
    | "/about"
    | "/#rooms-rates"
    | "/#amenities"
    | "/#contact"
    | "/#faqs";
};

export const FOOTER_NAV_ITEMS: ReadonlyArray<FooterNavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Rooms & Rates",
    href: "/#rooms-rates",
  },
  {
    label: "Amenities",
    href: "/#amenities",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
  {
    label: "FAQs",
    href: "/#faqs",
  },
];
