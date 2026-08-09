"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { XIcon } from "lucide-react";
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

type SeoAnalyticsControllerProps = {
  measurementId: string | null;
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

const DEFAULT_GOOGLE_CONSENT: GoogleConsentParameters = {
  analytics_storage: "granted",
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

function ensureGoogleConsentDefaults() {
  if (hasInitializedGoogleConsent) {
    return;
  }

  pushGoogleConsentCommand("default", DEFAULT_GOOGLE_CONSENT);
  hasInitializedGoogleConsent = true;
}

function updateGoogleConsent(choice: SeoAnalyticsConsentChoice) {
  const parameters: GoogleConsentParameters = {
    ...DEFAULT_GOOGLE_CONSENT,
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
  measurementId,
  locale = "en-ZA",
}: SeoAnalyticsControllerProps) {
  const [choice, setChoice] =
    useState<SeoAnalyticsConsentChoice | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPromptDismissed, setIsPromptDismissed] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const settingsTriggerRef = useRef<HTMLElement | null>(null);
  const shouldFocusPanelRef = useRef(false);

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    ensureGoogleConsentDefaults();

    const storedChoice = readStoredConsent();

    if (storedChoice) {
      setGoogleAnalyticsDisabled(
        measurementId,
        storedChoice === "rejected",
      );
      updateGoogleConsent(storedChoice);
    } else {
      setGoogleAnalyticsDisabled(measurementId, false);
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
      setIsPromptDismissed(false);
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
    if (choice === "rejected") {
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
  const isPanelOpen =
    isReady && !isPromptDismissed && (choice === null || isSettingsOpen);
  const isAnalyticsEnabled = isReady && choice !== "rejected";

  function closeSettings() {
    setIsPromptDismissed(true);
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
          className="fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-50 mx-auto flex max-w-lg flex-col gap-2 rounded-md border border-secondary/50 bg-white px-3 py-2 text-foreground shadow-lg focus:outline-none sm:right-2 sm:left-auto sm:w-auto sm:max-w-[calc(100vw-1rem)] sm:flex-row sm:items-center sm:gap-3"
        >
          <div className="min-w-0 text-xs leading-4 text-pretty sm:w-lg">
            <h2
              id="seo-analytics-consent-title"
              className="inline font-semibold text-primary"
            >
              {copy.title}: {" "}
            </h2>
            <p id="seo-analytics-consent-description" className="inline">
              {copy.description}
              {choice ? (
                <span
                  className="ml-1 font-semibold text-primary"
                  aria-live="polite"
                >
                  {choice === "accepted"
                    ? copy.enabledStatus
                    : copy.disabledStatus}
                </span>
              ) : null}
            </p>
          </div>

          <div className="flex shrink-0 items-stretch gap-1.5">
            {choice === "rejected" ? (
              <button
                type="button"
                onClick={() => applyChoice("accepted")}
                className="inline-flex min-h-8 min-w-0 flex-1 touch-manipulation items-center justify-center rounded-sm bg-primary px-2.5 py-1 text-center text-xs leading-tight font-semibold text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-none sm:whitespace-nowrap"
              >
                {copy.accept}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => applyChoice("rejected")}
                className="inline-flex min-h-8 min-w-0 flex-1 touch-manipulation items-center justify-center rounded-sm bg-white px-2.5 py-1 text-center text-xs leading-tight font-semibold text-primary transition-colors hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-none sm:whitespace-nowrap"
              >
                {choice === "accepted" ? copy.revoke : copy.reject}
              </button>
            )}

            <button
              type="button"
              onClick={closeSettings}
              aria-label={copy.close}
              className="inline-flex size-8 shrink-0 touch-manipulation items-center justify-center rounded-sm border border-primary bg-white text-primary transition-colors hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
