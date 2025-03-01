import { getRoomAmenities } from '@/lib/data'

import SectionHeading from '../../components/section-heading'
import AmenityItem from '../../components/amenity-item'

export default async function Amenities() {
  const data = await getRoomAmenities()
  const { amenities = [] } = data

  return (
    <section
      className='bg-gradient-to-b from-white to-gray-50 py-12 lg:py-20'
      id='amenities'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeading
          label='Amenities'
          heading='Room Features & Amenities'
          description=' All our rooms come fully equipped with these premium amenities for
            your comfort.'
        />

        <ul className='mt-12 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'>
          {amenities.map((amenity, index) => {
            return (
              <AmenityItem
                key={'amenity' + index}
                amenity={amenity}
                variant='minimal'
              />
            )
          })}
        </ul>
      </div>
    </section>
  )
}
