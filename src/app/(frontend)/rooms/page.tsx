import { Metadata } from 'next'

import { getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'

import PageHeading from '../components/page-heading'
import Amenities from './components/amenities'
import Rooms from './components/rooms'
// import Pricing from './components/pricing'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('rooms')
  if (!data) return {}
  return createMetadataConfig({ ...data, path: '/rooms' })
}

export default function OurRoomsPage() {
  return (
    <>
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
