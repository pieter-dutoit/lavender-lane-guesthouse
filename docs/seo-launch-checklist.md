# Lavender Lane SEO launch checklist

## Canonical property fact sheet

Use these exact facts on the website, Google, Google Hotels and every directory:

- Name: Lavender Lane Guesthouse
- Address: 17 Nieshout Street, Kathu, Northern Cape, South Africa, 8446
- Telephone: +27 67 355 8676
- Email: info@lavenderlanekathu.co.za
- Official website: https://lavenderlanekathu.co.za
- Direct booking: https://book.nightsbridge.com/38107
- Room inventory: 15 rooms — 10 double, 2 single, 1 family and 2 twin
- Direct rates: R750 single; R800 double, twin and family
- Breakfast: included in the current direct room rates
- Power: full solar backup supports normal guesthouse operation during outages
- Cleaning: rooms are cleaned daily
- Laundry: available; confirm the current price directly with the guesthouse
- Parking and access: the guesthouse accommodation premises are gated. Guest parking is off-street and outside the gated accommodation area.
- Pets: by prior arrangement
- Check-in: from 14:00 by arrangement
- Check-out: by 10:00

Do not publish an unverified star rating, reception hours, live availability, review total or safety guarantee.

## Before production deployment

- Obtain a native Afrikaans speaker’s final review of all `/af` copy.
- Set `NEXT_PUBLIC_GA_ID` to the production GA4 web-stream ID.
- Configure HTTP and `www` to redirect directly to `https://lavenderlanekathu.co.za` at the hosting layer.
- Enable deployment protection or an `X-Robots-Tag: noindex` policy for preview deployments.
- Confirm the final production deployment returns `200` for all four canonical pages, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, the social image and both manifest icons.
- Validate the rendered JSON-LD with Schema Markup Validator and Google Rich Results Test. FAQ markup is descriptive and is not a promise of an FAQ rich result.

## Search and booking platforms

- Claim or reconfirm the Google Business Profile and Google hotel profile.
- Verify the map pin, lodging classification, website URL, current phone, current images, amenities and solar details.
- Verify that NightsBridge rates match the direct rates and that the Google Hotels “Official site” link reaches the correct booking flow.
- Reconcile the fact sheet across Booking.com, LekkeSlaap/TravelGround, Tripadvisor, SafariNow, Agoda and Trip.com.
- Add or verify Kathu.co.za, Apple Business Connect, Bing Places, Waze, SA-Venues, Places.co.za, WhereToStay and Sleeping-OUT.
- Correct old phone numbers, breakfast and pet contradictions, check-in discrepancies and brand variants.

For Google Business Profile measurement, use a tagged link such as:

`https://lavenderlanekathu.co.za/?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile`

Never use tagged URLs in canonicals, hreflang or the sitemap.

## Photos and reviews

- Upload current exterior/arrival, every room type, breakfast, solar, shared-space and parking photographs.
- Ask guests for an honest Google review after their stay.
- Do not offer incentives, gate requests by sentiment or prescribe review keywords.
- Respond to reviews individually and address operational feedback before amplifying related claims.

## Measurement and monitoring

- Before launch, export the previous 90 days from Search Console, Business Profile and NightsBridge/Hotel Center.
- Submit `/sitemap.xml` in Search Console and inspect `/`, `/about`, `/af` and `/af/about`.
- Check indexing, canonicals and redirects weekly for the first month.
- Review non-brand impressions, clicks, CTR, Business Profile actions, booking-engine clicks and completed direct bookings after 30, 60 and 90 days.
- Treat `booking_engine_click` as a micro-conversion. Use NightsBridge or Hotel Center reporting for completed bookings.

## Maintained location details

The homepage uses approximate road distances checked on 8 August 2026 with OpenStreetMap routing from the guesthouse coordinates. Routes and access points can change, especially around Sishen Mine, so recheck these figures when local access changes:

- Kathu Village Mall: approximately 3.2 km
- Sishen Golf Course: approximately 3.9 km
- Sishen Mine: approximately 8.1 km
- Sishen Airport: approximately 10.6 km
