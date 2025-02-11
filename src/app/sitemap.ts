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
  getContacts
} from '@/lib/data'

async function getLastModified(
  fetchers: (() => Promise<any>)[]
): Promise<string | undefined> {
  // Fetch data from all functions
  try {
    const results = await Promise.all(fetchers.map((fn) => fn()))
    const standardResults = results
      .flatMap((result) => (Array.isArray(result) ? result : [result]))
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )

    return new Date(standardResults[0].updatedAt).toISOString()
  } catch (error) {
    console.error(error)
    console.error('failed to fetch "Last modified data"')
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = getBaseUrl()

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
      changeFrequency: 'yearly',
      priority: 1
    },
    // Gallery Page
    {
      url: baseURL + '/gallery',
      lastModified: await getLastModified([
        async () => getSEOConfig('gallery'),
        getGallery
      ]),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    // About page
    {
      url: baseURL + '/our-rooms',
      lastModified: await getLastModified([
        async () => getSEOConfig('rooms'),
        getRooms,
        getRoomAmenities
      ]),
      changeFrequency: 'yearly',
      priority: 0.9
    },
    // About page
    {
      url: baseURL + '/about-us',
      lastModified: await getLastModified([async () => getSEOConfig('about')]),
      changeFrequency: 'yearly',
      priority: 0.7
    },
    // About page
    {
      url: baseURL + '/contact-us',
      lastModified: await getLastModified([
        async () => getSEOConfig('contact-us'),
        getContacts,
        getSocials
      ]),
      changeFrequency: 'yearly',
      priority: 0.8
    }
  ]
}
