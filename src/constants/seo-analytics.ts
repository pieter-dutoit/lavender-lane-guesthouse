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
      "With your permission, we use Google Analytics to understand how the website is used. Google Analytics is not loaded unless you accept.",
    enabledStatus: "Analytics is currently enabled.",
    disabledStatus: "Analytics is currently disabled.",
    accept: "Accept analytics",
    reject: "Reject analytics",
    revoke: "Withdraw analytics consent",
    close: "Close settings",
    settings: "Analytics settings",
  },
  "af-ZA": {
    title: "Privaatheidskeuses",
    description:
      "Met jou toestemming gebruik ons Google Analytics om te verstaan hoe die webwerf gebruik word. Google Analytics word nie gelaai tensy jy dit aanvaar nie.",
    enabledStatus: "Ontledings is tans aangeskakel.",
    disabledStatus: "Ontledings is tans afgeskakel.",
    accept: "Aanvaar ontledings",
    reject: "Weier ontledings",
    revoke: "Trek toestemming vir ontledings terug",
    close: "Sluit instellings",
    settings: "Ontledingsinstellings",
  },
};
