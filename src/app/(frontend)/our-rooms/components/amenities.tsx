import { getRoomAmenities } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

import SectionHeader from '../../components/section-header'
import Image from '../../components/image'

export default async function Amenities() {
  const data = await getRoomAmenities()
  const { amenities = [] } = data

  return (
    <section
      className='bg-gradient-to-b from-white to-gray-50 py-12 lg:py-20'
      id='amenities'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader
          label='Amenities'
          heading='Room Features & Amenities'
          description=' All our rooms come fully equipped with these premium amenities for
            your comfort.'
        />

        <ul className='mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:mt-16 lg:grid-cols-5 lg:gap-8 xl:grid-cols-6'>
          {amenities.map((amenity) => {
            if (typeof amenity === 'string') return null
            const { name, icon, id } = amenity
            const { url, alt } = extractImageProps(icon)

            return (
              <li key={id} className='flex items-center gap-2'>
                <div className='relative flex size-10 items-center justify-center rounded-lg bg-indigo-100 p-2'>
                  <Image
                    src={url}
                    alt={alt}
                    height={20}
                    width={20}
                    className='size-8'
                  />
                </div>
                <h3 className='font-medium text-gray-900'>{name}</h3>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
