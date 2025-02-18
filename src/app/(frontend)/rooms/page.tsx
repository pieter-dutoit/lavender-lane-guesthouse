import { Metadata } from 'next'

import { getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'
import {
  getBusinessStructuredData,
  getRoomsStructuredData
} from '@/lib/utils/create-structured-data'

import PageHeading from '../components/page-heading'
import Amenities from './components/amenities'
import Rooms from './components/rooms'
import Breadcrumbs from '../components/breadcrumbs'

// import Pricing from './components/pricing'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('rooms')
  if (!data) return {}
  return createMetadataConfig({ ...data, path: '/rooms' })
}

export default async function RoomsPage() {
  const businessData = await getBusinessStructuredData()
  const metadata = await getSEOConfig('rooms')
  const roomsData = await getRoomsStructuredData({ withAmenities: true })

  const jsonLd = {
    ...businessData,
    description: metadata.meta.description,
    containsPlace: roomsData,
    numberOfRooms: 15
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: 'Rooms', href: '/rooms' }]} />
      <PageHeading
        description='Experience comfort and style in our thoughtfully designed rooms.'
        className='bg-gray-100 whitespace-pre-line'
      >
        Find your {`\n`}
        <span>home away from home</span>
      </PageHeading>
      <Amenities />
      <Rooms />

      {/* <Pricing /> */}
    </>
  )
}
