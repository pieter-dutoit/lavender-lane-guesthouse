"use client";

import {
  SEO_ANALYTICS_CONSENT_COPY,
  SEO_ANALYTICS_SETTINGS_EVENT,
  type SeoLocale,
} from "@/constants/seo-analytics";
import { getGoogleAnalyticsId } from "@/utils/seo-analytics";
import { joinClasses } from "@/utils/join-classes";

type SeoAnalyticsSettingsButtonProps = {
  locale?: SeoLocale;
  className?: string;
};

export function SeoAnalyticsSettingsButton({
  locale = "en-ZA",
  className,
}: SeoAnalyticsSettingsButtonProps) {
  const measurementId = getGoogleAnalyticsId();

  if (!measurementId) {
    return null;
  }

  function openSettings() {
    window.dispatchEvent(new Event(SEO_ANALYTICS_SETTINGS_EVENT));
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-controls="seo-analytics-consent-dialog"
      onClick={openSettings}
      className={joinClasses(
        "w-fit text-sm text-neutral-300 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary",
        className,
      )}
    >
      {SEO_ANALYTICS_CONSENT_COPY[locale].settings}
    </button>
  );
}
