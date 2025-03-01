import Link from 'next/link'
import { ArrowDown, Bed, ExternalLink, ShowerHead, Users } from 'lucide-react'

import { extractImageProps } from '@/lib/utils'
import { getBookingPlatform, getRooms } from '@/lib/data'

import SectionHeading from '../../components/section-heading'
import Image from '../../components/image'

export default async function Rooms() {
  const bookingPlatform = await getBookingPlatform()
  const rooms = await getRooms()

  return (
    <section
      className='bg-gradient-to-b from-white to-gray-200 py-12 lg:py-20'
      id='rooms'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeading
          label='Choose Your Space'
          heading='Our Rooms'
          description="Find the perfect room for your stay, whether you're traveling solo, with colleagues, or as a family. "
        />

        {/* CTAs */}
        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:mt-16'>
          <Link
            href={bookingPlatform.url}
            className='flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-lg font-medium text-white hover:bg-indigo-700'
            target='_blank'
          >
            Check Availability <ExternalLink size={16} />
          </Link>
          <Link
            href='#amenities'
            className='flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-indigo-600 underline-offset-2 hover:underline'
          >
            View Amenities <ArrowDown />
          </Link>
        </div>

        {/* Rooms */}
        <ul className='mx-auto mt-12 grid max-w-6xl gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-16'>
          {rooms.map(({ id, name, description, gallery, details, slug }) => {
            const { sleeps_adults, sleeps_children, bed_count } = details

            return (
              <li
                key={id}
                className='flex-col overflow-hidden rounded-xl bg-white shadow-lg'
              >
                <div>
                  {/* Images */}
                  <div className='grid p-2'>
                    <ul className='grid aspect-2/1 grid-cols-3 gap-2'>
                      {gallery.slice(0, 2).map((image, index) => {
                        const { url, alt } = extractImageProps(image)
                        const sizes = index
                          ? '(max-width: 640px) 30vw 5rem'
                          : '(max-width: 640px) 60vw 15rem'
                        return (
                          <li
                            key={url + index}
                            className={`relative ${index ? '' : 'col-span-2'} overflow-hidden rounded-lg bg-gray-200`}
                          >
                            <Image
                              className='object-cover object-center'
                              src={url}
                              alt={alt}
                              fill
                              sizes={sizes}
                              priority={!index}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Details */}
                  <div className='flex flex-1 flex-col justify-between p-6'>
                    <div className='flex flex-1 flex-col gap-2'>
                      <h3 className='text-xl font-semibold text-gray-900'>
                        {name}
                      </h3>

                      <ul className='mt-3 flex flex-col flex-wrap gap-1 font-bold text-indigo-600'>
                        {/* Sleeps */}
                        <li className='flex items-center gap-2'>
                          <h4 className='sr-only'>Sleeps up to:</h4>
                          <Users size={16} />
                          Sleeps {sleeps_adults + sleeps_children}
                        </li>
                        {/* Beds */}
                        <li className='flex flex-wrap items-center gap-8'>
                          {bed_count.map(({ bed, quantity, id }) => {
                            if (typeof bed === 'string') return null

                            return (
                              <div key={id} className='flex items-center gap-2'>
                                <Bed size={16} />
                                <span>
                                  {quantity} x {bed.name} Bed
                                  {quantity === 1 ? '' : 's'}
                                </span>
                              </div>
                            )
                          })}
                        </li>
                        {/* Bathroom */}
                        <li key={id} className='flex items-center gap-2'>
                          <ShowerHead size={16} />
                          <span>En-suite Shower, Toilet</span>
                        </li>
                      </ul>

                      {/* Overivew */}
                      <p className='mt-3 line-clamp-4 min-h-[6em] text-base text-gray-500'>
                        {description}
                      </p>
                    </div>

                    {/* <p className='text-lg font-extrabold md:text-xl lg:text-2xl'>
                        from R{base_price} / night
                      </p> */}

                    <div className='mt-6 flex items-center justify-between'>
                      <Link
                        href={bookingPlatform.url}
                        target='_blank'
                        className='inline-flex items-center gap-2 rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700'
                      >
                        Book Now <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/rooms/${slug}`}
                        className='rounded px-4 py-2 font-semibold text-indigo-600 underline-offset-2 hover:underline'
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
