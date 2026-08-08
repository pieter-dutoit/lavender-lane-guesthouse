"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useEffect, useRef, useState } from "react";

import {
  SEO_ANALYTICS_CONSENT_COPY,
  SEO_ANALYTICS_CONSENT_STORAGE_KEY,
  SEO_ANALYTICS_EVENT_NAMES,
  SEO_ANALYTICS_SETTINGS_EVENT,
  type SeoAnalyticsConsentChoice,
  type SeoAnalyticsEventName,
  type SeoLocale,
} from "@/constants/seo-analytics";
import { getGoogleAnalyticsId } from "@/utils/seo-analytics";

type SeoAnalyticsControllerProps = {
  locale?: SeoLocale;
};

type GoogleConsentValue = "denied" | "granted";

type GoogleConsentParameters = {
  analytics_storage: GoogleConsentValue;
  ad_storage: GoogleConsentValue;
  ad_user_data: GoogleConsentValue;
  ad_personalization: GoogleConsentValue;
};

type SeoAnalyticsEventParameters = {
  locale: SeoLocale;
  room_type?: string;
  placement?: string;
};

const DENIED_GOOGLE_CONSENT: GoogleConsentParameters = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

let hasInitializedGoogleConsent = false;

function pushGoogleConsentCommand(
  action: "default" | "update",
  parameters: GoogleConsentParameters,
) {
  window.dataLayer = window.dataLayer ?? [];

  function gtag(
    ...command: [
      "consent",
      "default" | "update",
      GoogleConsentParameters,
    ]
  ) {
    window.dataLayer?.push(command);
  }

  gtag("consent", action, parameters);
}

function ensureDeniedGoogleConsentDefaults() {
  if (hasInitializedGoogleConsent) {
    return;
  }

  pushGoogleConsentCommand("default", DENIED_GOOGLE_CONSENT);
  hasInitializedGoogleConsent = true;
}

function updateGoogleConsent(choice: SeoAnalyticsConsentChoice) {
  const parameters: GoogleConsentParameters = {
    ...DENIED_GOOGLE_CONSENT,
    analytics_storage: choice === "accepted" ? "granted" : "denied",
  };

  pushGoogleConsentCommand("update", parameters);
}

function setGoogleAnalyticsDisabled(measurementId: string, disabled: boolean) {
  Reflect.set(window, `ga-disable-${measurementId}`, disabled);
}

function isConsentChoice(
  value: string | null,
): value is SeoAnalyticsConsentChoice {
  return value === "accepted" || value === "rejected";
}

function readStoredConsent(): SeoAnalyticsConsentChoice | null {
  try {
    const storedChoice = window.localStorage.getItem(
      SEO_ANALYTICS_CONSENT_STORAGE_KEY,
    );

    return isConsentChoice(storedChoice) ? storedChoice : null;
  } catch {
    return null;
  }
}

function persistConsent(choice: SeoAnalyticsConsentChoice) {
  try {
    window.localStorage.setItem(SEO_ANALYTICS_CONSENT_STORAGE_KEY, choice);
  } catch {
    // Consent still applies for this page when browser storage is unavailable.
  }
}

function isSeoAnalyticsEventName(
  value: string | undefined,
): value is SeoAnalyticsEventName {
  return value !== undefined && SEO_ANALYTICS_EVENT_NAMES.has(value);
}

function resolveLocale(value: string | undefined, fallback: SeoLocale): SeoLocale {
  return value === "en-ZA" || value === "af-ZA" ? value : fallback;
}

function normalizeEventParameter(value: string | undefined) {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue.slice(0, 100) : undefined;
}

