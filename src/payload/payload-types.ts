/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    'seo-media': SeoMedia;
    'contact-persons': ContactPerson;
    'social-media-platforms': SocialMediaPlatform;
    amenities: Amenity;
    facilities: Facility;
    rooms: Room;
    reviews: Review;
    beds: Bed;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'seo-media': SeoMediaSelect<false> | SeoMediaSelect<true>;
    'contact-persons': ContactPersonsSelect<false> | ContactPersonsSelect<true>;
    'social-media-platforms': SocialMediaPlatformsSelect<false> | SocialMediaPlatformsSelect<true>;
    amenities: AmenitiesSelect<false> | AmenitiesSelect<true>;
    facilities: FacilitiesSelect<false> | FacilitiesSelect<true>;
    rooms: RoomsSelect<false> | RoomsSelect<true>;
    reviews: ReviewsSelect<false> | ReviewsSelect<true>;
    beds: BedsSelect<false> | BedsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    pricing: Pricing;
    logos: Logo;
    'home-page': HomePage;
    'room-amenities': RoomAmenity;
    'booking-platform': BookingPlatform;
    gallery: Gallery;
  };
  globalsSelect: {
    pricing: PricingSelect<false> | PricingSelect<true>;
    logos: LogosSelect<false> | LogosSelect<true>;
    'home-page': HomePageSelect<false> | HomePageSelect<true>;
    'room-amenities': RoomAmenitiesSelect<false> | RoomAmenitiesSelect<true>;
    'booking-platform': BookingPlatformSelect<false> | BookingPlatformSelect<true>;
    gallery: GallerySelect<false> | GallerySelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  roles?: ('admin' | 'editor')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "seo-media".
 */
export interface SeoMedia {
  id: string;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    twitter?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-persons".
 */
export interface ContactPerson {
  id: string;
  name?: string | null;
  email: string;
  phone: string;
  position?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-media-platforms".
 */
export interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: string | Media;
  link: string;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "amenities".
 */
export interface Amenity {
  id: string;
  name: string;
  description?: string | null;
  icon: string | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "facilities".
 */
export interface Facility {
  id: string;
  name: string;
  description?: string | null;
  image: string | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "rooms".
 */
export interface Room {
  id: string;
  name: string;
  slug?: string | null;
  description: string;
  details: {
    sleeps_adults: number;
    sleeps_children: number;
    bed_count: {
      bed: string | Bed;
      quantity: number;
      id?: string | null;
    }[];
  };
  gallery: (string | Media)[];
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "beds".
 */
export interface Bed {
  id: string;
  name: string;
  icon: string | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews".
 */
export interface Review {
  id: string;
  name: string;
  title?: string | null;
  text: string;
  rating: number;
  platform?: ('Google' | 'Booking.com' | 'AirBnb' | 'LekkeSlaap' | 'Tripadvisor' | 'Facebook') | null;
  link?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'seo-media';
        value: string | SeoMedia;
      } | null)
    | ({
        relationTo: 'contact-persons';
        value: string | ContactPerson;
      } | null)
    | ({
        relationTo: 'social-media-platforms';
        value: string | SocialMediaPlatform;
      } | null)
    | ({
        relationTo: 'amenities';
        value: string | Amenity;
      } | null)
    | ({
        relationTo: 'facilities';
        value: string | Facility;
      } | null)
    | ({
        relationTo: 'rooms';
        value: string | Room;
      } | null)
    | ({
        relationTo: 'reviews';
        value: string | Review;
      } | null)
    | ({
        relationTo: 'beds';
        value: string | Bed;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "seo-media_select".
 */
export interface SeoMediaSelect<T extends boolean = true> {
  alt?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        twitter?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-persons_select".
 */
export interface ContactPersonsSelect<T extends boolean = true> {
  name?: T;
  email?: T;
  phone?: T;
  position?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-media-platforms_select".
 */
export interface SocialMediaPlatformsSelect<T extends boolean = true> {
  name?: T;
  icon?: T;
  link?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "amenities_select".
 */
export interface AmenitiesSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  icon?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "facilities_select".
 */
export interface FacilitiesSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  image?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "rooms_select".
 */
export interface RoomsSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  description?: T;
  details?:
    | T
    | {
        sleeps_adults?: T;
        sleeps_children?: T;
        bed_count?:
          | T
          | {
              bed?: T;
              quantity?: T;
              id?: T;
            };
      };
  gallery?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews_select".
 */
export interface ReviewsSelect<T extends boolean = true> {
  name?: T;
  title?: T;
  text?: T;
  rating?: T;
  platform?: T;
  link?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "beds_select".
 */
export interface BedsSelect<T extends boolean = true> {
  name?: T;
  icon?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pricing".
 */
export interface Pricing {
  id: string;
  base_price?: number | null;
  additional_guest?: number | null;
  price_items?:
    | {
        item_name: string;
        item_price: number;
        unit_type?: string | null;
        id?: string | null;
      }[]
    | null;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "logos".
 */
export interface Logo {
  id: string;
  logo: string | Media;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home-page".
 */
export interface HomePage {
  id: string;
  hero: {
    background_image: string | Media;
    heading: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    subheading: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
  };
  facilities: {
    heading: string;
    description: string;
    facility_groups?:
      | {
          heading: string;
          icon: string | Media;
          facilities?: (string | Facility)[] | null;
          id?: string | null;
        }[]
      | null;
    amenity_groups?:
      | {
          heading: string;
          icon: string | Media;
          amenities?: (string | Amenity)[] | null;
          id?: string | null;
        }[]
      | null;
  };
  seo: {
    meta: MetadataField;
    open_graph: OpenGraphField;
    twitter?: TwitterField;
  };
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MetadataField".
 */
export interface MetadataField {
  title: string;
  description: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "OpenGraphField".
 */
export interface OpenGraphField {
  site_name: string;
  title: string;
  description: string;
  image: string | SeoMedia;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TwitterField".
 */
export interface TwitterField {
  creator?: string | null;
  creatorId?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "room-amenities".
 */
export interface RoomAmenity {
  id: string;
  amenities: (string | Amenity)[];
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "booking-platform".
 */
export interface BookingPlatform {
  id: string;
  name: 'NightsBridge';
  url: string;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery".
 */
export interface Gallery {
  id: string;
  images: (string | Media)[];
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pricing_select".
 */
export interface PricingSelect<T extends boolean = true> {
  base_price?: T;
  additional_guest?: T;
  price_items?:
    | T
    | {
        item_name?: T;
        item_price?: T;
        unit_type?: T;
        id?: T;
      };
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "logos_select".
 */
export interface LogosSelect<T extends boolean = true> {
  logo?: T;
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "home-page_select".
 */
export interface HomePageSelect<T extends boolean = true> {
  hero?:
    | T
    | {
        background_image?: T;
        heading?: T;
        subheading?: T;
      };
  facilities?:
    | T
    | {
        heading?: T;
        description?: T;
        facility_groups?:
          | T
          | {
              heading?: T;
              icon?: T;
              facilities?: T;
              id?: T;
            };
        amenity_groups?:
          | T
          | {
              heading?: T;
              icon?: T;
              amenities?: T;
              id?: T;
            };
      };
  seo?:
    | T
    | {
        meta?: T | MetadataFieldSelect<T>;
        open_graph?: T | OpenGraphFieldSelect<T>;
        twitter?: T | TwitterFieldSelect<T>;
      };
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MetadataField_select".
 */
export interface MetadataFieldSelect<T extends boolean = true> {
  title?: T;
  description?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "OpenGraphField_select".
 */
export interface OpenGraphFieldSelect<T extends boolean = true> {
  site_name?: T;
  title?: T;
  description?: T;
  image?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TwitterField_select".
 */
export interface TwitterFieldSelect<T extends boolean = true> {
  creator?: T;
  creatorId?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "room-amenities_select".
 */
export interface RoomAmenitiesSelect<T extends boolean = true> {
  amenities?: T;
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "booking-platform_select".
 */
export interface BookingPlatformSelect<T extends boolean = true> {
  name?: T;
  url?: T;
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery_select".
 */
export interface GallerySelect<T extends boolean = true> {
  images?: T;
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}