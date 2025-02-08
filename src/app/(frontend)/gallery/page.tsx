import { getGallery } from '@/lib/data'

import ImageGrid from './components/grid'
import Hero from '../about-us/components/hero'

export default async function GalleryPage() {
  const gallery = await getGallery()

  return (
    <>
      <Hero
        heading='Gallery'
        description='Take a look at our rooms and facilities.'
      />
      <ImageGrid gallery={gallery} />
    </>
  )
}
