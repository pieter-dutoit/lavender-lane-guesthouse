import { Metadata } from 'next'

import { getGallery, getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'

import ImageGrid from './components/grid'
import PageHeading from '../components/page-heading'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('gallery')
  if (!data) return {}
  return createMetadataConfig({ ...data, path: '/gallery' })
}

export default async function GalleryPage() {
  const gallery = await getGallery()

  return (
    <>
      <PageHeading description='Take a look at our rooms and facilities.'>
        View our <span>Gallery</span>
      </PageHeading>
      <ImageGrid gallery={gallery} />
    </>
  )
}
