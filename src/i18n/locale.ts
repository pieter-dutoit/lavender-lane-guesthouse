export type SiteLocale = "en-ZA" | "af-ZA";

export const SITE_LOCALES: ReadonlyArray<SiteLocale> = ["en-ZA", "af-ZA"];

export type SitePageKey = "home" | "about";

export function getPagePath(locale: SiteLocale, page: SitePageKey): string {
  if (locale === "af-ZA") {
    return page === "home" ? "/af" : "/af/about";
  }

  return page === "home" ? "/" : "/about";
}

export function getHomeHashPath(locale: SiteLocale, hash: string): string {
  const homePath = getPagePath(locale, "home");
  const pathPrefix = homePath === "/" ? "" : homePath;

  return `${pathPrefix}/#${hash}`;
}

export function getAlternateLocale(locale: SiteLocale): SiteLocale {
  return locale === "en-ZA" ? "af-ZA" : "en-ZA";
}
