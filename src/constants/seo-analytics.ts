import type { SiteLocale } from "@/i18n/locale";

export type SeoLocale = SiteLocale;

export type SeoAnalyticsConsentChoice = "accepted" | "rejected";

export type SeoAnalyticsEventName =
  | "booking_engine_click"
  | "phone_click"
  | "email_click"
  | "directions_click"
  | "language_switch";

type SeoAnalyticsConsentCopy = {
  title: string;
  description: string;
  enabledStatus: string;
  disabledStatus: string;
  accept: string;
  reject: string;
  revoke: string;
  close: string;
  settings: string;
};

export const SEO_ANALYTICS_CONSENT_STORAGE_KEY =
  "lavender-lane:analytics-consent:v1";

export const SEO_ANALYTICS_SETTINGS_EVENT =
  "lavender-lane:open-analytics-settings";

export const SEO_ANALYTICS_EVENT_NAMES: ReadonlySet<string> = new Set([
  "booking_engine_click",
  "phone_click",
  "email_click",
  "directions_click",
  "language_switch",
]);

export const SEO_ANALYTICS_CONSENT_COPY: Record<
  SeoLocale,
  SeoAnalyticsConsentCopy
> = {
  "en-ZA": {
    title: "Privacy Choices",
    description:
      "We use Google Analytics by default to understand how the website is used. You can decline analytics at any time.",
    enabledStatus: "Analytics is currently enabled.",
    disabledStatus: "Analytics is currently disabled.",
    accept: "Accept analytics",
    reject: "Decline analytics",
    revoke: "Decline analytics",
    close: "Close analytics settings",
    settings: "Analytics settings",
  },
  "af-ZA": {
    title: "Privaatheidskeuses",
    description:
      "Ons gebruik Google Analytics by verstek om te verstaan hoe die webwerf gebruik word. Jy kan ontledings enige tyd weier.",
    enabledStatus: "Ontledings is tans aangeskakel.",
    disabledStatus: "Ontledings is tans afgeskakel.",
    accept: "Aanvaar ontledings",
    reject: "Weier ontledings",
    revoke: "Weier ontledings",
    close: "Sluit ontledingsinstellings",
    settings: "Ontledingsinstellings",
  },
};
