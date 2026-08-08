"use client";

import Image from "next/image";

import { GalleryLightbox } from "@/components/gallery-lightbox";
import {
  ROOM_PRIMARY_PREVIEW_IMAGE_SIZES,
  ROOM_SECONDARY_PREVIEW_IMAGE_SIZES,
  ROOM_SINGLE_PREVIEW_IMAGE_SIZES,
} from "@/constants/image-sizes";
import type { ContentImage } from "@/content/site-content";
import { getGalleryCopy } from "@/constants/gallery-copy";
import type { SiteLocale } from "@/i18n/locale";
import { joinClasses } from "@/utils/join-classes";

type RoomGalleryDialogProps = {
  roomName: string;
  images: ReadonlyArray<ContentImage>;
  locale: SiteLocale;
};

export function RoomGalleryDialog({
  roomName,
  images,
  locale,
}: RoomGalleryDialogProps) {
  const previewImages = images.slice(0, 2);
  const remainingImageCount = Math.max(images.length - previewImages.length, 0);
  const copy = getGalleryCopy(locale);

  if (images.length === 0) {
    return null;
  }

  return (
    <GalleryLightbox
      images={images}
      title={roomName}
      label={copy.roomGalleryLabel}
      locale={locale}
      renderTrigger={(openLightbox) => (
        <button
          type="button"
          aria-label={copy.viewRoomGallery(roomName)}
          onClick={() => openLightbox(0)}
          className="group grid size-full grid-cols-5 gap-2 p-2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {previewImages.map((image, index) => (
            <span
              key={image.id}
              className={joinClasses(
                "relative isolate min-h-48 overflow-hidden rounded-lg border border-secondary/50 bg-secondary/15",
                previewImages.length === 1
                  ? "col-span-5"
                  : index === 0
                    ? "col-span-3"
                    : "col-span-2",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  previewImages.length === 1
                    ? ROOM_SINGLE_PREVIEW_IMAGE_SIZES
                    : index === 0
                      ? ROOM_PRIMARY_PREVIEW_IMAGE_SIZES
                      : ROOM_SECONDARY_PREVIEW_IMAGE_SIZES
                }
                className="rounded-[inherit] object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              {index === 1 && remainingImageCount > 0 ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-black/50 text-2xl font-medium text-primary-foreground backdrop-blur-sm"
                >
                  +{remainingImageCount}
                </span>
              ) : null}
            </span>
          ))}
        </button>
      )}
    />
  );
}
