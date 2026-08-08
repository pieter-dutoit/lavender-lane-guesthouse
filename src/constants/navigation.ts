import { getSiteCopy } from "@/content/site-copy";
import {
  getHomeHashPath,
  getPagePath,
  type SiteLocale,
  type SitePageKey,
} from "@/i18n/locale";

export type MainNavItem = {
  label: string;
  href: string;
  page: SitePageKey;
};

type FooterNavItem = {
  label: string;
  href: string;
};

export function getMainNavItems(
  locale: SiteLocale,
): ReadonlyArray<MainNavItem> {
  const { navigation } = getSiteCopy(locale);

  return [
    {
      label: navigation.home,
      href: getPagePath(locale, "home"),
      page: "home",
    },
    {
      label: navigation.about,
      href: getPagePath(locale, "about"),
      page: "about",
    },
  ];
}

export function getFooterNavItems(
  locale: SiteLocale,
): ReadonlyArray<FooterNavItem> {
  const { navigation } = getSiteCopy(locale);

  return [
    {
      label: navigation.home,
      href: getPagePath(locale, "home"),
    },
    {
      label: navigation.about,
      href: getPagePath(locale, "about"),
    },
    {
      label: navigation.roomsRates,
      href: getHomeHashPath(locale, "rooms-rates"),
    },
    {
      label: navigation.amenities,
      href: getHomeHashPath(locale, "amenities"),
    },
    {
      label: navigation.contact,
      href: getHomeHashPath(locale, "contact"),
    },
    {
      label: navigation.faqs,
      href: getHomeHashPath(locale, "faqs"),
    },
  ];
}