export function SeoAnalyticsController({
  locale = "en-ZA",
}: SeoAnalyticsControllerProps) {
  const measurementId = getGoogleAnalyticsId();
  const [choice, setChoice] =
    useState<SeoAnalyticsConsentChoice | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const settingsTriggerRef = useRef<HTMLElement | null>(null);
  const shouldFocusPanelRef = useRef(false);

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    ensureDeniedGoogleConsentDefaults();

    const storedChoice = readStoredConsent();

    if (storedChoice) {
      setGoogleAnalyticsDisabled(
        measurementId,
        storedChoice === "rejected",
      );
      updateGoogleConsent(storedChoice);
    } else {
      setGoogleAnalyticsDisabled(measurementId, true);
    }

    /* eslint-disable react-hooks/set-state-in-effect -- localStorage is a client-only external source that must be read after hydration. */
    setChoice(storedChoice);
    setIsReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    function openSettings() {
      const activeElement = document.activeElement;

      settingsTriggerRef.current =
        activeElement instanceof HTMLElement ? activeElement : null;
      shouldFocusPanelRef.current = true;
      setIsSettingsOpen(true);
    }

    window.addEventListener(SEO_ANALYTICS_SETTINGS_EVENT, openSettings);

    return () => {
      window.removeEventListener(SEO_ANALYTICS_SETTINGS_EVENT, openSettings);
    };
  }, [measurementId]);

  useEffect(() => {
    if (!isSettingsOpen || !shouldFocusPanelRef.current) {
      return;
    }

    shouldFocusPanelRef.current = false;
    panelRef.current?.focus();
  }, [isSettingsOpen]);

  useEffect(() => {
    if (choice !== "accepted") {
      return;
    }

    function trackDelegatedClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const trackedElement = event.target.closest<HTMLElement>(
        "[data-seo-event]",
      );
      const eventName = trackedElement?.dataset.seoEvent;

      if (!trackedElement || !isSeoAnalyticsEventName(eventName)) {
        return;
      }

      const parameters: SeoAnalyticsEventParameters = {
        locale: resolveLocale(trackedElement.dataset.seoLocale, locale),
      };
      const roomType = normalizeEventParameter(
        trackedElement.dataset.seoRoomType,
      );
      const placement = normalizeEventParameter(
        trackedElement.dataset.seoPlacement,
      );

      if (roomType) {
        parameters.room_type = roomType;
      }

      if (placement) {
        parameters.placement = placement;
      }

      sendGAEvent("event", eventName, parameters);
    }

    document.addEventListener("click", trackDelegatedClick, true);

    return () => {
      document.removeEventListener("click", trackDelegatedClick, true);
    };
  }, [choice, locale]);

  if (!measurementId) {
    return null;
  }

  const activeMeasurementId = measurementId;
  const copy = SEO_ANALYTICS_CONSENT_COPY[locale];
  const isPanelOpen = isReady && (choice === null || isSettingsOpen);
  const isAnalyticsEnabled = isReady && choice === "accepted";

  function closeSettings() {
    setIsSettingsOpen(false);

    window.requestAnimationFrame(() => {
      settingsTriggerRef.current?.focus();
      settingsTriggerRef.current = null;
    });
  }

  function applyChoice(nextChoice: SeoAnalyticsConsentChoice) {
    persistConsent(nextChoice);
    setGoogleAnalyticsDisabled(
      activeMeasurementId,
      nextChoice === "rejected",
    );
    updateGoogleConsent(nextChoice);
    setChoice(nextChoice);

    if (isSettingsOpen) {
      closeSettings();
    }
  }

  return (
    <>
      {isAnalyticsEnabled ? (
        <GoogleAnalytics gaId={activeMeasurementId} />
      ) : null}

      {isPanelOpen ? (
        <section
          id="seo-analytics-consent-dialog"
          ref={panelRef}
          role="dialog"
          tabIndex={-1}
          aria-labelledby="seo-analytics-consent-title"
          aria-describedby="seo-analytics-consent-description"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-lg border border-secondary/50 bg-white p-5 text-foreground shadow-2xl focus:outline-none sm:p-6"
        >
          <h2
            id="seo-analytics-consent-title"
            className="text-lg font-semibold text-primary"
          >
            {copy.title}
          </h2>
          <p
            id="seo-analytics-consent-description"
            className="mt-2 text-sm leading-relaxed text-pretty"
          >
            {copy.description}
          </p>

          {choice ? (
            <p className="mt-2 text-sm font-semibold text-primary" aria-live="polite">
              {choice === "accepted"
                ? copy.enabledStatus
                : copy.disabledStatus}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
            {choice === null ? (
              <button
                type="button"
                onClick={() => applyChoice("rejected")}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-secondary bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.reject}
              </button>
            ) : (
              <button
                type="button"
                onClick={closeSettings}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-secondary bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.close}
              </button>
            )}

            {choice === "accepted" ? (
              <button
                type="button"
                onClick={() => applyChoice("rejected")}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.revoke}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => applyChoice("accepted")}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.accept}
              </button>
            )}
          </div>
        </section>
      ) : null}
    </>
  );
}
