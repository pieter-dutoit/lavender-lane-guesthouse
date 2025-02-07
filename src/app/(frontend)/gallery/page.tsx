import { getGallery } from '@/lib/data'

import ImageGrid from './components/grid'

export default async function GalleryPage() {
  const gallery = await getGallery()

  return (
    <>
      <ImageGrid gallery={gallery} />
    </>
  )
}
