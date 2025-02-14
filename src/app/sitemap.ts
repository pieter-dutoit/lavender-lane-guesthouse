import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'
import {
  getSEOConfig,
  getSocials,
  getHeroData,
  getFeaturesAndAmenities,
  getRooms,
  getGallery,
  getRoomAmenities,
  getContacts,
  getRoom
} from '@/lib/data'

async function getLastModified(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchers: (() => Promise<any>)[]
): Promise<string | undefined> {
  // Fetch data from all functions
  try {
    const results = await Promise.all(fetchers.map((fn) => fn()))
    const standardResults = results
      .flatMap((result) => (Array.isArray(result) ? result : [result]))
      .sort(
        (a, b) =>
          new Date(b?.updatedAt || null).getTime() -
          new Date(a?.updatedAt || null).getTime()
      )

    return new Date(standardResults[0].updatedAt).toISOString()
  } catch (error) {
    console.error(error)
    console.error('failed to fetch "Last modified data"')
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = getBaseUrl()
  const rooms = await getRooms()

  return [
    // Home Page
    {
      url: baseURL,
      lastModified: await getLastModified([
        async () => getSEOConfig('home'),
        getSocials,
        getHeroData,
        getFeaturesAndAmenities,
        getRooms
      ]),
      changeFrequency: 'yearly' as const,
      priority: 1
    },
    // Gallery Page
    {
      url: baseURL + '/gallery',
      lastModified: await getLastModified([
        async () => getSEOConfig('gallery'),
        getGallery
      ]),
      changeFrequency: 'yearly' as const,
      priority: 0.7
    },
    // About page
    {
      url: baseURL + '/about-us',
      lastModified: await getLastModified([async () => getSEOConfig('about')]),
      changeFrequency: 'yearly' as const,
      priority: 0.7
    },
    // Contact page
    {
      url: baseURL + '/contact-us',
      lastModified: await getLastModified([
        async () => getSEOConfig('contact-us'),
        getContacts,
        getSocials
      ]),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    // Rooms page
    {
      url: baseURL + '/rooms',
      lastModified: await getLastModified([
        async () => getSEOConfig('rooms'),
        getRooms,
        getRoomAmenities
      ]),
      changeFrequency: 'monthly' as const,
      priority: 0.9
    },
    // Room Details
    ...(await Promise.all(
      rooms.map(async ({ slug }) => ({
        url: baseURL + '/rooms/' + slug,
        lastModified: await getLastModified([
          async () => getRoom(slug || ''),
          getRoomAmenities
        ]),
        priority: 0.7,
        changeFrequency: 'monthly' as const
      }))
    ))
  ]
}
