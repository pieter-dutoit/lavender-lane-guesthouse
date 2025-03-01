import { Metadata } from 'next'

import { getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'
import {
  createBreadCrumbs,
  getBusinessStructuredData,
  getNumberOfRoomsStructuredData,
  getRoomsStructuredData
} from '@/lib/utils/create-structured-data'

import PageHeading from '../components/page-heading'
import Amenities from './components/amenities'
import Rooms from './components/rooms'
import Breadcrumbs from '../components/breadcrumbs'

const CRUMBS = [{ name: 'Rooms', item: '/rooms' }]

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('rooms')
  if (!data) return {}
  return createMetadataConfig({ ...data, path: '/rooms' })
}

export default async function RoomsPage() {
  const businessData = await getBusinessStructuredData()
  const metadata = await getSEOConfig('rooms')
  const roomsData = await getRoomsStructuredData({ withAmenities: true })

  const jsonLd = [
    createBreadCrumbs(CRUMBS),
    {
      ...businessData,
      description: metadata.meta.description,
      containsPlace: roomsData,
      numberOfRooms: getNumberOfRoomsStructuredData()
    }
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs crumbs={CRUMBS} />
      <PageHeading
        description='Solar Power, DSTV, Aircon, & Daily Cleaning Services. Stay in comfort at Lavender Lane Guesthouse.'
        className='bg-gray-100 whitespace-pre-line'
      >
        Find your {`\n`}
        <span>home away from home</span>
      </PageHeading>

      <Rooms />
      <Amenities />
    </>
  )
}
