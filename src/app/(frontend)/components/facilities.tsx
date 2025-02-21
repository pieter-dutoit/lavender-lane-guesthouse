import { extractImageProps } from '@/lib/utils'

import Image from './image'
import SectionHeading from './section-heading'
import { getGeneralAmenities } from '@/lib/data'
import AmenityItem from './amenity-item'

interface Props {
  id?: string
  heading: string
  children: React.ReactNode
}

function SubSection({ id, heading, children }: Props) {
  return (
    <div className='mt-12 flex flex-col gap-4 lg:mt-16' id={id}>
      <h3 className='mb-6 text-center text-xl font-semibold text-gray-900'>
        {heading}
      </h3>
      {children}
    </div>
  )
}

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

        {amenity_groups?.map(({ heading, amenities }) => {
          return (
            <SubSection key={heading} heading={heading} id='amenities'>
              <ul className='gap-x-8 space-y-10 md:grid md:grid-cols-2 xl:grid-cols-4'>
                {amenities?.map((amenity, index) => (
                  <AmenityItem
                    key={'amenity' + index}
                    amenity={amenity}
                    withImage
                  />
                ))}
              </ul>
            </SubSection>
          )
        })}
      </div>
    </section>
  )
}
