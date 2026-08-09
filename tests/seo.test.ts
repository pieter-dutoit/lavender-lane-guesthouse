import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getSiteCopy } from "@/content/site-copy";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  getLanguageAlternates,
  getLocalizedSeoPage,
  SEO_ROUTES,
} from "@/lib/seo/routes";
import { absoluteUrl, LODGING_FACTS, SITE_LOCALES } from "@/lib/seo/site";
import {
  createFaqPageJsonLd,
  createSiteJsonLd,
  getSeoFaqs,
} from "@/lib/seo/structured-data";
import type { SeoPageId } from "@/lib/seo/types";

const PAGE_IDS: ReadonlyArray<SeoPageId> = ["home", "about"];

describe("SEO route and locale map", () => {
  it("contains exactly two pages in both supported locales", () => {
    expect(SITE_LOCALES).toEqual(["en-ZA", "af-ZA"]);
    expect(SEO_ROUTES.map((route) => route.id)).toEqual(["home", "about"]);
    expect(
      SEO_ROUTES.flatMap((route) =>
        SITE_LOCALES.map((locale) => route.pages[locale].pathname),
      ),
    ).toEqual(["/", "/af", "/about", "/af/about"]);
  });

  it.each(PAGE_IDS)(
    "creates a reciprocal canonical and hreflang cluster for %s",
    (pageId) => {
      const languages = getLanguageAlternates(pageId);

      for (const locale of SITE_LOCALES) {
        const page = getLocalizedSeoPage(pageId, locale);
        const metadata = createPageMetadata(pageId, locale);

        expect(metadata.alternates?.canonical).toBe(absoluteUrl(page.pathname));
        expect(metadata.alternates?.languages).toEqual(languages);
        expect(languages[locale]).toBe(absoluteUrl(page.pathname));
      }

      expect(languages["x-default"]).toBe(languages["en-ZA"]);
    },
  );

  it.each(SITE_LOCALES)(
    "keeps the %s homepage metadata title aligned with its visible H1",
    (locale) => {
      expect(createPageMetadata("home", locale).title).toEqual({
        absolute: getSiteCopy(locale).home.hero.title,
      });
    },
  );
});

describe("SEO discovery files", () => {
  it("publishes exactly the four canonical localized URLs", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(4);
    expect(new Set(entries.map((entry) => entry.url))).toEqual(
      new Set([
        absoluteUrl("/"),
        absoluteUrl("/about"),
        absoluteUrl("/af"),
        absoluteUrl("/af/about"),
      ]),
    );

    for (const entry of entries) {
      expect(entry.alternates?.languages).toBeDefined();
      expect(entry.lastModified).toBeUndefined();
      expect(entry.changeFrequency).toBeUndefined();
      expect(entry.priority).toBeUndefined();
    }
  });

  it("allows production crawling and advertises stable browser assets", () => {
    expect(robots()).toMatchObject({
      sitemap: absoluteUrl("/sitemap.xml"),
      host: "https://lavenderlanekathu.co.za",
    });
    expect(manifest().icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sizes: "192x192" }),
        expect.objectContaining({ sizes: "512x512" }),
      ]),
    );
  });
});

describe("structured data", () => {
  it.each(SITE_LOCALES)(
    "contains the verified lodging and four room entities for %s",
    (locale) => {
      const serialized = JSON.stringify(createSiteJsonLd(locale));

      expect(serialized).toContain('"@type":"BedAndBreakfast"');
      expect(serialized.match(/"@type":"HotelRoom"/g)).toHaveLength(4);
      expect(serialized).toContain(LODGING_FACTS.telephone);
      expect(serialized).toContain(LODGING_FACTS.email);
      expect(serialized).toContain(LODGING_FACTS.priceRange);
      expect(serialized).toContain('"numberOfRooms":15');
      expect(serialized).toContain('"petsAllowed"');

      for (const prohibitedField of [
        "aggregateRating",
        "review",
        "availability",
        "openingHours",
        "starRating",
        "offers",
      ]) {
        expect(serialized).not.toContain(`\"${prohibitedField}\"`);
      }
    },
  );

  it.each(SITE_LOCALES)(
    "keeps FAQ schema identical to visible localized FAQ content for %s",
    (locale) => {
      const faqs = getSeoFaqs(locale);
      const serialized = JSON.stringify(createFaqPageJsonLd(locale, faqs));

      for (const faq of faqs) {
        expect(serialized).toContain(JSON.stringify(faq.question).slice(1, -1));
        expect(serialized).toContain(JSON.stringify(faq.answer).slice(1, -1));
      }
    },
  );
});
