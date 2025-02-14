import { extractImageProps } from '@/lib/utils'

import Image from './image'
import SectionHeading from './section-heading'
import { getFeaturesAndAmenities } from '@/lib/data'

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
  const data = await getFeaturesAndAmenities()
  const { facility_groups, amenity_groups } = data

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

        {facility_groups?.map(({ heading, facilities }) => {
          return (
            <SubSection key={heading} heading={heading}>
              <ul className='grid gap-4 lg:grid-cols-2'>
                {facilities?.map((facility) => {
                  if (typeof facility === 'string') return null
                  const { name, description, image } = facility
                  const { url, alt } = extractImageProps(image)

                  return (
                    <li
                      key={name}
                      className='flex items-center rounded-lg bg-white p-2 drop-shadow-sm'
                    >
                      <div className='relative size-20 min-w-20 overflow-hidden rounded-md lg:size-28'>
                        <Image
                          src={url}
                          alt={alt}
                          fill
                          className='object-cover'
                          sizes='(max-width:1024px) 5rem, 7rem'
                        />
                      </div>
                      <div className='pl-4'>
                        <h4 className='font-medium text-gray-900 sm:text-lg'>
                          {name}
                        </h4>

                        <p className='mt-1 text-base text-gray-700'>
                          {description}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </SubSection>
          )
        })}

        {amenity_groups?.map(({ heading, amenities }) => {
          return (
            <SubSection key={heading} heading={heading} id='amenities'>
              <ul className='gap-x-8 space-y-10 md:grid md:grid-cols-2 xl:grid-cols-4'>
                {amenities?.map((amenity) => {
                  if (typeof amenity === 'string') return null
                  const { name, description, icon } = amenity

                  const { url, alt } = extractImageProps(icon)

                  return (
                    <li key={amenity.name} className='flex gap-4'>
                      <div className='flex size-12 min-w-12 items-center justify-center rounded-md bg-indigo-300 text-white'>
                        <Image
                          src={url}
                          alt={alt}
                          height={20}
                          width={20}
                          className='size-6'
                        />
                      </div>

                      <div className='-mt-1 whitespace-normal'>
                        <h4 className='leading-6 font-medium text-gray-900 sm:text-lg'>
                          {name}
                        </h4>

                        <p className='mt-1 text-base text-gray-700'>
                          {description}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </SubSection>
          )
        })}
      </div>
    </section>
  )
}
