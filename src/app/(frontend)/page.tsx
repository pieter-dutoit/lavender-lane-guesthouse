import { getGeneralAmenities } from '@/lib/data'

import {
  createAmenitiesList,
  createBreadCrumbs,
  extractFacilityNames,
  getBusinessStructuredData,
  getNumberOfRoomsStructuredData,
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
  const roomCountData = await getNumberOfRoomsStructuredData()

  const jsonLd = [
    createBreadCrumbs(),
    {
      ...businessData,
      amenityFeature: createAmenitiesList(amenities, true),
      containsPlace: roomsData,
      numberOfRooms: roomCountData
    }
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Rooms />
      <Facilities />
      <Reviews />
      <ContactUs />
    </>
  )
}
