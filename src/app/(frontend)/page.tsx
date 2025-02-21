import { getGeneralAmenities, getSEOConfig } from '@/lib/data'
import { getBaseUrl } from '@/lib/utils'
import {
  createAmenitiesList,
  extractFacilityNames,
  getBusinessStructuredData,
  getRoomsStructuredData
} from '@/lib/utils/create-structured-data'

import ContactUs from './components/contact-us'
import Facilities from './components/facilities'
import Hero from './components/hero'
import Reviews from './components/reviews'
import Rooms from './components/rooms'

export default async function Page() {
  // Business JSON-LD
  const businessData = await getBusinessStructuredData()
  const roomsData = await getRoomsStructuredData({ withAmenities: true })

  // Facilities
  const { amenity_groups } = await getGeneralAmenities()
  const amenities = extractFacilityNames(amenity_groups)

  // Meta data
  const metadata = await getSEOConfig('home')

  const jsonLd = {
    ...businessData,
    url: getBaseUrl(),
    description: metadata.meta.description,
    amenityFeature: createAmenitiesList(amenities),
    containsPlace: roomsData,
    numberOfRooms: 15
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Facilities />
      <Rooms />
      <Reviews />
      <ContactUs />
    </>
  )
}
