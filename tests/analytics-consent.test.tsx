// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
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
    (candidate) => candidate.textContent?.trim() === label,
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
  process.env.NEXT_PUBLIC_GA_ID = "G-TEST123";
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

  delete process.env.NEXT_PUBLIC_GA_ID;
});

describe("Basic Consent Mode v2 analytics controller", () => {
  it("keeps Google unloaded until acceptance and supports rejection and revocation", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);

    await act(async () => {
      root?.render(
        <>
          <SeoAnalyticsController locale="en-ZA" />
          <SeoAnalyticsSettingsButton locale="en-ZA" />
        </>,
      );
    });

    expect(document.querySelector("[data-google-analytics]")).toBeNull();
    expect(JSON.stringify(Reflect.get(window, "dataLayer"))).toContain(
      '"analytics_storage":"denied"',
    );

    await click(getButton("Reject analytics"));
    expect(window.localStorage.getItem(SEO_ANALYTICS_CONSENT_STORAGE_KEY)).toBe(
      "rejected",
    );
    expect(document.querySelector("[data-google-analytics]")).toBeNull();

    await click(getButton("Analytics settings"));
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
    await click(getButton("Withdraw analytics consent"));
    expect(window.localStorage.getItem(SEO_ANALYTICS_CONSENT_STORAGE_KEY)).toBe(
      "rejected",
    );
    expect(document.querySelector("[data-google-analytics]")).toBeNull();
    expect(Reflect.get(window, "ga-disable-G-TEST123")).toBe(true);
  });
});
