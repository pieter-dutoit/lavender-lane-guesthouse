import { HomeGalleryDialog } from "@/components/home-gallery-dialog";
import { SectionHeader } from "@/components/section-header";
import { getHomeGalleryImages } from "@/content/site-content";

export function HomeGallery() {
  const images = getHomeGalleryImages();

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
          label="A Look Around"
          title="Gallery"
          description="See the breakfast areas, guest lounges, outdoor seating, secure parking, and braai facilities around Lavender Lane Guesthouse."
        />

        <HomeGalleryDialog images={images} />
      </div>
    </section>
  );
}
