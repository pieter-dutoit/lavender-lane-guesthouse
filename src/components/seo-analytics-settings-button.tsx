"use client";

import {
  SEO_ANALYTICS_CONSENT_COPY,
  SEO_ANALYTICS_SETTINGS_EVENT,
  type SeoLocale,
} from "@/constants/seo-analytics";
import { joinClasses } from "@/utils/join-classes";

type SeoAnalyticsSettingsButtonProps = {
  measurementId: string | null;
  locale?: SeoLocale;
  label?: string;
  className?: string;
};

export function SeoAnalyticsSettingsButton({
  measurementId,
  locale = "en-ZA",
  label,
  className,
}: SeoAnalyticsSettingsButtonProps) {
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
        "w-fit text-neutral-300 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary",
        className,
      )}
    >
      {label ?? SEO_ANALYTICS_CONSENT_COPY[locale].settings}
    </button>
  );
}
