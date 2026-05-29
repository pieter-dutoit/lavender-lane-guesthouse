import type { ContentImage, RoomsRatesRoom } from "@/content/site-content";

type RoomImageSource = Pick<RoomsRatesRoom, "featuredImages" | "galleryImages">;

export function getRoomGalleryImages(
  room: RoomImageSource,
): ReadonlyArray<ContentImage> {
  const images: Array<ContentImage> = [];
  const imageKeys = new Set<string>();

  for (const image of [...room.featuredImages, ...room.galleryImages]) {
    const imageKey = image.id.length > 0 ? image.id : image.src;

    if (imageKeys.has(imageKey)) {
      continue;
    }

    imageKeys.add(imageKey);
    images.push(image);
  }

  return images;
}
