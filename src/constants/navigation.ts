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
