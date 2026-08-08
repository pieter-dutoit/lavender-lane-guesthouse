import { HomeGalleryDialog } from "@/components/home-gallery-dialog";
import { SectionHeader } from "@/components/section-header";
import { getLocalizedHomeGalleryImages } from "@/content/localized-site-content";
import { getSiteCopy } from "@/content/site-copy";
import type { SiteLocale } from "@/i18n/locale";

type HomeGalleryProps = {
  locale: SiteLocale;
};

export function HomeGallery({ locale }: HomeGalleryProps) {
  const images = getLocalizedHomeGalleryImages(locale);
  const copy = getSiteCopy(locale);

  if (images.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="gallery-heading"
      className="relative w-full border-b border-secondary/30 py-8 lg:py-16"
    >
      <div id="gallery" className="absolute -mt-32 md:-mt-36 lg:-mt-40" />

      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="gallery-heading"
          label={copy.home.gallery.label}
          title={copy.home.gallery.title}
          description={copy.home.gallery.description}
        />

        <HomeGalleryDialog images={images} locale={locale} />
      </div>
    </section>
  );
}
