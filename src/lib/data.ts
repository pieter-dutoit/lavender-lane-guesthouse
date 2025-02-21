import { unstable_cache } from 'next/cache'
import { getPayload, Where } from 'payload'
import config from '@payload-config'
import {
  Amenity,
  BookingPlatform,
  ContactPerson,
  Gallery,
  GeneralAmenity,
  Hero,
  Logo,
  Pricing,
  Review,
  Room,
  RoomAmenity,
  Seo,
  SocialMediaPlatform
} from '@/payload/payload-types'

export const getRoomAmenities = unstable_cache(
  async (): Promise<RoomAmenity> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'room-amenities',
      depth: 2
    })
    if (!res) {
      throw new Error('Failed to fetch room amenties.')
    }
    return res
  },

  [],
  { revalidate: false, tags: ['room-amenities'] }
)

export const getGallery = unstable_cache(
  async (): Promise<Gallery> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'gallery',
      depth: 1
    })
    if (!res) {
      throw new Error('Failed to fetch gallery images')
    }
    return res
  },

  [],
  { revalidate: false, tags: ['gallery'] }
)

export const getLogo = unstable_cache(
  async (): Promise<Logo> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'logos',
      depth: 1
    })
    if (!res) {
      throw new Error('Failed to logo')
    }
    return res
  },

  [],
  { revalidate: false, tags: ['logos'] }
)

export const getPrices = unstable_cache(
  async (): Promise<Pricing> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'pricing',
      depth: 1
    })
    if (!res) {
      throw new Error('Failed to fetch price data')
    }
    return res
  },

  [],
  { revalidate: false, tags: ['pricing'] }
)

export const getHeroData = unstable_cache(
  async (): Promise<Hero> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'hero',
      depth: 1
    })
    if (!res) {
      throw new Error('Failed to fetch hero data')
    }
    return res
  },
  [],
  { revalidate: false, tags: ['hero'] }
)

export const getAddOns = unstable_cache(
  async (): Promise<Amenity[]> => {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'amenities',
      depth: 2,
      pagination: false,
      sort: '-name',
      where: {
        'price.unit_price': {
          exists: true
        }
      }
    })

    if (!res) {
      throw new Error('Failed to fetch rooms data')
    }

    return res.docs
  },
  [],
  { revalidate: false, tags: ['add-ons'] }
)

export const getGeneralAmenities = unstable_cache(
  async (): Promise<GeneralAmenity> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'general-amenities',
      depth: 2
    })
    if (!res) {
      throw new Error('Failed to fetch general amenity group data')
    }
    return res
  },
  [],
  { revalidate: false, tags: ['general-amenities'] }
)

export const getBookingPlatform = unstable_cache(
  async (): Promise<BookingPlatform> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'booking-platform',
      depth: 1
    })
    if (!res) {
      throw new Error('Failed to fetch Booking Platform data')
    }
    return res
  },
  [],
  { revalidate: false, tags: ['booking-platform'] }
)

export const getRooms = unstable_cache(
  async (query?: Where): Promise<Room[]> => {
    const payload = await getPayload({ config })
    const res = await payload.find({
      draft: false,
      collection: 'rooms',
      depth: 3,
      pagination: false,
      sort: '-name',
      where: {
        ...query,
        _status: {
          equals: 'published'
        }
      }
    })

    if (!res) {
      throw new Error('Failed to fetch rooms data')
    }

    return res.docs
  },
  [],
  { revalidate: false, tags: ['rooms'] }
)

export const getRoom = unstable_cache(
  async (slug: string): Promise<Room> => {
    const payload = await getPayload({ config })
    const res = await payload.find({
      draft: false,
      collection: 'rooms',
      depth: 3,
      pagination: false,
      sort: '-name',
      where: {
        slug: {
          equals: slug
        },
        _status: {
          equals: 'published'
        }
      }
    })

    if (!res) {
      throw new Error('Failed to fetch room data')
    }

    return res.docs[0]
  },
  [],
  { revalidate: false, tags: ['rooms'] }
)

export const getReviews = unstable_cache(
  async (query?: Where): Promise<Review[]> => {
    const payload = await getPayload({ config })
    const res = await payload.find({
      draft: false,
      collection: 'reviews',
      depth: 1,
      pagination: false,
      sort: '-name',
      where: {
        ...query,
        _status: {
          equals: 'published'
        }
      }
    })

    if (!res) {
      throw new Error('Failed to fetch rooms data')
    }

    return res.docs
  },
  [],
  { revalidate: false, tags: ['reviews'] }
)

export const getContacts = unstable_cache(
  async (query?: Where): Promise<ContactPerson[]> => {
    const payload = await getPayload({ config })
    const res = await payload.find({
      draft: false,
      collection: 'contact-persons',
      depth: 1,
      pagination: false,
      sort: '-name',
      where: {
        ...query,
        _status: {
          equals: 'published'
        }
      }
    })

    if (!res) {
      throw new Error('Failed to fetch contact persons data')
    }

    return res.docs
  },
  [],
  { revalidate: false, tags: ['contact-persons'] }
)

export const getSocials = unstable_cache(
  async (query?: Where): Promise<SocialMediaPlatform[]> => {
    const payload = await getPayload({ config })
    const res = await payload.find({
      draft: false,
      collection: 'social-media-platforms',
      depth: 1,
      pagination: false,
      sort: '-name',
      where: {
        ...query,
        _status: {
          equals: 'published'
        }
      }
    })

    if (!res) {
      throw new Error('Failed to fetch social media data')
    }

    return res.docs
  },
  [],
  { revalidate: false, tags: ['social-media-platforms'] }
)

export const getSEOConfig = unstable_cache(
  async (page: string): Promise<Seo> => {
    const payload = await getPayload({ config })
    const res = await payload.find({
      draft: false,
      collection: 'seo',
      depth: 2,
      pagination: false,
      where: {
        page: {
          equals: page
        },
        _status: {
          equals: 'published'
        }
      }
    })

    if (!res) {
      throw new Error('Failed to fetch contact persons data')
    }

    return res.docs[0]
  },
  [],
  { revalidate: false, tags: ['seo'] }
)
