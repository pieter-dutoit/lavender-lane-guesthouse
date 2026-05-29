"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState, type MouseEvent, type UIEvent } from "react";

import { CarouselArrowButton } from "@/components/carousel-arrow-button";
import type { ContentImage } from "@/content/site-content";
import { joinClasses } from "@/utils/join-classes";

type RoomGalleryDialogProps = {
  roomName: string;
  images: ReadonlyArray<ContentImage>;
  eagerPreview?: boolean;
};

const DIALOG_IMAGE_SIZES =
  "(max-width: 639px) calc(100vw - 4rem), (max-width: 1184px) calc(100vw - 5rem), 69rem";

const THUMBNAIL_IMAGE_SIZES =
  "(max-width: 639px) 112px, (max-width: 767px) 144px, (max-width: 1023px) 176px, 192px";

type ScrollToImageOptions = {
  syncMainImage?: boolean;
};

export function RoomGalleryDialog({
  roomName,
  images,
  eagerPreview = false,
}: RoomGalleryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageListRef = useRef<HTMLUListElement>(null);
  const thumbnailListRef = useRef<HTMLUListElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const headingId = useId();
  const previewImages = images.slice(0, 2);
  const remainingImageCount = Math.max(images.length - previewImages.length, 0);
  const hasPreviousImage = activeImageIndex > 0;
  const hasNextImage = activeImageIndex < images.length - 1;
  const hasMultipleImages = images.length > 1;

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function closeOnBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  }

  function updateActiveImageFromScroll(event: UIEvent<HTMLUListElement>) {
    const imageList = event.currentTarget;

    if (imageList.clientWidth === 0) {
      return;
    }

    const nextActiveImageIndex = Math.min(
      Math.max(Math.round(imageList.scrollLeft / imageList.clientWidth), 0),
      images.length - 1,
    );

    scrollToImage(nextActiveImageIndex, { syncMainImage: false });
  }

  function scrollThumbnailToImage(imageIndex: number) {
    const thumbnailList = thumbnailListRef.current;
    const thumbnail = thumbnailList?.children.item(imageIndex);

    thumbnail?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function scrollToImage(
    imageIndex: number,
    { syncMainImage = true }: ScrollToImageOptions = {},
  ) {
    const nextImageIndex = Math.min(Math.max(imageIndex, 0), images.length - 1);
    const imageList = imageListRef.current;

    if (nextImageIndex === activeImageIndex && !syncMainImage) {
      return;
    }

    setActiveImageIndex(nextImageIndex);
    scrollThumbnailToImage(nextImageIndex);

    if (syncMainImage && imageList) {
      imageList.scrollTo({
        left: nextImageIndex * imageList.clientWidth,
        behavior: "smooth",
      });
    }
  }

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[activeImageIndex];

  return (
    <>
      <button
        type="button"
        aria-label={`View ${roomName} gallery`}
        onClick={openDialog}
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
              loading={eagerPreview && index === 0 ? "eager" : "lazy"}
              sizes={
                index === 0
                  ? "(max-width: 1024px) 60vw, 30vw"
                  : "(max-width: 1024px) 40vw, 20vw"
              }
              className="rounded-[inherit] object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            {index === 1 && remainingImageCount > 0 ? (
              <span
                aria-hidden="true"
                className="absolute inset-0 flex rounded-[inherit] items-center justify-center bg-black/50 text-2xl font-medium text-primary-foreground backdrop-blur-sm"
              >
                +{remainingImageCount}
              </span>
            ) : null}
          </span>
        ))}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        onClick={closeOnBackdropClick}
        className="room-gallery-dialog m-auto w-[min(calc(100vw-2rem),72rem)] max-w-none overflow-hidden rounded-lg border border-secondary/50 bg-white p-0 text-foreground shadow-2xl"
      >
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
          <header className="flex shrink-0 items-start justify-between gap-4 p-4 sm:p-6">
            <div>
              <p className="text-xs leading-tight font-bold tracking-wide text-primary/70 uppercase">
                Room gallery
              </p>
              <h3
                id={headingId}
                className="mt-0.5 text-xl leading-tight font-semibold text-primary"
              >
                {roomName}
              </h3>
            </div>
            <button
              type="button"
              aria-label="Close gallery"
              onClick={closeDialog}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-secondary/50 bg-white text-primary transition-colors hover:bg-secondary/20 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </header>

          <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
            <div className="relative">
              <figure>
                <div className="relative aspect-4/5 max-h-[calc(100dvh-16rem)] overflow-hidden rounded-lg border border-secondary bg-stone-100 shadow-sm sm:aspect-auto sm:h-[min(48dvh,36rem)] sm:max-h-[calc(100dvh-18rem)]">
                  <ul
                    ref={imageListRef}
                    onScroll={updateActiveImageFromScroll}
                    className="flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
                  >
                    {images.map((image, index) => (
                      <li
                        key={image.id}
                        className="relative h-full w-full shrink-0 snap-start overflow-hidden bg-stone-100"
                      >
                        <Image
                          src={image.src}
                          alt=""
                          aria-hidden="true"
                          fill
                          loading={
                            eagerPreview && index === 0 ? "eager" : "lazy"
                          }
                          sizes={DIALOG_IMAGE_SIZES}
                          className="scale-110 object-cover opacity-70 blur-2xl"
                        />
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          loading={
                            eagerPreview && index === 0 ? "eager" : "lazy"
                          }
                          sizes={DIALOG_IMAGE_SIZES}
                          className="object-contain"
                        />
                      </li>
                    ))}
                  </ul>

                  <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
                    <CarouselArrowButton
                      direction="previous"
                      variant="main"
                      ariaLabel="Show previous image"
                      disabled={!hasPreviousImage}
                      onClick={() => scrollToImage(activeImageIndex - 1)}
                    />

                    <CarouselArrowButton
                      direction="next"
                      variant="main"
                      ariaLabel="Show next image"
                      disabled={!hasNextImage}
                      onClick={() => scrollToImage(activeImageIndex + 1)}
                    />
                  </div>
                </div>
                <p className="mt-4 text-center text-sm font-bold text-primary/70">
                  Photo {activeImageIndex + 1} of {images.length}
                </p>
                <div className="relative mt-4">
                  {hasMultipleImages ? (
                    <>
                      <CarouselArrowButton
                        direction="previous"
                        variant="thumbnail"
                        ariaLabel="Show previous image"
                        disabled={!hasPreviousImage}
                        onClick={() => scrollToImage(activeImageIndex - 1)}
                      />

                      <CarouselArrowButton
                        direction="next"
                        variant="thumbnail"
                        ariaLabel="Show next image"
                        disabled={!hasNextImage}
                        onClick={() => scrollToImage(activeImageIndex + 1)}
                      />
                    </>
                  ) : null}

                  <ul
                    ref={thumbnailListRef}
                    className="flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden scroll-smooth px-1 py-1 [scrollbar-width:none] motion-reduce:scroll-auto sm:px-16 [&::-webkit-scrollbar]:hidden"
                  >
                    {images.map((image, index) => {
                      const isActiveImage = index === activeImageIndex;

                      return (
                        <li
                          key={image.id}
                          className="w-28 shrink-0 snap-center sm:w-36 md:w-44 lg:w-48"
                        >
                          <button
                            type="button"
                            aria-label={`Show photo ${index + 1} of ${
                              images.length
                            }: ${image.caption}`}
                            aria-current={isActiveImage ? "true" : undefined}
                            onClick={() => scrollToImage(index)}
                            className={joinClasses(
                              "relative block aspect-4/3 w-full overflow-hidden rounded-md border bg-stone-100 transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                              isActiveImage
                                ? "border-primary opacity-100 ring-2 ring-primary/30"
                                : "border-secondary/50 opacity-70 hover:border-primary/50 hover:opacity-100",
                            )}
                          >
                            <Image
                              src={image.src}
                              alt=""
                              aria-hidden="true"
                              fill
                              loading={
                                eagerPreview && index === 0 ? "eager" : "lazy"
                              }
                              sizes={THUMBNAIL_IMAGE_SIZES}
                              className="object-cover"
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <figcaption className="sr-only">
                  {activeImage.caption}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
