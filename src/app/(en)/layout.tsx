import { JsonLd } from "@/components/json-ld";
import { SeoAnalyticsController } from "@/components/seo-analytics-controller";
import { createRootMetadata, siteViewport } from "@/lib/seo/metadata";
import { createSiteJsonLd } from "@/lib/seo/structured-data";
import { siteFont } from "@/styles/site-font";

import "../globals.css";

export const metadata = createRootMetadata("en-ZA");
export const viewport = siteViewport;

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={`${siteFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd id="site-json-ld" data={createSiteJsonLd("en-ZA")} />
        {children}
        <SeoAnalyticsController locale="en-ZA" />
      </body>
    </html>
  );
}
