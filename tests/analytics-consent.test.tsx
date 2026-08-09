// @vitest-environment jsdom

import { act } from "react";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SeoAnalyticsController } from "@/components/seo-analytics-controller";
import { SeoAnalyticsSettingsButton } from "@/components/seo-analytics-settings-button";
import { SEO_ANALYTICS_CONSENT_STORAGE_KEY } from "@/constants/seo-analytics";

const sendGaEventMock = vi.hoisted(() => vi.fn());

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <span data-google-analytics={gaId} hidden />
  ),
  sendGAEvent: sendGaEventMock,
}));

let root: Root | null = null;

function getButton(label: string): HTMLButtonElement {
  const button = Array.from(document.querySelectorAll("button")).find(
    (candidate) =>
      candidate.textContent?.trim() === label ||
      candidate.getAttribute("aria-label") === label,
  );

  if (!(button instanceof HTMLButtonElement)) {
    throw new Error(`Missing button: ${label}`);
  }

  return button;
}

async function click(element: HTMLElement) {
  await act(async () => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

beforeEach(() => {
  window.localStorage.clear();
  document.body.replaceChildren();
  Reflect.deleteProperty(window, "dataLayer");
  Reflect.deleteProperty(window, "ga-disable-G-TEST123");
  Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
  sendGaEventMock.mockReset();
});

afterEach(async () => {
  if (root) {
    await act(async () => root?.unmount());
    root = null;
  }
});

describe("Basic Consent Mode v2 analytics controller", () => {
  it("tracks by default, dismisses without changing consent, and supports opt-out", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);

    await act(async () => {
      root?.render(
        <>
          <SeoAnalyticsController
            measurementId="G-TEST123"
            locale="en-ZA"
          />
          <SeoAnalyticsSettingsButton
            measurementId="G-TEST123"
            locale="en-ZA"
          />
        </>,
      );
    });

    expect(
      document.querySelector('[data-google-analytics="G-TEST123"]'),
    ).not.toBeNull();
    expect(JSON.stringify(Reflect.get(window, "dataLayer"))).toContain(
      '"analytics_storage":"granted"',
    );
    expect(() => getButton("Accept analytics")).toThrow();

    await click(getButton("Close analytics settings"));
    expect(
      window.localStorage.getItem(SEO_ANALYTICS_CONSENT_STORAGE_KEY),
    ).toBeNull();
    expect(document.querySelector("[role=dialog]")).toBeNull();
    expect(
      document.querySelector('[data-google-analytics="G-TEST123"]'),
    ).not.toBeNull();

    await click(getButton("Analytics settings"));

    await click(getButton("Decline analytics"));
    expect(window.localStorage.getItem(SEO_ANALYTICS_CONSENT_STORAGE_KEY)).toBe(
      "rejected",
    );
    expect(document.querySelector("[data-google-analytics]")).toBeNull();

    await click(getButton("Analytics settings"));
    expect(() => getButton("Decline analytics")).toThrow();
    await click(getButton("Accept analytics"));
    expect(window.localStorage.getItem(SEO_ANALYTICS_CONSENT_STORAGE_KEY)).toBe(
      "accepted",
    );
    expect(
      document.querySelector('[data-google-analytics="G-TEST123"]'),
    ).not.toBeNull();

    const trackedLink = document.createElement("a");
    trackedLink.dataset.seoEvent = "booking_engine_click";
    trackedLink.dataset.seoLocale = "en-ZA";
    trackedLink.dataset.seoRoomType = "Double Room";
    trackedLink.dataset.seoPlacement = "room_card";
    document.body.append(trackedLink);
    await click(trackedLink);

    expect(sendGaEventMock).toHaveBeenCalledWith(
      "event",
      "booking_engine_click",
      {
        locale: "en-ZA",
        room_type: "Double Room",
        placement: "room_card",
      },
    );

    await click(getButton("Analytics settings"));
    await click(getButton("Decline analytics"));
    expect(window.localStorage.getItem(SEO_ANALYTICS_CONSENT_STORAGE_KEY)).toBe(
      "rejected",
    );
    expect(document.querySelector("[data-google-analytics]")).toBeNull();
    expect(Reflect.get(window, "ga-disable-G-TEST123")).toBe(true);
  });

  it("renders no analytics UI when analytics is not configured", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);

    await act(async () => {
      root?.render(
        <>
          <SeoAnalyticsController measurementId={null} locale="en-ZA" />
          <SeoAnalyticsSettingsButton measurementId={null} locale="en-ZA" />
        </>,
      );
    });

    expect(container.textContent).toBe("");
    expect(document.querySelector("[role=dialog]")).toBeNull();
    expect(document.querySelector("[data-google-analytics]")).toBeNull();
  });

  it("hydrates the server-rendered settings button without a mismatch", async () => {
    const serverMarkup = renderToString(
      <SeoAnalyticsSettingsButton
        measurementId="G-TEST123"
        locale="en-ZA"
      />,
    );
    const container = document.createElement("div");
    container.innerHTML = serverMarkup;
    document.body.append(container);
    const recoverableErrors: unknown[] = [];

    await act(async () => {
      root = hydrateRoot(
        container,
        <SeoAnalyticsSettingsButton
          measurementId="G-TEST123"
          locale="en-ZA"
        />,
        {
          onRecoverableError(error) {
            recoverableErrors.push(error);
          },
        },
      );
    });

    expect(recoverableErrors).toEqual([]);
    expect(getButton("Analytics settings")).toBeInstanceOf(HTMLButtonElement);
  });
});
