import { getGeneralAmenities } from '@/lib/data'

import SectionHeading from './section-heading'
import AmenityItem from './amenity-item'

export default async function Amenities() {
  const data = await getGeneralAmenities()
  const { amenity_groups } = data

  return (
    <section
      className='bg-white bg-gradient-to-b from-white to-gray-200 py-16 md:py-20'
      id='facilities'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeading
          label='Stay In Comfort'
          heading='Facilities & Amenities'
          description="We've thought of every detail to make your stay as enjoyable as possible."
        />

        {amenity_groups?.map(({ id, heading, amenities }) => {
          return (
            <div className='mt-12 flex flex-col gap-4 lg:mt-16' key={id}>
              <h3 className='mb-6 text-center text-xl font-semibold text-gray-900'>
                {heading}
              </h3>
              <ul className='grid gap-8 md:grid-cols-2 xl:grid-cols-4'>
                {amenities?.map((amenity, index) => (
                  <AmenityItem
                    key={'amenity' + index}
                    amenity={amenity}
                    withImage
                  />
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
