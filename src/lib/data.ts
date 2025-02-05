import { unstable_cache } from 'next/cache'
import { getPayload, Where } from 'payload'
import config from '@payload-config'
import {
  BookingPlatform,
  HomePage,
  Review,
  Room
} from '@/payload/payload-types'

type HomePageData = Partial<HomePage>

export const fetchHomePageData = unstable_cache(
  async (field?: string): Promise<HomePageData> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'home-page',
      depth: 2,
      ...(field && { select: { [field]: true } })
    })
    if (!res) {
      throw new Error('Failed to fetch home page data')
    }
    return res
  },

  [],
  { revalidate: false, tags: ['home-page'] }
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
