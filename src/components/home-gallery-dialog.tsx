"use client";

import Image from "next/image";

import {
  GalleryLightbox,
  type GalleryLightboxImage,
} from "@/components/gallery-lightbox";
import {
  HOME_GALLERY_FEATURED_IMAGE_SIZES,
  HOME_GALLERY_STANDARD_IMAGE_SIZES,
} from "@/constants/image-sizes";
import { joinClasses } from "@/utils/join-classes";
import { getGalleryCopy } from "@/constants/gallery-copy";
import type { SiteLocale } from "@/i18n/locale";

type HomeGalleryDialogProps = {
  images: ReadonlyArray<GalleryLightboxImage>;
  locale: SiteLocale;
};

export function HomeGalleryDialog({
  images,
  locale,
}: HomeGalleryDialogProps) {
  const previewImages = images.slice(0, 6);
  const remainingImageCount = Math.max(images.length - previewImages.length, 0);
  const copy = getGalleryCopy(locale);
  const visibleGalleryLabel =
    remainingImageCount > 0
      ? copy.remainingPhotos(remainingImageCount)
      : copy.viewAll;
  const accessibleGalleryLabel = `${copy.viewGuesthouseGallery}: ${visibleGalleryLabel}`;

  if (images.length === 0) {
    return null;
  }

  return (
    <GalleryLightbox
      images={images}
      title="Lavender Lane Guesthouse"
      label={copy.guesthouseGalleryLabel}
      locale={locale}
      renderTrigger={(openLightbox) => (
        <button
          type="button"
          aria-label={accessibleGalleryLabel}
          onClick={() => openLightbox(0)}
          className="group grid grid-cols-6 gap-2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:gap-3"
        >
          {previewImages.map((image, index) => {
            const isFeaturedImage = index === 1;
            const showRemainder = index === previewImages.length - 1;

            return (
              <span
                key={image.id}
                className={joinClasses(
                  "relative isolate min-h-24 overflow-hidden rounded-lg border border-secondary/50 bg-secondary/15 shadow-sm md:min-h-32 xl:min-h-40",
                  isFeaturedImage
                    ? "col-span-4 row-span-2"
                    : "col-span-2 row-span-1",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    isFeaturedImage
                      ? HOME_GALLERY_FEATURED_IMAGE_SIZES
                      : HOME_GALLERY_STANDARD_IMAGE_SIZES
                  }
                  className="rounded-[inherit] object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />

                {showRemainder ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-black/40 px-3 text-center text-base font-semibold text-primary-foreground underline underline-offset-4 backdrop-blur-sm md:text-xl"
                  >
                    {visibleGalleryLabel}
                  </span>
                ) : null}
              </span>
            );
          })}
        </button>
      )}
    />
  );
}
