import { Media } from '@/payload/payload-types'
import { fetchHomePageData } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

import Image from './image'
import SectionHeader from './section-header'

interface Props {
  id?: string
  heading: string
  image: Media | string
  children: React.ReactNode
}

function SubSection({ id, heading, image, children }: Props) {
  const { url, alt } = extractImageProps(image)
  return (
    <div className='mt-12 flex flex-col gap-4 lg:mt-16' id={id}>
      <div className='mx-auto mb-4 flex w-fit items-center justify-center gap-2 rounded-lg bg-gray-700 p-1 text-white lg:mb-6'>
        <Image
          src={url}
          alt={alt}
          height={20}
          width={20}
          className='size-6 rounded-sm bg-white p-1'
        />

        <h3 className='pr-2 text-lg font-bold'>{heading}</h3>
      </div>
      {children}
    </div>
  )
}

export default async function Amenities() {
  const data = await fetchHomePageData('facilities')
  if (!data?.facilities) return <></>

  const { heading, description, facility_groups, amenity_groups } =
    data.facilities

  return (
    <section
      className='bg-white bg-gradient-to-b from-white to-gray-200 py-16 md:py-20'
      id='facilities'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader
          label='Stay In Comfort'
          heading={heading}
          description={description}
        />

        {facility_groups?.map(({ heading, icon, facilities }) => {
          return (
            <SubSection key={heading} heading={heading} image={icon}>
              <ul className='flex w-full flex-wrap justify-center gap-2 sm:gap-4'>
                {facilities?.map((facility) => {
                  if (typeof facility === 'string') return null
                  const { name, description, image } = facility
                  const { url, alt } = extractImageProps(image)

                  return (
                    <li
                      key={name}
                      className='w-[48%] overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50 shadow md:w-[30%] lg:w-[23%]'
                    >
                      <div className='relative aspect-video w-full'>
                        <Image
                          src={url}
                          alt={alt}
                          fill
                          sizes='(max-width: 768px): 45vw, (max-width: 1024px) 26w, 20vw'
                          className='object-cover object-center'
                        />
                      </div>
                      <div className='p-1 text-center sm:p-2'>
                        <div className='flex min-h-[3em] items-center justify-center text-sm leading-tight'>
                          <h4 className='font-extrabold text-indigo-600 sm:text-lg'>
                            {name}
                          </h4>
                        </div>
                        <p className='min-h-[4em] text-sm text-gray-700 sm:mt-2 sm:text-base'>
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

        {amenity_groups?.map(({ heading, icon, amenities }) => {
          return (
            <SubSection
              key={heading}
              heading={heading}
              image={icon}
              id='amenities'
            >
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
