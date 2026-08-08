"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import {
  LIGHTBOX_BLURRED_BACKGROUND_IMAGE_SIZES,
  LIGHTBOX_IMAGE_SIZES,
} from "@/constants/image-sizes";
import { joinClasses } from "@/utils/join-classes";
import { getGalleryCopy } from "@/constants/gallery-copy";
import type { SiteLocale } from "@/i18n/locale";

export type GalleryLightboxImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

type GalleryLightboxProps = {
  images: ReadonlyArray<GalleryLightboxImage>;
  title: string;
  label?: string;
  locale: SiteLocale;
  renderTrigger: (openLightbox: (imageIndex?: number) => void) => ReactNode;
};

function getWrappedImageIndex(imageIndex: number, imageCount: number): number {
  return ((imageIndex % imageCount) + imageCount) % imageCount;
}

export function GalleryLightbox({
  images,
  title,
  label,
  locale,
  renderTrigger,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const headingId = useId();
  const hasMultipleImages = images.length > 1;
  const copy = getGalleryCopy(locale);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (selectedImageIndex === null) {
      if (dialog.open) {
        dialog.close();
      }

      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }
  }, [selectedImageIndex]);

  const slidesToShow = useMemo(() => {
    if (selectedImageIndex === null || images.length === 0) {
      return [];
    }

    const previousImageIndex = getWrappedImageIndex(
      selectedImageIndex - 1,
      images.length,
    );
    const nextImageIndex = getWrappedImageIndex(
      selectedImageIndex + 1,
      images.length,
    );
    const slideIndexes = [
      previousImageIndex,
      selectedImageIndex,
      nextImageIndex,
    ];

    return slideIndexes.filter(
      (imageIndex, index) => slideIndexes.indexOf(imageIndex) === index,
    );
  }, [images.length, selectedImageIndex]);

  function openLightbox(imageIndex = 0) {
    if (images.length === 0) {
      return;
    }

    setSelectedImageIndex(getWrappedImageIndex(imageIndex, images.length));
  }

  function closeLightbox() {
    setSelectedImageIndex(null);
  }

  function resetSelectedImage() {
    setSelectedImageIndex(null);
  }

  function closeOnBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeLightbox();
    }
  }

  function showPreviousImage() {
    if (!hasMultipleImages) {
      return;
    }

    setSelectedImageIndex((currentImageIndex) =>
      currentImageIndex === null
        ? currentImageIndex
        : getWrappedImageIndex(currentImageIndex - 1, images.length),
    );
  }

  function showNextImage() {
    if (!hasMultipleImages) {
      return;
    }

    setSelectedImageIndex((currentImageIndex) =>
      currentImageIndex === null
        ? currentImageIndex
        : getWrappedImageIndex(currentImageIndex + 1, images.length),
    );
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextImage();
    }
  }

  if (images.length === 0) {
    return null;
  }

  const selectedImage =
    selectedImageIndex === null ? null : images[selectedImageIndex];

  return (
    <>
      {renderTrigger(openLightbox)}

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        onClick={closeOnBackdropClick}
        onClose={resetSelectedImage}
        onKeyDown={handleDialogKeyDown}
        className="gallery-lightbox-dialog m-auto w-[min(calc(100vw-2rem),72rem)] max-w-none overflow-hidden rounded-lg border border-secondary/50 bg-white p-0 text-foreground shadow-2xl"
      >
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
          <header className="flex shrink-0 items-start justify-between gap-4 p-4 sm:p-6">
            <div>
              <p className="text-xs leading-tight font-bold tracking-wide text-primary/70 uppercase">
                {label ?? copy.defaultLabel}
              </p>
              <h3
                id={headingId}
                className="mt-0.5 text-xl leading-tight font-semibold text-primary"
              >
                {title}
              </h3>
            </div>
            <button
              type="button"
              aria-label={copy.closeLabel}
              onClick={closeLightbox}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-secondary/50 bg-white text-primary transition-colors hover:bg-secondary/20 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </header>

          <div className="min-h-0 p-2 sm:p-4">
            <figure className="flex min-h-0 flex-col">
              <div className="relative h-[min(calc(100vw-3rem),calc(100dvh-12rem))] overflow-hidden rounded-lg bg-gray-950 sm:h-[min(56.25vw,calc(100dvh-13rem),40rem)]">
                {slidesToShow.map((imageIndex) => {
                  const image = images[imageIndex];
                  const isSelectedImage = imageIndex === selectedImageIndex;

                  return (
                    <div
                      key={`${image.id}-${imageIndex}`}
                      className={joinClasses(
                        "absolute inset-0",
                        isSelectedImage ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        aria-hidden="true"
                        fill
                        loading={isSelectedImage ? "eager" : "lazy"}
                        sizes={LIGHTBOX_BLURRED_BACKGROUND_IMAGE_SIZES}
                        className="scale-110 object-cover object-center opacity-70 blur-2xl brightness-75"
                      />

                      <Image
                        src={image.src}
                        alt={isSelectedImage ? image.alt : ""}
                        aria-hidden={isSelectedImage ? undefined : "true"}
                        fill
                        loading={isSelectedImage ? "eager" : "lazy"}
                        sizes={LIGHTBOX_IMAGE_SIZES}
                        className="object-contain object-center"
                      />
                    </div>
                  );
                })}

                {hasMultipleImages ? (
                  <>
                    <button
                      type="button"
                      aria-label={copy.previousLabel}
                      onClick={showPreviousImage}
                      className="absolute top-1/2 left-2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-primary shadow-lg transition-colors hover:bg-white hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:left-4"
                    >
                      <ChevronLeft aria-hidden="true" className="size-6" />
                    </button>

                    <button
                      type="button"
                      aria-label={copy.nextLabel}
                      onClick={showNextImage}
                      className="absolute top-1/2 right-2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-primary shadow-lg transition-colors hover:bg-white hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:right-4"
                    >
                      <ChevronRight aria-hidden="true" className="size-6" />
                    </button>
                  </>
                ) : null}
              </div>

              {selectedImageIndex === null ? null : (
                <p
                  aria-live="polite"
                  className="mt-3 text-center text-sm font-bold text-primary/70"
                >
                  {copy.photoPosition(selectedImageIndex + 1, images.length)}
                </p>
              )}

              {selectedImage?.caption ? (
                <figcaption className="sr-only">
                  {selectedImage.caption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </div>
      </dialog>
    </>
  );
}
