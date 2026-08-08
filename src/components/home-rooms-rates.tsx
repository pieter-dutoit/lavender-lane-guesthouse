import {
  AirVent,
  BedDouble,
  BriefcaseBusiness,
  Coffee,
  DoorOpen,
  Lock,
  Microwave,
  Refrigerator,
  ShowerHead,
  Tv,
  Users,
  Wifi,
} from "lucide-react";

import { AmenityChip } from "@/components/amenity-chip";
import { RoomGalleryDialog } from "@/components/room-gallery-dialog";
import { SectionHeader } from "@/components/section-header";
import {
  getBookingPlatform,
  getRoomsRatesRooms,
} from "@/content/site-content";
import { formatRate } from "@/utils/format-rate";
import { getRoomGalleryImages } from "@/utils/room-images";

export function HomeRoomsRates() {
  const bookingPlatform = getBookingPlatform();
  const rooms = getRoomsRatesRooms();

  return (
    <section
      aria-labelledby="rooms-rates-heading"
      className="relative w-full border-b border-secondary/30 py-8 lg:py-16"
    >
      <div id="rooms-rates" className="absolute -mt-32 md:-mt-36 lg:-mt-40" />

      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="rooms-rates-heading"
          label="Stay, Work, Recharge"
          title="Rooms & Rates"
          description="Find the perfect room for your stay, whether you're traveling solo, with colleagues, or as a family."
        />

        <ul className="grid grid-cols-1 gap-4">
          {rooms.map((room) => {
            const sleepsCount = room.sleepsAdults + room.sleepsChildren;
            const roomGalleryImages = getRoomGalleryImages(room);

            return (
              <li
                key={room.name}
                className="grid overflow-hidden rounded-lg border border-secondary/50 bg-white text-foreground shadow-lg lg:grid-cols-2"
              >
                <div className="order-2 flex flex-col p-4 lg:order-1">
                  <h3 className="text-xl font-semibold text-primary">
                    {room.name}
                  </h3>
                  <p className="mt-2 text-sm text-pretty text-foreground">
                    {room.description}
                  </p>
                  <p className="sr-only">{room.count} rooms available.</p>

                  <div className="mt-6 flex flex-col gap-6">
                    <h4 className="sr-only">Capacity</h4>
                    <ul className="flex flex-col flex-wrap gap-2">
                      <li className="flex items-center gap-2">
                        <Users
                          aria-hidden="true"
                          className="size-5 shrink-0 text-primary"
                        />
                        <span className="text-sm font-semibold">
                          Sleeps {sleepsCount} People
                        </span>
                      </li>
                      <li className="flex flex-col gap-2">
                        {room.beds.map((bed) => (
                          <span
                            key={`${room.name}-${bed.name}`}
                            className="flex items-center gap-2"
                          >
                            <BedDouble
                              aria-hidden="true"
                              className="size-5 shrink-0 text-primary"
                            />
                            <span className="text-sm font-semibold">
                              {bed.quantity} x {bed.name} Bed
                              {bed.quantity === 1 ? "" : "s"}
                            </span>
                          </span>
                        ))}
                      </li>
                    </ul>

                    <div>
                      <h4 className="text-sm font-semibold">
                        Features &amp; Amenities
                      </h4>
                      <ul className="mt-2 flex flex-row flex-wrap items-center gap-2">
                        <AmenityChip icon={Wifi}>Free WiFi</AmenityChip>
                        <AmenityChip icon={AirVent}>
                          Air Conditioning
                        </AmenityChip>
                        <AmenityChip icon={Coffee}>
                          Coffee &amp; Tea Station
                        </AmenityChip>
                        <AmenityChip icon={Refrigerator}>Fridge</AmenityChip>
                        <AmenityChip icon={Microwave}>Microwave</AmenityChip>
                        <AmenityChip icon={BriefcaseBusiness}>Desk</AmenityChip>
                        <AmenityChip icon={Tv}>DSTV</AmenityChip>
                        <AmenityChip icon={ShowerHead}>
                          En-suite Shower
                        </AmenityChip>
                        <AmenityChip icon={DoorOpen}>Garden Access</AmenityChip>
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-primary">
                        from{" "}
                        <strong className="text-lg">
                          {formatRate(room.basePrice)}
                        </strong>{" "}
                        per night
                      </p>
                      <div className="flex flex-col items-start">
                        <a
                          href={bookingPlatform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          Check availability
                        </a>
                        <em className="mt-0.5 flex items-center gap-1 text-xs text-nowrap text-primary">
                          <Lock aria-hidden="true" className="size-2.5" />
                          Opens{" "}
                          <strong className="font-semibold">
                            {bookingPlatform.name}
                          </strong>
                        </em>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 size-full lg:order-2">
                  <RoomGalleryDialog
                    roomName={room.name}
                    images={roomGalleryImages}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
