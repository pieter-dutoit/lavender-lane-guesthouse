import type {
  SeoAnalyticsEventName,
  SeoLocale,
} from "@/constants/seo-analytics";

type SeoAnalyticsAttributeOptions = {
  locale?: SeoLocale;
  roomType?: string;
  placement?: string;
};

const GOOGLE_ANALYTICS_ID_PATTERN = /^G-[A-Z0-9]+$/;

export type SeoAnalyticsAttributes = {
  "data-seo-event": SeoAnalyticsEventName;
  "data-seo-locale"?: SeoLocale;
  "data-seo-room-type"?: string;
  "data-seo-placement"?: string;
};

export function getGoogleAnalyticsId(): string | null {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID?.trim();

  return measurementId && GOOGLE_ANALYTICS_ID_PATTERN.test(measurementId)
    ? measurementId
    : null;
}

export function getSeoAnalyticsAttributes(
  eventName: SeoAnalyticsEventName,
  options: SeoAnalyticsAttributeOptions = {},
): SeoAnalyticsAttributes {
  const attributes: SeoAnalyticsAttributes = {
    "data-seo-event": eventName,
  };

  if (options.locale) {
    attributes["data-seo-locale"] = options.locale;
  }

  if (options.roomType) {
    attributes["data-seo-room-type"] = options.roomType;
  }

  if (options.placement) {
    attributes["data-seo-placement"] = options.placement;
  }

  return attributes;
}
