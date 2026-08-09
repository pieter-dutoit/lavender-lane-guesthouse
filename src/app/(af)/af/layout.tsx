import { JsonLd } from "@/components/json-ld";
import { SeoAnalyticsController } from "@/components/seo-analytics-controller";
import { createRootMetadata, siteViewport } from "@/lib/seo/metadata";
import { createSiteJsonLd } from "@/lib/seo/structured-data";
import { siteFont } from "@/styles/site-font";
import { getGoogleAnalyticsId } from "@/utils/seo-analytics";

import "../../globals.css";

export const metadata = createRootMetadata("af-ZA");
export const viewport = siteViewport;

export default function AfrikaansRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const measurementId = getGoogleAnalyticsId();

  return (
    <html lang="af-ZA" className={`${siteFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd id="site-json-ld" data={createSiteJsonLd("af-ZA")} />
        {children}
        <SeoAnalyticsController
          measurementId={measurementId}
          locale="af-ZA"
        />
      </body>
    </html>
  );
}
