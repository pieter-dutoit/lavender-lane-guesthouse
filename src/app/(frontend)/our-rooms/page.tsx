// import Pricing from './components/pricing'
import { Metadata } from 'next'

import { getSEOConfig } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-config'

import Hero from '../about-us/components/hero'
import Amenities from './components/amenities'
import Rooms from './components/rooms'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOConfig('rooms')
  if (!data) return {}
  return createMetadataConfig(data)
}

export default function OurRoomsPage() {
  return (
    <>
      <Hero
        heading='Find your home away from home'
        description='Experience comfort and style in our thoughtfully designed rooms.'
        className='bg-gray-200'
      />
      <Amenities />
      <Rooms />

      {/* <Pricing /> */}
    </>
  )
}
