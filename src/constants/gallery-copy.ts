import type { SiteLocale } from "@/i18n/locale";

type GalleryCopy = {
  defaultLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  photoPosition: (current: number, total: number) => string;
  roomGalleryLabel: string;
  viewRoomGallery: (roomName: string) => string;
  guesthouseGalleryLabel: string;
  viewGuesthouseGallery: string;
  remainingPhotos: (count: number) => string;
  viewAll: string;
};

const GALLERY_COPY = {
  "en-ZA": {
    defaultLabel: "Gallery",
    closeLabel: "Close gallery",
    previousLabel: "Show previous image",
    nextLabel: "Show next image",
    photoPosition: (current, total) => `Photo ${current} of ${total}`,
    roomGalleryLabel: "Room gallery",
    viewRoomGallery: (roomName) => `View ${roomName} gallery`,
    guesthouseGalleryLabel: "Guesthouse gallery",
    viewGuesthouseGallery: "View Lavender Lane Guesthouse gallery",
    remainingPhotos: (count) =>
      `+${count} ${count === 1 ? "photo" : "photos"}`,
    viewAll: "View all",
  },
  "af-ZA": {
    defaultLabel: "Galery",
    closeLabel: "Sluit galery",
    previousLabel: "Wys vorige foto",
    nextLabel: "Wys volgende foto",
    photoPosition: (current, total) => `Foto ${current} van ${total}`,
    roomGalleryLabel: "Kamergalery",
    viewRoomGallery: (roomName) => `Bekyk die galery vir ${roomName}`,
    guesthouseGalleryLabel: "Gastehuisgalery",
    viewGuesthouseGallery: "Bekyk Lavender Lane Guesthouse se galery",
    remainingPhotos: (count) =>
      `+${count} ${count === 1 ? "foto" : "foto’s"}`,
    viewAll: "Bekyk alles",
  },
} satisfies Record<SiteLocale, GalleryCopy>;

export function getGalleryCopy(locale: SiteLocale): GalleryCopy {
  return GALLERY_COPY[locale];
}
