import { Metadata } from 'next'

import { getGallery, getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'
import {
  createMediaObject,
  getBusinessStructuredData
} from '@/lib/utils/create-structured-data'
import { getBaseUrl } from '@/lib/utils'

import ImageGrid from './components/grid'
import PageHeading from '../components/page-heading'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('gallery')
  if (!data) return {}
  return createMetadataConfig({ ...data, path: '/gallery' })
}

export default async function GalleryPage() {
  // Business JSON-LD
  const businessData = await getBusinessStructuredData()
  const metadata = await getSEOConfig('gallery')
  const gallery = await getGallery()

  const jsonLd = [
    businessData,
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: metadata.meta.title,
      description: metadata.meta.description,
      url: getBaseUrl() + '/gallery',
      associatedMedia: gallery.images
        .slice(0, 40)
        .filter((image) => typeof image !== 'string')
        .map(createMediaObject)
    }
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeading description='Take a look at our rooms and facilities.'>
        View our <span>Gallery</span>
      </PageHeading>
      <ImageGrid gallery={gallery} />
    </>
  )
}
